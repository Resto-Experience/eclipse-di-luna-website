import type { Metadata } from 'next';
import { InnerPageHero } from '@/components/sections/InnerPageHero';
import { ContactForm } from '@/components/sections/ContactForm';

const TITLE = 'Contact Eclipse di Luna - Tapas Bar & Live Music Venues in Atlanta';
const DESCRIPTION =
  'Reach out to Eclipse di Luna for inquiries or feedback. Choose from our Buckhead, Dunwoody, or Alpharetta locations';
const URL_PATH = '/contact-us';

export const metadata: Metadata = {
  title: { absolute: TITLE },
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
