import type { Location } from '@/types/location';

export const alpharetta: Location = {
  slug: 'alpharetta',
  name: 'Eclipse di Luna - Alpharetta',
  subtitle: 'Halcyon',
  description:
    'Eclipse di Luna Alpharetta at Halcyon offers the full Eclipse experience — Spanish tapas, craft cocktails, and live entertainment in a vibrant setting.',
  tagline:
    'In the heart of Alpharetta, Eclipse di Luna offers spectacular tapas, a lively atmosphere, and an exciting wine list!',
  heroImage: '/images/hero/alpharetta.jpg',
  cardImage: '/images/locations/alpharetta.jpg',
  contact: {
    phone: '(470) 672-4822',
    email: 'info@eclipsehalcyon.com',
    cateringEmail: 'catering@eclipsehalcyon.com',
    cateringPhone: '(470) 672-4822',
    address: '6710 Town Square 120',
    city: 'Alpharetta',
    state: 'GA',
    zip: '30005',
  },
  links: {
    orderOnline: 'https://order.toasttab.com/online/eclipsehalcyon',
    reservations: 'https://www.opentable.com/r/eclipse-di-luna-halcyon-alpharetta',
    delivery: '',
    giftCard: 'https://order.toasttab.com/egiftcards/eclipsehalcyon',
    menu: '/menu/menu-alpharetta',
    googleMaps: 'https://maps.app.goo.gl/L8XXEnFyiuuPY8zq7',
  },
  hours: [
    { day: 'Monday', open: '04:00 pm', close: '09:00 pm' },
    { day: 'Tuesday', open: '04:00 pm', close: '10:00 pm' },
    { day: 'Wednesday', open: '04:00 pm', close: '10:00 pm' },
    { day: 'Thursday', open: '04:00 pm', close: '10:00 pm' },
    { day: 'Friday', open: '11:00 am', close: '12:00 am' },
    { day: 'Saturday', open: '11:00 am', close: '12:00 am' },
    { day: 'Sunday', open: '11:00 am', close: '09:00 pm' },
  ],
  entertainment: {
    title: 'Entertainment',
    description: 'Live music and entertainment at Eclipse di Luna Alpharetta.',
    items: [
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
