import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('https://www.eclipsediluna.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(3000);
const data = await p.evaluate(() => {
  const el = document.querySelector('.container-138, .ppup');
  if (!el) return null;
  const s = getComputedStyle(el);
  const r = el.getBoundingClientRect();
  return {
    cls: el.className,
    bgImage: s.backgroundImage,
    w: Math.round(r.width),
    h: Math.round(r.height),
    href: el.getAttribute('href'),
  };
});
console.log(JSON.stringify(data, null, 2));
await b.close();
