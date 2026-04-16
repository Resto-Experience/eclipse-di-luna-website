import { cn } from '@/lib/cn';
import React from 'react';

type HeadingAlign = 'left' | 'center' | 'right';
type HeadingLevel = 'h1' | 'h2' | 'h3';
type HeadingTheme = 'dark' | 'light' | 'cream';

interface SectionHeadingProps {
  as?: HeadingLevel;
  align?: HeadingAlign;
  ornamentTop?: boolean;
  ornamentBottom?: boolean;
  eyebrow?: string;
  children: React.ReactNode;
  subheading?: string;
  className?: string;
  theme?: HeadingTheme;
}

const alignClasses: Record<HeadingAlign, string> = {
  left: 'text-left items-start',
  center: 'text-center items-center',
  right: 'text-right items-end',
};

const themeHeadingClasses: Record<HeadingTheme, string> = {
  dark: 'text-cream',
  light: 'text-dark-brown',
  cream: 'text-dark-brown',
};

const themeSubheadingClasses: Record<HeadingTheme, string> = {
  dark: 'text-cream/80',
  light: 'text-dark-brown/80',
  cream: 'text-dark-brown/80',
};

const OrnamentSvg = () => (
  <svg
    width="120"
    height="24"
    viewBox="0 0 120 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="text-gold"
  >
    <path
      d="M0 12 Q20 4 40 12 Q60 20 80 12 Q100 4 120 12"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <circle cx="60" cy="12" r="3" fill="currentColor" />
    <circle cx="40" cy="12" r="2" fill="currentColor" />
    <circle cx="80" cy="12" r="2" fill="currentColor" />
  </svg>
);

export function SectionHeading({
  as: Tag = 'h2',
  align = 'center',
  ornamentTop = false,
  ornamentBottom = false,
  eyebrow,
  children,
  subheading,
  className,
  theme = 'dark',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        alignClasses[align],
        className
      )}
    >
      {ornamentTop && <OrnamentSvg />}

      {eyebrow && (
        <p
          className={cn(
            'font-accent uppercase tracking-[0.15em] text-xs text-burgundy'
          )}
        >
          {eyebrow}
        </p>
      )}

      <Tag
        className={cn(
          'font-heading font-bold text-3xl md:text-4xl lg:text-5xl leading-tight',
          themeHeadingClasses[theme]
        )}
      >
        {children}
      </Tag>

      {subheading && (
        <p
          className={cn(
            'font-body text-base md:text-lg',
            themeSubheadingClasses[theme]
          )}
        >
          {subheading}
        </p>
      )}

      {ornamentBottom && <OrnamentSvg />}
    </div>
  );
}
