'use client';

import { Layers, Play, Brain, CheckCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/shared/components/ui';
import { useFlashcardStore } from '@/shared/store/flashcardStore';

import {
  useFlashcardDecks,
  useDueFlashcards,
  useCreateFlashcardDeck,
  useDeleteFlashcardDeck
} from '../hooks/useFlashcards';

import { CreateDeckModal } from './CreateDeckModal';
import { DeckCard } from './DeckCard';
import { FlashcardReviewSession } from './FlashcardReviewSession';
import { StatsPanel } from './StatsPanel';

export const FlashcardDashboard: React.FC = () => {
  const { language, t } = useLanguage();
  const { data: decks = [], refetch: refetchDecks, isLoading: isLoadingDecks } = useFlashcardDecks();
  const { data: dueCards = [], refetch: refetchDue } = useDueFlashcards();
  const createDeckMutation = useCreateFlashcardDeck();
  const deleteDeckMutation = useDeleteFlashcardDeck();

  const setActiveDeck = useFlashcardStore((state) => state.setActiveDeck);

  const [isReviewing, setIsReviewing] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    refetchDecks();
    refetchDue();
  }, []);

  const handleStartReview = async (deckId?: string) => {
    setActiveDeck(deckId || null);
    setIsReviewing(true);
  };

  const handleCreateDeckSubmit = async (data: { title: string; description: string; colorTheme: string }) => {
    await createDeckMutation.mutateAsync({
      title: data.title,
      description: data.description,
      colorTheme: data.colorTheme,
    });
    setShowCreateModal(false);
  };

  const totalCardsCount = Array.isArray(decks)
    ? decks.reduce((acc, d) => acc + (d._count?.cards ?? 0), 0)
    : 0;

  if (isReviewing) {
    return (
      <div className="w-full max-w-4xl mx-auto py-8">
        <FlashcardReviewSession
          onClose={() => {
            setIsReviewing(false);
            refetchDecks();
            refetchDue();
          }}
        />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-6 md:p-8 max-w-[1600px] mx-auto w-full space-y-6 overflow-y-auto scrollbar-hide">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-forge-cyan mb-2 backdrop-blur-md">
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
          <Button
            onClick={() => handleStartReview()}
            variant="default"
            size="lg"
            className="flex items-center gap-2 shrink-0"
          >
            <Play size={18} fill="currentColor" />
            <span>{t('knowledge.review_all')} ({dueCards.length} {t('knowledge.cards').toLowerCase()})</span>
          </Button>
        ) : (
          <div className="px-5 py-3 rounded-xl bg-white/5 border border-white/5 text-xs font-mono text-gray-500 flex items-center gap-2">
            <CheckCircle size={16} className="text-emerald-400" />
            <span>{t('knowledge.reviews_completed')}</span>
          </div>
        )}
      </div>

      {/* 2. Decks Grid & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsPanel
          t={t}
          dueCardsCount={dueCards.length}
          totalCardsCount={totalCardsCount}
          onCreateDeckClick={() => setShowCreateModal(true)}
        />

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
              <Button
                onClick={() => setShowCreateModal(true)}
                variant="default"
              >
                {t('knowledge.create_deck')}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {decks.map((deck) => (
                <DeckCard
                  key={deck.id}
                  deck={deck}
                  t={t}
                  onDelete={(id) => deleteDeckMutation.mutate(id)}
                  onStartReview={(id) => handleStartReview(id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3. CREATE DECK FORM MODAL */}
      {showCreateModal && (
        <CreateDeckModal
          t={t}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateDeckSubmit}
        />
      )}
    </div>
  );
};
