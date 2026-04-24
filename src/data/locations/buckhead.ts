import type { Location } from '@/types/location';

export const buckhead: Location = {
  slug: 'buckhead',
  name: 'Eclipse di Luna - Buckhead',
  subtitle: 'Miami Circle',
  description:
    "Opened in 1997, Eclipse di Luna Buckhead is the original home of Eclipse and the restaurant that introduced Atlanta to the tapas experience. What began as a bold, playful concept quickly became a city landmark, known for its whimsical décor, artsy personality, and infectious energy.\n\nThis Miami Circle location remains the heart of the brand — festive, colorful, and unapologetically fun. Live Latin music seven nights a week, salsa dancing, handcrafted cocktails, and shareable Spanish tapas create an atmosphere that feels more like a celebration than a dinner reservation. With free parking and a cozy, welcoming vibe, Buckhead continues to be a favorite gathering place nearly three decades later.\n\nIt's the Eclipse where it all started — and the spirit is still alive every night.",
  tagline:
    'The original Eclipse since 1997 — tapas, live Latin music seven nights a week, and a festive, colorful atmosphere.',
  heroImage: '/images/locations/buckhead/hero-bg.avif',
  cardImage: '/images/locations/buckhead.avif',
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
    description: 'Live Latin music and entertainment at Eclipse di Luna Buckhead.',
    items: [
      {
        day: 'Monday to Friday',
        type: 'Live Music',
        time: '05:30 pm - 08:30 pm',
        image: '/images/locations/buckhead/live-music.avif',
      },
      {
        day: '1st & 3rd Saturday of the month',
        type: 'Latin Saturday Nights',
        time: 'DJ set: 10:00 PM – 2:00 AM',
        image: '/images/locations/buckhead/latin-saturday.avif',
      },
    ],
  },
  deals: [
    {
      title: 'Happy Hour',
      description: 'Monday – Thursday, 04:00pm – 06:00pm',
      day: 'Monday – Thursday',
      image: '/images/locations/shared/happy-hour.avif',
    },
  ],
};
