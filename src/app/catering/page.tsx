import type { Metadata } from 'next';
import Image from 'next/image';
import { InnerPageHero } from '@/components/sections/InnerPageHero';
import { SectionHeadingGroup } from '@/components/sections/SectionHeadingGroup';
import { LocationContactsGrid } from '@/components/sections/LocationContactsGrid';
import { TrustMetrics } from '@/components/sections/TrustMetrics';
import { CateringForm } from '@/components/sections/CateringForm';

export const metadata: Metadata = {
  title: 'Catering | Eclipse di Luna',
  description:
    "From intimate gatherings to large celebrations, Eclipse di Luna catering brings Latin & Spanish flavors to your event.",
};

export default function CateringPage() {
  return (
    <>
      <InnerPageHero
        title="Catering"
        subtitle="RESTAURANT & TAPAS BAR"
        icon="/images/catering/hero-icon.avif"
        bgDesktop="/images/catering/hero-bg.avif"
        bgMobile="/images/catering/hero-bg-mobile.webp"
      />
      <section
        className="relative pt-[60px] pb-[240px] lg:pb-[360px]"
        style={{
          backgroundImage: 'url(/images/menu/grid-bg.webp)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '0 0',
        }}
      >
        <div className="max-w-[1280px] mx-auto lg:px-9 flex flex-col gap-16 lg:gap-24">
          {/* Intro + 4 location contacts */}
          <div className="flex flex-col items-center px-4 lg:px-0">
            <Image
              src="/images/menu/section-ornament.svg"
              alt=""
              width={45}
              height={45}
              className="h-[45px] w-auto mb-2"
            />
            <h2
              className="text-center max-w-[840px]"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 3.3vw, 48px)',
                lineHeight: 1,
                fontWeight: 400,
                color: '#3C1816',
                marginTop: '10px',
              }}
            >
              From intimate gatherings to large celebrations, we&rsquo;re closer than you think.
            </h2>
            <LocationContactsGrid />
            <p
              className="text-center mt-8 max-w-[640px]"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '24px',
                lineHeight: '25px',
                fontWeight: 600,
                color: '#3C1816',
              }}
            >
              Reach out to your nearest location or request a proposal.
            </p>
          </div>

          {/* Trust metrics */}
          <div className="flex flex-col items-center gap-10 px-4 lg:px-0">
            <Image
              src="/images/catering/trust-icon.svg"
              alt=""
              width={63}
              height={46}
              className="h-[46px] w-auto"
            />
            <h2
              className="text-center max-w-[840px]"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 3.3vw, 48px)',
                lineHeight: 1,
                fontWeight: 400,
                color: '#3C1816',
              }}
            >
              Trusted by thousands of events, <br className="hidden lg:inline" />
              built on years of experience
            </h2>
            <TrustMetrics />
          </div>

          {/* Catering form */}
          <div className="px-4 lg:px-0">
            <CateringForm />
          </div>
        </div>
      </section>
    </>
  );
}
