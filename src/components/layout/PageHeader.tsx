import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/cn';
import { Container } from '@/components/ui/Container';

type PageHeaderHeight = 'sm' | 'md' | 'lg';
type PageHeaderAlign = 'left' | 'center';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  height?: PageHeaderHeight;
  overlayOpacity?: number;
  align?: PageHeaderAlign;
}

const heightClasses: Record<PageHeaderHeight, string> = {
  sm: 'h-[240px]',
  md: 'h-[360px]',
  lg: 'h-[480px]',
};

export function PageHeader({
  title,
  subtitle,
  backgroundImage,
  height = 'md',
  overlayOpacity = 0.5,
  align = 'center',
}: PageHeaderProps) {
  const isCenter = align === 'center';

  return (
    <section
      className={cn(
        'relative flex items-center overflow-hidden',
        heightClasses[height]
      )}
    >
      {/* Background image */}
      <Image
        src={backgroundImage}
        alt={`${title} background`}
        fill
        className="object-cover"
        priority
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: `rgba(31, 24, 21, ${overlayOpacity})`,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 w-full">
        <Container>
          <div
            className={cn(
              'flex flex-col gap-3',
              isCenter ? 'items-center text-center' : 'items-start text-left'
            )}
          >
            <h1 className="font-heading font-bold text-white text-3xl md:text-5xl leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="font-body text-lg md:text-xl" style={{ color: 'rgba(252, 248, 238, 0.8)' }}>
                {subtitle}
              </p>
            )}
          </div>
        </Container>
      </div>
    </section>
  );
}
