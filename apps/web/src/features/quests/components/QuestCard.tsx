'use client';

import {
  Zap,
  Clock,
  Edit3,
  Trash2,
  CheckCircle2,
  BookOpen,
  Repeat,
  Award,
  GitBranch,
  Coins,
  Layers,
  Brain,
  Sparkles,
} from 'lucide-react';

import { useSound } from '@/contexts';
import { Label, Button, Tag } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';

import type { Quest } from '../types';

interface QuestCardProps {
  quest: Quest;
  onEdit: (quest: Quest) => void;
  onDelete: (id: string) => void;
}

export function QuestCard({ quest, onEdit, onDelete }: QuestCardProps) {
  const { playSound } = useSound();

  return (
    <div
      className={cn(
        'group relative rounded-3xl border bg-white/[0.01] backdrop-blur-md p-6 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-lg min-h-[250px]',
        quest.isCompleted
          ? 'border-emerald-500/30 bg-emerald-500/[0.01] shadow-[0_0_30px_rgba(16,185,129,0.05)]'
          : 'border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
      )}
    >
      {/* Glow backlight inside completed quests */}
      {quest.isCompleted && (
        <div className="absolute inset-0 bg-radial from-emerald-500/5 to-transparent pointer-events-none opacity-40 animate-pulse" />
      )}

      <div className="space-y-4 relative z-10">
        {/* Header Badges & Actions */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Tag
              variant={
                quest.type === 'main'
                  ? 'cyan'
                  : quest.type === 'weekly'
                    ? 'accent'
                    : quest.type === 'daily'
                      ? 'accent'
                      : 'default'
              }
              className={cn(
                'text-[9px] uppercase font-mono tracking-wider font-bold border-none py-1 px-2.5',
                quest.type === 'daily' && 'bg-amber-500/15 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.05)]',
                quest.type === 'weekly' && 'bg-purple-500/15 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.05)]',
                quest.type === 'main' && 'bg-forge-cyan/15 text-forge-cyan shadow-[0_0_10px_rgba(6,182,212,0.05)]',
                quest.type === 'side' && 'bg-gray-500/15 text-gray-400'
              )}
            >
              {quest.type}
            </Tag>
          </div>

          <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                playSound('click');
                onEdit(quest);
              }}
              className="p-1.5 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 text-gray-500 hover:text-white transition-all cursor-pointer h-7 w-7"
              title="Edit Quest"
            >
              <Edit3 size={11} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                playSound('click');
                onDelete(quest.id);
              }}
              className="p-1.5 rounded-lg bg-red-500/5 border border-red-500/10 hover:border-red-500/20 text-red-400/70 hover:text-red-400 transition-all cursor-pointer h-7 w-7"
              title="Archive Quest"
            >
              <Trash2 size={11} />
            </Button>
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <Label
            variant="default"
            className="text-lg font-medium text-gray-200 group-hover:text-white transition-colors duration-500 block"
          >
            {quest.title}
          </Label>
          {quest.description && (
            <p className="text-xs text-gray-500 font-light mt-1.5 leading-relaxed">
              {quest.description}
            </p>
          )}
        </div>

        {/* Dynamic Interactive Objectives List */}
        <div className="space-y-3.5 pt-3 border-t border-white/5">
          {quest.objectives.map((obj) => (
            <div key={obj.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-gray-300 font-medium">
                  {obj.type === 'CREATE_JOURNAL' ? (
                    <BookOpen className="w-3.5 h-3.5 text-forge-cyan" />
                  ) : obj.type === 'CHECK_HABIT' ? (
                    <Repeat className="w-3.5 h-3.5 text-amber-400" />
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
                  <span className="text-[11px] font-sans">
                    {obj.type === 'CREATE_JOURNAL'
                      ? 'Write Journal Page'
                      : obj.type === 'CHECK_HABIT'
                        ? 'Complete Habit target'
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
                <span className="font-mono text-gray-500 text-[10px]">
                  {quest.isCompleted ? obj.targetCount : obj.currentCount} / {obj.targetCount}
                </span>
              </div>

              {/* Progress track bar */}
              <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                <div
                  className={cn(
                    'h-full transition-all duration-700 rounded-full',
                    (quest.isCompleted || obj.isCompleted) ? 'bg-emerald-500' : 'bg-forge-cyan'
                  )}
                  style={{
                    width: `${
                      quest.isCompleted
                        ? 100
                        : Math.min(100, (obj.currentCount / obj.targetCount) * 100)
                    }%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info & Clearing overlay */}
      <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-4 relative z-10">
        <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-mono">
          <Clock size={11} className="text-gray-600" />
          <span>Added {quest.createdAt ? new Date(quest.createdAt).toLocaleDateString() : 'recently'}</span>
        </div>
        <div className="flex items-center gap-1 text-forge-cyan text-xs font-bold font-mono">
          <Zap size={12} className="fill-forge-cyan/10" />
          <span>+{quest.xpReward} XP</span>
        </div>
      </div>

      {/* Clearing Badge */}
      {quest.isCompleted && (
        <div className="absolute right-6 bottom-16 flex items-center gap-1.5 border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 rounded-lg text-emerald-400 text-[9px] font-bold uppercase tracking-widest rotate-6 pointer-events-none select-none animate-pulse">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>CLEARED</span>
        </div>
      )}
    </div>
  );
}
