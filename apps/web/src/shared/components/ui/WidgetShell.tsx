import { Maximize2 } from 'lucide-react';
import React from 'react';

import { cn } from '@/shared/lib/utils';

export interface WidgetShellProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  children: React.ReactNode;
  title?: React.ReactNode;
  delay?: number;
  noPadding?: boolean;
  interactive?: boolean;
  glowColor?: string;
  topGlowColor?: string;
  headerRight?: React.ReactNode;
}

export const WidgetShell: React.FC<WidgetShellProps> = ({
  children,
  className,
  title,
  delay = 0,
  noPadding = false,
  interactive = true,
  glowColor = 'forge-cyan',
  topGlowColor = 'via-forge-cyan/30',
  headerRight,
  style,
  ...props
}) => {
  const glowShadowMap: Record<string, string> = {
    'forge-cyan': 'hover:border-forge-cyan/20',
    'forge-accent': 'hover:border-forge-accent/20',
    'emerald-400': 'hover:border-emerald-400/20',
    'purple-400': 'hover:border-purple-400/20',
    'white': 'hover:border-white/10',
  };

  const glowShadowClass = glowShadowMap[glowColor] || glowShadowMap['forge-cyan'];

  return (
    <div
      className={cn(
        'relative group flex flex-col',
        'bg-[#ffffff]/[0.015] backdrop-blur-xl border border-white/5 rounded-[24px]',
        interactive && 'hover:bg-[#ffffff]/[0.035]',
        interactive && glowShadowClass,
        'transition-all duration-500 ease-spring-out',
        'overflow-hidden',
        className
      )}
      style={{ animationDelay: `${delay}ms`, ...style }}
      {...props}
    >
      <div className={cn(
        'absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-30',
        topGlowColor.startsWith('via-') ? topGlowColor : `via-${topGlowColor}`
      )} />

      {title && (
        <div className="flex items-center justify-between px-6 pt-6 pb-2 relative z-10 select-none">
          <div className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2 font-bold group-hover:text-gray-400 transition-colors">
            {title}
          </div>
          {headerRight ? headerRight : (
            <button className="text-gray-600 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 cursor-pointer">
              <Maximize2 size={12} />
            </button>
          )}
        </div>
      )}

      <div className={cn('flex-1 relative z-10 flex flex-col min-h-0', noPadding ? '' : 'p-6 pt-2')}>{children}</div>
    </div>
  );
};
