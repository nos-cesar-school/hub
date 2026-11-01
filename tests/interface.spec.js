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
});

test('contato apresenta mockup identificado como não funcional', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.site-nav a[href="#contato"]')).toHaveCount(1);
  await expect(page.locator('#contato')).toBeVisible();
  await expect(page.getByLabel('Nome')).toBeVisible();
  await expect(page.getByLabel('E-mail')).toBeVisible();
  await expect(page.getByLabel('Mensagem')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Envio indisponível no protótipo' })).toBeDisabled();
  await expect(page.getByText('os dados não são enviados nem armazenados.')).toBeVisible();
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
