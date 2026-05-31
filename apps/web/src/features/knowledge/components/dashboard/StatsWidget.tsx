'use client';

import { BrainCircuit, Database, Share2, TrendingUp } from 'lucide-react';
import React from 'react';

import { useLanguage } from '@/contexts/LanguageContext';
import { WidgetShell } from '@/shared/components/ui';

interface StatsWidgetProps {
  totalCount: number;
}

export const StatsWidget: React.FC<StatsWidgetProps> = ({ totalCount }) => {
  const { t } = useLanguage();

  const stats = [
    {
      label: t('knowledge.artifacts_collected'),
      value: totalCount,
      icon: Database,
      trend: `+12% ${t('knowledge.this_week')}`,
    },
    {
      label: t('knowledge.synapses_active'),
      value: totalCount * 4 + 7,
      icon: Share2,
      trend: t('knowledge.optimal_flow'),
    },
    {
      label: t('knowledge.cognitive_load'),
      value: '42%',
      icon: BrainCircuit,
      trend: t('knowledge.stable'),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, i) => {
        return (
          <WidgetShell
            key={i}
            className="h-full relative overflow-hidden"
            interactive={true}
          >
            <div className="flex items-start justify-between mb-4 relative z-10">
              <span className="text-xs font-mono text-gray-500 uppercase tracking-widest font-bold">
                {stat.label}
              </span>
              <stat.icon size={16} className="text-gray-400 group-hover:text-white transition-colors" />
            </div>

            <div className="relative z-10">
              <div className="text-2xl font-bold font-display text-white mb-1">{stat.value}</div>
              <div className="flex items-center gap-1 text-[10px] text-gray-400">
                <TrendingUp size={10} />
                {stat.trend}
              </div>
            </div>
          </WidgetShell>
        );
      })}
    </div>
  );
};


