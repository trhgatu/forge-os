'use client';

import { X, Sparkles, Calendar, Tag as TagIcon, Mic, Heart, ChevronRight, Trash2, Pencil } from 'lucide-react';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { toast } from 'sonner';

import { SeasonalAmbience } from '@/shared/components/effects';
import { cn } from '@/shared/lib/utils';
import type { Memory } from '@/shared/types/memory';
import { Tag, Label, EmptyState, Button } from '@/shared/components/ui';

import { SEASON_CONFIG, getSeasonFromMood } from '../config';
import { useDeleteMemory, useUpdateMemory } from '../hooks/useMemories';

import { CreateMemoryModal } from './CreateMemoryModal';

interface MemoryDetailPanelProps {
  memory: Memory | null;
  onClose: () => void;
  onAnalyze: (id: string) => void;
  isAnalyzing: boolean;
}

export function MemoryDetailPanel({
  memory,
  onClose,
  onAnalyze,
  isAnalyzing,
}: MemoryDetailPanelProps) {
  const [isEditing, setIsEditing] = useState(false);
  const deleteMemory = useDeleteMemory();
  const updateMemory = useUpdateMemory();
  const panelRef = useRef<HTMLDivElement>(null);

  if (!memory) return null;

  const currentSeason = getSeasonFromMood(memory.mood);
  const seasonConfig = SEASON_CONFIG[currentSeason];

  const seasonAccentColor =
    currentSeason === 'Spring'
      ? 'text-emerald-400'
      : currentSeason === 'Summer'
        ? 'text-amber-400'
        : currentSeason === 'Autumn'
          ? 'text-rose-400'
          : 'text-cyan-400';

  const seasonBorderColor =
    currentSeason === 'Spring'
      ? 'border-emerald-500/20 bg-emerald-500/5'
      : currentSeason === 'Summer'
        ? 'border-amber-500/20 bg-amber-500/5'
        : currentSeason === 'Autumn'
          ? 'border-rose-500/20 bg-rose-500/5'
          : 'border-cyan-500/20 bg-cyan-500/5';

  const handleDelete = () => {
    toast.custom((t) => (
      <div className="flex flex-col gap-2 rounded-xl border border-red-500/20 bg-black/90 p-4 text-sm text-white shadow-xl backdrop-blur-md">
        <p className="font-bold">Dissolve this memory?</p>
        <p className="text-gray-400">It will fade into the void (soft delete).</p>
        <div className="mt-2 flex gap-2">
          <Button
            onClick={() => {
              toast.dismiss(t);
              deleteMemory.mutate(memory.id, {
                onSuccess: () => {
                  toast.success('Memory faded away...');
                  onClose();
                },
                onError: () => toast.error('Could not dissolve memory.'),
              });
            }}
            variant="danger"
            size="sm"
          >
            Confirm
          </Button>
          <Button
            onClick={() => toast.dismiss(t)}
            variant="outline"
            size="sm"
          >
            Cancel
          </Button>
        </div>
      </div>
    ));
  };

  const handleUpdate = (updatedData: Partial<Memory>) => {
    updateMemory.mutate(
      { id: memory.id, payload: updatedData },
      {
        onSuccess: () => {
          toast.success('Memory refined successfully.');
          setIsEditing(false);
        },
        onError: () => {
          toast.error('Failed to refine memory.');
        },
      },
    );
  };

  return (
    <>
      <div ref={panelRef} className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl border-l border-white/10 bg-[#030304]/96 shadow-2xl backdrop-blur-2xl slide-in-panel">
        {/* Visual Effects Layer */}
        <SeasonalAmbience season={currentSeason} containerRef={panelRef} leafCount={12} />

        {/* Soft Background Gradient */}
        <div className={cn('pointer-events-none absolute inset-0 opacity-10', seasonConfig.bg)} />

        <div className="relative z-10 flex h-full flex-col">
          {/* Header */}
          <div className="flex shrink-0 items-start justify-between border-b border-white/5 bg-black/40 backdrop-blur-sm p-6">
            <div>
              <Label
                variant="cyan"
                className={cn(
                  'mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em]',
                  seasonAccentColor,
                )}
              >
                <seasonConfig.icon size={13} />
                Season of {seasonConfig.label}
              </Label>
              <Label variant="default" className="text-2xl font-bold tracking-tight text-white capitalize block">
                {memory.title}
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-white"
                title="Refine Memory"
              >
                <Pencil size={18} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                className="text-gray-400 hover:text-red-400"
                title="Dissolve Memory"
              >
                <Trash2 size={18} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <X size={18} />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-8 overflow-y-auto p-6 scrollbar-hide">
            {/* Image */}
            {memory.imageUrl && (
              <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 shadow-lg">
                <Image
                  src={memory.imageUrl}
                  alt={memory.title}
                  fill
                  className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            )}

            {/* Meta Strip */}
            <div className="flex items-center gap-4 border-b border-white/5 pb-6 text-[11px] font-mono text-gray-500">
              <span className="flex items-center gap-2">
                <Calendar size={12} className="text-gray-600" />
                {memory.date.toLocaleDateString(undefined, {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
              <span className="h-3 w-px bg-white/5" />
              <span className="flex items-center gap-2 capitalize">
                <Heart size={12} className="text-gray-600" /> {memory.mood}
              </span>
            </div>

            {/* Description */}
            <div>
              <p className="whitespace-pre-line font-sans text-sm leading-relaxed text-gray-300 font-light">
                {memory.content}
              </p>
            </div>

            {/* Tags */}
            {memory.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {memory.tags.map((tag) => (
                  <Tag
                    key={tag}
                    size="sm"
                    variant="default"
                    className="flex items-center gap-1 border-white/5 bg-white/[0.02] text-[10px] text-gray-400"
                  >
                    <TagIcon size={9} /> #{tag}
                  </Tag>
                ))}
              </div>
            )}

            {/* AI Analysis */}
            <div className="border-t border-white/5 pt-8">
              <div className="mb-6 flex items-center justify-between">
                <Label variant="default" className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Sparkles size={14} className="text-forge-cyan" />
                  Neural Reflection
                </Label>

                {!memory.analysis && (
                  <Button
                    onClick={() => onAnalyze(memory.id)}
                    disabled={isAnalyzing}
                    className="border-forge-cyan/20 text-forge-cyan hover:border-forge-cyan/40 px-3 py-1.5 text-xs shadow-[0_0_15px_rgba(34,211,238,0.1)]"
                  >
                    {isAnalyzing ? (
                      <Sparkles size={12} className="animate-spin" />
                    ) : (
                      <Mic size={12} />
                    )}
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Node'}
                  </Button>
                )}
              </div>

              {memory.analysis ? (
                <div className="space-y-4 animate-in slide-in-from-bottom-4">
                  {/* Nova Whisper */}
                  <div
                    className={cn(
                      'relative overflow-hidden rounded-xl border p-5',
                      seasonBorderColor,
                    )}
                  >
                    <div className="relative z-10">
                      <Label
                        variant="cyan"
                        className={cn(
                          'mb-2 text-[9px] uppercase tracking-[0.25em] font-semibold block',
                          seasonAccentColor,
                        )}
                      >
                        Nova Whisper
                      </Label>
                      <p className="text-sm italic text-gray-300 font-light">
                        &quot;{seasonConfig.whisper}&quot;
                      </p>
                    </div>
                  </div>

                  {/* Core Meaning */}
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                    <Label variant="dim" className="mb-2 text-[9px] uppercase tracking-[0.25em] block">
                      Core Meaning
                    </Label>
                    <p className="text-xs text-gray-300 font-sans leading-relaxed font-light">
                      {memory.analysis.coreMeaning}
                    </p>
                  </div>

                  {/* Pattern */}
                  <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                    <Label variant="dim" className="mb-2 text-[9px] uppercase tracking-[0.25em] block">
                      Detected Pattern
                    </Label>
                    <p className="text-xs text-gray-300 font-sans leading-relaxed font-light">
                      {memory.analysis.emotionalPattern}
                    </p>
                  </div>

                  {/* Timeline Connection */}
                  {memory.analysis.timelineConnection && (
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                      <Label variant="dim" className="mb-2 flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] block">
                        <ChevronRight size={10} className="inline" />
                        Timeline Connection
                      </Label>
                      <p className="text-xs text-gray-300 font-sans leading-relaxed font-light">
                        {memory.analysis.timelineConnection}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <EmptyState
                  title="Chưa Có Phân Tích"
                  description="Hãy phân tích nút ký ức này để khám phá các khuôn mẫu tâm lý ẩn giấu."
                  glowColor="cyan"
                  size="sm"
                  className="py-8 border-dashed border-white/10 bg-white/[0.01]"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <CreateMemoryModal
          key={memory.id} // Force remount when editing a new memory
          onClose={() => setIsEditing(false)}
          onSave={handleUpdate}
          initialData={memory}
        />
      )}
    </>
  );
}
