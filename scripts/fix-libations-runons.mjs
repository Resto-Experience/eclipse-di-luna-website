// Fix run-on descriptions in Happy Hour | Libations $6 items.
// Patterns:
//   - Wines (`Palazzi(Pinot Grigio...)Este(Vinho...)`) → split after `)` before next capital
//   - Cocktails / Mocktails (`SangriaMojitoMargarita`) → split at lowercase→uppercase boundary
//
// Usage:
//   node scripts/fix-libations-runons.mjs           # dry-run
//   node scripts/fix-libations-runons.mjs --apply

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

// Items where descriptions are `Brand(details)Brand(details)...`
const PAREN_STYLE = new Set(['White Wines', 'Red Wines']);
// Items where descriptions are `WordWordWord` and we split on lowercase→uppercase
const RUNON_STYLE = new Set(['Cocktails', 'Mocktails']);

function splitParenStyle(desc) {
  // After a `)`, if the next char is an uppercase letter, insert newline
  return desc.replace(/\)([A-Z])/g, ')\n$1');
}

function splitRunOnStyle(desc) {
  // lowercase letter (or closing quote) directly followed by uppercase letter starting a new word
  return desc.replace(/([a-zé"”])([A-Z])/g, '$1\n$2');
}

async function main() {
  const { data: menus } = await supa.from('menus').select('id').eq('restaurant_id', RESTAURANT_ID);
  const { data: cats } = await supa.from('menu_categories').select('id,name').in('menu_id', menus.map(m => m.id));
  const libCats = cats.filter(c => c.name.includes('Libations'));
  if (!libCats.length) { console.log('No Libations categories found.'); return; }
  const targets = [...PAREN_STYLE, ...RUNON_STYLE];
  const { data: items } = await supa
    .from('menu_items')
    .select('id, name, description')
    .in('category_id', libCats.map(c => c.id))
    .in('name', targets);

  console.log(`Mode: ${APPLY ? 'APPLY' : 'DRY-RUN'}. Found ${items.length} target items in Libations.`);
  let touched = 0;
  for (const it of items) {
    if (!it.description) continue;
    const next = PAREN_STYLE.has(it.name) ? splitParenStyle(it.description) : splitRunOnStyle(it.description);
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
