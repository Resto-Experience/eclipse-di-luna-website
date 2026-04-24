import type { Metadata } from 'next';
import { MenuPage } from '@/components/sections/MenuPage';
import { getLocation } from '@/data/locations';
import type { LocationMenu } from '@/types/menu';
import menuJson from '@/data/menus/beltline.json';

const location = getLocation('beltline');
const menu = menuJson as LocationMenu;

export const metadata: Metadata = {
  title: 'Beltline Menu | Eclipse di Luna',
  description: 'Explore our full menu at Eclipse di Luna Beltline — Spanish tapas, signature cocktails, wines, beers, and happy hour.',
};

export default function MenuBeltlinePage() {
  return <MenuPage location={location} menu={menu} />;
}
