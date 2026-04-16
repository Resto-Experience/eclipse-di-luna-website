import { chromium } from 'playwright';
const browser = await chromium.launch();
async function go(viewport, label) {
  const page = await browser.newPage({ viewport });
  await page.goto('https://www.eclipsediluna.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3000);
  const logos = await page.evaluate(() => {
    const nav = document.querySelector('nav, header, [class*="nav"], [class*="header"]');
    if (!nav) return [];
    return Array.from(nav.querySelectorAll('img')).map(i => ({
      src: i.currentSrc || i.src,
      alt: i.alt,
      w: Math.round(i.getBoundingClientRect().width),
      h: Math.round(i.getBoundingClientRect().height),
    }));
  });
  console.log(label, JSON.stringify(logos, null, 2));
  await page.close();
}
await go({ width: 375, height: 812 }, 'mobile');
await go({ width: 1440, height: 900 }, 'desktop');
await browser.close();
