'use client';

import { Shield, Flame, Sparkles } from 'lucide-react';
import React from 'react';

import { useLanguage } from '@/contexts';
import { Label, Tag } from '@/shared/components/ui';

import type { UserStats } from '../../gamification/types';

interface ProfileCardProps {
  stats: UserStats;
  user: any;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ stats, user }) => {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 p-6 rounded-sm bg-[#050507]/60 border border-white/5 shadow-2xl backdrop-blur-2xl flex flex-col md:flex-row gap-6 items-center relative overflow-hidden group hover:border-forge-cyan/20 transition-all duration-300">
        {/* Corner Tech Accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-forge-cyan/40" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-forge-cyan/40" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-forge-cyan/40" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-forge-cyan/40" />

        {/* Avatar Hologram Grid */}
        <div className="relative w-32 h-32 md:w-36 md:h-36 bg-black border border-zinc-800 rounded-sm flex items-center justify-center overflow-hidden flex-shrink-0 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          {/* Internal Tech Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:10px_10px]" />
          <Shield size={64} className="text-forge-cyan/25 absolute animate-pulse" />
          
          {/* Scanline Sweep */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-forge-cyan/50 shadow-[0_0_8px_#22d3ee] animate-[scan_3s_linear_infinite]" />
          
          {/* Avatar Silhouette */}
          <div className="relative z-10 flex flex-col items-center">
            <Label variant="dim" className="text-[10px] font-mono tracking-widest text-zinc-500 mb-1 block">UNIT</Label>
            <Label variant="default" className="text-lg font-bold text-white tracking-widest block">{stats.title.substring(0, 3).toUpperCase()}</Label>
            <Label variant="cyan" className="text-[8px] font-mono text-forge-cyan mt-1 block">VER_1.8</Label>
          </div>
        </div>

        {/* Profile Core Telemetry details */}
        <div className="flex-1 space-y-4 text-center md:text-left w-full">
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Label variant="default" className="text-2xl md:text-3xl font-bold tracking-wider text-white block">
                {user?.name || 'Operator'}
              </Label>
              <Tag variant="cyan" className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 border border-forge-cyan/30 bg-forge-cyan/5 text-forge-cyan">
                {stats.title}
              </Tag>
            </div>
            <p className="text-xs text-zinc-500 font-mono tracking-wide">
              Account Core: <span className="text-zinc-300">{user?.email}</span>
            </p>
          </div>

          {/* Progress Level Telemetry */}
          <div className="grid grid-cols-2 gap-4 border-t border-b border-white/5 py-4 my-2">
            <div className="space-y-1">
              <Label variant="dim" className="text-[9px] uppercase tracking-widest block">
                {t('identity.level_designation')}
              </Label>
              <div className="flex items-baseline gap-2">
                <Label variant="default" className="text-2xl font-bold text-white block">{stats.level}</Label>
                <span className="text-[9px] text-forge-cyan/60 font-mono">/ LV_100</span>
              </div>
            </div>

            <div className="space-y-1">
              <Label variant="dim" className="text-[9px] uppercase tracking-widest block">
                {t('identity.discipline_streak')}
              </Label>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Flame size={18} fill="#f59e0b" className="text-amber-500" />
                <Label variant="default" className="text-2xl font-bold text-amber-500 block">
                  {stats.streak} {t('identity.days')}
                </Label>
              </div>
            </div>
          </div>

          {/* Active Subsystems listing */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start text-[9px] font-mono">
            <Tag variant="default" className="px-2 py-1 text-zinc-400 bg-white/5 border border-white/5">COGNITIVE_ACTIVE</Tag>
            <Tag variant="default" className="px-2 py-1 text-zinc-400 bg-white/5 border border-white/5">GAMIFICATION_SYNCED</Tag>
            <Tag variant="default" className="px-2 py-1 text-zinc-400 bg-white/5 border border-white/5">CALIBRATION_READY</Tag>
          </div>
        </div>
      </div>

      {/* QUICK LEVEL UP WIDGET */}
      <div className="p-6 rounded-sm bg-[#050507]/60 border border-white/5 shadow-2xl backdrop-blur-2xl flex flex-col justify-between relative overflow-hidden group hover:border-forge-cyan/20 transition-all duration-300 font-mono">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.03),transparent_60%)]" />

        <div className="space-y-3 relative z-10">
          <div className="flex justify-between items-center">
            <Label variant="cyan" className="text-[10px] tracking-widest uppercase block">
              {t('identity.energy_pool')}
            </Label>
            <Sparkles size={14} className="text-forge-cyan animate-pulse" />
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            {t('identity.xp_desc')}
          </p>
        </div>

        {/* Level up XP Bar */}
        <div className="space-y-2 pt-4 relative z-10">
          <div className="flex justify-between items-baseline text-[10px]">
            <Label variant="dim" className="text-zinc-500 uppercase tracking-widest block">
              {t('identity.global_xp')}
            </Label>
            <span className="text-white font-bold">{stats.xp} <span className="text-zinc-600">/</span> {Math.pow(stats.level, 2) * 100} XP</span>
          </div>
          <div className="h-2 w-full bg-black rounded-sm border border-zinc-800 p-[1px] relative overflow-hidden">
            <div 
              className="h-full bg-forge-cyan shadow-[0_0_10px_#22d3ee] rounded-sm duration-500" 
              style={{ width: `${Math.min(100, (stats.xp / (Math.pow(stats.level, 2) * 100)) * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
