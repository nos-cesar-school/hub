import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = [
  { path: '/', label: 'Home' },
  { path: '/sobre/', label: 'Sobre' },
  { path: '/gestao/', label: 'Gestão' },
  { path: '/equipes/desenvolvimento/', label: 'Desenvolvimento' },
  { path: '/equipes/design/', label: 'Design' },
  { path: '/equipes/ciberseguranca/', label: 'Cibersegurança' },
];

for (const route of routes) {
  test(`${route.label} (${route.path}): sem violações automatizáveis WCAG A/AA`, async ({ page }) => {
    await page.goto(route.path);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'])
      .analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
}

test('menu mobile aberto: sem violações automatizáveis', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Cenário específico de navegação móvel');
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Menu principal' });
  await toggle.click();
  await expect(page.getByRole('navigation', { name: 'Navegação principal' })).toBeVisible();
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'])
    .analyze();
  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
});

test('formulário de contato em estado de erro e submissão: sem violações automatizáveis', async ({ page }) => {
  await page.route('**/shared-view/**/rows**', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) }),
  );
  await page.goto('/');
  const form = page.locator('#contact-form');
  await form.scrollIntoViewIfNeeded();
  await form.getByRole('button', { name: /Enviar mensagem/ }).click();

  let results = await new AxeBuilder({ page })
    .include('#contato')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'])
    .analyze();
  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);

  await page.getByLabel(/Nome completo/).fill('Estudante Teste');
  await page.getByLabel(/^E-mail/).fill('estudante@cesar.school');
  await page.getByLabel(/Vínculo ou assunto/).selectOption('Estudante');
  await page.getByLabel(/^Mensagem/).fill('Gostaria de conhecer mais sobre as iniciativas do NOS.');
  await form.getByRole('button', { name: /Enviar mensagem/ }).click();

  await expect(page.locator('#contact-feedback')).toBeVisible();
  results = await new AxeBuilder({ page })
    .include('#contato')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'])
    .analyze();
  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
});
