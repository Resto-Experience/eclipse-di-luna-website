'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getAllLocations } from '@/data/locations';
import { Reveal } from '@/components/ui/Reveal';
import { OrderOnlineModal, ReserveTableModal } from '@/components/sections/HeroModals';

const GOOGLE_MAPS_LINKS: Record<string, string> = {
  alpharetta: 'https://maps.app.goo.gl/L8XXEnFyiuuPY8zq7',
  beltline: 'https://maps.app.goo.gl/3svo5EHB6MChbmEc6',
  buckhead: 'https://maps.app.goo.gl/j1tcm5X6GpYYMYSx9',
  dunwoody: 'https://maps.app.goo.gl/SPGT2XBhSMqc7sFU9',
};

export function Hero() {
  const [modal, setModal] = useState<'reserve' | 'order' | null>(null);
  const close = () => setModal(null);

  return (
    <section className="relative h-dvh min-h-[700px] flex flex-col items-center justify-center overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        poster="/images/hero/poster.webp"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay — matches Figma: black base + 20% opacity image + gradient */}
      <div className="absolute inset-0 bg-black/70" />

      <Reveal onMount variant="zoom-in" duration={800} delay={200} className="relative z-10 flex flex-col items-center gap-4 px-4 lg:px-9 pb-12 w-full max-w-[1180px]">
        {/* Logo — responsive: ~240px mobile, 350px desktop. Aspect 500/428 = 1.168 */}
        <div
          className="relative mb-4 w-[240px] h-[205px] md:w-[300px] md:h-[257px] lg:w-[350px] lg:h-[299px]"
        >
          <Image
            src="/images/hero/logo-white.webp"
            alt="Eclipse di Luna - Restaurant & Tapas Bar"
            fill
            sizes="(max-width: 768px) 240px, (max-width: 1024px) 300px, 350px"
            className="object-contain"
            priority
          />
        </div>

        {/* Heading — Swarsh Daisy font from live site */}
        <h1
          className="text-white text-center leading-[1.1]"
          style={{
            fontFamily: '"Swarsh Daisy", var(--font-display), Georgia, serif',
            fontSize: 'clamp(48px, 6vw, 72px)',
            fontWeight: 400,
          }}
        >
          A Journey <br />Of Flavors
        </h1>

        {/* Subtitle — Nunito Sans */}
        <p
          className="text-gold-light text-center uppercase tracking-wide"
          style={{
            fontFamily: 'var(--font-body), "Nunito", sans-serif',
            fontSize: 'clamp(16px, 2vw, 24px)',
          }}
        >
          RESTAURANT & TAPAS BAR
        </p>

        {/* CTA Buttons — mobile: 1-col grid sized to widest child (both match Reserve A Table), centered.
            Desktop (sm+): side-by-side content-width, centered. */}
        <div className="w-fit mx-auto grid grid-cols-1 gap-3 mt-4 sm:flex sm:flex-row sm:justify-center">
          {/* Reserve A Table — burgundy bg, hovers to black */}
          <button
            type="button"
            onClick={() => setModal('reserve')}
            className="w-full sm:w-auto flex items-center justify-center h-[46px] px-5 rounded-full uppercase font-semibold text-base cursor-pointer bg-[#780C06] hover:bg-[#000000] text-[#F4CE9F] border border-[#F4CE9F] transition-colors duration-200"
            style={{
              fontFamily: 'var(--font-button), Arial, sans-serif',
              fontWeight: 600,
            }}
          >
            <Image
              src="/images/icons/circle-dot-filled.svg"
              alt=""
              width={20}
              height={20}
              className="mr-2"
            />
            Reserve A Table
          </button>
          {/* Order Online — BLACK bg, hovers to burgundy */}
          <button
            type="button"
            onClick={() => setModal('order')}
            className="w-full sm:w-auto flex items-center justify-center h-[46px] px-5 rounded-full uppercase font-semibold text-base cursor-pointer bg-[#000000] hover:bg-[#780C06] text-[#F4CE9F] border border-[#F4CE9F] transition-colors duration-200"
            style={{
              fontFamily: 'var(--font-button), Arial, sans-serif',
              fontWeight: 600,
            }}
          >
            Order Online
          </button>
        </div>
      </Reveal>

      <Reveal
        onMount
        variant="fade-in"
        duration={700}
        delay={600}
        className="hidden lg:flex absolute bottom-0 inset-x-0 items-center justify-between max-w-[1280px] mx-auto px-4 lg:px-9 py-6 z-10"
      >
        {/* Location links */}
        <div className="flex items-center gap-3">
          <Image
            src="/images/icons/tabler-map-pin-hero.svg"
            alt=""
            width={24}
            height={24}
          />
          {getAllLocations().map((loc, i) => (
            <span key={loc.slug} className="flex items-center gap-3">
              <a
                href={GOOGLE_MAPS_LINKS[loc.slug]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base hover:text-white transition-colors whitespace-nowrap"
                style={{
                  fontFamily: 'var(--font-accent)',
                  color: '#FCEAC9',
                }}
              >
                {loc.slug.charAt(0).toUpperCase() + loc.slug.slice(1)}
              </a>
              {i < getAllLocations().length - 1 && (
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: '#AF5B37' }}
                />
              )}
            </span>
          ))}
        </div>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/eclipsediluna/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-tango hover:text-white transition-colors"
        >
          <Image
            src="/images/icons/instagram.svg"
            alt=""
            width={20}
            height={20}
          />
          <span
            className="text-base whitespace-nowrap"
            style={{ fontFamily: 'var(--font-accent)' }}
          >
            @eclipsediluna
          </span>
        </a>
      </Reveal>

      <ReserveTableModal open={modal === 'reserve'} onClose={close} />
      <OrderOnlineModal open={modal === 'order'} onClose={close} />
    </section>
  );
}
