import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const ROUTES = [
  '/',
  '/stations/station1/',
  '/stations/station2/',
  '/stations/station3/',
  '/stations/station4/',
  '/stations/station5/',
  '/stations/station6/',
  '/cheat-sheets/pushing-back/',
  '/cheat-sheets/selectors-and-reading/',
  '/cheat-sheets/dom-security/',
  '/demos/selector-playground/',
  '/demos/dom-modifier/',
  '/demos/badge-builder/',
];

for (const route of ROUTES) {
  test(`accessibility: ${route}`, async ({ page }) => {
    await page.goto(route);
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    const violations = results.violations.map(v => ({
      id: v.id,
      impact: v.impact,
      description: v.description,
      nodes: v.nodes.length,
      elements: v.nodes.slice(0, 3).map(n => n.html),
    }));

    if (violations.length > 0) {
      console.log(`\nA11y violations on ${route}:`);
      for (const v of violations) {
        console.log(`  [${v.impact}] ${v.id}: ${v.description} (${v.nodes} elements)`);
        for (const el of v.elements) {
          console.log(`    ${el.substring(0, 120)}`);
        }
      }
    }

    // Fail on serious/critical violations only
    const critical = results.violations.filter(
      v => v.impact === 'critical' || v.impact === 'serious'
    );
    expect(critical, `Critical/serious a11y violations on ${route}`).toEqual([]);
  });
}
