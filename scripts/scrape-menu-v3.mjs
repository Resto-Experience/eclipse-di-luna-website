import { chromium } from 'playwright';
import fs from 'node:fs';

const slug = process.argv[2] || 'alpharetta';
const URL = `https://www.eclipsediluna.com/menu/menu-${slug}`;
const outDir = `${slug}-inspection`;
fs.mkdirSync(outDir, { recursive: true });
const outFile = `${outDir}/menu-data.json`;

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 2200 } });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: 'networkidle', timeout: 90000 });

// Force lazy-load everything
for (let i = 0; i < 40; i++) {
  await page.evaluate(() => window.scrollBy(0, 800));
  await page.waitForTimeout(200);
}
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(1500);

const data = await page.evaluate(() => {
  // Tab defs (vertical sticky tabs)
  const tabs = Array.from(document.querySelectorAll('.tabs-menu-2 .tab-link')).map((a) => ({
    label: a.textContent?.trim(),
    href: a.getAttribute('href'),
  }));

  // For each section, find nearest h2.heading-30 + following w-dyn-list and extract items
  const sectionsMap = [];
  const allH2s = Array.from(document.querySelectorAll('.heading-30'));
  allH2s.forEach((h2) => {
    const sectionName = h2.textContent?.trim();
    // Structure per live: h2 lives in container-108, list lives in the NEXT sibling container-109.
    // Walk up to container-108 (the heading wrapper), then look at its nextElementSibling for the list container.
    let headingWrap = h2.parentElement;
    // container-108 wraps only the h2, container-109 wraps the list
    let list = null;
    let search = headingWrap;
    for (let i = 0; i < 4; i++) {
      if (!search) break;
      const sibling = search.nextElementSibling;
      if (sibling) {
        const found = sibling.querySelector('.w-dyn-list, .collection-list') || (sibling.classList.contains('w-dyn-list') ? sibling : null);
        if (found) { list = found; break; }
      }
      // Try next-next sibling too
      const nn = search.nextElementSibling?.nextElementSibling;
      if (nn) {
        const found = nn.querySelector('.w-dyn-list, .collection-list');
        if (found) { list = found; break; }
      }
      search = search.parentElement;
    }
    if (!list) {
      sectionsMap.push({ section: sectionName, items: [], note: 'no list found' });
      return;
    }
    // Find the top-level tab anchor that contains this h2 (#cocktails, #tapas, etc.)
    let tabId = null;
    let scan = h2.parentElement;
    while (scan && scan !== document.body) {
      if (scan.id && ['cocktails', 'tapas', 'entrees', 'dessert', 'wine', 'beer', 'aprilcocktails', 'brunch', 'happyhour'].includes(scan.id)) {
        tabId = scan.id;
        break;
      }
      scan = scan.parentElement;
    }

    const items = Array.from(list.querySelectorAll('.w-dyn-item, .collection-item')).map((item) => {
      const name = item.querySelector('h3.heading-31, .heading-31, h3')?.textContent?.trim() || null;
      const desc = item.querySelector('.rich-text-block, .w-richtext')?.textContent?.trim() || null;
      const price = item.querySelector('.text-block-21')?.textContent?.trim() || null;
      const imgEl = item.querySelector('img.image-33, img.img345, img.image-36, img');
      const img = imgEl?.getAttribute('src') || null;
      // Tags — container-111 holds icon + label
      const tags = Array.from(item.querySelectorAll('.container-111')).map((t) => t.textContent?.trim()).filter(Boolean);
      return { name, description: desc, price, image: img, tags };
    });
    sectionsMap.push({ section: sectionName, tabId, items });
  });

  return { tabs, sectionsMap };
});

fs.writeFileSync(outFile, JSON.stringify(data, null, 2));
const totalItems = data.sectionsMap.reduce((acc, s) => acc + s.items.length, 0);
console.log(`\n[${slug}] scraped from ${URL}`);
console.log('Tabs:', data.tabs.length);
console.log('Sections:', data.sectionsMap.length);
console.log('Total items:', totalItems);
data.sectionsMap.forEach((s) => console.log(`  - ${s.section} [${s.tabId || 'no-tab'}]: ${s.items.length} items`));
console.log(`Saved to ${outFile}`);

await browser.close();
