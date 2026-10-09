import {test, expect, type Page} from '@playwright/test';

const id = '507f1f77bcf86cd799439022';
const key = 'aBc-uuid-123';
const certificate = {id, user_id: 'student-id', access_key: key, status: 'available',
  participant_name: 'Participante Real', participant_email: 'student@example.com',
  institution_name: 'Instituição Real', event_name: 'Curso Real', description: 'Conclusão de curso',
  workload: '20', issued_at: '2026-10-01T12:00:00Z', valid_until: '2028-10-01T12:00:00Z'};

async function companySession(page: Page, draft = false) {
  await page.addInitScript(({draft}) => {
    localStorage.setItem('auth-storage', JSON.stringify({state: {auth: {_id: 'company-id', fullname: 'Empresa Real',
      razao_social: 'Empresa Real', email: 'company@example.com', role: 'empresa'},
      accessToken: 'token', refreshToken: 'refresh'}, version: 0}));
    if (draft) localStorage.setItem('certificate-drafts', JSON.stringify({'draft-id': {id: 'draft-id', step: 3,
      updatedAt: new Date().toISOString(), data: {variant: 'classico', activityType: 'Curso', description: 'Conclusão de curso',
        activityName: 'Curso Real', workload: '20', startDate: '2026-10-01', endDate: '2026-10-02',
        modalityEnabled: false, validityEnabled: false, syllabusEnabled: false,
        participants: [{name: 'Participante Real', email: 'student@example.com'}]}}}));
  }, {draft});
  await page.route('**/api/v1/auth/me', route => route.fulfill({json: {success: true,
    data: {auth: {_id: 'company-id', fullname: 'Empresa Real', razao_social: 'Empresa Real',
      email: 'company@example.com', role: 'empresa'}}}}));
}

test('company menus show backend identity and logout clears the session even on API failure', async ({page}) => {
  await companySession(page);
  await page.route('**/api/v1/auth/me', route => route.fulfill({json: {data: {auth: {
    _id: 'company-id', razao_social: 'Empresa Atualizada', email: 'company@example.com', role: 'empresa',
  }}}}));
  await page.route('**/api/v1/certificate/issuer/**', route => route.fulfill({json: {success: true, data: {items: [], total_pages: 0}}}));
  await page.route('**/api/v1/auth/logout', route => route.fulfill({status: 503, json: {detail: 'Unavailable'}}));
  await page.goto('/empresa');
  await expect(page).toHaveURL(/\/empresa\/certificados$/);
  await expect(page.getByText('Empresa Atualizada').first()).toBeVisible();
  await expect(page.getByRole('link', {name: 'Dashboard', exact: true})).toHaveCount(0);
  await page.getByRole('button', {name: 'Sair da conta', exact: true}).last().click();
  await expect(page).toHaveURL(/\/login$/);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('auth-storage')!).state.accessToken)).toBeNull();
});

test('models menu creates a draft with the selected existing template', async ({page}) => {
  await companySession(page);
  await page.goto('/empresa/modelos');
  await page.getByRole('button', {name: 'Selecionar modelo Moderno', exact: true}).click();
  await page.getByRole('button', {name: 'Usar modelo', exact: true}).click();
  await expect(page).toHaveURL(/\/empresa\/certificados\/criar\/[^/]+$/);
  const draftId = new URL(page.url()).pathname.split('/').pop()!;
  const variant = await page.evaluate((id) => {
    return JSON.parse(localStorage.getItem('certificate-drafts')!)[id].data.variant;
  }, draftId);
  expect(variant).toBe('moderno');
});

test('student profile returns to certificates and exposes working logout', async ({page}) => {
  await page.addInitScript(() => localStorage.setItem('auth-storage', JSON.stringify({version: 0, state: {
    auth: {_id: 'student-id', fullname: 'Aluno Real', email: 'student@example.com', role: 'user'},
    accessToken: 'token', refreshToken: 'refresh',
  }})));
  await page.route('**/api/v1/auth/me', route => route.fulfill({json: {data: {auth: {
    _id: 'student-id', fullname: 'Aluno Real', email: 'student@example.com', role: 'user',
  }}}}));
  await page.route('**/api/v1/certificate/users/**', route => route.fulfill({json: {success: true, data: {items: [], total_pages: 0}}}));
  await page.route('**/api/v1/auth/logout', route => route.fulfill({json: {success: true}}));
  await page.goto('/perfil');
  await page.getByRole('button', {name: 'Certificados', exact: true}).click();
  await expect(page).toHaveURL(/\/meus-certificados$/);
  await page.getByRole('button', {name: 'Meu perfil', exact: true}).click();
  await expect(page).toHaveURL(/\/perfil$/);
  await page.getByRole('button', {name: 'Sair', exact: true}).click();
  await expect(page).toHaveURL(/\/login$/);
});

test('public validation preserves case and loads data from the API', async ({page}) => {
  let consulted = false;
  await page.route('**/api/v1/certificate/validate/**', async route => {
    expect(route.request().url()).toContain(`/validate/${key}`);
    consulted = true;
    await route.fulfill({json: {success: true, data: {certificate}}});
  });
  await page.goto(`/validar-certificado/${key}`);
  await expect(page.getByText(certificate.participant_name, {exact: true}).first()).toBeVisible();
  expect(consulted).toBe(true);
  await expect(page.getByText('Ana Silva', {exact: true})).toHaveCount(0);
});

test('details never mark a rejected certificate as verified and report send failure', async ({page}) => {
  await page.route(`**/api/v1/certificate/${id}`, route => route.fulfill({json: {success: true, data: {certificate}}}));
  await page.route('**/api/v1/certificate/validate/**', route => route.fulfill({status: 404, json: {detail: 'Certificado expirado.'}}));
  await page.route('**/api/v1/certificate/send-links', route => route.fulfill({status: 503, json: {detail: 'Serviço de e-mail não configurado.'}}));
  await page.goto(`/certificados/visualizar/${id}`);
  await page.getByRole('button', {name: 'Verificar autenticidade'}).click();
  await expect(page.getByText('Falha na verificação')).toBeVisible();
  await page.getByRole('button', {name: 'Fechar', exact: true}).click();
  await page.getByRole('button', {name: 'Enviar por e-mail'}).click();
  await expect(page.getByRole('status')).toContainText('Serviço de e-mail não configurado.');
});

test('issuance creates a real event and defers student links until Send now', async ({page}) => {
  await companySession(page, true);
  let sent = 0;
  await page.route('**/api/v1/events', async route => {
    expect(route.request().postDataJSON()).toMatchObject({name: 'Curso Real', workload: 20, institution: 'Empresa Real'});
    await route.fulfill({status: 201, json: {success: true, data: {event: {_id: 'event-id'}}}});
  });
  await page.route('**/api/v1/certificate/batch', async route => {
    expect(route.request().postDataJSON()).toMatchObject({event_id: 'event-id', notify_students: false,
      participants: [{fullname: 'Participante Real', email: 'student@example.com'}]});
    await route.fulfill({status: 201, json: {success: true, data: {criados: 1, duplicados_ignorados: 0, erros: 0}}});
  });
  await page.route('**/api/v1/certificate/issuer/**', route => route.fulfill({json: {success: true, data: {items: [certificate], total_pages: 1}}}));
  await page.route('**/api/v1/certificate/send-links', async route => {
    sent += 1;
    expect(route.request().headers().authorization).toBe('Bearer token');
    expect(route.request().postDataJSON()).toEqual({certificate_ids: [id]});
    await route.fulfill({json: {success: true, data: {total: 1, sent: 1, failed: 0, pending: 0}}});
  });
  await page.goto('/empresa/certificados/criar/draft-id');
  await page.getByRole('button', {name: 'Confirmar', exact: true}).click();
  await expect(page.getByRole('heading', {name: '1 certificados foram gerados com sucesso'})).toBeVisible();
  expect(sent).toBe(0);
  await page.getByRole('button', {name: 'Enviar links agora'}).click();
  await expect(page.getByRole('status').last()).toContainText('1 e-mails aceitos pelo servidor');
  expect(sent).toBe(1);
});

test('company list loads issued certificates and opens the correct ID', async ({page}) => {
  await companySession(page);
  await page.route('**/api/v1/certificate/issuer/**', route => route.fulfill({json: {success: true, data: {items: [certificate], total_pages: 1}}}));
  await page.route(`**/api/v1/certificate/${id}`, route => route.fulfill({json: {success: true, data: {certificate}}}));
  await page.goto('/empresa/certificados');
  await expect(page.getByRole('cell', {name: 'Curso Real', exact: true})).toBeVisible();
  await page.getByRole('button', {name: 'Ações para Curso Real'}).click();
  await expect(page).toHaveURL(new RegExp(`/certificados/visualizar/${id}$`));
});

test('authenticated company goes from login to its certificate list', async ({page}) => {
  await companySession(page);
  await page.route('**/api/v1/certificate/issuer/**', route => route.fulfill({json: {success: true, data: {items: [], total_pages: 0}}}));
  await page.goto('/login');
  await expect(page).toHaveURL(/\/empresa\/certificados$/);
});

test('creation preview uses the backend issuer and updates with the form values', async ({page}) => {
  await companySession(page, true);
  await page.addInitScript(() => {
    const drafts = JSON.parse(localStorage.getItem('certificate-drafts')!);
    drafts['draft-id'].step = 1;
    localStorage.setItem('certificate-drafts', JSON.stringify(drafts));
  });
  let profileRequests = 0;
  await page.route('**/api/v1/auth/me', async route => {
    expect(route.request().headers().authorization).toBe('Bearer token');
    profileRequests += 1;
    await route.fulfill({json: {success: true, data: {auth: {_id: 'company-id', fullname: 'Empresa do backend',
      razao_social: 'Instituição do backend', email: 'company@example.com', role: 'empresa'}}}});
  });
  await page.goto('/empresa/certificados/criar/draft-id');
  const preview = page.getByRole('region', {name: 'Prévia do certificado'});
  await expect(preview).toContainText('Instituição do backend');
  await expect(preview).toContainText('Participante Real');
  await expect(preview).toContainText('Curso Real');
  await expect(preview).toContainText('20 horas');
  await page.locator('input[name="activityName"]').fill('Atividade atualizada');
  await page.locator('input[name="workload"]').fill('35');
  await expect(preview).toContainText('Atividade atualizada');
  await expect(preview).toContainText('35 horas');
  await expect(preview).toContainText('Disponível após a emissão');
  await expect(preview).not.toContainText('DJFEJ338-94320');
  await expect(preview).not.toContainText('Desenvolvimento Web Full Stack');
  expect(profileRequests).toBe(1);
});

test('preview reports a backend profile failure without inventing an institution', async ({page}) => {
  await companySession(page, true);
  await page.addInitScript(() => {
    const drafts = JSON.parse(localStorage.getItem('certificate-drafts')!);
    drafts['draft-id'].step = 1;
    localStorage.setItem('certificate-drafts', JSON.stringify(drafts));
  });
  await page.route('**/api/v1/auth/me', route => route.fulfill({status: 503, json: {detail: 'Indisponível'}}));
  await page.goto('/empresa/certificados/criar/draft-id');
  const preview = page.getByRole('region', {name: 'Prévia do certificado'});
  await expect(preview).toContainText('Não foi possível carregar a instituição');
  await expect(preview).not.toContainText('Empresa Real');
});
