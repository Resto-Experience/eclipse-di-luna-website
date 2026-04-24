import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('https://www.eclipsediluna.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(3500);

await p.evaluate(() => {
  const el = document.querySelector('.popup-orderonline');
  if (el) { el.style.display = 'flex'; el.style.zIndex = '99999'; }
});
await p.waitForTimeout(1200);

const data = await p.evaluate(() => {
  const grab = (sel, nth = 0) => {
    const els = document.querySelectorAll(sel);
    const el = els[nth];
    if (!el) return null;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      sel: `${sel}[${nth}]`,
      box: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
      bg: cs.backgroundColor,
      bgImg: cs.backgroundImage !== 'none' ? cs.backgroundImage.slice(0, 140) : null,
      border: cs.border,
      borderRadius: cs.borderRadius,
      padding: cs.padding,
      margin: cs.margin,
      gap: cs.gap,
      display: cs.display,
      flexDir: cs.flexDirection,
      justify: cs.justifyContent,
      alignI: cs.alignItems,
      font: cs.fontFamily,
      size: cs.fontSize,
      lh: cs.lineHeight,
      weight: cs.fontWeight,
      color: cs.color,
      textAlign: cs.textAlign,
    };
  };
  return {
    h2: grab('.popup-orderonline .heading-32'),
    c131: grab('.popup-orderonline .container-131'),
    c125_0: grab('.popup-orderonline .container-125', 0),
    c125_1: grab('.popup-orderonline .container-125', 1),
    c126_0: grab('.popup-orderonline .container-126', 0),
    c126_1: grab('.popup-orderonline .container-126', 1),
    c130: grab('.popup-orderonline .container-130'),
    h3: grab('.popup-orderonline .heading-33'),
    link: grab('.popup-orderonline .link-block-7'),
    linkInner: grab('.popup-orderonline .link-block-7 > div'),
    linkText: grab('.popup-orderonline .paragraph-55'),
  };
});
console.log(JSON.stringify(data, null, 2));
await b.close();
