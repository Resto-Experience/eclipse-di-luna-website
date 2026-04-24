import type { Metadata } from 'next';
import { InnerPageHero } from '@/components/sections/InnerPageHero';
import { ContactForm } from '@/components/sections/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | Eclipse di Luna',
  description:
    "Get in touch with Eclipse di Luna. Let's stay connected — reach out for questions, feedback, or reservations.",
};

export default function ContactUsPage() {
  return (
    <>
      <InnerPageHero
        title="Contact Us"
        subtitle="RESTAURANT & TAPAS BAR"
        icon="/images/contact/hero-icon.svg"
        bgDesktop="/images/contact/hero-bg.avif"
        bgMobile="/images/contact/hero-bg-mobile.avif"
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
          <ContactForm />
        </div>
      </section>
    </>
  );
}
