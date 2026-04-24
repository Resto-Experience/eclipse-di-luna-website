import type { Metadata } from 'next';
import { InnerPageHero } from '@/components/sections/InnerPageHero';
import { JobsForm } from '@/components/sections/JobsForm';

export const metadata: Metadata = {
  title: 'Jobs | Eclipse di Luna',
  description:
    'We are hiring! Apply to join the Eclipse di Luna team across our four Atlanta locations.',
};

export default function JobsPage() {
  return (
    <>
      <InnerPageHero
        title="We Are Hiring!"
        subtitle="RESTAURANT & TAPAS BAR"
        icon="/images/jobs/hero-icon.svg"
        iconWidth={191}
        iconHeight={66}
        bgDesktop="/images/jobs/hero-bg.avif"
        bgMobile="/images/jobs/hero-bg-mobile.avif"
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
        <div className="max-w-[1280px] mx-auto px-4 lg:px-9">
          <JobsForm />
        </div>
      </section>
    </>
  );
}
