'use client';

import React from 'react';
import { Zap, Clock, Edit3, Trash2 } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { GlassCard } from '@/shared/components/ui';
import type { Quest } from '../types';

interface QuestCardProps {
  quest: Quest;
  onEdit: (quest: Quest) => void;
  onDelete: (id: string) => void;
}

export function QuestCard({ quest, onEdit, onDelete }: QuestCardProps) {
  return (
    <GlassCard
      className={cn(
        'group relative flex flex-col justify-between p-5 border transition-all duration-300 hover:-translate-y-1',
        quest.isCompleted
          ? 'border-green-500/20 bg-green-950/5'
          : 'border-white/5 hover:border-white/10 bg-white/[0.01]',
      )}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'text-[10px] uppercase font-mono px-2 py-0.5 rounded-full font-bold',
                quest.type === 'daily' && 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
                quest.type === 'weekly' && 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
                quest.type === 'main' && 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
                quest.type === 'side' && 'bg-gray-500/10 text-gray-400 border border-gray-500/20',
              )}
            >
              {quest.type}
            </span>
            {quest.isCompleted && (
              <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                Completed
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(quest)}
              className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-all cursor-pointer"
            >
              <Edit3 size={12} />
            </button>
            <button
              onClick={() => onDelete(quest.id)}
              className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 transition-all cursor-pointer"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-display font-semibold text-lg text-white group-hover:text-forge-cyan transition-colors">
            {quest.title}
          </h3>
          <p className="text-sm font-light text-gray-400 line-clamp-2 mt-1">
            {quest.description || 'No description provided.'}
          </p>
        </div>

        {/* Objectives List */}
        <div className="space-y-1.5 pt-2">
          {quest.objectives.map((obj) => (
            <div
              key={obj.id}
              className="flex items-center justify-between text-xs text-gray-400"
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    'w-1.5 h-1.5 rounded-full',
                    obj.isCompleted ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-gray-600',
                  )}
                />
                <span className="font-light">
                  {obj.type === 'CREATE_JOURNAL' && 'Create Journal Entry'}
                  {obj.type === 'CHECK_HABIT' && 'Check Habit Completion'}
                  {obj.type === 'CREATE_MEMORY' && 'Log Memory Page'}
                </span>
              </div>
              <span className="font-mono text-gray-500">
                {obj.currentCount}/{obj.targetCount}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-4">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Clock size={12} />
          <span>Added {quest.createdAt ? new Date(quest.createdAt).toLocaleDateString() : 'recently'}</span>
        </div>
        <div className="flex items-center gap-1 text-forge-cyan text-sm font-bold font-mono">
          <Zap size={14} className="fill-forge-cyan" />
          <span>+{quest.xpReward} XP</span>
        </div>
      </div>
    </GlassCard>
  );
}
