'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const FONT_BODY = 'var(--font-nunito-sans), "Nunito Sans", sans-serif';
const FONT_HEADING = '"Swarsh Daisy", var(--font-display), Georgia, serif';

// Order matches live: tapas, paella, empanada, dessert
const SLIDES = [
  { src: '/images/about/slide-tapas.webp', alt: 'Eclipse di Luna tapas with wine' },
  { src: '/images/about/slide-1.webp', alt: 'Eclipse di Luna paella' },
  { src: '/images/about/slide-2.webp', alt: 'Eclipse di Luna empanada' },
  { src: '/images/about/slide-3.webp', alt: 'Eclipse di Luna dessert' },
];

export function AboutSection() {
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
      <div className="max-w-[1280px] mx-auto px-9 flex flex-col gap-16 lg:gap-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left on desktop, BELOW image on mobile: Text */}
        <div className="flex flex-col gap-6 order-2 lg:order-1">
          {/* About Us pill SVG */}
          <Image
            src="/images/about/about-us-pill.svg"
            alt="About Us"
            width={201}
            height={52}
            className="h-auto w-[201px]"
          />

          {/* Heading */}
          <h2
            className="leading-[1.05]"
            style={{
              fontFamily: FONT_HEADING,
              fontSize: 'clamp(32px, 4.2vw, 54px)',
              color: '#3C1816',
              fontWeight: 400,
              letterSpacing: '-0.01em',
            }}
          >
            A culinary journey to <br className="hidden lg:inline" />
            latin & spanish culture
          </h2>

          {/* Paragraph */}
          <p
            className="max-w-[500px]"
            style={{
              fontFamily: FONT_BODY,
              fontSize: '24px',
              color: '#3C1816',
              fontWeight: 400,
              lineHeight: 1.4,
            }}
          >
            Eclipse di Luna celebrates culture and good times, showcasing Latin cuisine. Join us to enjoy flavors, music, dancing, and a beautiful atmosphere.
          </p>

          {/* CTAs — full width stacked on mobile, inline on desktop. MENU has black bg like Hero's Order Online. */}
          <div className="flex flex-col lg:flex-row gap-3 mt-2 w-full lg:w-auto">
            <a
              href="#"
              className="flex items-center justify-center h-[48px] px-6 rounded-full uppercase font-semibold text-base cursor-pointer hover:opacity-90 transition-opacity w-full lg:w-auto"
              style={{
                backgroundColor: '#780C06',
                color: '#F4CE9F',
                border: '1px solid #F4CE9F',
                fontFamily: FONT_BODY,
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
            </a>
            <a
              href="/menu"
              className="flex items-center justify-center h-[48px] px-6 rounded-full uppercase font-semibold text-base cursor-pointer hover:opacity-90 transition-opacity w-full lg:w-auto"
              style={{
                backgroundColor: '#000000',
                color: '#F4CE9F',
                border: '1px solid #F4CE9F',
                fontFamily: FONT_BODY,
                fontWeight: 600,
              }}
            >
              Menu
            </a>
          </div>
        </div>

        {/* Right on desktop, ABOVE text on mobile: Image carousel */}
        <div className="relative order-1 lg:order-2">
          <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
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

          {/* Controls row — arrows + dots in one row below image, matches live's Webflow slider */}
          <div className="flex items-center justify-between mt-4 px-2">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous slide"
              className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#780C06', color: '#F4CE9F' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="flex gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show slide ${i + 1} of ${SLIDES.length}`}
                  onClick={() => scrollTo(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${
                    selectedIndex === i ? 'bg-[#780C06]' : 'bg-[#780C06]/30'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next slide"
              className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#780C06', color: '#F4CE9F' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* OpenTable trust badge — separate element below carousel + buttons.
          Live uses two distinct images (mobile = vertical, desktop = horizontal banner). */}
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
      </div>
    </section>
  );
}
