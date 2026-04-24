import type { Metadata } from 'next';
import { MenuPage } from '@/components/sections/MenuPage';
import { getLocation } from '@/data/locations';
import type { LocationMenu } from '@/types/menu';
import menuJson from '@/data/menus/dunwoody.json';

const location = getLocation('dunwoody');
const menu = menuJson as LocationMenu;

export const metadata: Metadata = {
  title: 'Dunwoody Menu | Eclipse di Luna',
  description: 'Explore our full menu at Eclipse di Luna Dunwoody — Spanish tapas, signature cocktails, wines, beers, brunch and happy hour.',
};

export default function MenuDunwoodyPage() {
  return <MenuPage location={location} menu={menu} />;
}
