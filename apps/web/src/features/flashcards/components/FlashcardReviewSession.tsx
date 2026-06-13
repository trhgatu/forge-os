'use client';

import { Brain } from 'lucide-react';
import React, { useState, useEffect } from 'react';

import { useLanguage } from '@/contexts/LanguageContext';
import { useFlashcardStore } from '@/shared/store/flashcardStore';

import { useDueFlashcards, useReviewFlashcard } from '../hooks/useFlashcards';

import { FlashcardItem } from './FlashcardItem';
import { ReviewHeader } from './ReviewHeader';
import { SM2RatingControls } from './SM2RatingControls';

interface FlashcardReviewSessionProps {
  onClose: () => void;
}

export const FlashcardReviewSession: React.FC<FlashcardReviewSessionProps> = ({ onClose }) => {
  const { language, t } = useLanguage();
  const activeDeckId = useFlashcardStore((state) => state.activeDeckId);
  const { data: dueCards = [] } = useDueFlashcards(activeDeckId || undefined);
  const reviewMutation = useReviewFlashcard();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardStartTime, setCardStartTime] = useState<number>(0);

  const currentCard = dueCards[currentIndex];
  const totalCards = dueCards.length;

  // Initialize timer on mount
  useEffect(() => {
    setCardStartTime(performance.now());
  }, []);

  // Track card loading for performance latency
  useEffect(() => {
    if (currentCard) {
      setCardStartTime(performance.now());
      setIsFlipped(false);
    }
  }, [currentIndex, currentCard]);

  if (totalCards === 0 || !currentCard) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center h-[500px]">
        <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
          <Brain size={32} className="animate-pulse" />
        </div>
        <h2 className="text-2xl font-display font-bold text-white mb-2">
          {t('knowledge.review.peak_recall_achieved')}
        </h2>
        <p className="text-gray-400 max-w-md mx-auto mb-8 font-light">
          {t('knowledge.review.no_cards_due')}
        </p>
        <button
          onClick={onClose}
          className="px-6 py-2.5 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-all cursor-pointer"
        >
          {t('knowledge.review.back_to_forge')}
        </button>
      </div>
    );
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRate = async (rating: number) => {
    const latency = Math.round(performance.now() - cardStartTime);

    // Submit review to backend (recalculates SM-2 parameters)
    await reviewMutation.mutateAsync({ cardId: currentCard.id, rating, responseTimeMs: latency });

    // Advance queue
    if (currentIndex < totalCards - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // End of session, reload lists
      onClose();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-300">
      {/* Inject 3D Card Flipping Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}} />

      {/* 1. Header & Progress */}
      <ReviewHeader
        t={t}
        currentIndex={currentIndex}
        totalCards={totalCards}
        onClose={onClose}
      />

      {/* 2. THE 3D CARD WRAPPER */}
      <FlashcardItem
        currentCard={currentCard}
        isFlipped={isFlipped}
        t={t}
        onFlip={handleFlip}
      />

      {/* 3. SM-2 SPACED REPETITION RATING CONTROLS */}
      <SM2RatingControls
        t={t}
        isFlipped={isFlipped}
        onRate={handleRate}
      />
    </div>
  );
};
