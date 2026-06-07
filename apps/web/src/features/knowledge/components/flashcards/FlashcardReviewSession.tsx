'use client';

import { Volume2, Undo, Check, Brain, HelpCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

import { useLanguage } from '@/contexts/LanguageContext';
import { GlassCard } from '@/shared/components/ui/GlassCard';
import { cn } from '@/shared/lib/utils';
import { useFlashcardStore } from '@/shared/store/flashcardStore';
import { Button } from '@/shared/components/ui';

interface FlashcardReviewSessionProps {
  onClose: () => void;
}

export const FlashcardReviewSession: React.FC<FlashcardReviewSessionProps> = ({ onClose }) => {
  const { language, t } = useLanguage();
  const dueCards = useFlashcardStore((state) => state.dueCards);
  const submitReview = useFlashcardStore((state) => state.submitReview);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<number>(0);
  const [cardStartTime, setCardStartTime] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentCard = dueCards[currentIndex];
  const totalCards = dueCards.length;

  // Initialize timers
  useEffect(() => {
    setSessionStartTime(Date.now());
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
          className="px-6 py-2.5 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-all"
        >
          {t('knowledge.review.back_to_forge')}
        </button>
      </div>
    );
  }

  const speakWord = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';

      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Microsoft'))
      );
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      window.speechSynthesis.speak(utterance);
    }
  };

  const playAudio = () => {
    const audioUrl = currentCard.vocabulary?.audioUrl;
    const word = currentCard.customFront || '';

    if (audioUrl && !audioUrl.includes('translate.google.com')) {
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play().catch((err) => {
          console.warn('Audio playback failed, falling back to SpeechSynthesis', err);
          speakWord(word);
        });
      } else {
        const audio = new Audio(audioUrl);
        audioRef.current = audio;
        audio.play().catch((err) => {
          console.warn('Audio playback failed, falling back to SpeechSynthesis', err);
          speakWord(word);
        });
      }
    } else {
      speakWord(word);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRate = async (rating: number) => {
    const latency = Math.round(performance.now() - cardStartTime);

    // 1. Submit review to backend (recalculates SM-2 parameters)
    await submitReview(currentCard.id, rating, latency);

    // 2. Advance queue
    if (currentIndex < totalCards - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // End of session, reload lists
      onClose();
    }
  };

  // Helper to safely render synonyms/antonyms
  const renderList = (label: string, items: any[]) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="mt-4">
        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-2">{label}</span>
        <div className="flex flex-wrap gap-1.5">
          {items.slice(0, 5).map((item, idx) => (
            <span key={idx} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-xs text-gray-400">
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-300">
      {/* Inject 3D Card Flipping Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
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
              style={{ width: `${((currentIndex) / totalCards) * 100}%` }}
            />
          </div>
          <span className="text-xs font-mono text-gray-400">
            {currentIndex + 1} / {totalCards} {t('knowledge.review.cards')}
          </span>
        </div>
      </div>

      {/* 2. THE 3D CARD WRAPPER */}
      <div className="w-full aspect-[16/10] md:aspect-[16/9] perspective-1000 relative group cursor-pointer" onClick={handleFlip}>
        <div
          className={cn(
            'w-full h-full relative transition-all duration-700 transform-style-3d shadow-2xl rounded-[24px] border border-white/5',
            isFlipped ? 'rotate-y-180' : ''
          )}
        >
          {/* A. FRONT OF THE CARD */}
          <div className="absolute inset-0 backface-hidden bg-[#ffffff]/[0.015] backdrop-blur-xl rounded-[24px] flex flex-col items-center justify-center p-8 border border-white/5 overflow-hidden">
            {/* Top highlight glow */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-forge-cyan/40 to-transparent z-30" />

            {/* Ambient bottom light */}
            <div className="absolute bottom-[-10%] right-[-10%] w-48 h-48 bg-forge-cyan/10 blur-3xl rounded-full pointer-events-none" />

            <div className="absolute top-6 left-8 text-[10px] font-mono text-forge-cyan uppercase tracking-widest">
              {t('knowledge.review.front_side')}
            </div>

            <div className="text-center space-y-4 relative z-10">
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-wide selection:bg-transparent">
                {currentCard.customFront}
              </h2>
              {currentCard.vocabulary?.ipa && (
                <p className="text-lg font-mono text-gray-400 selection:bg-transparent">
                  {currentCard.vocabulary.ipa}
                </p>
              )}
            </div>

            {/* Audio Button */}
            {currentCard.vocabulary?.audioUrl && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  playAudio();
                }}
                className="mt-8 p-3 rounded-full bg-white/5 hover:bg-white/10 text-forge-cyan hover:text-white transition-all active:scale-90 border border-white/10 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] relative z-10 cursor-pointer"
              >
                <Volume2 size={24} />
              </Button>
            )}

            <div className="absolute bottom-6 text-[10px] font-mono text-gray-600 uppercase tracking-widest animate-pulse z-10">
              {t('knowledge.review.flip_instruction')}
            </div>
          </div>

          {/* B. BACK OF THE CARD */}
          <div className="absolute inset-0 backface-hidden bg-[#ffffff]/[0.015] backdrop-blur-xl rounded-[24px] p-8 border border-white/5 rotate-y-180 overflow-y-auto custom-scrollbar flex flex-col justify-between overflow-hidden">
            {/* Top highlight glow */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-forge-accent/40 to-transparent z-30" />

            {/* Ambient bottom light */}
            <div className="absolute bottom-[-10%] right-[-10%] w-48 h-48 bg-forge-accent/10 blur-3xl rounded-full pointer-events-none" />

            <div className="relative z-10">
              {/* Back Header */}
              <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-3">
                <span className="text-[10px] font-mono text-forge-accent uppercase tracking-widest">
                  {t('knowledge.review.back_side')}
                </span>
                {currentCard.vocabulary?.partOfSpeech && (
                  <span className="px-2 py-0.5 rounded bg-forge-accent/20 border border-forge-accent/20 text-[10px] font-mono text-forge-accent uppercase">
                    {currentCard.vocabulary.partOfSpeech}
                  </span>
                )}
              </div>

              {/* Translation */}
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1">
                    {t('knowledge.review.translation')}
                  </span>
                  <p className="text-2xl font-bold text-white leading-relaxed">
                    {currentCard.customBack}
                  </p>
                </div>

                {/* Dictionary definitions if present (Excluding duplicate Vietnamese translation) */}
                {currentCard.vocabulary?.meanings && (currentCard.vocabulary.meanings as any[]).length > 0 && (
                  <div className="mt-4">
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-2">
                      {t('knowledge.review.definitions')}
                    </span>
                    <div className="space-y-2 text-sm font-light text-gray-300">
                      {(currentCard.vocabulary.meanings as any[])
                        .filter((m: any) => m.partOfSpeech !== 'Vietnamese')
                        .slice(0, 2)
                        .map((m: any, idx) => (
                          <div key={idx} className="p-2.5 rounded bg-white/[0.02] border border-white/5">
                            <span className="text-[10px] font-mono text-forge-cyan uppercase block mb-1">{m.partOfSpeech}</span>
                            <p className="italic font-serif leading-relaxed text-gray-300">
                              - {m.definitions?.[0]}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Usage Examples */}
                {currentCard.vocabulary?.examples && (currentCard.vocabulary.examples as any[]).length > 0 && (
                  <div className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-2">
                      Examples
                    </span>
                    <ul className="space-y-2 text-xs font-light text-gray-300">
                      {(currentCard.vocabulary.examples as any[]).slice(0, 3).map((ex: any, idx) => (
                        <li key={idx} className="font-sans leading-relaxed text-gray-300">
                          • &quot;{ex.en}&quot; {ex.vi && <span className="text-gray-500 block text-[10px] mt-0.5">{ex.vi}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Highlight Context Sentence (Văn cảnh Wikipedia nguồn) */}
                {currentCard.highlightText && (
                  <div className="mt-4 p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-indigo-400 uppercase tracking-widest mb-1.5">
                      <Brain size={12} /> {t('knowledge.review.context_title')}
                    </div>
                    <p className="text-xs font-serif italic text-gray-200 leading-relaxed">
                      &quot;{currentCard.highlightText}&quot;
                    </p>
                    {currentCard.concept && (
                      <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block mt-2">
                        {t('knowledge.review.mined_from')}{currentCard.concept.title}
                      </span>
                    )}
                  </div>
                )}

                {/* Personal Note */}
                {currentCard.personalNote && (
                  <div className="mt-4">
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1">
                      {t('knowledge.review.personal_note')}
                    </span>
                    <p className="text-xs text-gray-400 font-mono italic">
                      {currentCard.personalNote}
                    </p>
                  </div>
                )}

                {/* Synonyms & Antonyms */}
                {currentCard.vocabulary?.meanings && (currentCard.vocabulary.meanings as any[]).length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {renderList(
                      t('knowledge.review.synonyms'),
                      Array.from(
                        new Set(
                          (currentCard.vocabulary.meanings as any[]).flatMap(
                            (m) => m.synonyms || []
                          )
                        )
                      ).filter(Boolean)
                    )}
                    {renderList(
                      'Antonyms',
                      Array.from(
                        new Set(
                          (currentCard.vocabulary.meanings as any[]).flatMap(
                            (m) => m.antonyms || []
                          )
                        )
                      ).filter(Boolean)
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="text-center text-[10px] font-mono text-gray-600 uppercase tracking-widest mt-6 border-t border-white/5 pt-4 relative z-10">
              {t('knowledge.review.back_to_front')}
            </div>
          </div>
        </div>
      </div>

      {/* 3. SM-2 SPACED REPETITION RATING CONTROLS */}
      <div className={cn(
        'grid grid-cols-4 gap-3 md:gap-4 transition-all duration-300',
        isFlipped ? 'opacity-100 translate-y-0' : 'opacity-20 pointer-events-none translate-y-4'
      )}>
        {/* Quality 1: Again (Lên kế hoạch ôn tập lại lập tức) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRate(1);
          }}
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-red-950/20 border border-red-500/20 hover:bg-red-950/30 hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] group transition-all text-center"
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
            handleRate(2);
          }}
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-orange-950/20 border border-orange-500/20 hover:bg-orange-950/30 hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] group transition-all text-center"
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
            handleRate(3);
          }}
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-blue-950/20 border border-blue-500/20 hover:bg-blue-950/30 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] group transition-all text-center"
        >
          <span className="text-lg md:text-xl font-bold text-blue-400">Good</span>
          <span className="text-[9px] font-mono text-blue-500/75 uppercase tracking-widest mt-1 block">
            {t('knowledge.review.standard_interval')}
          </span>
        </button>

        {/* Quality 4: Easy (Nhớ như in, phản xạ ngay lập tức) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRate(4);
          }}
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 hover:bg-cyan-950/30 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] group transition-all text-center"
        >
          <span className="text-lg md:text-xl font-bold text-cyan-400">Easy</span>
          <span className="text-[9px] font-mono text-cyan-500/75 uppercase tracking-widest mt-1 block">
            {t('knowledge.review.long_interval')}
          </span>
        </button>
      </div>
    </div>
  );
};
