"use client";

import type { MoodEntry } from "@/shared/types/mood";
import { MOOD_CONFIG } from "../config";
import { cn } from "@/shared/lib/utils";

import { Edit2, Trash2 } from "lucide-react";

interface MoodHistoryListProps {
  history: MoodEntry[];
  onEdit: (entry: MoodEntry) => void;
  onDelete: (id: string) => void;
}

export function MoodHistoryList({ history, onEdit, onDelete }: MoodHistoryListProps) {
  const ordered = [...history].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="grid grid-cols-1 gap-6 pb-32 md:grid-cols-2 lg:grid-cols-3">
      {ordered.map((entry) => {
        const config = MOOD_CONFIG[entry.mood];

        return (
          <div
            key={entry.id}
            className="group relative rounded-2xl border border-white/5 bg-white/2 p-5 transition-all hover:bg-white/4 hover:shadow-lg hover:shadow-black/20"
          >
            {/* Actions (visible on hover) */}
            <div className="absolute right-4 top-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(entry);
                }}
                className="rounded-lg bg-white/10 p-1.5 text-gray-300 hover:bg-white/20 hover:text-white"
                title="Edit"
              >
                <Edit2 size={14} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(entry.id);
                }}
                className="rounded-lg bg-red-500/10 p-1.5 text-red-500 hover:bg-red-500/20"
                title="Delete"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex items-center justify-center rounded-lg bg-white/5 p-2",
                    config.color
                  )}
                >
                  <config.icon size={18} />
                </div>
                <div>
                  <div className="capitalize text-white font-bold">{entry.mood}</div>
                  <div className="text-[10px] text-gray-500">
                    {entry.date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
              {/* Hide Intensity if actions show up? Or just shift it? */}
              <div className="text-xs font-mono text-gray-600 transition-opacity group-hover:opacity-0">
                Int: {entry.intensity}
              </div>
            </div>

            {entry.note && <p className="line-clamp-2 text-xs text-gray-400 mt-2">{entry.note}</p>}
          </div>
        );
      })}
    </div>
  );
}
