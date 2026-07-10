'use client';

import { BookOpen, Trash2, Play } from 'lucide-react';
import React from 'react';

import { Button } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';

interface DeckCardProps {
  deck: any;
  t: (key: string) => string;
  onDelete: (id: string) => void;
  onStartReview: (id: string) => void;
}

export const DeckCard: React.FC<DeckCardProps> = ({ deck, t, onDelete, onStartReview }) => {
  const isIndigo = deck.colorTheme?.includes('indigo') || !deck.colorTheme;
  const isAmber = deck.colorTheme?.includes('amber');
  const isEmerald = deck.colorTheme?.includes('emerald');

  const topGlowColor = isIndigo ? 'via-cyan-400' :
    isAmber ? 'via-amber-400' :
      isEmerald ? 'via-emerald-400' : 'via-pink-400';

  return (
    <div className="relative group flex flex-col bg-[#ffffff]/[0.015] backdrop-blur-xl border border-white/5 rounded-[24px] hover:bg-[#ffffff]/[0.035] hover:border-white/10 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(255,255,255,0.01)] transition-all duration-500 ease-spring-out p-6 overflow-hidden">
      {/* Alchemical dynamic glowing top line */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-30",
        topGlowColor
      )} />

      {/* Ambient bottom gradient reflection */}
      <div className={cn(
        "absolute bottom-[-20%] right-[-20%] w-32 h-32 blur-3xl opacity-10 group-hover:opacity-20 transition-all duration-700 pointer-events-none rounded-full bg-gradient-to-br",
        deck.colorTheme || 'from-indigo-600 to-cyan-500'
      )} />

      {/* Subtle noise overlay */}
      <div className="absolute inset-0 bg-[url('/images/noise.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none" />

      {/* Top Header */}
      <div className="flex justify-between items-start mb-4 relative z-10">
        <span className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-white shrink-0">
          <BookOpen size={16} />
        </span>

        <Button
          onClick={() => onDelete(deck.id)}
          className="p-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-white/50 hover:text-red-400 border border-white/5 hover:border-red-500/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 active:scale-90 cursor-pointer"
          title={t('knowledge.delete_deck')}
        >
          <Trash2 size={14} />
        </Button>
      </div>

      <div className="space-y-1 mb-8 relative z-10">
        <h3 className="text-xl font-bold text-white tracking-wide truncate">
          {deck.title}
        </h3>
        <p className="text-xs text-white/70 font-light line-clamp-2 h-8">
          {deck.description || t('knowledge.no_description')}
        </p>
      </div>

      {/* Footer & Active Review */}
      <div className="flex items-center justify-between mt-auto relative z-10">
        <span className="text-xs font-mono text-white/80 bg-white/5 px-3 py-1 rounded-full border border-white/5">
          {deck._count?.cards ?? 0} {t('knowledge.cards')}
        </span>

        <button
          onClick={() => onStartReview(deck.id)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors shadow-md active:scale-95 cursor-pointer"
        >
          <Play size={12} fill="currentColor" />
          <span>{t('knowledge.forge')}</span>
        </button>
      </div>
    </div>
  );
};
