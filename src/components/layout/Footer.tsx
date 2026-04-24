'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const FONT_BODY = 'var(--font-body), "Nunito", sans-serif';
const FONT_HEADING = '"Swarsh Daisy", var(--font-display), Georgia, serif';

const LOCATIONS = [
  {
    name: 'Alpharetta',
    links: [
      { label: 'Menu', href: '/menu/menu-alpharetta' },
      { label: 'Entertainment', href: '/location-alpharetta/#Entertainment' },
      { label: 'Deals', href: '/location-alpharetta/#Deals' },
      { label: 'Order Online', href: '/location-alpharetta/#Order' },
    ],
  },
  {
    name: 'Buckhead',
    links: [
      { label: 'Menu', href: '/menu/menu-buckhead' },
      { label: 'Entertainment', href: '/location-buckhead/#Entertainment-Buckhead' },
      { label: 'Deals', href: '/location-buckhead/#Deals-Buckhead' },
      { label: 'Order Online', href: '/location-buckhead/#Order-Buckhead' },
    ],
  },
  {
    name: 'Beltline',
    links: [
      { label: 'Menu', href: '/menu/menu-beltline' },
      { label: 'Entertainment', href: '/location-beltline/#Entertainment-Beltline' },
      { label: 'Deals', href: '/location-beltline/#Deals-Beltline' },
      { label: 'Order Online', href: '/location-beltline/#Order-Beltline' },
    ],
  },
  {
    name: 'Dunwoody',
    links: [
      { label: 'Menu', href: '/menu/menu-dunwoody' },
      { label: 'Entertainment', href: '/location-dunwoody/#Entertainment-Dunwoody' },
      { label: 'Deals', href: '/location-dunwoody/#Deals-Dunwoody' },
      { label: 'Order Online', href: '/location-dunwoody/#Order-Dunwoody' },
    ],
  },
];

const MORE_LINKS = [
  { label: 'Private Party', href: '/private-party' },
  { label: 'Catering', href: '/catering' },
  { label: 'Jobs', href: '/jobs' },
  { label: 'Blog', href: '/blog' },
];


export function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <footer style={{ backgroundColor: '#201814' }}>
      {/* Negative margin pulls the newsletter card up into the overlap zone of the previous section. */}
      <div className="relative z-10 -mt-[150px] lg:-mt-[220px] mb-12">
        <div className="max-w-[1180px] mx-auto px-4 lg:px-0">
          <div
            className="rounded-[8px] px-6 lg:px-12 py-20 lg:py-24 text-center flex flex-col justify-center items-center"
            style={{
              backgroundColor: '#3D0E0B',
              backgroundImage: 'url(/images/textures/newsletter-pattern.svg)',
              backgroundSize: 'cover',
              backgroundRepeat: 'repeat',
              minHeight: '406px',
              gap: '10px',
            }}
          >
            <h2
              style={{
                fontFamily: FONT_HEADING,
                fontSize: 'clamp(32px, 4vw, 48px)',
                lineHeight: 1.1,
                fontWeight: 400,
                color: '#FEFAF5',
                margin: 0,
              }}
            >
              Join our newsletter
            </h2>
            <p
              style={{
                fontFamily: FONT_BODY,
                fontSize: 'clamp(20px, 2.5vw, 32px)',
                lineHeight: '35px',
                fontWeight: 300,
                color: '#FAE8D3',
                textTransform: 'capitalize',
                margin: 0,
              }}
            >
              Be the first to know about events, menus, and specials
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-[720px] mx-auto w-full items-stretch mt-5"
            >
              <div className="flex-1 text-left">
                <label
                  htmlFor="newsletter-email"
                  className="block text-sm mb-1"
                  style={{ fontFamily: FONT_BODY, color: '#FAE8D3', fontWeight: 400 }}
                >
                  Email Address*
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@mail.com"
                  className="w-full h-[48px] px-5 rounded-full bg-white/10 border focus:outline-none focus:ring-2 focus:ring-[#F4CE9F]/50"
                  style={{
                    borderColor: '#F4CE9F',
                    color: '#F4CE9F',
                    fontFamily: FONT_BODY,
                  }}
                />
              </div>
              <div className="flex items-end justify-center sm:justify-start">
                <SubscribeButton submitted={submitted} />
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-[1180px] mx-auto px-4 lg:px-0 pb-12" style={{ borderBottom: '1px solid #79664F' }}>
        <div className="grid grid-cols-1 lg:grid-cols-[244px_1fr_190px] gap-12 items-start">
          <Link href="/" className="flex justify-center lg:justify-start">
            <Image
              src="/images/hero/logo-beige.webp"
              alt="Eclipse di Luna"
              width={244}
              height={293}
              className="w-full max-w-[244px] h-auto"
            />
          </Link>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10">
            {LOCATIONS.map((loc) => (
              <div key={loc.name} className="flex flex-col gap-2 items-center lg:items-start text-center lg:text-left">
                <div className="flex items-center" style={{ marginBottom: '8px' }}>
                  <Image
                    src="/images/icons/tabler-map-pin-footer.svg"
                    alt=""
                    width={24}
                    height={24}
                    style={{ marginRight: '10px' }}
                  />
                  <h3
                    style={{
                      fontFamily: 'var(--font-nugros), Arial, sans-serif',
                      fontSize: '16px',
                      fontWeight: 400,
                      color: '#FCEAC9',
                      margin: 0,
                    }}
                  >
                    {loc.name}
                  </h3>
                </div>
                <ul className="flex flex-col items-center lg:items-start" style={{ gap: '12px' }}>
                  {loc.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="transition-colors"
                        style={{
                          fontFamily: FONT_BODY,
                          fontSize: '16px',
                          fontWeight: 600,
                          color: '#F4CE9F',
                          textDecoration: 'none',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#FAF0E3')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#F4CE9F')}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center lg:items-start mx-auto lg:mx-0 text-center lg:text-left" style={{ width: '100%', maxWidth: '190px' }}>
            <div className="flex items-center" style={{ marginBottom: '8px' }}>
              <Image
                src="/images/icons/tabler-dots-circle.svg"
                alt=""
                width={24}
                height={24}
                style={{ marginRight: '10px' }}
              />
              <h3
                style={{
                  fontFamily: 'var(--font-nugros), Arial, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  color: '#FCEAC9',
                  margin: 0,
                }}
              >
                More
              </h3>
            </div>
            <ul className="flex flex-col" style={{ gap: '12px', marginBottom: '20px' }}>
              {MORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#F4CE9F',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FAF0E3')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#F4CE9F')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center transition-colors duration-200"
              style={{
                height: '42px',
                padding: '10px 20px',
                backgroundColor: '#780C06',
                border: '1px solid #F4CE9F',
                borderRadius: '500px',
                color: '#F4CE9F',
                fontFamily: FONT_BODY,
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: '16px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                alignSelf: 'flex-start',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#000000')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#780C06')}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#FFFFFF' }} className="py-4">
        <div className="max-w-[1180px] mx-auto px-4 lg:px-0 flex flex-col lg:flex-row items-center justify-between gap-4">
          <a
            href="https://restoexp.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <Image
              src="/images/footer/restoexp-pill.webp"
              alt="Resto Experience"
              width={273}
              height={36}
              style={{ width: 'auto', height: '36px' }}
            />
          </a>

          {/* Desktop: inline row — text, divider, 2026 */}
          <a
            href="https://restoexp.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-[15px]"
            style={{ textDecoration: 'none' }}
          >
            <span
              style={{
                fontFamily: FONT_BODY,
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '30px',
                color: '#5C5C5C',
              }}
            >
              Restaurant Marketing, Content &amp; Web Design
            </span>
            <Image
              src="/images/footer/restoexp-divider.svg"
              alt=""
              width={2}
              height={24}
              style={{ opacity: 0.7 }}
            />
            <span
              style={{
                fontFamily: FONT_BODY,
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '30px',
                color: '#5C5C5C',
              }}
            >
              2026
            </span>
          </a>

          {/* Mobile: stacked — text, horizontal divider, 2026 below */}
          <a
            href="https://restoexp.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="lg:hidden flex flex-col items-center gap-2 w-full"
            style={{ textDecoration: 'none' }}
          >
            <span
              className="text-center"
              style={{
                fontFamily: FONT_BODY,
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '20px',
                color: '#5C5C5C',
              }}
            >
              Restaurant Marketing, Content &amp; Web Design
            </span>
            <span
              aria-hidden
              style={{
                display: 'block',
                width: '160px',
                height: '1px',
                backgroundColor: '#5C5C5C',
                opacity: 0.5,
              }}
            />
            <span
              style={{
                fontFamily: FONT_BODY,
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '20px',
                color: '#5C5C5C',
              }}
            >
              2026
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}

function SubscribeButton({ submitted }: { submitted: boolean }) {
  const [hover, setHover] = useState(false);
  const bg = hover ? "#3D0E0B" : "#F4CE9F";
  const color = hover ? "#F4CE9F" : "#3D0E0B";
  const borderColor = hover ? "#F4CE9F" : "transparent";
  return (
    <button
      type="submit"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="h-[48px] px-8 rounded-full uppercase cursor-pointer transition-all duration-200"
      style={{
        fontFamily: FONT_BODY,
        fontSize: "16px",
        fontWeight: 600,
        backgroundColor: bg,
        color,
        border: `1px solid ${borderColor}`,
      }}
    >
      {submitted ? "Subscribed!" : "Subscribe"}
    </button>
  );
}
