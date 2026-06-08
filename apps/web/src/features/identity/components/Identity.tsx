'use client';

import React, { useEffect, useState } from 'react';

import { useLanguage } from '@/contexts';
import { Label, Skeleton } from '@/shared/components/ui';
import { useAuthStore } from '@/shared/store/authStore';

import { gamificationService } from '../../gamification/services/gamificationService';
import type { UserStats } from '../../gamification/types';

import { AttributeCards } from './AttributeCards';
import { ProfileCard } from './ProfileCard';
import { RadarChart } from './RadarChart';
import { UnlockedAchievements } from './UnlockedAchievements';

export const Identity: React.FC = () => {
  const { t } = useLanguage();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.id) return;
      try {
        const data = await gamificationService.getStats();
        if (data) {
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch identity stats', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="flex-1 h-full flex flex-col items-center justify-center p-6 md:p-10 bg-transparent text-white font-sans animate-pulse">
        <div className="relative flex flex-col items-center gap-6 w-full max-w-6xl">
          {/* Header Skeleton */}
          <div className="flex flex-col md:flex-row md:items-center justify-between w-full border-b border-white/5 pb-6">
            <div className="space-y-3">
              <Skeleton variant="glowing" className="h-3 w-28 rounded-md" />
              <Skeleton variant="glowing" className="h-10 w-48 rounded-md" />
              <Skeleton variant="default" className="h-4 w-72 rounded-md" />
            </div>
            <Skeleton variant="glowing" className="h-8 w-40 rounded-xl" />
          </div>

          {/* Profile Card Skeleton */}
          <Skeleton variant="glowing" className="w-full h-[180px] rounded-xl" />

          {/* Grid Layout Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 w-full mt-4">
            {/* Radar Chart */}
            <Skeleton variant="glowing" className="h-[320px] lg:col-span-2 rounded-xl" />
            {/* Attribute Cards */}
            <Skeleton variant="default" className="h-[320px] lg:col-span-3 rounded-xl" />
          </div>

          {/* Unlocked Achievements Skeleton */}
          <Skeleton variant="default" className="w-full h-[150px] rounded-xl" />

          <span className="text-xs uppercase tracking-[0.25em] text-forge-cyan/60 animate-pulse mt-4 font-mono">
            {t('identity.calibration_active') || 'Calibrating Operator Frequency...'}
          </span>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex-1 h-full flex items-center justify-center bg-transparent text-white p-6 font-sans">
        <div className="text-center p-8 bg-zinc-950/80 border border-red-500/20 rounded-sm font-mono">
          <p className="text-red-400 font-bold mb-2">ERROR // SYSTEM STATS DISCONNECTED</p>
          <p className="text-xs text-zinc-500">Failed to establish communication with Gamification Engine.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 h-full overflow-y-auto p-6 md:p-10 pb-32 bg-transparent text-white font-sans scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 selection:bg-forge-cyan selection:text-black">
      {/* Grid Pattern Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10 animate-in fade-in zoom-in-95 duration-500">
        {/* Synchronized Alchemical Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div>
            {/* Ethereal category indicator */}
            <div className="mb-3 flex items-center gap-2 opacity-85">
              <div className="h-px w-8 bg-gradient-to-r from-forge-cyan/40 to-transparent" />
              <Label variant="cyan" className="text-[10px] font-mono tracking-[0.4em] uppercase">
                Operator Telemetry
              </Label>
            </div>

            {/* Poetic Title */}
            <Label variant="default" className="text-3xl md:text-4xl font-bold text-white tracking-tight block capitalize mb-2">
              {t('nav.identity') || 'Identity'}
            </Label>

            {/* Flowing Subtitle */}
            <p className="text-gray-400 font-light">
              View your psychological attributes, gamified discipline frequency, and unlocked ranks.
            </p>
          </div>

          {/* Right telemetry status block */}
          <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 px-4 py-2 rounded-xl self-start md:self-auto">
            <div className="w-2 h-2 rounded-full bg-forge-cyan animate-pulse shadow-[0_0_8px_#22d3ee]" />
            <Label variant="cyan" className="text-[10px] font-mono tracking-[0.3em] uppercase">
              {t('identity.calibration_active') || 'Calibration Active'}
            </Label>
          </div>
        </div>

        {/* PROFILE CARD & OVERVIEW */}
        <ProfileCard stats={stats} user={user} />

        {/* RADAR CHART & DETAILED ATTRIBUTES */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* SVG RADAR CHART */}
          <RadarChart stats={stats} />

          {/* DETAILED ATTRIBUTES CARDS */}
          <AttributeCards stats={stats} />
        </div>

        {/* ACHIEVEMENTS & UNLOCKED TITLES */}
        <UnlockedAchievements stats={stats} />
      </div>
    </div>
  );
};

export default Identity;
