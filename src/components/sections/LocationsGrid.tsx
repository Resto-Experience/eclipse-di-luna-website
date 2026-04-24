import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { getAllLocations } from '@/data/locations';

export function LocationsGrid() {
  const locations = getAllLocations();
  return (
    <section
      className="relative pt-[60px] pb-[240px] lg:pb-[340px]"
      style={{
        backgroundImage: 'url(/images/menu/grid-bg.webp)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '0 0',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-4 lg:px-9">
        <Reveal variant="fade-up" duration={700}>
          <div className="flex flex-col items-center text-center">
            <Image
              src="/images/menu/section-ornament.svg"
              alt=""
              width={45}
              height={45}
              className="h-[45px] w-auto mb-2"
            />
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 3.3vw, 48px)',
                lineHeight: 1,
                fontWeight: 400,
                color: '#3C1816',
                marginTop: '20px',
                marginBottom: '10px',
              }}
            >
              Our Locations
            </h2>
            <p
              className="max-w-[940px]"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(18px, 2.2vw, 32px)',
                lineHeight: 1.15,
                fontWeight: 400,
                color: '#333333',
                marginTop: '10px',
              }}
            >
              Each of our locations has its own energy, the same love for tapas, live
              music, and good company.
              <br />
              <br />
              Select your preferred destination.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 max-w-[940px] mx-auto">
          {locations.map((loc, i) => {
            const displayName = loc.slug.charAt(0).toUpperCase() + loc.slug.slice(1);
            const addr =
              loc.slug === 'dunwoody'
                ? `${loc.contact.address}. ${loc.contact.city}, ${loc.contact.state}. ${loc.contact.zip}`
                : loc.slug === 'beltline'
                  ? `${loc.contact.address}`
                  : `${loc.contact.address}.${loc.contact.city}, ${loc.contact.state}. ${loc.contact.zip}`;
            return (
              <Reveal key={loc.slug} variant="fade-up" duration={500} delay={Math.min(i, 4) * 100}>
                <Link
                  href={`/location-${loc.slug}`}
                  className="block rounded-[8px] overflow-hidden bg-black"
                >
                  <div className="relative aspect-[343/228] lg:aspect-[412/252]">
                    <Image
                      src={`/images/locations/${loc.slug}.avif`}
                      alt={`Eclipse di Luna ${displayName}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 412px"
                    />
                  </div>
                  <div className="px-6 py-4">
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '28px',
                        lineHeight: '33.6px',
                        fontWeight: 400,
                        color: '#F6D8B2',
                      }}
                    >
                      {displayName}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '16px',
                        lineHeight: '24px',
                        fontWeight: 300,
                        color: 'rgba(176, 176, 176, 0.75)',
                      }}
                    >
                      {addr}
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
