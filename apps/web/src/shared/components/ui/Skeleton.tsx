import React from 'react';

import { cn } from '@/shared/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glowing' | 'circle';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'default',
  ...props
}) => {
  return (
    <div
      className={cn(
        'animate-pulse bg-white/[0.04] rounded-lg',
        variant === 'glowing' && 'bg-gradient-to-r from-white/[0.03] via-white/[0.08] to-white/[0.03] border border-white/5 shadow-[inset_0_0_12px_rgba(255,255,255,0.02)]',
        variant === 'circle' && 'rounded-full',
        className
      )}
      {...props}
    />
  );
};
