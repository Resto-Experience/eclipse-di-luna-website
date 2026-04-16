// Capture a specific section side-by-side. Usage: node scripts/section-shot.mjs <selector-or-y>
import { chromium } from 'playwright';
import sharp from 'sharp';

const target = process.argv[2] || 'instagram'; // ad-hoc names

const POSITIONS = {
  about: { liveSelector: 'section.section-4', oursSelector: 'section:nth-of-type(2)' },
  giftcard: { liveSelector: 'section.section-5', oursSelector: 'section:nth-of-type(3)' },
  locations: { liveSelector: 'section.section-6', oursSelector: 'section:nth-of-type(4)' },
  events: { liveSelector: 'section.section-7', oursSelector: 'section:nth-of-type(5)' },
  reviews: { liveSelector: 'section.section-8', oursSelector: 'section:nth-of-type(6)' },
  instagram: { liveSelector: 'section[class*="sction9"], section.section-9', oursSelector: 'section:nth-of-type(7)' },
};

const cfg = POSITIONS[target];
if (!cfg) {
  console.error(`Unknown target: ${target}. Use: ${Object.keys(POSITIONS).join(', ')}`);
  process.exit(1);
}

const browser = await chromium.launch();

async function shot(url, selector, outPath, isLive = false) {
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(isLive ? 5000 : 3000);
  if (isLive) {
    await page.evaluate(() => document.querySelectorAll('[class*="popedad"], [class*="popup"]').forEach(el => el.remove()));
  }
  // scroll to load lazy
  await page.evaluate(async () => {
    await new Promise((r) => {
      let t = 0; const d = 300;
      const i = setInterval(() => { window.scrollBy(0, d); t += d; if (t >= document.body.scrollHeight) { clearInterval(i); r(); } }, 80);
    });
  });
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  const box = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { y: r.top + window.scrollY, h: r.height };
  }, selector);

  if (!box) { console.error(`Selector not found: ${selector}`); return null; }

  await page.evaluate((y) => window.scrollTo(0, y), box.y);
  await page.waitForTimeout(800);
  await page.screenshot({ path: outPath, clip: { x: 0, y: 0, width: 375, height: Math.min(box.h + 40, 1400) } });
  await page.close();
  return box;
}

const liveBox = await shot('https://www.eclipsediluna.com/', cfg.liveSelector, `extracted/qa/section-${target}-live.png`, true);
const oursBox = await shot('http://localhost:3001', cfg.oursSelector, `extracted/qa/section-${target}-ours.png`, false);

await browser.close();

if (liveBox && oursBox) {
  const liveMeta = await sharp(`extracted/qa/section-${target}-live.png`).metadata();
  const oursMeta = await sharp(`extracted/qa/section-${target}-ours.png`).metadata();
  const W = Math.max(liveMeta.width, oursMeta.width);
  const H = Math.max(liveMeta.height, oursMeta.height);

  const canvas = await sharp({ create: { width: W * 2 + 16, height: H, channels: 4, background: { r: 240, g: 240, b: 240, alpha: 1 } } })
    .composite([
      { input: `extracted/qa/section-${target}-live.png`, top: 0, left: 0 },
      { input: `extracted/qa/section-${target}-ours.png`, top: 0, left: W + 16 },
    ])
    .png()
    .toBuffer();

  await sharp(canvas).resize({ width: 700 }).toFile(`extracted/qa/section-${target}-compose.png`);
  console.log(`✅ extracted/qa/section-${target}-compose.png`);
}
