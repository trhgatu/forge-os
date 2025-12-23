"use client";

import { useState } from "react";
import { X, Sparkles, Calendar, Tag, Mic, Heart, ChevronRight, Trash2, Pencil } from "lucide-react";
import Image from "next/image";

import type { Memory } from "@/shared/types/memory";
import { cn } from "@/shared/lib/utils";
import { SEASON_CONFIG, getSeasonFromMood } from "../config";
import { ParticleCanvas } from "@/shared/components/effects/ParticleCanvas";
import { useDeleteMemory, useUpdateMemory } from "../hooks/useMemories";
import { toast } from "sonner";
import { CreateMemoryModal } from "./CreateMemoryModal";

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

  if (!memory) return null;

  const currentSeason = getSeasonFromMood(memory.mood);
  const seasonConfig = SEASON_CONFIG[currentSeason];

  const handleDelete = () => {
    toast.custom((t) => (
      <div className="flex flex-col gap-2 rounded-xl border border-red-500/20 bg-black/90 p-4 text-sm text-white shadow-xl backdrop-blur-md">
        <p className="font-bold">Dissolve this memory?</p>
        <p className="text-gray-400">It will fade into the void (soft delete).</p>
        <div className="mt-2 flex gap-2">
          <button
            onClick={() => {
              toast.dismiss(t);
              deleteMemory.mutate(memory.id, {
                onSuccess: () => {
                  toast.success("Memory faded away...");
                  onClose();
                },
                onError: () => toast.error("Could not dissolve memory."),
              });
            }}
            className="rounded-md bg-red-500/20 px-3 py-1.5 text-red-200 transition-colors hover:bg-red-500/30"
          >
            Confirm
          </button>
          <button
            onClick={() => toast.dismiss(t)}
            className="rounded-md bg-white/10 px-3 py-1.5 text-gray-300 transition-colors hover:bg-white/20"
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  const handleUpdate = (updatedData: Partial<Memory>) => {
    updateMemory.mutate(
      { id: memory.id, payload: updatedData },
      {
        onSuccess: () => {
          toast.success("Memory refined successfully.");
          setIsEditing(false);
        },
        onError: () => {
          toast.error("Failed to refine memory.");
        },
      }
    );
  };

  return (
    <>
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl border-l border-white/10 bg-black/95 shadow-2xl backdrop-blur-xl slide-in-panel">
        {/* Visual Effects Layer */}
        <ParticleCanvas mode={seasonConfig.texture} color={seasonConfig.particleColor} />

        {/* Background Gradient */}
        <div className={cn("pointer-events-none absolute inset-0 opacity-20", seasonConfig.bg)} />

        {seasonConfig.id === "Spring" && (
          <div
            className="pointer-events-none absolute inset-0 opacity-10 mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
            }}
          />
        )}

        <div className="relative z-10 flex h-full flex-col">
          {/* Header */}
          <div className="flex shrink-0 items-start justify-between border-b border-white/5 bg-black/40 p-6">
            <div>
              <div
                className={cn(
                  "mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest",
                  seasonConfig.accent
                )}
              >
                <seasonConfig.icon size={14} />
                Season of {seasonConfig.label}
              </div>
              <h2 className="text-2xl font-display font-bold leading-tight text-white">
                {memory.title}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="rounded-full p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                title="Refine Memory"
              >
                <Pencil size={20} />
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-full p-2 text-gray-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
                title="Dissolve Memory"
              >
                <Trash2 size={20} />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-8 overflow-y-auto p-6">
            {/* Image */}
            {memory.imageUrl && (
              <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10">
                <Image
                  src={memory.imageUrl}
                  alt={memory.title}
                  fill
                  className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              </div>
            )}

            {/* Meta Strip */}
            <div className="flex items-center gap-4 border-b border-white/5 pb-6 text-xs font-mono text-gray-400">
              <span className="flex items-center gap-2">
                <Calendar size={12} />
                {memory.date.toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="h-3 w-px bg-white/10" />
              <span className="flex items-center gap-2 capitalize">
                <Heart size={12} /> {memory.mood}
              </span>
            </div>

            {/* Description */}
            <div>
              <p className="whitespace-pre-line font-serif text-base leading-relaxed text-gray-200">
                {memory.content}
              </p>
            </div>

            {/* Tags */}
            {memory.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {memory.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400"
                  >
                    <Tag size={10} /> {tag}
                  </span>
                ))}
              </div>
            )}

            {/* AI Analysis */}
            <div className="border-t border-white/5 pt-8">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-bold text-white">
                  <Sparkles size={14} className="text-forge-accent" />
                  Neural Reflection
                </h3>

                {!memory.analysis && (
                  <button
                    type="button"
                    onClick={() => onAnalyze(memory.id)}
                    disabled={isAnalyzing}
                    className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-xs transition-all hover:bg-forge-accent hover:text-white disabled:opacity-50"
                  >
                    {isAnalyzing ? (
                      <Sparkles size={12} className="animate-spin" />
                    ) : (
                      <Mic size={12} />
                    )}
                    {isAnalyzing ? "Analyzing..." : "Analyze"}
                  </button>
                )}
              </div>

              {memory.analysis ? (
                <div className="space-y-4 animate-in slide-in-from-bottom-4">
                  {/* Nova Whisper */}
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-xl border bg-white/2 p-5",
                      seasonConfig.border
                    )}
                  >
                    <div
                      className={cn(
                        "pointer-events-none absolute inset-0 bg-linear-to-br opacity-5",
                        seasonConfig.gradient
                      )}
                    />
                    <div className="relative z-10">
                      <div
                        className={cn(
                          "mb-2 text-[10px] font-mono uppercase tracking-widest",
                          seasonConfig.accent
                        )}
                      >
                        Nova Whisper
                      </div>
                      <p className="text-sm italic text-gray-300">
                        &quot;{seasonConfig.whisper}&quot;
                      </p>
                    </div>
                  </div>

                  {/* Core Meaning */}
                  <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                    <div className="mb-2 text-[10px] text-gray-500 uppercase tracking-widest">
                      Core Meaning
                    </div>
                    <p className="text-sm text-white">{memory.analysis.coreMeaning}</p>
                  </div>

                  {/* Pattern */}
                  <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                    <div className="mb-2 text-[10px] text-gray-500 uppercase tracking-widest">
                      Detected Pattern
                    </div>
                    <p className="text-sm text-gray-300">{memory.analysis.emotionalPattern}</p>
                  </div>

                  {/* Timeline Connection */}
                  {memory.analysis.timelineConnection && (
                    <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                      <div className="mb-2 flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest">
                        <ChevronRight size={10} />
                        Timeline Connection
                      </div>
                      <p className="text-sm text-gray-300">{memory.analysis.timelineConnection}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-white/10 bg-white/1 py-8 text-center">
                  <p className="text-xs text-gray-500">
                    Analyze this memory to reveal hidden patterns and connections.
                  </p>
                </div>
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
