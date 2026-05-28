'use client';

import { Compass } from 'lucide-react';
import React from 'react';

import { cn } from '@/shared/lib/utils';

interface AnchorControlProps {
  isFlowActive: boolean;
  isCooldownActive?: boolean;
  cooldownSecondsLeft?: number;
  language: 'vi' | 'en';
  onTrigger: () => void;
  anchorButtonRef: React.RefObject<HTMLButtonElement | null>;
}

export const AnchorControl: React.FC<AnchorControlProps> = ({
  isFlowActive,
  isCooldownActive = false,
  cooldownSecondsLeft = 0,
  language,
  onTrigger,
  anchorButtonRef,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isDisabled = isFlowActive || isCooldownActive;

  return (
    <button
      ref={anchorButtonRef}
      onClick={onTrigger}
      disabled={isDisabled}
      className={cn(
        'relative w-48 h-48 rounded-full bg-transparent flex flex-col items-center justify-center gap-2.5 transition-all duration-1000 cursor-pointer pointer-events-auto border-none outline-none focus:outline-none z-20',
        isDisabled ? 'scale-[0.97]' : 'hover:scale-[1.02]'
      )}
    >
      <div
        className={cn(
          'absolute inset-8 rounded-full blur-3xl opacity-[0.14] transition-all duration-1000 bg-[#0e7490] animate-pulse',
          isFlowActive && 'scale-[1.4] opacity-[0.3] bg-[#22d3ee] blur-4xl',
          isCooldownActive && 'scale-[1.2] opacity-[0.25] bg-[#d97706] blur-4xl'
        )}
        style={{ animationDuration: isCooldownActive ? '6s' : '4s' }}
      />
      <div className="text-center space-y-1 relative z-10">
        <Compass
          className={cn(
            'transition-colors mx-auto animate-pulse',
            isFlowActive && 'text-[#22d3ee] animate-spin',
            isCooldownActive && 'text-[#d97706] rotate-45',
            !isFlowActive && !isCooldownActive && 'text-gray-555 hover:text-[#22d3ee]'
          )}
          size={24}
        />
        <span
          className={cn(
            'text-[8px] font-mono uppercase tracking-[0.35em] block',
            isCooldownActive ? 'text-[#d97706]' : 'text-gray-555'
          )}
        >
          {isFlowActive
            ? (language === 'vi' ? 'Đang Neo...' : 'Anchoring...')
            : isCooldownActive
            ? (language === 'vi' ? 'Đang Dệt Sao' : 'Weaving Star')
            : (language === 'vi' ? 'Neo Dòng Chảy' : 'Anchor Flow')}
        </span>
        <h3 className="text-xs font-mono font-light text-gray-400 tracking-[0.2em] uppercase pl-[0.2em]">
          {isFlowActive ? (
            language === 'vi' ? '[ Đồng điệu ]' : '[ Syncing ]'
          ) : isCooldownActive ? (
            `[ ${formatTime(cooldownSecondsLeft)} ]`
          ) : (
            language === 'vi' ? '[ Kích hoạt ]' : '[ Synchronize ]'
          )}
        </h3>
      </div>
    </button>
  );
};
