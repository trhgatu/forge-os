import React from 'react';

import { cn } from '@/shared/lib/utils';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  glowColor?: 'cyan' | 'accent' | 'default';
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  className,
  icon,
  title,
  description,
  size = 'md',
  glowColor = 'default',
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        // Base glass card layout with premium dashed borders
        'relative border border-dashed flex flex-col items-center justify-center text-center rounded-2xl bg-white/[0.01] transition-all duration-300 group overflow-hidden',
        
        // Sizes
        size === 'sm' && 'p-6 min-h-[160px]',
        size === 'md' && 'p-8 min-h-[240px]',
        size === 'lg' && 'p-12 min-h-[360px]',

        // Glow color schemas
        glowColor === 'default' && 'border-white/10 hover:border-white/20',
        glowColor === 'cyan' && 'border-forge-cyan/15 hover:border-forge-cyan/30 hover:bg-forge-cyan/[0.01]',
        glowColor === 'accent' && 'border-forge-accent/15 hover:border-forge-accent/30 hover:bg-forge-accent/[0.01]',
        
        className
      )}
      {...props}
    >
      {/* Visual background subtle particle glow */}
      <div 
        className={cn(
          'absolute w-32 h-32 blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none z-0',
          glowColor === 'default' && 'bg-white/5',
          glowColor === 'cyan' && 'bg-forge-cyan/10',
          glowColor === 'accent' && 'bg-forge-accent/10'
        )} 
      />

      <div className="relative z-10 flex flex-col items-center max-w-sm">
        {/* Icon wrapper with glowing glass circle */}
        {icon && (
          <div 
            className={cn(
              'p-4 rounded-full border mb-4 shrink-0 transition-transform duration-500 group-hover:scale-110',
              glowColor === 'default' && 'bg-white/5 border-white/10 text-gray-400 group-hover:text-white',
              glowColor === 'cyan' && 'bg-forge-cyan/5 border-forge-cyan/10 text-forge-cyan group-hover:text-white group-hover:border-forge-cyan/20 shadow-[0_0_15px_rgba(6,182,212,0.05)]',
              glowColor === 'accent' && 'bg-forge-accent/5 border-forge-accent/10 text-forge-accent group-hover:text-white group-hover:border-forge-accent/20 shadow-[0_0_15px_rgba(245,158,11,0.05)]'
            )}
          >
            {icon}
          </div>
        )}

        <h4 className="text-sm font-mono tracking-wider text-white font-bold uppercase mb-1.5">
          {title}
        </h4>

        {description && (
          <p className="text-xs text-gray-500 font-light leading-relaxed mb-5">
            {description}
          </p>
        )}

        {children && <div className="mt-1 flex items-center justify-center">{children}</div>}
      </div>
    </div>
  );
};
