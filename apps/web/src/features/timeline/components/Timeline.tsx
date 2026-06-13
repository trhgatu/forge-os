'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Label, Tag } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import type { TimelineType } from '@/shared/types/timeline';

import { TYPE_CONFIG } from '../config';
import { useTimeline } from '../hooks/useTimeline';

import ContextPanel from './ContextPanel';
import TimelineCard from './TimelineCard';
import TimelineNode from './TimelineNode';

/* import { analyzeTimelineItem } from "@/services/geminiService"; */

export const Timeline = () => {
  /* const [items] = useState<TimelineItem[]>(MOCK_TIMELINE); */
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useTimeline();

  const items = data?.pages.flatMap((page) => page.data) || [];

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<TimelineType | 'all'>('all');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const filteredItems = filterType === 'all' ? items : items.filter((i) => i.type === filterType);
  // Note: sorting is done by backend now, but safer to keep if needed. Backend should sort.
  const sortedItems = filteredItems; // [...filteredItems].sort((a, b) => b.date.getTime() - a.date.getTime());

  const handleAnalyze = async (id: string) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    setIsAnalyzing(true);

    try {
      // TODO: Implement actual analysis logic
      /* const analysis = await analyzeTimelineItem(item.type, item.content);

            setItems((prev) =>
              prev.map((i) =>
                i.id === id
                  ? { ...i, analysis }
                  : i
              )
            ); */
    } catch (e) {
      console.error('Timeline analysis failed:', e);
      toast.error('Failed to analyze timeline item');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const selectedItem = selectedId ? items.find((i) => i.id === selectedId) || null : null;

  return (
    <div className="h-full w-full flex bg-forge-bg relative overflow-hidden animate-in fade-in duration-700">
      <div className="lg:flex w-64 flex-col border-r border-white/5 bg-black/20 backdrop-blur-xl h-full p-6 z-20">
        <Label variant="dim" className="text-xs font-mono uppercase tracking-widest mb-6 block">
          Timeline Stream
        </Label>
        <div className="space-y-2">
          <Tag
            interactive
            active={filterType === 'all'}
            variant={filterType === 'all' ? 'cyan' : 'default'}
            onClick={() => setFilterType('all')}
            className="w-full justify-start px-3 py-2 text-xs font-mono tracking-wide cursor-pointer"
          >
            All Streams
          </Tag>
          {Object.entries(TYPE_CONFIG).map(([type, config]) => {
            const isActive = filterType === type;
            return (
              <Tag
                key={type}
                interactive
                active={isActive}
                variant={isActive ? 'cyan' : 'default'}
                onClick={() => setFilterType(type as TimelineType)}
                className="w-full justify-start px-3 py-2 text-xs font-mono tracking-wide cursor-pointer flex items-center gap-2"
              >
                <config.icon
                  size={12}
                  className={cn(isActive ? 'text-white' : config.color)}
                />
                <span>{config.label}</span>
              </Tag>
            );
          })}
        </div>
      </div>
      <div
        className="flex-1 h-full overflow-y-auto relative scrollbar-hide"
        id="timeline-scroll-container"
      >
        <div className="sticky top-0 z-40 w-full p-8 backdrop-blur-xl bg-transparent border-b border-white/5 pointer-events-none flex justify-between items-start">
          <div className="pointer-events-auto">
            {/* Ethereal label */}
            <div className="mb-3 flex items-center gap-2 opacity-80 animate-in fade-in slide-in-from-left-4 duration-500">
              <div className="h-px w-8 bg-gradient-to-r from-forge-cyan/40 to-transparent" />
              <Label variant="cyan" className="text-[10px] font-mono tracking-[0.4em] uppercase">
                Chronicle Matrix
              </Label>
            </div>

            {/* Poetic Title */}
            <Label variant="default" className="text-4xl md:text-5xl font-bold text-white tracking-tight block leading-tight mb-2 capitalize animate-in fade-in slide-in-from-left-4 duration-500 delay-75">
              Chronicle
            </Label>

            {/* Subtitle */}
            <p className="text-xs text-gray-500 mt-1 font-mono uppercase tracking-widest">{sortedItems.length} Artifacts Recorded</p>
          </div>

          <button
            onClick={() => toast.info('New timeline entry coming soon')}
            className="pointer-events-auto p-3 rounded-full bg-forge-accent text-white shadow-lg hover:scale-110 transition-transform mt-6"
          >
            <Plus size={20} />
          </button>
        </div>

        <div className="relative max-w-3xl mx-auto pb-32 min-h-screen">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-transparent via-forge-accent to-transparent opacity-50" />
          <div className="pt-12 relative">
            {sortedItems.map((item, index) => (
              <div key={item.id} className="relative flex w-full">
                <TimelineNode
                  item={item}
                  isLeft={index % 2 === 0}
                  isSelected={selectedId === item.id}
                />

                <TimelineCard
                  item={item}
                  isLeft={index % 2 === 0}
                  isSelected={selectedId === item.id}
                  onClick={() => setSelectedId(item.id)}
                />
              </div>
            ))}
            {hasNextPage && (
              <div className="flex justify-center p-8 z-10 relative">
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors text-sm font-medium disabled:opacity-50"
                >
                  {isFetchingNextPage ? 'Loading more artifacts...' : 'Reveal prior moments'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {selectedItem && (
        <ContextPanel
          item={selectedItem}
          onClose={() => setSelectedId(null)}
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
        />
      )}
    </div>
  );
};


