'use client';

import { Check, Sparkles, Zap } from 'lucide-react';
import React from 'react';

import { cn } from '@/shared/lib/utils';

import type { Task } from '../types';

interface FocusChamberProps {
  task: Task;
  getPriorityColor: (prio: string) => string;
  onClear: () => void;
  onLeave: () => void;
}

export const FocusChamber: React.FC<FocusChamberProps> = ({
  task,
  getPriorityColor,
  onClear,
  onLeave,
}) => {
  return (
    <div className="mb-10 relative z-10 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="relative rounded-3xl border border-forge-cyan/35 bg-gradient-to-b from-forge-cyan/[0.04] to-transparent p-8 shadow-[0_0_50px_rgba(6,182,212,0.1)] overflow-hidden">
        {/* Pulsing glow breath effect */}
        <div className="absolute inset-0 bg-forge-cyan/[0.01] animate-pulse duration-[4000ms]" />

        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[10px] font-mono text-forge-cyan uppercase tracking-widest">
              <Sparkles size={12} className="animate-spin duration-3000" /> Focused Execution Chamber
            </div>
            <h2 className="text-2xl font-display font-bold text-white leading-tight">
              {task.title}
            </h2>
            {task.description && (
              <p className="text-sm text-gray-400 font-light max-w-2xl leading-relaxed">
                {task.description}
              </p>
            )}
            <div className="flex items-center gap-4 pt-1">
              <span className={cn('text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded border', getPriorityColor(task.priority))}>
                {task.priority}
              </span>
              <span className="text-[10px] font-mono text-forge-cyan flex items-center gap-1">
                <Zap size={11} /> +{task.xpReward} XP Reward
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0">
            <button
              onClick={onClear}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-forge-cyan text-black font-bold hover:bg-forge-cyan/90 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-105 active:scale-95 text-xs uppercase tracking-wider font-mono cursor-pointer"
            >
              <Check size={14} /> Clear Action
            </button>
            <button
              onClick={onLeave}
              className="px-4 py-3 rounded-xl border border-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-all text-xs font-mono uppercase tracking-wider"
            >
              Leave Focus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
