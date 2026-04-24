import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('https://www.eclipsediluna.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(3000);
await p.evaluate(() => {
  const h = Array.from(document.querySelectorAll('h2,h3')).find(h => /vibrant locations|explore our/i.test(h.textContent || ''));
  if (h) h.scrollIntoView({ block: 'start' });
});
await p.waitForTimeout(1500);

const data = await p.evaluate(() => {
  const vis = el => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.display !== 'none'; };
  const loc = Array.from(document.querySelectorAll('h3, h2')).find(h => vis(h) && /alpharetta|dunwoody/i.test(h.textContent || '') && h.textContent.trim().length < 30);
  const card = loc?.closest('div[class*="grid"], div.flex') || loc?.parentElement;
  const img = card?.querySelector('img');
  const imgData = img ? { w: Math.round(img.getBoundingClientRect().width), h: Math.round(img.getBoundingClientRect().height), radius: getComputedStyle(img.parentElement || img).borderRadius } : null;

  // Links to menu, order, entertainment, deals
  const links = Array.from(document.querySelectorAll('a')).filter(a => {
    const t = a.textContent?.trim();
    return vis(a) && /menu|order online|entertainment|deals/i.test(t || '') && t.length < 30;
  }).slice(0, 8).map(a => ({
    text: a.textContent.trim(),
    href: a.getAttribute('href'),
    bg: getComputedStyle(a).backgroundColor,
    color: getComputedStyle(a).color,
    font: getComputedStyle(a).fontFamily,
    size: getComputedStyle(a).fontSize,
    weight: getComputedStyle(a).fontWeight,
    radius: getComputedStyle(a).borderRadius,
    padding: getComputedStyle(a).padding,
    h: Math.round(a.getBoundingClientRect().height),
  }));

  const h3 = loc ? { text: loc.textContent.trim(), font: getComputedStyle(loc).fontFamily, size: getComputedStyle(loc).fontSize, weight: getComputedStyle(loc).fontWeight, color: getComputedStyle(loc).color, lh: getComputedStyle(loc).lineHeight } : null;

  const desc = card?.querySelector('p');
  const descData = desc ? { font: getComputedStyle(desc).fontFamily, size: getComputedStyle(desc).fontSize, weight: getComputedStyle(desc).fontWeight, color: getComputedStyle(desc).color, lh: getComputedStyle(desc).lineHeight } : null;

  // Address pin icon
  const pinImg = card?.querySelector('img[src*="map"], img[alt*="pin"], img[src*="pin"]');
  const pinData = pinImg ? { src: pinImg.src, svg: null } : null;

  return { imgData, links, h3, desc: descData, pin: pinData };
});
console.log(JSON.stringify(data, null, 2));
await b.close();
