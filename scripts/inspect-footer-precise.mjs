import { chromium, devices } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext({ ...devices['iPhone 13'] });
const p = await ctx.newPage();
await p.goto('https://www.eclipsediluna.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(3000);
await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await p.waitForTimeout(1500);

const data = await p.evaluate(() => {
  // Location heading h3 on mobile
  const h = Array.from(document.querySelectorAll('h3.heading-10')).find(el => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && /alpharetta|beltline|buckhead|dunwoody/i.test(el.textContent || '');
  });
  const hData = h ? (() => {
    const s = getComputedStyle(h);
    return {
      text: h.textContent.trim(),
      font: s.fontFamily, size: s.fontSize, weight: s.fontWeight, color: s.color,
      lh: s.lineHeight, letterSpacing: s.letterSpacing, textTransform: s.textTransform,
    };
  })() : null;

  // More heading
  const more = Array.from(document.querySelectorAll('h3.heading-10')).find(el => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && /^more$/i.test(el.textContent?.trim() || '');
  });
  const moreData = more ? (() => {
    const s = getComputedStyle(more);
    return {
      text: more.textContent.trim(), font: s.fontFamily, size: s.fontSize, weight: s.fontWeight, color: s.color,
    };
  })() : null;

  // Line between pill and text on mobile footer
  const lineImg = document.querySelector('.mobile-div img[src*="Rectangle%202200"], .wrapper-footer-mobile-resto-3 img[src*="Rectangle"]');
  const lineData = lineImg ? (() => {
    const r = lineImg.getBoundingClientRect();
    return { src: lineImg.src, w: Math.round(r.width), h: Math.round(r.height) };
  })() : null;

  return { locHead: hData, moreHead: moreData, line: lineData };
});
console.log(JSON.stringify(data, null, 2));
await b.close();
