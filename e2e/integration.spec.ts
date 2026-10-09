import { test, expect, type Page } from '@playwright/test';
import { readFile } from 'node:fs/promises';

const user = {
  _id: '507f1f77bcf86cd799439011', fullname: 'Aluno Teste', email: 'student@example.com',
  role: 'user', phone: '43999999999', cpf: '', birth_date: '', avatar_url: null,
};

async function signIn(page: Page) {
  await page.addInitScript((auth) => {
    localStorage.setItem('auth-storage', JSON.stringify({
      state: { auth, accessToken: 'test-access-token', refreshToken: 'test-refresh-token' }, version: 0,
    }));
  }, user);
  await page.route('**/api/v1/auth/me', route => route.fulfill({json: {success: true, data: {auth: user}}}));
}

test('protects the profile without an authenticated session', async ({ page }) => {
  await page.goto('/perfil');
  await expect(page).toHaveURL(/\/login$/);
});

test('loads profile and saves using the backend field names and bearer token', async ({ page }) => {
  await signIn(page);
  let saved = false;
  await page.route('**/api/v1/auth/**', async (route) => {
    const request = route.request();
    expect(request.headers().authorization).toBe('Bearer test-access-token');
    if (request.method() === 'PUT') {
      expect(request.url()).toContain(`/auth/${user._id}`);
      expect(request.postDataJSON()).toEqual({ fullname: 'Aluno Atualizado', email: user.email, phone: user.phone });
      saved = true;
      return route.fulfill({ json: { success: true, data: { auth: { ...user, fullname: 'Aluno Atualizado' } } } });
    }
    return route.fulfill({ json: { success: true, data: { auth: user } } });
  });
  await page.goto('/perfil');
  await expect(page.getByLabel('Nome completo', { exact: true })).toHaveValue(user.fullname);
  await page.getByLabel('Nome completo', { exact: true }).fill('Aluno Atualizado');
  await page.getByRole('button', { name: 'Salvar alterações' }).click();
  await expect.poll(() => saved).toBe(true);
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('auth-storage')!).state.auth.fullname)).toBe('Aluno Atualizado');
});

test('shows a save failure without changing the persisted session', async ({ page }) => {
  await signIn(page);
  await page.route('**/api/v1/auth/**', (route) => route.request().method() === 'PUT'
    ? route.fulfill({ status: 400, json: { detail: 'Não foi possível salvar os dados' } })
    : route.fulfill({ json: { success: true, data: { auth: user } } }));
  await page.goto('/perfil');
  await expect(page.getByLabel('Nome completo', { exact: true })).toHaveValue(user.fullname);
  await page.getByLabel('Nome completo', { exact: true }).fill('Nome Não Salvo');
  await page.getByRole('button', { name: 'Salvar alterações' }).click();
  await expect(page.getByText('Não foi possível salvar os dados').first()).toBeVisible();
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('auth-storage')!).state.auth);
  expect(stored.fullname).toBe(user.fullname);
});

test('uploads the avatar as multipart and resolves its URL against the API origin', async ({ page }) => {
  await signIn(page);
  await page.route('**/api/v1/auth/me', (route) => route.fulfill({ json: { success: true, data: { auth: user } } }));
  let uploaded = false;
  await page.route('**/api/v1/upload/avatar', async (route) => {
    const request = route.request();
    expect(request.headers().authorization).toBe('Bearer test-access-token');
    expect(request.headers()['content-type']).toContain('multipart/form-data; boundary=');
    expect(request.postDataBuffer()?.toString()).toContain('name="file"; filename="avatar.png"');
    uploaded = true;
    await route.fulfill({ json: { success: true, data: { url: '/static/uploads/avatars/test.png' } } });
  });
  await page.goto('/perfil');
  await expect(page.getByLabel('Nome completo', { exact: true })).toHaveValue(user.fullname);
  await page.getByRole('button', { name: 'Alterar foto de perfil' }).first().click();
  await page.locator('input[type=file]').setInputFiles({
    name: 'avatar.png', mimeType: 'image/png',
    buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jhJkAAAAASUVORK5CYII=', 'base64'),
  });
  await page.getByRole('button', { name: 'Importar imagem', exact: true }).click();
  await expect.poll(() => uploaded).toBe(true);
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.getByAltText(`Foto de perfil de ${user.fullname}`).first()).toHaveAttribute('src', /:8000\/static\/uploads\/avatars\/test.png$/);
});

test('opens a certificate returned with MongoDB _id and downloads a valid PDF', async ({ page }, testInfo) => {
  await signIn(page);
  const certificate = {
    _id: '507f1f77bcf86cd799439022', participant_name: user.fullname,
    institution_name: 'Instituição Teste', event_name: 'Evento de Integração',
    description: 'Participou do Evento de Integração com aproveitamento.',
    event_date: '2026-10-01', event_start: '2026-10-01', event_end: '2026-10-02', workload: 8,
  };
  await page.route('**/api/v1/certificate/**', (route) => {
    expect(route.request().headers().authorization).toBe('Bearer test-access-token');
    if (route.request().url().includes('/users/')) {
      return route.fulfill({ json: { success: true, data: { items: [certificate] } } });
    }
    expect(route.request().url()).toContain(`/certificate/${certificate._id}`);
    return route.fulfill({ json: { success: true, data: { certificate } } });
  });
  await page.goto('/meus-certificados');
  await page.getByRole('button', { name: /Evento de Integração/ }).click();
  await expect(page.getByText(user.fullname, {exact: true}).first()).toBeVisible();
  const downloading = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Fazer download', exact: true }).first().click();
  const download = await downloading;
  expect(download.suggestedFilename()).toMatch(/\.pdf$/);
  expect(await download.failure()).toBeNull();
  const pdfPath = testInfo.outputPath('certificate.pdf');
  await download.saveAs(pdfPath);
  expect((await readFile(pdfPath)).subarray(0, 5).toString()).toBe('%PDF-');
});
