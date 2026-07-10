'use client';

import { Award, Star, Sparkles, CheckCircle2, Target, HelpCircle } from 'lucide-react';
import React from 'react';

import { cn } from '@/shared/lib/utils';

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

interface GoalsTabProps {
  goals: GoalDto[];
  isLoading: boolean;
  error: Error | null;
}

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

export const GoalsTab: React.FC<GoalsTabProps> = ({ goals, isLoading, error }) => {
  if (error) {
    return (
      <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-xs flex items-center gap-2">
        <HelpCircle className="w-4 h-4 shrink-0" />
        <span>{error.message || 'Goals synchronization offline'}</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2].map((i) => (
          <div key={i} className="h-40 rounded-2xl bg-white/5 border border-white/10" />
        ))}
      </div>
    );
  }

  if (goals.length === 0) {
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center text-gray-500 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
        <Target className="w-10 h-10 text-gray-700 mb-3" />
        <p className="text-xs font-semibold text-gray-400">No Epic Goals defined</p>
        <p className="text-[10px] mt-1 text-gray-600">Great journeys will show up here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {goals.map((goal) => {
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
            {/* Grid background */}
            <div className="absolute inset-0 bg-grid-pattern opacity-1 pointer-events-none" />

            <div className="flex items-start justify-between gap-4 relative z-10">
              <div className="flex gap-4">
                <div
                  className={cn(
                    'w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 bg-gradient-to-tr',
                    goal.isCompleted ? 'from-emerald-500 to-teal-400' : 'from-amber-500/20 to-orange-600/30',
                    details.glow
                  )}
                >
                  <Award
                    className={cn(
                      'w-7 h-7 text-white',
                      goal.isCompleted ? 'animate-bounce' : 'animate-pulse'
                    )}
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'px-1.5 py-0.5 rounded text-[8px] font-mono uppercase font-bold tracking-wider text-black',
                        goal.isCompleted ? 'bg-emerald-400' : 'bg-amber-400'
                      )}
                    >
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

                  {/* Sub-checkpoint Titles */}
                  {goal.objectives.map((obj) => {
                    if (goal.badgeIcon === 'achievement_master_of_reality') {
                      const currentRank =
                        obj.currentCount >= 10
                          ? 'Reality Master 👑'
                          : obj.currentCount >= 7
                            ? 'Reality Acolyte 🛡️'
                            : obj.currentCount >= 3
                              ? 'Reality Initiate 📜'
                              : 'Reality Aspirant 🕯️';
                      return (
                        <div key={obj.id} className="mt-2.5 flex items-center gap-1.5">
                          <span className="text-[9px] text-gray-500 font-mono tracking-widest uppercase">
                            Title:
                          </span>
                          <span
                            className={cn(
                              'px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wide border',
                              obj.currentCount >= 10
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.2)]'
                                : obj.currentCount >= 7
                                  ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-[0_0_8px_rgba(99,102,241,0.2)]'
                                  : obj.currentCount >= 3
                                    ? 'bg-forge-cyan/10 text-forge-cyan border-forge-cyan/20 shadow-[0_0_8px_rgba(34,211,238,0.2)]'
                                    : 'bg-white/5 text-gray-400 border-white/5'
                            )}
                          >
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
                <span className="text-[8px] text-gray-500 font-mono tracking-wider uppercase">
                  Reward
                </span>
                <span className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md text-amber-400 text-[10px] font-extrabold font-mono">
                  <Star className="w-3 h-3 fill-amber-400/20" />
                  <span>+{goal.xpReward} XP</span>
                </span>
              </div>
            </div>

            {/* Objectives Progress block */}
            <div className="mt-6 space-y-4 relative z-10 pt-4 border-t border-white/5">
              {goal.objectives.map((obj) => {
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
                          goal.isCompleted
                            ? 'from-emerald-500 to-teal-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                            : 'from-amber-500 to-orange-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'
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
      })}
    </div>
  );
};
