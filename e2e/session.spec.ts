import { test, expect, type Page } from '@playwright/test';

const user = {_id: 'student-id', fullname: 'Aluno Real', email: 'student@example.com', role: 'user'};
async function session(page: Page) {
  await page.addInitScript(auth => {
    if (!localStorage.getItem('auth-storage')) localStorage.setItem('auth-storage', JSON.stringify({version: 0,
      state: {auth, accessToken: 'expired-access', refreshToken: 'old-refresh'}}));
  }, user);
}

test('concurrent unauthorized requests share one renewal and retry with the new access token', async ({page}) => {
  await session(page);
  let renewals = 0;
  let recovered = 0;
  await page.route('**/api/v1/auth/refresh', async route => {
    renewals++;
    expect(route.request().postDataJSON()).toEqual({refresh_token: 'old-refresh'});
    await new Promise(resolve => setTimeout(resolve, 100));
    await route.fulfill({json: {data: {access_token: 'new-access', refresh_token: 'new-refresh'}}});
  });
  await page.route('**/api/v1/auth/me', route => {
    if (route.request().headers().authorization !== 'Bearer new-access') return route.fulfill({status: 401, json: {detail: 'Expired'}});
    recovered++;
    return route.fulfill({json: {data: {auth: user}}});
  });
  await page.route('**/api/v1/certificate/users/**', route => {
    if (route.request().headers().authorization !== 'Bearer new-access') return route.fulfill({status: 401, json: {detail: 'Expired'}});
    recovered++;
    return route.fulfill({json: {data: {items: []}}});
  });
  await page.goto('/meus-certificados');
  await expect(page.getByText('Você não possui certificados', {exact: true})).toBeVisible();
  await expect.poll(() => recovered).toBe(2);
  expect(renewals).toBe(1);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('auth-storage')!).state.refreshToken)).toBe('new-refresh');
});

test('rejected renewal clears the session and returns to login', async ({page}) => {
  await session(page);
  let renewals = 0;
  await page.route('**/api/v1/auth/me', route => route.fulfill({status: 401, json: {detail: 'Expired'}}));
  await page.route('**/api/v1/certificate/users/**', route => route.fulfill({status: 401, json: {detail: 'Expired'}}));
  await page.route('**/api/v1/auth/refresh', route => {
    renewals++;
    return route.fulfill({status: 401, json: {detail: 'Invalid refresh token'}});
  });
  await page.goto('/meus-certificados');
  await expect(page).toHaveURL(/\/login$/);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('auth-storage')!).state.auth)).toBeNull();
  expect(renewals).toBe(1);
});

test('logout retries with the rotated refresh token before clearing local access', async ({page}) => {
  await session(page);
  await page.route('**/api/v1/auth/me', route => route.fulfill({json: {data: {auth: user}}}));
  await page.route('**/api/v1/certificate/users/**', route => route.fulfill({json: {data: {items: []}}}));
  await page.route('**/api/v1/auth/refresh', route => route.fulfill({json: {data: {
    access_token: 'new-access', refresh_token: 'new-refresh',
  }}}));
  let revoked = false;
  await page.route('**/api/v1/auth/logout', route => {
    if (route.request().headers().authorization !== 'Bearer new-access') return route.fulfill({status: 401, json: {detail: 'Expired'}});
    expect(route.request().postDataJSON()).toEqual({refresh_token: 'new-refresh'});
    revoked = true;
    return route.fulfill({json: {success: true}});
  });
  await page.goto('/meus-certificados');
  await page.getByRole('button', {name: 'Sair da conta', exact: true}).click();
  await expect(page).toHaveURL(/\/login$/);
  expect(revoked).toBe(true);
});
