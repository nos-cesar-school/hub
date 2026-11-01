import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('página principal: sem violações automatizáveis WCAG A/AA', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'])
    .analyze();
  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
});

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
