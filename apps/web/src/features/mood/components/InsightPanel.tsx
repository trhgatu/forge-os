'use client';

import { Activity, Sparkles } from 'lucide-react';

import { Skeleton, Label, EmptyState, Tag } from '@/shared/components/ui';
import type { MoodAnalysis } from '@/shared/types/mood';

interface InsightPanelProps {
  analysis: MoodAnalysis | null;
  isAnalyzing: boolean;
}

export function InsightPanel({ analysis, isAnalyzing }: InsightPanelProps) {
  if (isAnalyzing) {
    return (
      <div className="flex h-full flex-col p-6 gap-6 animate-pulse">
        <Skeleton variant="glowing" className="h-32 w-full rounded-2xl bg-forge-accent/5" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton variant="default" className="h-16 w-full rounded-xl" />
          <Skeleton variant="default" className="h-16 w-full rounded-xl" />
        </div>
        <div className="space-y-2">
          <Skeleton variant="default" className="h-4 w-32 rounded-md" />
          <Skeleton variant="default" className="h-20 w-full rounded-xl" />
        </div>
        <Skeleton variant="default" className="h-16 w-full rounded-xl" />
      </div>
    );
  }

  if (!analysis) {
    return (
      <EmptyState
        title="Chưa Phát Hiện Chu Kỳ"
        description="Ghi chép nhiều trạng thái cảm xúc hơn để AI tự động nhận diện và đề xuất lời khuyên."
        glowColor="accent"
        size="sm"
        className="h-full border-none bg-transparent"
      />
    );
  }

  return (
    <div className="space-y-6 p-6 animate-in fade-in duration-500">
      {/* Prediction */}
      <div className="relative overflow-hidden rounded-2xl border border-forge-accent/20 bg-linear-to-br from-forge-accent/10 to-transparent p-5">
        <div className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-forge-accent/20 blur-2xl" />
        <div className="relative z-10">
          <Label variant="accent" className="mb-2 flex items-center gap-2 text-xs uppercase tracking-widest block">
            <Activity size={12} /> Forecast
          </Label>
          <p className="leading-relaxed text-white font-medium">
            &quot;{analysis.prediction}&quot;
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-white/5 bg-white/5 p-4">
          <Label variant="dim" className="mb-1 text-[10px] uppercase tracking-widest block">Trend</Label>
          <div className="text-lg text-white">{analysis.overallTrend}</div>
        </div>

        <div className="rounded-xl border border-white/5 bg-white/5 p-4">
          <Label variant="dim" className="mb-1 text-[10px] uppercase tracking-widest block">Triggers</Label>
          <div className="flex flex-wrap gap-1 text-sm text-gray-300">
            {analysis.triggers.map((t) => (
              <Tag key={t} size="sm" variant="default" className="border-none py-0.5 px-1.5">
                {t}
              </Tag>
            ))}
          </div>
        </div>
      </div>

      {/* Insight */}
      <div>
        <Label variant="dim" className="mb-3 text-xs uppercase tracking-widest block">Pattern Analysis</Label>
        <p className="border-l-2 border-white/10 pl-4 text-sm leading-relaxed text-gray-300">
          {analysis.insight}
        </p>
      </div>

      {/* Action */}
      <div className="rounded-xl border border-white/5 bg-white/2 p-4">
        <Label variant="cyan" className="mb-2 text-[10px] uppercase tracking-widest block">
          Recommendation
        </Label>
        <p className="text-sm italic text-gray-400">{analysis.actionableStep}</p>
      </div>
    </div>
  );
}


