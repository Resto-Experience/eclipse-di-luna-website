import type { Metadata } from 'next';
import { InnerPageHero } from '@/components/sections/InnerPageHero';
import { MenuGrid } from '@/components/sections/MenuGrid';

export const metadata: Metadata = {
  title: 'Menu | Eclipse di Luna',
  description:
    'Explore our menus across all four Eclipse di Luna locations — Alpharetta, Beltline, Buckhead, and Dunwoody.',
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
