// Focused capture: live About section in mobile, full height (no clip), so we see buttons + carousel + opentable.
import { chromium } from 'playwright';
import sharp from 'sharp';

const browser = await chromium.launch();

const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
await page.goto('https://www.eclipsediluna.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(3000);
await page.evaluate(() => document.querySelectorAll('[class*="popedad"], [class*="popup"]').forEach(el => el.remove()));
await page.evaluate(async () => {
  await new Promise((r) => { let t = 0; const i = setInterval(() => { window.scrollBy(0, 300); t += 300; if (t >= document.body.scrollHeight) { clearInterval(i); r(); } }, 80); });
});
await page.waitForTimeout(2000);

// Find about section by Y of OpenTable image
const aboutY = await page.evaluate(() => {
  // Find About Us pill SVG
  const pill = Array.from(document.querySelectorAll('img')).find(i => i.src.includes('Frame%202.svg'));
  if (!pill) return 0;
  const r = pill.getBoundingClientRect();
  return Math.max(0, r.top + window.scrollY - 200);
});

await page.evaluate((y) => window.scrollTo(0, y), aboutY);
await page.waitForTimeout(1000);

// Capture 1200px tall to get carousel + about + buttons + opentable + start of next
await page.screenshot({ path: 'extracted/qa/about-live-mobile-zoom.png', clip: { x: 0, y: 0, width: 375, height: 812 } });

// Scroll a bit more for buttons + opentable
await page.evaluate(() => window.scrollBy(0, 600));
await page.waitForTimeout(500);
await page.screenshot({ path: 'extracted/qa/about-live-mobile-zoom2.png', clip: { x: 0, y: 0, width: 375, height: 812 } });

await browser.close();
console.log('done');
