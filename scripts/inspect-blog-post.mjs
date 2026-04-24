import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('https://www.eclipsediluna.com/blog/tapas-bar-good-food-and-fresh-drinks-in-alpharetta-ga', { waitUntil: 'domcontentloaded', timeout: 60000 });
await p.waitForTimeout(3000);

await p.screenshot({ path: 'blog-post-fold.png' });
await p.evaluate(() => window.scrollTo(0, 800));
await p.waitForTimeout(800);
await p.screenshot({ path: 'blog-post-mid.png' });
await p.evaluate(() => window.scrollBy(0, 1500));
await p.waitForTimeout(800);
await p.screenshot({ path: 'blog-post-mid2.png' });
await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 1200));
await p.waitForTimeout(800);
await p.screenshot({ path: 'blog-post-bottom.png' });

// Structure
const data = await p.evaluate(() => {
  const vis = el => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.display !== 'none'; };

  // Hero section
  const heroSec = document.querySelector('section');
  const heroBg = heroSec ? getComputedStyle(heroSec).backgroundImage?.slice(0, 200) : null;
  const heroH = heroSec?.getBoundingClientRect().height;

  // All headings + first paragraph of content
  const blocks = Array.from(document.querySelectorAll('h1, h2, h3, h4, p, img, ul, figure, blockquote')).filter(vis).slice(0, 40).map(el => {
    const s = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      tag: el.tagName,
      cls: el.className?.baseVal || el.className || '',
      text: el.textContent?.trim().slice(0, 120),
      font: s.fontFamily, size: s.fontSize, weight: s.fontWeight, color: s.color, align: s.textAlign, lh: s.lineHeight,
      maxW: s.maxWidth, top: Math.round(r.top + window.scrollY), left: Math.round(r.left),
      w: Math.round(r.width),
    };
  });

  // Main article wrapper
  const article = document.querySelector('article, .w-richtext, [class*="blog-post"]');
  const artData = article ? { cls: article.className, w: Math.round(article.getBoundingClientRect().width), maxW: getComputedStyle(article).maxWidth } : null;

  return { heroBg, heroH, blocks, article: artData };
});

console.log('HERO BG:', data.heroBg);
console.log('HERO H:', data.heroH);
console.log('ARTICLE:', JSON.stringify(data.article, null, 2));
console.log('BLOCKS:', JSON.stringify(data.blocks.slice(0, 15), null, 2));
await b.close();
