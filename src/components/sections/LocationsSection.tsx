import Image from 'next/image';
import { getAllLocations } from '@/data/locations';

const FONT_BODY = 'var(--font-nunito-sans), "Nunito Sans", sans-serif';
const FONT_HEADING = '"Swarsh Daisy", var(--font-display), Georgia, serif';

const LOCATION_DESCRIPTIONS: Record<string, string> = {
  alpharetta: 'In the heart of Alpharetta, Eclipse di Luna offers spectacular tapas, a lively atmosphere, and an exciting wine list!',
  beltline: 'In the vibrant Beltline, Eclipse di Luna offers sizzling tapas, a lively vibe, and a wine selection to delight your taste buds!',
  buckhead: 'In Buckhead, Eclipse di Luna provides a vibrant atmosphere, tapas, and a great wine list for a memorable dining.',
  dunwoody: 'Eclipse di Luna in Dunwoody is a vibrant fiesta! Immerse in Latin culture with music, dance, and delicious cuisine!',
};

const LOCATION_ADDRESSES: Record<string, { text: string; href: string }> = {
  alpharetta: { text: '6710 Town Square 120. Alpharetta, GA. 30005', href: 'https://maps.app.goo.gl/L8XXEnFyiuuPY8zq7' },
  beltline: { text: '661 Auburn Ave NE, Atlanta GA 30312', href: 'https://maps.app.goo.gl/3svo5EHB6MChbmEc6' },
  buckhead: { text: '764 Miami Cir NE, Atlanta, GA 30324', href: 'https://maps.app.goo.gl/j1tcm5X6GpYYMYSx9' },
  dunwoody: { text: '4505 Ashford Dunwoody Road, Atlanta, GA 30346', href: 'https://maps.app.goo.gl/SPGT2XBhSMqc7sFU9' },
};

export function LocationsSection() {
  const locations = getAllLocations();

  return (
    <section
      id="locations"
      className="relative py-[80px]"
      style={{
        backgroundImage: 'url(/images/textures/locations-bg.avif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-9">
        {/* Heading group */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          {/* Moon icon */}
          <Image
            src="/images/icons/moon.svg"
            alt=""
            width={86}
            height={87}
            className="w-[60px] h-auto"
          />
          {/* Pill */}
          <Image
            src="/images/locations/our-locations-pill.svg"
            alt="Our Locations"
            width={252}
            height={54}
            className="w-[200px] h-auto"
          />
          {/* Heading */}
          <h2
            className="leading-[1.05]"
            style={{
              fontFamily: FONT_HEADING,
              fontSize: 'clamp(40px, 5vw, 64px)',
              color: '#201814',
              fontWeight: 400,
            }}
          >
            Explore Our <br />Vibrant Locations
          </h2>
          {/* Subtitle */}
          <p
            className="max-w-[600px]"
            style={{
              fontFamily: FONT_BODY,
              fontSize: '24px',
              color: '#201814',
              fontWeight: 400,
            }}
          >
            Experience the essence of Latin & Spanish flavors across our unique spaces
          </p>
        </div>

        {/* Location cards — full width per row */}
        <div className="flex flex-col gap-12">
          {locations.map((loc) => {
            const desc = LOCATION_DESCRIPTIONS[loc.slug];
            const addr = LOCATION_ADDRESSES[loc.slug];
            return (
              <div key={loc.slug} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Image */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src={`/images/locations/${loc.slug}.avif`}
                    alt={`Eclipse di Luna ${loc.slug}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col gap-4">
                  <h3
                    style={{
                      fontFamily: FONT_HEADING,
                      fontSize: 'clamp(32px, 4vw, 48px)',
                      color: '#201814',
                      fontWeight: 400,
                      lineHeight: 1.1,
                    }}
                  >
                    {loc.slug.charAt(0).toUpperCase() + loc.slug.slice(1)}
                  </h3>

                  <p
                    className="max-w-[500px]"
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: '20px',
                      color: '#201814',
                      lineHeight: 1.4,
                    }}
                  >
                    {desc}
                  </p>

                  {/* Link pills */}
                  <div className="flex flex-wrap gap-2 mt-1">
                    {[
                      { label: 'Order Online', href: `/location-${loc.slug}/#Order` },
                      { label: 'Entertainment', href: `/location-${loc.slug}/#Entertainment` },
                      { label: 'Deals', href: `/location-${loc.slug}/#Deals` },
                      { label: 'Menu', href: `/menu/menu-${loc.slug}` },
                    ].map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="px-4 py-1.5 rounded-full text-sm font-medium border border-[#201814]/30 text-[#201814] hover:bg-[#201814] hover:text-white transition-colors"
                        style={{ fontFamily: FONT_BODY }}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>

                  {/* Address with pin */}
                  <div className="flex items-center gap-2 mt-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#780C06" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <a
                      href={addr.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base hover:underline"
                      style={{ fontFamily: FONT_BODY, color: '#201814' }}
                    >
                      {addr.text}
                    </a>
                  </div>

                  {/* CTAs */}
                  <div className="flex gap-3 mt-3">
                    <a
                      href="#"
                      className="flex items-center justify-center h-[42px] lg:h-[46px] px-4 lg:px-5 rounded-full uppercase font-semibold text-sm lg:text-base whitespace-nowrap cursor-pointer hover:opacity-90 transition-opacity"
                      style={{
                        backgroundColor: '#780C06',
                        color: '#F4CE9F',
                        border: '1px solid #F4CE9F',
                        fontFamily: FONT_BODY,
                        fontWeight: 600,
                      }}
                    >
                      <Image src="/images/icons/circle-dot-filled.svg" alt="" width={18} height={18} className="mr-2" />
                      Reserve A Table
                    </a>
                    <a
                      href={`/location-${loc.slug}`}
                      className="flex items-center justify-center h-[42px] lg:h-[46px] px-4 lg:px-5 rounded-full uppercase font-semibold text-sm lg:text-base whitespace-nowrap cursor-pointer hover:opacity-90 transition-opacity"
                      style={{
                        backgroundColor: 'transparent',
                        color: '#201814',
                        border: '1px solid #201814',
                        fontFamily: FONT_BODY,
                        fontWeight: 600,
                      }}
                    >
                      See More
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
