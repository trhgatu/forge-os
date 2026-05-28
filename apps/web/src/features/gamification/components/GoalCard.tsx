'use client';

import { Award, Lock, Edit3, Trash2, Clock, Zap, Trophy, Flame, Shield } from 'lucide-react';
import React from 'react';

import type { Goal } from '../types';

interface GoalCardProps {
  goal: Goal;
  quests: any[];
  isAdminMode: boolean;
  onEdit: (goal: Goal) => void;
  onDelete: (id: string) => void;
}

const badgeMap: Record<string, { label: string; bg: string; text: string; glow: string; color: string }> = {
  achievement_master_of_reality: {
    label: 'Master of Reality',
    bg: 'bg-amber-500/10 border-amber-500/20',
    text: 'text-amber-400',
    glow: 'shadow-[0_0_30px_rgba(245,158,11,0.15)]',
    color: '#fbbf24'
  },
  achievement_stoic_sage: {
    label: 'Stoic Sage',
    bg: 'bg-purple-500/10 border-purple-500/20',
    text: 'text-purple-400',
    glow: 'shadow-[0_0_30px_rgba(168,85,247,0.15)]',
    color: '#a855f7'
  },
  achievement_focus_lord: {
    label: 'Focus Lord',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
    text: 'text-cyan-400',
    glow: 'shadow-[0_0_30px_rgba(6,182,212,0.15)]',
    color: '#22d3ee'
  },
  achievement_eternal_alchemist: {
    label: 'Eternal Alchemist',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    text: 'text-emerald-400',
    glow: 'shadow-[0_0_30px_rgba(16,185,129,0.15)]',
    color: '#10b981'
  }
};

export function GoalCard({ goal, quests, isAdminMode, onEdit, onDelete }: GoalCardProps) {
  const isCompleted = goal.isCompleted;
  const badge = badgeMap[goal.badgeIcon || ''] || badgeMap.achievement_master_of_reality;

  const getQuestName = (refId: string | null) => {
    if (!refId) return 'Any Quest';

    // Find in loaded quests list
    const matched = quests.find((q) => q.id === refId);
    if (matched) return matched.title;

    // Standard seeded quest mappings fallback
    const seededQuests: Record<string, string> = {
      'quest-daily-journal-sunset': 'Trang sử hoàng hôn',
      'quest-daily-habit-ritual': 'Nghi thức rèn luyện',
      'quest-main-stoic-memory': 'Khai nguyên kỷ lục',
      'quest-daily-meta-alignment': 'Perfect Alignment (Nghi thức tối hảo)'
    };

    if (seededQuests[refId]) {
      return seededQuests[refId];
    }

    // Default clean-up formatter
    return refId
      .replace(/^quest-/, '')
      .replace(/[-_]/g, ' ')
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  };

  return (
    <div
      className={`group relative rounded-3xl border bg-white/[0.01] backdrop-blur-md p-6 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-lg min-h-[250px] ${isCompleted
          ? 'border-amber-500/30 bg-amber-500/[0.01] shadow-[0_0_30px_rgba(245,158,11,0.05)]'
          : 'border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
        }`}
    >
      {/* Glow backlight inside completed goals */}
      {isCompleted && (
        <div className="absolute inset-0 bg-radial from-amber-500/5 to-transparent pointer-events-none opacity-40 animate-pulse" />
      )}

      <div className="space-y-4 relative z-10">
        {/* Card Header & Admin Control */}
        <div className="flex items-start justify-between">
          <span className={`text-[9px] uppercase font-mono tracking-wider px-2.5 py-1 rounded-lg border font-bold ${isCompleted
              ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
              : 'bg-forge-cyan/10 text-forge-cyan border-forge-cyan/20'
            }`}>
            {isCompleted ? 'Unlocked' : 'In Progress'}
          </span>

          {isAdminMode && (
            <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => onEdit(goal)}
                className="p-1.5 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 text-gray-500 hover:text-white transition-all cursor-pointer"
                title="Edit Goal"
              >
                <Edit3 size={11} />
              </button>
              <button
                onClick={() => onDelete(goal.id)}
                className="p-1.5 rounded-lg bg-red-500/5 border border-red-500/10 hover:border-red-500/20 text-red-400/70 hover:text-red-400 transition-all cursor-pointer"
                title="Delete Goal"
              >
                <Trash2 size={11} />
              </button>
            </div>
          )}
        </div>

        {/* Identity Title & Description */}
        <div className="flex gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 bg-white/[0.01] ${isCompleted ? badge.bg : 'border-white/5'
            }`}>
            {isCompleted ? (
              <Award className={`w-6 h-6 ${badge.text}`} />
            ) : (
              <Lock className="w-5 h-5 text-gray-600" />
            )}
          </div>
          <div>
            <h3 className="font-display font-medium text-lg text-gray-200 group-hover:text-white transition-colors duration-500">
              {goal.title}
            </h3>
            {goal.description && (
              <p className="text-xs text-gray-500 font-light mt-1.5 leading-relaxed">
                {goal.description}
              </p>
            )}
          </div>
        </div>

        {/* Requirements objectives checklist */}
        <div className="space-y-3.5 pt-3 border-t border-white/5">
          {goal.objectives.map((obj) => {
            const current = obj.currentCount || 0;
            const target = obj.targetCount;
            const isObjCompleted = current >= target;

            return (
              <div key={obj.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-gray-300 font-medium">
                    {obj.type === 'COMPLETE_DAILY_QUEST' ? (
                      <Flame className="w-3.5 h-3.5 text-amber-500" />
                    ) : (
                      <Shield className="w-3.5 h-3.5 text-forge-cyan" />
                    )}
                    <span className="text-[11px] font-sans">
                      {obj.type === 'COMPLETE_DAILY_QUEST'
                        ? `Hoàn thành Daily: "${getQuestName(obj.referenceId)}"`
                        : `Hoàn thành Quest: "${getQuestName(obj.referenceId)}"`}
                    </span>
                  </div>
                  <span className="font-mono text-gray-500 text-[10px]">
                    {current} / {target}
                  </span>
                </div>

                {/* Progress tracker bar */}
                <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                  <div
                    className={`h-full transition-all duration-700 rounded-full ${isCompleted ? 'bg-amber-500' : isObjCompleted ? 'bg-emerald-500' : 'bg-forge-cyan'
                      }`}
                    style={{ width: `${Math.min(100, (current / target) * 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-4 relative z-10">
        <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-mono">
          <Clock size={11} className="text-gray-600" />
          <span>
            {isCompleted && goal.completedAt
              ? `Cleared ${new Date(goal.completedAt).toLocaleDateString()}`
              : 'Active challenge'}
          </span>
        </div>
        <div className="flex items-center gap-1 text-forge-cyan text-xs font-bold font-mono">
          <Zap size={12} className="fill-forge-cyan/10" />
          <span>+{goal.xpReward} XP</span>
        </div>
      </div>

      {/* Cleared golden stamp overlay */}
      {isCompleted && (
        <div className="absolute right-6 bottom-16 flex items-center gap-1.5 border border-amber-500/30 bg-amber-500/10 px-3 py-1 rounded-lg text-amber-400 text-[9px] font-bold uppercase tracking-widest rotate-6 pointer-events-none select-none animate-pulse">
          <Trophy className="w-3.5 h-3.5" />
          <span>MASTERED</span>
        </div>
      )}
    </div>
  );
}
