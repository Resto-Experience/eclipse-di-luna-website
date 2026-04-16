export interface NavItem {
  label: string;
  href: string;
  dropdown?: NavItem[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon?: string;
}

export interface Review {
  quote: string;
  author: string;
  url: string;
}
