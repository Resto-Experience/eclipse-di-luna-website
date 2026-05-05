// Two updates scraped from https://www.eclipsediluna.com/menu/menu-alpharetta:
//   1. Replace the "Pulpo a la Gallega" image (all 4 locations) with the new live image.
//   2. Replace the "April Cocktails | ..." section with "May Cocktails" (4 new items with images).
//
// Usage:
//   node scripts/update-pulpo-and-may-cocktails.mjs           # dry-run
//   node scripts/update-pulpo-and-may-cocktails.mjs --apply

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
function loadEnvLocal() {
  const p = path.join(ROOT, '.env.local'); if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}
loadEnvLocal();
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SR = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supa = createClient(SUPABASE_URL, SR, { auth: { persistSession: false, autoRefreshToken: false } });

const APPLY = process.argv.includes('--apply');
const RESTAURANT_ID = 'de666d41-0bd5-48a5-a1e1-ab104a0477d0';
const BUCKET = 'restaurant-assets';

const PULPO_IMAGE_URL = 'https://cdn.prod.website-files.com/6994c2d3aa91059c8d2e74e7/69f0f21f3be0c0f428232182_pulpo-gallega.png';
const MAY_COCKTAILS = [
  { name: 'Smoked Sol Paloma',         description: 'Rocks Glass, Tajín Rim, Pineapple Wedge & Basil Sprig',                              price: '14', image: 'https://cdn.prod.website-files.com/6994c2d3aa91059c8d2e74e7/69f4e2c28c0076ac3b5dcb14_Smoked%20Sol%20Paloma.webp' },
  { name: 'Spiced Sol Mule',           description: 'Mule Mug, No Rim, Dehydrated Orange Wheel & Dehydrated Rose Petals',                price: '14', image: 'https://cdn.prod.website-files.com/6994c2d3aa91059c8d2e74e7/69f4e2bc33878dc836bd9a2c_Spiced%20Sol%20Mule.webp' },
  { name: 'Strawberry Basil Margarita', description: 'Rocks Glass, Half Tajín Rim, Dehydrated Lime Wheel, Strawberry & Basil Sprig',     price: '14', image: 'https://cdn.prod.website-files.com/6994c2d3aa91059c8d2e74e7/69f4e2b28d5a7f702bff4d60_Strawberry%20Basil%20Margarita.webp' },
  { name: 'Tobalá Mojito',             description: 'Tall Rocks Glass, No Rim, Mint Sprig',                                              price: '14', image: 'https://cdn.prod.website-files.com/6994c2d3aa91059c8d2e74e7/69f4e2a93bd5e32dc182c8ad_Tobal%C3%A1%20Mojito.png' },
];

async function fetchAsWebp(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (eclipsediluna-update)' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  return sharp(buf).webp({ quality: 85, effort: 4 }).toBuffer();
}

async function uploadImage(itemId, sourceUrl) {
  const filePath = `restaurants/${RESTAURANT_ID}/items/${itemId}.webp`;
  const webp = await fetchAsWebp(sourceUrl);
  if (!APPLY) return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${filePath}?v=DRYRUN`;
  let lastErr;
  for (let i = 1; i <= 3; i++) {
    const { error } = await supa.storage.from(BUCKET).upload(filePath, webp, { contentType: 'image/webp', upsert: true });
    if (!error) return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${filePath}?v=${Date.now()}`;
    lastErr = error;
    await new Promise((r) => setTimeout(r, 300 * i));
  }
  throw new Error(`storage upload failed: ${lastErr?.message}`);
}

// ----- Update 1: Pulpo image -----
async function updatePulpo() {
  console.log('\n=== Update 1: Pulpo a la Gallega image ===');
  const { data: menus } = await supa.from('menus').select('id').eq('restaurant_id', RESTAURANT_ID);
  const { data: cats } = await supa.from('menu_categories').select('id').in('menu_id', menus.map(m => m.id));
  const { data: items } = await supa
    .from('menu_items')
    .select('id, name')
    .in('category_id', cats.map(c => c.id))
    .eq('name', 'Pulpo a la Gallega');
  console.log(`  Found ${items.length} Pulpo items.`);
  for (const it of items) {
    if (!APPLY) {
      console.log(`  [dry] would upload new image for ${it.id}`);
      continue;
    }
    const url = await uploadImage(it.id, PULPO_IMAGE_URL);
    const { error } = await supa.from('menu_items').update({ image_url: url }).eq('id', it.id);
    if (error) console.error(`  ✗ ${it.id}: ${error.message}`);
    else console.log(`  ✓ ${it.id} → ${url.split('?')[0]}`);
  }
}

// ----- Update 2: April → May Cocktails -----
async function updateCocktailsSection() {
  console.log('\n=== Update 2: April → May Cocktails ===');
  // Find all "aprilcocktails" categories (one per location)
  const { data: menus } = await supa.from('menus').select('id, name').eq('restaurant_id', RESTAURANT_ID);
  const { data: aprilCats } = await supa
    .from('menu_categories')
    .select('id, menu_id, location_id, sort_order, name, description')
    .in('menu_id', menus.map(m => m.id))
    .eq('description', 'aprilcocktails');
  console.log(`  Found ${aprilCats.length} April Cocktails categories.`);

  for (const cat of aprilCats) {
    const menuName = menus.find(m => m.id === cat.menu_id)?.name;
    console.log(`\n  ${menuName} → category ${cat.id}`);
    if (!APPLY) {
      console.log(`    [dry] rename to "May Cocktails", description="maycocktails"`);
      console.log(`    [dry] delete current items, insert ${MAY_COCKTAILS.length} new items with images`);
      // exercise image fetch for first item as smoke test
      try {
        const buf = await fetchAsWebp(MAY_COCKTAILS[0].image);
        console.log(`    [dry] image fetch+encode ok (${buf.length} bytes)`);
      } catch (e) {
        console.warn(`    [dry] image fetch FAILED: ${e.message}`);
      }
      continue;
    }

    // Delete existing items in this category
    const { error: delErr } = await supa.from('menu_items').delete().eq('category_id', cat.id);
    if (delErr) { console.error(`    ✗ delete items: ${delErr.message}`); continue; }

    // Rename category
    const { error: renErr } = await supa
      .from('menu_categories')
      .update({ name: 'May Cocktails', description: 'maycocktails' })
      .eq('id', cat.id);
    if (renErr) { console.error(`    ✗ rename category: ${renErr.message}`); continue; }
    console.log(`    ✓ renamed category`);

    // Insert new items
    let sortOrder = 10;
    for (const ck of MAY_COCKTAILS) {
      const baseRow = {
        category_id: cat.id,
        name: ck.name,
        description: ck.description,
        is_active: true,
        sort_order: sortOrder,
        is_vegan: false,
        is_gluten_free: false,
        currency: 'USD',
        show_currency: true,
        item_type: 'drink',
        contains_alcohol: true,
        tags: [],
        allergens: [],
        base_price: Number(ck.price),
        base_price_max: null,
        base_is_price_range: false,
        price_variants: null,
        notes: null,
      };
      const { data: ins, error: insErr } = await supa.from('menu_items').insert(baseRow).select('*').single();
      if (insErr) { console.error(`    ✗ insert ${ck.name}: ${insErr.message}`); continue; }
      try {
        const url = await uploadImage(ins.id, ck.image);
        await supa.from('menu_items').update({ image_url: url }).eq('id', ins.id);
        console.log(`    ✓ ${ck.name} → ${url.split('?')[0]}`);
      } catch (e) {
        console.warn(`    ⚠  image failed for ${ck.name}: ${e.message}`);
      }
      sortOrder += 10;
    }
  }
}

(async () => {
  console.log(`Mode: ${APPLY ? 'APPLY' : 'DRY-RUN'}`);
  await updatePulpo();
  await updateCocktailsSection();
  console.log('\nDone.');
})().catch(e => { console.error('FATAL', e); process.exit(1); });
