import { Book, Search, ArrowRight, Bookmark, Plus, Users } from 'lucide-react';
import React from 'react';

import { GlassCard } from '@/shared/components/ui/GlassCard';
import { Button, Input, Label, Tag } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';

import type { Foundation } from '../types';

import { FoundationDetail } from './FoundationDetail';

interface FoundationLibraryProps {
  foundations: Foundation[];
  activeFoundation: Foundation | null;
  setActiveFoundation: (foundation: Foundation | null) => void;
}

export const FoundationLibrary: React.FC<FoundationLibraryProps> = ({
  foundations,
  activeFoundation,
  setActiveFoundation,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredFoundations = React.useMemo(() => {
    return foundations.filter(
      (doc) =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doc.description || '').toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [foundations, searchTerm]);

  if (activeFoundation) {
    return (
      <FoundationDetail foundation={activeFoundation} onBack={() => setActiveFoundation(null)} />
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 pb-32 space-y-8 animate-in fade-in zoom-in-95 duration-500">
      {/* Header - Synchronized Alchemical Style */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          {/* Ethereal label */}
          <div className="mb-3 flex items-center gap-2 opacity-85">
            <div className="h-px w-8 bg-gradient-to-r from-forge-cyan/40 to-transparent" />
            <Label variant="cyan" className="text-[10px] font-mono tracking-[0.4em] uppercase">
              System Operations
            </Label>
          </div>

          {/* Poetic Title */}
          <Label variant="default" className="text-3xl md:text-4xl font-bold text-white tracking-tight block capitalize mb-2">
            Foundation Library
          </Label>

          {/* Flowing Subtitle */}
          <p className="text-gray-400 font-light">Codified knowledge and recurring patterns.</p>
        </div>

        <div className="flex items-center gap-3">
          <Input
            placeholder="Search foundations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search size={14} />}
            className="bg-black/40 text-xs h-10 border-white/10 w-full md:w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar / Categories */}
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <Label variant="dim" className="text-xs font-mono uppercase tracking-widest mb-4 block">
              Categories
            </Label>
            <div className="space-y-1">
              {['All Foundations', 'Frameworks', 'Guides', 'Technical', 'Philosophy'].map(
                (cat, i) => (
                  <Tag
                    interactive
                    active={i === 0}
                    variant={i === 0 ? 'cyan' : 'default'}
                    key={cat}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between border-none cursor-pointer"
                  >
                    {cat}
                    {i === 0 && (
                      <span className="text-[10px] bg-white/20 px-1.5 rounded text-white font-bold">
                        {foundations.length}
                      </span>
                    )}
                  </Tag>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFoundations.length > 0 ? (
            filteredFoundations.map((doc) => (
              <GlassCard
                key={doc.id}
                className="group hover:border-white/20 cursor-pointer flex flex-col"
                noPadding
                onClick={() => setActiveFoundation(doc)}
              >
                <div className="p-5 flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-fuchsia-500/10 text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors">
                        <Book size={18} />
                      </div>
                      <div>
                        <Label
                          variant="default"
                          className="font-bold text-white group-hover:text-fuchsia-300 transition-colors line-clamp-1 block text-sm"
                        >
                          {doc.title}
                        </Label>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-gray-500 font-mono uppercase">
                            {doc.type}
                          </span>
                          {doc.status && (
                            <span
                              className={cn(
                                'w-1.5 h-1.5 rounded-full',
                                doc.status === 'stable' ? 'bg-emerald-500' : 'bg-amber-500',
                              )}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <Bookmark
                      size={16}
                      className="text-gray-600 hover:text-white transition-colors"
                    />
                  </div>

                  <p className="text-sm text-gray-400 line-clamp-2 mb-4 h-10 font-light leading-relaxed">{doc.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      {doc.metrics?.usageCount && <Users size={10} />}
                      {doc.updatedAt.toLocaleDateString()}
                    </span>
                    <Button variant="ghost" className="flex items-center gap-1 text-xs text-fuchsia-400 hover:text-white transition-colors p-0 h-auto bg-transparent hover:bg-transparent">
                      Read <ArrowRight size={12} />
                    </Button>
                  </div>
                </div>
              </GlassCard>
            ))
          ) : (
            <div className="col-span-2 text-center py-12 text-gray-500 font-light">
              No foundations found matching &quot;{searchTerm}&quot;
            </div>
          )}
          <button className="border border-dashed border-white/10 rounded-2xl flex items-center justify-center p-6 hover:bg-white/5 hover:border-white/20 transition-all text-gray-500 hover:text-white group gap-2 min-h-[180px] cursor-pointer">
            <Plus size={20} />
            <span className="font-medium">Add New Foundation</span>
          </button>
        </div>
      </div>
    </div>
  );
};


