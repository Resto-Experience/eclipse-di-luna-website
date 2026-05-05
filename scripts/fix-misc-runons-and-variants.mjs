// Round 2 of cosmetic fixes flagged by the team after manual QA.
// Issues:
//   1. Pan Catalan: "Sauce+ Manchego 2 | Serrano 3 | Chorizo 3" → split before `+ `
//   2. Paellas: "...Tomato Saffron BrothAdd Squid ink to any Paella 5" → split before `Add ...Paella N`
//   3. Beers (Buckhead Libations + Beer tab): "...MéxicoDOS XX" — old regex required [A-Z][a-z] after origin; DOS is all caps. Re-run with extended lookahead [A-Z]{2,}.
//   4. Mocktails: "Housemade Cucumber Blend,Mint, Lemon Juice, Club Soda" — comma-no-space before capital → split with newline after the comma.
//   5. Maso Canali: variant {name:"tl"} is a parser leftover; rename to "btl".
//
// Variant-rendering ordering (name-first for Single/Familia/Btl/etc.) is
// fixed in the front (src/lib/menu-db.ts), not here.
//
// Usage:
//   node scripts/fix-misc-runons-and-variants.mjs           # dry-run
//   node scripts/fix-misc-runons-and-variants.mjs --apply

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

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
const supa = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const APPLY = process.argv.includes('--apply');
const RESTAURANT_ID = 'de666d41-0bd5-48a5-a1e1-ab104a0477d0';

// Origins (named countries + explicit US state codes) — `[A-Z]{2}` generic was
// dropped because it falsely matched prefixes like "FL" inside "FLAVORS".
const ORIGIN_NAMED = 'México|Mexico|USA|Italy|Ireland|Holland|Belgium|Spain|France|Germany|Argentina|Portugal|Czech Republic|England|Scotland|Japan|Korea|New Zealand|Australia|Chile|Cuba|GA|MA|NY';
// Lookahead: a Capital+lowercase brand (Heineken) OR an all-caps brand (DOS XX) followed by space.
const ORIGIN_RE = new RegExp(`\\b(${ORIGIN_NAMED})(\\))?(?=[A-Z][a-z]|[A-Z]{2,}\\s)`, 'g');

// Drop-in suffix patterns that should start a new line.
const PLUS_ADDON_RE = /(?<=\S)(\+\s)/;                              // Pan Catalan-style: Sauce+ Manchego
const PAELLA_ADDON_RE = /(?<=\S)(Add\s+[\w\s]+?Paella\s+\d+\s*)$/;  // Paellas: BrothAdd Squid ink to any Paella 5

// Items where comma-no-space-capital should be a NEWLINE (list-style description).
// Everything else with that pattern gets a space inserted (typo fix).
const COMMA_NEWLINE_ITEMS = new Set(['Mocktails']);

function fixDescription(desc, itemName) {
  if (!desc) return desc;
  let next = desc;
  next = next.replace(PLUS_ADDON_RE, '\n+ ');
  next = next.replace(PAELLA_ADDON_RE, '\n$1');
  next = next.replace(ORIGIN_RE, (_m, origin, paren) => `${origin}${paren ?? ''}\n`);
  // comma directly followed by capital with no space
  if (COMMA_NEWLINE_ITEMS.has(itemName)) {
    next = next.replace(/,(?=[A-Z])/g, ',\n');
  } else {
    next = next.replace(/,(?=[A-Z])/g, ', ');
  }
  next = next.replace(/\n\s*\n/g, '\n');
  return next;
}

async function fixDescriptions() {
  console.log('\n=== Description run-on fixes ===');
  const { data: menus } = await supa.from('menus').select('id').eq('restaurant_id', RESTAURANT_ID);
  const { data: cats } = await supa.from('menu_categories').select('id').in('menu_id', menus.map(m => m.id));
  const { data: items } = await supa
    .from('menu_items')
    .select('id, name, description')
    .in('category_id', cats.map(c => c.id))
    .not('description', 'is', null);

  let touched = 0;
  for (const it of items) {
    const next = fixDescription(it.description, it.name);
    if (next === it.description) continue;
    if (!APPLY) {
      console.log(`  [dry] ${it.name}:`);
      console.log(`    BEFORE: ${JSON.stringify(it.description).slice(0,200)}`);
      console.log(`    AFTER:  ${JSON.stringify(next).slice(0,300)}`);
      touched++;
      continue;
    }
    const { error } = await supa.from('menu_items').update({ description: next }).eq('id', it.id);
    if (error) console.error(`  ✗ ${it.name}: ${error.message}`);
    else touched++;
  }
  console.log(`  ${APPLY ? 'Updated' : 'Would update'} ${touched} items.`);
}

async function fixTlVariant() {
  console.log('\n=== Maso Canali variant "tl" → "btl" ===');
  const { data: menus } = await supa.from('menus').select('id').eq('restaurant_id', RESTAURANT_ID);
  const { data: cats } = await supa.from('menu_categories').select('id').in('menu_id', menus.map(m => m.id));
  const { data: items } = await supa
    .from('menu_items')
    .select('id, name, price_variants')
    .in('category_id', cats.map(c => c.id))
    .not('price_variants', 'is', null);
  let touched = 0;
  for (const it of items) {
    const variants = it.price_variants;
    if (!Array.isArray(variants)) continue;
    if (!variants.some(v => v.name === 'tl')) continue;
    const next = variants.map(v => v.name === 'tl' ? { ...v, name: 'btl' } : v);
    if (!APPLY) {
      console.log(`  [dry] ${it.name}: ${JSON.stringify(variants)} → ${JSON.stringify(next)}`);
      touched++;
      continue;
    }
    const { error } = await supa.from('menu_items').update({ price_variants: next }).eq('id', it.id);
    if (error) console.error(`  ✗ ${it.name}: ${error.message}`);
    else touched++;
  }
  console.log(`  ${APPLY ? 'Updated' : 'Would update'} ${touched} items.`);
}

(async () => {
  console.log(`Mode: ${APPLY ? 'APPLY' : 'DRY-RUN'}`);
  await fixDescriptions();
  await fixTlVariant();
  console.log('\nDone.');
})().catch(e => { console.error('FATAL', e); process.exit(1); });
