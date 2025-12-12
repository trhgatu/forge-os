"use client";

import type { MoodEntry } from "@/shared/types/mood";
import { MOOD_CONFIG } from "../config";
import { cn } from "@/shared/lib/utils";

interface MoodHistoryListProps {
  history: MoodEntry[];
}

export function MoodHistoryList({ history }: MoodHistoryListProps) {
  const ordered = [...history].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="grid grid-cols-1 gap-6 pb-32 md:grid-cols-2 lg:grid-cols-3">
      {ordered.map((entry) => {
        const config = MOOD_CONFIG[entry.mood];

        return (
          <div
            key={entry.id}
            className="group rounded-2xl border border-white/5 bg-white/2 p-5 transition-all hover:bg-white/4"
          >
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
              <div className="text-xs font-mono text-gray-600">Int: {entry.intensity}</div>
            </div>

            {entry.note && <p className="line-clamp-2 text-xs text-gray-400">{entry.note}</p>}
          </div>
        );
      })}
    </div>
  );
}
