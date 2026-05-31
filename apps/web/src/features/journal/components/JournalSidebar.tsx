'use client';

import { format } from 'date-fns';
import { Search, Plus, Trash2 } from 'lucide-react';

import type { JournalEntry } from '@/features/journal/types';
import { Button, Input, GlassCard, Tag, Label, EmptyState } from '@/shared/components/ui';
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
    <div className="w-80 flex flex-col border-r border-white/5 bg-black/20 backdrop-blur-xl h-full font-lato">
      <div className="p-4 border-b border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <Label variant="cyan" className="text-sm font-semibold tracking-widest uppercase">JOURNAL</Label>
          <Button
            variant="outline"
            size="icon"
            onClick={onNew}
            className="hover:border-forge-cyan/50 hover:text-forge-cyan"
          >
            <Plus size={18} />
          </Button>
        </div>
        <Input
          placeholder="Search thoughts..."
          icon={<Search size={14} />}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-black/40 text-xs h-9"
        />
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <Label variant="dim" className="px-2 mb-4 block">
          Timeline
        </Label>

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
                  <span className="text-[10px] text-zinc-500 font-mono whitespace-nowrap transition-opacity group-hover:opacity-0">
                    {entry.createdAt ? format(new Date(entry.createdAt), 'HH:mm') : '--:--'}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {entry.content || 'Empty content'}
                </p>

                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {entry.tags.slice(0, 2).map((tag: string) => (
                      <Tag key={tag} size="sm" variant="default" className="text-[9px] py-0 px-1.5 border-white/5 bg-white/5 text-zinc-500">
                        #{tag}
                      </Tag>
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
                className="absolute top-3 right-3 h-7 w-7 opacity-0 group-hover:opacity-100 transition-all"
                title="Delete"
              >
                <Trash2 size={12} />
              </Button>

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
          <EmptyState
            title="Lưới Trống"
            description="Chưa ghi nhận suy ngẫm nào."
            glowColor="cyan"
            size="sm"
            className="py-10 border-dashed border-white/5 bg-white/[0.01]"
          />
        )}
      </div>
    </div>
  );
}
