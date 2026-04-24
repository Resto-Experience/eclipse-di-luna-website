import { getAllLocations } from '@/data/locations';

const SITE_URL = 'https://www.eclipsediluna.com';

export function OrganizationSchema() {
  const locations = getAllLocations();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${SITE_URL}/#restaurant`,
    name: 'Eclipse di Luna',
    url: SITE_URL,
    logo: `${SITE_URL}/images/hero/logo-beige.png`,
    image: `${SITE_URL}/images/hero/logo-white.png`,
    description:
      'Celebrating Latin & Spanish cuisine in Atlanta — tapas, cocktails, and live entertainment across 4 locations.',
    servesCuisine: ['Spanish', 'Latin American', 'Tapas'],
    priceRange: '$$',
    sameAs: ['https://www.instagram.com/eclipsediluna/'],
    department: locations.map((loc) => ({
      '@type': 'Restaurant',
      '@id': `${SITE_URL}/location-${loc.slug}`,
      name: `Eclipse di Luna ${loc.slug.charAt(0).toUpperCase() + loc.slug.slice(1)}`,
      url: `${SITE_URL}/location-${loc.slug}`,
      telephone: loc.contact.phone,
      email: loc.contact.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: loc.contact.address,
        addressLocality: loc.contact.city,
        addressRegion: loc.contact.state,
        postalCode: loc.contact.zip,
        addressCountry: 'US',
      },
      openingHoursSpecification: loc.hours.map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.day,
        opens: h.open,
        closes: h.close,
      })),
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocationSchema({ slug }: { slug: string }) {
  const loc = getAllLocations().find((l) => l.slug === slug);
  if (!loc) return null;
  const name = `Eclipse di Luna ${slug.charAt(0).toUpperCase() + slug.slice(1)}`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${SITE_URL}/location-${slug}#restaurant`,
    name,
    url: `${SITE_URL}/location-${slug}`,
    image: `${SITE_URL}${loc.heroImage}`,
    servesCuisine: ['Spanish', 'Latin American', 'Tapas'],
    priceRange: '$$',
    telephone: loc.contact.phone,
    email: loc.contact.email,
    hasMenu: `${SITE_URL}/menu/menu-${slug}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: loc.contact.address,
      addressLocality: loc.contact.city,
      addressRegion: loc.contact.state,
      postalCode: loc.contact.zip,
      addressCountry: 'US',
    },
    openingHoursSpecification: loc.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.day,
      opens: h.open,
      closes: h.close,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
