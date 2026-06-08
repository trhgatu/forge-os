import React from 'react';

import { cn } from '@/shared/lib/utils';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'cyan' | 'accent' | 'danger';
  size?: 'sm' | 'md';
  interactive?: boolean;
  active?: boolean;
  disabled?: boolean;
}

export const Tag: React.FC<TagProps> = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  interactive = false,
  active = false,
  disabled = false,
  ...props
}) => {
  return (
    <span
      className={cn(
        // Base structure
        'inline-flex items-center justify-center font-sans font-medium transition-all select-none rounded-xl border',
        
        // Sizes
        size === 'sm' ? 'px-2.5 py-1 text-[10px] tracking-wider uppercase' : 'px-3 py-1.5 text-xs',
        
        // Variants
        variant === 'default' && (
          active
            ? 'border-white/20 bg-white/10 text-white'
            : 'border-white/5 bg-white/5 text-gray-400'
        ),
        variant === 'cyan' && (
          active
            ? 'border-forge-cyan/50 bg-forge-cyan/20 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]'
            : 'border-forge-cyan/20 bg-forge-cyan/5 text-forge-cyan'
        ),
        variant === 'accent' && (
          active
            ? 'border-forge-accent/50 bg-forge-accent/20 text-white shadow-[0_0_15px_rgba(245,158,11,0.2)]'
            : 'border-forge-accent/20 bg-forge-accent/5 text-forge-accent'
        ),
        variant === 'danger' && (
          active
            ? 'border-red-500/50 bg-red-500/20 text-white shadow-[0_0_15px_rgba(239,68,68,0.2)]'
            : 'border-red-500/20 bg-red-500/5 text-red-400'
        ),

        // Interactive states
        interactive && !disabled && 'cursor-pointer active:scale-95',
        interactive && !disabled && variant === 'default' && 'hover:text-white hover:border-white/20 hover:bg-white/[0.08]',
        interactive && !disabled && variant === 'cyan' && 'hover:bg-forge-cyan/10 hover:border-forge-cyan/30 hover:text-white',
        interactive && !disabled && variant === 'accent' && 'hover:bg-forge-accent/10 hover:border-forge-accent/30 hover:text-white',
        interactive && !disabled && variant === 'danger' && 'hover:bg-red-500/10 hover:border-red-500/30 hover:text-white',

        // Disabled states
        disabled && 'opacity-40 pointer-events-none cursor-not-allowed bg-white/[0.01] border-white/5 text-gray-600',
        
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
