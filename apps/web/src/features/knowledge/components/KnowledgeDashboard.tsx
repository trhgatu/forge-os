'use client';

import { Layers } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';


import { useKnowledge } from '@/contexts/KnowledgeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { WidgetShell, Tag, Label } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';

import { useConcepts } from '../hooks/useKnowledge';

import { DiscoveredWidget } from './DiscoveredWidget';
import { DiscoveryCarousel } from './DiscoveryCarousel';
import { SearchWidget } from './SearchWidget';
import { StatsWidget } from './StatsWidget';

export const KnowledgeDashboard: React.FC = () => {
  const router = useRouter();
  const { history } = useKnowledge();
  const { data: savedConcepts = [] } = useConcepts();
  const { t, language } = useLanguage();
  const [activeSector, setActiveSector] = useState<string | null>(null);

  useEffect(() => {
    setActiveSector(null);
  }, []);

  const sectorList = language === 'vi'
    ? ['Công nghệ', 'Khoa học', 'Lịch sử', 'Triết học', 'Nghệ thuật', 'Vũ trụ']
    : ['Technology', 'Science', 'History', 'Philosophy', 'Art', 'Cosmos'];

  const handleSectorClick = (cat: string) => {
    if (activeSector) return;
    setActiveSector(cat);
    router.push(`/forge/knowledge/nexus/${encodeURIComponent(cat)}?tab=source`);
  };

  return (
    <div className="flex-1 w-full flex flex-col lg:flex-row gap-6 p-6 md:p-8 max-w-[1600px] mx-auto overflow-hidden min-h-0">
      {/* LEFT COLUMN: Main Workspace (2/3 width) */}
      <div className="flex-1 lg:flex-[2] flex flex-col gap-6 overflow-y-auto pr-2 scrollbar-hide min-h-0">
        {/* 1. Header Section */}
        <div className="flex flex-col gap-2 shrink-0">
          {/* Ethereal label */}
          <div className="mb-3 flex items-center gap-2 opacity-85">
            <div className="h-px w-8 bg-gradient-to-r from-forge-cyan/40 to-transparent" />
            <Label variant="cyan" className="text-[10px] font-mono tracking-[0.4em] uppercase flex items-center gap-1.5">
              {t('knowledge.global_grid')}
            </Label>
          </div>

          {/* Poetic Title */}
          <Label variant="default" className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-3 block capitalize">
            {t('knowledge.dashboard_title')}
          </Label>

          {/* Flowing Subtitle */}
          <p className="text-sm text-gray-400 font-light leading-relaxed max-w-xl">
            {t('knowledge.dashboard_desc')}
          </p>
        </div>

        {/* 2. Search & Featured Row */}
        <div className="flex flex-col gap-6 shrink-0">
          <SearchWidget />
          <DiscoveryCarousel />
        </div>

        {/* 3. Stats Section */}
        <div className="shrink-0">
          <StatsWidget totalCount={history.length} />
        </div>
      </div>

      {/* RIGHT COLUMN: Sidebar (1/3 width) */}
      <div className="w-full lg:w-[380px] shrink-0 flex flex-col gap-6 h-full min-h-0 overflow-hidden">
        {/* Sectors Widget */}
        <WidgetShell
          className="shrink-0"
          title={
            <Label icon={<Layers size={14} />} variant="cyan">
              {t('knowledge.sectors')}
            </Label>
          }
          glowColor="forge-cyan"
          topGlowColor="via-forge-cyan/30"
        >
          <div className="flex flex-wrap gap-2">
            {sectorList.map((cat) => {
              const isPending = activeSector === cat;
              const isDisabled = activeSector !== null && activeSector !== cat;
              return (
                <Tag
                  key={cat}
                  variant="cyan"
                  interactive={true}
                  active={isPending}
                  disabled={isDisabled}
                  onClick={() => handleSectorClick(cat)}
                  className={cn(
                    isPending && 'animate-pulse shadow-[0_0_15px_rgba(6,182,212,0.15)] cursor-wait'
                  )}
                >
                  {cat}
                </Tag>
              );
            })}
          </div>
        </WidgetShell>

        {/* Recently Discovered Feed Widget */}
        <div className="flex-1 min-h-0 overflow-hidden relative">
          <DiscoveredWidget
            history={savedConcepts.length > 0 ? savedConcepts : history}
            onSelect={(c) => router.push(`/forge/knowledge/nexus/${encodeURIComponent(c.title)}?tab=source`)}
          />
        </div>
      </div>
    </div>
  );
};


