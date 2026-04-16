import { cn } from '@/lib/cn';

type SeparatorVariant = 'line' | 'ornament' | 'dots';

interface SeparatorProps {
  variant?: SeparatorVariant;
  color?: string;
  className?: string;
}

export function Separator({ variant = 'line', color, className }: SeparatorProps) {
  if (variant === 'dots') {
    return (
      <div
        className={cn('flex items-center justify-center gap-2 text-gold', className)}
        style={color ? { color } : undefined}
        aria-hidden="true"
      >
        <span aria-label="decorative dots">· · ·</span>
      </div>
    );
  }

  if (variant === 'ornament') {
    return (
      <div
        className={cn('flex items-center justify-center', className)}
        aria-hidden="true"
      >
        <svg
          width="120"
          height="20"
          viewBox="0 0 120 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={color ? { color } : undefined}
          className="text-gold"
        >
          <path
            d="M0 10 Q15 2 30 10 Q45 18 60 10 Q75 2 90 10 Q105 18 120 10"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <circle cx="60" cy="10" r="3" fill="currentColor" />
        </svg>
      </div>
    );
  }

  // line variant (default)
  return (
    <hr
      role="separator"
      className={cn('border-none h-px w-full bg-gold', className)}
      style={color ? { backgroundColor: color } : undefined}
    />
  );
}
