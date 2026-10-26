import { test, expect } from '@playwright/test';

test('verification modal resets its input and error when reopened', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { readText: async () => { throw new Error('Clipboard unavailable'); } },
    });
  });
  await page.route('**/api/v1/certificate/validate/**', route =>
    route.fulfill({ status: 404, json: { detail: 'Certificado não encontrado' } }));
  await page.goto('/verificar/unknown');
  const openModal = page.getByRole('button', { name: 'Verificar outro código', exact: true }).first();
  await openModal.click();
  const dialog = page.getByRole('dialog');
  const input = dialog.getByLabel('Link ou código de verificação', { exact: true });
  await expect(input).toBeFocused();
  await dialog.getByRole('button', { name: 'Colar', exact: true }).click();
  await expect(input).toHaveAttribute('aria-invalid', 'true');
  await input.press('Escape');
  await expect(dialog).toBeHidden();
  await openModal.click();
  await expect(input).toHaveValue('');
  await expect(input).toHaveAttribute('aria-invalid', 'false');
  await expect(input).toBeFocused();
  await input.fill('PreviousCode');
  await input.press('Escape');
  await openModal.click();
  await expect(input).toHaveValue('');
});

test('rejected recovery codes count once per response and stop at ten attempts', async ({ page }) => {
  let attempts = 0;
  await page.route('**/api/v1/auth/forgot-password', route =>
    route.fulfill({ json: { success: true } }));
  await page.route('**/api/v1/auth/verify-code', route => {
    expect(route.request().postDataJSON().email).toBe('student@example.com');
    attempts += 1;
    return route.fulfill({ status: 400, json: { detail: 'Código inválido ou expirado' } });
  });
  await page.goto('/forgot-password');
  await page.getByLabel('E-mail', { exact: true }).fill('student@example.com');
  await page.getByRole('button', { name: 'Enviar', exact: true }).click();
  await expect(page).toHaveURL(/\/verify-code$/);
  for (let index = 0; index < 6; index += 1) {
    await page.getByLabel(`Dígito ${index + 1} de 6`, { exact: true }).fill('1');
  }
  const firstDigit = page.getByLabel('Dígito 1 de 6', { exact: true });
  const submit = page.getByRole('button', { name: 'Enviar', exact: true });
  const limit = page.getByRole('alert').filter({ hasText: 'Limite de tentativas atingido' });
  for (let attempt = 1; attempt <= 10; attempt += 1) {
    await firstDigit.fill(String(attempt % 10));
    await expect(firstDigit).toHaveAttribute('aria-invalid', 'false');
    await submit.click();
    await expect.poll(() => attempts).toBe(attempt);
    await expect(firstDigit).toHaveAttribute('aria-invalid', 'true');
    if (attempt < 10) await expect(limit).toBeHidden();
  }
  await expect(limit).toBeVisible();
  await expect(submit).toBeDisabled();
  await expect(firstDigit).toBeDisabled();
});
