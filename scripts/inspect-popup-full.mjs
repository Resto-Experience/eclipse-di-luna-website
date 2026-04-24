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
await p.waitForTimeout(1200);

const data = await p.evaluate(() => {
  // Full HTML of each popup
  const out = {};
  ['.popup-reservetable', '.popup-orderonline', '.popup-giftcard'].forEach(s => {
    const el = document.querySelector(s);
    if (!el) return;
    out[s] = {
      html: el.outerHTML,
    };
  });
  // Sniff for any divider-like elements between h2 and iframe
  const r = document.querySelector('.popup-reservetable');
  if (r) {
    const nodes = Array.from(r.querySelectorAll('*')).map(c => {
      const cs = getComputedStyle(c);
      const rect = c.getBoundingClientRect();
      return {
        tag: c.tagName,
        cls: c.className?.toString().slice(0, 120),
        bg: cs.backgroundColor,
        bgImg: cs.backgroundImage !== 'none' ? cs.backgroundImage.slice(0, 200) : null,
        border: cs.borderBottom !== '0px none rgb(51, 51, 51)' ? cs.borderBottom : null,
        box: { w: Math.round(rect.width), h: Math.round(rect.height) },
        text: c.textContent?.trim().slice(0, 40),
      };
    });
    out.reserveNodes = nodes;
  }
  return out;
});
console.log(JSON.stringify(data, null, 2).slice(0, 14000));
await b.close();
