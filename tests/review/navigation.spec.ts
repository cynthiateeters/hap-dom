import { test, expect } from '@playwright/test';

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

test.describe('internal links resolve', () => {
  for (const route of ROUTES) {
    test(`all links on ${route}`, async ({ page }) => {
      await page.goto(route);

      const hrefs = await page.$$eval('a[href^="/"]', anchors =>
        [...new Set(anchors.map(a => a.getAttribute('href')!))]
      );

      for (const href of hrefs) {
        const response = await page.request.get(href);
        expect(response.status(), `${href} from ${route}`).toBe(200);
      }
    });
  }
});

test.describe('station prev/next chain', () => {
  const stationChain = [
    { path: '/stations/station1/', prev: null, next: '/stations/station2/' },
    { path: '/stations/station2/', prev: '/stations/station1/', next: '/stations/station3/' },
    { path: '/stations/station3/', prev: '/stations/station2/', next: '/stations/station4/' },
    { path: '/stations/station4/', prev: '/stations/station3/', next: '/stations/station5/' },
    { path: '/stations/station5/', prev: '/stations/station4/', next: '/stations/station6/' },
    { path: '/stations/station6/', prev: '/stations/station5/', next: null },
  ];

  for (const station of stationChain) {
    test(`${station.path} navigation links`, async ({ page }) => {
      await page.goto(station.path);

      if (station.prev) {
        const prevLink = page.locator(`a[href="${station.prev}"]`);
        await expect(prevLink).toBeVisible();
      }

      if (station.next) {
        const nextLink = page.locator(`a[href="${station.next}"]`);
        await expect(nextLink).toBeVisible();
      }

      // Hub link
      const hubLink = page.locator('a[href="/"]');
      await expect(hubLink.first()).toBeVisible();
    });
  }
});

test.describe('cheat sheet banner links', () => {
  const cheatSheetStations = [
    { station: '/stations/station2/', csUrl: '/cheat-sheets/pushing-back/' },
    { station: '/stations/station3/', csUrl: '/cheat-sheets/selectors-and-reading/' },
    { station: '/stations/station4/', csUrl: '/cheat-sheets/dom-security/' },
  ];

  for (const { station, csUrl } of cheatSheetStations) {
    test(`${station} links to ${csUrl}`, async ({ page }) => {
      await page.goto(station);
      const csLink = page.locator(`a[href="${csUrl}"]`);
      await expect(csLink.first()).toBeVisible();
    });
  }
});

test.describe('demo banner links', () => {
  const demoStations = [
    { station: '/stations/station3/', demoUrl: '/demos/selector-playground/' },
    { station: '/stations/station4/', demoUrl: '/demos/dom-modifier/' },
    { station: '/stations/station5/', demoUrl: '/demos/badge-builder/' },
  ];

  for (const { station, demoUrl } of demoStations) {
    test(`${station} links to ${demoUrl}`, async ({ page }) => {
      await page.goto(station);
      const demoLink = page.locator(`a[href="${demoUrl}"]`);
      await expect(demoLink.first()).toBeVisible();
    });
  }
});
