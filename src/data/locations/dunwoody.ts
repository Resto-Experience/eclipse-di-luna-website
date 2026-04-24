import type { Location } from '@/types/location';

export const dunwoody: Location = {
  slug: 'dunwoody',
  name: 'Eclipse di Luna - Dunwoody',
  subtitle: 'Ashford Dunwoody',
  description:
    "Located in Park Place, Eclipse di Luna Dunwoody blends high-energy dining with one of the most versatile event spaces in the Eclipse family. Known for its festive, artsy atmosphere and eclectic tapas menu, this location is designed for connection, celebration, and unforgettable nights out.\n\nDunwoody features multiple event spaces, including a cozy Wine Room for intimate gatherings and a picturesque outdoor patio surrounded by greenery. The restaurant can accommodate celebrations of all sizes, from private dinners to full buy outs hosting up to 250 guests, making it a sought-after destination for weddings, milestone parties, and corporate events.\n\nGuests come for the tapas and cocktails, but stay for the music, ambiance, and social energy that defines the Eclipse experience.",
  tagline:
    'High-energy dining and versatile event spaces — up to 250 guests. Where tapas, cocktails and Latin music come together.',
  heroImage: '/images/locations/dunwoody/hero-bg.avif',
  cardImage: '/images/locations/dunwoody.avif',
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
    { day: 'Thursday', open: '04:00 pm', close: '02:00 am' },
    { day: 'Friday', open: '11:00 am', close: '12:00 am' },
    { day: 'Saturday', open: '12:00 pm', close: '02:00 am' },
    { day: 'Sunday', open: '12:00 pm', close: '09:00 pm' },
  ],
  entertainment: {
    title: 'Entertainment',
    description: 'Live Latin music, DJs, and dancing at Eclipse di Luna Dunwoody.',
    items: [
      {
        day: 'Monday to Friday',
        type: 'Live Music',
        time: '05:30 PM - 08:30 pm',
        image: '/images/locations/dunwoody/live-music.avif',
      },
      {
        day: 'Every Thursday',
        type: 'Latin Thursday Nights',
        time: 'DJ set: 10:00 PM – 2:00 AM',
        image: '/images/locations/dunwoody/latin-thursday.avif',
      },
      {
        day: 'Every Saturday',
        type: 'Latin Saturday Nights',
        time: 'DJ set: 10:00 PM – 2:00 AM',
        image: '/images/locations/dunwoody/latin-saturday.avif',
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
