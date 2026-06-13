'use client';

import React from 'react';

import { cn } from '@/shared/lib/utils';

interface SM2RatingControlsProps {
  t: (key: string) => string;
  isFlipped: boolean;
  onRate: (rating: number) => void;
}

export const SM2RatingControls: React.FC<SM2RatingControlsProps> = ({
  t,
  isFlipped,
  onRate,
}) => {
  return (
    <div className={cn(
      'grid grid-cols-4 gap-3 md:gap-4 transition-all duration-300',
      isFlipped ? 'opacity-100 translate-y-0' : 'opacity-20 pointer-events-none translate-y-4'
    )}>
      {/* Quality 1: Again (Lên kế hoạch ôn tập lại lập tức) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRate(1);
        }}
        className="flex flex-col items-center justify-center p-3 rounded-2xl bg-red-950/20 border border-red-500/20 hover:bg-red-950/30 hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] group transition-all text-center cursor-pointer"
      >
        <span className="text-lg md:text-xl font-bold text-red-400">Again</span>
        <span className="text-[9px] font-mono text-red-500/75 uppercase tracking-widest mt-1 block">
          {t('knowledge.review.review_tomorrow')}
        </span>
      </button>

      {/* Quality 2: Hard (Nhớ chật vật) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRate(2);
        }}
        className="flex flex-col items-center justify-center p-3 rounded-2xl bg-orange-950/20 border border-orange-500/20 hover:bg-orange-950/30 hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] group transition-all text-center cursor-pointer"
      >
        <span className="text-lg md:text-xl font-bold text-orange-400">Hard</span>
        <span className="text-[9px] font-mono text-orange-500/75 uppercase tracking-widest mt-1 block">
          {t('knowledge.review.maintain_rhythm')}
        </span>
      </button>

      {/* Quality 3: Good (Nhớ bình thường) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRate(3);
        }}
        className="flex flex-col items-center justify-center p-3 rounded-2xl bg-blue-950/20 border border-blue-500/20 hover:bg-blue-950/30 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] group transition-all text-center cursor-pointer"
      >
        <span className="text-lg md:text-xl font-bold text-blue-400">Good</span>
        <span className="text-[9px] font-mono text-blue-500/75 uppercase tracking-widest mt-1 block">
          {t('knowledge.review.standard_interval')}
        </span>
      </button>

      {/* Quality 4: Easy */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRate(4);
        }}
        className="flex flex-col items-center justify-center p-3 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 hover:bg-cyan-950/30 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] group transition-all text-center cursor-pointer"
      >
        <span className="text-lg md:text-xl font-bold text-cyan-400">Easy</span>
        <span className="text-[9px] font-mono text-cyan-500/75 uppercase tracking-widest mt-1 block">
          {t('knowledge.review.long_interval')}
        </span>
      </button>
    </div>
  );
};
