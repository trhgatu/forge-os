'use client';

import { MoodType } from '@forge/reflection';
import { Calendar, Save } from 'lucide-react';

import type { JournalEntry } from '@/features/journal/types';
import { ForgeEditor } from '@/shared/components/editor/ForgeEditor';
import { cn } from '@/shared/lib/utils';

import { MoodSelector } from './MoodSelector';

export function JournalEditor({
  entry,
  onChange,
  isFocusMode,
  toggleFocusMode,
  saveStatus = 'saved',
}: {
  entry: JournalEntry;
  onChange: (v: Partial<JournalEntry>) => void;
  isFocusMode: boolean;
  toggleFocusMode: () => void;
  saveStatus?: 'saved' | 'saving' | 'error';
}) {
  return (
    <div
      className={cn('flex-1 flex flex-col dark:bg-[#050505] bg-[#fffdfa] transition-all duration-300 relative', isFocusMode && 'bg-black')}
    >
      {/* Header */}
      <div
        className={cn(
          'px-8 py-4 flex items-center justify-between border-b dark:border-white/5 border-black/5 transition-all duration-300 relative z-10',
          isFocusMode && '-mt-16 opacity-0 pointer-events-none',
        )}
      >
        <div className="flex items-center gap-4 text-xs dark:text-zinc-500 text-zinc-400 font-sans">
          <span className="flex items-center gap-1.5 dark:text-zinc-400 text-zinc-600">
            <Calendar size={12} className="text-red-700/60" /> {new Date(entry.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span className="w-px h-3 dark:bg-white/5 bg-black/5" />
          <div
            className={cn(
              'flex items-center gap-1.5 transition-colors w-[150px] font-sans',
              saveStatus === 'saved' && 'dark:text-emerald-500/60 text-emerald-700/80',
              saveStatus === 'saving' && 'dark:text-amber-500/60 text-amber-700/80',
              saveStatus === 'error' && 'dark:text-red-500/60 text-red-700/80',
            )}
          >
            <Save size={12} className={cn(saveStatus === 'saving' && 'animate-spin')} />
            <span className="text-[10px] font-sans uppercase tracking-widest font-black">
              {saveStatus === 'saving' && 'BRUSHING...'}
              {saveStatus === 'saved' && 'RECORDED'}
              {saveStatus === 'error' && 'ERROR'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Controls removed for minimalist mode */}
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto relative z-10">
        <div className="max-w-2xl mx-auto px-8 py-8 min-h-full flex flex-col">
          {/* Mood Selector */}
          <div
            className={cn(
              'transition-opacity duration-200 mb-6',
              isFocusMode ? 'opacity-0 hover:opacity-100' : 'opacity-100',
            )}
          >
            <MoodSelector mood={entry.mood || MoodType.NEUTRAL} onSelect={(m) => onChange({ mood: m })} />
          </div>

          {/* Title */}
          <input
            type="text"
            value={entry.title || ''}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="Title your thought..."
            className="w-full bg-transparent border-none text-3xl font-sans font-black tracking-wide dark:text-white text-[#1c1c1a] dark:placeholder-zinc-800 placeholder-zinc-300 focus:ring-0 px-0 py-4 mb-4"
          />

          {/* Content */}
          <div className="flex-1 min-h-[500px]">
            <ForgeEditor
              content={entry.content}
              onChange={(v) => onChange({ content: v })}
              placeholder="Start writing... (Markdown supported)"
              className="min-h-[500px] font-sans dark:text-gray-200 text-zinc-800 leading-relaxed text-sm"
            />
          </div>

          {/* Focus Mode button removed for minimalist UI */}
        </div>
      </div>
    </div>
  );
}



