import { describe, it, expect } from 'vitest';
import { getAllLocations, getLocation, getLocationSlugs, LOCATIONS } from './index';

describe('getAllLocations', () => {
  it('returns exactly 4 locations', () => {
    expect(getAllLocations()).toHaveLength(4);
  });
});

describe('getLocationSlugs', () => {
  it('returns the 4 expected slugs in order', () => {
    expect(getLocationSlugs()).toEqual(['alpharetta', 'beltline', 'buckhead', 'dunwoody']);
  });
});

describe('getLocation', () => {
  it('returns Alpharetta with correct phone', () => {
    const loc = getLocation('alpharetta');
    expect(loc.contact.phone).toBe('(470) 672-4822');
  });

  it('returns Beltline with correct address', () => {
    const loc = getLocation('beltline');
    expect(loc.contact.address).toBe('661 Auburn Ave NE STE 220');
  });

  it('returns Buckhead with correct address', () => {
    const loc = getLocation('buckhead');
    expect(loc.contact.address).toBe('764 Miami Cir NE');
  });

  it('returns Dunwoody with correct phone', () => {
    const loc = getLocation('dunwoody');
    expect(loc.contact.phone).toBe('(470) 712-5680');
  });
});

describe('LOCATIONS record', () => {
  it('every location has non-empty orderOnline', () => {
    getAllLocations().forEach((loc) => {
      expect(loc.links.orderOnline).toBeTruthy();
    });
  });

  it('every location has non-empty reservations', () => {
    getAllLocations().forEach((loc) => {
      expect(loc.links.reservations).toBeTruthy();
    });
  });

  it('every location has non-empty giftCard', () => {
    getAllLocations().forEach((loc) => {
      expect(loc.links.giftCard).toBeTruthy();
    });
  });

  it('every location has non-empty googleMaps', () => {
    getAllLocations().forEach((loc) => {
      expect(loc.links.googleMaps).toBeTruthy();
    });
  });

  it('every location has at least 5 hours entries', () => {
    getAllLocations().forEach((loc) => {
      expect(loc.hours.length).toBeGreaterThanOrEqual(5);
    });
  });

  it('every location has non-empty cateringEmail', () => {
    getAllLocations().forEach((loc) => {
      expect(loc.contact.cateringEmail).toBeTruthy();
    });
  });

  it('Alpharetta Toast Tab URL matches spec', () => {
    const loc = getLocation('alpharetta');
    expect(loc.links.orderOnline).toBe('https://order.toasttab.com/online/eclipsehalcyon');
  });

  it('Alpharetta OpenTable URL matches spec', () => {
    const loc = getLocation('alpharetta');
    expect(loc.links.reservations).toBe('https://www.opentable.com/r/eclipse-di-luna-halcyon-alpharetta');
  });

  it('Alpharetta gift card URL matches spec', () => {
    const loc = getLocation('alpharetta');
    expect(loc.links.giftCard).toBe('https://order.toasttab.com/egiftcards/eclipsehalcyon');
  });

  it('Alpharetta Google Maps URL matches spec', () => {
    const loc = getLocation('alpharetta');
    expect(loc.links.googleMaps).toBe('https://maps.app.goo.gl/L8XXEnFyiuuPY8zq7');
  });

  it('LOCATIONS is a record with all 4 slugs', () => {
    expect(Object.keys(LOCATIONS)).toEqual(['alpharetta', 'beltline', 'buckhead', 'dunwoody']);
  });
});
