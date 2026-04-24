import type { Metadata } from 'next';
import { InnerPageHero } from '@/components/sections/InnerPageHero';
import { MenuGrid } from '@/components/sections/MenuGrid';

const TITLE = "Menu — Explore Eclipse di Luna's Tapas, Cocktails & Wine";
const DESCRIPTION =
  'Browse menus for all 4 Atlanta Eclipse di Luna locations — tapas, wines, cocktails, brunch & happy hour.';
const URL_PATH = '/menu';

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

export default function MenuPage() {
  return (
    <>
      <InnerPageHero
        title="Menu"
        subtitle="RESTAURANT & TAPAS BAR"
        icon="/images/menu/hero-icon.svg"
        bgDesktop="/images/menu/hero-bg.webp"
        bgMobile="/images/menu/hero-bg-mobile.webp"
      />
      <MenuGrid />
    </>
  );
}
