'use client';

import { Globe, Layers, Brain, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';


import { useKnowledge } from '@/contexts/KnowledgeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { WidgetShell, Tag, Label, Button } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';

import { DiscoveredWidget } from './DiscoveredWidget';
import { DiscoveryCarousel } from './DiscoveryCarousel';
import { SearchWidget } from './SearchWidget';
import { StatsWidget } from './StatsWidget';

export const KnowledgeDashboard: React.FC = () => {
  const router = useRouter();
  const { history } = useKnowledge();
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
          <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-forge-cyan backdrop-blur-md">
            <Globe size={12} className="animate-pulse-slow" /> {t('knowledge.global_grid')}
          </div>
          <h1 className="uppercase text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
            {t('knowledge.dashboard_title')}
          </h1>
          <p className="text-gray-400 font-light text-sm md:text-base">
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

        {/* 4. Stoic Neural Consolidation Panel */}
        <div className="shrink-0 group/panel">
          <WidgetShell
            interactive={true}
            onClick={() => router.push('/forge/knowledge/flashcards')}
            className="w-full relative cursor-pointer border border-white/5 hover:border-forge-accent/20 transition-all duration-500 overflow-hidden"
            glowColor="forge-accent"
            topGlowColor="via-forge-accent/20"
          >
            {/* Pulsing neon amber backdrop particle aura */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-48 h-48 bg-forge-accent/5 rounded-full blur-3xl opacity-0 group-hover/panel:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-forge-accent/5 border border-forge-accent/15 text-forge-accent shrink-0 transition-all duration-500 group-hover/panel:border-forge-accent/40 group-hover/panel:shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                  <Brain size={24} className="animate-pulse" />
                </div>
                <div>
                  <Label variant="accent" className="font-mono text-forge-accent font-bold tracking-widest text-xs">
                    {t('knowledge.consolidate_title')}
                  </Label>
                  <p className="text-gray-400 text-xs mt-1.5 font-light leading-relaxed max-w-xl">
                    {t('knowledge.consolidate_desc')}
                  </p>
                </div>
              </div>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push('/forge/knowledge/flashcards');
                }}
                variant="glass"
                className="shrink-0 self-start md:self-center flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-forge-accent border-forge-accent/15 hover:border-forge-accent/40 hover:bg-forge-accent/10 transition-all cursor-pointer font-bold text-xs h-auto"
              >
                <span>{t('knowledge.consolidate_btn')}</span>
                <ArrowRight size={14} className="group-hover/panel:translate-x-1 transition-transform" />
              </Button>
            </div>
          </WidgetShell>
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
            history={history}
            onSelect={(c) => router.push(`/forge/knowledge/nexus/${encodeURIComponent(c.title)}?tab=source`)}
          />
        </div>
      </div>
    </div>
  );
};


