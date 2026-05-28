'use client';

import { Shield } from 'lucide-react';
import React from 'react';

import { useLanguage } from '@/contexts';

import type { UserStats } from '../../gamification/types';

interface UnlockedAchievementsProps {
  stats: UserStats;
}

export const UnlockedAchievements: React.FC<UnlockedAchievementsProps> = ({ stats }) => {
  const { t } = useLanguage();

  return (
    <div className="p-6 rounded-sm bg-[#050507]/60 border border-white/5 shadow-2xl backdrop-blur-2xl relative overflow-hidden group hover:border-forge-cyan/20 transition-all duration-300 font-mono">
      <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
        <span className="text-xs tracking-widest text-forge-cyan uppercase font-bold">
          {t('identity.unlocked_medals')}
        </span>
        <span className="text-[10px] text-zinc-500">
          TOTAL_LOCKS: {stats.achievements?.length || 0}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Title Section */}
        <div className="md:col-span-1 space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-zinc-500 border-b border-white/5 pb-2">
            {t('identity.active_designation')}
          </h4>
          <div className="p-4 rounded-sm bg-black border border-forge-cyan/20 text-center space-y-2">
            <span className="text-[9px] text-forge-cyan uppercase tracking-[0.2em] block">
              {t('identity.equipped_title')}
            </span>
            <span className="text-base font-bold text-white tracking-wider block">{stats.title.toUpperCase()}</span>
            <span className="text-[8px] text-zinc-600 block">UNLOCKED_AT_LV_01</span>
          </div>
        </div>

        {/* Badges Inventory Grid */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-zinc-500 border-b border-white/5 pb-2">
            {t('identity.highlighted_badges')}
          </h4>
          {stats.achievements?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.achievements.map((badge, idx) => (
                <div key={idx} className="p-3 rounded-sm bg-black/60 border border-forge-cyan/10 flex flex-col items-center justify-center text-center group/badge hover:border-forge-cyan/40 transition-colors">
                  <Shield size={20} className="text-forge-cyan animate-pulse mb-2" />
                  <span className="text-[10px] text-white tracking-wide uppercase truncate w-full">{badge}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-sm bg-black/40 border border-white/5 flex flex-col items-center justify-center text-center">
              <Shield size={24} className="text-zinc-700 mb-2" />
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
                {t('identity.no_achievements')}
              </span>
              <span className="text-[9px] text-zinc-600 mt-1">
                {t('identity.badge_desc')}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
