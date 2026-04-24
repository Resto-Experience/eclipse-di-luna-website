'use client';

import Image from 'next/image';
import { REVIEWS } from '@/data/reviews';
import { Reveal } from '@/components/ui/Reveal';

const FONT_BODY = 'var(--font-body), "Nunito", sans-serif';
const FONT_BUTTON = 'var(--font-button), Arial, sans-serif';
const FONT_HEADING = '"Swarsh Daisy", var(--font-display), Georgia, serif';

// Triple the reviews for seamless infinite marquee
const TRIPLED = [...REVIEWS, ...REVIEWS, ...REVIEWS];

export function ReviewsSection() {
  return (
    <section className="relative py-[80px]" style={{ backgroundColor: '#FEF8EC' }}>
      <div className="max-w-[1280px] mx-auto px-4 lg:px-9">
        {/* Heading group */}
        <Reveal variant="fade-up" duration={700}>
        <div className="flex flex-col items-center text-center gap-3 mb-10">
          {/* Moon decoration */}
          <Image
            src="/images/reviews/moon.avif"
            alt=""
            width={113}
            height={124}
            className="w-[80px] h-auto"
          />
          {/* Voice of Our Guests pill */}
          <Image
            src="/images/reviews/voice-pill.svg"
            alt="The Voice of Our Guests"
            width={312}
            height={54}
            className="w-[260px] h-auto -mt-4"
          />
          {/* Heading */}
          <h2
            className="leading-[1.05] mt-4 max-w-[1100px]"
            style={{
              fontFamily: FONT_HEADING,
              fontSize: 'clamp(36px, 4.5vw, 64px)',
              color: '#333333',
              fontWeight: 400,
            }}
          >
            From the food to the atmosphere, every <br />detail leaves a lasting impression.
          </h2>

          {/* Gold underline */}
          <div className="w-full max-w-[900px] h-[2px] mt-6" style={{ backgroundColor: '#C9923D' }} />
        </div>
        </Reveal>
      </div>

      {/* Marquee ticker — full width */}
      <Reveal variant="fade-up" duration={600}>
      <div className="overflow-hidden">
        <div className="flex gap-5 animate-marquee" style={{ width: 'max-content' }}>
          {TRIPLED.map((review, i) => (
            <a
              key={i}
              href={review.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-[300px] bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow"
              style={{ minHeight: '220px' }}
            >
              <Image
                src="/images/reviews/stars-5.svg"
                alt="5 stars"
                width={136}
                height={24}
                className="mb-4"
              />
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: '16px',
                  color: '#333333',
                  lineHeight: 1.4,
                }}
              >
                {review.quote}
              </p>
              <div
                className="mt-4 italic"
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: '14px',
                  color: '#666666',
                }}
              >
                {review.author}
              </div>
            </a>
          ))}
        </div>
      </div>
      </Reveal>
    </section>
  );
}
