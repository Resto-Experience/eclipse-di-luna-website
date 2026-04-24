import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('https://www.eclipsediluna.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(3500);

await p.evaluate(() => {
  ['.popup-reservetable', '.popup-orderonline', '.popup-giftcard'].forEach(s => {
    const el = document.querySelector(s);
    if (el) { el.style.display = 'flex'; el.style.zIndex = '99999'; }
  });
});
await p.waitForTimeout(1500);

const data = await p.evaluate(() => {
  const grab = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el);
    return {
      text: el.textContent?.trim().slice(0, 200),
      size: cs.fontSize, lh: cs.lineHeight, weight: cs.fontWeight,
      font: cs.fontFamily, color: cs.color, align: cs.textAlign,
    };
  };
  return {
    reserve_h2: grab('.popup-reservetable h2'),
    reserve_p: grab('.popup-reservetable p'),
    order_h2: grab('.popup-orderonline h2'),
    order_p: grab('.popup-orderonline p'),
    giftcard_h2: grab('.popup-giftcard h2'),
    giftcard_p: grab('.popup-giftcard p'),
  };
});
console.log(JSON.stringify(data, null, 2));
await b.close();
