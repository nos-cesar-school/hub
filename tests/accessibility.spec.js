import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = [
  { path: '/', label: 'Home' },
  { path: '/integrantes/', label: 'Integrantes' },
  { path: '/sobre/', label: 'Sobre' },
  { path: '/gestao/', label: 'Gestão' },
  { path: '/equipes/desenvolvimento/', label: 'Desenvolvimento' },
  { path: '/equipes/design/', label: 'Design' },
  { path: '/equipes/ciberseguranca/', label: 'Cibersegurança' },
  { path: '/404.html', label: 'Página 404' },
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

test('WCAG 2.5.8: todos os controles interativos visíveis atendem ao tamanho mínimo de 24×24 px', async ({ page }) => {
  for (const route of routes) {
    await page.goto(route.path);
    const undersized = await page.evaluate(() => {
      const selector =
        'header .brand, header .menu-toggle, header .site-nav > a, header .icon-btn, header nav > a, main a[href], main button, main input:not([tabindex="-1"]), main select, main textarea, footer a[href]';
      const issues = [];

      for (const el of document.querySelectorAll(selector)) {
        const style = getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden' || parseFloat(style.opacity) === 0) continue;
        if (el.closest('[popover]:not(:popover-open)') && getComputedStyle(el.closest('[popover]')).display === 'none') {
          continue;
        }
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;
        if (rect.width < 24 || rect.height < 24) {
          issues.push({
            tag: el.tagName.toLowerCase(),
            text: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 40),
            width: Math.round(rect.width * 10) / 10,
            height: Math.round(rect.height * 10) / 10,
          });
        }
      }
      return issues;
    });

    expect(undersized, `${route.path}: ${JSON.stringify(undersized)}`).toEqual([]);
  }
});

test('WCAG 2.4.7 e 2.4.11: navegação por Tab mantém foco visível e não encoberto pelo cabeçalho fixo', async ({
  page,
}) => {
  await page.goto('/');
  for (let step = 0; step < 14; step += 1) {
    await page.keyboard.press('Tab');
    const state = await page.evaluate(() => {
      const active = document.activeElement;
      if (!active || active === document.body) return null;
      const styles = getComputedStyle(active);
      const rect = active.getBoundingClientRect();
      const header = document.querySelector('.site-header, header.nav');
      const headerBottom = header ? header.getBoundingClientRect().bottom : 0;
      const insideMainOrFooter = Boolean(active.closest('main, footer'));
      return {
        outlineStyle: styles.outlineStyle,
        outlineWidth: parseFloat(styles.outlineWidth),
        insideMainOrFooter,
        obscuredCompletely: insideMainOrFooter && rect.bottom <= headerBottom,
      };
    });

    expect(state).not.toBeNull();
    expect(state.outlineStyle).not.toBe('none');
    expect(state.outlineWidth).toBeGreaterThanOrEqual(2);
    expect(state.obscuredCompletely).toBe(false);
  }
});
