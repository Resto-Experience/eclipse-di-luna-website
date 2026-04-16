import Image from 'next/image';

const FONT_BODY = 'var(--font-nunito-sans), "Nunito Sans", sans-serif';
const FONT_HEADING = '"Swarsh Daisy", var(--font-display), Georgia, serif';

export function GiftCardSection() {
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
      <div className="max-w-[1280px] mx-auto px-9 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Gift card illustration */}
        <div className="flex justify-center lg:justify-start">
          <Image
            src="/images/gift-card/gift-card-illustration.avif"
            alt="Eclipse di Luna gift card"
            width={500}
            height={350}
            className="w-full max-w-[500px] h-auto"
          />
        </div>

        {/* Right: Text + CTA */}
        <div className="flex flex-col gap-6 max-w-[500px]">
          {/* Gift Cards pill SVG */}
          <Image
            src="/images/gift-card/gift-cards-pill.svg"
            alt="Gift Cards"
            width={244}
            height={54}
            className="h-auto w-[244px]"
          />

          {/* Heading */}
          <h2
            className="leading-[1.05]"
            style={{
              fontFamily: FONT_HEADING,
              fontSize: 'clamp(40px, 5vw, 64px)',
              color: '#FEFAF5',
              fontWeight: 400,
            }}
          >
            A Gift that always feels right.
          </h2>

          {/* Paragraph */}
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: '24px',
              color: '#FEFAF5',
              fontWeight: 400,
              lineHeight: 1.4,
            }}
          >
            Surprise them with a unique experience of flavors, wine, and great moments to enjoy anytime.
          </p>

          {/* CTA — black bg, gold border (same style as Order Online in Hero) */}
          <a
            href="#"
            className="inline-flex items-center justify-center h-[46px] px-5 rounded-full uppercase font-semibold text-base hover:opacity-90 transition-opacity self-start"
            style={{
              backgroundColor: '#000000',
              color: '#F4CE9F',
              border: '1px solid #F4CE9F',
              fontFamily: FONT_BODY,
              fontWeight: 600,
            }}
          >
            Buy a Gift Card
          </a>
        </div>
      </div>
    </section>
  );
}
