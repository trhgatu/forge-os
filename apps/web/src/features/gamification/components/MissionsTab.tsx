'use client';

import {
  Zap,
  Award,
  BookOpen,
  Repeat,
  Compass,
  GitBranch,
  Clock,
  Brain,
  Layers,
  Coins,
  Sparkles,
  CheckCircle2,
  Shield,
  HelpCircle,
} from 'lucide-react';
import React, { useState, useEffect } from 'react';

import { Pagination } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';

import type { Quest } from '../../quests/types';

interface MissionsTabProps {
  quests: Quest[];
  filter: 'all' | 'daily' | 'main' | 'side';
  setFilter: (filter: 'all' | 'daily' | 'main' | 'side') => void;
  isLoading: boolean;
  error: Error | null;
}

export const MissionsTab: React.FC<MissionsTabProps> = ({
  quests,
  filter,
  setFilter,
  isLoading,
  error,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredQuests = quests.filter((q) => {
    if (filter === 'all') return true;
    return q.type === filter;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const totalPages = Math.ceil(filteredQuests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedQuests = filteredQuests.slice(startIndex, startIndex + itemsPerPage);

  if (error) {
    return (
      <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-xs flex items-center gap-2">
        <HelpCircle className="w-4 h-4 shrink-0" />
        <span>{error.message || 'Quest synchronization offline'}</span>
      </div>
    );
  }

  if (isLoading && quests.length === 0) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 rounded-xl bg-white/5 border border-white/10" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Categories / Type Filters */}
      <div className="flex items-center gap-1.5 p-1 border-b border-white/5 bg-[#0A0A0F]/20 rounded-xl overflow-x-auto select-none">
        {[
          { id: 'all', label: 'All Quests' },
          { id: 'daily', label: 'Daily' },
          { id: 'main', label: 'Main' },
          { id: 'side', label: 'Side' },
        ].map((btn) => {
          const count =
            btn.id === 'all'
              ? quests.length
              : quests.filter((q) => q.type === btn.id).length;
          const isActive = filter === btn.id;
          return (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id as any)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-[10px] font-semibold tracking-wider uppercase border transition-all cursor-pointer flex items-center gap-1.5',
                isActive
                  ? 'bg-forge-cyan/10 border-forge-cyan text-forge-cyan'
                  : 'bg-black/20 border-white/5 text-gray-500 hover:text-white'
              )}
            >
              <span>{btn.label}</span>
              <span
                className={cn(
                  'px-1 rounded-sm text-[8px] font-mono',
                  isActive ? 'bg-forge-cyan/20 text-forge-cyan' : 'bg-white/5 text-gray-600'
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {paginatedQuests.length === 0 ? (
        <div className="py-20 text-center flex flex-col items-center justify-center text-gray-500 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
          <Shield className="w-10 h-10 text-gray-700 mb-3" />
          <p className="text-xs font-semibold text-gray-400">No active quests found</p>
          <p className="text-[10px] mt-1 text-gray-600">Archived or completed goals are hidden</p>
        </div>
      ) : (
        <>
          {paginatedQuests.map((quest) => (
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

              {/* Objectives list */}
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
                        ) : obj.type === 'SYNC_PROJECT' ? (
                          <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
                        ) : obj.type === 'COMPLETE_ROUTINE' ? (
                          <Clock className="w-3.5 h-3.5 text-purple-400" />
                        ) : obj.type === 'STUDY_CONCEPT' ? (
                          <Brain className="w-3.5 h-3.5 text-forge-cyan" />
                        ) : obj.type === 'REVIEW_FLASHCARD' ? (
                          <Layers className="w-3.5 h-3.5 text-orange-400" />
                        ) : obj.type === 'LOG_TRANSACTION' ? (
                          <Coins className="w-3.5 h-3.5 text-yellow-400" />
                        ) : obj.type === 'CREATE_REFLECTION' ? (
                          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
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
                                : obj.type === 'SYNC_PROJECT'
                                  ? 'Sync GitHub Project'
                                  : obj.type === 'COMPLETE_ROUTINE'
                                    ? 'Complete Routine Session'
                                    : obj.type === 'STUDY_CONCEPT'
                                      ? 'Study Knowledge Concept'
                                      : obj.type === 'REVIEW_FLASHCARD'
                                        ? 'Review Spaced Flashcards'
                                        : obj.type === 'LOG_TRANSACTION'
                                          ? 'Log Wealth Transaction'
                                          : obj.type === 'CREATE_REFLECTION'
                                            ? 'Create Wealth Reflection'
                                            : 'Create Memory Node'}
                        </span>
                      </div>
                      <span className="font-mono text-gray-400 text-[10px]">
                        {obj.currentCount} / {obj.targetCount}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                      <div
                        className={cn(
                          'h-full transition-all duration-700 rounded-full',
                          obj.isCompleted ? 'bg-emerald-500' : 'bg-forge-cyan'
                        )}
                        style={{
                          width: `${Math.min(100, (obj.currentCount / obj.targetCount) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Completed stamp */}
              {quest.isCompleted && (
                <div className="absolute right-4 bottom-4 flex items-center gap-1.5 border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 rounded-lg text-emerald-400 text-[9px] font-bold uppercase tracking-widest rotate-6 pointer-events-none select-none animate-pulse">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>CLEARED</span>
                </div>
              )}
            </div>
          ))}

          {/* Pagination Controls */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};
