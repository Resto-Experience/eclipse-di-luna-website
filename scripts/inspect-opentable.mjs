// Dump all images from live for manual inspection.
import { chromium } from 'playwright';

const browser = await chromium.launch();

async function inspect(viewport, label) {
  const page = await browser.newPage({ viewport });
  await page.goto('https://www.eclipsediluna.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForLoadState('load', { timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(3000);

  await page.evaluate(() => {
    document.querySelectorAll('[class*="popedad"], [class*="popup"]').forEach(el => el.remove());
  });

  await page.evaluate(async () => {
    await new Promise((r) => {
      let t = 0; const d = 300;
      const i = setInterval(() => { window.scrollBy(0, d); t += d; if (t >= document.body.scrollHeight) { clearInterval(i); r(); } }, 80);
    });
  });
  await page.waitForTimeout(2000);

  const images = await page.evaluate(() => {
    const arr = [];
    document.querySelectorAll('img').forEach((img) => {
      const r = img.getBoundingClientRect();
      arr.push({
        src: img.currentSrc || img.src,
        alt: img.alt || '',
        nW: img.naturalWidth,
        nH: img.naturalHeight,
        dW: Math.round(r.width),
        dH: Math.round(r.height),
        top: Math.round(r.top + window.scrollY),
      });
    });
    return arr;
  });

  console.log(`\n=== ${label} (${viewport.width}) — ${images.length} images ===`);
  // Show only images with meaningful dimensions, sorted by Y position
  const filtered = images
    .filter(i => i.nW > 100)
    .sort((a, b) => a.top - b.top);

  for (const img of filtered) {
    const file = img.src.split('/').pop().split('?')[0];
    console.log(`y=${String(img.top).padStart(5)} ${img.nW}x${img.nH} → ${img.dW}x${img.dH}  ${file}  alt="${img.alt.slice(0, 40)}"`);
  }

  await page.close();
}

await inspect({ width: 375, height: 812 }, 'mobile');
await inspect({ width: 1440, height: 900 }, 'desktop');

await browser.close();
