import { cn } from '@/lib/cn';
import React from 'react';

type BadgeVariant = 'default' | 'burgundy' | 'gold' | 'outline';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-dark-brown text-cream',
  burgundy: 'bg-burgundy text-white',
  gold: 'bg-gold text-dark-brown',
  outline: 'bg-transparent border border-dark-brown text-dark-brown',
};

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center',
        'font-accent uppercase tracking-wider',
        'text-[11px]',
        'px-2.5 py-1',
        'rounded-full',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
