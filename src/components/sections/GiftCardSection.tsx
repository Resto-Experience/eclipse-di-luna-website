'use client';

import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { useModal } from '@/components/providers/ModalProvider';

const FONT_BODY = 'var(--font-body), "Nunito", sans-serif';
const FONT_BUTTON = 'var(--font-button), Arial, sans-serif';
const FONT_HEADING = '"Swarsh Daisy", var(--font-display), Georgia, serif';

export function GiftCardSection() {
  const { openModal } = useModal();
  return (
    <section
      className="relative py-[72px]"
      style={{
        backgroundColor: '#8B3934',
        backgroundImage: 'url(/images/textures/red-bg.avif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-4 lg:px-9 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Gift card illustration */}
        <Reveal variant="fade-left" duration={800}>
        <div className="flex justify-center lg:justify-start">
          <Image
            src="/images/gift-card/gift-card-illustration.avif"
            alt="Eclipse di Luna gift card"
            width={500}
            height={350}
            className="w-full max-w-[500px] h-auto"
          />
        </div>
        </Reveal>

        {/* Right: Text + CTA */}
        <Reveal variant="fade-right" duration={800} delay={100}>
        <div className="flex flex-col gap-6 max-w-[500px]">
          {/* Gift Cards pill SVG */}
          <Image
            src="/images/gift-card/gift-cards-pill.svg"
            alt="Gift Cards"
            width={244}
            height={54}
            className="h-auto w-[244px]"
          />

          {/* Heading — text-display-sm (22/36) per live gift-card */}
          <h2 className="text-display-sm" style={{ color: '#FEFAF5' }}>
            A Gift that always feels right.
          </h2>

          {/* Paragraph — text-body (16/18) per live gift-card */}
          <p className="text-body" style={{ color: '#FEFAF5' }}>
            Surprise them with a unique experience of flavors, wine, and great moments to enjoy anytime.
          </p>

          {/* CTA — black bg, gold border. Hover: black → red. Uses .text-cta-pill (Nunito 600 uppercase) per live. */}
          <button
            type="button"
            onClick={() => openModal('gift')}
            className="text-cta-pill inline-flex items-center justify-center h-[46px] px-5 rounded-full cursor-pointer self-start bg-[#000000] hover:bg-[#780C06] text-[#F4CE9F] border border-[#F4CE9F] transition-colors duration-200"
          >
            Buy a Gift Card
          </button>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
