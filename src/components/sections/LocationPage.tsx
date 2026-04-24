'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import type { Location } from '@/types/location';

type TabKey = 'overview' | 'order' | 'entertainment' | 'deals';

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: 'overview', label: 'Overview' },
  { key: 'order', label: 'Order Online' },
  { key: 'entertainment', label: 'Entertainment' },
  { key: 'deals', label: 'Deals' },
];

const FONT_H = 'var(--font-heading)';
const FONT_B = 'var(--font-body)';

function hashToTab(hash: string): TabKey | null {
  const h = hash.replace(/^#/, '').toLowerCase();
  if (h.startsWith('order')) return 'order';
  if (h.startsWith('entertainment')) return 'entertainment';
  if (h.startsWith('deals')) return 'deals';
  if (h.startsWith('overview')) return 'overview';
  return null;
}

export function LocationPage({ location }: { location: Location }) {
  const [active, setActive] = useState<TabKey>('overview');

  useEffect(() => {
    const apply = () => {
      const tab = hashToTab(window.location.hash);
      if (tab) setActive(tab);
    };
    apply();
    window.addEventListener('hashchange', apply);
    return () => window.removeEventListener('hashchange', apply);
  }, []);
  const name = location.slug.charAt(0).toUpperCase() + location.slug.slice(1);
  const address = `${location.contact.address}. ${location.contact.city}, ${location.contact.state} ${location.contact.zip}`;

  return (
    <>
      <LocationHero name={name} location={location} address={address} />

      {/* Tabs and content share one section so the background texture stays continuous under both. */}
      <section
        className="relative"
        style={{
          backgroundImage: `url(/images/locations/${location.slug}/section-bg.avif)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'repeat',
          backgroundPosition: '0 0',
        }}
      >
        <TabsBar active={active} onChange={setActive} />
        <div className="max-w-[1180px] mx-auto px-4 lg:px-0 pt-10 pb-[220px] lg:pb-[360px]">
          {active === 'overview' && <OverviewPane location={location} name={name} />}
          {active === 'order' && <OrderPane location={location} />}
          {active === 'entertainment' && <EntertainmentPane location={location} name={name} />}
          {active === 'deals' && <DealsPane location={location} />}
        </div>
      </section>
    </>
  );
}

function LocationHero({ name, location, address }: { name: string; location: Location; address: string }) {
  return (
    <>
      <DesktopHero name={name} location={location} address={address} />
      <MobileHero name={name} location={location} address={address} />
    </>
  );
}

function DesktopHero({ name, location, address }: { name: string; location: Location; address: string }) {
  const heroBg = `/images/locations/${location.slug}/hero-bg.avif`;
  return (
    <section
      className="hidden lg:flex relative w-full flex-col items-center justify-end overflow-hidden"
      style={{ height: '500px' }}
    >
      <Image src={heroBg} alt="" fill priority sizes="100vw" style={{ objectFit: 'cover' }} />

      <Reveal
        onMount
        variant="zoom-in"
        duration={800}
        delay={200}
        className="relative z-[1] w-full"
        style={{ maxWidth: '1180px', marginBottom: '48px' }}
      >
        <div className="flex flex-row items-stretch" style={{ height: '192px' }}>
          <div className="flex items-start justify-center flex-shrink-0" style={{ width: '192px', height: '192px' }}>
            <Image
              src="/images/locations/shared/logo-stamp.svg"
              alt="Eclipse di Luna"
              width={192}
              height={186}
              priority
              style={{ width: '192px', height: '186px' }}
            />
          </div>

          <div
            className="flex flex-col items-start"
            style={{
              width: '604px',
              height: '192px',
              paddingLeft: '24px',
              justifyContent: 'space-between',
            }}
          >
            <h1
              style={{
                fontFamily: FONT_H,
                fontSize: '36px',
                lineHeight: '44px',
                fontWeight: 400,
                color: '#FFFFFF',
                margin: '20px 0 10px',
              }}
            >
              {name}
            </h1>
            <p
              style={{
                fontFamily: FONT_B,
                fontSize: '24px',
                lineHeight: '20px',
                fontWeight: 600,
                color: '#C55F29',
                margin: '0 0 10px',
              }}
            >
              RESTAURANT &amp; TAPAS BAR
            </p>
            <div
              className="flex items-center"
              style={{ height: '64px', gap: '8px', justifyContent: 'flex-start' }}
            >
              <MapPinIcon />
              <a
                href={location.links.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: FONT_B,
                  fontSize: '22px',
                  lineHeight: '26px',
                  fontWeight: 400,
                  color: '#FDF8ED',
                  textDecoration: 'none',
                }}
              >
                {address}
              </a>
            </div>
          </div>

          <div
            className="flex flex-col items-end"
            style={{
              width: '385px',
              height: '192px',
              justifyContent: 'center',
              gap: '34px',
            }}
          >
            <HeroButton href={location.links.menu} label="Menu" />
            <HeroButton href={location.links.reservations} external label="Reservations" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function MobileHero({ name, location, address }: { name: string; location: Location; address: string }) {
  return (
    <section
      className="lg:hidden relative w-full"
      style={{
        backgroundColor: '#372822',
        padding: '112px 16px 24px',
      }}
    >
      <Reveal onMount variant="zoom-in" duration={800} delay={200}>
      <h1
        style={{
          fontFamily: FONT_H,
          fontSize: '26px',
          lineHeight: '44px',
          fontWeight: 400,
          color: '#FEFAF5',
          margin: '0 0 4px',
        }}
      >
        {name}
      </h1>
      <p
        style={{
          fontFamily: FONT_B,
          fontSize: '16px',
          lineHeight: '22px',
          fontWeight: 600,
          color: '#FAE8D3',
          margin: '0 0 16px',
        }}
      >
        RESTAURANT &amp; TAPAS BAR
      </p>
      <div className="flex items-center gap-2" style={{ marginBottom: '24px' }}>
        <MapPinIcon />
        <a
          href={location.links.googleMaps}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: FONT_B,
            fontSize: '16px',
            lineHeight: '22px',
            fontWeight: 400,
            color: '#FDF8ED',
            textDecoration: 'none',
          }}
        >
          {address}
        </a>
      </div>

      <a
        href={location.links.menu}
        className="flex items-center justify-center w-full transition-colors duration-200"
        style={{
          height: '36px',
          padding: '10px 14px',
          backgroundColor: '#F4CE9F',
          border: '1px solid #F4CE9F',
          borderRadius: '500px',
          marginBottom: '12px',
        }}
      >
        <span
          style={{
            fontFamily: FONT_B,
            fontSize: '16px',
            lineHeight: '20px',
            fontWeight: 600,
            color: '#780C06',
            textTransform: 'none',
          }}
        >
          SEE MENU
        </span>
      </a>

      <a
        href={location.links.reservations}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-full transition-colors duration-200"
        style={{
          height: '45px',
          padding: '10px 14px',
          backgroundColor: '#110601',
          border: '1px solid #F6D8B2',
          borderRadius: '500px',
        }}
      >
        <span
          style={{
            fontFamily: FONT_B,
            fontSize: '15px',
            lineHeight: '20px',
            fontWeight: 600,
            color: '#F6D8B2',
            textTransform: 'none',
          }}
        >
          RESERVATIONS
        </span>
      </a>
      </Reveal>
    </section>
  );
}

function HeroButton({ href, label, external, mobileFullWidth }: { href: string; label: string; external?: boolean; mobileFullWidth?: boolean }) {
  const props = external ? { target: '_blank', rel: 'noopener noreferrer' as const } : {};
  return (
    <a
      href={href}
      {...props}
      className="inline-flex items-center justify-center gap-[5px] transition-colors duration-200"
      style={{
        width: mobileFullWidth ? '100%' : '235px',
        height: '46px',
        padding: '10px 14px',
        backgroundColor: '#110601',
        border: '1px solid #F6D8B2',
        borderRadius: '500px',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#791C11')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#110601')}
    >
      <span
        style={{
          fontFamily: FONT_B,
          fontSize: '18px',
          lineHeight: '24px',
          fontWeight: 600,
          color: '#F6D8B2',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </a>
  );
}

function TabsBar({ active, onChange }: { active: TabKey; onChange: (k: TabKey) => void }) {
  return (
    <div className="sticky z-10 w-full" style={{ top: '72px' }}>
      <div
        className="hidden lg:flex items-center justify-center"
        style={{
          paddingTop: '10px',
          paddingBottom: '10px',
          minHeight: '62px',
          backgroundColor: 'transparent',
          borderBottom: '1px solid #935E1D',
        }}
      >
        {TABS.map((t) => (
          <TabButtonDesktop key={t.key} label={t.label} isActive={active === t.key} onClick={() => onChange(t.key)} />
        ))}
      </div>
      <div
        className="lg:hidden flex items-center overflow-x-auto w-full"
        style={{
          minHeight: '54px',
          backgroundColor: '#352923',
          paddingLeft: '16px',
          paddingRight: '16px',
          gap: '10px',
        }}
      >
        {TABS.map((t) => (
          <TabButtonMobile key={t.key} label={t.label} isActive={active === t.key} onClick={() => onChange(t.key)} />
        ))}
      </div>
    </div>
  );
}

function TabButtonDesktop({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  const [hover, setHover] = useState(false);
  const bg = isActive ? '#780C06' : hover ? '#110601' : 'transparent';
  const color = isActive ? '#FEFAF5' : hover ? '#FFFFFF' : '#780C06';
  // Constant pill radius prevents a shape jump on hover; invisible when bg is transparent.
  const radius = '500px';
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex items-center justify-center cursor-pointer transition-all duration-200"
      style={{
        width: '286px',
        maxHeight: '44px',
        padding: '9px 30px',
        margin: '0 5px',
        borderRadius: radius,
        backgroundColor: bg,
      }}
    >
      <span
        style={{
          fontFamily: FONT_B,
          fontSize: '16px',
          lineHeight: '20px',
          fontWeight: 600,
          textAlign: 'center',
          color,
          whiteSpace: 'nowrap',
          transition: 'color 0.2s',
        }}
      >
        {label}
      </span>
    </button>
  );
}

function TabButtonMobile({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 flex items-center justify-center cursor-pointer transition-all duration-200"
      style={{
        minHeight: '52px',
        padding: '9px 30px',
        backgroundColor: 'transparent',
        borderBottom: isActive ? '2px solid #EDEBEA' : '2px solid transparent',
        borderRadius: 0,
      }}
    >
      <span
        style={{
          fontFamily: FONT_B,
          fontSize: '16px',
          lineHeight: '20px',
          fontWeight: isActive ? 800 : 400,
          color: isActive ? '#EDEBEA' : '#C8C2BF',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </button>
  );
}

function OverviewPane({ location, name }: { location: Location; name: string }) {
  return (
    <Reveal variant="fade-up" duration={600} onMount>
    <div className="flex flex-col lg:flex-row items-start" style={{ gap: '0', width: '100%', maxWidth: '1180px' }}>
      <div
        className="flex flex-col items-start w-full"
        style={{ maxWidth: '558px', marginRight: 'clamp(16px, 4vw, 64px)' }}
      >
        <h1
          style={{
            fontFamily: FONT_H,
            fontSize: 'clamp(40px, 5vw, 64px)',
            lineHeight: '44px',
            fontWeight: 400,
            color: '#333333',
            margin: '20px 0 0',
          }}
        >
          {name}
        </h1>

        <p
          className="lg:hidden"
          style={{
            fontFamily: FONT_B,
            fontSize: '18px',
            lineHeight: '22px',
            fontWeight: 600,
            color: '#D0570F',
            margin: '0 0 10px',
          }}
        >
          RESTAURANT &amp; TAPAS BAR
        </p>

        <div
          style={{
            fontFamily: FONT_B,
            fontSize: 'clamp(18px, 2vw, 24px)',
            lineHeight: '24px',
            fontWeight: 600,
            color: '#333333',
            padding: '24px 0',
          }}
        >
          {location.description.split('\n\n').map((p, i, arr) => (
            <p key={i} style={{ margin: 0, marginBottom: i < arr.length - 1 ? '24px' : 0 }}>
              {p}
            </p>
          ))}
        </div>

        <ContactCard
          href={location.links.googleMaps}
          external
          icon="map"
          text={`${location.contact.address}. ${location.contact.city}, ${location.contact.state} ${location.contact.zip}`}
          className="text-block-33"
        />
        <ContactCard
          href={`tel:${location.contact.phone}`}
          icon="phone"
          text={location.contact.phone}
          className="text-block-34"
        />
        <ContactCard
          href={`mailto:${location.contact.email}`}
          icon="mail"
          text={location.contact.email}
          className="text-block-35"
        />
      </div>

      <div
        className="flex flex-col w-full"
        style={{ maxWidth: '558px', gap: '24px', flex: '1' }}
      >
        <TasteCard href={location.links.menu} />
        <HoursCard hours={location.hours} reservationHref={location.links.reservations} />
      </div>
    </div>
    </Reveal>
  );
}

function TasteCard({ href }: { href: string }) {
  return (
    <div
      className="flex items-center"
      style={{
        backgroundColor: '#903934',
        backgroundImage: 'url(/images/locations/shared/taste-bg.svg)',
        backgroundPosition: '0 0',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto',
        borderRadius: '8px',
        padding: '36px',
        minHeight: '262px',
      }}
    >
      <div className="flex flex-col w-full items-center lg:items-start text-center lg:text-left" style={{ maxWidth: '486px' }}>
        <h2
          style={{
            fontFamily: FONT_H,
            fontSize: '36px',
            lineHeight: '44px',
            fontWeight: 400,
            color: '#FEFAF5',
            margin: '0 0 10px',
          }}
        >
          A Taste of Our Essence
        </h2>
        <p
          style={{
            fontFamily: FONT_B,
            fontSize: '18px',
            lineHeight: '20px',
            fontWeight: 400,
            color: '#FEFAF5',
            margin: '0 0 16px',
          }}
        >
          Discover Latin and Spanish flavors meant to be shared and celebrated. Each dish reflects culture, passion, and vibrant nights.
        </p>
        <div className="w-full flex justify-center lg:justify-end">
          <OverviewButton href={href} label="SEE MENU" width={152} />
        </div>
      </div>
    </div>
  );
}

function HoursCard({ hours, reservationHref }: { hours: Location['hours']; reservationHref: string }) {
  return (
    <div
      className="flex justify-center items-center"
      style={{
        backgroundColor: '#FAE8D3',
        backgroundImage: 'url(/images/locations/shared/hours-bg.svg)',
        backgroundPosition: '0 0',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto',
        borderRadius: '8px',
        padding: '36px',
      }}
    >
      <div className="flex flex-col w-full items-center lg:items-start" style={{ maxWidth: '486px' }}>
        <h2
          className="text-center lg:text-left"
          style={{
            fontFamily: FONT_H,
            fontSize: '36px',
            lineHeight: '44px',
            fontWeight: 400,
            color: '#201814',
            margin: '0 0 10px',
          }}
        >
          Visiting Hours
        </h2>

        <div className="flex flex-col w-full">
          {hours.map((h) => (
            <HoursRow key={h.day} day={h.day} time={`${h.open} - ${h.close}`} />
          ))}
        </div>

        <div className="w-full flex justify-center lg:justify-end" style={{ marginTop: '20px' }}>
          <OverviewButton href={reservationHref} label="RESERVE A TABLE" width={213} external />
        </div>
      </div>
    </div>
  );
}

function HoursRow({ day, time }: { day: string; time: string }) {
  return (
    <div
      className="flex items-center w-full justify-center lg:justify-between gap-6 lg:gap-0"
      style={{
        minHeight: '46px',
        padding: '12px 0',
        borderBottom: '1px solid rgba(32, 24, 20, 0.12)',
      }}
    >
      <p
        className="lg:flex-1"
        style={{
          fontFamily: FONT_B,
          fontSize: '18px',
          lineHeight: '20px',
          fontWeight: 700,
          color: '#201814',
          margin: 0,
        }}
      >
        {day}
      </p>
      <p
        className="text-center lg:text-right"
        style={{
          fontFamily: FONT_B,
          fontSize: '18px',
          lineHeight: '20px',
          fontWeight: 400,
          color: '#201814',
          margin: 0,
        }}
      >
        {time}
      </p>
    </div>
  );
}

function OverviewButton({
  href,
  label,
  width,
  external,
}: {
  href: string;
  label: string;
  width: number;
  external?: boolean;
}) {
  const props = external ? { target: '_blank', rel: 'noopener noreferrer' as const } : {};
  return (
    <a
      href={href}
      {...props}
      className="inline-flex items-center justify-center transition-colors duration-200"
      style={{
        width: `${width}px`,
        maxWidth: '100%',
        height: '40px',
        padding: '10px 14px',
        backgroundColor: '#110601',
        border: '1px solid #F6D8B2',
        borderRadius: '500px',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#791C11')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#110601')}
    >
      <span
        style={{
          fontFamily: FONT_B,
          fontSize: '18px',
          lineHeight: '24px',
          fontWeight: 600,
          color: '#F6D8B2',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </a>
  );
}

function ContactCard({
  href,
  external,
  icon,
  text,
  className,
}: {
  href: string;
  external?: boolean;
  icon: 'map' | 'phone' | 'mail';
  text: string;
  className?: string;
}) {
  const props = external ? { target: '_blank', rel: 'noopener noreferrer' as const } : {};
  return (
    <a
      href={href}
      {...props}
      data-class={className}
      className="flex items-center gap-3 w-full"
      style={{
        backgroundColor: '#FCF0E1',
        height: '64px',
        padding: '0 24px',
        borderRadius: '8px',
        marginBottom: '24px',
        color: '#4A2617',
        textDecoration: 'none',
      }}
    >
      <span className="flex-shrink-0">
        {icon === 'map' && <MapPinIcon color="#4A2617" />}
        {icon === 'phone' && <PhoneIcon />}
        {icon === 'mail' && <MailIcon />}
      </span>
      <span
        className="text-[18px] leading-[21px] lg:text-[22px] lg:leading-[26px]"
        style={{
          fontFamily: FONT_B,
          fontWeight: 400,
          color: '#4A2617',
        }}
      >
        {text}
      </span>
    </a>
  );
}

function OrderPane({ location }: { location: Location }) {
  return (
    <Reveal variant="fade-up" duration={600} onMount>
    <div
      className="flex flex-col lg:flex-row justify-center items-center w-full mt-5 lg:mt-[130px]"
      style={{ gap: '16px' }}
    >
      <a
        href={location.links.orderOnline}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-[240px] lg:h-[300px]"
        style={{
          maxWidth: '500px',
          borderRadius: '8px',
          backgroundImage: 'url(/images/locations/order/toast-card.avif)',
          backgroundPosition: '50%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
        aria-label="Order with Toast"
      />
      <a
        href={location.links.delivery || 'https://www.ubereats.com/'}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-[240px] lg:h-[300px]"
        style={{
          maxWidth: '500px',
          borderRadius: '8px',
          backgroundImage: 'url(/images/locations/order/uber-card.avif)',
          backgroundPosition: '50%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
        aria-label="Order with Uber Eats"
      />
    </div>
    </Reveal>
  );
}

function EntertainmentPane({ location, name }: { location: Location; name: string }) {
  return (
    <Reveal variant="fade-up" duration={600} onMount>
    <div className="flex flex-col w-full" style={{ maxWidth: '1180px', margin: '0 auto' }}>
      <div
        className="flex items-center justify-between w-full"
        style={{ minHeight: '67px', marginBottom: '16px' }}
      >
        <h2
          style={{
            fontFamily: FONT_H,
            fontSize: 'clamp(36px, 4.5vw, 48px)',
            lineHeight: '140%',
            fontWeight: 400,
            color: '#333333',
            width: '75%',
            margin: 0,
          }}
        >
          {name}
        </h2>
        <a
          href="https://www.instagram.com/eclipsediluna/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-[10px] transition-colors"
          style={{
            backgroundColor: '#000000',
            border: '1px solid #F4CE9F',
            borderRadius: '500px',
            padding: '10px 20px',
            minWidth: '200px',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#780C06')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#000000')}
        >
          <Image
            src="/images/locations/shared/icon-ig-tabler.svg"
            alt=""
            width={24}
            height={24}
            style={{ filter: 'brightness(0) saturate(100%) invert(85%) sepia(21%) saturate(506%) hue-rotate(337deg) brightness(97%) contrast(91%)' }}
          />
          <span
            style={{
              fontFamily: FONT_B,
              fontSize: '16px',
              lineHeight: '16px',
              fontWeight: 600,
              color: '#F4CE9F',
              textTransform: 'uppercase',
            }}
          >
            <span className="hidden lg:inline">See all on instagram</span>
            <span className="lg:hidden">Instagram</span>
          </span>
        </a>
      </div>

      {location.entertainment.items.map((item, i) => (
        <div key={`${item.day}-${i}`} className="flex flex-col w-full">
          <div
            className="flex items-center w-full"
            style={{
              minHeight: '46px',
              borderBottom: '1px solid #887A74',
            }}
          >
            <div
              style={{
                fontFamily: FONT_B,
                fontSize: '18px',
                lineHeight: '120%',
                fontWeight: 700,
                color: '#333333',
              }}
            >
              {item.day}
            </div>
          </div>
          <div
            className="flex items-center w-full"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              justifyContent: 'space-between',
              minHeight: '144px',
              margin: '16px 0',
            }}
          >
            <div
              className="relative flex-shrink-0 overflow-hidden w-[114px] lg:w-[10%]"
              style={{
                minWidth: '114px',
                maxWidth: '114px',
                aspectRatio: '1 / 1',
                margin: '12px',
                borderRadius: '8px',
              }}
            >
              {item.image ? (
                <Image src={item.image} alt="" fill sizes="120px" style={{ objectFit: 'cover' }} />
              ) : (
                <div className="w-full h-full" style={{ backgroundColor: '#201814' }} />
              )}
            </div>
            <div
              className="flex flex-col justify-center flex-1"
              style={{
                minHeight: '144px',
                padding: '0 16px 0 0',
                gap: '4px',
              }}
            >
              <div
                className="text-[18px] lg:text-[24px] font-bold lg:font-semibold"
                style={{
                  fontFamily: FONT_B,
                  lineHeight: '140%',
                  color: '#333333',
                }}
              >
                {item.type}
              </div>
              <div
                className="text-[14px] lg:text-[18px]"
                style={{
                  fontFamily: FONT_B,
                  lineHeight: '140%',
                  fontWeight: 700,
                  color: '#7C4127',
                }}
              >
                {item.time}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    </Reveal>
  );
}

function DealsPane({ location }: { location: Location }) {
  return (
    <Reveal variant="fade-up" duration={600} onMount>
    <div className="flex justify-center w-full">
      <a
        href={`${location.links.menu}#happy-hour`}
        className="hidden lg:block w-full"
        style={{
          maxWidth: '1180px',
          height: '480px',
          backgroundImage: 'url(/images/locations/shared/deals-bg.avif)',
          backgroundPosition: '50%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
        }}
        aria-label="View happy hour deals"
      />
      <a
        href={`${location.links.menu}#happy-hour`}
        className="lg:hidden w-full"
        style={{
          maxWidth: '1180px',
          height: '270px',
          borderRadius: '8px',
          backgroundImage: 'url(/images/locations/shared/happy-hour.avif)',
          backgroundPosition: '50%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
        aria-label="View happy hour deals"
      />
    </div>
    </Reveal>
  );
}

function MapPinIcon({ color = '#FDF8ED' }: { color?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M11.5 11.2998C10.837 11.2998 10.2011 11.0364 9.73223 10.5676C9.26339 10.0987 9 9.46285 9 8.7998C9 8.13676 9.26339 7.50088 9.73223 7.03204C10.2011 6.5632 10.837 6.2998 11.5 6.2998C12.163 6.2998 12.7989 6.5632 13.2678 7.03204C13.7366 7.50088 14 8.13676 14 8.7998C14 9.12811 13.9353 9.4532 13.8097 9.75651C13.6841 10.0598 13.4999 10.3354 13.2678 10.5676C13.0356 10.7997 12.76 10.9839 12.4567 11.1095C12.1534 11.2351 11.8283 11.2998 11.5 11.2998ZM11.5 1.7998C9.64348 1.7998 7.86301 2.5373 6.55025 3.85006C5.2375 5.16281 4.5 6.94329 4.5 8.7998C4.5 14.0498 11.5 21.7998 11.5 21.7998C11.5 21.7998 18.5 14.0498 18.5 8.7998C18.5 6.94329 17.7625 5.16281 16.4497 3.85006C15.137 2.5373 13.3565 1.7998 11.5 1.7998Z"
        fill={color}
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none" aria-hidden>
      <path
        d="M3 1H7L9 6L6.5 7.5C7.57096 9.67153 9.32847 11.429 11.5 12.5L13 10L18 12V16C18 16.5304 17.7893 17.0391 17.4142 17.4142C17.0391 17.7893 16.5304 18 16 18C12.0993 17.763 8.42015 16.1065 5.65683 13.3432C2.8935 10.5798 1.23705 6.90074 1 3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1Z"
        stroke="#4A2617"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none" aria-hidden>
      <path
        d="M1 3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H17C17.5304 1 18.0391 1.21071 18.4142 1.58579C18.7893 1.96086 19 2.46957 19 3M1 3V13C1 13.5304 1.21071 14.0391 1.58579 14.4142C1.96086 14.7893 2.46957 15 3 15H17C17.5304 15 18.0391 14.7893 18.4142 14.4142C18.7893 14.0391 19 13.5304 19 13V3M1 3L10 9L19 3"
        stroke="#4A2617"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
