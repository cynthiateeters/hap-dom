import { test, expect } from '@playwright/test';

const ROUTES = [
  { path: '/', name: 'hub', type: 'hub', hasCodeBlock: false },
  { path: '/stations/station1/', name: 'station1', type: 'station', hasCodeBlock: true },
  { path: '/stations/station2/', name: 'station2', type: 'station', hasCodeBlock: true },
  { path: '/stations/station3/', name: 'station3', type: 'station', hasCodeBlock: true },
  { path: '/stations/station4/', name: 'station4', type: 'station', hasCodeBlock: true },
  { path: '/stations/station5/', name: 'station5', type: 'station', hasCodeBlock: true },
  { path: '/stations/station6/', name: 'station6', type: 'station', hasCodeBlock: false },
  { path: '/cheat-sheets/pushing-back/', name: 'pushing-back', type: 'cheat-sheet', hasCodeBlock: true },
  { path: '/cheat-sheets/selectors-and-reading/', name: 'selectors-and-reading', type: 'cheat-sheet', hasCodeBlock: true },
  { path: '/cheat-sheets/dom-security/', name: 'dom-security', type: 'cheat-sheet', hasCodeBlock: true },
  { path: '/demos/selector-playground/', name: 'selector-playground', type: 'demo', hasCodeBlock: false },
  { path: '/demos/dom-modifier/', name: 'dom-modifier', type: 'demo', hasCodeBlock: false },
  { path: '/demos/badge-builder/', name: 'badge-builder', type: 'demo', hasCodeBlock: false },
];

for (const route of ROUTES) {
  test.describe(`${route.name} (${route.path})`, () => {
    test('loads without errors', async ({ page }) => {
      const errors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
      });

      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);
      expect(errors).toEqual([]);
    });

    test('no broken images', async ({ page }) => {
      await page.goto(route.path);
      await page.waitForLoadState('networkidle');

      const brokenImages = await page.$$eval('img', imgs =>
        imgs
          .filter(img => {
            // Skip external images (Cloudinary) — they may not load in local test
            if (img.src.includes('cloudinary') || img.src.startsWith('http')) return false;
            return !img.complete || img.naturalWidth === 0;
          })
          .map(img => img.src)
      );
      expect(brokenImages).toEqual([]);
    });

    test('screenshot', async ({ page }, testInfo) => {
      await page.goto(route.path);
      await page.waitForLoadState('networkidle');

      const viewport = testInfo.project.name; // 'desktop' or 'mobile'
      await page.screenshot({
        path: `reports/screenshots/${viewport}/${route.name}.png`,
        fullPage: true,
      });
    });

    test('no empty content sections', async ({ page }) => {
      await page.goto(route.path);

      const emptySections = await page.$$eval('.content-section', sections =>
        sections
          .filter(s => (s.textContent?.trim().length ?? 0) === 0)
          .map((_, i) => `section[${i}]`)
      );
      expect(emptySections).toEqual([]);
    });

    if (route.hasCodeBlock) {
      test('code blocks rendered', async ({ page }) => {
        await page.goto(route.path);
        const codeBlocks = await page.$$('pre code');
        expect(codeBlocks.length).toBeGreaterThan(0);

        // No raw backtick strings visible
        const rawBackticks = await page.$$eval('*', els =>
          els.filter(el => el.textContent?.includes('```')).length
        );
        expect(rawBackticks).toBe(0);
      });
    }
  });
}
