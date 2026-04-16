import type { Location, LocationSlug } from '@/types/location';
import { alpharetta } from './alpharetta';
import { beltline } from './beltline';
import { buckhead } from './buckhead';
import { dunwoody } from './dunwoody';

export const LOCATIONS: Record<LocationSlug, Location> = {
  alpharetta,
  beltline,
  buckhead,
  dunwoody,
};

export function getLocation(slug: LocationSlug): Location {
  return LOCATIONS[slug];
}

export function getAllLocations(): Location[] {
  return [alpharetta, beltline, buckhead, dunwoody];
}

export function getLocationSlugs(): LocationSlug[] {
  return ['alpharetta', 'beltline', 'buckhead', 'dunwoody'];
}
