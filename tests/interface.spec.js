import { test, expect } from '@playwright/test';

test('estrutura e seções principais', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Núcleo Open Source/);
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await expect(page.getByRole('heading', { name: 'Desenvolvimento' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Cibersegurança' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Design UX/UI' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'DevOps' })).toHaveCount(0);
});

test('menu móvel abre sem JavaScript e os estilos continuam carregados', async ({ page }) => {
  await page.route('**/src/scripts/main.js**', route => route.abort());
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

test('canais públicos apontam para o GitHub oficial e não exibem formulário fictício', async ({ page }) => {
  await page.goto('/');
  const github = 'https://github.com/nos-cesar-school';
  await expect(page.locator('.site-nav a.nav-github')).toHaveAttribute('href', github);
  await expect(page.getByRole('heading', { name: 'Acompanhe o NOS no GitHub.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Visitar o GitHub do NOS' })).toHaveAttribute('href', github);
  await expect(page.locator('form, input, textarea')).toHaveCount(0);
});

test('sem rolagem horizontal indevida', async ({ page }) => {
  await page.goto('/');
  const dims = await page.evaluate(() => ({ pageWidth: document.documentElement.scrollWidth, viewport: window.innerWidth }));
  expect(dims.pageWidth, JSON.stringify(dims)).toBeLessThanOrEqual(dims.viewport + 1);
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
  for (const width of [900, 600, 581]) {
    await page.setViewportSize({ width, height: 844 });
    await expect(nav).toBeVisible();
    await expect(toggle).toBeHidden();
    const widths = await page.evaluate(() => ({
      page: document.documentElement.scrollWidth,
      viewport: window.innerWidth,
    }));
    expect(widths.page, JSON.stringify(widths)).toBeLessThanOrEqual(widths.viewport + 1);
  }
  for (const width of [580, 390, 320]) {
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
  const layout = await page.locator('.hero-layout').evaluate(element => getComputedStyle(element).gridTemplateColumns);
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
    expect(cta.y + cta.height, `CTA fora da primeira dobra em ${viewport.width}×${viewport.height}`).toBeLessThanOrEqual(viewport.height);
    if (viewport.width === 844) {
      const core = await page.locator('.diagram-core').boundingBox();
      for (const node of await page.locator('.node').all()) {
        const box = await node.boundingBox();
        const overlapsCore = box.x < core.x + core.width && box.x + box.width > core.x && box.y < core.y + core.height && box.y + box.height > core.y;
        expect(overlapsCore, `${await node.innerText()} sobrepõe o núcleo no tablet em paisagem`).toBe(false);
      }
    }
  }
});

test('reduz movimentos conforme a preferência do sistema', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const motion = await page.locator('.hero-art .diagram-lines path').evaluate((element) => {
    const styles = getComputedStyle(element);
    return { animationName: styles.animationName, transitionDuration: parseFloat(styles.transitionDuration) };
  });
  expect(motion.animationName).toBe('none');
  expect(motion.transitionDuration).toBeLessThan(0.001);
  const cards = await page.locator('.team-card, .workflow-grid > li').evaluateAll((elements) => elements.map((element) => getComputedStyle(element).animationName));
  expect(cards.every((name) => name === 'none')).toBe(true);
});

test('etapas desenham a conexão ao entrar na tela sem ocultar os cards', async ({ page }) => {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 768, height: 1024 }, { width: 390, height: 844 }]) {
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

    const cardStates = await workflow.locator('li').evaluateAll((elements) => elements.map((element) => ({
      animationName: getComputedStyle(element).animationName,
      opacity: getComputedStyle(element).opacity,
    })));
    expect(cardStates.every((state) => state.animationName === 'card-arrive' && state.opacity === '1')).toBe(true);
  }
});

test('links internos apontam para destinos existentes', async ({ page }) => {
  await page.goto('/');
  const hashes = await page.locator('a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute('href')));
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
