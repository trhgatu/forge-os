'use client';

import { MoodType } from '@forge/reflection';
import { Calendar, Save } from 'lucide-react';
import { Input } from '@/shared/components/ui';

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
      className={cn('flex-1 flex flex-col transition-all duration-300', isFocusMode && 'bg-black')}
    >
      {/* Header */}
      <div
        className={cn(
          'px-8 py-4 flex items-center justify-between border-b border-white/5 transition-all duration-300',
          isFocusMode && '-mt-16 opacity-0 pointer-events-none',
        )}
      >
        <div className="flex items-center gap-4 text-xs text-gray-500 font-mono">
          <span className="flex items-center gap-2">
            <Calendar size={12} /> {new Date(entry.createdAt).toLocaleDateString()}
          </span>
          <span className="w-px h-3 bg-white/10" />
          <div
            className={cn(
              'flex items-center gap-1.5 transition-colors w-[80px]',
              saveStatus === 'saved' && 'text-green-500/70',
              saveStatus === 'saving' && 'text-yellow-500/70',
              saveStatus === 'error' && 'text-red-500/70',
            )}
          >
            <Save size={12} className={cn(saveStatus === 'saving' && 'animate-pulse')} />
            <span className="text-[10px] font-mono uppercase tracking-tighter">
              {saveStatus}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Controls removed for minimalist mode */}
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto">
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

          <Input
            type="text"
            variant="unstyled"
            value={entry.title || ''}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="Title your thought..."
            className="w-full text-4xl font-display font-bold text-white placeholder-gray-700 focus:ring-0 px-0 py-4 mb-4 focus:outline-none bg-transparent border-none"
          />

          {/* Content */}
          <div className="flex-1 min-h-[500px]">
            <ForgeEditor
              content={entry.content}
              onChange={(v) => onChange({ content: v })}
              placeholder="Start writing... (Markdown supported)"
              className="min-h-[500px]"
            />
          </div>

          {/* Focus Mode button removed for minimalist UI */}
        </div>
      </div>
    </div>
  );
}



