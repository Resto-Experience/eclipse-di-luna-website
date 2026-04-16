// Get full URLs of OpenTable + About carousel images at both viewports.
import { chromium } from 'playwright';

const browser = await chromium.launch();

async function getUrls(viewport, label) {
  const page = await browser.newPage({ viewport });
  await page.goto('https://www.eclipsediluna.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3000);
  await page.evaluate(async () => {
    await new Promise((r) => { let t = 0; const i = setInterval(() => { window.scrollBy(0, 300); t += 300; if (t >= document.body.scrollHeight) { clearInterval(i); r(); } }, 80); });
  });
  await page.waitForTimeout(2000);
  const urls = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img'))
      .map(i => ({ src: i.currentSrc || i.src, srcset: i.srcset || '', alt: i.alt }))
      .filter(i => i.src.includes('Frame%201000009052') || i.src.includes('Frame%201000008915'));
  });
  console.log(`\n=== ${label} (${viewport.width}px) ===`);
  console.log(JSON.stringify(urls, null, 2));
  await page.close();
}

await getUrls({ width: 375, height: 812 }, 'mobile');
await getUrls({ width: 1440, height: 900 }, 'desktop');

await browser.close();
