import * as React from 'react';

import { cn } from '@/shared/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  gradient?: boolean;
  interactive?: boolean;
  noPadding?: boolean;
  innerClassName?: string;
}

export function GlassCard({
  className,
  children,
  gradient = false,
  interactive = false,
  noPadding = false,
  innerClassName,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl shadow-2xl transition-all duration-300',

        gradient && 'before:absolute before:inset-0 before:pointer-events-none',

        interactive && 'hover:border-white/20 cursor-pointer',

        !noPadding && 'p-6',

        className,
      )}
      {...props}
    >
      <div className={cn('relative z-10', innerClassName)}>{children}</div>
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}


