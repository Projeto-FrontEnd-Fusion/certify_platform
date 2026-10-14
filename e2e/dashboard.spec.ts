import { test, expect } from '@playwright/test';

test('dashboard uses company API data and never displays fabricated activity or outage', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('auth-storage', JSON.stringify({ version: 0, state: { auth: { _id: 'company', fullname: 'Empresa', role: 'empresa' }, accessToken: 'token', refreshToken: 'refresh' } })));
  await page.route('**/api/v1/auth/me', route => route.fulfill({ json: { data: { auth: { _id: 'company', fullname: 'Empresa', role: 'empresa' } } } }));
  await page.route('**/api/v1/notifications**', route => route.fulfill({ json: { data: { items: [], total: 0, unread_count: 0 } } }));
  let fail = true;
  await page.route('**/api/v1/dashboard', route => {
    expect(route.request().headers().authorization).toBe('Bearer token');
    return fail ? route.fulfill({ status: 503, json: {} }) : route.fulfill({ json: { success: true, data: { issued: 17, pending_delivery: 3, sent: 14, participants: 9, emissions: [], recent_activities: [] } } });
  });
  await page.goto('/empresa/dashboard');
  await expect(page.getByRole('alert')).toContainText('Não foi possível carregar o dashboard');
  fail = false;
  await page.getByRole('button', { name: 'Tentar novamente', exact: true }).click();
  await expect(page.getByText('17', { exact: true }).first()).toBeVisible();
  await expect(page.getByText('Ainda não há atividades')).toBeVisible();
  await expect(page.getByText('Ainda não há emissões')).toBeVisible();
  await expect(page.getByText('Pedro Santos')).toHaveCount(0);
  await expect(page.getByText('Instabilidade no envio de certificados')).toHaveCount(0);
});
