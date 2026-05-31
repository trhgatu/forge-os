import React from 'react';

import { cn } from '@/shared/lib/utils';

export interface LabelProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant?: 'default' | 'cyan' | 'accent' | 'dim';
  icon?: React.ReactNode;
  glow?: boolean;
  badge?: string | number;
}

export const Label: React.FC<LabelProps> = ({
  children,
  className,
  variant = 'default',
  icon,
  glow = false,
  badge,
  ...props
}) => {
  return (
    <h3
      className={cn(
        'font-mono text-xs uppercase tracking-widest flex items-center gap-2 select-none',
        variant === 'default' && 'text-gray-400',
        variant === 'cyan' && 'text-forge-cyan',
        variant === 'accent' && 'text-forge-accent',
        variant === 'dim' && 'text-gray-600',
        className
      )}
      {...props}
    >
      {glow && (
        <span 
          className={cn(
            'w-1.5 h-1.5 rounded-full animate-pulse-slow',
            variant === 'default' && 'bg-white/40 shadow-[0_0_8px_rgba(255,255,255,0.4)]',
            variant === 'cyan' && 'bg-forge-cyan shadow-[0_0_8px_rgba(6,182,212,0.6)]',
            variant === 'accent' && 'bg-forge-accent shadow-[0_0_8px_rgba(245,158,11,0.6)]',
            variant === 'dim' && 'bg-gray-600'
          )}
        />
      )}
      {icon && <span className="shrink-0 opacity-80">{icon}</span>}
      <span>{children}</span>
      {badge !== undefined && (
        <span className="ml-auto px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] text-gray-500 font-mono tracking-normal normal-case">
          {badge}
        </span>
      )}
    </h3>
  );
};
