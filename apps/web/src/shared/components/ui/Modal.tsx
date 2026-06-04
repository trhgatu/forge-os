'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Label } from './Label';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  maxWidth = 'md',
  showCloseButton = true,
}) => {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with premium glassmorphism blur */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Container Card with subtle border and shadow */}
      <div
        className={cn(
          'relative w-full overflow-visible rounded-3xl border border-white/10 bg-[#09090b]/90 backdrop-blur-xl p-6 shadow-2xl shadow-black/80',
          'animate-in fade-in zoom-in-95 duration-200 ease-out',
          maxWidthClasses[maxWidth],
          className
        )}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-3">
            {title ? (
              <div className="text-white text-base font-bold font-mono tracking-wide uppercase">
                {typeof title === 'string' ? (
                  <Label variant="default" className="text-sm font-bold text-white tracking-wider">
                    {title}
                  </Label>
                ) : (
                  title
                )}
              </div>
            ) : (
              <div />
            )}

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="text-gray-500 hover:text-white hover:bg-white/5 p-1.5 rounded-xl transition-all cursor-pointer select-none"
              >
                <X size={16} />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="text-xs text-gray-300">{children}</div>
      </div>
    </div>
  );
};
