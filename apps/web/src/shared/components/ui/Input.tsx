import * as React from 'react';

import { cn } from '@/shared/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, icon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-white/10 bg-black/20 py-2 text-sm text-white placeholder:text-gray-500 backdrop-blur-sm transition-all',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-forge-cyan focus-visible:border-forge-cyan/50',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
            icon ? 'pl-9 pr-3' : 'px-3',
            error && 'border-red-500/50 focus-visible:ring-red-500',
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };


