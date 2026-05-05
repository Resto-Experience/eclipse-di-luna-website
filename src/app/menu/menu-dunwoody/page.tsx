import type { Metadata } from 'next';
import { MenuPage } from '@/components/sections/MenuPage';
import { getLocation } from '@/data/locations';
import { getLocationMenu } from '@/lib/menu-db';

const location = getLocation('dunwoody');

export const dynamic = 'force-dynamic';

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

export default async function MenuDunwoodyPage() {
  const menu = await getLocationMenu('dunwoody');
  return <MenuPage location={location} menu={menu} />;
}
