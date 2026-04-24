import type { Metadata } from 'next';
import { MenuPage } from '@/components/sections/MenuPage';
import { getLocation } from '@/data/locations';
import type { LocationMenu } from '@/types/menu';
import menuJson from '@/data/menus/alpharetta.json';

const location = getLocation('alpharetta');
const menu = menuJson as LocationMenu;

const TITLE = 'Alpharetta Tapas & Cocktails Menu';
const DESCRIPTION =
  "Explore Eclipse di Luna's Alpharetta menu featuring a variety of tapas, brunch options, and handcrafted cocktails. Perfect for any occasion.";
const URL_PATH = '/menu/menu-alpharetta';

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

export default function MenuAlpharettaPage() {
  return <MenuPage location={location} menu={menu} />;
}
