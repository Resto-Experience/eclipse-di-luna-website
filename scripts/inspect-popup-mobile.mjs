import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 375, height: 812 } });
await p.goto('https://www.eclipsediluna.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(3000);

await p.evaluate(() => {
  const el = document.querySelector('.popup-reservetable');
  if (el) { el.style.display = 'flex'; el.style.zIndex = '99999'; }
});
await p.waitForTimeout(1000);

const data = await p.evaluate(() => {
  const grab = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      size: cs.fontSize, lh: cs.lineHeight, align: cs.textAlign,
      box: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
    };
  };
  return {
    c128: grab('.popup-reservetable .container-128'),
    h2: grab('.popup-reservetable h2'),
    p: grab('.popup-reservetable p'),
    c131: grab('.popup-reservetable .container-131'),
  };
});
console.log(JSON.stringify(data, null, 2));
await b.close();
