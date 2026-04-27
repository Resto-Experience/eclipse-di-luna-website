'use client';

import Image from 'next/image';
import { getAllLocations } from '@/data/locations';
import { Reveal } from '@/components/ui/Reveal';
import { useModal } from '@/components/providers/ModalProvider';

const FONT_BODY = 'var(--font-body), "Nunito", sans-serif';
const FONT_BUTTON = 'var(--font-button), Arial, sans-serif';
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
  const { openModal } = useModal();

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
      <div className="max-w-[1180px] mx-auto px-4 lg:px-9">
        {/* Heading group */}
        <Reveal variant="fade-up" duration={700}>
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
          {/* Heading — text-display-lg (36/64) */}
          <h2 className="text-display-lg" style={{ color: '#201814' }}>
            Explore Our <br />Vibrant Locations
          </h2>
          {/* Subtitle — text-body-xl (18/28) */}
          <p className="text-body-xl max-w-[600px]" style={{ color: '#201814' }}>
            Experience the essence of Latin & Spanish flavors across our unique spaces
          </p>
        </div>
        </Reveal>

        {/* Location cards — ZIGZAG: alternating image-left/right on desktop. Mobile always stacks image-top. */}
        <div className="flex flex-col gap-12 lg:gap-20">
          {locations.map((loc, i) => {
            const desc = LOCATION_DESCRIPTIONS[loc.slug];
            const addr = LOCATION_ADDRESSES[loc.slug];
            // Zigzag: index 0,2 → image first (left); index 1,3 → image last (right)
            const imageFirst = i % 2 === 0;
            return (
              <Reveal key={loc.slug} variant="fade-up" duration={600} delay={Math.min(i, 4) * 100}>
              <div
                className={`flex flex-col lg:flex-row ${imageFirst ? '' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}
              >
                <div
                  className="relative w-full lg:w-[525px] lg:flex-shrink-0 overflow-hidden"
                  style={{ aspectRatio: '525 / 400', borderRadius: '12px' }}
                >
                  <Image
                    src={`/images/locations/${loc.slug}.avif`}
                    alt={`Eclipse di Luna ${loc.slug.charAt(0).toUpperCase() + loc.slug.slice(1)} restaurant interior`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 525px"
                  />
                </div>

                <div className="flex flex-col gap-3 w-full lg:flex-1">
                  <h3
                    style={{
                      fontFamily: FONT_HEADING,
                      fontSize: '36px',
                      lineHeight: '36px',
                      fontWeight: 400,
                      color: '#201814',
                    }}
                  >
                    {loc.slug.charAt(0).toUpperCase() + loc.slug.slice(1)}
                  </h3>

                  <p
                    className="max-w-[500px]"
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: '24px',
                      lineHeight: '33.6px',
                      fontWeight: 400,
                      color: '#201814',
                    }}
                  >
                    {desc}
                  </p>

                  {/* Link tabs — flat cream rectangles per live (NOT rounded pills). bg #F8DEBF, 37px tall, 10px horizontal padding. */}
                  <div className="flex flex-wrap gap-[5px] mt-1">
                    {[
                      { label: 'Order Online', href: `/location-${loc.slug}/#Order` },
                      { label: 'Entertainment', href: `/location-${loc.slug}/#Entertainment` },
                      { label: 'Deals', href: `/location-${loc.slug}/#Deals` },
                      { label: 'Menu', href: `/menu/menu-${loc.slug}` },
                    ].map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="inline-flex items-center h-[37px] px-[10px] bg-[#F8DEBF] text-[#333333] hover:bg-[#201814] hover:text-[#F8DEBF] transition-colors"
                        style={{
                          fontFamily: FONT_BODY,
                          fontSize: '18px',
                          fontWeight: 400,
                          lineHeight: 1,
                        }}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>

                  {/* Address with pin */}
                  <div className="flex items-center gap-2 mt-1">
                    <Image
                      src="/images/icons/tabler-map-pin.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="flex-shrink-0"
                    />
                    <a
                      href={addr.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body hover:underline"
                      style={{ color: '#201814' }}
                    >
                      {addr.text}
                    </a>
                  </div>

                  {/* CTAs — Reserve red→black, See More dark→red. */}
                  <div className="flex gap-3 mt-2">
                    <button
                      type="button"
                      onClick={() => openModal('reserve')}
                      className="text-cta-pill flex items-center justify-center h-[42px] lg:h-[46px] px-4 lg:px-5 rounded-full whitespace-nowrap cursor-pointer bg-[#780C06] hover:bg-[#000000] text-[#F4CE9F] border border-[#F4CE9F] transition-colors duration-200"
                    >
                      <Image src="/images/icons/circle-dot-filled.svg" alt="" width={18} height={18} className="mr-2" />
                      Reserve A Table
                    </button>
                    <a
                      href={`/location-${loc.slug}`}
                      className="text-cta-pill flex items-center justify-center h-[42px] lg:h-[46px] px-4 lg:px-5 rounded-full whitespace-nowrap cursor-pointer bg-[#120601] hover:bg-[#780C06] text-[#F4CE9F] border border-[#F4CE9F] transition-colors duration-200"
                    >
                      See More
                    </a>
                  </div>
                </div>
              </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
