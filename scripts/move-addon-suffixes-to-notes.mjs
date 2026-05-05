// Refactor: previously these suffixes lived in `description` after a \n. Move them
// to the `notes` column so the data model is cleaner (the team's admin app has a
// dedicated Notes field).
//
//   - "Optional: Creamy"            (Eclipse Espresso, Guava Pisco)
//   - "FLAVORS $X: ..."             (Margarita)
//   - "Add ... to any Paella N"     (Paella De Verduras / Del Dia / De Mariscos)
//   - "+ Manchego 2 | Serrano 3 ..." (Pan Catalan)
//
// "Market Price" items (base_price = 0) keep notes as the price-display fallback.
// Discrimination in the front: notes is treated as an add-on line when base_price > 0,
// and as a price string when base_price is null/0.
//
// Usage:
//   node scripts/move-addon-suffixes-to-notes.mjs           # dry-run
//   node scripts/move-addon-suffixes-to-notes.mjs --apply

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

// Each pattern matches a suffix at the end of description (preceded by \n).
const SUFFIX_PATTERNS = [
  /\n(Optional:\s.+)$/,
  /\n(FLAVORS\s+\$\d+:\s.+)$/,
  /\n(Add\s+[\w\s]+?Paella\s+\d+\s*)$/,
  /\n(\+\s.+)$/,
];

function extractSuffix(desc) {
  for (const re of SUFFIX_PATTERNS) {
    const m = desc.match(re);
    if (m) {
      return {
        newDesc: desc.slice(0, m.index).trimEnd(),
        notes: m[1].trim(),
      };
    }
  }
  return null;
}

async function main() {
  const { data: menus } = await supa.from('menus').select('id').eq('restaurant_id', RESTAURANT_ID);
  const { data: cats } = await supa.from('menu_categories').select('id').in('menu_id', menus.map(m => m.id));
  const { data: items } = await supa
    .from('menu_items')
    .select('id, name, description, notes, base_price')
    .in('category_id', cats.map(c => c.id))
    .not('description', 'is', null);

  console.log(`Mode: ${APPLY ? 'APPLY' : 'DRY-RUN'}. Scanning ${items.length} items...`);
  let touched = 0;
  for (const it of items) {
    const result = extractSuffix(it.description);
    if (!result) continue;
    // Skip if it would clobber existing meaningful notes (e.g. "Market Price")
    if (it.notes && it.notes.trim() && it.notes.trim() !== result.notes) {
      console.warn(`  ⚠  ${it.name}: existing notes "${it.notes}" — skipping to avoid clobber`);
      continue;
    }
    if (!APPLY) {
      console.log(`  [dry] ${it.name}:`);
      console.log(`    desc: ${JSON.stringify(it.description)}`);
      console.log(`     →    desc: ${JSON.stringify(result.newDesc)}`);
      console.log(`          notes: ${JSON.stringify(result.notes)}`);
      touched++;
      continue;
    }
    const { error } = await supa
      .from('menu_items')
      .update({ description: result.newDesc, notes: result.notes })
      .eq('id', it.id);
    if (error) console.error(`  ✗ ${it.name}: ${error.message}`);
    else touched++;
  }
  console.log(`\nDone. ${APPLY ? 'Updated' : 'Would update'} ${touched} items.`);
}

main().catch(e => { console.error('FATAL', e); process.exit(1); });
