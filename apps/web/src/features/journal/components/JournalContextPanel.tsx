"use client";

import { BrainCircuit, ChevronRight, Sparkles, Hash } from "lucide-react";

import { GlassCard } from "@/shared/components/ui/GlassCard";
import { cn } from "@/shared/lib/utils";
import type { JournalAnalysis } from "@/shared/types/journal";

export function JournalContextPanel({ analysis }: { analysis?: JournalAnalysis }) {
  if (!analysis) {
    return (
      <div className="w-72 border-l border-white/5 bg-black/20 backdrop-blur-xl p-6 flex flex-col items-center justify-center text-center h-full">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-gray-600">
          <BrainCircuit size={32} />
        </div>
        <h3 className="text-white font-display font-medium mb-2">Neural Context</h3>
        <p className="text-sm text-gray-500">
          Write your thoughts and activate the Neural Core to generate insights.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
      w-72 h-full
      border-l border-white/5
      bg-black/20 backdrop-blur-xl
      overflow-y-auto
    "
    >
      <div className="p-5 space-y-6">
        {/* Emotional Resonance */}
        <ContextPanelSection title="Emotional Resonance">
          <div className="flex items-end gap-2 mb-2">
            <span className="text-4xl font-display font-bold text-white">
              {analysis.sentimentScore}
            </span>
            <span className="text-sm text-gray-500 mb-1">/ 10</span>
          </div>

          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-1000",
                analysis.sentimentScore > 7
                  ? "bg-forge-cyan"
                  : analysis.sentimentScore < 4
                    ? "bg-orange-500"
                    : "bg-forge-accent"
              )}
              style={{ width: `${analysis.sentimentScore * 10}%` }}
            />
          </div>
        </ContextPanelSection>

        {/* Core Insight */}
        <GlassCard
          className="bg-linear-to-br from-white/5 to-transparent border-white/10"
          noPadding
        >
          <div className="p-4">
            <div className="flex items-center gap-2 text-forge-accent text-xs font-medium mb-2">
              <Sparkles size={12} /> Core Insight
            </div>

            <p className="text-sm text-gray-200 leading-relaxed italic">
              &quot;{analysis.summary}&quot;
            </p>
          </div>
        </GlassCard>

        {/* Themes */}
        <ContextPanelSection title="Detected Themes">
          <div className="flex flex-wrap gap-2">
            {analysis.keywords.map((kw) => (
              <ThemeTag key={kw} text={kw} />
            ))}
          </div>
        </ContextPanelSection>

        {/* Next Step */}
        <ContextPanelSection title="Next Step">
          <div className="flex gap-3 items-start">
            <div
              className="
              mt-0.5 shrink-0
              w-6 h-6 rounded-full
              bg-forge-cyan/10 border border-forge-cyan/30
              flex items-center justify-center text-forge-cyan
            "
            >
              <ChevronRight size={12} />
            </div>

            <p className="text-sm text-gray-300 leading-relaxed">{analysis.suggestedAction}</p>
          </div>
        </ContextPanelSection>
      </div>
    </div>
  );
}

/* ------------------------------------------------------ */
/* SUB COMPONENTS */
/* ------------------------------------------------------ */

function ContextPanelSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4
        className="
        text-xs font-mono text-gray-500 uppercase tracking-widest mb-3
      "
      >
        {title}
      </h4>
      {children}
    </div>
  );
}

function ThemeTag({ text }: { text: string }) {
  return (
    <span
      className="
      px-2 py-1 rounded-md
      bg-white/5 border border-white/5
      text-xs text-gray-400
      flex items-center gap-1
    "
    >
      <Hash size={10} /> {text}
    </span>
  );
}
