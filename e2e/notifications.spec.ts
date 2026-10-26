import { test, expect, type Page } from '@playwright/test';

async function setup(page: Page, count = 7) {
  await page.addInitScript(() => localStorage.setItem('auth-storage', JSON.stringify({
    version: 0, state: { auth: { _id: 'company-id', fullname: 'Empresa Real', role: 'empresa', email: 'company@example.com' }, accessToken: 'token', refreshToken: 'refresh' },
  })));
  await page.route('**/api/v1/auth/me', route => route.fulfill({ json: { data: { auth: { _id: 'company-id', fullname: 'Empresa Real', role: 'empresa' } } } }));
  await page.route('**/api/v1/certificate/issuer/**', route => route.fulfill({ json: { data: { items: [], total_pages: 0 } } }));
  const state = {
    failGet: false, failSave: false, patches: [] as string[],
    items: Array.from({ length: count }, (_, index) => ({
      id: `certificate-${index}:issued`, type: 'certificate', severity: 'info',
      title: `Certificado real ${index + 1}`, description: `Aluno ${index + 1} — Curso real`,
      created_at: '2026-10-14T12:00:00Z', read: false, href: '/empresa/certificados',
    })),
  };
  await page.route('**/api/v1/notifications**', async route => {
    expect(route.request().headers().authorization).toBe('Bearer token');
    const url = new URL(route.request().url());
    if (route.request().method() === 'PATCH') {
      state.patches.push(url.pathname);
      if (state.failSave) return route.fulfill({ status: 503, json: { detail: 'Unavailable' } });
      const id = decodeURIComponent(url.pathname.split('/').at(-2)!);
      for (const item of state.items) if (url.pathname.endsWith('/read-all') || item.id === id) item.read = true;
      return route.fulfill({ json: { success: true, data: { updated: state.items.length } } });
    }
    if (state.failGet) return route.fulfill({ status: 503, json: { detail: 'Unavailable' } });
    const limit = Number(url.searchParams.get('limit') || 5);
    const current = Number(url.searchParams.get('page') || 1);
    return route.fulfill({ json: { success: true, data: {
      items: state.items.slice((current - 1) * limit, current * limit),
      total: state.items.length, unread_count: state.items.filter(item => !item.read).length,
      page: current, total_pages: Math.ceil(state.items.length / limit),
    } } });
  });
  return state;
}

test('notification bell loads server data and persists reading all beyond the preview', async ({ page }) => {
  const state = await setup(page);
  await page.goto('/empresa/dashboard');
  await page.getByRole('button', { name: 'Notificações, 7 não lidas', exact: true }).click();
  const modal = page.getByRole('dialog', { name: 'Notificações', exact: true });
  await expect(modal.getByRole('button', { name: /Certificado real/ })).toHaveCount(5);
  await expect(modal).not.toContainText('Manutenção programada');
  await modal.getByRole('button', { name: 'Marcar todas como lidas' }).click();
  await expect(modal.getByRole('button', { name: 'Marcar todas como lidas' })).toBeDisabled();
  expect(state.patches).toContain('/api/v1/notifications/read-all');
  expect(state.items.every(item => item.read)).toBe(true);
  await page.keyboard.press('Escape');
  await expect(modal).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Notificações', exact: true })).toBeFocused();
  await page.reload();
  await page.getByRole('button', { name: 'Notificações', exact: true }).click();
  await expect(page.getByRole('dialog').getByRole('button', { name: 'Marcar todas como lidas' })).toBeDisabled();
});

test('failed read is reported without navigation or changing unread data', async ({ page }) => {
  const state = await setup(page, 1);
  state.failSave = true;
  await page.goto('/empresa/dashboard');
  await page.getByRole('button', { name: 'Notificações, 1 não lidas', exact: true }).click();
  const modal = page.getByRole('dialog');
  await modal.getByRole('button', { name: /Certificado real 1/ }).click();
  await expect(modal.getByRole('alert')).toContainText('Não foi possível salvar');
  await expect(page).toHaveURL(/\/empresa\/dashboard$/);
  expect(state.items[0].read).toBe(false);
  state.failSave = false;
  await modal.getByRole('button', { name: /Certificado real 1/ }).click();
  await expect(page).toHaveURL(/\/empresa\/certificados$/);
  expect(state.items[0].read).toBe(true);
});

test('fetch error offers retry and empty feed contains no fabricated alerts', async ({ page }) => {
  const state = await setup(page, 0);
  state.failGet = true;
  await page.goto('/empresa/dashboard');
  await page.getByRole('button', { name: 'Notificações', exact: true }).click();
  const modal = page.getByRole('dialog');
  await expect(modal.getByRole('alert')).toContainText('Não foi possível carregar');
  state.failGet = false;
  await modal.getByRole('button', { name: 'Tentar novamente' }).click();
  await expect(modal).toContainText('Você não tem notificações');
  await expect(modal.getByRole('button', { name: 'Marcar todas como lidas' })).toBeDisabled();
});

test('all notifications page paginates server data', async ({ page }) => {
  await setup(page, 25);
  await page.goto('/empresa/dashboard');
  await page.getByRole('button', { name: 'Notificações, 25 não lidas', exact: true }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Ver todas as notificações' }).click();
  await expect(page).toHaveURL(/\/empresa\/notificacoes$/);
  await expect(page.getByText('Página 1 de 2')).toBeVisible();
  await expect(page.getByRole('button', { name: /Certificado real/ })).toHaveCount(20);
  await page.getByRole('button', { name: 'Próxima', exact: true }).click();
  await expect(page.getByText('Página 2 de 2')).toBeVisible();
  await expect(page.getByRole('button', { name: /Certificado real/ })).toHaveCount(5);
});

test('mobile notification modal fits the viewport and closes outside', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await setup(page, 1);
  await page.goto('/empresa/dashboard');
  await page.getByRole('button', { name: 'Notificações, 1 não lidas', exact: true }).click();
  const modal = page.getByRole('dialog');
  await expect(modal).toBeVisible();
  const box = await modal.boundingBox();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(390);
  await page.mouse.click(5, 500);
  await expect(modal).not.toBeVisible();
});
