import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('https://www.eclipsediluna.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(3000);
// Scroll to events section
await p.evaluate(() => {
  const h = Array.from(document.querySelectorAll('h2, h3')).find(h => /celebrate|events made|gather/i.test(h.textContent || ''));
  if (h) h.scrollIntoView();
});
await p.waitForTimeout(1500);

const data = await p.evaluate(() => {
  const vis = el => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.display !== 'none'; };

  // Find CTA buttons with text like "Reserve", "Catering", "Private Party"
  const ctaBtns = Array.from(document.querySelectorAll('a, button')).filter(vis).filter(el => {
    const t = el.textContent?.trim();
    return /reserve|catering|private party|view catering|book/i.test(t || '') && t.length < 40;
  }).slice(0, 8).map(el => {
    const s = getComputedStyle(el);
    return {
      tag: el.tagName,
      text: el.textContent.trim(),
      href: el.getAttribute('href'),
      dataAttrs: Array.from(el.attributes).filter(a => a.name.startsWith('data-') || a.name === 'onclick').map(a => `${a.name}="${a.value.slice(0, 80)}"`),
      outerHTML: el.outerHTML?.slice(0, 400),
    };
  });

  // Check for modals/iframes in DOM
  const iframes = Array.from(document.querySelectorAll('iframe')).map(f => ({
    src: f.src, w: f.width, h: f.height, cls: f.className,
  }));

  // Check for modal triggers
  const modals = Array.from(document.querySelectorAll('[data-modal], [data-toggle], .w-embed')).map(m => ({
    tag: m.tagName, cls: m.className,
    html: m.outerHTML?.slice(0, 500),
  }));

  return { ctaBtns, iframes, modals: modals.slice(0, 10) };
});
console.log(JSON.stringify(data, null, 2));
await b.close();
