'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Reveal } from '@/components/ui/Reveal';
import { useModal } from '@/components/providers/ModalProvider';

const FONT_BODY = 'var(--font-body), "Nunito", sans-serif';
const FONT_BUTTON = 'var(--font-button), Arial, sans-serif';
const FONT_HEADING = '"Swarsh Daisy", var(--font-display), Georgia, serif';

// 3-slide carousel (user dropped the 4th). Keep: tapas plate, paella, empanada.
const SLIDES = [
  { src: '/images/about/slide-1.avif', alt: 'Eclipse di Luna tapas plate with wine' },
  { src: '/images/about/slide-2.webp', alt: 'Eclipse di Luna paella with shrimp' },
  { src: '/images/about/slide-3.webp', alt: 'Eclipse di Luna empanada with mango salsa' },
];

export function AboutSection() {
  const { openModal } = useModal();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <section
      className="relative py-[100px]"
      style={{
        backgroundImage: 'url(/images/textures/wood-bg.avif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-4 lg:px-9 flex flex-col gap-16 lg:gap-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left on desktop, BELOW image on mobile: Text */}
        <Reveal variant="fade-left" duration={800} delay={100} className="order-2 lg:order-1">
        <div className="flex flex-col gap-6">
          {/* About Us pill SVG */}
          <Image
            src="/images/about/about-us-pill.svg"
            alt="About Us"
            width={201}
            height={52}
            className="h-auto w-[201px]"
          />

          {/* Heading — text-display-lg (36/64) */}
          <h2 className="text-display-lg" style={{ color: '#3C1816' }}>
            A culinary journey to <br className="hidden lg:inline" />
            latin & spanish culture
          </h2>

          {/* Paragraph — text-body-lg (18/24) */}
          <p className="text-body-lg max-w-[500px]" style={{ color: '#3C1816' }}>
            Eclipse di Luna celebrates culture and good times, showcasing Latin cuisine. Join us to enjoy flavors, music, dancing, and a beautiful atmosphere.
          </p>

          {/* CTAs — mobile: 1-col grid, both equal to Reserve A Table width, left-aligned.
              Desktop (lg+): side-by-side content-width. */}
          <div className="w-fit grid grid-cols-1 gap-3 mt-2 lg:flex lg:flex-row">
            <button
              type="button"
              onClick={() => openModal('reserve')}
              className="w-full lg:w-auto flex items-center justify-center h-[48px] px-6 rounded-full uppercase font-semibold text-base whitespace-nowrap cursor-pointer bg-[#780C06] hover:bg-[#000000] text-[#F4CE9F] border border-[#F4CE9F] transition-colors duration-200"
              style={{
                fontFamily: FONT_BUTTON,
                fontWeight: 600,
              }}
            >
              <Image
                src="/images/icons/circle-dot-filled.svg"
                alt=""
                width={18}
                height={18}
                className="mr-2"
              />
              Reserve A Table
            </button>
            <a
              href="/menu"
              className="w-full lg:w-auto flex items-center justify-center h-[48px] px-6 rounded-full uppercase font-semibold text-base whitespace-nowrap cursor-pointer bg-[#000000] hover:bg-[#780C06] text-[#F4CE9F] border border-[#F4CE9F] transition-colors duration-200"
              style={{
                fontFamily: FONT_BUTTON,
                fontWeight: 600,
              }}
            >
              Menu
            </a>
          </div>
        </div>
        </Reveal>

        {/* Right on desktop, ABOVE text on mobile: Image carousel */}
        <Reveal variant="fade-right" duration={800} className="order-1 lg:order-2">
        <div className="relative">
          <div className="overflow-hidden rounded-[10px]" ref={emblaRef}>
            <div className="flex">
              {SLIDES.map((slide, i) => (
                <div key={i} className="flex-[0_0_100%] min-w-0">
                  <div className="relative aspect-[566/400]">
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls row — arrows + dots in one row below image, matches live's Webflow slider.
              Arrows are SVGs with the red circle baked in (no extra wrapper bg). */}
          <div className="flex items-center justify-between mt-3">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous slide"
              className="cursor-pointer transition-opacity duration-200 opacity-100 hover:opacity-80"
            >
              <Image
                src="/images/icons/arrow-left.svg"
                alt=""
                width={65}
                height={40}
                priority={false}
              />
            </button>

            {/* Dots — 8x8 circles. Active = filled red, inactive = red ring outline. */}
            <div className="flex items-center gap-[6px]">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show slide ${i + 1} of ${SLIDES.length}`}
                  onClick={() => scrollTo(i)}
                  className={`w-2 h-2 rounded-full border border-[#780C06] transition-colors cursor-pointer ${
                    selectedIndex === i ? 'bg-[#780C06]' : 'bg-transparent'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next slide"
              className="cursor-pointer transition-opacity duration-200 opacity-100 hover:opacity-80"
            >
              <Image
                src="/images/icons/arrow-right.svg"
                alt=""
                width={65}
                height={40}
                priority={false}
              />
            </button>
          </div>
        </div>
        </Reveal>
      </div>

      {/* OpenTable trust badge — separate element below carousel + buttons.
          Live uses two distinct images (mobile = vertical, desktop = horizontal banner). */}
      <Reveal variant="fade-up" duration={700}>
      <div className="rounded-3xl overflow-hidden">
        <Image
          src="/images/opentable/opentable-mobile.webp"
          alt="OpenTable 4.9 rated — Thank You!"
          width={1432}
          height={1800}
          className="block lg:hidden w-full h-auto"
          sizes="(max-width: 1024px) 100vw, 0px"
        />
        <Image
          src="/images/opentable/opentable-desktop.webp"
          alt="OpenTable 4.9 rated — Thank You!"
          width={3540}
          height={1389}
          className="hidden lg:block w-full h-auto"
          sizes="(min-width: 1024px) 1180px, 0px"
        />
      </div>
      </Reveal>
      </div>
    </section>
  );
}
