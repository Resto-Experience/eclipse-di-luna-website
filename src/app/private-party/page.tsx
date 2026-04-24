import type { Metadata } from 'next';
import { InnerPageHero } from '@/components/sections/InnerPageHero';
import { SectionHeadingGroup } from '@/components/sections/SectionHeadingGroup';
import { PrivatePartyInfoCards } from '@/components/sections/PrivatePartyInfoCards';
import { ProposalForm } from '@/components/sections/ProposalForm';

const TITLE = 'Private Events & Celebrations';
const DESCRIPTION =
  'Host your next celebration at Eclipse di Luna. Private party spaces for birthdays, rehearsal dinners, corporate events and more.';
const URL_PATH = '/private-party';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL_PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL_PATH,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function PrivatePartyPage() {
  return (
    <>
      <InnerPageHero
        title="Private Party"
        subtitle="RESTAURANT & TAPAS BAR"
        icon="/images/menu/hero-icon.svg"
        bgDesktop="/images/private-party/hero-bg.avif"
        bgMobile="/images/private-party/hero-bg-mobile.webp"
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
        <div className="max-w-[1280px] mx-auto px-4 lg:px-9 flex flex-col gap-16 lg:gap-24">
          <PrivatePartyInfoCards />
          <div className="flex flex-col items-center gap-16 lg:gap-20">
            <SectionHeadingGroup
              caption="Captured Moments"
              title="Seen Through Eclipse's Eyes"
              subtitle="Moments, emotions, and celebrations captured through the lens of Eclipse, memories that live beyond the night."
            />
            <ProposalForm />
          </div>
        </div>
      </section>
    </>
  );
}
