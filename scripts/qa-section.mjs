// Captures live + ours screenshot for ONE section, side by side
import { chromium } from 'playwright';

const SECTION = process.argv[2] || 'navbar';
const LIVE_SELECTOR = process.argv[3] || '.section-3';
const OUR_OFFSET = parseInt(process.argv[4] || '0'); // pixels to scroll on our site

const SECTION_HEIGHT = parseInt(process.argv[5] || '900');

(async () => {
  const browser = await chromium.launch();

  // Live
  const live = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await live.goto('https://www.eclipsediluna.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await live.waitForTimeout(5000);
  await live.evaluate(() => {
    document.querySelectorAll('[class*="popedad"], [class*="popup"]').forEach(el => el.remove());
  });

  if (LIVE_SELECTOR === 'top') {
    await live.evaluate(() => window.scrollTo(0, 0));
  } else {
    await live.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (el) {
        const r = el.getBoundingClientRect();
        window.scrollTo(0, r.top + window.scrollY - 100);
      }
    }, LIVE_SELECTOR);
  }
  await live.waitForTimeout(1500);
  await live.screenshot({
    path: `extracted/qa/${SECTION}-live.png`,
    clip: { x: 0, y: 0, width: 1440, height: SECTION_HEIGHT }
  });

  // Ours
  const ours = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await ours.goto('http://localhost:3001', { waitUntil: 'domcontentloaded' });
  await ours.waitForTimeout(3000);
  if (OUR_OFFSET > 0) {
    await ours.evaluate((y) => window.scrollTo(0, y), OUR_OFFSET);
    await ours.waitForTimeout(1000);
  }
  await ours.screenshot({
    path: `extracted/qa/${SECTION}-ours.png`,
    clip: { x: 0, y: 0, width: 1440, height: SECTION_HEIGHT }
  });

  await browser.close();
  console.log(`✅ ${SECTION}: live + ours captured`);
})();
