'use client';

import { MOOD_COLORS } from '@/shared/constants';
import { cn } from '@/shared/lib/utils';
import type { MoodType } from '@/shared/types';

export function MoodSelector({
  mood,
  onSelect,
}: {
  mood: MoodType;
  onSelect: (m: MoodType) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {(Object.keys(MOOD_COLORS) as MoodType[]).map((m) => (
        <button
          key={m}
          onClick={() => onSelect(m)}
          className={cn(
            'px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-mono border transition-all duration-300',
            mood === m
              ? MOOD_COLORS[m] + ' border-white/20 scale-105 shadow-lg'
              : 'text-zinc-600 border-white/5 hover:bg-white/5 hover:text-zinc-400',
          )}
        >
          {m}
        </button>
      ))}
    </div>
  );
}



