import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('https://www.eclipsediluna.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(3500);

// Force show popup by setting display flex via inline style for inspection
await p.evaluate(() => {
  const el = document.querySelector('.popup-reservetable');
  if (el) {
    el.style.display = 'flex';
    el.style.zIndex = '99999';
  }
});
await p.waitForTimeout(2000);

const data = await p.evaluate(() => {
  const grab = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      sel,
      text: el.textContent?.trim().slice(0, 150),
      box: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
      font: cs.fontFamily,
      size: cs.fontSize,
      weight: cs.fontWeight,
      lh: cs.lineHeight,
      color: cs.color,
      align: cs.textAlign,
      margin: cs.margin,
      padding: cs.padding,
    };
  };
  return {
    popup: grab('.popup-reservetable'),
    div: grab('.popup-reservetable .popup-div'),
    c128: grab('.popup-reservetable .container-128'),
    c129: grab('.popup-reservetable .container-129'),
    h2: grab('.popup-reservetable h2.heading-32'),
    p: grab('.popup-reservetable p.paragraph-47'),
    c131: grab('.popup-reservetable .container-131'),
    embed: grab('.popup-reservetable .code-embed-16'),
    iframe: grab('.popup-reservetable .code-embed-16 iframe'),
  };
});
console.log(JSON.stringify(data, null, 2));
await b.close();
