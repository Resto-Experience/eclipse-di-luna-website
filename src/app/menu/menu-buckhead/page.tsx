import type { Metadata } from 'next';
import { MenuPage } from '@/components/sections/MenuPage';
import { getLocation } from '@/data/locations';
import type { LocationMenu } from '@/types/menu';
import menuJson from '@/data/menus/buckhead.json';

const location = getLocation('buckhead');
const menu = menuJson as LocationMenu;

const TITLE = 'Buckhead Tapas & Cocktails Menu';
const DESCRIPTION =
  "Explore Eclipse di Luna's Buckhead menu — Spanish tapas, signature cocktails, brunch and happy hour.";
const URL_PATH = '/menu/menu-buckhead';

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

export default function MenuBuckheadPage() {
  return <MenuPage location={location} menu={menu} />;
}
