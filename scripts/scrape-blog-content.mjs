import { chromium } from 'playwright';
import fs from 'node:fs';

const SLUGS = [
  'tapas-bar-good-food-and-fresh-drinks-in-alpharetta-ga',
  'ensalada-de-manzana-a-fresh-counterpoint-on-the-tapas-table-y4321',
  'ceviche-de-pescado-at-eclipse-di-luna',
  'mejillones-en-salsa-de-jitomate-the-perfect-coastal-meal',
  'pulpo-a-la-gallega-experience-galicias-signature-octopus',
  'macarrones-con-queso-101-the-complete-guide-to-mac-and-cheese',
  'panqueques-a-sweet-way-to-start-the-day',
  'platanos-fritos-the-perfect-start-to-your-night',
  'patatas-bravas-why-these-spanish-potatoes-are-our-tapas-superstar',
];

const b = await chromium.launch();
const results = [];
for (const slug of SLUGS) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await p.goto(`https://www.eclipsediluna.com/blog/${slug}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await p.waitForTimeout(2500);
  } catch (e) {
    console.error(`Failed ${slug}: ${e.message}`); await p.close(); continue;
  }

  const data = await p.evaluate(() => {
    const article = document.querySelector('.rich-text-block-2, .w-richtext, article');
    if (!article) return { blocks: [] };
    const blocks = [];
    article.childNodes.forEach(node => {
      if (node.nodeType !== 1) return;
      const tag = node.tagName;
      const text = node.textContent?.trim() || '';
      if (!text && tag !== 'IMG' && tag !== 'FIGURE') return;
      if (tag === 'H1' || tag === 'H2' || tag === 'H3' || tag === 'H4') {
        blocks.push({ type: tag.toLowerCase(), text });
      } else if (tag === 'P') {
        blocks.push({ type: 'p', text });
      } else if (tag === 'UL' || tag === 'OL') {
        const items = Array.from(node.querySelectorAll('li')).map(li => li.textContent?.trim()).filter(Boolean);
        blocks.push({ type: tag === 'UL' ? 'ul' : 'ol', items });
      } else if (tag === 'FIGURE' || tag === 'IMG') {
        const img = tag === 'IMG' ? node : node.querySelector('img');
        if (img) blocks.push({ type: 'img', src: img.src, alt: img.alt });
      } else if (tag === 'BLOCKQUOTE') {
        blocks.push({ type: 'quote', text });
      }
    });
    return { blocks };
  });

  results.push({ slug, blocks: data.blocks });
  console.log(`[${slug}] ${data.blocks.length} blocks`);
  await p.close();
}

fs.writeFileSync('blog-content.json', JSON.stringify(results, null, 2));
console.log('\nSaved to blog-content.json');
await b.close();
