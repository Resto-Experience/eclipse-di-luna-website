'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import type { Location, LocationSlug } from '@/types/location';
import type { LocationMenu, MenuItem, MenuTab, MenuTag } from '@/types/menu';

// Format varies per location: Beltline is street-only, others include city/state/zip.
const MENU_HERO_ADDRESS: Record<LocationSlug, string> = {
  alpharetta: '6710 Town Square 120. Alpharetta, GA. 30005',
  beltline: '661 Auburn AVE NE STE 220',
  buckhead: '764 Miami Cir NE Atlanta, GA. 30324',
  dunwoody: '4505 Ashford Dunwoody Road. Dunwoody, GA. 30346',
};

export function MenuPage({ location, menu }: { location: Location; menu: LocationMenu }) {
  const name = location.slug.charAt(0).toUpperCase() + location.slug.slice(1);
  const address = MENU_HERO_ADDRESS[location.slug];
  const hasBrunch = menu.tabs.some((t) => t.id === 'brunch');

  return (
    <>
      <MenuHero name={name} location={location} address={address} hasBrunch={hasBrunch} />
      <MenuContent menu={menu} />
    </>
  );
}

function MapPinIcon({ size = 24, color = '#FDF8ED' }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ color, flexShrink: 0 }}
    >
      <path
        d="M11.5 11.2998C10.837 11.2998 10.2011 11.0364 9.73223 10.5676C9.26339 10.0987 9 9.46285 9 8.7998C9 8.13676 9.26339 7.50088 9.73223 7.03204C10.2011 6.5632 10.837 6.2998 11.5 6.2998C12.163 6.2998 12.7989 6.5632 13.2678 7.03204C13.7366 7.50088 14 8.13676 14 8.7998C14 9.12811 13.9353 9.4532 13.8097 9.75651C13.6841 10.0598 13.4999 10.3354 13.2678 10.5676C13.0356 10.7997 12.76 10.9839 12.4567 11.1095C12.1534 11.2351 11.8283 11.2998 11.5 11.2998ZM11.5 1.7998C9.64348 1.7998 7.86301 2.5373 6.55025 3.85006C5.2375 5.16281 4.5 6.94329 4.5 8.7998C4.5 14.0498 11.5 21.7998 11.5 21.7998C11.5 21.7998 18.5 14.0498 18.5 8.7998C18.5 6.94329 17.7625 5.16281 16.4497 3.85006C15.137 2.5373 13.3565 1.7998 11.5 1.7998Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MenuHero({ name, location, address, hasBrunch }: { name: string; location: Location; address: string; hasBrunch: boolean }) {
  return (
    <>
      <DesktopMenuHero name={name} location={location} address={address} hasBrunch={hasBrunch} />
      <MobileMenuHero name={name} location={location} address={address} hasBrunch={hasBrunch} />
    </>
  );
}

function DesktopMenuHero({ name, location, address, hasBrunch }: { name: string; location: Location; address: string; hasBrunch: boolean }) {
  const locationHref = `/location-${location.slug}`;
  return (
    <section
      className="hidden lg:flex relative w-full flex-col items-center justify-end overflow-hidden"
      style={{ height: '500px' }}
    >
      <Image src={location.heroImage} alt="" fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
      <Reveal onMount variant="zoom-in" duration={800} delay={200} className="relative z-[1] w-full" style={{ maxWidth: '1180px', marginBottom: '48px' }}>
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
            style={{ width: '604px', height: '192px', paddingLeft: '24px', justifyContent: 'space-between' }}
          >
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', lineHeight: '44px', fontWeight: 400, color: '#FFFFFF', margin: '20px 0 10px' }}>
              {name}
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '24px', lineHeight: '20px', fontWeight: 600, color: '#C55F29', margin: '0 0 10px' }}>
              RESTAURANT &amp; TAPAS BAR
            </p>
            <div className="flex items-center" style={{ height: '64px', gap: '8px' }}>
              <MapPinIcon size={24} color="#FDF8ED" />
              <a
                href={location.links.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: 'var(--font-body)', fontSize: '22px', lineHeight: '26px', fontWeight: 700, color: '#FDF8ED', textDecoration: 'none' }}
              >
                {address}
              </a>
            </div>
          </div>
          <div className="flex flex-col items-end" style={{ width: '385px', height: '192px', justifyContent: 'center', gap: '12px' }}>
            <HeroButton href={locationHref} variant="dark">
              See More About
            </HeroButton>
            {hasBrunch && (
              <HeroButton href="#section-brunch" variant="brunch">
                Brunch
              </HeroButton>
            )}
            <HeroButton href="#section-happy-hour" variant="brunch">
              Happy Hour
            </HeroButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function MobileMenuHero({ name, location, address, hasBrunch }: { name: string; location: Location; address: string; hasBrunch: boolean }) {
  const locationHref = `/location-${location.slug}`;
  return (
    <section
      className="lg:hidden relative w-full"
      style={{ backgroundColor: '#372822', padding: '112px 16px 24px' }}
    >
      <Reveal onMount variant="zoom-in" duration={800} delay={200}>
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '26px',
            lineHeight: '44px',
            fontWeight: 400,
            color: '#FEFAF5',
            margin: '20px 0 10px',
          }}
        >
          {name}
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            lineHeight: '20px',
            fontWeight: 600,
            color: '#FAE8D3',
            margin: '0 0 10px',
          }}
        >
          RESTAURANT &amp; TAPAS BAR
        </p>

        <div className="flex items-center" style={{ height: '64px', paddingRight: 0, gap: 0 }}>
          <span style={{ paddingRight: '10px', display: 'inline-flex' }}>
            <MapPinIcon size={24} color="#F4CE9F" />
          </span>
          <a
            href={location.links.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: 700,
              color: '#F4CE9F',
              textDecoration: 'none',
            }}
          >
            {address}
          </a>
        </div>

        <a
          href={locationHref}
          className="flex items-center justify-center"
          style={{
            width: '100%',
            height: '40px',
            maxHeight: '40px',
            padding: '10px 14px',
            backgroundColor: '#110601',
            border: '1px solid #F6D8B2',
            borderRadius: '500px',
            color: '#F6D8B2',
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            lineHeight: '20px',
            fontWeight: 600,
            textTransform: 'uppercase',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            marginTop: '10px',
          }}
        >
          See More About
        </a>

        <div className="flex flex-row" style={{ gap: '5px', marginTop: '10px' }}>
          {hasBrunch && (
            <a
              href="#section-brunch"
              className="flex items-center justify-center"
              style={{
                flex: 1,
                height: '40px',
                maxHeight: '40px',
                padding: '9px 10px',
                backgroundColor: '#791C11',
                border: '1px solid #F6D8B2',
                borderRadius: '500px',
                color: '#F6D8B2',
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                lineHeight: '100%',
                fontWeight: 600,
                textTransform: 'capitalize',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              BRUNCH
            </a>
          )}
          <a
            href="#section-happy-hour"
            className="flex items-center justify-center"
            style={{
              flex: 1,
              height: '40px',
              maxHeight: '40px',
              padding: '9px 10px',
              backgroundColor: '#791C11',
              border: '1px solid #F6D8B2',
              borderRadius: '500px',
              color: '#F6D8B2',
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              lineHeight: '100%',
              fontWeight: 600,
              textTransform: 'capitalize',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            HAPPY HOUR
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function HeroButton({
  href,
  children,
  variant,
  fullWidth = false,
}: {
  href: string;
  children: React.ReactNode;
  variant: 'dark' | 'brunch';
  fullWidth?: boolean;
}) {
  const isBrunch = variant === 'brunch';
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="inline-flex items-center justify-center"
      style={{
        width: fullWidth ? '100%' : '235px',
        minWidth: '150px',
        maxHeight: isBrunch ? '44px' : '48px',
        height: isBrunch ? '44px' : '46px',
        padding: isBrunch ? '9px 30px' : '10px 14px',
        backgroundColor: isBrunch
          ? hover
            ? '#100602'
            : '#791C11'
          : hover
          ? '#791C11'
          : '#110601',
        border: '1px solid #F6D8B2',
        borderRadius: '500px',
        color: '#F6D8B2',
        fontFamily: 'var(--font-body)',
        fontSize: '18px',
        lineHeight: '24px',
        fontWeight: 600,
        textTransform: 'uppercase',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        transition: 'all 0.3s',
      }}
    >
      {children}
    </a>
  );
}

// Brunch and Happy Hour are reachable only via hero anchor buttons, never from the sidebar.
const NAV_TAB_IDS = new Set(['cocktails', 'tapas', 'entrees', 'dessert', 'wine', 'beer', 'maycocktails']);

function MenuContent({ menu }: { menu: LocationMenu }) {
  const navTabs = menu.tabs.filter((t) => NAV_TAB_IDS.has(t.id));
  const [activeTab, setActiveTab] = useState(navTabs[0]?.id ?? '');
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const tabId = visible[0].target.getAttribute('data-tab-id');
          if (tabId && NAV_TAB_IDS.has(tabId)) setActiveTab(tabId);
        }
      },
      { rootMargin: '-120px 0px -60% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sectionRefs.current.forEach((el, id) => {
      if (NAV_TAB_IDS.has(id)) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [menu.tabs]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    const el = sectionRefs.current.get(tabId);
    if (el) {
      // Mobile has stacked sticky navbar + tabs; desktop has only the navbar.
      const isMobile = window.innerWidth < 1024;
      const offset = isMobile ? 180 : 110;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="menu-top"
      className="relative lg:pt-[56px] pb-[80px] lg:pb-[250px] lg:bg-[url(/images/locations/shared/menu-bg.avif)] lg:bg-cover lg:bg-no-repeat lg:bg-fixed lg:bg-left-top"
      style={{ backgroundColor: '#DDD3C6' }}
    >
      <MobileTabs tabs={navTabs} activeTab={activeTab} onTabClick={handleTabClick} />

      <div
        className="mx-auto px-4 lg:px-0 pt-[24px] lg:pt-0"
        style={{ maxWidth: '1180px' }}
      >
        <div
          className="lg:grid"
          style={{
            gridTemplateColumns: '.25fr 1fr',
            gap: '48px',
          }}
        >
          <DesktopTabs tabs={navTabs} activeTab={activeTab} onTabClick={handleTabClick} />

          {/* Render every tab section so anchor links to Brunch/Happy Hour still scroll. */}
          <div className="min-w-0 flex flex-col">
            {menu.tabs.map((tab) => (
              <div
                key={tab.id}
                ref={(el) => {
                  if (el) sectionRefs.current.set(tab.id, el);
                }}
                data-tab-id={tab.id}
                id={`section-${tab.id}`}
                className="scroll-mt-[180px] lg:scroll-mt-[120px]"
              >
                <TabBlock tab={tab} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DesktopTabs({ tabs, activeTab, onTabClick }: { tabs: MenuTab[]; activeTab: string; onTabClick: (id: string) => void }) {
  return (
    <aside className="hidden lg:block" style={{ paddingRight: '20px' }}>
      <div className="sticky" style={{ top: '120px' }}>
        <nav className="flex flex-col" style={{ gap: '10px' }}>
          {tabs.map((tab) => (
            <TabLink
              key={tab.id}
              label={tab.label}
              isActive={activeTab === tab.id}
              onClick={() => onTabClick(tab.id)}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
}

function TabLink({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  const [hover, setHover] = useState(false);
  const activeBg = '#780C06';
  const activeColor = '#FEFAF5';
  const idleBg = 'transparent';
  const idleColor = '#780C06';

  const bg = isActive ? activeBg : hover ? activeBg : idleBg;
  const color = isActive ? activeColor : hover ? activeColor : idleColor;
  // Idle and hover share a radius so hover only swaps color, avoiding a shape jump.
  const radius = isActive ? '20px' : '100px';

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="text-left cursor-pointer transition-all duration-200"
      style={{
        width: '260px',
        padding: '9px 30px',
        backgroundColor: bg,
        color,
        borderRadius: radius,
        fontFamily: 'var(--font-body)',
        fontSize: '16px',
        fontWeight: 600,
        lineHeight: '22px',
        textTransform: 'capitalize',
        textDecoration: 'none',
      }}
    >
      {label}
    </button>
  );
}

function MobileTabs({ tabs, activeTab, onTabClick }: { tabs: MenuTab[]; activeTab: string; onTabClick: (id: string) => void }) {
  const navRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => {
    const nav = navRef.current;
    const btn = tabRefs.current.get(activeTab);
    if (!nav || !btn) return;
    const btnCenter = btn.offsetLeft + btn.offsetWidth / 2;
    const target = btnCenter - nav.clientWidth / 2;
    nav.scrollTo({ left: target, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div
      className="lg:hidden sticky z-10"
      style={{
        top: '84px',
        backgroundColor: '#DDD3C6',
        padding: '10px 16px 14px',
      }}
    >
      <nav
        ref={navRef}
        className="flex items-center overflow-x-auto"
        style={{ gap: '4px', scrollBehavior: 'smooth' }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                if (el) tabRefs.current.set(tab.id, el);
              }}
              type="button"
              onClick={() => onTabClick(tab.id)}
              className="shrink-0 flex items-center justify-center"
              style={{
                minWidth: '115px',
                height: '38px',
                padding: '9px 30px',
                backgroundColor: isActive ? '#780C06' : 'transparent',
                color: isActive ? '#FEFAF5' : '#780C06',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 600,
                lineHeight: '20px',
                textDecoration: 'none',
                textTransform: 'capitalize',
                whiteSpace: 'nowrap',
                borderRadius: isActive ? '20px' : '100px',
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

function TabBlock({ tab }: { tab: MenuTab }) {
  return (
    <div className="flex flex-col" style={{ gap: '32px' }}>
      {tab.sections.map((section, i) => (
        <section key={`${tab.id}-${i}-${section.name}`} className="flex flex-col">
          <h2
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '22px',
              lineHeight: '30px',
              fontWeight: 700,
              color: '#201814',
              margin: 0,
              padding: '10px 0',
              borderBottom: '1px solid #AF5B37',
            }}
          >
            {section.name}
            {section.priceNote && (
              <span style={{ fontWeight: 400, fontSize: '18px', marginLeft: '12px', color: '#4A2617' }}>
                {section.priceNote}
              </span>
            )}
          </h2>
          <div className="flex flex-wrap" style={{ marginTop: '10px' }}>
            {section.items.map((item, idx) => (
              <div
                key={`${item.name}-${idx}`}
                className="w-full lg:w-1/2"
                style={{ padding: '10px' }}
              >
                <ItemCard item={item} tabId={tab.id} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function getCardMinHeight(tabId: string, hasImage: boolean): string {
  if (!hasImage) {
    if (tabId === 'wine' || tabId === 'beer') return 'auto';
    return 'auto';
  }
  switch (tabId) {
    case 'maycocktails':
      return '500px';
    case 'cocktails':
      return '477px';
    case 'beer':
      return '400px';
    case 'wine':
      return '200px';
    default:
      return '508px';
  }
}

// When every line of a description matches `BrandName(details)` (used by aggregate
// list items like Happy Hour White/Red Wines), render each entry as a styled block:
// the brand name in bold above the parenthesized details. Otherwise render plain.
const BRAND_PAREN_RE = /^(.+?)\((.+)\)\s*$/;

function ItemDescription({ description }: { description: string }) {
  const lines = description.split('\n').map((l) => l.trim()).filter(Boolean);
  const allMatch = lines.length >= 2 && lines.every((l) => BRAND_PAREN_RE.test(l));

  if (allMatch) {
    return (
      <div className="flex flex-col" style={{ marginTop: '8px', gap: '12px' }}>
        {lines.map((line, i) => {
          const m = line.match(BRAND_PAREN_RE)!;
          return (
            <div key={i} className="flex flex-col" style={{ gap: '4px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  lineHeight: '20px',
                  fontWeight: 700,
                  color: '#201814',
                  textAlign: 'center',
                }}
              >
                {m[1].trim()}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  lineHeight: '18px',
                  fontWeight: 400,
                  color: '#4A2617',
                  textAlign: 'center',
                }}
              >
                ({m[2].trim()})
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <p
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        lineHeight: description.includes('\n') ? '20px' : '15px',
        fontWeight: 400,
        color: '#4A2617',
        textAlign: 'center',
        whiteSpace: 'pre-line',
        margin: '8px 0 0',
      }}
    >
      {description}
    </p>
  );
}

function ItemCard({ item, tabId }: { item: MenuItem; tabId: string }) {
  const hasImage = Boolean(item.image);
  const minHeight = getCardMinHeight(tabId, hasImage);

  return (
    <article
      className="flex flex-col items-center justify-center text-center"
      style={{
        backgroundColor: '#FEFAF5',
        borderRadius: '8px',
        padding: '16px',
        minHeight,
        width: '100%',
      }}
    >
      {item.image && (
        <div
          className="relative flex items-center justify-center"
          style={{ width: '100%', height: '300px', overflow: 'hidden' }}
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 1024px) 100vw, 420px"
            style={{ objectFit: 'contain' }}
            loading="lazy"
          />
        </div>
      )}

      {item.tags && item.tags.length > 0 && (
        <div
          className="flex flex-wrap items-center justify-center"
          style={{ gap: '5px', marginTop: '10px' }}
        >
          {item.tags.map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>
      )}

      <h3
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '20px',
          lineHeight: '26px',
          fontWeight: 700,
          color: '#201814',
          textAlign: 'center',
          textTransform: 'capitalize',
          margin: 0,
          marginTop: '10px',
        }}
      >
        {item.name}
      </h3>

      {item.description && <ItemDescription description={item.description} />}

      {item.notes && (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            lineHeight: '18px',
            fontWeight: 400,
            color: '#4A2617',
            textAlign: 'center',
            margin: '6px 0 0',
          }}
        >
          {item.notes}
        </p>
      )}

      {item.subtitle && (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#4A2617',
            textAlign: 'center',
            margin: '6px 0 0',
          }}
        >
          {item.subtitle}
        </p>
      )}

      {item.price && (
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '18px',
            lineHeight: '22px',
            fontWeight: 800,
            color: '#201814',
            textAlign: 'center',
            marginTop: '10px',
          }}
        >
          {item.price}
        </div>
      )}
    </article>
  );
}

const TAG_STYLES: Record<MenuTag, { color: string; bg: string; minWidth: number; icon: string }> = {
  'Gluten Free': { color: '#7B361C', bg: '#FFE2D5', minWidth: 115, icon: '/images/icons/tag-gluten-free.svg' },
  Vegan: { color: '#000000', bg: '#D6F2C6', minWidth: 81, icon: '/images/icons/tag-vegan.svg' },
  Vegetarian: { color: '#0C321C', bg: '#BEE3CC', minWidth: 90, icon: '/images/icons/tag-vegan.svg' },
};

function TagPill({ tag }: { tag: MenuTag }) {
  const s = TAG_STYLES[tag];
  return (
    <span
      className="inline-flex items-center justify-center"
      style={{
        color: s.color,
        backgroundColor: s.bg,
        minWidth: `${s.minWidth}px`,
        padding: '4px 10px',
        gap: '4px',
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        fontWeight: 600,
        lineHeight: '20px',
        whiteSpace: 'nowrap',
      }}
    >
      <Image src={s.icon} alt="" width={18} height={18} style={{ width: '18px', height: '18px' }} />
      {tag}
    </span>
  );
}
