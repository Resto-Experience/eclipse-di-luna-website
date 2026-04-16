// Capture mobile screenshots of every section, side by side.
// Outputs both full-resolution PNGs and downscaled "-sm" versions (<=600px wide)
// so we can read the small ones for QA without burning context.
import { chromium } from 'playwright';
import sharp from 'sharp';
import { readdir } from 'node:fs/promises';
import { join, dirname, basename, extname } from 'node:path';

const VIEWPORT = { width: 375, height: 812 };
const OUT_DIR = 'extracted/qa';
const DOWNSCALE_WIDTH = 600;

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const distance = 300;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        total += distance;
        if (total >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

async function downscale(srcPath) {
  const dir = dirname(srcPath);
  const ext = extname(srcPath);
  const name = basename(srcPath, ext);
  const outPath = join(dir, `${name}-sm${ext}`);
  await sharp(srcPath)
    .resize({ width: DOWNSCALE_WIDTH, withoutEnlargement: true })
    .png({ quality: 80, compressionLevel: 9 })
    .toFile(outPath);
  return outPath;
}

(async () => {
  const browser = await chromium.launch();

  // Live
  const live = await browser.newPage({ viewport: VIEWPORT });
  await live.goto('https://www.eclipsediluna.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await live.waitForTimeout(5000);
  await live.evaluate(() => {
    document.querySelectorAll('[class*="popedad"], [class*="popup"]').forEach(el => el.remove());
  });
  await autoScroll(live);
  await live.waitForTimeout(2000);
  await live.evaluate(() => window.scrollTo(0, 0));
  await live.waitForTimeout(1000);
  await live.screenshot({ path: `${OUT_DIR}/mobile-live-full.png`, fullPage: true });

  // Ours
  const ours = await browser.newPage({ viewport: VIEWPORT });
  await ours.goto('http://localhost:3001', { waitUntil: 'domcontentloaded' });
  await ours.waitForTimeout(3000);
  await autoScroll(ours);
  await ours.waitForTimeout(2000);
  await ours.evaluate(() => window.scrollTo(0, 0));
  await ours.waitForTimeout(1000);
  await ours.screenshot({ path: `${OUT_DIR}/mobile-ours-full.png`, fullPage: true });

  // Section-by-section (live only — for the live reference shots)
  const liveSections = await live.evaluate(() => {
    return Array.from(document.querySelectorAll('section')).map((s, i) => ({
      i, class: s.className, top: s.getBoundingClientRect().top + window.scrollY, height: s.getBoundingClientRect().height
    }));
  });

  const sectionsToCapture = [
    { name: 'hero', class: 'section-3' },
    { name: 'about', class: 'section-4' },
    { name: 'giftcard', class: 'section-5' },
    { name: 'locations', class: 'section-6' },
    { name: 'events', class: 'section-7' },
    { name: 'reviews', class: 'section-8' },
  ];

  for (const sec of sectionsToCapture) {
    const found = liveSections.find(s => s.class.startsWith(sec.class) && !s.class.includes('sction9'));
    if (found) {
      await live.evaluate((y) => window.scrollTo(0, y), found.top);
      await live.waitForTimeout(1000);
      await live.screenshot({
        path: `${OUT_DIR}/mobile-${sec.name}-live.png`,
        clip: { x: 0, y: 0, width: 375, height: Math.min(found.height + 50, 812) }
      });
    }
  }

  await browser.close();

  // Downscale every PNG we just produced (skip already-downscaled "-sm" files)
  const files = await readdir(OUT_DIR);
  const targets = files
    .filter(f => f.startsWith('mobile-') && f.endsWith('.png') && !f.includes('-sm'))
    .map(f => join(OUT_DIR, f));

  await Promise.all(targets.map(async (p) => {
    const out = await downscale(p);
    console.log(`  → ${basename(out)}`);
  }));

  console.log(`\n✅ Mobile audit ready (${targets.length} screenshots, downscaled to <=${DOWNSCALE_WIDTH}px)`);
})();
