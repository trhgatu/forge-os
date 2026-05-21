'use client';

import type { JournalAnalysis } from '@forge/reflection';
import { BrainCircuit, ChevronRight, Sparkles, Hash } from 'lucide-react';

import { GlassCard } from '@/shared/components/ui/GlassCard';
import { cn } from '@/shared/lib/utils';

export function JournalContextPanel({ analysis }: { analysis?: JournalAnalysis }) {
  if (!analysis) {
    return (
      <div className="w-72 border-l dark:border-white/5 border-black/5 dark:bg-[#080808]/95 bg-[#fcfbfa]/98 backdrop-blur-3xl p-6 flex flex-col items-center justify-center text-center h-full font-sans relative select-none transition-colors duration-300">
        {/* Left Torn Border */}
        <div className="absolute left-0 top-0 bottom-0 w-[1px] dark:bg-white/10 bg-black/5 z-50 pointer-events-none" style={{ filter: "url(#line-torn-filter)" }} />

        <div className="w-12 h-12 rounded-full dark:bg-white/[0.02] bg-black/[0.01] dark:border-white/5 border-black/5 flex items-center justify-center mb-4 text-zinc-700 animate-pulse">
          <BrainCircuit size={20} />
        </div>
        <h3 className="text-zinc-400 font-sans font-black tracking-wider text-xs mb-2">NEURAL INTERFACE</h3>
        <p className="text-[11px] text-zinc-500 italic leading-relaxed">
          Write your thoughts and let the Neural Core reflect deep insights.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
      w-72 h-full
      border-l dark:border-white/5 border-black/5
      dark:bg-[#080808]/95 bg-[#fcfbfa]/98 backdrop-blur-3xl
      overflow-y-auto relative font-sans select-none transition-colors duration-300
    "
    >
      {/* Left Torn Border */}
      <div className="absolute left-0 top-0 bottom-0 w-[1px] dark:bg-white/10 bg-black/5 z-50 pointer-events-none" style={{ filter: "url(#line-torn-filter)" }} />

      <div className="p-5 space-y-6 relative z-10">
        {/* Emotional Resonance */}
        <ContextPanelSection title="EMOTIONAL RESONANCE" kanji="感">
          <div className="flex items-end gap-1.5 mb-2">
            <span className="text-4xl font-black dark:text-white text-[#1c1c1a] font-sans">
              {analysis.sentimentScore}
            </span>
            <span className="text-xs text-zinc-500 font-sans mb-1">/ 10</span>
          </div>

          <div className="h-1 w-full dark:bg-white/5 bg-black/5 rounded overflow-hidden">
            <div
              className={cn(
                'h-full transition-all duration-1000',
                analysis.sentimentScore > 7
                  ? 'bg-emerald-700'
                  : analysis.sentimentScore < 4
                    ? 'bg-red-950'
                    : 'bg-zinc-700',
              )}
              style={{ width: `${analysis.sentimentScore * 10}%` }}
            />
          </div>
        </ContextPanelSection>

        {/* Core Insight */}
        <div className="relative">
          {/* Paper Background overlay */}
          <div className="absolute inset-0 dark:bg-white/[0.01] bg-black/[0.005] dark:border-white/5 border-black/5 rounded-lg pointer-events-none" style={{ filter: "url(#line-torn-filter)" }} />
          <div className="p-4 relative z-10">
            <div className="flex items-center gap-1.5 text-red-700/80 text-[10px] font-black uppercase tracking-widest mb-3">
              <span className="text-xs">悟</span> CORE INSIGHT
            </div>

            <p className="text-xs dark:text-zinc-300 text-zinc-700 leading-relaxed italic font-serif">
              &quot;{analysis.summary}&quot;
            </p>
          </div>
        </div>

        {/* Themes */}
        <ContextPanelSection title="DETECTED THEMES" kanji="題">
          <div className="flex flex-wrap gap-1.5">
            {analysis.keywords.map((kw) => (
              <ThemeTag key={kw} text={kw} />
            ))}
          </div>
        </ContextPanelSection>

        {/* Next Step */}
        <ContextPanelSection title="SUGGESTED PATHWAY" kanji="道">
          <div className="flex gap-3 items-start">
            <div
              className="
              mt-0.5 shrink-0
              w-5 h-5 rounded
              dark:bg-white/[0.02] bg-black/[0.01] dark:border-white/5 border-black/5
              flex items-center justify-center text-red-700/60
            "
            >
              <ChevronRight size={10} />
            </div>

            <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed italic">{analysis.suggestedAction}</p>
          </div>
        </ContextPanelSection>
      </div>
    </div>
  );
}

/* ------------------------------------------------------ */
/* SUB COMPONENTS */
/* ------------------------------------------------------ */

function ContextPanelSection({ title, kanji, children }: { title: string; kanji: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1.5">
        <span className="font-serif text-red-700/50 font-black text-xs">{kanji}</span>
        <h4 className="text-[9px] font-sans font-black text-zinc-500 uppercase tracking-widest">
          {title}
        </h4>
      </div>
      {children}
    </div>
  );
}

function ThemeTag({ text }: { text: string }) {
  return (
    <span
      className="
      px-2 py-0.5 rounded
      dark:bg-white/[0.01] bg-black/[0.005] dark:border-white/5 border-black/5
      text-[10px] text-zinc-500 font-sans italic
      flex items-center gap-0.5
    "
    >
      <Hash size={9} className="text-zinc-600" /> {text}
    </span>
  );
}



