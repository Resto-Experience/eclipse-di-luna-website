export type LocationSlug = 'alpharetta' | 'beltline' | 'buckhead' | 'dunwoody';

export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface HoursEntry {
  day: DayOfWeek;
  open: string; // format: "04:00 pm"
  close: string; // format: "10:00 pm"
}

export interface LocationContact {
  phone: string;
  email: string;
  cateringEmail: string;
  cateringPhone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export interface LocationLinks {
  orderOnline: string;
  reservations: string;
  delivery: string;
  giftCard: string;
  menu: string; // internal route e.g. '/menu/menu-alpharetta'
  googleMaps: string;
}

export interface EntertainmentItem {
  day: string;
  type: string;
  time: string;
  image?: string;
}

export interface EntertainmentSchedule {
  title: string;
  description: string;
  items: EntertainmentItem[];
}

export interface Deal {
  title: string;
  description: string;
  day?: string;
  image?: string;
}

export interface Location {
  slug: LocationSlug;
  name: string;
  subtitle: string;
  description: string;
  tagline: string;
  heroImage: string;
  cardImage: string; // image used in LocationCard on Home page
  contact: LocationContact;
  links: LocationLinks;
  hours: HoursEntry[];
  entertainment: EntertainmentSchedule;
  deals: Deal[];
}
