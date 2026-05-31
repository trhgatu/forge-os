import { ArrowUpRight } from 'lucide-react';
import NextLink from 'next/link';
import React from 'react';

import { cn } from '@/shared/lib/utils';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: 'default' | 'card' | 'accent' | 'cyan';
  externalIcon?: boolean;
}

export const Link: React.FC<LinkProps> = ({
  children,
  href,
  className,
  variant = 'default',
  externalIcon = false,
  target,
  rel,
  ...props
}) => {
  const isExternal = href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//');
  
  const baseClasses = cn(
    'transition-all duration-300',
    
    // Default interactive text link
    variant === 'default' && 'text-gray-400 hover:text-white inline-flex items-center gap-1 hover:underline decoration-forge-cyan/50 underline-offset-4',
    
    // Glassmorphic card block link (like the original source widget)
    variant === 'card' && 'flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 group shadow-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] cursor-pointer text-xs text-gray-500 hover:text-gray-300',
    
    // Alchemical themed colored text links
    variant === 'cyan' && 'text-forge-cyan/80 hover:text-forge-cyan hover:underline decoration-forge-cyan/50 underline-offset-4',
    variant === 'accent' && 'text-forge-accent/80 hover:text-forge-accent hover:underline decoration-forge-accent/50 underline-offset-4',
    
    className
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target={target || '_blank'}
        rel={rel || 'noopener noreferrer'}
        className={baseClasses}
        {...props}
      >
        {variant === 'card' ? (
          <>
            <span className="font-sans font-medium">{children}</span>
            <ArrowUpRight size={14} className="text-gray-600 group-hover:text-white transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 shrink-0" />
          </>
        ) : (
          <>
            {children}
            {externalIcon && <ArrowUpRight size={12} className="inline-block shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
          </>
        )}
      </a>
    );
  }

  // Internal route link
  return (
    <NextLink href={href} className={baseClasses} {...props}>
      {children}
    </NextLink>
  );
};
