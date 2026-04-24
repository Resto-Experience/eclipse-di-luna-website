import type { Metadata } from 'next';
import { InnerPageHero } from '@/components/sections/InnerPageHero';
import { LocationsGrid } from '@/components/sections/LocationsGrid';

export const metadata: Metadata = {
  title: 'Our Locations | Eclipse di Luna',
  description:
    'Eclipse di Luna Restaurant & Tapas Bar — four locations across Atlanta. Select your preferred destination: Alpharetta, Beltline, Buckhead, or Dunwoody.',
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
