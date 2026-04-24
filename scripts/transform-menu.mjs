import fs from 'node:fs';

const slug = process.argv[2] || 'alpharetta';
const locationName = slug.charAt(0).toUpperCase() + slug.slice(1);
const raw = JSON.parse(fs.readFileSync(`${slug}-inspection/menu-data.json`, 'utf8'));

// Tab config — labels from live, section names auto-grouped by tabId
const TAB_CONFIG = {
  cocktails: 'Cocktails',
  tapas: 'Tapas',
  entrees: 'Entrees',
  dessert: 'Desserts',
  wine: 'Wines',
  beer: 'Beers',
  aprilcocktails: 'April Cocktails',
  brunch: 'Brunch',
  'happy-hour': 'Happy Hour',
};

// Sections without tabId mapping → assign to 'happy-hour' (since only HH sections lack a tabId per live)
const fallbackTab = 'happy-hour';

// Group sections by tabId
const byTab = new Map();
raw.sectionsMap.forEach((s) => {
  const tabId = s.tabId || fallbackTab;
  if (!byTab.has(tabId)) byTab.set(tabId, []);
  byTab.get(tabId).push({
    name: s.section,
    items: s.items.map((item) => ({
      name: item.name?.trim() || '',
      description: item.description?.trim().replace(/\s+/g, ' ') || undefined,
      price: item.price?.trim() || undefined,
      image: item.image || undefined,
      tags: Array.isArray(item.tags) && item.tags.length ? item.tags : undefined,
    })).filter((i) => i.name),
  });
});

// Build final tabs array in the order defined in TAB_CONFIG
const tabs = Object.entries(TAB_CONFIG)
  .filter(([id]) => byTab.has(id))
  .map(([id, label]) => ({
    id,
    label,
    sections: byTab.get(id),
  }));

const out = {
  slug,
  locationName,
  tabs,
};

fs.mkdirSync('src/data/menus', { recursive: true });
fs.writeFileSync(`src/data/menus/${slug}.json`, JSON.stringify(out, null, 2));

// Stats
let totalItems = 0;
tabs.forEach((t) => {
  const sum = t.sections.reduce((acc, s) => acc + s.items.length, 0);
  totalItems += sum;
  console.log(`${t.id} (${t.label}): ${t.sections.length} sections, ${sum} items`);
});
console.log(`\n[${slug}] TOTAL: ${tabs.length} tabs, ${totalItems} items`);
console.log(`Saved to src/data/menus/${slug}.json`);
