import type { Location } from '@/types/location';

export const alpharetta: Location = {
  slug: 'alpharetta',
  name: 'Eclipse di Luna - Alpharetta',
  subtitle: 'Halcyon',
  description:
    "Situated in Halcyon, the Big Creek Greenway-connected mixed-use village in Forsyth County, Eclipse di Luna Alpharetta is part of one of metro Atlanta's most vibrant social destinations. Halcyon is where guests gather to shop, dine, relax, and connect with nature, and Eclipse sits at the center of that lifestyle.\n\nThis location offers a modern, open-air atmosphere with expansive patio seating, a pergola perfect for gathering, and space to enjoy both dining and nightlife outdoors. The setting feels polished yet relaxed, ideal for groups, celebrations, and evenings that stretch long after dinner.\n\nSpanish tapas, exotic cocktails, and live Latin entertainment meet fresh air and community energy, creating a destination that feels both social and scenic.",
  tagline:
    'In the heart of Alpharetta, Eclipse di Luna offers spectacular tapas, a lively atmosphere, and an exciting wine list!',
  heroImage: '/images/hero/alpharetta.avif',
  cardImage: '/images/locations/alpharetta.avif',
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
    delivery:
      'https://www.ubereats.com/store/eclipse-di-luna-alpharetta/zK1R5Pm8WfqOgd3gU5mHLA',
    giftCard: 'https://order.toasttab.com/egiftcards/eclipsehalcyon',
    menu: '/menu/menu-alpharetta',
    googleMaps: 'https://maps.app.goo.gl/L8XXEnFyiuuPY8zq7',
  },
  hours: [
    { day: 'Monday', open: '04:00 pm', close: '09:00 pm' },
    { day: 'Tuesday', open: '11:00 am', close: '10:00 pm' },
    { day: 'Wednesday', open: '11:00 am', close: '10:00 pm' },
    { day: 'Thursday', open: '11:00 am', close: '10:00 pm' },
    { day: 'Friday', open: '11:00 am', close: '12:00 am' },
    { day: 'Saturday', open: '11:00 am', close: '12:00 am' },
    { day: 'Sunday', open: '11:00 am', close: '09:00 pm' },
  ],
  entertainment: {
    title: 'Entertainment',
    description: 'Live music and entertainment at Eclipse di Luna Alpharetta.',
    items: [
      {
        day: 'Monday to Friday',
        type: 'Live Music',
        time: '05:30 pm - 08:30 pm',
        image: '/images/locations/alpharetta/live-music.avif',
      },
      {
        day: 'Every Saturday',
        type: 'Latin Saturday Nights',
        time: 'DJ set: 10:00 PM – 2:00 AM',
        image: '/images/locations/alpharetta/latin-saturday.avif',
      },
    ],
  },
  deals: [
    {
      title: 'Happy Hour',
      description: 'Monday – Thursday, 04:00pm – 06:00pm',
      day: 'Monday – Thursday',
      image: '/images/locations/alpharetta/happy-hour.avif',
    },
  ],
};
