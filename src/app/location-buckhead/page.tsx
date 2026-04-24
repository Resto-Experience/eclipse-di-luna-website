import type { Metadata } from 'next';
import { LocationPage } from '@/components/sections/LocationPage';
import { getLocation } from '@/data/locations';

const location = getLocation('buckhead');

export const metadata: Metadata = {
  title: `${location.name} | Eclipse di Luna`,
  description: location.description,
};

export default function LocationBuckheadPage() {
  return <LocationPage location={location} />;
}
