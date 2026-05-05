// Beer items (Beers, Craft Beers, Draft Beers) have run-on descriptions where each entry
// ends in a country/state and is concatenated to the next entry's brand name without a separator.
// This script splits at those boundaries by inserting a newline.
// The front renders newlines via `whiteSpace: 'pre-line'` so each beer ends on its own line.
//
// Usage:
//   node scripts/fix-beer-runons.mjs           # dry-run
//   node scripts/fix-beer-runons.mjs --apply

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
const TARGET_NAMES = new Set(['Beers', 'Craft Beers', 'Draft Beers']);

// Origins that mark the END of a beer entry. After one of these (and an optional closing
// paren), if the next char is an uppercase letter starting a brand, insert a newline.
const ORIGIN_RE = new RegExp(
  '\\b(' +
    'México|Mexico|USA|Italy|Ireland|Holland|Belgium|Spain|France|Germany|Argentina|Portugal|Czech Republic|England|Scotland|Japan|Korea|New Zealand|Australia|Chile|Cuba' +
    '|[A-Z]{2}' + // 2-letter US state codes (GA, MA, NY, etc.)
  ')(\\))?(?=[A-Z][a-z])',
  'g',
);

function splitRunOn(desc) {
  if (!desc) return desc;
  return desc
    .replace(ORIGIN_RE, (_m, origin, paren) => `${origin}${paren ?? ''}\n`)
    // collapse blank lines that may form when entries already had ", " before the next capital
    .replace(/\n\s*\n/g, '\n');
}

async function main() {
  const { data: menus } = await supa.from('menus').select('id').eq('restaurant_id', RESTAURANT_ID);
  const { data: cats } = await supa.from('menu_categories').select('id,name').in('menu_id', menus.map(m => m.id));
  const catIds = cats.map(c => c.id);
  const { data: items } = await supa
    .from('menu_items')
    .select('id, name, description, category_id')
    .in('category_id', catIds)
    .in('name', [...TARGET_NAMES]);

  console.log(`Mode: ${APPLY ? 'APPLY' : 'DRY-RUN'}. Found ${items.length} target items (Beers/Craft Beers/Draft Beers).`);
  let touched = 0;
  for (const it of items) {
    const next = splitRunOn(it.description);
    if (next === it.description) continue;
    if (!APPLY) {
      console.log(`  [dry] ${it.name}:\n    BEFORE: ${it.description}\n    AFTER:  ${next.replace(/\n/g, ' ⏎ ')}\n`);
      touched++;
      continue;
    }
    const { error } = await supa.from('menu_items').update({ description: next }).eq('id', it.id);
    if (error) console.error(`  ✗ ${it.name}: ${error.message}`);
    else touched++;
  }
  console.log(`\nDone. ${APPLY ? 'Updated' : 'Would update'} ${touched} items.`);
}

main().catch(e => { console.error('FATAL', e); process.exit(1); });
