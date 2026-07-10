'use client';

import { MoodType } from '@forge/reflection';
import { Calendar, Save, Lock, Check, Pencil } from 'lucide-react';

import type { JournalEntry } from '@/features/journal/types';
import { ForgeEditor } from '@/shared/components/editor/ForgeEditor';
import { MarkdownPreview } from '@/shared/components/editor/MarkdownPreview';
import { Input, Button, Skeleton } from '@/shared/components/ui';
import { MOOD_COLORS } from '@/shared/constants';
import { cn } from '@/shared/lib/utils';

import { MoodSelector } from './MoodSelector';

export function JournalEditor({
  entry,
  onChange,
  isFocusMode,
  toggleFocusMode,
  saveStatus = 'saved',
  isEditing,
  setIsEditing,
  isContentLoading = false,
  onSeal,
}: {
  entry: JournalEntry;
  onChange: (v: Partial<JournalEntry>) => void;
  isFocusMode: boolean;
  toggleFocusMode: () => void;
  saveStatus?: 'saved' | 'saving' | 'error';
  isEditing: boolean;
  setIsEditing: (v: boolean) => void;
  isContentLoading?: boolean;
  onSeal: () => void;
}) {
  const isSealed = entry.status === 'published';

  const handleSeal = () => {
    if (isSealed) return;
    onSeal();
  };

  return (
    <div
      className={cn('flex-1 flex flex-col transition-all duration-300', isFocusMode && 'bg-black')}
    >
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
          {!isSealed && (
            isEditing ? (
              <Button
                onClick={() => setIsEditing(false)}
                variant="outline"
                size="sm"
                className="text-[10px] font-mono uppercase tracking-wider h-7 px-3 flex items-center gap-1.5 hover:border-forge-cyan/40 hover:text-forge-cyan border-white/10 text-white/70"
              >
                <Check size={10} />
                Done
              </Button>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                size="sm"
                className="text-[10px] font-mono uppercase tracking-wider h-7 px-3 flex items-center gap-1.5 hover:border-forge-cyan/40 hover:text-forge-cyan border-white/10 text-white/70"
              >
                <Pencil size={10} />
                Edit Reflection
              </Button>
            )
          )}

          {isSealed ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-forge-cyan/10 border border-forge-cyan/20 text-forge-cyan text-[10px] font-mono uppercase tracking-widest">
              <Check size={11} />
              Reflection Sealed
            </div>
          ) : (
            <Button
              onClick={handleSeal}
              variant="outline"
              size="sm"
              className="text-[10px] font-mono uppercase tracking-wider h-7 px-3 flex items-center gap-1.5 hover:border-forge-cyan/40 hover:text-forge-cyan border-white/10 text-white/70"
            >
              <Lock size={10} />
              Seal Reflection
            </Button>
          )}
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-8 py-8 min-h-full flex flex-col">
          {/* Mood Selector / Badge */}
          <div
            className={cn(
              'transition-opacity duration-200 mb-6',
              isFocusMode ? 'opacity-0 hover:opacity-100' : 'opacity-100',
            )}
          >
            {isEditing ? (
              <MoodSelector mood={entry.mood || MoodType.NEUTRAL} onSelect={(m) => onChange({ mood: m })} />
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider font-mono text-zinc-500">
                  Mood:
                </span>
                <span className={cn(
                  'px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-mono border border-white/10',
                  MOOD_COLORS[entry.mood || MoodType.NEUTRAL]
                )}>
                  {entry.mood || MoodType.NEUTRAL}
                </span>
              </div>
            )}
          </div>

          {isEditing ? (
            <Input
              type="text"
              variant="unstyled"
              value={entry.title || ''}
              onChange={(e) => onChange({ title: e.target.value })}
              placeholder="Title your thought..."
              className="w-full text-4xl font-display font-bold text-white placeholder-gray-700 focus:ring-0 px-0 py-4 mb-4 focus:outline-none bg-transparent border-none"
            />
          ) : (
            <h1 className={cn(
              "w-full text-4xl font-display font-bold px-0 py-4 mb-4 select-text",
              entry.title ? "text-white" : "text-gray-600 italic"
            )}>
              {entry.title || 'Untitled Thought'}
            </h1>
          )}

          {/* Content */}
          <div className="flex-1 min-h-[500px]">
            {isContentLoading ? (
              <div className="space-y-4 py-4">
                <Skeleton variant="default" className="h-6 w-full rounded-md" />
                <Skeleton variant="default" className="h-6 w-[90%] rounded-md" />
                <Skeleton variant="default" className="h-6 w-[95%] rounded-md" />
                <Skeleton variant="default" className="h-6 w-[80%] rounded-md" />
              </div>
            ) : isEditing ? (
              <ForgeEditor
                content={entry.content}
                onChange={(v) => onChange({ content: v })}
                placeholder="Start writing... (Markdown supported)"
                className="min-h-[500px]"
              />
            ) : (
              <div className="select-text">
                <MarkdownPreview content={entry.content || '*No content written yet.*'} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}



