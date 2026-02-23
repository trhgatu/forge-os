"use client";

import { MOOD_COLORS } from "@/shared/constants";
import { cn } from "@/shared/lib/utils";
import type { MoodType } from "@/shared/types";

export function MoodSelector({
  mood,
  onSelect,
}: {
  mood: MoodType;
  onSelect: (m: MoodType) => void;
}) {
  return (
    <div className="flex gap-2 mb-6">
      {(Object.keys(MOOD_COLORS) as MoodType[]).map((m) => (
        <button
          key={m}
          onClick={() => onSelect(m)}
          className={cn(
            "px-3 py-1 rounded-full text-xs capitalize border transition-all",
            mood === m
              ? MOOD_COLORS[m] + " border-white/20 scale-105"
              : "text-gray-500 hover:bg-white/5"
          )}
        >
          {m}
        </button>
      ))}
    </div>
  );
}
