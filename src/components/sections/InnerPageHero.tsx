import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';

export function InnerPageHero({
  title,
  subtitle,
  icon,
  iconWidth = 72,
  iconHeight = 72,
  bgDesktop,
  bgMobile,
  titleMaxWidth,
  lineHeight = '44px',
  height = 'lg:h-[495px]',
}: {
  title: string;
  subtitle?: string;
  icon?: string;
  iconWidth?: number;
  iconHeight?: number;
  bgDesktop: string;
  bgMobile?: string;
  titleMaxWidth?: string;
  lineHeight?: string;
  height?: string;
}) {
  return (
    <section className={`relative w-full h-[616px] ${height} flex flex-col items-center justify-center overflow-hidden`}>
      <Image
        src={bgMobile || bgDesktop}
        alt=""
        fill
        priority
        className="object-cover lg:hidden"
        sizes="100vw"
      />
      <Image
        src={bgDesktop}
        alt=""
        fill
        priority
        className="object-cover hidden lg:block"
        sizes="100vw"
      />
      <Reveal onMount variant="zoom-in" duration={800} delay={200} className="relative z-10 flex flex-col items-center text-center px-4">
        {icon && (
          <Image
            src={icon}
            alt=""
            width={iconWidth}
            height={iconHeight}
            style={{ width: `${iconWidth}px`, height: `${iconHeight}px` }}
          />
        )}
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(42px, 5vw, 72px)',
            lineHeight,
            fontWeight: 400,
            color: '#FFFFFF',
            marginTop: '20px',
            marginBottom: '10px',
            maxWidth: titleMaxWidth,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="text-[24px] lg:text-[32px] leading-[32px] text-[#FAE8D3] lg:text-[#D0570F]"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
            }}
          >
            {subtitle}
          </p>
        )}
      </Reveal>
    </section>
  );
}
