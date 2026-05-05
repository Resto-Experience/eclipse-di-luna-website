// Fix run-on suffixes glued to the end of menu_items.description.
// Patterns:
//   1. `...BittersOptional: Passion Fruit` → split with `\n` before `Optional:`
//   2. `...AgaveFLAVORS $2: Mango, ...` → split with `\n` before `FLAVORS $X:`
//   3. `...Ginger BeerMocktail` → strip suffix, push 'Mocktail' to tags (renders italic via subtitle)
//
// Usage:
//   node scripts/fix-description-suffixes.mjs           # dry-run
//   node scripts/fix-description-suffixes.mjs --apply

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

// `Optional:` glued to the end after non-space (handles "BittersOptional:" and "Beans.Optional:")
const OPTIONAL_RE = /(?<=\S)(Optional:\s*)/;
// `FLAVORS $X:` glued to the end after non-space
const FLAVORS_RE = /(?<=\S)(FLAVORS \$\d+:\s*)/;
// Trailing `Mocktail` glued to a word at the end
const MOCKTAIL_RE = /([a-zé"”])Mocktail\s*$/;

function applyFixes(desc, existingTags) {
  let next = desc;
  let extraTag = null;

  // Mocktail (strip + tag)
  if (MOCKTAIL_RE.test(next)) {
    next = next.replace(MOCKTAIL_RE, '$1').trimEnd();
    extraTag = 'Mocktail';
  }
  // Optional: split with newline
  if (OPTIONAL_RE.test(next)) {
    next = next.replace(OPTIONAL_RE, '\n$1');
  }
  // FLAVORS $X: split with newline
  if (FLAVORS_RE.test(next)) {
    next = next.replace(FLAVORS_RE, '\n$1');
  }

  const tagsArr = Array.isArray(existingTags) ? [...existingTags] : [];
  if (extraTag && !tagsArr.includes(extraTag)) tagsArr.push(extraTag);

  return { description: next, tags: tagsArr, changed: next !== desc || tagsArr.length !== (existingTags?.length ?? 0) };
}

async function main() {
  const { data: menus } = await supa.from('menus').select('id').eq('restaurant_id', RESTAURANT_ID);
  const { data: cats } = await supa.from('menu_categories').select('id').in('menu_id', menus.map(m => m.id));
  const { data: items } = await supa
    .from('menu_items')
    .select('id, name, description, tags')
    .in('category_id', cats.map(c => c.id))
    .not('description', 'is', null);

  console.log(`Mode: ${APPLY ? 'APPLY' : 'DRY-RUN'}. Scanning ${items.length} items...`);
  let touched = 0;
  for (const it of items) {
    const result = applyFixes(it.description, it.tags);
    if (!result.changed) continue;
    if (!APPLY) {
      console.log(`  [dry] ${it.name}:`);
      console.log(`    BEFORE desc: ${JSON.stringify(it.description)}`);
      console.log(`    AFTER  desc: ${JSON.stringify(result.description)}`);
      if (JSON.stringify(it.tags) !== JSON.stringify(result.tags)) {
        console.log(`    AFTER  tags: ${JSON.stringify(result.tags)}`);
      }
      touched++;
      continue;
    }
    const { error } = await supa
      .from('menu_items')
      .update({ description: result.description, tags: result.tags })
      .eq('id', it.id);
    if (error) console.error(`  ✗ ${it.name}: ${error.message}`);
    else touched++;
  }
  console.log(`\nDone. ${APPLY ? 'Updated' : 'Would update'} ${touched} items.`);
}

main().catch(e => { console.error('FATAL', e); process.exit(1); });
