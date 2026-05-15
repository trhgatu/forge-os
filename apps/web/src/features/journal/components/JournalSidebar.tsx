'use client';

import { format } from 'date-fns';
import { Search, Plus, Trash2 } from 'lucide-react';
import React from 'react';

import type { JournalEntry } from '@/features/journal/types';
import { MOOD_COLORS } from '@/shared/constants';
import { cn } from '@/shared/lib/utils';

interface JournalSidebarProps {
  entries: JournalEntry[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
}

export function JournalSidebar({
  entries,
  selectedId,
  onSelect,
  onNew,
  onDelete,
}: JournalSidebarProps) {
  return (
    <div className="w-80 flex flex-col border-r border-white/5 bg-black/20 backdrop-blur-xl h-full font-lato">
      <div className="p-4 border-b border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-white tracking-widest text-sm">JOURNAL</h2>
          <button
            onClick={onNew}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10 hover:border-forge-cyan/50"
          >
            <Plus size={18} />
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
          <input
            type="text"
            placeholder="Search thoughts..."
            className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-9 pr-3 text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-forge-cyan/50 transition-colors"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <h3 className="px-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4">
          Timeline
        </h3>
        
        {entries.length > 0 ? (
          entries.map((entry) => (
            <div
              key={entry.id}
              onClick={() => onSelect(entry.id)}
              className={cn(
                'group relative p-3 rounded-lg cursor-pointer border transition-all duration-300 mb-2',
                selectedId === entry.id
                  ? 'bg-forge-cyan/5 border-forge-cyan/30 shadow-[0_0_20px_rgba(34,211,238,0.05)]'
                  : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/5',
              )}
            >
              <div className="flex flex-col gap-1.5 min-w-0 pr-6">
                <div className="flex items-center justify-between gap-2">
                  <h4 className={cn(
                    "text-sm font-bold truncate transition-colors",
                    selectedId === entry.id ? "text-forge-cyan" : "text-white group-hover:text-forge-cyan"
                  )}>
                    {entry.title || 'Untitled Entry'}
                  </h4>
                  <span className="text-[10px] text-zinc-500 font-mono whitespace-nowrap">
                    {entry.createdAt ? format(new Date(entry.createdAt), 'HH:mm') : '--:--'}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {entry.content || 'Empty content'}
                </p>
                
                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {entry.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded-sm bg-white/5 text-zinc-500 border border-white/5">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Delete Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('>>> DELETE BUTTON CLICKED <<<', entry.id);
                  if (!entry.id) {
                    alert('Error: Journal ID is missing. Please refresh.');
                    return;
                  }
                  onDelete(entry.id);
                }}
                className="absolute top-3 right-3 z-50 p-1.5 rounded-sm bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/20 cursor-pointer border border-red-500/20"
                title="Delete"
              >
                <Trash2 size={12} />
              </button>

              {/* Status Indicator */}
              {entry.mood && (
                <div 
                  className={cn(
                    "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full",
                    MOOD_COLORS[entry.mood as keyof typeof MOOD_COLORS]?.split(' ')[1] || 'bg-zinc-700'
                  )}
                />
              )}
            </div>
          ))
        ) : (
          <div className="px-4 py-12 text-center border border-dashed border-white/10 rounded-lg bg-white/[0.02]">
            <p className="text-xs text-zinc-500 font-mono italic">
              No thoughts recorded yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
