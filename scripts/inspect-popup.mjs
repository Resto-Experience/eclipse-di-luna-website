import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('https://www.eclipsediluna.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(5000);
// Take screenshot of viewport to see the popup
await p.screenshot({ path: 'live-popup.png', fullPage: false });

// Inspect any fixed/absolute overlays
const overlays = await p.evaluate(() => {
  const vis = el => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 200 && r.height > 200 && s.display !== 'none' && s.visibility !== 'hidden' && (s.position === 'fixed' || s.position === 'absolute') && parseInt(s.zIndex || 0) > 10; };
  const candidates = Array.from(document.querySelectorAll('*')).filter(vis).filter(el => {
    const txt = el.textContent || '';
    return /dunwoody|latin thursday|popup|modal|offer/i.test(txt) || el.querySelector('img[src*="popup"], img[src*="modal"]');
  });
  return candidates.slice(0, 5).map(el => {
    const s = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const imgs = Array.from(el.querySelectorAll('img')).slice(0, 3).map(i => ({ src: i.src, w: Math.round(i.getBoundingClientRect().width), h: Math.round(i.getBoundingClientRect().height) }));
    return {
      tag: el.tagName, cls: el.className?.slice?.(0, 100) || '',
      pos: s.position, zIndex: s.zIndex,
      w: Math.round(r.width), h: Math.round(r.height),
      top: Math.round(r.top), left: Math.round(r.left),
      bg: s.backgroundColor, bgImg: s.backgroundImage?.slice(0, 100),
      imgs,
      textPreview: el.textContent?.slice(0, 100),
    };
  });
});
console.log(JSON.stringify(overlays, null, 2));
await b.close();
