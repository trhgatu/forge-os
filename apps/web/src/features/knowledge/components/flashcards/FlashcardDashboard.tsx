'use client';

import { Layers, Plus, BookOpen, Trash2, Play, Brain, CheckCircle, Sparkles } from 'lucide-react';
import React, { useState, useEffect } from 'react';

import { useLanguage } from '@/contexts/LanguageContext';
import { WidgetShell, GlassCard } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import { useFlashcardStore } from '@/shared/store/flashcardStore';

import { FlashcardReviewSession } from './FlashcardReviewSession';

export const FlashcardDashboard: React.FC = () => {
  const { language, t } = useLanguage();
  const decks = useFlashcardStore((state) => state.decks);
  const loadDecks = useFlashcardStore((state) => state.loadDecks);
  const createDeck = useFlashcardStore((state) => state.createDeck);
  const deleteDeck = useFlashcardStore((state) => state.deleteDeck);
  const dueCards = useFlashcardStore((state) => state.dueCards);
  const loadDueCards = useFlashcardStore((state) => state.loadDueCards);
  const activeDeckId = useFlashcardStore((state) => state.activeDeckId);
  const setActiveDeck = useFlashcardStore((state) => state.setActiveDeck);
  const isLoading = useFlashcardStore((state) => state.isLoading);

  const [isReviewing, setIsReviewing] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTheme, setNewTheme] = useState('from-indigo-600 to-cyan-500');

  useEffect(() => {
    loadDecks();
    loadDueCards(); // Loads globally due cards
  }, []);

  const handleStartReview = async (deckId?: string) => {
    setActiveDeck(deckId || null);
    await loadDueCards(deckId);
    setIsReviewing(true);
  };

  const handleCreateDeckSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    await createDeck(newTitle.trim(), newDesc.trim(), newTheme);
    setNewTitle('');
    setNewDesc('');
    setShowCreateModal(false);
  };

  const themes = [
    { name: 'Cosmic Indigo', value: 'from-indigo-600 to-cyan-500 shadow-indigo-500/10' },
    { name: 'Stoic Gold', value: 'from-amber-600 to-rose-600 shadow-amber-500/10' },
    { name: 'Techno Emerald', value: 'from-emerald-600 to-teal-500 shadow-emerald-500/10' },
    { name: 'Alchemical Purple', value: 'from-purple-600 to-pink-500 shadow-purple-500/10' },
  ];

  if (isReviewing) {
    return (
      <div className="w-full max-w-4xl mx-auto py-8">
        <FlashcardReviewSession onClose={() => {
          setIsReviewing(false);
          loadDecks(); // reload decks to refresh counts
          loadDueCards();
        }} />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-6 md:p-8 max-w-[1600px] mx-auto w-full space-y-6 overflow-y-auto scrollbar-hide">

      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-forge-accent mb-2 backdrop-blur-md">
            <Brain size={12} className="animate-pulse" /> {t('knowledge.protocol')}
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            {t('knowledge.title')}
          </h1>
          <p className="text-gray-400 mt-1 font-light">
            {t('knowledge.desc')}
          </p>
        </div>

        {/* Global Study Button */}
        {dueCards.length > 0 ? (
          <button
            onClick={() => handleStartReview()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-forge-accent to-pink-600 text-white font-bold hover:shadow-[0_0_25px_rgba(236,72,153,0.3)] transition-all cursor-pointer hover:scale-105 active:scale-95 shrink-0"
          >
            <Play size={18} fill="currentColor" />
            <span>{t('knowledge.review_all')} ({dueCards.length} {t('knowledge.cards').toLowerCase()})</span>
          </button>
        ) : (
          <div className="px-5 py-3 rounded-xl bg-white/5 border border-white/5 text-xs font-mono text-gray-500 flex items-center gap-2">
            <CheckCircle size={16} className="text-emerald-400" />
            <span>{t('knowledge.reviews_completed')}</span>
          </div>
        )}
      </div>

      {/* 2. Decks Grid & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* STATS PANELS */}
        <div className="md:col-span-1 flex flex-col gap-6">
          <WidgetShell
            interactive={true}
          >
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1 font-bold">
              {t('knowledge.due_reviews')}
            </span>
            <div className="text-5xl font-display font-bold text-white tracking-tight">
              {dueCards.length}
            </div>
            <p className="text-xs text-gray-400 mt-2 font-light">
              {t('knowledge.due_reviews_desc')}
            </p>
          </WidgetShell>

          <WidgetShell
            interactive={true}
          >
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1 font-bold">
              {t('knowledge.total_cards')}
            </span>
            <div className="text-5xl font-display font-bold text-white tracking-tight">
              {Array.isArray(decks) ? decks.reduce((acc, d) => acc + (d._count?.cards ?? 0), 0) : 0}
            </div>
            <p className="text-xs text-gray-400 mt-2 font-light">
              {t('knowledge.total_cards_desc')}
            </p>
          </WidgetShell>

          {/* Quick Create Trigger */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="w-full relative group flex items-center justify-center gap-2 p-5 rounded-[24px] bg-[#ffffff]/[0.015] border border-white/5 hover:bg-[#ffffff]/[0.035] hover:border-white/20 hover:-translate-y-1 transition-all duration-500 ease-spring-out text-xs font-bold text-white uppercase tracking-widest cursor-pointer overflow-hidden shadow-lg"
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-30" />
            <Plus size={16} className="text-gray-400 group-hover:text-white transition-colors" />
            <span>{t('knowledge.create_deck')}</span>
          </button>
        </div>

        {/* DECKS LIST */}
        <div className="md:col-span-3">
          {!Array.isArray(decks) || decks.length === 0 ? (
            <div className="h-[360px] flex flex-col items-center justify-center text-center p-8 bg-[#ffffff]/[0.015] backdrop-blur-xl border border-dashed border-white/10 rounded-[24px]">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 text-gray-400">
                <Layers size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                {t('knowledge.no_decks')}
              </h3>
              <p className="text-sm text-gray-500 max-w-sm mb-6">
                {t('knowledge.no_decks_desc')}
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-5 py-2.5 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-all cursor-pointer shadow-md active:scale-95"
              >
                {t('knowledge.create_deck')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {decks.map((deck) => {
                // Parse deck gradient to match alchemical top-line glows
                const isIndigo = deck.colorTheme?.includes('indigo') || !deck.colorTheme;
                const isAmber = deck.colorTheme?.includes('amber');
                const isEmerald = deck.colorTheme?.includes('emerald');
                const isPurple = deck.colorTheme?.includes('purple');

                const topGlowColor = isIndigo ? 'via-cyan-400' :
                  isAmber ? 'via-amber-400' :
                    isEmerald ? 'via-emerald-400' : 'via-pink-400';

                return (
                  <div
                    key={deck.id}
                    className="relative group flex flex-col bg-[#ffffff]/[0.015] backdrop-blur-xl border border-white/5 rounded-[24px] hover:bg-[#ffffff]/[0.035] hover:border-white/10 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(255,255,255,0.01)] transition-all duration-500 ease-spring-out p-6 overflow-hidden"
                  >
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
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none" />

                    {/* Top Header */}
                    <div className="flex justify-between items-start mb-4 relative z-10">
                      <span className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-white shrink-0">
                        <BookOpen size={16} />
                      </span>

                      <button
                        onClick={() => deleteDeck(deck.id)}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-white/50 hover:text-red-400 border border-white/5 hover:border-red-500/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 active:scale-90 cursor-pointer"
                        title={t('knowledge.delete_deck')}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    {/* Body */}
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
                        onClick={() => handleStartReview(deck.id)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors shadow-md active:scale-95 cursor-pointer"
                      >
                        <Play size={12} fill="currentColor" />
                        <span>{t('knowledge.forge')}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 3. CREATE DECK FORM MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <GlassCard className="w-full max-w-md p-8 relative animate-in zoom-in-95 duration-200 bg-[#0e0e13]/90">
            <h3 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles size={18} className="text-forge-accent" /> {t('knowledge.create_deck_title')}
            </h3>

            <form onSubmit={handleCreateDeckSubmit} className="space-y-5">
              <div>
                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-2">
                  {t('knowledge.deck_title_label')}
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-all font-light"
                  placeholder={t('knowledge.deck_title_placeholder')}
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-2">
                  {t('knowledge.deck_description_label')}
                </label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-all font-light h-20 resize-none"
                  placeholder={t('knowledge.deck_description_placeholder')}
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-2">
                  {t('knowledge.color_theme_label')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {themes.map((theme) => (
                    <button
                      key={theme.name}
                      type="button"
                      onClick={() => setNewTheme(theme.value)}
                      className={cn(
                        'flex items-center justify-between p-3 rounded-xl border text-[11px] font-medium text-left transition-all',
                        newTheme === theme.value
                          ? 'border-white/40 bg-white/10 text-white font-bold'
                          : 'border-white/5 bg-white/5 text-gray-400 hover:bg-white/10'
                      )}
                    >
                      <span>{theme.name}</span>
                      <div className={cn('w-3.5 h-3.5 rounded-full bg-gradient-to-r shrink-0 ml-2', theme.value.split(' ')[0], theme.value.split(' ')[1])} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all text-xs font-bold uppercase tracking-wider"
                >
                  {t('knowledge.cancel')}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-white text-black hover:bg-gray-200 transition-all text-xs font-bold uppercase tracking-wider"
                >
                  {t('knowledge.create')}
                </button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}
    </div>
  );
};
