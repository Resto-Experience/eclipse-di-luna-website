// Seed Eclipse di Luna menus from src/data/menus/{slug}.json into Supabase.
// Mapping rules: see memory/project_menu_seed_decisions.md
//
// Usage:
//   node scripts/seed-supabase-menu.mjs --location=alpharetta            # dry-run by default
//   node scripts/seed-supabase-menu.mjs --location=alpharetta --apply    # actually writes
//   node scripts/seed-supabase-menu.mjs --location=all --apply
//   node scripts/seed-supabase-menu.mjs --location=alpharetta --apply --clean  # wipe location's menu first

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// --- env ---
function loadEnvLocal() {
  const p = path.join(ROOT, '.env.local');
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}
loadEnvLocal();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supa = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// --- args ---
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v ?? true];
  }),
);
const APPLY = !!args.apply;
const CLEAN = !!args.clean;
const LOCATION_ARG = args.location ?? 'all';
const VALID_SLUGS = ['alpharetta', 'beltline', 'buckhead', 'dunwoody'];
const SLUGS = LOCATION_ARG === 'all' ? VALID_SLUGS : LOCATION_ARG.split(',').filter((s) => VALID_SLUGS.includes(s));
if (!SLUGS.length) {
  console.error(`Invalid --location. Use one of: ${VALID_SLUGS.join(',')} or "all".`);
  process.exit(1);
}

// --- constants ---
const RESTAURANT_ID = 'de666d41-0bd5-48a5-a1e1-ab104a0477d0';
const LOCATIONS = {
  alpharetta: { id: '8514b489-5f95-4182-be7b-e23fe39f3487', name: 'Alpharetta' },
  beltline:   { id: '4a1571ea-8fef-4673-bdd2-785c88007afa', name: 'Beltline' },
  buckhead:   { id: 'f83949aa-323e-492b-8c4a-ba7d0049e140', name: 'Buckhead' },
  dunwoody:   { id: '2548e9ab-e1ef-4965-80d4-abe5ff2d4a67', name: 'Dunwoody' },
};
const BUCKET = 'restaurant-assets';

// --- helpers ---

// Tab id → item_type, contains_alcohol defaults
function defaultsForTab(tabId, sectionName = '') {
  const sec = sectionName.toLowerCase();
  if (tabId === 'happy-hour') {
    if (sec.includes('libation')) return { item_type: 'drink', contains_alcohol: true };
    return { item_type: 'food', contains_alcohol: false };
  }
  if (tabId === 'dessert') {
    if (sec.includes('cocktail')) return { item_type: 'drink', contains_alcohol: true };
    if (sec.includes('hot drink')) return { item_type: 'drink', contains_alcohol: false };
    return { item_type: 'dessert', contains_alcohol: false };
  }
  if (['cocktails', 'aprilcocktails'].includes(tabId)) return { item_type: 'drink', contains_alcohol: true };
  if (tabId === 'wine') return { item_type: 'drink', contains_alcohol: true };
  if (tabId === 'beer') return { item_type: 'drink', contains_alcohol: true };
  if (['tapas', 'entrees', 'brunch'].includes(tabId)) return { item_type: 'food', contains_alcohol: false };
  return { item_type: 'food', contains_alcohol: false };
}

// "<num> <label>" or "<label> <num>" → { name, price: "<num>", discountPercent: 0 }
// price is a string (the existing app calls .trim() on it).
function parseVariantPart(p) {
  const a = p.match(/^\$?\s*(\d+(?:\.\d+)?)\s+(.+)$/);
  if (a) return { name: a[2].trim(), price: a[1], discountPercent: 0 };
  const b = p.match(/^(.+?)\s+\$?\s*(\d+(?:\.\d+)?)$/);
  if (b) return { name: b[1].trim(), price: b[2], discountPercent: 0 };
  return null;
}

// Parse JSON `price` string → { base_price, base_price_max, base_is_price_range, price_variants, notes_for_price }
// notes_for_price is a fallback display string for non-numeric prices ("Market Price")
function parsePrice(raw) {
  const empty = { base_price: null, base_price_max: null, base_is_price_range: false, price_variants: null, notes_for_price: null };
  if (raw == null || raw === '') return empty;
  const s = String(raw).trim();

  // "starting at" / "from"
  const startingAt = s.match(/^(?:starting\s+at|from)\s+\$?\s*(\d+(?:\.\d+)?)/i);
  if (startingAt) {
    return { ...empty, base_price: Number(startingAt[1]), base_is_price_range: true };
  }

  // pure range "12-18" or "12 - 18"
  const range = s.match(/^\$?\s*(\d+(?:\.\d+)?)\s*-\s*\$?\s*(\d+(?:\.\d+)?)$/);
  if (range) {
    return { ...empty, base_price: Number(range[1]), base_price_max: Number(range[2]), base_is_price_range: true };
  }

  // multi-variant with "|" separator: "20 Carafes | 38 Pitcher"
  // base_price is NOT NULL in DB → use min variant price (semantically "from")
  if (s.includes('|')) {
    const parts = s.split('|').map((p) => p.trim()).filter(Boolean);
    const variants = parts.map(parseVariantPart).filter(Boolean);
    if (variants.length >= 2) {
      const min = Math.min(...variants.map((v) => Number(v.price)));
      return { ...empty, base_price: min, price_variants: variants };
    }
  }

  // pure number "11" or "$11"
  const num = s.match(/^\$?\s*(\d+(?:\.\d+)?)$/);
  if (num) return { ...empty, base_price: Number(num[1]) };

  // single labeled variant: "42 Pitcher", "Btl 46", "Split 12"
  const single = parseVariantPart(s);
  if (single) {
    return { ...empty, base_price: Number(single.price), price_variants: [single] };
  }

  // non-numeric ("Market Price") — base_price=0 sentinel, real label in notes
  console.warn(`  ⚠  non-numeric price "${s}" — storing in notes (base_price=0 sentinel)`);
  return { ...empty, base_price: 0, notes_for_price: s };
}

// Webflow's missing-image placeholder URL — treat as no image.
function isPlaceholderImage(url) {
  return /\/plugins\/Basic\/assets\/placeholder\./i.test(url ?? '');
}

// Extract a "$N" price hint from a section name like "Happy Hour | Libations $6" or "Tapas $7 (...)"
function priceFromSectionName(sectionName) {
  const m = (sectionName || '').match(/\$\s*(\d+(?:\.\d+)?)/);
  return m ? Number(m[1]) : null;
}

// Map JSON tags array → flags + leftover
function mapTags(tags = []) {
  const out = { is_vegan: false, is_gluten_free: false, leftover: [] };
  for (const t of tags) {
    if (t === 'Gluten Free') out.is_gluten_free = true;
    else if (t === 'Vegan') out.is_vegan = true;
    else out.leftover.push(t); // Vegetarian, etc.
  }
  return out;
}

// Download → optimize to webp → return Buffer
async function fetchAsWebp(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (eclipsediluna-seed)' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  // Always re-encode to webp (covers avif/png/jpg/already-webp at consistent quality)
  const webp = await sharp(buf).webp({ quality: 85, effort: 4 }).toBuffer();
  return webp;
}

async function uploadImage(itemId, sourceUrl) {
  const filePath = `restaurants/${RESTAURANT_ID}/items/${itemId}.webp`;
  const webp = await fetchAsWebp(sourceUrl);
  if (!APPLY) {
    return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${filePath}?v=DRYRUN`;
  }
  let lastErr = null;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const { error } = await supa.storage.from(BUCKET).upload(filePath, webp, {
      contentType: 'image/webp',
      upsert: true,
    });
    if (!error) {
      const v = Date.now();
      return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${filePath}?v=${v}`;
    }
    lastErr = error;
    await new Promise((r) => setTimeout(r, 300 * attempt));
  }
  const detail = lastErr?.error || lastErr?.statusCode || lastErr?.status || '';
  throw new Error(`storage upload failed after 3 attempts: ${lastErr?.message || lastErr} ${detail}`);
}

// --- DB helpers ---
async function findOrCreateMenu(locationName) {
  const menuName = `Menu ${locationName}`;
  const { data: existing, error: selErr } = await supa
    .from('menus')
    .select('*')
    .eq('restaurant_id', RESTAURANT_ID)
    .eq('name', menuName)
    .maybeSingle();
  if (selErr) throw selErr;
  if (existing) return existing;
  if (!APPLY) return { id: 'DRYRUN-MENU', name: menuName, _dry: true };
  const { data, error } = await supa
    .from('menus')
    .insert({ restaurant_id: RESTAURANT_ID, name: menuName, is_active: true, sort_order: 0 })
    .select('*')
    .single();
  if (error) throw error;
  return data;
}

async function cleanLocationMenu(menuId) {
  if (!APPLY) {
    console.log('  (clean skipped in dry-run)');
    return;
  }
  // Delete items first (fk to categories), then categories. menu row stays.
  const { data: cats } = await supa.from('menu_categories').select('id').eq('menu_id', menuId);
  const catIds = (cats || []).map((c) => c.id);
  if (catIds.length) {
    const { error: itemErr } = await supa.from('menu_items').delete().in('category_id', catIds);
    if (itemErr) throw itemErr;
    const { error: catErr } = await supa.from('menu_categories').delete().in('id', catIds);
    if (catErr) throw catErr;
  }
  console.log(`  cleaned ${catIds.length} categories + their items`);
}

async function createCategory(menuId, locationId, section, tabId, sortOrder) {
  if (!APPLY) return { id: `DRY-CAT-${sortOrder}`, _dry: true };
  const { data, error } = await supa
    .from('menu_categories')
    .insert({
      menu_id: menuId,
      location_id: locationId,
      name: section.name,
      description: tabId,
      sort_order: sortOrder,
    })
    .select('*')
    .single();
  if (error) throw error;
  return data;
}

async function createItem(categoryId, item, tabId, sectionName, sortOrder) {
  const tagInfo = mapTags(item.tags);
  let priceInfo = parsePrice(item.price);
  // If item has no price, try inheriting from section header ("Libations $6", "Tapas $7")
  if (priceInfo.base_price == null && priceInfo.price_variants == null && priceInfo.notes_for_price == null) {
    const sectionPrice = priceFromSectionName(sectionName);
    if (sectionPrice != null) {
      priceInfo = { ...priceInfo, base_price: sectionPrice };
    } else {
      priceInfo = { ...priceInfo, base_price: 0 }; // schema NOT NULL fallback
    }
  }
  const typeInfo = defaultsForTab(tabId, sectionName);

  // Insert first (need item.id to build storage path), then update image_url after upload.
  const baseRow = {
    category_id: categoryId,
    name: item.name,
    description: item.description ?? null,
    is_active: true,
    sort_order: sortOrder,
    is_vegan: tagInfo.is_vegan,
    is_gluten_free: tagInfo.is_gluten_free,
    currency: 'USD',
    show_currency: true,
    item_type: typeInfo.item_type,
    contains_alcohol: typeInfo.contains_alcohol,
    tags: [],
    allergens: [],
    base_price: priceInfo.base_price,
    base_price_max: priceInfo.base_price_max,
    base_is_price_range: priceInfo.base_is_price_range,
    price_variants: priceInfo.price_variants,
    notes: priceInfo.notes_for_price,
  };

  if (tagInfo.leftover.length) {
    console.log(`    ℹ  "${item.name}" has tags ${JSON.stringify(tagInfo.leftover)} — set manually in DB later`);
  }

  const hasImage = item.image && !isPlaceholderImage(item.image);

  if (!APPLY) {
    if (hasImage && global.__drySampledImages < 3) {
      global.__drySampledImages = (global.__drySampledImages ?? 0) + 1;
      try {
        const t0 = Date.now();
        const buf = await fetchAsWebp(item.image);
        console.log(`    [dry-img] "${item.name}" → ${buf.length} bytes webp in ${Date.now() - t0}ms`);
      } catch (e) {
        console.warn(`    ⚠  image fetch/encode failed for "${item.name}": ${e.message}`);
      }
    }
    return { id: 'DRY-ITEM', _dry: true };
  }

  const { data: inserted, error: insErr } = await supa
    .from('menu_items')
    .insert(baseRow)
    .select('*')
    .single();
  if (insErr) throw insErr;

  if (hasImage) {
    try {
      const url = await uploadImage(inserted.id, item.image);
      const { error: updErr } = await supa
        .from('menu_items')
        .update({ image_url: url })
        .eq('id', inserted.id);
      if (updErr) throw updErr;
    } catch (e) {
      console.warn(`    ⚠  image failed for "${item.name}" (${item.image}): ${e.message}`);
    }
  }
  return inserted;
}

// --- main ---
async function seedLocation(slug) {
  const loc = LOCATIONS[slug];
  console.log(`\n━━━ ${slug.toUpperCase()} (${loc.id}) ━━━`);
  const menuJson = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/menus', `${slug}.json`), 'utf8'));

  const menu = await findOrCreateMenu(loc.name);
  console.log(`  menu: "${menu.name}" id=${menu.id}${menu._dry ? ' [DRY]' : ''}`);

  if (CLEAN) await cleanLocationMenu(menu.id);

  let catSort = 10;
  let totalItems = 0;
  for (const tab of menuJson.tabs) {
    for (const section of tab.sections) {
      const cat = await createCategory(menu.id, loc.id, section, tab.id, catSort);
      console.log(`  ▸ category "${section.name}" (tab=${tab.id}) sort=${catSort} id=${cat.id}${cat._dry ? ' [DRY]' : ''} — ${section.items.length} items`);
      let itemSort = 10;
      for (const item of section.items) {
        await createItem(cat.id, item, tab.id, section.name, itemSort);
        itemSort += 10;
        totalItems++;
      }
      catSort += 10;
    }
  }
  console.log(`  ✓ ${slug}: total ${totalItems} items inserted${APPLY ? '' : ' (dry-run)'}`);
}

(async () => {
  global.__drySampledImages = 0;
  console.log(`Mode: ${APPLY ? 'APPLY (writes to DB + Storage)' : 'DRY-RUN (no writes; only first 3 images fetched as smoke test)'}`);
  if (CLEAN) console.log('--clean: existing categories/items in target menu(s) will be deleted before insert');
  for (const slug of SLUGS) {
    await seedLocation(slug);
  }
  console.log('\nDone.');
})().catch((e) => {
  console.error('FATAL:', e);
  process.exit(1);
});
