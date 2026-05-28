'use client';

import { useQuery } from '@tanstack/react-query';
import {
  Shield,
  X,
  Zap,
  Award,
  BookOpen,
  Repeat,
  CheckCircle2,
  Clock,
  Scroll,
  HelpCircle,
  Trophy,
  Sparkles,
  Lock,
  Target,
  Compass,
  Star,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

import { useSound } from '@/contexts';
import { cn } from '@/shared/lib/utils';

import { gamificationApi } from '../services/gamificationApi';
import type { Quest } from '../types';

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

  const handleToggle = () => {
    playSound('click');
    setIsOpen(!isOpen);
  };

  const activeIncompleteCount = quests.filter((q) => !q.isCompleted && q.type === 'daily').length;

  const filteredQuests = quests.filter((q) => {
    if (filter === 'all') return true;
    return q.type === filter;
  });

  // Determine achievement details (badge metadata)
  const getBadgeDetails = (badgeIcon: string) => {
    switch (badgeIcon) {
      case 'achievement_master_of_reality':
        return {
          name: 'Master of Reality',
          description: 'Hoàn thành 10 ngày rèn luyện tối hảo (Meta-Quests)',
          rarity: 'Legendary',
          color: 'from-amber-500 via-orange-600 to-red-600',
          glow: 'shadow-[0_0_15px_rgba(245,158,11,0.4)]',
        };
      default:
        return {
          name: 'Initiate Stoic',
          description: 'Hành trình vạn dặm bắt đầu từ bước đầu tiên',
          rarity: 'Common',
          color: 'from-blue-500 to-indigo-600',
          glow: 'shadow-[0_0_10px_rgba(59,130,246,0.3)]',
        };
    }
  };

  return (
    <>
      <button
        onClick={handleToggle}
        onMouseEnter={() => playSound('hover')}
        className={cn(
          'fixed bottom-6 left-72 z-50 flex items-center justify-center gap-2.5',
          'px-5 py-3.5 rounded-full font-medium transition-all duration-300 cursor-pointer select-none border group',
          'bg-[#0A0A0F]/80 border-white/10 text-gray-300 hover:text-white',
          'shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-white/20 hover:scale-105 active:scale-95 text-xs',
          isOpen ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'
        )}
      >
        <span className="font-semibold">Evolution Hub</span>

        {activeIncompleteCount > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-forge-cyan text-[10px] font-mono font-bold text-black animate-pulse shadow-[0_0_8px_#22D3EE]">
            {activeIncompleteCount}
          </span>
        )}
      </button>

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

        {/* Categories / Type Filters inside Missions Tab */}
        {activeTab === 'missions' && (
          <div className="flex items-center gap-1.5 p-4 border-b border-white/10 bg-[#0A0A0F]/40 relative z-10 overflow-x-auto select-none">
            {[
              { id: 'all', label: 'All Quests' },
              { id: 'daily', label: 'Daily' },
              { id: 'main', label: 'Main' },
              { id: 'side', label: 'Side' },
            ].map((btn) => {
              const count = btn.id === 'all' ? quests.length : quests.filter(q => q.type === btn.id).length;
              const isActive = filter === btn.id;
              return (
                <button
                  key={btn.id}
                  onClick={() => {
                    playSound('click');
                    setFilter(btn.id as HudFilterType);
                  }}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-[10px] font-semibold tracking-wider uppercase border transition-all cursor-pointer flex items-center gap-1.5',
                    isActive
                      ? 'bg-forge-cyan/10 border-forge-cyan text-forge-cyan'
                      : 'bg-black/20 border-white/5 text-gray-500 hover:text-white'
                  )}
                >
                  <span>{btn.label}</span>
                  <span className={cn('px-1 rounded-sm text-[8px] font-mono', isActive ? 'bg-forge-cyan/20 text-forge-cyan' : 'bg-white/5 text-gray-600')}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* 🎴 PANELS BODY LIST */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 relative z-10 scrollbar-thin">
          {/* TAB 1: MISSIONS */}
          {activeTab === 'missions' && (
            <>
              {questsError && (
                <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-xs flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 shrink-0" />
                  <span>{(questsError as Error).message || 'Quest synchronization offline'}</span>
                </div>
              )}

              {isQuestsLoading && quests.length === 0 ? (
                <div className="space-y-4 animate-pulse">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-32 rounded-xl bg-white/5 border border-white/10" />
                  ))}
                </div>
              ) : filteredQuests.length === 0 ? (
                <div className="py-20 text-center flex flex-col items-center justify-center text-gray-500 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
                  <Shield className="w-10 h-10 text-gray-700 mb-3" />
                  <p className="text-xs font-semibold text-gray-400">No active quests found</p>
                  <p className="text-[10px] mt-1 text-gray-600">Archived or completed goals are hidden</p>
                </div>
              ) : (
                filteredQuests.map((quest) => (
                  <div
                    key={quest.id}
                    className={cn(
                      'p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group',
                      quest.isCompleted
                        ? 'bg-[#0A0A0F]/30 border-emerald-500/20 opacity-60'
                        : 'bg-[#0A0A0F]/60 border-white/10 hover:border-white/20'
                    )}
                  >
                    {/* Header block */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span
                          className={cn(
                            'px-2 py-0.5 rounded text-[8px] font-mono uppercase tracking-wider border',
                            quest.type === 'daily'
                              ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                              : quest.type === 'main'
                                ? 'bg-forge-cyan/10 text-forge-cyan border-forge-cyan/20'
                                : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                          )}
                        >
                          {quest.type}
                        </span>
                        <h4 className="font-bold text-white text-md mt-2 group-hover:text-forge-cyan transition-colors">
                          {quest.title}
                        </h4>
                        {quest.description && (
                          <p className="text-xs text-gray-400 mt-1">{quest.description}</p>
                        )}
                      </div>

                      {/* Reward indicator */}
                      <div className="shrink-0 flex items-center gap-1.5 bg-forge-cyan/5 border border-forge-cyan/20 px-2.5 py-1 rounded-lg text-forge-cyan text-xs font-bold font-mono">
                        <Zap className="w-3.5 h-3.5 fill-forge-cyan/10" />
                        <span>+{quest.xpReward} XP</span>
                      </div>
                    </div>

                    {/* Objectives linked list */}
                    <div className="mt-4 space-y-3 pt-3 border-t border-white/5">
                      {quest.objectives.map((obj) => (
                        <div key={obj.id} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2 text-gray-300 font-medium">
                              {obj.type === 'CREATE_JOURNAL' ? (
                                <BookOpen className="w-3.5 h-3.5 text-forge-cyan" />
                              ) : obj.type === 'CHECK_HABIT' ? (
                                <Repeat className="w-3.5 h-3.5 text-amber-400" />
                              ) : obj.type === 'COMPLETE_QUEST' ? (
                                <Compass className="w-3.5 h-3.5 text-pink-400 animate-spin" />
                              ) : (
                                <Award className="w-3.5 h-3.5 text-emerald-400" />
                              )}
                              <span>
                                {obj.type === 'CREATE_JOURNAL'
                                  ? 'Write Journal Page'
                                  : obj.type === 'CHECK_HABIT'
                                    ? 'Complete Habit target'
                                    : obj.type === 'COMPLETE_QUEST'
                                      ? 'Complete System Quest'
                                      : 'Log Memory Node'}
                              </span>
                            </div>
                            <span className="font-mono text-gray-400 text-[10px]">
                              {obj.currentCount} / {obj.targetCount}
                            </span>
                          </div>

                          {/* Objective progress track */}
                          <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                            <div
                              className={cn(
                                'h-full transition-all duration-700 rounded-full',
                                obj.isCompleted ? 'bg-emerald-500' : 'bg-forge-cyan'
                              )}
                              style={{
                                width: `${Math.min(
                                  100,
                                  (obj.currentCount / obj.targetCount) * 100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Holographic cleared stamp */}
                    {quest.isCompleted && (
                      <div className="absolute right-4 bottom-4 flex items-center gap-1.5 border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 rounded-lg text-emerald-400 text-[9px] font-bold uppercase tracking-widest rotate-6 pointer-events-none select-none animate-pulse">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>CLEARED</span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </>
          )}

          {/* TAB 2: EPIC GOALS */}
          {activeTab === 'goals' && (
            <>
              {goalsError && (
                <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-xs flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 shrink-0" />
                  <span>{(goalsError as Error).message || 'Goals synchronization offline'}</span>
                </div>
              )}

              {isGoalsLoading ? (
                <div className="space-y-4 animate-pulse">
                  {[1, 2].map((i) => (
                    <div key={i} className="h-40 rounded-2xl bg-white/5 border border-white/10" />
                  ))}
                </div>
              ) : goals.length === 0 ? (
                <div className="py-20 text-center flex flex-col items-center justify-center text-gray-500 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
                  <Target className="w-10 h-10 text-gray-700 mb-3" />
                  <p className="text-xs font-semibold text-gray-400">No Epic Goals defined</p>
                  <p className="text-[10px] mt-1 text-gray-600">Great journeys will show up here</p>
                </div>
              ) : (
                goals.map((goal) => {
                  const details = getBadgeDetails(goal.badgeIcon);
                  return (
                    <div
                      key={goal.id}
                      className={cn(
                        'p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group',
                        goal.isCompleted
                          ? 'bg-gradient-to-br from-[#0A0A0F]/60 to-emerald-950/20 border-emerald-500/30'
                          : 'bg-gradient-to-br from-[#0A0A0F]/60 to-amber-950/10 border-white/10 hover:border-white/20'
                      )}
                    >
                      {/* Premium grid aesthetic background */}
                      <div className="absolute inset-0 bg-grid-pattern opacity-1 pointer-events-none" />

                      <div className="flex items-start justify-between gap-4 relative z-10">
                        <div className="flex gap-4">
                          <div className={cn(
                            'w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 bg-gradient-to-tr',
                            goal.isCompleted ? 'from-emerald-500 to-teal-400' : 'from-amber-500/20 to-orange-600/30',
                            details.glow
                          )}>
                            <Award className={cn('w-7 h-7 text-white', goal.isCompleted ? 'animate-bounce' : 'animate-pulse')} />
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className={cn(
                                'px-1.5 py-0.5 rounded text-[8px] font-mono uppercase font-bold tracking-wider text-black',
                                goal.isCompleted ? 'bg-emerald-400' : 'bg-amber-400'
                              )}>
                                {goal.isCompleted ? 'Achieved' : 'Epic Goal'}
                              </span>
                              <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">
                                Rarity: {details.rarity}
                              </span>
                            </div>
                            <h4 className="font-extrabold text-white text-lg mt-1 group-hover:text-forge-cyan transition-colors">
                              {goal.title}
                            </h4>
                            <p className="text-xs text-gray-400 mt-1.5 font-light leading-relaxed">
                              {goal.description}
                            </p>

                            {/* Sub-checkpoint Titles (Critique 3) */}
                            {goal.objectives.map((obj) => {
                              if (goal.badgeIcon === 'achievement_master_of_reality') {
                                const currentRank =
                                  obj.currentCount >= 10 ? 'Reality Master 👑' :
                                  obj.currentCount >= 7 ? 'Reality Acolyte 🛡️' :
                                  obj.currentCount >= 3 ? 'Reality Initiate 📜' :
                                  'Reality Aspirant 🕯️';
                                return (
                                  <div key={obj.id} className="mt-2.5 flex items-center gap-1.5">
                                    <span className="text-[9px] text-gray-500 font-mono tracking-widest uppercase">Title:</span>
                                    <span className={cn(
                                      'px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wide border',
                                      obj.currentCount >= 10 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.2)]' :
                                      obj.currentCount >= 7 ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-[0_0_8px_rgba(99,102,241,0.2)]' :
                                      obj.currentCount >= 3 ? 'bg-forge-cyan/10 text-forge-cyan border-forge-cyan/20 shadow-[0_0_8px_rgba(34,211,238,0.2)]' :
                                      'bg-white/5 text-gray-400 border-white/5'
                                    )}>
                                      {currentRank}
                                    </span>
                                  </div>
                                );
                              }
                              return null;
                            })}
                          </div>
                        </div>

                        {/* Reward tag */}
                        <div className="shrink-0 flex flex-col items-end gap-1">
                          <span className="text-[8px] text-gray-500 font-mono tracking-wider uppercase">Reward</span>
                          <span className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md text-amber-400 text-[10px] font-extrabold font-mono">
                            <Star className="w-3 h-3 fill-amber-400/20" />
                            <span>+{goal.xpReward} XP</span>
                          </span>
                        </div>
                      </div>

                      {/* Objectives Progress block */}
                      <div className="mt-6 space-y-4 relative z-10 pt-4 border-t border-white/5">
                        {goal.objectives.map((obj: GoalObjectiveDto) => {
                          const percent = Math.min(100, (obj.currentCount / obj.targetCount) * 100);
                          return (
                            <div key={obj.id} className="space-y-1.5">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-300 font-semibold tracking-wide flex items-center gap-1.5">
                                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                                  Nghi thức Tối hảo (Meta-Quest Completed)
                                </span>
                                <span className="font-mono text-amber-400 font-bold text-[10px]">
                                  {obj.currentCount} / {obj.targetCount}
                                </span>
                              </div>

                              {/* Glowing Goal bar */}
                              <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                                <div
                                  className={cn(
                                    'h-full transition-all duration-1000 rounded-full bg-gradient-to-r',
                                    goal.isCompleted ? 'from-emerald-500 to-teal-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'from-amber-500 to-orange-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                                  )}
                                  style={{ width: `${percent}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Sparkles completed flare */}
                      {goal.isCompleted && (
                        <div className="absolute right-4 bottom-4 flex items-center gap-1.5 border border-emerald-400/30 bg-emerald-500/20 px-3.5 py-1.5 rounded-xl text-emerald-300 text-[10px] font-extrabold uppercase tracking-widest rotate-2 pointer-events-none select-none animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Goal Completed</span>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </>
          )}

          {/* TAB 3: ACHIEVEMENTS */}
          {activeTab === 'achievements' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex items-center gap-3">
                <Trophy className="w-8 h-8 text-amber-400 animate-bounce" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Honor Registry</h4>
                  <p className="text-[10px] text-gray-500 font-light mt-0.5">
                    Your collection of rare alchemical titles and divine badges.
                  </p>
                </div>
              </div>

              {isStatsLoading ? (
                <div className="grid grid-cols-2 gap-4 animate-pulse">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-28 rounded-xl bg-white/5 border border-white/10" />
                  ))}
                </div>
              ) : !stats?.achievements || stats.achievements.length === 0 ? (
                <div className="py-20 text-center flex flex-col items-center justify-center text-gray-500 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
                  <Lock className="w-10 h-10 text-gray-700 mb-3" />
                  <p className="text-xs font-semibold text-gray-400">Achievements Locked</p>
                  <p className="text-[10px] mt-1 text-gray-600">Complete Epic Goals to earn holy badges</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {stats.achievements.map((badge: string) => {
                    const details = getBadgeDetails(badge);
                    return (
                      <div
                        key={badge}
                        className={cn(
                          'p-4 rounded-xl border border-white/10 bg-gradient-to-br from-[#0C0C14] to-[#06060A]',
                          'flex flex-col items-center text-center justify-between relative overflow-hidden group hover:border-white/20 transition-all duration-300'
                        )}
                      >
                        {/* Background holographic card shimmer */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                        <div className={cn(
                          'w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-tr text-white relative z-10',
                          details.color,
                          details.glow,
                          'animate-pulse group-hover:scale-110 transition-transform duration-300'
                        )}>
                          <Trophy className="w-6 h-6 text-white" />
                        </div>

                        <div className="mt-3 relative z-10">
                          <h5 className="font-extrabold text-white text-xs tracking-wide">
                            {details.name}
                          </h5>
                          <span className="text-[8px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-amber-400 font-mono tracking-wider uppercase inline-block mt-1">
                            {details.rarity}
                          </span>
                          <p className="text-[9px] text-gray-500 mt-2 font-light leading-snug">
                            {details.description}
                          </p>
                        </div>

                        {/* Pulsing glow particle */}
                        <div className="absolute -right-4 -bottom-4 w-12 h-12 rounded-full bg-amber-500/10 blur-xl group-hover:bg-amber-500/20 transition-colors pointer-events-none" />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
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
