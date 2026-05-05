import type { Metadata } from 'next';
import { MenuPage } from '@/components/sections/MenuPage';
import { getLocation } from '@/data/locations';
import { getLocationMenu } from '@/lib/menu-db';

const location = getLocation('alpharetta');

export const dynamic = 'force-dynamic';

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

export default async function MenuAlpharettaPage() {
  const menu = await getLocationMenu('alpharetta');
  return <MenuPage location={location} menu={menu} />;
}
