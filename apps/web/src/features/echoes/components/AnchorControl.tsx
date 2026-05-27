'use client';

import { Compass } from 'lucide-react';
import React from 'react';

import { cn } from '@/shared/lib/utils';

interface AnchorControlProps {
  isFlowActive: boolean;
  language: 'vi' | 'en';
  onTrigger: () => void;
  anchorButtonRef: React.RefObject<HTMLButtonElement | null>;
}

export const AnchorControl: React.FC<AnchorControlProps> = ({
  isFlowActive,
  language,
  onTrigger,
  anchorButtonRef,
}) => {
  return (
    <button
      ref={anchorButtonRef}
      onClick={onTrigger}
      disabled={isFlowActive}
      className={cn(
        'relative w-48 h-48 rounded-full bg-transparent flex flex-col items-center justify-center gap-2.5 transition-all duration-1000 cursor-pointer pointer-events-auto border-none outline-none focus:outline-none z-20',
        isFlowActive ? 'scale-[0.97]' : 'hover:scale-[1.02]'
      )}
    >
      <div
        className={cn(
          'absolute inset-8 rounded-full blur-3xl opacity-[0.14] transition-all duration-1000 bg-[#0e7490] animate-pulse',
          isFlowActive && 'scale-[1.4] opacity-[0.3] bg-[#22d3ee] blur-4xl'
        )}
        style={{ animationDuration: '4s' }}
      />
      <div className="text-center space-y-1 relative z-10">
        <Compass className="text-gray-500 hover:text-[#22d3ee] transition-colors mx-auto animate-pulse" size={24} />
        <span className="text-[8px] font-mono text-gray-555 uppercase tracking-[0.35em] block">
          {isFlowActive ? (language === 'vi' ? 'Đang Dệt Sao' : 'Weaving Star') : (language === 'vi' ? 'Neo Dòng Chảy' : 'Anchor Flow')}
        </span>
        <h3 className="text-xs font-mono font-light text-gray-400 tracking-[0.2em] uppercase pl-[0.2em]">
          {language === 'vi' ? '[ Kích hoạt ]' : '[ Synchronize ]'}
        </h3>
      </div>
    </button>
  );
};
