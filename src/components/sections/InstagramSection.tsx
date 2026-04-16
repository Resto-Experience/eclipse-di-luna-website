import Image from 'next/image';

const FONT_BODY = 'var(--font-nunito-sans), "Nunito Sans", sans-serif';
const FONT_HEADING = '"Swarsh Daisy", var(--font-display), Georgia, serif';

export function InstagramSection() {
  return (
    <section className="relative py-[60px]" style={{ backgroundColor: '#FEF8EC' }}>
      <div className="max-w-[1280px] mx-auto px-9">
        <div
          className="relative rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-8 lg:px-16 py-12"
          style={{
            backgroundColor: '#1f1815',
            backgroundImage: 'url(/images/textures/cream-pattern.svg)',
            backgroundSize: '300px',
            backgroundBlendMode: 'multiply',
          }}
        >
          {/* Phones image — hidden on mobile (live uses a different layout there) */}
          <div className="hidden lg:flex justify-center lg:justify-start">
            <Image
              src="/images/instagram/phones.avif"
              alt="Eclipse di Luna Instagram"
              width={500}
              height={433}
              className="w-full max-w-[450px] h-auto"
            />
          </div>

          {/* Right: Text + CTA — centered on mobile */}
          <div className="flex flex-col gap-4 items-center lg:items-start text-center lg:text-left">
            <h2
              className="leading-[1.1]"
              style={{
                fontFamily: FONT_HEADING,
                fontSize: 'clamp(36px, 4vw, 48px)',
                color: '#FEFAF5',
                fontWeight: 400,
              }}
            >
              We are on Instagram
            </h2>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: '22px',
                color: '#F4CE9F',
                fontWeight: 400,
                lineHeight: 1.4,
              }}
            >
              Stay tuned for daily food and drinks, info about events and more…
            </p>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: '24px',
                color: '#FEFAF5',
                fontWeight: 400,
              }}
            >
              @eclipsediluna
            </p>

            <a
              href="https://www.instagram.com/eclipsediluna/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-[46px] px-5 rounded-full uppercase font-semibold text-base cursor-pointer hover:opacity-90 transition-opacity self-center lg:self-start mt-2"
              style={{
                backgroundColor: '#780C06',
                color: '#F4CE9F',
                border: '1px solid #F4CE9F',
                fontFamily: FONT_BODY,
                fontWeight: 600,
              }}
            >
              <Image src="/images/icons/instagram-white.svg" alt="" width={20} height={20} />
              Follow Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
