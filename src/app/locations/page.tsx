import type { Metadata } from 'next';
import { InnerPageHero } from '@/components/sections/InnerPageHero';
import { LocationsGrid } from '@/components/sections/LocationsGrid';

const TITLE = 'Our Locations';
const DESCRIPTION =
  'Find an Eclipse di Luna near you — 4 vibrant tapas bars across Atlanta: Alpharetta, Beltline, Buckhead, and Dunwoody.';
const URL_PATH = '/locations';

export const metadata: Metadata = {
  title: TITLE,
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

export default function LocationsPage() {
  return (
    <>
      <InnerPageHero
        title="Our Locations"
        subtitle="RESTAURANT & TAPAS BAR"
        icon="/images/menu/hero-icon.svg"
        bgDesktop="/images/hero/beltline.avif"
        bgMobile="/images/private-party/hero-bg-mobile.webp"
      />
      <LocationsGrid />
    </>
  );
}
