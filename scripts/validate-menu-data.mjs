import { chromium } from 'playwright';
import fs from 'node:fs';

const slug = process.argv[2];
if (!slug) { console.error('Usage: node validate-menu-data.mjs <slug>'); process.exit(1); }

const mine = JSON.parse(fs.readFileSync(`src/data/menus/${slug}.json`, 'utf8'));
const mineFlat = [];
mine.tabs.forEach(tab => tab.sections.forEach(sec => sec.items.forEach(it => {
  mineFlat.push({ name: it.name, desc: (it.description || '').trim(), price: (it.price || '').trim() });
})));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 2200 } });
await page.goto(`https://www.eclipsediluna.com/menu/menu-${slug}`, { waitUntil: 'networkidle' });
for (let i = 0; i < 40; i++) { await page.evaluate(() => window.scrollBy(0, 800)); await page.waitForTimeout(150); }
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(1500);

const liveFlat = await page.evaluate(() => {
  const items = [];
  document.querySelectorAll('.w-dyn-item, .collection-item').forEach(item => {
    const name = item.querySelector('h3.heading-31, .heading-31, h3')?.textContent?.trim();
    if (!name) return;
    const desc = item.querySelector('.rich-text-block, .w-richtext')?.textContent?.trim() || '';
    const price = item.querySelector('.text-block-21')?.textContent?.trim() || '';
    items.push({ name, desc, price });
  });
  return items;
});

const key = (it) => `${it.name}||${it.desc}||${it.price}`;
const mineSet = new Map();
mineFlat.forEach(it => { const k = key(it); mineSet.set(k, (mineSet.get(k) || 0) + 1); });
const liveSet = new Map();
liveFlat.forEach(it => { const k = key(it); liveSet.set(k, (liveSet.get(k) || 0) + 1); });

const missing = [];
liveSet.forEach((count, k) => {
  const mineCount = mineSet.get(k) || 0;
  if (mineCount < count) {
    for (let i = 0; i < (count - mineCount); i++) {
      const [name, desc, price] = k.split('||');
      missing.push({ name, desc, price });
    }
  }
});
const extra = [];
mineSet.forEach((count, k) => {
  const liveCount = liveSet.get(k) || 0;
  if (liveCount < count) {
    for (let i = 0; i < (count - liveCount); i++) {
      const [name, desc, price] = k.split('||');
      extra.push({ name, desc, price });
    }
  }
});

console.log(`\n[${slug}] mine=${mineFlat.length} | live=${liveFlat.length} | missing_in_mine=${missing.length} | extra_in_mine=${extra.length}`);
if (missing.length > 0) {
  console.log(`  MISSING from mine (in live but not in mine):`);
  missing.slice(0, 15).forEach(m => console.log(`    - "${m.name}" | price="${m.price}" | desc="${m.desc.slice(0, 70)}"`));
}
if (extra.length > 0) {
  console.log(`  EXTRA in mine (in mine but not in live):`);
  extra.slice(0, 15).forEach(m => console.log(`    - "${m.name}" | price="${m.price}" | desc="${m.desc.slice(0, 70)}"`));
}

await browser.close();
