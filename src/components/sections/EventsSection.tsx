'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';

const FONT_BODY = 'var(--font-nunito-sans), "Nunito Sans", sans-serif';
const FONT_HEADING = '"Swarsh Daisy", var(--font-display), Georgia, serif';

const BANNERS = [
  { src: '/images/events/banner-1.avif', alt: 'Salsa Nights at Eclipse di Luna' },
  { src: '/images/events/banner-2.avif', alt: 'International DJ Nights at Eclipse di Luna' },
  { src: '/images/events/banner-3.webp', alt: 'Live Music at Eclipse di Luna' },
];

const CTA_CARDS = [
  {
    image: '/images/events/banner-1.avif',
    title: 'Celebrate',
    titleLine2: 'with us',
    href: '/private-party',
    cta: 'PRIVATE PARTY',
  },
  {
    image: '/images/events/banner-2.avif',
    title: 'Book',
    titleLine2: 'your spot',
    href: '#',
    cta: 'RESERVATIONS',
  },
  {
    image: '/images/events/banner-3.webp',
    title: 'We cater',
    titleLine2: 'your event',
    href: '/catering',
    cta: 'CATERING',
  },
];

function CarouselDots({ count, selected, onSelect }: { count: number; selected: number; onSelect: (i: number) => void }) {
  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to slide ${i + 1}`}
          onClick={() => onSelect(i)}
          className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
            selected === i ? 'bg-[#780C06]' : 'bg-[#780C06]/30'
          }`}
        />
      ))}
    </div>
  );
}

function BannerCard({ banner }: { banner: (typeof BANNERS)[number] }) {
  return (
    <a
      href="#"
      className="block relative overflow-hidden rounded-2xl group"
      style={{ aspectRatio: '1440/488' }}
    >
      <Image
        src={banner.src}
        alt={banner.alt}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 1280px) 100vw, 1280px"
      />
    </a>
  );
}

function CtaCard({ card }: { card: (typeof CTA_CARDS)[number] }) {
  return (
    <div className="relative rounded-2xl overflow-hidden">
      <div className="relative aspect-[4/5] md:aspect-[3/4]">
        <Image
          src={card.image}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h3
            className="text-white leading-[1.05]"
            style={{
              fontFamily: FONT_HEADING,
              fontSize: 'clamp(36px, 4vw, 56px)',
              fontWeight: 400,
            }}
          >
            {card.title} <br />{card.titleLine2}
          </h3>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <a
            href={card.href}
            className="flex items-center justify-center gap-2 h-[44px] w-full rounded-full uppercase font-semibold text-base cursor-pointer hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: '#780C06',
              color: '#F4CE9F',
              border: '1px solid #F4CE9F',
              fontFamily: FONT_BODY,
              fontWeight: 600,
            }}
          >
            {card.cta}
          </a>
        </div>
      </div>
    </div>
  );
}

function MobileCarousel<T>({ items, render }: { items: T[]; render: (item: T, i: number) => React.ReactNode }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  return (
    <div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((item, i) => (
            <div key={i} className="flex-[0_0_92%] min-w-0 px-2">
              {render(item, i)}
            </div>
          ))}
        </div>
      </div>
      <CarouselDots count={items.length} selected={selected} onSelect={scrollTo} />
    </div>
  );
}

export function EventsSection() {
  return (
    <section
      className="relative py-[80px]"
      style={{
        backgroundColor: '#FCF8EE',
        backgroundImage: 'url(/images/textures/cream-pattern.svg)',
        backgroundSize: '400px',
        backgroundRepeat: 'repeat',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-9">
        {/* Heading group */}
        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <Image
            src="/images/icons/sparkle.svg"
            alt=""
            width={133}
            height={133}
            className="w-[80px] h-auto"
          />
          <Image
            src="/images/events/events-pill.svg"
            alt="Events Made Special"
            width={324}
            height={57}
            className="w-[260px] h-auto -mt-4"
          />
          <h2
            className="leading-[1.05] mt-4"
            style={{
              fontFamily: FONT_HEADING,
              fontSize: 'clamp(40px, 5vw, 64px)',
              color: '#292929',
              fontWeight: 400,
            }}
          >
            Celebrate, gather, and enjoy <br />unforgettable experiences.
          </h2>
        </div>

        {/* Banners row — stacked vertically on all viewports (matches live mobile + desktop) */}
        <div className="flex flex-col gap-6 mb-12">
          {BANNERS.map((banner, i) => (
            <BannerCard key={i} banner={banner} />
          ))}
        </div>

        {/* CTA cards — mobile carousel, desktop 3-col grid */}
        <div className="lg:hidden -mx-9">
          <MobileCarousel
            items={CTA_CARDS}
            render={(card) => <CtaCard card={card} />}
          />
        </div>
        <div className="hidden lg:grid grid-cols-3 gap-4">
          {CTA_CARDS.map((card, i) => (
            <CtaCard key={i} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
