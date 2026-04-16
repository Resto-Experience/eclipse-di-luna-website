import type { Location } from '@/types/location';

export const buckhead: Location = {
  slug: 'buckhead',
  name: 'Eclipse di Luna - Buckhead',
  subtitle: 'Miami Circle',
  description:
    'Eclipse di Luna Buckhead on Miami Circle offers an upscale tapas experience in Atlanta\'s premier shopping and dining destination.',
  tagline:
    'In Buckhead, Eclipse di Luna provides a vibrant atmosphere, tapas, and a great wine list for a memorable dining.',
  heroImage: '/images/hero/buckhead.jpg',
  cardImage: '/images/locations/buckhead.jpg',
  contact: {
    phone: '(470) 664-1188',
    email: 'info@eclipsediluna.com',
    cateringEmail: 'catering@eclipsediluna.com',
    cateringPhone: '(470) 664-1188',
    address: '764 Miami Cir NE',
    city: 'Atlanta',
    state: 'GA',
    zip: '30324',
  },
  links: {
    orderOnline: 'https://order.toasttab.com/online/eclipse-di-luna-buckhead-764-miami-circle',
    reservations: 'https://www.opentable.com/r/eclipse-di-luna-buckhead-atlanta',
    delivery: '',
    giftCard: 'https://order.toasttab.com/egiftcards/eclipse-di-luna-buckhead-764-miami-circle',
    menu: '/menu/menu-buckhead',
    googleMaps: 'https://maps.app.goo.gl/j1tcm5X6GpYYMYSx9',
  },
  hours: [
    { day: 'Monday', open: '04:00 pm', close: '09:00 pm' },
    { day: 'Tuesday', open: '04:00 pm', close: '10:00 pm' },
    { day: 'Wednesday', open: '04:00 pm', close: '10:00 pm' },
    { day: 'Thursday', open: '04:00 pm', close: '11:00 pm' },
    { day: 'Friday', open: '11:00 am', close: '12:00 am' },
    { day: 'Saturday', open: '12:00 pm', close: '12:00 am' },
    { day: 'Sunday', open: '12:00 pm', close: '09:00 pm' },
  ],
  entertainment: {
    title: 'Entertainment',
    description: 'Live music and entertainment at Eclipse di Luna Buckhead.',
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
