// features/nova/components/NovaGuide.tsx
'use client';

import { Bot, X } from 'lucide-react';
import { useState, useEffect } from 'react';

import { useLanguage } from '@/contexts/LanguageContext';
import { useSound } from '@/contexts';
import { cn } from '@/shared/lib/utils';
import type { View } from '@/shared/types/os';

import { useNovaMessage } from '../hooks/useNovaMessage';
import { useTypewriter } from '../hooks/useTypewriter';
import dynamic from 'next/dynamic';
import { NovaVisualizer } from './NovaVisualizer';

const NovaRobot = dynamic(
  () => import('./NovaRobot').then((mod) => mod.NovaRobot),
  { ssr: false }
);

interface NovaGuideProps {
  currentView: View;
}

export function NovaGuide({ currentView }: NovaGuideProps) {
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(true);
  const { playSound } = useSound();

  // Automatically reopen the chat panel when navigating pages (currentView changes)
  useEffect(() => {
    setIsExpanded(true);
  }, [currentView]);

  const rawMessage = useNovaMessage(currentView, language, 150);
  const { displayed, isTyping } = useTypewriter(rawMessage, {
    minSpeed: 20,
    maxSpeed: 50,
    onTick: () => playSound('tick'),
  });

  const isVisible = Boolean(rawMessage);

  return (
    <div className="pointer-events-none fixed bottom-8 right-16 z-50 flex flex-col items-end">

      {/* Panel */}
      <div
        className={cn(
          'pointer-events-auto mb-6 w-80 origin-bottom-right perspective-1000 transition-all duration-500',
          isVisible && isExpanded
            ? 'translate-y-0 scale-100 opacity-100'
            : 'translate-y-4 scale-95 opacity-0 pointer-events-none',
        )}
      >
        {/* Elegant frosted glass panel */}
        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#07070b]/95 shadow-[0_12px_40px_rgba(0,0,0,0.6)] shadow-cyan-500/5 backdrop-blur-xl">
          {/* Top glow border */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-forge-cyan/50 to-transparent" />

          {/* Top bar */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500 shadow-[0_0_6px_#22d3ee]"></span>
              </span>
              <span className="text-[10px] font-bold tracking-[0.25em] text-white/90 font-mono">
                NOVA CO-PILOT
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 transition-all duration-200 hover:text-white hover:scale-110"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Content */}
          <div className="relative z-10 p-5">
            {/* Visualizer */}
            <NovaVisualizer isActive={isTyping} />

            {/* Message */}
            <div className="min-h-[50px]">
              <div className="font-sans text-[13px] leading-relaxed tracking-wide text-slate-200 font-medium whitespace-pre-line">
                {displayed}
                {isTyping && (
                  <span className="ml-1 inline-block h-3.5 w-[2px] bg-forge-cyan animate-[pulse_0.8s_infinite] align-middle shadow-[0_0_8px_#22D3EE]" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Button and Robot container */}
      <div className="relative flex h-16 w-16 items-center justify-center group">
        {/* Clickable Overlay covering the entire 256px area to handle toggling on 3D model clicks */}
        <div
          onClick={() => setIsExpanded((v) => !v)}
          className="pointer-events-auto cursor-pointer absolute -top-24 -left-24 w-64 h-64 z-[70] rounded-full"
        />

        {/* Core 3D Hologram Robot - Borderless floating projection OUTSIDE button */}
        <NovaRobot isTalking={isTyping} className="absolute -top-24 -left-24 w-64 h-64 pointer-events-none select-none z-[60]" />

        {/* Core button rings */}
        <div
          className={cn(
            'relative z-50 flex h-full w-full items-center justify-center transition-all duration-500',
            isExpanded ? 'scale-100' : 'scale-95 group-hover:scale-105',
          )}
        >
          {/* Rings */}
          <div className="absolute inset-0 rounded-full border border-forge-cyan/30 border-t-transparent animate-[spin_4s_linear_infinite]" />
          <div className="absolute inset-2 rounded-full border border-forge-cyan/40 border-b-transparent animate-[spin_3s_linear_infinite_reverse]" />

          {/* Glow */}
          <div
            className={cn(
              'absolute inset-0 rounded-full bg-forge-cyan/25 blur-xl transition-opacity duration-500',
              isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-80',
            )}
          />

          {/* Status dot */}
          {!isExpanded && (
            <span className="absolute right-1 top-1 flex h-3 w-3 z-50">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-black bg-emerald-500" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}


