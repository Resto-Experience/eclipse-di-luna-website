import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('https://www.eclipsediluna.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(3000);
await p.evaluate(() => {
  const h = Array.from(document.querySelectorAll('h2')).find(h => /vibrant locations|explore our/i.test(h.textContent || ''));
  if (h) h.scrollIntoView();
});
await p.waitForTimeout(1000);
const icons = await p.evaluate(() => {
  const pins = [];
  document.querySelectorAll('svg, img').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < 300 || r.top > 3500) return;
    if (r.width < 14 || r.width > 40) return;
    const src = el.getAttribute?.('src');
    const html = el.outerHTML?.slice(0, 300);
    const parentText = el.parentElement?.textContent?.trim().slice(0, 60);
    if (/(location|address|map|pin|ga|atlanta)/i.test(parentText || '')) {
      pins.push({ tag: el.tagName, src, parentText, w: Math.round(r.width), h: Math.round(r.height), html });
    }
  });
  return pins;
});
console.log(JSON.stringify(icons, null, 2));
await b.close();
