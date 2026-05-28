'use client';

import React, { useEffect, useState } from 'react';

import { useLanguage } from '@/contexts';
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
      <div className="flex-1 h-full flex flex-col items-center justify-center p-6 bg-transparent text-white font-sans">
        <div className="relative flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full border border-forge-cyan/20 border-t-forge-cyan animate-spin" />
          <span className="text-xs uppercase tracking-[0.25em] text-forge-cyan/60 animate-pulse">
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
    <div className="flex-1 h-full overflow-y-auto p-6 md:p-8 bg-transparent text-white font-sans scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 selection:bg-forge-cyan selection:text-black">
      {/* Grid Pattern Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        {/* Header telemetry status strip */}
        <div className="flex justify-between items-center border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-forge-cyan animate-pulse shadow-[0_0_8px_#22d3ee]" />
            <span className="text-[10px] font-mono tracking-[0.3em] text-forge-cyan uppercase">
              {t('identity.calibration_active')}
            </span>
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
