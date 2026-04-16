import type { Location } from '@/types/location';

export const dunwoody: Location = {
  slug: 'dunwoody',
  name: 'Eclipse di Luna - Dunwoody',
  subtitle: 'Ashford Dunwoody',
  description:
    'Eclipse di Luna Dunwoody brings the full Latin fiesta experience to the Perimeter area, with live music, dancing, and incredible tapas.',
  tagline:
    'Eclipse di Luna in Dunwoody is a vibrant fiesta! Immerse in Latin culture with music, dance, and delicious cuisine!',
  heroImage: '/images/hero/dunwoody.jpg',
  cardImage: '/images/locations/dunwoody.jpg',
  contact: {
    phone: '(470) 712-5680',
    email: 'info@eclipsediluna.net',
    cateringEmail: 'catering@eclipsediluna.net',
    cateringPhone: '(470) 712-5680',
    address: '4505 Ashford Dunwoody Road',
    city: 'Dunwoody',
    state: 'GA',
    zip: '30346',
  },
  links: {
    orderOnline: 'https://order.toasttab.com/online/eclipse-di-luna-dunwoody-4505-ashford-dunwoody-road',
    reservations: 'https://www.opentable.com/eclipse-di-luna-dunwoody',
    delivery: '',
    giftCard: 'https://order.toasttab.com/egiftcards/eclipse-di-luna-dunwoody-4505-ashford-dunwoody-road',
    menu: '/menu/menu-dunwoody',
    googleMaps: 'https://maps.app.goo.gl/SPGT2XBhSMqc7sFU9',
  },
  hours: [
    { day: 'Monday', open: '04:00 pm', close: '09:00 pm' },
    { day: 'Tuesday', open: '04:00 pm', close: '10:00 pm' },
    { day: 'Wednesday', open: '04:00 pm', close: '10:00 pm' },
    { day: 'Thursday', open: '04:00 am', close: '02:00 am' },
    { day: 'Friday', open: '11:00 am', close: '12:00 am' },
    { day: 'Saturday', open: '12:00 pm', close: '02:00 am' },
    { day: 'Sunday', open: '12:00 pm', close: '09:00 pm' },
  ],
  entertainment: {
    title: 'Entertainment',
    description: 'Live music, dancing, and entertainment at Eclipse di Luna Dunwoody.',
    items: [
      { day: 'Thursday', type: 'Live Music', time: '9:00 PM' },
      { day: 'Friday', type: 'Live Music', time: '9:00 PM' },
      { day: 'Saturday', type: 'Live Music & Dancing', time: '9:00 PM' },
    ],
  },
  deals: [
    {
      title: 'Happy Hour',
      description: 'Monday–Friday 4–7pm: discounted tapas and cocktails.',
      day: 'Monday–Friday',
    },
  ],
};
