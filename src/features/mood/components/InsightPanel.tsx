"use client";

import { Activity, Sparkles } from "lucide-react";

import type { MoodAnalysis } from "@/shared/types/mood";

interface InsightPanelProps {
  analysis: MoodAnalysis | null;
  isAnalyzing: boolean;
}

export function InsightPanel({ analysis, isAnalyzing }: InsightPanelProps) {
  if (isAnalyzing) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-2 border-forge-accent border-t-transparent" />
        <p className="text-gray-400">Detecting emotional patterns...</p>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8 text-center text-gray-500">
        <Sparkles size={32} className="mb-4 opacity-30" />
        <p>No patterns detected yet. Log more data to unlock insights.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 animate-in fade-in duration-500">
      {/* Prediction */}
      <div className="relative overflow-hidden rounded-2xl border border-forge-accent/20 bg-linear-to-br from-forge-accent/10 to-transparent p-5">
        <div className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-forge-accent/20 blur-2xl" />
        <div className="relative z-10">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-forge-accent">
            <Activity size={12} /> Forecast
          </div>
          <p className="leading-relaxed text-white font-medium">
            &quot;{analysis.prediction}&quot;
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-white/5 bg-white/5 p-4">
          <div className="mb-1 text-[10px] uppercase tracking-widest text-gray-500">Trend</div>
          <div className="text-lg text-white">{analysis.overallTrend}</div>
        </div>

        <div className="rounded-xl border border-white/5 bg-white/5 p-4">
          <div className="mb-1 text-[10px] uppercase tracking-widest text-gray-500">Triggers</div>
          <div className="flex flex-wrap gap-1 text-sm text-gray-300">
            {analysis.triggers.map((t) => (
              <span key={t} className="rounded bg-white/10 px-1.5 text-xs">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Insight */}
      <div>
        <h4 className="mb-3 text-xs uppercase tracking-widest text-gray-500">Pattern Analysis</h4>
        <p className="border-l-2 border-white/10 pl-4 text-sm leading-relaxed text-gray-300">
          {analysis.insight}
        </p>
      </div>

      {/* Action */}
      <div className="rounded-xl border border-white/5 bg-white/2 p-4">
        <div className="mb-2 text-[10px] uppercase tracking-widest text-forge-cyan">
          Recommendation
        </div>
        <p className="text-sm italic text-gray-400">{analysis.actionableStep}</p>
      </div>
    </div>
  );
}
