import {
  BookOpen,
  Calendar,
  Layers,
  BrainCircuit,
  ArrowUpRight,
  Hammer,
  CopyPlus,
  CheckCircle,
  X,
  Brain,
  Loader2,
} from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState, useRef, memo } from 'react';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/shared/components/ui/Button';
import { GlassCard } from '@/shared/components/ui/GlassCard';
import { Label } from '@/shared/components/ui/Label';
import { Link } from '@/shared/components/ui/Link';
import { Tag } from '@/shared/components/ui/Tag';
import { cn } from '@/shared/lib/utils';
import { useFlashcardStore } from '@/shared/store/flashcardStore';
import type { KnowledgeConcept } from '@/shared/types';

interface SourceTabProps {
  concept: KnowledgeConcept;
  extracts: { id: string; text: string }[];
  onCrystallize: () => void;
  onCapture: (text: string) => void;
  onRemoveExtract: (id: string) => void;
}

const SourceContent = memo(
  ({ htmlContent }: { htmlContent: string }) => {
    return (
      <div
        className="prose prose-invert prose-lg max-w-none font-roboto leading-loose text-gray-200
                prose-headings:font-roboto prose-headings:font-bold prose-headings:text-white
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-2
                prose-h3:text-xl prose-h3:text-gray-100 prose-h3:mt-8
                prose-p:mb-6 prose-p:text-lg prose-p:leading-8 prose-p:text-gray-200
                prose-a:text-forge-cyan prose-a:no-underline hover:prose-a:underline
                prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-li:mb-2 prose-li:text-gray-200
                prose-blockquote:border-l-4 prose-blockquote:border-forge-accent prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:bg-white/[0.03] prose-blockquote:py-2 prose-blockquote:pr-4 prose-blockquote:rounded-r-lg prose-blockquote:text-gray-300
                prose-strong:text-white prose-strong:font-semibold selection:bg-forge-accent/30 selection:text-white"
        dangerouslySetInnerHTML={{
          __html: htmlContent,
        }}
      />
    );
  },
  (prev, next) => prev.htmlContent === next.htmlContent,
);

SourceContent.displayName = 'SourceContent';

export const SourceTab: React.FC<SourceTabProps> = ({
  concept,
  extracts,
  onCrystallize,
  onCapture,
  onRemoveExtract,
}) => {
  const lastModified = concept.lastModified
    ? new Date(concept.lastModified).toLocaleDateString()
    : null;

  const { language, t } = useLanguage();
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selection, setSelection] = useState<{ text: string; top: number; left: number } | null>(
    null,
  );
  const [isCaptured, setIsCaptured] = useState(false);

  const decks = useFlashcardStore((state) => state.decks);
  const loadDecks = useFlashcardStore((state) => state.loadDecks);
  const createDeck = useFlashcardStore((state) => state.createDeck);
  const forgeCard = useFlashcardStore((state) => state.forgeCard);

  const [isForging, setIsForging] = useState(false);
  const [isForged, setIsForged] = useState(false);

  useEffect(() => {
    loadDecks();
  }, [loadDecks]);

  useEffect(() => {
    const handleMouseUp = () => {
      setTimeout(() => {
        const activeSelection = window.getSelection();

        if (
          !activeSelection ||
          activeSelection.isCollapsed ||
          !contentRef.current ||
          !containerRef.current
        ) {
          if (!activeSelection || activeSelection.isCollapsed) {
            setSelection(null);
            setIsCaptured(false);
            setIsForged(false);
          }
          return;
        }

        const text = activeSelection.toString().trim();
        if (!text || !contentRef.current.contains(activeSelection.anchorNode)) {
          setSelection(null);
          setIsCaptured(false);
          setIsForged(false);
          return;
        }

        const range = activeSelection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        setSelection({
          text,
          top: rect.top - containerRect.top - 60,
          left: rect.left - containerRect.left + rect.width / 2,
        });
        setIsCaptured(false);
        setIsForged(false);
      }, 10);
    };

    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleCaptureClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (selection) {
      onCapture(selection.text);
      setIsCaptured(true);

      setTimeout(() => {
        setSelection(null);
        window.getSelection()?.removeAllRanges();
        setIsCaptured(false);
      }, 800);
    }
  };

  const handleForgeClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!selection) return;

    setIsForging(true);
    try {
      let targetDeckId = decks[0]?.id;

      if (!targetDeckId) {
        await createDeck(
          t('knowledge.mined_vocabulary_title'),
          t('knowledge.mined_vocabulary_desc'),
          'from-indigo-600 to-cyan-500',
        );
        const freshDecks = useFlashcardStore.getState().decks;
        targetDeckId = freshDecks[0]?.id;
      }

      if (targetDeckId) {
        await forgeCard({
          deckId: targetDeckId,
          word: selection.text,
          conceptId: concept.id,
          highlightText: selection.text,
        });
        setIsForged(true);
        setTimeout(() => {
          setSelection(null);
          window.getSelection()?.removeAllRanges();
          setIsForged(false);
        }, 1200);
      }
    } catch (err) {
      console.error('Failed to forge card:', err);
    } finally {
      setIsForging(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col md:flex-row gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative"
    >
      {selection && (
        <div
          className="absolute z-[100] animate-in fade-in zoom-in-95 duration-200 flex items-center gap-2 p-1.5 rounded-2xl bg-black/80 border border-white/10 backdrop-blur-md shadow-2xl"
          style={{ top: selection.top, left: selection.left, transform: 'translateX(-50%)' }}
          onMouseDown={(e) => e.preventDefault()}
        >
          <Button
            onClick={handleCaptureClick}
            disabled={isCaptured}
            variant="glass"
            size="sm"
            className={cn(
              'relative overflow-hidden flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all active:scale-95 text-xs h-auto',
              isCaptured
                ? 'bg-emerald-500/90 text-white'
                : 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/5'
            )}
          >
            {isCaptured ? <CheckCircle size={14} /> : <CopyPlus size={14} />}
            <span>{isCaptured ? t('knowledge.captured') : t('knowledge.capture_extract')}</span>
          </Button>

          {selection.text.split(/\s+/).length <= 4 && (
            <Button
              onClick={handleForgeClick}
              disabled={isForging || isForged}
              variant="glass"
              size="sm"
              className={cn(
                'relative overflow-hidden flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all active:scale-95 text-xs h-auto',
                isForged
                  ? 'bg-forge-cyan text-black shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                  : 'bg-forge-cyan/10 hover:bg-forge-cyan/20 text-forge-cyan border border-forge-cyan/20'
              )}
            >
              {isForging ? (
                <Loader2 size={14} className="animate-spin" />
              ) : isForged ? (
                <CheckCircle size={14} />
              ) : (
                <Brain size={14} />
              )}
              <span>
                {isForging
                  ? t('knowledge.forging')
                  : isForged
                    ? t('knowledge.forged')
                    : t('knowledge.forge_card')}
              </span>
            </Button>
          )}

          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black border-r border-b border-white/10 rotate-45" />
        </div>
      )}

      <div className="flex-1 space-y-6">
        <div className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden border border-white/10 group">
          {concept.imageUrl ? (
            <>
              <Image
                fill
                src={concept.imageUrl}
                alt={concept.title}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/60 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-black to-[#050508] flex items-center justify-center">
              <BookOpen size={64} className="text-white/10" />
            </div>
          )}

          <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-10">
            <Tag variant="default" className="mb-4 bg-white/5 border-white/10 backdrop-blur-md text-gray-300 py-1 px-3">
              <Layers size={12} className="mr-1.5" /> {t('knowledge.knowledge_source')}
            </Tag>

            <h1 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight drop-shadow-2xl mb-4">
              {concept.title}
            </h1>

            {lastModified && (
              <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                <Calendar size={12} /> {t('knowledge.last_updated')}: {lastModified}
              </div>
            )}
          </div>
        </div>

        <div className="px-4 md:px-0" ref={contentRef}>
          <SourceContent htmlContent={concept.content ?? concept.extract ?? ''} />
        </div>
      </div>
      <div className="w-full md:w-[350px] space-y-6 shrink-0">
        <Button
          onClick={onCrystallize}
          variant="glass"
          className="w-full cursor-pointer group relative overflow-hidden p-4 rounded-xl bg-gradient-to-r from-cyan-950/50 to-blue-950/50 border border-cyan-500/30 text-cyan-100 font-bold shadow-[0_0_20px_rgba(34,211,238,0.15)] hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:border-cyan-400/50 transition-all duration-300 h-auto"
        >
          <div className="absolute inset-0 bg-cyan-400/10 group-hover:translate-x-full transition-transform duration-700 ease-in-out skew-x-12 -translate-x-full" />
          <div className="flex items-center justify-center gap-3 relative z-10">
            <Hammer
              size={20}
              className="group-hover:rotate-12 transition-transform text-cyan-300"
            />
            <span className="tracking-wide">{t('knowledge.forge_insight')}</span>
          </div>
        </Button>
        {(extracts.length > 0 || concept.insights) && (
          <GlassCard>
            <Label icon={<BrainCircuit size={14} />} glow={true} className="mb-4">
              {t('knowledge.key_extractions')}
            </Label>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
              {extracts.map((extract) => (
                <div
                  key={extract.id}
                  className="group relative p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 hover:bg-emerald-950/30 transition-colors animate-in fade-in slide-in-from-left-2"
                >
                  <div className="flex gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_#34D399] shrink-0" />
                    <p className="text-sm text-gray-200 leading-relaxed font-light line-clamp-4 pr-6">
                      {extract.text}
                    </p>
                  </div>

                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveExtract(extract.id);
                    }}
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 hover:bg-red-500/80 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm h-7 w-7"
                    title="Remove Extract"
                  >
                    <X size={12} />
                  </Button>
                </div>
              ))}

              {concept.insights?.map((insight, i) => (
                <div
                  key={`insight-${i}`}
                  className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-forge-cyan shadow-[0_0_5px_#22D3EE] shrink-0" />
                    <p className="text-sm text-gray-400 leading-relaxed font-light">{insight}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        )}
        {concept.metadata?.categories && (
          <GlassCard>
            <Label className="mb-4">
              {t('knowledge.categories')}
            </Label>
            <div className="flex flex-wrap gap-2">
              {concept.metadata.categories.map((cat, i) => (
                <Tag
                  key={i}
                  variant="default"
                  className="bg-white/5 border-white/10 hover:text-white hover:border-white/20 transition-colors"
                >
                  {cat}
                </Tag>
              ))}
            </div>
          </GlassCard>
        )}
        {concept.url && (
          <Link
            href={concept.url}
            variant="card"
          >
            {t('knowledge.view_original_source')}
          </Link>
        )}
      </div>
    </div>
  );
};


