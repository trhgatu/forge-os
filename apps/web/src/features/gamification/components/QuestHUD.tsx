'use client';

import { useQuery } from '@tanstack/react-query';
import {
  X,
  Clock,
  Scroll,
  Trophy,
  Target,
  Compass,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import { useSound } from '@/contexts';
import { cn } from '@/shared/lib/utils';

import { gamificationApi } from '../services/gamificationApi';
import type { Quest } from '../types';
import { MissionsTab } from './MissionsTab';
import { GoalsTab } from './GoalsTab';
import { AchievementsTab } from './AchievementsTab';

interface GoalObjectiveDto {
  id: string;
  type: string;
  targetCount: number;
  referenceId: string | null;
  currentCount: number;
  isCompleted: boolean;
}

interface GoalDto {
  id: string;
  title: string;
  description: string | null;
  xpReward: number;
  badgeIcon: string;
  isCompleted: boolean;
  completedAt: string | null;
  objectives: GoalObjectiveDto[];
}

interface UserStatsDto {
  userId: string;
  xp: number;
  level: number;
  title: string;
  streak: number;
  lastActivityDate: string | null;
  achievements: string[];
}

type HudTabType = 'missions' | 'goals' | 'achievements';
type HudFilterType = 'all' | 'daily' | 'main' | 'side';

export const QuestHUD: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<HudTabType>('missions');
  const [filter, setFilter] = useState<HudFilterType>('all');
  const { playSound } = useSound();

  // 📡 TanStack Queries
  // 1. Fetch active quests
  const {
    data: quests = [],
    isLoading: isQuestsLoading,
    error: questsError,
  } = useQuery<Quest[], Error>({
    queryKey: ['activeQuests'],
    queryFn: () => gamificationApi.getDailyQuests(),
    staleTime: 1000,
    refetchInterval: isOpen && activeTab === 'missions' ? 6000 : false,
  });

  // 2. Fetch epic goals
  const {
    data: goals = [],
    isLoading: isGoalsLoading,
    error: goalsError,
  } = useQuery<GoalDto[], Error>({
    queryKey: ['userGoals'],
    queryFn: () => gamificationApi.getUserGoals(),
    enabled: isOpen,
    staleTime: 2000,
    refetchInterval: isOpen && activeTab === 'goals' ? 6000 : false,
  });

  // 3. Fetch user stats (for achievements)
  const {
    data: stats,
    isLoading: isStatsLoading,
  } = useQuery<UserStatsDto, Error>({
    queryKey: ['userStats'],
    queryFn: () => gamificationApi.getUserStats(),
    enabled: isOpen,
    staleTime: 2000,
  });

  useEffect(() => {
    const handleToggleEvent = () => {
      playSound('click');
      setIsOpen((prev) => !prev);
    };
    window.addEventListener('toggle-evolution-hub', handleToggleEvent);
    return () => {
      window.removeEventListener('toggle-evolution-hub', handleToggleEvent);
    };
  }, [playSound]);

  const handleToggle = () => {
    playSound('click');
    setIsOpen(!isOpen);
  };

  return (
    <>

      {/* 🎭 BACKDROP GLASS FILTER */}
      {isOpen && (
        <div
          onClick={handleToggle}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity duration-300 animate-in fade-in"
        />
      )}

      {/* 🛡️ DOCK-SYNCHRONIZED GLASS QUEST DRAWER */}
      <div
        className={cn(
          'fixed right-0 top-0 h-full w-[460px] z-50 flex flex-col',
          'bg-[#07070B]/95 border-l border-white/10 shadow-2xl backdrop-blur-2xl transition-all duration-500 ease-spring-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Holographic noise overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/[0.01] relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-forge-cyan">
              <Scroll className="w-5 h-5 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-md text-white tracking-wide leading-none">
                Evolution Hub
              </span>
              <span className="text-[10px] mt-1 text-gray-500 font-light">
                Missions, Epic Goals, and Divine Achievements.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Link
              href="/forge/quests"
              onClick={handleToggle}
              onMouseEnter={() => playSound('hover')}
              className="p-1.5 rounded-lg text-gray-500 hover:text-forge-cyan hover:bg-white/5 transition-all cursor-pointer mr-1"
              title="Open Quest Log"
            >
              <ExternalLink className="w-4.5 h-4.5" />
            </Link>
            <button
              onClick={handleToggle}
              onMouseEnter={() => playSound('hover')}
              className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 🏆 PRIMARY HUB TABS */}
        <div className="flex border-b border-white/10 bg-black/40 relative z-10 select-none">
          {[
            { id: 'missions', label: 'Missions', icon: Compass },
            { id: 'goals', label: 'Epic Goals', icon: Target },
            { id: 'achievements', label: 'Achievements', icon: Trophy },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playSound('click');
                  setActiveTab(tab.id as HudTabType);
                }}
                className={cn(
                  'flex-1 py-3.5 text-center text-xs font-semibold tracking-wider border-b-2 transition-all cursor-pointer flex items-center justify-center gap-2',
                  isActive
                    ? 'border-forge-cyan text-forge-cyan bg-forge-cyan/[0.03]'
                    : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/[0.01]'
                )}
              >
                <Icon className={cn('w-4 h-4', isActive ? 'animate-pulse' : '')} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 🎴 PANELS BODY LIST */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 relative z-10 scrollbar-thin">
          {activeTab === 'missions' && (
            <MissionsTab
              quests={quests}
              filter={filter}
              setFilter={setFilter}
              isLoading={isQuestsLoading}
              error={questsError}
            />
          )}

          {activeTab === 'goals' && (
            <GoalsTab
              goals={goals}
              isLoading={isGoalsLoading}
              error={goalsError}
            />
          )}

          {activeTab === 'achievements' && (
            <AchievementsTab
              achievements={stats?.achievements || []}
              isLoading={isStatsLoading}
            />
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#07070B]/90 text-center text-[9px] font-mono text-gray-500 uppercase tracking-widest select-none flex items-center justify-center gap-1.5 relative z-10">
          <Clock className="w-3 h-3 text-forge-cyan" />
          <span>Completed quests auto-reward XP on clearance</span>
        </div>
      </div>
    </>
  );
};
