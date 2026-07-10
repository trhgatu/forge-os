'use client';

import { Brain, Plus, CheckCircle } from 'lucide-react';
import React from 'react';

import { WidgetShell } from '@/shared/components/ui';

interface StatsPanelProps {
  t: (key: string) => string;
  dueCardsCount: number;
  totalCardsCount: number;
  onCreateDeckClick: () => void;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({
  t,
  dueCardsCount,
  totalCardsCount,
  onCreateDeckClick,
}) => {
  return (
    <div className="md:col-span-1 flex flex-col gap-6">
      <WidgetShell interactive={true}>
        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1 font-bold">
          {t('knowledge.due_reviews')}
        </span>
        <div className="text-5xl font-display font-bold text-white tracking-tight">
          {dueCardsCount}
        </div>
        <p className="text-xs text-gray-400 mt-2 font-light">
          {t('knowledge.due_reviews_desc')}
        </p>
      </WidgetShell>

      <WidgetShell interactive={true}>
        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1 font-bold">
          {t('knowledge.total_cards')}
        </span>
        <div className="text-5xl font-display font-bold text-white tracking-tight">
          {totalCardsCount}
        </div>
        <p className="text-xs text-gray-400 mt-2 font-light">
          {t('knowledge.total_cards_desc')}
        </p>
      </WidgetShell>

      {/* Quick Create Trigger */}
      <button
        onClick={onCreateDeckClick}
        className="w-full relative group flex items-center justify-center gap-2 p-5 rounded-[24px] bg-[#ffffff]/[0.015] border border-white/5 hover:bg-[#ffffff]/[0.035] hover:border-white/20 hover:-translate-y-1 transition-all duration-500 ease-spring-out text-xs font-bold text-white uppercase tracking-widest cursor-pointer overflow-hidden shadow-lg"
      >
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-30" />
        <Plus size={16} className="text-gray-400 group-hover:text-white transition-colors" />
        <span>{t('knowledge.create_deck')}</span>
      </button>
    </div>
  );
};
