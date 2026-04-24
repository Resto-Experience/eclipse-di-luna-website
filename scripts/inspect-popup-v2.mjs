import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('https://www.eclipsediluna.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(4000);
// Get the popup section element
const popupHTML = await p.evaluate(() => {
  const pop = document.querySelector('.popup-section, .popedad, [class*="popup-section"]');
  if (!pop) return null;
  const s = getComputedStyle(pop);
  return {
    cls: pop.className,
    display: s.display,
    position: s.position,
    visible: s.visibility,
    zIndex: s.zIndex,
    opacity: s.opacity,
    html: pop.outerHTML?.slice(0, 3000),
  };
});
console.log(JSON.stringify(popupHTML, null, 2));

// Also find all images on live that might be the popup image
const popupImgs = await p.evaluate(() => {
  const imgs = Array.from(document.querySelectorAll('img')).filter(i => {
    const alt = (i.alt || '') + (i.src || '');
    return /latin.thursday|thursday.night|popup/i.test(alt);
  });
  return imgs.map(i => ({ src: i.src, alt: i.alt }));
});
console.log('\nImages matching:', JSON.stringify(popupImgs, null, 2));
await b.close();
