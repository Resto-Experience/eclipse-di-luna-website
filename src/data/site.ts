import type { NavItem } from '@/types/site';

export const SITE_NAME = 'Eclipse di Luna';
export const SITE_TAGLINE = 'Restaurant & Tapas Bar';
export const SITE_INSTAGRAM = 'https://www.instagram.com/eclipsediluna/?hl=en';
export const SITE_INSTAGRAM_HANDLE = '@eclipsediluna';

// Locations dropdown items
export const LOCATIONS_DROPDOWN: NavItem[] = [
  { label: 'Alpharetta', href: '/location-alpharetta' },
  { label: 'Beltline', href: '/location-beltline' },
  { label: 'Buckhead', href: '/location-buckhead' },
  { label: 'Dunwoody', href: '/location-dunwoody' },
];

// Menu dropdown items (per-location menus)
export const MENU_DROPDOWN: NavItem[] = [
  { label: 'Alpharetta', href: '/menu/menu-alpharetta' },
  { label: 'Beltline', href: '/menu/menu-beltline' },
  { label: 'Buckhead', href: '/menu/menu-buckhead' },
  { label: 'Dunwoody', href: '/menu/menu-dunwoody' },
];

// "More" dropdown items
export const MORE_DROPDOWN: NavItem[] = [
  { label: 'Jobs', href: '/jobs' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact-us' },
];

// Main nav items (in order, matching live site)
export const NAV_ITEMS: NavItem[] = [
  { label: 'Locations', href: '#', dropdown: LOCATIONS_DROPDOWN },
  { label: 'Menu', href: '/menu', dropdown: MENU_DROPDOWN },
  { label: 'Private Party', href: '/private-party' },
  { label: 'Catering', href: '/catering' },
  { label: 'More', href: '#', dropdown: MORE_DROPDOWN },
];

export const FOOTER_MORE_LINKS: NavItem[] = [
  { label: 'Private Party', href: '/private-party' },
  { label: 'Catering', href: '/catering' },
  { label: 'Jobs', href: '/jobs' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact-us' },
];

export const SITE_CREDIT = {
  label: 'Restaurant Marketing, Content & Web Design',
  year: '2026',
  href: 'https://restoexp.com/',
};
