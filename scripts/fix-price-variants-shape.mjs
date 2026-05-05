// Fix the shape of menu_items.price_variants for Eclipse di Luna items.
// Original (wrong): [{ name, price: <number> }]
// Target (matches the app's expectation):
//   [{ name, price: "<number-as-string>", discountPercent: 0 }]
//
// Usage:
//   node scripts/fix-price-variants-shape.mjs           # dry-run (default)
//   node scripts/fix-price-variants-shape.mjs --apply

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

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
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const APPLY = process.argv.includes('--apply');
const RESTAURANT_ID = 'de666d41-0bd5-48a5-a1e1-ab104a0477d0';

const supa = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

function fmtPriceString(n) {
  // Match the existing convention seen in other restaurants' data: bare numbers like "20", "5.49".
  return Number.isInteger(n) ? String(n) : String(n);
}

function normalizeVariants(variants) {
  return variants.map((v) => {
    const priceNum = typeof v.price === 'number' ? v.price : Number(v.price);
    return {
      name: typeof v.name === 'string' ? v.name : String(v.name ?? ''),
      price: fmtPriceString(priceNum),
      discountPercent: typeof v.discountPercent === 'number' ? v.discountPercent : 0,
    };
  });
}

function variantsAlreadyOk(variants) {
  return Array.isArray(variants) && variants.every((v) =>
    typeof v.price === 'string' &&
    typeof v.name === 'string' &&
    typeof v.discountPercent === 'number'
  );
}

async function main() {
  // Fetch every menu item under Eclipse di Luna's menus that has price_variants.
  const { data: menus, error: mErr } = await supa
    .from('menus')
    .select('id, name')
    .eq('restaurant_id', RESTAURANT_ID);
  if (mErr) throw mErr;
  const menuIds = menus.map((m) => m.id);

  const { data: cats, error: cErr } = await supa
    .from('menu_categories')
    .select('id')
    .in('menu_id', menuIds);
  if (cErr) throw cErr;
  const catIds = cats.map((c) => c.id);

  const { data: items, error: iErr } = await supa
    .from('menu_items')
    .select('id, name, price_variants')
    .in('category_id', catIds)
    .not('price_variants', 'is', null);
  if (iErr) throw iErr;

  console.log(`Mode: ${APPLY ? 'APPLY' : 'DRY-RUN'}`);
  console.log(`Found ${items.length} items with price_variants under Eclipse di Luna.`);
  let fixed = 0, skipped = 0;
  for (const item of items) {
    if (variantsAlreadyOk(item.price_variants)) {
      skipped++;
      continue;
    }
    const next = normalizeVariants(item.price_variants);
    if (!APPLY) {
      console.log(`  [dry] ${item.name}: ${JSON.stringify(item.price_variants)} → ${JSON.stringify(next)}`);
      fixed++;
      continue;
    }
    const { error: uErr } = await supa
      .from('menu_items')
      .update({ price_variants: next })
      .eq('id', item.id);
    if (uErr) {
      console.error(`  ✗ ${item.name} (${item.id}): ${uErr.message}`);
      continue;
    }
    fixed++;
  }
  console.log(`\nDone. Fixed=${fixed}, AlreadyOk=${skipped}, Total=${items.length}`);
}

main().catch((e) => { console.error('FATAL', e); process.exit(1); });
