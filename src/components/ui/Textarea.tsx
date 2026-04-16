'use client';

import { cn } from '@/lib/cn';
import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  rows?: number;
  className?: string;
}

export function Textarea({
  label,
  error,
  hint,
  required,
  rows = 4,
  className,
  id,
  ...rest
}: TextareaProps) {
  const textareaId = id || label.toLowerCase().replace(/\s+/g, '-');
  const errorId = error ? `${textareaId}-error` : undefined;
  const hintId = hint ? `${textareaId}-hint` : undefined;

  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label
        htmlFor={textareaId}
        className="font-accent text-[13px] font-medium text-dark-brown"
      >
        {label}
        {required && <span className="ml-1 text-red-600">*</span>}
      </label>

      <textarea
        id={textareaId}
        rows={rows}
        required={required}
        aria-required={required ? 'true' : undefined}
        aria-describedby={describedBy}
        className={cn(
          'w-full rounded p-3 border text-sm font-body',
          'bg-cream text-dark-brown',
          'border-gold',
          'focus:outline-none focus:border-burgundy',
          error && 'border-red-600',
          'resize-y',
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
