import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('https://www.eclipsediluna.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(3500);
const data = await p.evaluate(() => {
  const close = document.querySelector('.pop-up-button-close, .close-image-popup');
  if (!close) return null;
  const s = getComputedStyle(close);
  const r = close.getBoundingClientRect();
  const popup = close.closest('.popup-div-2, .popup-div');
  const popRect = popup?.getBoundingClientRect();
  return {
    cls: close.className,
    w: Math.round(r.width), h: Math.round(r.height),
    bg: s.backgroundColor, border: s.border, borderRadius: s.borderRadius,
    top: Math.round(r.top - (popRect?.top || 0)),
    right: Math.round((popRect?.right || 0) - r.right),
    padding: s.padding,
    html: close.outerHTML?.slice(0, 400),
  };
});
console.log(JSON.stringify(data, null, 2));
await b.close();
