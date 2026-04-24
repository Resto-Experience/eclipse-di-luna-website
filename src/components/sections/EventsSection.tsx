'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';

const BANNERS = [
  {
    mobile: '/images/events/banner-mobile-1.avif',
    desktop: '/images/events/banner-desktop-1.avif',
    label: 'Salsa Nights',
    alt: 'Salsa Nights at Eclipse di Luna',
  },
  {
    mobile: '/images/events/banner-mobile-2.avif',
    desktop: '/images/events/banner-desktop-2.avif',
    label: 'International DJ Nights',
    alt: 'International DJ Nights at Eclipse di Luna',
  },
  {
    mobile: '/images/events/banner-mobile-3.avif',
    desktop: '/images/events/banner-desktop-3.webp',
    label: 'Live Music',
    alt: 'Live Music at Eclipse di Luna',
  },
];

const CTA_CARDS = [
  {
    title: 'Celebrate',
    titleLine2: 'with us',
    href: '/private-party',
    cta: 'PRIVATE PARTY',
    icon: '/images/icons/confetti.svg',
    bg: '/images/events/cta-celebrate.svg',
    kind: 'photo' as const,
  },
  {
    title: 'Book',
    titleLine2: 'your spot',
    href: '#',
    cta: 'RESERVATIONS',
    icon: '/images/icons/calendar-event.svg',
    bg: '/images/events/cta-book-overlay.avif',
    kind: 'decorative' as const,
  },
  {
    title: 'We cater',
    titleLine2: 'your event',
    href: '/catering',
    cta: 'CATERING',
    icon: '/images/icons/flare.svg',
    bg: '/images/events/cta-cater.avif',
    kind: 'photo' as const,
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

// Uses two Image elements over <picture> so next/image optimizes each viewport variant.
function BannerCard({ banner }: { banner: (typeof BANNERS)[number] }) {
  return (
    <a href="#" className="block relative overflow-hidden rounded-[8px]">
      <div className="relative lg:hidden" style={{ aspectRatio: '716/520' }}>
        <Image src={banner.mobile} alt={banner.alt} fill className="object-cover" sizes="100vw" />
      </div>
      <div className="relative hidden lg:block" style={{ aspectRatio: '1440/488' }}>
        <Image
          src={banner.desktop}
          alt={banner.alt}
          fill
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 1040px"
        />
      </div>
    </a>
  );
}

function CtaCard({ card }: { card: (typeof CTA_CARDS)[number] }) {
  const isDecorative = card.kind === 'decorative';
  return (
    <div
      className="relative overflow-hidden flex flex-col items-center px-6 py-6 aspect-[3/4.5]"
      style={{
        backgroundColor: isDecorative ? '#301103' : '#1A0604',
        backgroundImage: `url(${card.bg})`,
        backgroundSize: isDecorative ? 'contain' : 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex-1" />
      <h3 className="text-display-md text-white text-center relative z-10">
        {card.title} <br />{card.titleLine2}
      </h3>
      <div className="flex-1" />

      <a
        href={card.href}
        className="text-cta-pill relative z-10 flex items-center justify-center gap-2 h-[44px] w-full rounded-full cursor-pointer bg-[#780C06] hover:bg-[#000000] text-[#F4CE9F] border border-[#F4CE9F] transition-colors duration-200"
      >
        <Image src={card.icon} alt="" width={20} height={20} className="shrink-0" />
        {card.cta}
      </a>
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
        backgroundColor: '#FEF8EC',
        backgroundImage: 'url(/images/textures/events-bg.svg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-4 lg:px-9">
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
          <h2 className="text-display-lg mt-4" style={{ color: '#292929' }}>
            Celebrate, gather, and enjoy <br />unforgettable experiences.
          </h2>
        </div>

        <div className="flex flex-col gap-6 max-w-[1040px] mx-auto">
          {BANNERS.map((banner, i) => (
            <BannerCard key={i} banner={banner} />
          ))}
        </div>

        <hr className="max-w-[1040px] mx-auto my-12 border-t border-[#3D0E0B]/30" />

        <div className="lg:hidden -mx-4">
          <MobileCarousel
            items={CTA_CARDS}
            render={(card) => <CtaCard card={card} />}
          />
        </div>
        <div className="hidden lg:grid grid-cols-3 gap-0 max-w-[1040px] mx-auto">
          {CTA_CARDS.map((card, i) => (
            <CtaCard key={i} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
