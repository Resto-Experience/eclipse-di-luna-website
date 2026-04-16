import { describe, it, expect } from 'vitest';
import type {
  LocationSlug,
  DayOfWeek,
  HoursEntry,
  LocationContact,
  LocationLinks,
  EntertainmentItem,
  EntertainmentSchedule,
  Deal,
  Location,
} from './location';

describe('Location types', () => {
  it('accepts a valid LocationSlug', () => {
    const slug: LocationSlug = 'alpharetta';
    expect(['alpharetta', 'beltline', 'buckhead', 'dunwoody']).toContain(slug);
  });

  it('accepts all valid DayOfWeek values', () => {
    const days: DayOfWeek[] = [
      'Monday', 'Tuesday', 'Wednesday', 'Thursday',
      'Friday', 'Saturday', 'Sunday',
    ];
    expect(days).toHaveLength(7);
  });

  it('constructs a valid HoursEntry', () => {
    const entry: HoursEntry = { day: 'Monday', open: '04:00 pm', close: '09:00 pm' };
    expect(entry.day).toBe('Monday');
    expect(entry.open).toBe('04:00 pm');
    expect(entry.close).toBe('09:00 pm');
  });

  it('constructs a valid LocationContact', () => {
    const contact: LocationContact = {
      phone: '(470) 672-4822',
      email: 'info@eclipsehalcyon.com',
      cateringEmail: 'catering@eclipsehalcyon.com',
      cateringPhone: '(470) 672-4822',
      address: '6710 Town Square 120',
      city: 'Alpharetta',
      state: 'GA',
      zip: '30005',
    };
    expect(contact.phone).toBe('(470) 672-4822');
    expect(contact.cateringEmail).toBeTruthy();
  });

  it('constructs a valid LocationLinks', () => {
    const links: LocationLinks = {
      orderOnline: 'https://order.toasttab.com/online/eclipsehalcyon',
      reservations: 'https://www.opentable.com/r/eclipse-di-luna-halcyon-alpharetta',
      delivery: '',
      giftCard: 'https://order.toasttab.com/egiftcards/eclipsehalcyon',
      menu: '/menu/menu-alpharetta',
      googleMaps: 'https://maps.app.goo.gl/L8XXEnFyiuuPY8zq7',
    };
    expect(links.orderOnline).toBeTruthy();
    expect(links.giftCard).toBeTruthy();
  });

  it('constructs a valid EntertainmentItem', () => {
    const item: EntertainmentItem = { day: 'Friday', type: 'Live Music', time: '8:00 PM' };
    expect(item.day).toBe('Friday');
  });

  it('constructs a valid EntertainmentSchedule', () => {
    const schedule: EntertainmentSchedule = {
      title: 'Entertainment',
      description: 'Live music and more',
      items: [{ day: 'Friday', type: 'Live Music', time: '8:00 PM' }],
    };
    expect(schedule.items).toHaveLength(1);
  });

  it('constructs a valid Deal', () => {
    const deal: Deal = { title: 'Happy Hour', description: '$5 tapas' };
    expect(deal.title).toBe('Happy Hour');
    expect(deal.day).toBeUndefined();
    expect(deal.image).toBeUndefined();
  });

  it('constructs a valid full Location object', () => {
    const location: Location = {
      slug: 'alpharetta',
      name: 'Eclipse di Luna - Alpharetta',
      subtitle: 'Halcyon',
      description: 'A great spot',
      tagline: 'In the heart of Alpharetta',
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
      hours: [{ day: 'Monday', open: '04:00 pm', close: '09:00 pm' }],
      entertainment: { title: 'Entertainment', description: 'Live music', items: [] },
      deals: [{ title: 'Happy Hour', description: '$5 tapas' }],
    };
    expect(location.slug).toBe('alpharetta');
    expect(location.contact.phone).toBe('(470) 672-4822');
  });
});
