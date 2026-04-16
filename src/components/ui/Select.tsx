'use client';

import { cn } from '@/lib/cn';
import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

export function Select({
  label,
  options,
  placeholder,
  error,
  required,
  className,
  id,
  ...rest
}: SelectProps) {
  const selectId = id || label.toLowerCase().replace(/\s+/g, '-');
  const errorId = error ? `${selectId}-error` : undefined;

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label
        htmlFor={selectId}
        className="font-accent text-[13px] font-medium text-dark-brown"
      >
        {label}
        {required && <span className="ml-1 text-red-600">*</span>}
      </label>

      <div className="relative">
        <select
          id={selectId}
          required={required}
          aria-required={required ? 'true' : undefined}
          aria-describedby={errorId}
          className={cn(
            'w-full appearance-none rounded p-3 border text-sm font-body',
            'bg-cream text-dark-brown',
            'border-gold',
            'focus:outline-none focus:border-burgundy',
            error && 'border-red-600',
            'transition-colors duration-200',
            'pr-10 cursor-pointer'
          )}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Custom chevron */}
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-dark-brown">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
            <path
              d="M1 1L6 7L11 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {error && (
        <span id={errorId} className="text-red-600 text-xs">
          {error}
        </span>
      )}
    </div>
  );
}
