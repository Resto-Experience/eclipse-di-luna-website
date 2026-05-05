import type { Metadata } from 'next';
import { MenuPage } from '@/components/sections/MenuPage';
import { getLocation } from '@/data/locations';
import { getLocationMenu } from '@/lib/menu-db';

const location = getLocation('beltline');

export const dynamic = 'force-dynamic';

const TITLE = 'Beltline Tapas & Cocktails Menu';
const DESCRIPTION =
  "Explore Eclipse di Luna's Beltline menu featuring Spanish tapas, signature cocktails, wines, and happy hour specials.";
const URL_PATH = '/menu/menu-beltline';

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

export default async function MenuBeltlinePage() {
  const menu = await getLocationMenu('beltline');
  return <MenuPage location={location} menu={menu} />;
}
