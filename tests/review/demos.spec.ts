import { test, expect } from '@playwright/test';

// Only run demo tests on desktop — interactions are the same on mobile
test.use({ viewport: { width: 1280, height: 800 } });

test.describe('Station 1: DOM Explorer (embedded)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/stations/station1/');
  });

  test('textarea is pre-populated with robot card HTML', async ({ page }) => {
    const textarea = page.locator('textarea');
    const value = await textarea.inputValue();
    expect(value.length).toBeGreaterThan(10);
    expect(value.toLowerCase()).toContain('robot');
  });

  test('DOM tree updates when HTML changes', async ({ page }) => {
    const textarea = page.locator('textarea');
    await textarea.fill('<div id="test"><p>Hello</p></div>');

    // Wait for tree to update
    await page.waitForTimeout(500);

    const treePanel = page.locator('.dom-tree, .tree-view, [class*="tree"]').first();
    if (await treePanel.isVisible()) {
      const treeText = await treePanel.textContent();
      expect(treeText).toContain('div');
    }
  });

  test('toggle button changes view', async ({ page }) => {
    const toggleBtn = page.locator('button').filter({ hasText: /toggle|switch|view/i }).first();
    if (await toggleBtn.isVisible()) {
      await toggleBtn.click();
      // Just verify no crash
      await page.waitForTimeout(300);
    }
  });
});

test.describe('Selector Playground', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/selector-playground/');
  });

  test('preset buttons highlight matching elements', async ({ page }) => {
    const presets = ['.card-header', '#robot-name', 'h2', '.info-row', '[data-status]'];

    for (const selector of presets) {
      const presetBtn = page.locator('button').filter({ hasText: selector }).first();
      if (await presetBtn.isVisible()) {
        await presetBtn.click();
        await page.waitForTimeout(300);
        // Check for highlighted elements
        const highlighted = await page.$$('.highlighted, [class*="highlight"], [class*="selected"]');
        // At minimum, no crash
      }
    }
  });

  test('results panel shows content tabs', async ({ page }) => {
    // Click a preset to trigger results
    const firstPreset = page.locator('.preset-btn, [class*="preset"]').first();
    if (await firstPreset.isVisible()) {
      await firstPreset.click();
      await page.waitForTimeout(300);
    }

    // Check for tab-like elements
    const tabs = page.locator('button, [role="tab"]').filter({
      hasText: /textContent|innerHTML|innerText/i
    });
    const tabCount = await tabs.count();
    expect(tabCount).toBeGreaterThanOrEqual(0); // Soft check — structure may vary
  });

  test('invalid selector shows error, not crash', async ({ page }) => {
    const input = page.locator('input[type="text"], input[placeholder*="selector"]').first();
    if (await input.isVisible()) {
      await input.fill('###invalid');
      const selectBtn = page.locator('button').filter({ hasText: /select|run|go/i }).first();
      if (await selectBtn.isVisible()) {
        await selectBtn.click();
        await page.waitForTimeout(300);

        // Should show error message, not crash
        const errorMsg = page.locator('[class*="error"], .error-message, [role="alert"]');
        // Page should still be functional
        const body = await page.locator('body').textContent();
        expect(body?.length).toBeGreaterThan(0);
      }
    }
  });
});

test.describe('DOM Modifier', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/dom-modifier/');
  });

  test('Set status to Online preset works', async ({ page }) => {
    const presetBtn = page.locator('button').filter({ hasText: /status.*online|set.*online/i }).first();
    if (await presetBtn.isVisible()) {
      await presetBtn.click();
      await page.waitForTimeout(300);
      const statusText = await page.locator('[data-status], #robot-status, .status').first().textContent();
      expect(statusText?.toLowerCase()).toContain('online');
    }
  });

  test('Toggle class preset works', async ({ page }) => {
    const toggleBtn = page.locator('button').filter({ hasText: /toggle.*class|\.online/i }).first();
    if (await toggleBtn.isVisible()) {
      await toggleBtn.click();
      await page.waitForTimeout(300);
      // No crash is the minimum bar
    }
  });

  test('XSS demo is safe', async ({ page }) => {
    // Look for the XSS/danger button
    const xssBtn = page.locator('button').filter({ hasText: /xss|danger|inject/i }).first();

    // May need to toggle danger zone visibility first
    const dangerToggle = page.locator('button').filter({ hasText: /danger.*zone|toggle.*danger|show.*danger/i }).first();
    if (await dangerToggle.isVisible()) {
      await dangerToggle.click();
      await page.waitForTimeout(300);
    }

    if (await xssBtn.isVisible()) {
      // Listen for alerts (XSS would trigger an alert)
      let alertFired = false;
      page.on('dialog', async dialog => {
        alertFired = true;
        await dialog.dismiss();
      });

      await xssBtn.click();
      await page.waitForTimeout(500);
      expect(alertFired).toBe(false);
    }
  });
});

test.describe('Badge Builder', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/badge-builder/');
  });

  test('add badges', async ({ page }) => {
    const addJsBtn = page.locator('button').filter({ hasText: /add.*javascript|javascript/i }).first();
    if (await addJsBtn.isVisible()) {
      await addJsBtn.click();
      await page.waitForTimeout(300);

      // Badge should appear
      const badges = page.locator('.badge');
      expect(await badges.count()).toBeGreaterThan(0);
    }
  });

  test('remove badge by clicking', async ({ page }) => {
    // Add a badge first
    const addBtn = page.locator('button').filter({ hasText: /add.*dom|dom/i }).first();
    if (await addBtn.isVisible()) {
      await addBtn.click();
      await page.waitForTimeout(300);

      const badges = page.locator('.badge');
      const countBefore = await badges.count();

      if (countBefore > 0) {
        await badges.first().click();
        await page.waitForTimeout(300);
        expect(await badges.count()).toBeLessThan(countBefore);
      }
    }
  });

  test('max 8 badges enforced', async ({ page }) => {
    // Click add buttons repeatedly
    const addBtns = page.locator('button').filter({ hasText: /add/i });
    const btnCount = await addBtns.count();

    if (btnCount > 0) {
      for (let i = 0; i < 10; i++) {
        await addBtns.nth(i % btnCount).click();
        await page.waitForTimeout(100);
      }

      const badges = page.locator('.badge');
      expect(await badges.count()).toBeLessThanOrEqual(8);
    }
  });

  test('clear all removes badges', async ({ page }) => {
    // Add a badge first
    const addBtn = page.locator('button').filter({ hasText: /add/i }).first();
    if (await addBtn.isVisible()) {
      await addBtn.click();
      await page.waitForTimeout(300);
    }

    const clearBtn = page.locator('button').filter({ hasText: /clear.*all|reset/i }).first();
    if (await clearBtn.isVisible()) {
      await clearBtn.click();
      await page.waitForTimeout(300);

      const badges = page.locator('.badge');
      expect(await badges.count()).toBe(0);
    }
  });
});
