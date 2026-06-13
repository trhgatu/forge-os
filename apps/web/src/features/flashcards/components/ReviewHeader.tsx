'use client';

import { ArrowLeft } from 'lucide-react';
import React from 'react';

interface ReviewHeaderProps {
  t: (key: string) => string;
  currentIndex: number;
  totalCards: number;
  onClose: () => void;
}

export const ReviewHeader: React.FC<ReviewHeaderProps> = ({
  t,
  currentIndex,
  totalCards,
  onClose,
}) => {
  return (
    <div className="flex items-center justify-between">
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={14} /> {t('knowledge.review.exit')}
      </button>
      <div className="flex items-center gap-3">
        <div className="w-48 bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
          <div
            className="bg-forge-cyan h-full rounded-full transition-all duration-300 shadow-[0_0_10px_#22D3EE]"
            style={{ width: `${(currentIndex / totalCards) * 100}%` }}
          />
        </div>
        <span className="text-xs font-mono text-gray-400">
          {currentIndex + 1} / {totalCards} {t('knowledge.review.cards')}
        </span>
      </div>
    </div>
  );
};
