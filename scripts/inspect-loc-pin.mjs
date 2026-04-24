import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('https://www.eclipsediluna.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(3000);
await p.evaluate(() => {
  const h = Array.from(document.querySelectorAll('h2')).find(h => /vibrant/i.test(h.textContent || ''));
  if (h) h.scrollIntoView();
});
await p.waitForTimeout(1500);

// Download a pin svg from live to see colors
const pinSrcs = await p.evaluate(() => {
  const imgs = Array.from(document.querySelectorAll('img[src*="map-pin"], img[src*="pin"]')).filter(el => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  });
  return imgs.slice(0, 3).map(i => ({ src: i.src, w: Math.round(i.getBoundingClientRect().width), h: Math.round(i.getBoundingClientRect().height) }));
});
console.log(JSON.stringify(pinSrcs, null, 2));

// Also image size in live locations section
const locImg = await p.evaluate(() => {
  const imgs = Array.from(document.querySelectorAll('img')).filter(el => {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    const isHomeLoc = (el.alt || el.src || '').toLowerCase().match(/alpharetta|beltline|buckhead|dunwoody/);
    return r.width > 300 && r.top > 1500 && isHomeLoc && s.display !== 'none';
  });
  return imgs.slice(0, 4).map(i => ({
    src: i.src.slice(-60),
    w: Math.round(i.getBoundingClientRect().width),
    h: Math.round(i.getBoundingClientRect().height),
    radius: getComputedStyle(i.parentElement || i).borderRadius,
    alt: i.alt,
  }));
});
console.log('LOC IMAGES:', JSON.stringify(locImg, null, 2));

// Inline pill button classes in locations section
const pills = await p.evaluate(() => {
  const all = Array.from(document.querySelectorAll('a')).filter(a => {
    const r = a.getBoundingClientRect();
    return /order online|entertainment|deals/i.test(a.textContent?.trim() || '') && r.height < 45 && r.height > 25;
  });
  return all.slice(0, 4).map(a => ({
    text: a.textContent.trim(),
    font: getComputedStyle(a).fontFamily,
    size: getComputedStyle(a).fontSize,
    weight: getComputedStyle(a).fontWeight,
    color: getComputedStyle(a).color,
    bg: getComputedStyle(a).backgroundColor,
    padding: getComputedStyle(a).padding,
    h: Math.round(a.getBoundingClientRect().height),
    radius: getComputedStyle(a).borderRadius,
  }));
});
console.log('\nPILLS:', JSON.stringify(pills, null, 2));
await b.close();
