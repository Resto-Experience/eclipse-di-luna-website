import { cn } from '@/lib/cn';
import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  target?: '_blank' | '_self';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-burgundy text-white hover:bg-[color:color-mix(in_srgb,var(--color-burgundy)_90%,black)] border-transparent',
  secondary:
    'bg-transparent text-burgundy border border-burgundy hover:bg-burgundy hover:text-white',
  ghost:
    'bg-transparent text-white border border-white hover:bg-white hover:text-dark-brown',
  link: 'bg-transparent text-burgundy border-transparent hover:underline px-0',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'py-2 px-4 text-xs',
  md: 'py-3 px-6 text-sm',
  lg: 'py-4 px-8 text-base',
};

const Spinner = () => (
  <span
    role="status"
    aria-label="Loading"
    className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
  />
);

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  target,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  className,
  children,
  onClick,
  type = 'button',
  'aria-label': ariaLabel,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const baseClasses = cn(
    'inline-flex items-center justify-center gap-2',
    'font-accent uppercase tracking-widest',
    'transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-burgundy',
    'rounded',
    variantClasses[variant],
    sizeClasses[size],
    isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
  );

  const content = (
    <>
      {loading && <Spinner />}
      {!loading && icon && iconPosition === 'left' && icon}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && icon}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className={baseClasses}
        aria-label={ariaLabel}
        aria-disabled={isDisabled ? 'true' : undefined}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={baseClasses}
      aria-label={ariaLabel}
      aria-disabled={isDisabled ? 'true' : undefined}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
