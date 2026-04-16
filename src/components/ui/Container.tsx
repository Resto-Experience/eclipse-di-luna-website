import { cn } from '@/lib/cn';
import React from 'react';

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface ContainerProps {
  as?: keyof React.JSX.IntrinsicElements;
  size?: ContainerSize;
  className?: string;
  children: React.ReactNode;
}

const sizeClasses: Record<ContainerSize, string> = {
  sm: 'max-w-sm mx-auto px-4 md:px-6',
  md: 'max-w-3xl mx-auto px-4 md:px-6',
  lg: 'max-w-5xl mx-auto px-4 lg:px-8',
  xl: 'max-w-7xl mx-auto px-4 lg:px-8',
  full: 'w-full mx-auto px-4 lg:px-8',
};

export function Container({
  as: Tag = 'div',
  size = 'xl',
  className,
  children,
}: ContainerProps) {
  return (
    <Tag className={cn(sizeClasses[size], className)}>
      {children}
    </Tag>
  );
}
