// For Eclipse di Luna wine items, descriptions like "Pinot Grigio Blend, Venezia Giulia, ItalyWhite Wine"
// have the wine type concatenated to the description with no separator.
// This script strips the wine-type suffix from `description` and stores it in `tags` (jsonb).
//
// Usage:
//   node scripts/fix-wine-type-suffix.mjs            # dry-run
//   node scripts/fix-wine-type-suffix.mjs --apply

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
  console.error('Missing env vars'); process.exit(1);
}

const APPLY = process.argv.includes('--apply');
const RESTAURANT_ID = 'de666d41-0bd5-48a5-a1e1-ab104a0477d0';
const supa = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });

// Match suffix: "...someText" + "Red Wine" | "White Wine" | "Sparkling Wine" | "Zero Proof Wine" + optional trailing whitespace
const SUFFIX_RE = /(Red Wine|White Wine|Sparkling Wine|Zero Proof Wine)\s*$/;

async function main() {
  const { data: menus } = await supa.from('menus').select('id').eq('restaurant_id', RESTAURANT_ID);
  const menuIds = menus.map((m) => m.id);
  const { data: cats } = await supa.from('menu_categories').select('id').in('menu_id', menuIds);
  const catIds = cats.map((c) => c.id);

  const { data: items, error } = await supa
    .from('menu_items')
    .select('id, name, description, tags')
    .in('category_id', catIds)
    .not('description', 'is', null);
  if (error) throw error;

  console.log(`Mode: ${APPLY ? 'APPLY' : 'DRY-RUN'}. Scanning ${items.length} items...`);
  let touched = 0;
  for (const item of items) {
    const desc = item.description ?? '';
    const m = desc.match(SUFFIX_RE);
    if (!m) continue;
    const wineType = m[1];
    const newDesc = desc.slice(0, m.index).replace(/[\s,]+$/, '').trim() || null;
    const existingTags = Array.isArray(item.tags) ? item.tags : [];
    if (existingTags.includes(wineType)) continue; // already migrated
    const newTags = [...existingTags, wineType];

    if (!APPLY) {
      console.log(`  [dry] ${item.name}: "${desc}" → desc="${newDesc}" tags=${JSON.stringify(newTags)}`);
      touched++;
      continue;
    }
    const { error: uErr } = await supa
      .from('menu_items')
      .update({ description: newDesc, tags: newTags })
      .eq('id', item.id);
    if (uErr) {
      console.error(`  ✗ ${item.name}: ${uErr.message}`);
      continue;
    }
    touched++;
  }
  console.log(`\nDone. ${APPLY ? 'Updated' : 'Would update'} ${touched} items.`);
}

main().catch((e) => { console.error('FATAL', e); process.exit(1); });
