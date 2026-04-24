/**
 * Menu data schema. Shape designed so it can be drop-in replaced by an API
 * response later (dynamic app integration coming next).
 */

export type MenuTag = 'Gluten Free' | 'Vegan' | 'Vegetarian';

export interface MenuItem {
  name: string;
  description?: string;
  price?: string; // string, not number — supports "11", "20 Carafes | 38 Pitcher", "9 gls | 36 btl"
  image?: string;
  tags?: MenuTag[];
}

export interface MenuSection {
  name: string;        // "Signature Cocktails", "Tapas", etc.
  priceNote?: string;  // e.g. "Tapas $7" for sections with uniform pricing
  items: MenuItem[];
}

export interface MenuTab {
  id: string;       // "cocktails", "tapas", "wine", "happy-hour", ...
  label: string;    // "Cocktails", "Tapas", ...
  sections: MenuSection[];
}

export interface LocationMenu {
  slug: string;          // "alpharetta"
  locationName: string;
  tabs: MenuTab[];
}
