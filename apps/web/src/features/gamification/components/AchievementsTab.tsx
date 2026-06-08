'use client';

import React from 'react';
import { Trophy, Lock } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface AchievementsTabProps {
  achievements: string[];
  isLoading: boolean;
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

export const AchievementsTab: React.FC<AchievementsTabProps> = ({
  achievements,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 rounded-xl bg-white/5 border border-white/10" />
        ))}
      </div>
    );
  }

  if (achievements.length === 0) {
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center text-gray-500 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
        <Lock className="w-10 h-10 text-gray-700 mb-3" />
        <p className="text-xs font-semibold text-gray-400">Achievements Locked</p>
        <p className="text-[10px] mt-1 text-gray-600">Complete Epic Goals to earn holy badges</p>
      </div>
    );
  }

  return (
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

      <div className="grid grid-cols-2 gap-4">
        {achievements.map((badge) => {
          const details = getBadgeDetails(badge);
          return (
            <div
              key={badge}
              className={cn(
                'p-4 rounded-xl border border-white/10 bg-gradient-to-br from-[#0C0C14] to-[#06060A]',
                'flex flex-col items-center text-center justify-between relative overflow-hidden group hover:border-white/20 transition-all duration-300'
              )}
            >
              {/* Card shimmer */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div
                className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-tr text-white relative z-10',
                  details.color,
                  details.glow,
                  'animate-pulse group-hover:scale-110 transition-transform duration-300'
                )}
              >
                <Trophy className="w-6 h-6 text-white" />
              </div>

              <div className="mt-3 relative z-10">
                <h5 className="font-extrabold text-white text-xs tracking-wide">{details.name}</h5>
                <span className="text-[8px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-amber-400 font-mono tracking-wider uppercase inline-block mt-1">
                  {details.rarity}
                </span>
                <p className="text-[9px] text-gray-500 mt-2 font-light leading-snug">
                  {details.description}
                </p>
              </div>

              {/* Glowing particle */}
              <div className="absolute -right-4 -bottom-4 w-12 h-12 rounded-full bg-amber-500/10 blur-xl group-hover:bg-amber-500/20 transition-colors pointer-events-none" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
