import type { Location } from '@/types/location';

export const beltline: Location = {
  slug: 'beltline',
  name: 'Eclipse di Luna - Beltline',
  subtitle: 'Krog Street Market',
  description:
    'Eclipse di Luna at the Beltline brings the vibrant tapas experience to Atlanta\'s dynamic Krog Street Market area.',
  tagline:
    'In the vibrant Beltline, Eclipse di Luna offers sizzling tapas, a lively vibe, and a wine selection to delight your taste buds!',
  heroImage: '/images/hero/beltline.jpg',
  cardImage: '/images/locations/beltline.jpg',
  contact: {
    phone: '(463) 252-3572',
    email: 'beltline@eclipsediluna.com',
    cateringEmail: 'catering@eclipsediluna.com',
    cateringPhone: '(463) 252-3572',
    address: '661 Auburn Ave NE STE 220',
    city: 'Atlanta',
    state: 'GA',
    zip: '30312',
  },
  links: {
    orderOnline: 'https://www.toasttab.com/local/order/eclipse-di-luna-beltline',
    reservations: 'https://www.opentable.com/r/eclipse-di-luna-krog-atlanta',
    delivery: '',
    giftCard: 'https://order.toasttab.com/egiftcards/eclipse-di-luna-beltline',
    menu: '/menu/menu-beltline',
    googleMaps: 'https://maps.app.goo.gl/3svo5EHB6MChbmEc6',
  },
  hours: [
    { day: 'Monday', open: '04:00 pm', close: '10:00 pm' },
    { day: 'Tuesday', open: '04:00 pm', close: '10:00 pm' },
    { day: 'Wednesday', open: '04:00 pm', close: '10:00 pm' },
    { day: 'Thursday', open: '04:00 pm', close: '11:00 pm' },
    { day: 'Friday', open: '11:00 am', close: '12:30 am' },
    { day: 'Saturday', open: '11:00 am', close: '12:30 am' },
    { day: 'Sunday', open: '11:00 am', close: '10:00 pm' },
  ],
  entertainment: {
    title: 'Entertainment',
    description: 'Live music and entertainment at Eclipse di Luna Beltline.',
    items: [
      { day: 'Thursday', type: 'Live Music', time: '8:00 PM' },
      { day: 'Friday', type: 'Live Music', time: '8:00 PM' },
      { day: 'Saturday', type: 'Live Music', time: '8:00 PM' },
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
