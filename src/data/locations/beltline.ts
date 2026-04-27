import type { Location } from '@/types/location';

export const beltline: Location = {
  slug: 'beltline',
  name: 'Eclipse di Luna - Beltline',
  subtitle: 'Old Fourth Ward',
  description:
    "The newest Eclipse di Luna location brings a moodier, more intimate take on the brand to the Atlanta Beltline. Inspired by the natural textures and warm tones of neighborhood tapas bars in Barcelona and Madrid, the Beltline space trades bright colors for woods, metals, and earthy tones, creating an atmosphere that feels authentic and transportive.\n\nDesigned to feel like stumbling into a hidden family-owned tapas bar in Spain, this location is cozy, urban, and effortlessly social. DJs every weekend, shareable plates, handcrafted cocktails, and the energy of the Beltline make it a perfect stop for drinks, tapas, and late-night gatherings.\n\nEach Eclipse has its own personality, and the Beltline is the most intimate, moody, and city-driven expression of the brand.",
  tagline:
    'The most intimate, moody, and city-driven Eclipse — tapas, cocktails, and DJs on the Atlanta Beltline.',
  heroImage: '/images/locations/beltline/hero-bg.avif',
  cardImage: '/images/locations/beltline.avif',
  contact: {
    phone: '(463) 252-3572',
    email: 'beltline@eclipsediluna.com',
    cateringEmail: 'beltline@eclipsediluna.com',
    cateringPhone: '(463) 252-3572',
    address: '661 Auburn AVE NE STE 220',
    city: 'Atlanta',
    state: 'GA',
    zip: '30312',
  },
  links: {
    orderOnline: 'https://www.toasttab.com/local/order/eclipse-di-luna-beltline',
    reservations: 'https://www.opentable.com/r/eclipse-di-luna-krog-atlanta',
    delivery: 'https://www.ubereats.com/store/eclipse-di-luna-beltline/MkTu5FT1UD-OEiSPK7q2kw',
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
    description: 'DJ sets every weekend at Eclipse di Luna Beltline.',
    items: [
      {
        day: 'Friday & Saturday',
        type: 'Latin Nights (DJ Sets)',
        time: '9:30 PM – 12:30 AM',
        image: '/images/locations/beltline/latin-nights.avif',
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
