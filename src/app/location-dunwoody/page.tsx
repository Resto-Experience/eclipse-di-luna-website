import type { Metadata } from 'next';
import { LocationPage } from '@/components/sections/LocationPage';
import { LocationSchema } from '@/components/layout/StructuredData';
import { getLocation } from '@/data/locations';

const location = getLocation('dunwoody');

const NEIGHBORHOOD = 'Dunwoody';
const TITLE = `${NEIGHBORHOOD} — Eclipse di Luna Restaurant & Tapas Bar`;
const DESCRIPTION = `Visit Eclipse di Luna ${NEIGHBORHOOD} for authentic Latin & Spanish tapas, handcrafted cocktails, and live entertainment.`;
const URL_PATH = '/location-dunwoody';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL_PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL_PATH,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function LocationDunwoodyPage() {
  return (
    <>
      <LocationSchema slug="dunwoody" />
      <LocationPage location={location} />
    </>
  );
}
