import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('https://www.eclipsediluna.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(3000);
const info = await p.evaluate(() => {
  const pills = Array.from(document.querySelectorAll('a')).filter(a => {
    const t = (a.textContent || '').trim();
    return /^(order online|entertainment|deals|menu)$/i.test(t);
  }).slice(0, 6);
  return pills.map(a => {
    const s = getComputedStyle(a);
    const inner = a.firstElementChild;
    const is = inner ? getComputedStyle(inner) : null;
    return {
      text: a.textContent.trim(),
      outerHTML: a.outerHTML.slice(0, 300),
      outer: { font: s.fontFamily, size: s.fontSize, weight: s.fontWeight },
      inner: is ? { font: is.fontFamily, size: is.fontSize, weight: is.fontWeight } : null,
    };
  });
});
console.log(JSON.stringify(info, null, 2));

// Also what's the container max-width of the whole section
const container = await p.evaluate(() => {
  const h = Array.from(document.querySelectorAll('h2')).find(h => /vibrant/i.test(h.textContent || ''));
  if (!h) return null;
  const sec = h.closest('section, div[class*="section"]');
  const chain = [];
  let el = sec;
  for (let i = 0; i < 6; i++) {
    if (!el) break;
    const s = getComputedStyle(el);
    chain.push({ tag: el.tagName, cls: el.className?.slice(0, 60), w: Math.round(el.getBoundingClientRect().width), maxW: s.maxWidth, padding: s.padding });
    el = el.parentElement;
  }
  return chain;
});
console.log('\nSECTION CHAIN:', JSON.stringify(container, null, 2));
await b.close();
