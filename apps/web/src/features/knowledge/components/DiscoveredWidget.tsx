'use client';

import { History, Clock, ArrowRight, Layers } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { useLanguage } from '@/contexts/LanguageContext';
import { WidgetShell, Tag, Label, EmptyState } from '@/shared/components/ui';
import type { KnowledgeConcept } from '@/shared/types';

interface DiscoveredWidgetProps {
  history: KnowledgeConcept[];
  onSelect: (concept: KnowledgeConcept) => void;
}

export const DiscoveredWidget: React.FC<DiscoveredWidgetProps> = ({ history, onSelect }) => {
  const { t } = useLanguage();

  if (history.length === 0) {
    return (
      <WidgetShell className="h-full min-h-[300px]" interactive={false}>
        <EmptyState
          icon={<History size={24} />}
          title={t('knowledge.no_recent_artifacts')}
          description={t('knowledge.start_exploring')}
          glowColor="cyan"
          className="h-full border-none bg-transparent"
        />
      </WidgetShell>
    );
  }

  return (
    <WidgetShell
      className="h-full min-h-0"
      title={
        <Label icon={<History size={16} />} variant="cyan">
          {t('knowledge.recent_discovered')}
        </Label>
      }
      glowColor="white"
      topGlowColor="via-forge-cyan/30"
    >
      <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar relative z-10 min-h-0">
        {history.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => onSelect(item)}
            className="group/item relative flex items-center p-3.5 rounded-2xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.04] hover:border-forge-cyan/20 transition-all duration-300 cursor-pointer overflow-hidden shadow-md hover:shadow-[0_0_20px_rgba(34,211,238,0.04)]"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {/* Cyber Glow Left Accent Strip */}
            <div className="absolute inset-y-0 left-0 w-1 bg-transparent group-hover/item:bg-gradient-to-b group-hover/item:from-forge-cyan group-hover/item:to-blue-500 transition-all duration-300 group-hover/item:shadow-[0_0_8px_#22D3EE]" />
            
            {/* Holographic glowing image mask */}
            <div className="relative w-12 h-12 rounded-xl bg-[#030305] border border-white/10 group-hover/item:border-forge-cyan/40 overflow-hidden shrink-0 mr-4 transition-all duration-300 group-hover/item:shadow-[0_0_12px_rgba(34,211,238,0.15)]">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover opacity-60 group-hover/item:opacity-90 group-hover/item:scale-115 transition-all duration-700"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-600 group-hover/item:text-forge-cyan transition-colors">
                  <Layers size={16} />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold tracking-wide text-gray-300 group-hover/item:text-white truncate font-display transition-colors">
                {item.title}
              </h4>
              <div className="flex items-center gap-2 mt-1.5">
                <Clock size={10} className="text-gray-600" />
                <span className="text-[10px] text-gray-500 font-mono">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
                {item.language && (
                  <Tag size="sm" className="py-0.5 px-1.5 bg-white/5 border border-white/5 text-gray-400 group-hover/item:text-forge-cyan uppercase font-mono transition-colors">
                    {item.language}
                  </Tag>
                )}
              </div>
            </div>

            <ArrowRight
              size={14}
              className="text-forge-cyan opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all duration-300 ease-out"
            />
          </div>
        ))}
      </div>
    </WidgetShell>
  );
};


