import { test, expect } from '@playwright/test';
import { writeFileSync, mkdirSync } from 'fs';

const ROUTES = [
  { path: '/', name: 'hub', type: 'hub' },
  { path: '/stations/station1/', name: 'station1', type: 'station' },
  { path: '/stations/station2/', name: 'station2', type: 'station' },
  { path: '/stations/station3/', name: 'station3', type: 'station' },
  { path: '/stations/station4/', name: 'station4', type: 'station' },
  { path: '/stations/station5/', name: 'station5', type: 'station' },
  { path: '/stations/station6/', name: 'station6', type: 'station' },
  { path: '/cheat-sheets/pushing-back/', name: 'pushing-back', type: 'cheat-sheet' },
  { path: '/cheat-sheets/selectors-and-reading/', name: 'selectors-and-reading', type: 'cheat-sheet' },
  { path: '/cheat-sheets/dom-security/', name: 'dom-security', type: 'cheat-sheet' },
  { path: '/demos/selector-playground/', name: 'selector-playground', type: 'demo' },
  { path: '/demos/dom-modifier/', name: 'dom-modifier', type: 'demo' },
  { path: '/demos/badge-builder/', name: 'badge-builder', type: 'demo' },
];

// Character appearance matrix
const CHARACTER_MATRIX: Record<string, { hap: boolean; profTeeters: 'required' | 'forbidden' | 'optional'; grace: 'required' | 'forbidden' | 'optional' }> = {
  station1: { hap: true, profTeeters: 'required', grace: 'forbidden' },
  station2: { hap: true, profTeeters: 'forbidden', grace: 'required' },
  station3: { hap: true, profTeeters: 'forbidden', grace: 'required' },
  station4: { hap: true, profTeeters: 'required', grace: 'optional' },
  station5: { hap: true, profTeeters: 'forbidden', grace: 'forbidden' },
  station6: { hap: true, profTeeters: 'forbidden', grace: 'required' },
};

interface PageStats {
  name: string;
  path: string;
  type: string;
  wordCount: number;
  readingTimeMin: number;
  characters: { profTeeters: boolean; grace: boolean };
}

// Only run on desktop
test.use({ viewport: { width: 1280, height: 800 } });

test('generate content quality report', async ({ page }) => {
  const stats: PageStats[] = [];

  for (const route of ROUTES) {
    await page.goto(route.path);
    await page.waitForLoadState('networkidle');

    // Get text content excluding code blocks
    const text = await page.evaluate(() => {
      const clone = document.body.cloneNode(true) as HTMLElement;
      clone.querySelectorAll('pre, code, script, style').forEach(el => el.remove());
      return clone.textContent || '';
    });

    const words = text.split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    const readingTimeMin = Math.ceil(wordCount / 200);

    // Character detection
    const fullText = await page.locator('body').textContent() || '';
    const hasProfTeeters = /prof\.?\s*teeters/i.test(fullText);
    const hasGrace = /grace(\s+hopper)?/i.test(fullText);

    stats.push({
      name: route.name,
      path: route.path,
      type: route.type,
      wordCount,
      readingTimeMin,
      characters: { profTeeters: hasProfTeeters, grace: hasGrace },
    });
  }

  // Generate report
  mkdirSync('reports', { recursive: true });

  let report = '# Content quality report\n\n';
  report += `Generated: ${new Date().toISOString()}\n\n`;

  // Word counts
  report += '## Word counts and reading time\n\n';
  report += '| Page | Type | Words | Reading time |\n';
  report += '| ---- | ---- | ----- | ------------ |\n';
  for (const s of stats) {
    report += `| ${s.name} | ${s.type} | ${s.wordCount} | ${s.readingTimeMin} min |\n`;
  }

  // Character appearances
  report += '\n## Character appearances\n\n';
  report += '| Station | Prof. Teeters | Grace | Status |\n';
  report += '| ------- | ------------- | ----- | ------ |\n';

  for (const s of stats) {
    const matrix = CHARACTER_MATRIX[s.name];
    if (!matrix) continue;

    let profStatus = '';
    if (matrix.profTeeters === 'required') {
      profStatus = s.characters.profTeeters ? 'correct' : 'MISSING (required)';
    } else if (matrix.profTeeters === 'forbidden') {
      profStatus = s.characters.profTeeters ? 'UNEXPECTED (forbidden)' : 'correct';
    }

    let graceStatus = '';
    if (matrix.grace === 'required') {
      graceStatus = s.characters.grace ? 'correct' : 'MISSING (required)';
    } else if (matrix.grace === 'forbidden') {
      graceStatus = s.characters.grace ? 'UNEXPECTED (forbidden)' : 'correct';
    }

    const status = (profStatus.includes('MISSING') || profStatus.includes('UNEXPECTED') ||
                    graceStatus.includes('MISSING') || graceStatus.includes('UNEXPECTED'))
      ? 'REVIEW' : 'OK';

    report += `| ${s.name} | ${s.characters.profTeeters ? 'Present' : 'Absent'} (${profStatus}) | ${s.characters.grace ? 'Present' : 'Absent'} (${graceStatus}) | ${status} |\n`;
  }

  writeFileSync('reports/content-quality-report.md', report);
  console.log('\nContent quality report written to reports/content-quality-report.md');
});

test('generate screenshot gallery', async ({ page }) => {
  const galleryHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HAP DOM - Screenshot Gallery</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; background: hsl(220, 15%, 96%); padding: 2rem; }
    h1 { text-align: center; margin-bottom: 2rem; color: hsl(220, 30%, 25%); }
    .filters { text-align: center; margin-bottom: 2rem; }
    .filters button { padding: 0.5rem 1rem; margin: 0.25rem; border: 1px solid hsl(220, 20%, 80%); background: white; border-radius: 4px; cursor: pointer; }
    .filters button.active { background: hsl(220, 60%, 50%); color: white; border-color: hsl(220, 60%, 50%); }
    .grid { display: grid; grid-template-columns: 1fr; gap: 2rem; max-width: 1400px; margin: 0 auto; }
    .page-row { background: white; border-radius: 8px; padding: 1.5rem; box-shadow: 0 1px 3px hsl(0, 0%, 0%, 0.1); }
    .page-row h2 { margin-bottom: 0.5rem; color: hsl(220, 30%, 30%); }
    .page-row .meta { color: hsl(220, 10%, 50%); font-size: 0.875rem; margin-bottom: 1rem; }
    .screenshots { display: grid; grid-template-columns: 2fr 1fr; gap: 1rem; align-items: start; }
    .screenshots img { width: 100%; border: 1px solid hsl(220, 15%, 88%); border-radius: 4px; }
    .screenshots .label { font-size: 0.75rem; color: hsl(220, 10%, 50%); text-align: center; margin-top: 0.25rem; }
  </style>
</head>
<body>
  <h1>HAP's Learning Lab: The DOM - Screenshot Gallery</h1>
  <div class="filters">
    <button class="active" onclick="filter('all')">All</button>
    <button onclick="filter('hub')">Hub</button>
    <button onclick="filter('station')">Stations</button>
    <button onclick="filter('cheat-sheet')">Cheat Sheets</button>
    <button onclick="filter('demo')">Demos</button>
  </div>
  <div class="grid">
${ROUTES.map(r => `    <div class="page-row" data-type="${r.type}">
      <h2>${r.name}</h2>
      <div class="meta">${r.path} &middot; ${r.type}</div>
      <div class="screenshots">
        <div>
          <img src="screenshots/desktop/${r.name}.png" alt="${r.name} desktop" loading="lazy">
          <div class="label">Desktop (1280 x 800)</div>
        </div>
        <div>
          <img src="screenshots/mobile/${r.name}.png" alt="${r.name} mobile" loading="lazy">
          <div class="label">Mobile (375 x 667)</div>
        </div>
      </div>
    </div>`).join('\n')}
  </div>
  <script>
    function filter(type) {
      document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
      event.target.classList.add('active');
      document.querySelectorAll('.page-row').forEach(row => {
        row.style.display = (type === 'all' || row.dataset.type === type) ? '' : 'none';
      });
    }
  </script>
</body>
</html>`;

  writeFileSync('reports/review-gallery.html', galleryHtml);
  console.log('\nScreenshot gallery written to reports/review-gallery.html');
});
