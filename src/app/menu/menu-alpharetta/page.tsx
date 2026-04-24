import type { Metadata } from 'next';
import { MenuPage } from '@/components/sections/MenuPage';
import { getLocation } from '@/data/locations';
import type { LocationMenu } from '@/types/menu';
import menuJson from '@/data/menus/alpharetta.json';

const location = getLocation('alpharetta');
const menu = menuJson as LocationMenu;

export const metadata: Metadata = {
  title: 'Alpharetta Menu | Eclipse di Luna',
  description: 'Explore our full menu at Eclipse di Luna Alpharetta — Spanish tapas, signature cocktails, wines, beers, brunch and happy hour.',
};

export default function MenuAlpharettaPage() {
  return <MenuPage location={location} menu={menu} />;
}
