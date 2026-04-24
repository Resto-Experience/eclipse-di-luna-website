import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('https://www.eclipsediluna.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(3000);
await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await p.waitForTimeout(1500);
const data = await p.evaluate(() => {
  const vis = el => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.display !== 'none'; };
  // Find Alpharetta heading in footer
  const footer = document.querySelector('footer, [class*="footer"]');
  const locHeadings = Array.from(document.querySelectorAll('*')).filter(vis).filter(el => {
    const t = el.textContent?.trim();
    return /^(alpharetta|beltline|buckhead|dunwoody)$/i.test(t || '');
  });
  const results = locHeadings.slice(0, 4).map(h => {
    const s = getComputedStyle(h);
    const r = h.getBoundingClientRect();
    // Find sibling/parent icon
    const parent = h.parentElement;
    const icon = parent?.querySelector('img, svg');
    const iconSrc = icon?.getAttribute?.('src');
    return {
      tag: h.tagName, cls: h.className?.slice(0, 80), text: h.textContent.trim(),
      font: s.fontFamily, size: s.fontSize, weight: s.fontWeight, color: s.color,
      icon: iconSrc || icon?.outerHTML?.slice(0, 200),
      parentHTML: parent?.outerHTML?.slice(0, 300),
    };
  });
  return results;
});
console.log(JSON.stringify(data, null, 2));
await b.close();
