'use client';

import { format } from 'date-fns';
import { Search, Plus, Trash2 } from 'lucide-react';

import type { JournalEntry } from '@/features/journal/types';
import { Button, Input, GlassCard } from '@/shared/components/ui';
import { MOOD_COLORS } from '@/shared/constants';
import { cn } from '@/shared/lib/utils';

interface JournalSidebarProps {
  entries: JournalEntry[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function JournalSidebar({
  entries,
  selectedId,
  onSelect,
  onNew,
  onDelete,
  searchQuery,
  onSearchChange,
}: JournalSidebarProps) {
  return (
    <div className="w-80 flex flex-col border-r dark:border-white/5 border-black/5 dark:bg-[#080808]/95 bg-[#fcfbfa]/98 backdrop-blur-3xl h-full font-serif relative select-none transition-colors duration-300">
      {/* Torn Border divider */}
      <div className="absolute right-0 top-0 bottom-0 w-[1px] dark:bg-white/10 bg-black/5 z-50 pointer-events-none" style={{ filter: "url(#line-torn-filter)" }} />

      <div className="p-4 border-b dark:border-white/5 border-black/5 space-y-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-red-700/60 font-black text-sm tracking-wider">記</span>
            <h2 className="font-serif font-black dark:text-gray-400 text-zinc-500 tracking-[0.2em] text-xs uppercase">
              JOURNAL
            </h2>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={onNew}
            className="dark:hover:border-red-800/50 hover:border-red-700/30 dark:hover:text-red-600 hover:text-red-700 rounded-lg cursor-pointer transition-all duration-300"
          >
            <Plus size={16} />
          </Button>
        </div>
        <Input
          placeholder="Search thoughts..."
          icon={<Search size={13} className="text-zinc-500" />}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="dark:bg-white/[0.02] bg-black/[0.01] dark:border-white/5 border-black/5 text-xs h-9 font-sans font-medium tracking-wide dark:text-white text-zinc-800"
        />
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2 relative z-10 scrollbar-hide">
        <div className="flex items-center gap-1.5 px-2 mb-4">
          <span className="font-serif text-red-700/40 font-black text-xs">歴</span>
          <h3 className="text-[9px] font-sans font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-widest">
            TIMELINE
          </h3>
        </div>

        {entries.length > 0 ? (
          entries.map((entry) => (
            <div
              key={entry.id}
              onClick={() => onSelect(entry.id)}
              className={cn(
                'group relative p-3 rounded-lg cursor-pointer border transition-all duration-300 mb-2',
                selectedId === entry.id
                  ? 'dark:bg-white/[0.03] bg-black/[0.015] dark:border-y border-white/5 border-black/5 border-l-2 border-l-red-700/80 border-r-transparent'
                  : 'bg-transparent border-transparent dark:hover:bg-white/[0.015] hover:bg-black/[0.005] dark:hover:border-white/5 hover:border-black/5',
              )}
            >
              {selectedId === entry.id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-6 bg-red-700 shadow-[0_0_10px_rgba(185,28,28,0.5)] transition-all duration-500" style={{ filter: "url(#line-torn-filter)" }} />
              )}

              <div className="flex flex-col gap-1.5 min-w-0 pr-6">
                <div className="flex items-center justify-between gap-2">
                  <h4 className={cn(
                    "text-xs font-sans font-bold tracking-wide truncate transition-colors",
                    selectedId === entry.id ? "dark:text-white text-[#1c1c1a]" : "dark:text-zinc-500 text-zinc-400 dark:group-hover:text-white group-hover:text-[#1c1c1a]"
                  )}>
                    {entry.title || 'Untitled Entry'}
                  </h4>
                  <span className="text-[9px] text-zinc-600 font-sans whitespace-nowrap transition-opacity group-hover:opacity-0">
                    {entry.createdAt ? format(new Date(entry.createdAt), 'HH:mm') : '--:--'}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-600 font-sans leading-relaxed line-clamp-2">
                  {entry.content || 'Empty content...'}
                </p>

                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {entry.tags.slice(0, 2).map((tag: string) => (
                      <span key={tag} className="text-[8px] px-1.5 py-0.5 rounded dark:bg-white/[0.02] bg-black/[0.01] dark:text-zinc-600 text-zinc-500 dark:border-white/5 border-black/5 font-sans">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Delete Button */}
              <Button
                variant="danger"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(entry.id);
                }}
                className="absolute top-3 right-3 h-6 w-6 opacity-0 group-hover:opacity-100 transition-all rounded hover:bg-red-950/40 hover:text-red-500 border border-transparent cursor-pointer"
                title="Delete"
              >
                <Trash2 size={11} />
              </Button>

              {/* Status Indicator */}
              {entry.mood && (
                <div
                  className={cn(
                    "absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6",
                    selectedId === entry.id ? "bg-red-700/80" : "bg-zinc-800/40"
                  )}
                />
              )}
            </div>
          ))
        ) : (
          <GlassCard interactive={false} className="py-12 text-center dark:bg-white/[0.01] bg-black/[0.005] border-dashed dark:border-white/5 border-black/5" style={{ filter: "url(#line-torn-filter)" }}>
            <p className="text-xs text-zinc-600 font-sans italic">
              No thoughts recorded in the chronicle yet.
            </p>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
