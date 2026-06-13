'use client';

import { Volume2, Brain } from 'lucide-react';
import React, { useRef } from 'react';

import { Button } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';

interface FlashcardItemProps {
  currentCard: any;
  isFlipped: boolean;
  t: (key: string) => string;
  onFlip: () => void;
}

export const FlashcardItem: React.FC<FlashcardItemProps> = ({
  currentCard,
  isFlipped,
  t,
  onFlip,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const speakWord = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
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
    <div className="w-full aspect-[16/10] md:aspect-[16/9] perspective-1000 relative group cursor-pointer" onClick={onFlip}>
      <div
        className={cn(
          'w-full h-full relative transition-all duration-700 transform-style-3d shadow-2xl rounded-[24px] border border-white/5',
          isFlipped ? 'rotate-y-180' : ''
        )}
      >
        {/* A. FRONT OF THE CARD */}
        <div className="absolute inset-0 backface-hidden bg-[#ffffff]/[0.015] backdrop-blur-xl rounded-[24px] flex flex-col items-center justify-center p-8 border border-white/5 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-forge-cyan/40 to-transparent z-30" />
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
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-forge-accent/40 to-transparent z-30" />
          <div className="absolute bottom-[-10%] right-[-10%] w-48 h-48 bg-forge-accent/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10">
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

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-1">
                  {t('knowledge.review.translation')}
                </span>
                <p className="text-2xl font-bold text-white leading-relaxed">
                  {currentCard.customBack}
                </p>
              </div>

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
  );
};
