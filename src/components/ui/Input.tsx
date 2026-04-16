'use client';

import { cn } from '@/lib/cn';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
}

export function Input({
  label,
  error,
  hint,
  required,
  className,
  id,
  ...rest
}: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  const errorId = error ? `${inputId}-error` : undefined;
  const hintId = hint ? `${inputId}-hint` : undefined;

  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label
        htmlFor={inputId}
        className="font-accent text-[13px] font-medium text-dark-brown"
      >
        {label}
        {required && <span className="ml-1 text-red-600">*</span>}
      </label>

      <input
        id={inputId}
        required={required}
        aria-required={required ? 'true' : undefined}
        aria-describedby={describedBy}
        className={cn(
          'w-full rounded p-3 border text-sm font-body',
          'bg-cream text-dark-brown',
          'border-gold',
          'focus:outline-none focus:border-burgundy',
          error && 'border-red-600',
          'transition-colors duration-200'
        )}
        {...rest}
      />

      {error && (
        <span id={errorId} className="text-red-600 text-xs">
          {error}
        </span>
      )}

      {hint && !error && (
        <span id={hintId} className="text-muted text-xs">
          {hint}
        </span>
      )}
    </div>
  );
}
