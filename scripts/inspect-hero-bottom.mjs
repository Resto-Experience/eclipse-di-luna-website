import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('https://www.eclipsediluna.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(3000);

const data = await p.evaluate(() => {
  const vis = el => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.display !== 'none'; };
  // Find all images/svgs at bottom of hero (top > 700, height > 0)
  const icons = Array.from(document.querySelectorAll('img, svg')).filter(vis).filter(el => {
    const r = el.getBoundingClientRect();
    return r.top > 600 && r.top < 900 && r.width < 60;
  }).map(el => {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return {
      tag: el.tagName,
      src: el.getAttribute?.('src'),
      w: Math.round(r.width), h: Math.round(r.height),
      color: s.color,
      outerHTML: el.outerHTML?.slice(0, 250),
    };
  });
  return icons;
});
console.log(JSON.stringify(data, null, 2));
await b.close();
