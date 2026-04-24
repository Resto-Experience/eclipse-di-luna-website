import type { Metadata } from 'next';
import { MenuPage } from '@/components/sections/MenuPage';
import { getLocation } from '@/data/locations';
import type { LocationMenu } from '@/types/menu';
import menuJson from '@/data/menus/dunwoody.json';

const location = getLocation('dunwoody');
const menu = menuJson as LocationMenu;

const TITLE = 'Dunwoody Tapas & Cocktails Menu';
const DESCRIPTION =
  "Explore Eclipse di Luna's Dunwoody menu — Spanish tapas, handcrafted cocktails, brunch and happy hour.";
const URL_PATH = '/menu/menu-dunwoody';

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

export default function MenuDunwoodyPage() {
  return <MenuPage location={location} menu={menu} />;
}
