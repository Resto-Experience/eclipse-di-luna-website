import 'server-only';
import { supabaseServer } from './supabase-server';
import type { LocationSlug } from '@/types/location';
import type { LocationMenu, MenuItem, MenuSection, MenuTab, MenuTag } from '@/types/menu';

const RESTAURANT_ID = 'de666d41-0bd5-48a5-a1e1-ab104a0477d0';

// Tab id (stored in menu_categories.description) → display label and JSON ordering.
// The JSON had a stable tab order; we replicate it so the sidebar matches the legacy UI.
const TAB_LABELS: Record<string, string> = {
  cocktails: 'Cocktails',
  tapas: 'Tapas',
  entrees: 'Entrees',
  dessert: 'Desserts',
  wine: 'Wines',
  beer: 'Beers',
  maycocktails: 'May Cocktails',
  brunch: 'Brunch',
  'happy-hour': 'Happy Hour',
};
const TAB_ORDER = ['cocktails', 'tapas', 'entrees', 'dessert', 'wine', 'beer', 'maycocktails', 'brunch', 'happy-hour'];

const LOCATION_NAMES: Record<LocationSlug, string> = {
  alpharetta: 'Alpharetta',
  beltline: 'Beltline',
  buckhead: 'Buckhead',
  dunwoody: 'Dunwoody',
};

const DIETARY_TAGS: ReadonlySet<string> = new Set(['Gluten Free', 'Vegan', 'Vegetarian']);

// menu_items.tags is jsonb of arbitrary strings; we map known dietary ones back into MenuTag union.
function buildTags(row: { is_vegan: boolean; is_gluten_free: boolean; tags: unknown }): MenuTag[] | undefined {
  const out: MenuTag[] = [];
  if (row.is_gluten_free) out.push('Gluten Free');
  if (row.is_vegan) out.push('Vegan');
  // Vegetarian flag doesn't exist in DB yet; fall back to a literal string in the jsonb tags array.
  if (Array.isArray(row.tags)) {
    for (const t of row.tags) {
      if (t === 'Vegetarian' && !out.includes('Vegetarian')) out.push('Vegetarian');
    }
  }
  return out.length ? out : undefined;
}

// Non-dietary tags (wine type, etc.) join together as the italic subtitle line below the description.
function buildSubtitle(tags: unknown): string | undefined {
  if (!Array.isArray(tags)) return undefined;
  const parts = tags.filter((t): t is string => typeof t === 'string' && !DIETARY_TAGS.has(t));
  return parts.length ? parts.join(' · ') : undefined;
}

function fmtNumber(n: number): string {
  return Number.isInteger(n) ? String(n) : String(n);
}

// Variant names that read as "{name} {price}" rather than "{price} {name}" on the menu.
// Glass/serving-size abbreviations come before the price; container-noun plurals
// (Pitcher, Carafes) come after and fall through to the default.
const NAME_FIRST_VARIANTS: ReadonlySet<string> = new Set([
  'Single', 'Familia', 'Btl', 'btl', 'gls', 'Glass', 'Split', 'Half Btl', 'Bottle',
]);

// Reconstruct the original price string from the DB columns. Format choices:
// - notes wins ONLY when there's no real numeric price (base_price is null/0) —
//   that's the "Market Price" fallback. When base_price > 0, notes is informational
//   (e.g. "Optional: Creamy") and is exposed via MenuItem.notes instead.
// - price_variants with ≥1 entry → "{price} {name} | {price} {name}"
// - base_price + base_price_max range → "{min}-{max}"
// - base_is_price_range without max → "Starting at {base_price}"
// - plain base_price > 0 → "{base_price}"
function buildPriceString(row: {
  base_price: number | string | null;
  base_price_max: number | string | null;
  base_is_price_range: boolean;
  price_variants: unknown;
  notes: string | null;
}): string | undefined {
  const baseNum = row.base_price == null ? null : Number(row.base_price);
  const hasNumericPrice = baseNum != null && baseNum > 0;
  if (!hasNumericPrice && row.notes && row.notes.trim()) return row.notes.trim();

  if (Array.isArray(row.price_variants) && row.price_variants.length) {
    const parts = (row.price_variants as Array<{ name?: string; price?: number | string }>)
      .map((v) => {
        const p = typeof v.price === 'string' ? Number(v.price) : v.price;
        if (p == null || Number.isNaN(p)) return null;
        const name = (v.name ?? '').trim();
        if (!name) return fmtNumber(p);
        // Name-first formatting for serving-size labels that read more naturally before
        // the price (e.g. "Single 22 | Familia 40", "Btl 46", "9 gls" stays as "gls 9").
        // Default to price-first ("38 Pitcher") for everything else.
        return NAME_FIRST_VARIANTS.has(name) ? `${name} ${fmtNumber(p)}` : `${fmtNumber(p)} ${name}`;
      })
      .filter((s): s is string => !!s);
    if (parts.length) return parts.join(' | ');
  }

  const base = row.base_price == null ? null : Number(row.base_price);
  const max = row.base_price_max == null ? null : Number(row.base_price_max);

  if (row.base_is_price_range) {
    if (base != null && max != null) return `${fmtNumber(base)}-${fmtNumber(max)}`;
    if (base != null) return `Starting at ${fmtNumber(base)}`;
  }

  if (base != null && base > 0) return fmtNumber(base);
  return undefined;
}

async function fetchLocationMenu(slug: LocationSlug): Promise<LocationMenu> {
  const supa = supabaseServer();
  const locationName = LOCATION_NAMES[slug];

  const { data: menus, error: menuErr } = await supa
    .from('menus')
    .select('id, name')
    .eq('restaurant_id', RESTAURANT_ID)
    .eq('name', `Menu ${locationName}`)
    .limit(1);
  if (menuErr) throw new Error(`menus query failed: ${menuErr.message}`);
  const menu = menus?.[0];
  if (!menu) {
    return { slug, locationName, tabs: [] };
  }

  const { data: categories, error: catErr } = await supa
    .from('menu_categories')
    .select('id, name, description, sort_order')
    .eq('menu_id', menu.id)
    .order('sort_order', { ascending: true });
  if (catErr) throw new Error(`categories query failed: ${catErr.message}`);

  const catIds = (categories ?? []).map((c) => c.id);
  const itemsByCategory = new Map<string, MenuItem[]>();
  if (catIds.length) {
    const { data: items, error: itemErr } = await supa
      .from('menu_items')
      .select('category_id, name, description, image_url, base_price, base_price_max, base_is_price_range, price_variants, notes, is_vegan, is_gluten_free, tags, sort_order')
      .in('category_id', catIds)
      .order('sort_order', { ascending: true });
    if (itemErr) throw new Error(`items query failed: ${itemErr.message}`);
    for (const row of items ?? []) {
      // Notes is informational (rendered separately) only when there's a real price.
      // When base_price is null/0, notes is the price-display fallback handled by buildPriceString.
      const baseNum = row.base_price == null ? null : Number(row.base_price);
      const itemNotes = baseNum != null && baseNum > 0 && row.notes ? row.notes.trim() : undefined;
      const item: MenuItem = {
        name: row.name,
        description: row.description ?? undefined,
        price: buildPriceString(row),
        image: row.image_url ?? undefined,
        tags: buildTags(row),
        subtitle: buildSubtitle(row.tags),
        notes: itemNotes || undefined,
      };
      const arr = itemsByCategory.get(row.category_id) ?? [];
      arr.push(item);
      itemsByCategory.set(row.category_id, arr);
    }
  }

  // Group categories by tab id (stored in description), preserving order within each tab.
  const tabMap = new Map<string, MenuSection[]>();
  for (const cat of categories ?? []) {
    const tabId = cat.description ?? 'misc';
    const section: MenuSection = {
      name: cat.name,
      items: itemsByCategory.get(cat.id) ?? [],
    };
    const list = tabMap.get(tabId) ?? [];
    list.push(section);
    tabMap.set(tabId, list);
  }

  // Order tabs by canonical TAB_ORDER, then any unknown tabs at the end.
  const knownTabs = TAB_ORDER.filter((id) => tabMap.has(id));
  const unknownTabs = [...tabMap.keys()].filter((id) => !TAB_ORDER.includes(id));
  const tabs: MenuTab[] = [...knownTabs, ...unknownTabs].map((id) => ({
    id,
    label: TAB_LABELS[id] ?? id,
    sections: tabMap.get(id) ?? [],
  }));

  return { slug, locationName, tabs };
}

// No caching: every request reads fresh from Supabase so edits propagate immediately.
export const getLocationMenu = (slug: LocationSlug) => fetchLocationMenu(slug);
