'use client';

import { Shield, Flame, Zap, Brain, Target } from 'lucide-react';
import React from 'react';

import { useLanguage } from '@/contexts';
import { Label, Tag } from '@/shared/components/ui';

import type { UserStats } from '../../gamification/types';

interface AttributeCardsProps {
  stats: UserStats;
}

export const AttributeCards: React.FC<AttributeCardsProps> = ({ stats }) => {
  const { t } = useLanguage();

  const attrDiscipline = stats.discipline || 0;
  const attrConsistency = stats.consistency || 0;
  const attrWillpower = stats.willpower || 0;
  const attrAwareness = stats.awareness || 0;
  const attrPresence = stats.presence || 0;

  return (
    <div className="lg:col-span-3 space-y-4">
      <Label variant="dim" className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block mb-1">
        {t('identity.indicators')}
      </Label>

      {/* 1. DISCIPLINE CARD */}
      <div className="p-4 rounded-sm bg-[#050507]/60 border border-white/5 shadow-md flex justify-between items-center group hover:border-forge-cyan/20 transition-all duration-300 relative">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-forge-cyan/10 border border-forge-cyan/20 flex items-center justify-center text-forge-cyan shadow-[0_0_8px_rgba(34,211,238,0.1)]">
            <Shield size={16} />
          </div>
          <div>
            <Label variant="default" className="text-sm font-bold text-white tracking-wide block">{t('identity.discipline')}</Label>
            <p className="text-[10px] text-zinc-500 font-sans">{t('identity.discipline_desc')}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xl font-mono font-bold text-forge-cyan tracking-wider">{attrDiscipline}</span>
          <Label variant="dim" className="text-[9px] text-zinc-600 block uppercase font-mono">{t('identity.points')}</Label>
        </div>
      </div>

      {/* 2. CONSISTENCY CARD */}
      <div className="p-4 rounded-sm bg-[#050507]/60 border border-white/5 shadow-md flex justify-between items-center group hover:border-forge-cyan/20 transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-forge-cyan/10 border border-forge-cyan/20 flex items-center justify-center text-forge-cyan shadow-[0_0_8px_rgba(34,211,238,0.1)]">
            <Flame size={16} />
          </div>
          <div>
            <Label variant="default" className="text-sm font-bold text-white tracking-wide block">{t('identity.consistency')}</Label>
            <p className="text-[10px] text-zinc-500 font-sans">{t('identity.consistency_desc')}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xl font-mono font-bold text-forge-cyan tracking-wider">{attrConsistency}</span>
          <Label variant="dim" className="text-[9px] text-zinc-600 block uppercase font-mono">{t('identity.points')}</Label>
        </div>
      </div>

      {/* 3. WILLPOWER CARD */}
      <div className="p-4 rounded-sm bg-[#050507]/60 border border-white/5 shadow-md flex justify-between items-center group hover:border-forge-cyan/20 transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-forge-cyan/10 border border-forge-cyan/20 flex items-center justify-center text-forge-cyan shadow-[0_0_8px_rgba(34,211,238,0.1)]">
            <Zap size={16} />
          </div>
          <div>
            <Label variant="default" className="text-sm font-bold text-white tracking-wide block">{t('identity.willpower')}</Label>
            <p className="text-[10px] text-zinc-500 font-sans">{t('identity.willpower_desc')}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xl font-mono font-bold text-forge-cyan tracking-wider">{attrWillpower}</span>
          <Label variant="dim" className="text-[9px] text-zinc-600 block uppercase font-mono">{t('identity.points')}</Label>
        </div>
      </div>

      {/* 4. AWARENESS CARD */}
      <div className="p-4 rounded-sm bg-[#050507]/60 border border-white/5 shadow-md flex justify-between items-center group hover:border-forge-cyan/20 transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-forge-cyan/10 border border-forge-cyan/20 flex items-center justify-center text-forge-cyan shadow-[0_0_8px_rgba(34,211,238,0.1)]">
            <Brain size={16} />
          </div>
          <div>
            <Label variant="default" className="text-sm font-bold text-white tracking-wide block">{t('identity.awareness')}</Label>
            <p className="text-[10px] text-zinc-500 font-sans">{t('identity.awareness_desc')}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xl font-mono font-bold text-forge-cyan tracking-wider">{attrAwareness}</span>
          <Label variant="dim" className="text-[9px] text-zinc-600 block uppercase font-mono">{t('identity.points')}</Label>
        </div>
      </div>

      {/* 5. PRESENCE CARD */}
      <div className="p-4 rounded-sm bg-[#050507]/60 border border-white/5 shadow-md flex justify-between items-center group hover:border-forge-cyan/20 transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-forge-cyan/10 border border-forge-cyan/20 flex items-center justify-center text-forge-cyan shadow-[0_0_8px_rgba(34,211,238,0.1)]">
            <Target size={16} />
          </div>
          <div>
            <Label variant="default" className="text-sm font-bold text-white tracking-wide block">{t('identity.presence')}</Label>
            <p className="text-[10px] text-zinc-500 font-sans">{t('identity.presence_desc')}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xl font-mono font-bold text-forge-cyan tracking-wider">{attrPresence}</span>
          <Label variant="dim" className="text-[9px] text-zinc-600 block uppercase font-mono">{t('identity.points')}</Label>
        </div>
      </div>
    </div>
  );
};
