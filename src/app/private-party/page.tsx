import type { Metadata } from 'next';
import { InnerPageHero } from '@/components/sections/InnerPageHero';
import { SectionHeadingGroup } from '@/components/sections/SectionHeadingGroup';
import { PrivatePartyInfoCards } from '@/components/sections/PrivatePartyInfoCards';
import { ProposalForm } from '@/components/sections/ProposalForm';

export const metadata: Metadata = {
  title: 'Private Party | Eclipse di Luna',
  description:
    'Host your private party at Eclipse di Luna. Thoughtfully crafted tapas packages, private rooms, and a personalized proposal for your event.',
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
