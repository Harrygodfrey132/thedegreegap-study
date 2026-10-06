#!/usr/bin/env node
/*
 * Render the banner creatives on /study/banner-creatives/ to PNG, at standard
 * and double resolution, into static/images/banners/. Re-run it after changing
 * a banner in layouts/_default/banner-creatives.html.
 *
 * Needs Playwright with Chromium, and the site served locally:
 *   hugo server -p 1313 --baseURL http://localhost:1313/study/
 *   node scripts/export-banners.js
 *
 * Optional arguments: the page URL, then the output folder.
 *   node scripts/export-banners.js http://localhost:1313/study/banner-creatives/ static/images/banners
 */
let chromium;
try { ({ chromium } = require('playwright')); } catch (e) {
  console.error('Playwright is not installed. Run: npm install -g playwright && npx playwright install chromium');
  process.exit(1);
}
const path = require('path');

const url = process.argv[2] || 'http://localhost:1313/study/banner-creatives/';
const out = process.argv[3] || path.join(__dirname, '..', 'static', 'images', 'banners');

(async () => {
  const browser = await chromium.launch();
  for (const scale of [1, 2]) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: scale });
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    // Hide everything but the banners and drop the page background, so the
    // rounded corners of the native unit come out transparent.
    await page.addStyleTag({ content: `
      html, body, .bc-page, .bc-frame { background: transparent !important; }
      body * { visibility: hidden !important; }
      [data-unit], [data-unit] * { visibility: visible !important; }` });
    const units = await page.$$eval('[data-unit]', els => els.map(e => e.getAttribute('data-unit')));
    for (const unit of units) {
      const el = await page.$(`[data-unit="${unit}"]`);
      // Pin the unit to the top-left corner so the capture starts on a whole
      // pixel and comes out at exactly the slot size. The native unit is fluid;
      // export it at its full 620px width.
      const size = await el.evaluate((e, native) => {
        e.style.cssText += ';position:fixed;top:0;left:0;margin:0;z-index:2147483647;' + (native ? 'width:620px;' : '');
        return { width: e.offsetWidth, height: e.offsetHeight };
      }, unit === 'native-620');
      const file = path.join(out, `the-degree-gap-${unit}${scale === 2 ? '@2x' : ''}.png`);
      await page.screenshot({ path: file, clip: { x: 0, y: 0, ...size }, omitBackground: true });
      await el.evaluate(e => { e.style.position = ''; e.style.top = ''; e.style.left = ''; e.style.zIndex = ''; });
      console.log('wrote', path.relative(process.cwd(), file), `${size.width}x${size.height} at ${scale}x`);
    }
    await page.close();
  }
  await browser.close();
})();
