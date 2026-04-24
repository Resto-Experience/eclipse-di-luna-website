import type { Metadata } from 'next';
import { MenuPage } from '@/components/sections/MenuPage';
import { getLocation } from '@/data/locations';
import type { LocationMenu } from '@/types/menu';
import menuJson from '@/data/menus/buckhead.json';

const location = getLocation('buckhead');
const menu = menuJson as LocationMenu;

export const metadata: Metadata = {
  title: 'Buckhead Menu | Eclipse di Luna',
  description: 'Explore our full menu at Eclipse di Luna Buckhead — Spanish tapas, signature cocktails, wines, beers, brunch and happy hour.',
};

export default function MenuBuckheadPage() {
  return <MenuPage location={location} menu={menu} />;
}
