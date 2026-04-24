import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';

export function InstagramSection() {
  return (
    // Section has big bottom padding to create overlap space for the newsletter card (rendered by Footer).
    <section
      className="relative pt-[60px] pb-[230px] lg:pt-[72px] lg:pb-[300px]"
      style={{ backgroundColor: '#FEF8EC' }}
    >
      <div className="max-w-[1280px] mx-auto px-4 lg:px-9">
        {/* Card: pattern bg, phones stuck to bottom, text vertically centered.
            Mobile: stacked (text top w/ 48px top padding, phones below touching bottom edge).
            Desktop: horizontal (phones left-bottom, text right-center). */}
        <Reveal variant="zoom-in" duration={800}>
        <div
          className="relative overflow-hidden rounded-[25px] lg:rounded-[8px] flex flex-col lg:flex-row min-h-[602px] lg:min-h-[406px]"
          style={{
            backgroundColor: '#1F1815',
            backgroundImage: 'url(/images/instagram/ig-card-bg.avif)',
            backgroundSize: 'cover',
            backgroundRepeat: 'repeat',
          }}
        >
          {/* Phones image — mobile: bottom (order-2); desktop: left column stuck to bottom-left with left padding */}
          <div className="order-2 lg:order-1 lg:w-1/2 flex justify-center lg:justify-start lg:items-end lg:pl-12">
            <Image
              src="/images/instagram/phones.avif"
              alt="Eclipse di Luna Instagram"
              width={1876}
              height={1624}
              className="block w-full max-w-[460px] h-auto"
            />
          </div>

          {/* Text + CTA — mobile: top with 48px padding; desktop: right half, vertically centered */}
          <div className="order-1 lg:order-2 lg:w-1/2 flex flex-col gap-3 items-center lg:items-start text-center lg:text-left px-6 pt-12 pb-0 lg:px-12 lg:py-12 lg:justify-center">
            <h2 className="text-display-md" style={{ color: '#FEFAF5' }}>
              We are on Instagram
            </h2>
            <p className="text-body-lg" style={{ color: '#F4CE9F' }}>
              Stay tuned for daily food and drinks, info about events and more…
            </p>
            <p className="text-body-lg" style={{ color: '#FEFAF5' }}>
              @eclipsediluna
            </p>
            <a
              href="https://www.instagram.com/eclipsediluna/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cta-pill inline-flex items-center justify-center gap-2 h-[46px] px-5 rounded-full cursor-pointer self-center lg:self-start mt-2 bg-[#780C06] hover:bg-[#000000] text-[#F4CE9F] border border-[#F4CE9F] transition-colors duration-200"
            >
              <Image src="/images/icons/instagram-white.svg" alt="" width={20} height={20} />
              Follow Us
            </a>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
