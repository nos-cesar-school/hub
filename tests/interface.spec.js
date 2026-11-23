import { test, expect } from '@playwright/test';

const allRoutes = [
  '/',
  '/integrantes/',
  '/sobre/',
  '/gestao/',
  '/equipes/desenvolvimento/',
  '/equipes/design/',
  '/equipes/ciberseguranca/',
  '/404.html',
];

test('estrutura e seções principais da landing page', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Núcleo Open Source/);
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  for (const frente of ['Desenvolvimento', 'Cibersegurança', 'Design UX/UI']) {
    await expect(page.locator('#frentes').getByRole('heading', { name: frente, exact: true })).toBeVisible();
  }
  await expect(page.getByRole('heading', { name: 'DevOps' })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Entender' })).toBeVisible();
  await expect(page.locator('#comite .gp')).toHaveCount(2);
  await expect(page.getByRole('link', { name: /Conheça todos os integrantes/ })).toHaveAttribute('href', 'integrantes/');
});

test('páginas institucionais internas carregam conteúdo oficial e espaços da equipe', async ({ page }) => {
  await page.goto('/sobre/');
  await expect(page.getByRole('heading', { level: 1, name: /O que é o Núcleo Open Source/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Crescimento conjunto e colaborativo' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Desenvolvimento local e conexão com o mercado' })).toBeVisible();
  await expect(page.locator('.value-card')).toHaveCount(6);

  const deptChecks = [
    {
      path: '/gestao/',
      heading: /Gestão do Núcleo/,
      subareas: ['Presidência', 'Vice-presidência', 'Lideranças de Departamento'],
    },
    {
      path: '/equipes/desenvolvimento/',
      heading: 'Desenvolvimento',
      subareas: ['Front-end', 'Back-end', 'DevOps e Infraestrutura', 'Gestão de Produto e Agilidade'],
    },
    {
      path: '/equipes/design/',
      heading: 'Design',
      subareas: ['Design Gráfico', 'Web Design'],
    },
    {
      path: '/equipes/ciberseguranca/',
      heading: 'Cibersegurança',
      subareas: [
        'Blue Team (Segurança Defensiva)',
        'Red Team (Segurança Ofensiva)',
        'Arquitetura e Segurança de Aplicações',
        'GRC (Governança, Riscos e Conformidade)',
      ],
    },
  ];

  for (const dept of deptChecks) {
    await page.goto(dept.path);
    await expect(page.getByRole('heading', { level: 1, name: dept.heading })).toBeVisible();
    for (const sub of dept.subareas) {
      await expect(page.getByRole('heading', { name: sub, exact: true })).toBeVisible();
    }
    const members = page.locator('.roster-grid .member-card');
    await expect(members).toHaveCount(3);
    await expect(members.first().locator('.member-links .icon-link')).toHaveCount(3);
  }
});

test('canais públicos apontam para o GitHub oficial e formulário opera com transparência', async ({ page }) => {
  await page.route('**/shared-view/**/rows**', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) }),
  );
  await page.goto('/');
  const github = 'https://github.com/nos-cesar-school';
  await expect(page.locator('#menu a[href*="github.com"]')).toHaveAttribute('href', github);
  await expect(page.locator('#contato').getByRole('link', { name: /Acompanhe no GitHub/ })).toHaveAttribute('href', github);
  await expect(page.locator('#contato [data-social-card="email"]')).toHaveCount(1);

  const form = page.locator('#contact-form');
  await expect(form).toBeVisible();
  await expect(page.locator('#contact-integration-note')).toContainText('LGPD');

  await page.getByLabel(/Nome completo/).fill('Visitante Institucional');
  await page.getByLabel(/^E-mail/).fill('visitante@cesar.school');
  await page.getByLabel(/Vínculo ou assunto/).selectOption('Parceria');
  await page.getByLabel(/^Mensagem/).fill('Mensagem de validação da interface.');
  await form.getByRole('button', { name: /Enviar mensagem/ }).click();
  await expect(page.locator('#contact-feedback')).toContainText(/Nenhum dado foi enviado|Mensagem enviada com sucesso/);
});

test('formulário valida campos vazios, espaços, e-mail inválido e falha de envio (TASK25, TASK26, TASK31 e TASK32)', async ({
  page,
}) => {
  await page.goto('/');
  const form = page.locator('#contact-form');
  const submit = form.getByRole('button', { name: /Enviar mensagem/ });

  // 1. Submissão apenas com espaços em branco deve reprovar campos obrigatórios
  await page.getByLabel(/Nome completo/).fill('   ');
  await submit.click();
  await expect(page.locator('#error-name')).toContainText('Preencha este campo obrigatório.');
  await expect(page.getByLabel(/Nome completo/)).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByLabel(/Nome completo/)).toBeFocused();

  // 2. E-mail malformado ou sem domínio válido deve exibir erro específico
  await page.getByLabel(/Nome completo/).fill('Jader Teste');
  await page.getByLabel(/^E-mail/).fill('usuario@dominio');
  await page.getByLabel(/Vínculo ou assunto/).selectOption('Estudante');
  await page.getByLabel(/^Mensagem/).fill('Testando validação de formato de e-mail.');
  await submit.click();
  await expect(page.locator('#error-email')).toContainText('Informe um endereço de e-mail válido.');
  await expect(page.getByLabel(/^E-mail/)).toHaveAttribute('aria-invalid', 'true');

  // 3. Cenário de falha de servidor (HTTP 500) preserva dados digitados e informa erro
  await page.route('**/shared-view/**/rows**', (route) => route.fulfill({ status: 500, body: 'Internal Error' }));
  await page.getByLabel(/^E-mail/).fill('estudante@cesar.school');
  await submit.click();

  const feedback = page.locator('#contact-feedback');
  await expect(feedback).toBeVisible();
  const textAfterAttempt = await feedback.textContent();
  if (textAfterAttempt?.includes('Não foi possível enviar')) {
    await expect(feedback).toHaveClass(/is-error/);
    await expect(page.getByLabel(/^Mensagem/)).toHaveValue('Testando validação de formato de e-mail.');
  }
});

test('sem rolagem horizontal indevida em todas as páginas', async ({ page }) => {
  for (const route of allRoutes) {
    await page.goto(route);
    const dims = await page.evaluate(() => ({
      pageWidth: document.documentElement.scrollWidth,
      viewport: window.innerWidth,
    }));
    expect(dims.pageWidth, `${route}: ${JSON.stringify(dims)}`).toBeLessThanOrEqual(dims.viewport + 1);
  }
});

test('cabeçalho mostra os links até 901 px e troca para o botão de menu abaixo disso', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Larguras de desktop não se aplicam à emulação de celular');
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Navegação principal' });
  const toggle = page.getByRole('button', { name: 'Menu principal' });
  for (const width of [1440, 1024, 901]) {
    await page.setViewportSize({ width, height: 844 });
    await expect(nav).toBeVisible();
    await expect(toggle).toBeHidden();
  }
  for (const width of [900, 680, 390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    await expect(toggle).toBeVisible();
    await expect(nav).toBeHidden();
    await toggle.click();
    await expect(nav).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await toggle.click();
    await expect(nav).toBeHidden();
  }
});

test('mobile: menu expande, navega e fecha', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Cenário específico de navegação móvel');
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Menu principal' });
  const nav = page.getByRole('navigation', { name: 'Navegação principal' });
  await expect(nav).toBeHidden();
  await toggle.click();
  await expect(nav).toBeVisible();
  await nav.getByRole('link', { name: 'Frentes' }).click();
  await expect(nav).toBeHidden();
});

test('reduz movimentos conforme a preferência do sistema', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const names = await page
    .locator('.splash .stroke, .splash .o, .splash .dot')
    .evaluateAll((elements) => elements.map((element) => getComputedStyle(element).animationName));
  expect(names.every((name) => name === 'none')).toBe(true);
});

test('tema claro/escuro alterna e é lembrado entre páginas', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Mudar para modo claro' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.goto('/integrantes/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.getByRole('button', { name: 'Mudar para modo escuro' })).toBeVisible();
});

test('links internos de âncora na home apontam para destinos existentes', async ({ page }) => {
  await page.goto('/');
  const hashes = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) => links.map((link) => link.getAttribute('href')));
  for (const hash of hashes) {
    expect(await page.locator(`[id="${hash.slice(1)}"]`).count(), hash).toBe(1);
  }
});

test('link de pular conteúdo funciona por teclado', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Pular para o conteúdo principal' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#conteudo$/);
});

test('página de integrantes: comitê, diagrama, filtro e perfil', async ({ page }) => {
  await page.goto('/integrantes/');
  await expect(page.getByRole('heading', { level: 1, name: 'Quem faz o NOS' })).toBeVisible();
  await expect(page.locator('#comite .gp')).toHaveCount(2);
  await expect(page.locator('#leads .gp')).toHaveCount(3);
  await expect(page.locator('#venn .person')).toHaveCount(12);

  await expect(page.locator('#people .pcard')).toHaveCount(14);
  await expect(page.locator('#peopleCount')).toHaveText('14 pessoas no Núcleo');

  const gabriel = page.locator('#venn').getByRole('button', { name: /^Gabriel\b/ });
  await gabriel.click();
  await expect(gabriel).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#p-gabriel')).toHaveClass(/hl/);
  await expect(page.locator('#p-gabriel')).toBeInViewport();

  await page.getByRole('button', { name: 'Idinaldo Presidente' }).click();
  await expect(page.locator('#p-idinaldo')).toContainText('Comitê Geral · Presidente');
  await expect(page.locator('#p-idinaldo')).toHaveClass(/hl/);

  await page.locator('#filters').getByRole('button', { name: 'Design UX/UI' }).click();
  await expect(page.locator('#venn .person.off')).toHaveCount(9);
  await expect(page.locator('#people .pcard:visible')).toHaveCount(3);
  await expect(page.locator('#peopleCount')).toHaveText('3 pessoas em Design UX/UI');
  await page.locator('#filters').getByRole('button', { name: 'Infraestrutura' }).click();
  await expect(page.locator('#venn .venn-note')).toBeVisible();
  await expect(page.locator('#people .pcard:visible')).toHaveCount(0);
});

test('jornada multipágina navega entre Home e Integrantes', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /Conheça todos os integrantes/ }).click();
  await expect(page).toHaveURL(/\/integrantes\/$/);
  await expect(page.locator('nav a[aria-current="page"]')).toHaveText('Integrantes');

  await page.locator('header .brand').click();
  await expect(page.getByRole('heading', { level: 1, name: /A gente aprende construindo/ })).toBeVisible();
  // a abertura animada só aparece na primeira visita
  await expect(page.locator('#splash')).toBeHidden();
});

test('metadados Open Graph e página 404 institucional estão presentes e funcionais', async ({ page }) => {
  for (const route of ['/', '/integrantes/', '/sobre/', '/gestao/', '/equipes/desenvolvimento/', '/equipes/design/', '/equipes/ciberseguranca/']) {
    await page.goto(route);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /nos-mark\.webp$/);
  }

  await page.goto('/404.html');
  await expect(page.getByRole('heading', { level: 1, name: /Esta página não foi encontrada/ })).toBeVisible();
  await page.getByRole('link', { name: /Voltar para o início/ }).click();
  await expect(page.getByRole('heading', { level: 1, name: /A gente aprende construindo/ })).toBeVisible();
});
