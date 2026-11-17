import { test, expect } from '@playwright/test';

const allRoutes = [
  '/',
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
  await expect(page.getByRole('heading', { name: 'Desenvolvimento', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Design', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Cibersegurança', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'DevOps' })).toHaveCount(0);
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

test('menu móvel abre sem JavaScript e os estilos continuam carregados', async ({ page }) => {
  await page.route('**/src/scripts/main.js**', (route) => route.abort());
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.locator('link[rel="stylesheet"][href*="main.css"]')).toHaveCount(1);
  await expect(page.locator('.site-header')).toHaveCSS('position', 'sticky');
  await expect(page.locator('.hero-layout')).toHaveCSS('display', 'grid');
  const toggle = page.getByRole('button', { name: 'Menu principal' });
  const nav = page.getByRole('navigation', { name: 'Navegação principal' });
  await expect(toggle).toBeVisible();
  await expect(nav).toBeHidden();
  await toggle.click();
  await expect(nav).toBeVisible();
  await toggle.click();
  await expect(nav).toBeHidden();
  await expect(page.locator('.team-card')).toHaveCount(3);
  await expect(page.locator('.team-card').first()).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Entender' })).toBeVisible();
});

test('canais públicos apontam para o GitHub oficial e formulário opera com transparência', async ({ page }) => {
  await page.route('**/shared-view/**/rows**', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) }),
  );
  await page.goto('/');
  const github = 'https://github.com/nos-cesar-school';
  await expect(page.locator('.site-nav a.nav-github')).toHaveAttribute('href', github);
  await expect(page.getByRole('heading', { name: 'Acompanhe o NOS no GitHub.' })).toBeVisible();
  await expect(page.getByRole('link', { name: /Visitar o GitHub do NOS/ })).toHaveAttribute('href', github);
  await expect(page.locator('#canais .channel-item')).toHaveCount(2);
  await expect(page.locator('#contato .channel-item')).toHaveCount(1);
  await expect(page.locator('.footer-social .icon-link')).toHaveCount(3);
  await expect(page.locator('.footer-links').getByRole('link', { name: 'Contato' })).toHaveAttribute('href', '#contato');

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

test('desktop mantém links de navegação visíveis', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(page.locator('.site-nav')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Menu principal' })).toBeHidden();
});

test('cabeçalho mantém links enquanto o conteúdo cabe e troca para ícone quando não cabe', async ({ page }) => {
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Navegação principal' });
  const toggle = page.getByRole('button', { name: 'Menu principal' });
  for (const width of [900, 768, 681]) {
    await page.setViewportSize({ width, height: 844 });
    await expect(nav).toBeVisible();
    await expect(toggle).toBeHidden();
    const widths = await page.evaluate(() => ({
      page: document.documentElement.scrollWidth,
      viewport: window.innerWidth,
    }));
    expect(widths.page, JSON.stringify(widths)).toBeLessThanOrEqual(widths.viewport + 1);
  }
  for (const width of [680, 580, 390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    await expect(toggle).toBeVisible();
    await expect(nav).toBeHidden();
    await toggle.click();
    await expect(nav).toBeVisible();
    await toggle.click();
  }
});

test('tablet em paisagem mantém navegação completa e hero adaptado', async ({ page }) => {
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto('/');
  await expect(page.locator('.site-nav')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Menu principal' })).toBeHidden();
  await expect(page.locator('.hero-art')).toBeVisible();
  const layout = await page.locator('.hero-layout').evaluate((element) => getComputedStyle(element).gridTemplateColumns);
  expect(layout.split(' ').length).toBe(2);
});

test('hero mantém a chamada visível em desktop baixo e tablet em paisagem', async ({ page }) => {
  for (const viewport of [
    { width: 1920, height: 867 },
    { width: 1366, height: 650 },
    { width: 844, height: 390 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/');
    const cta = await page.getByRole('link', { name: 'Conheça o Núcleo' }).boundingBox();
    expect(cta, `CTA ausente em ${viewport.width}×${viewport.height}`).not.toBeNull();
    expect(cta.y + cta.height, `CTA fora da primeira dobra em ${viewport.width}×${viewport.height}`).toBeLessThanOrEqual(
      viewport.height,
    );
    if (viewport.width === 844) {
      const core = await page.locator('.diagram-core').boundingBox();
      for (const node of await page.locator('.node').all()) {
        const box = await node.boundingBox();
        const overlapsCore =
          box.x < core.x + core.width &&
          box.x + box.width > core.x &&
          box.y < core.y + core.height &&
          box.y + box.height > core.y;
        expect(overlapsCore, `${await node.innerText()} sobrepõe o núcleo no tablet em paisagem`).toBe(false);
      }
    }
  }
});

test('reduz movimentos conforme a preferência do sistema', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const paths = await page.locator('.hero-art .diagram-lines path').evaluateAll((elements) =>
    elements.map((element) => {
      const styles = getComputedStyle(element);
      return { animationName: styles.animationName, transitionDuration: parseFloat(styles.transitionDuration) };
    }),
  );
  expect(paths.every((item) => item.animationName === 'none' && item.transitionDuration < 0.001)).toBe(true);
  const cards = await page
    .locator('.team-card, .workflow-grid > li')
    .evaluateAll((elements) => elements.map((element) => getComputedStyle(element).animationName));
  expect(cards.every((name) => name === 'none')).toBe(true);
});

test('etapas desenham a conexão ao entrar na tela sem ocultar os cards', async ({ page }) => {
  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 768, height: 1024 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/');
    const workflow = page.locator('.workflow-grid');
    await workflow.scrollIntoViewIfNeeded();
    await expect(workflow).toHaveClass(/is-in-view/);

    const connector = await workflow.locator('li').first().evaluate((element) => {
      const styles = getComputedStyle(element, '::after');
      return { display: styles.display, animationName: styles.animationName };
    });
    if (viewport.width > 540) {
      expect(connector.display).toBe('block');
      expect(connector.animationName).toBe('workflow-connect');
    } else {
      expect(connector.display).toBe('none');
    }

    const cardStates = await workflow.locator('li').evaluateAll((elements) =>
      elements.map((element) => ({
        animationName: getComputedStyle(element).animationName,
        opacity: getComputedStyle(element).opacity,
      })),
    );
    expect(cardStates.every((state) => state.animationName === 'card-arrive' && state.opacity === '1')).toBe(true);
  }
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

test('mobile: menu expande, navega e fecha', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Cenário específico de navegação móvel');
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Menu principal' });
  const nav = page.getByRole('navigation', { name: 'Navegação principal' });
  await expect(nav).toBeHidden();
  await toggle.click();
  await expect(nav).toBeVisible();
  await nav.getByRole('link', { name: 'Equipes' }).click();
  await expect(nav).toBeHidden();
});

test('link de pular conteúdo funciona por teclado', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Pular para o conteúdo principal' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#conteudo$/);
});

test('jornada multipágina navega entre Home, Sobre, Liderança, Equipes e Breadcrumbs', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /Conhecer missão, valores e propósito/ }).click();
  await expect(page).toHaveURL(/\/sobre\/$/);
  await expect(page.locator('.site-nav a[aria-current="page"]')).toHaveText('Sobre');

  await page.getByRole('link', { name: /Acessar Gestão do Núcleo/ }).click();
  await expect(page).toHaveURL(/\/gestao\/$/);
  await expect(page.locator('.site-nav a[aria-current="page"]')).toHaveText('Liderança');

  await page.locator('.team-card', { hasText: 'Desenvolvimento' }).getByRole('link', { name: /Ver liderança e equipe/ }).click();
  await expect(page).toHaveURL(/\/equipes\/desenvolvimento\/$/);
  await expect(page.locator('.breadcrumb [aria-current="page"]')).toHaveText('Desenvolvimento');

  await page.locator('.next-card', { hasText: 'Design' }).click();
  await expect(page).toHaveURL(/\/equipes\/design\/$/);

  await page.locator('.breadcrumb').getByRole('link', { name: 'Início' }).click();
  await expect(page.getByRole('heading', { level: 1, name: /Da ideia ao código/ })).toBeVisible();
});

test('metadados Open Graph e página 404 institucional estão presentes e funcionais', async ({ page }) => {
  for (const route of ['/', '/sobre/', '/gestao/', '/equipes/desenvolvimento/', '/equipes/design/', '/equipes/ciberseguranca/']) {
    await page.goto(route);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /nos-mark\.webp$/);
  }

  await page.goto('/404.html');
  await expect(page.getByRole('heading', { level: 1, name: /Esta página não foi encontrada/ })).toBeVisible();
  await page.getByRole('link', { name: /Voltar para o início/ }).click();
  await expect(page.getByRole('heading', { level: 1, name: /Da ideia ao código/ })).toBeVisible();
});
