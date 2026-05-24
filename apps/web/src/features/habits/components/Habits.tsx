'use client';

import {
  Repeat,
  Plus,
  Flame,
  Zap,
  Check,
  X,
  Target,
  TrendingUp,
} from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { useLanguage, useSound } from '@/contexts';
import { Button, Dropdown, Input } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';

import { useHabits, useCreateHabit, useCompleteHabit } from '../hooks/useHabits';

interface CreateHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateHabitModal: React.FC<CreateHabitModalProps> = ({ isOpen, onClose }) => {
  const { playSound } = useSound();
  const createHabitMutation = useCreateHabit();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  if (!isOpen) return null;

  const handleDifficultyChange = (val: string) => {
    playSound('click');
    setDifficulty(val as 'easy' | 'medium' | 'hard');
  };

  const getXpReward = () => {
    switch (difficulty) {
      case 'easy':
        return 25;
      case 'medium':
        return 50;
      case 'hard':
        return 100;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Title is required to establish a ritual');
      return;
    }

    try {
      await createHabitMutation.mutateAsync({
        title,
        description: description || undefined,
        difficulty,
        xpReward: getXpReward(),
        frequency: { type: 'daily' },
      });
      playSound('success');
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const difficultyOptions = [
    { value: 'easy', label: 'Easy (25 XP)', description: 'Trivial everyday action' },
    { value: 'medium', label: 'Medium (50 XP)', description: 'Requires deliberate effort' },
    { value: 'hard', label: 'Hard (100 XP)', description: 'Demands deep focus and discipline' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-500"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg overflow-visible rounded-3xl border border-white/10 bg-[#09090b] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-all"
        >
          <X size={18} />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-forge-cyan uppercase tracking-widest mb-2">
            <Repeat size={14} /> Establish New Ritual
          </div>
          <h2 className="text-2xl font-display font-bold text-white tracking-tight">
            Define Habit Profile
          </h2>
          <p className="text-xs text-gray-500 mt-1 italic">
            "Rituals are the silent architecture of personal sovereignty."
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title input */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
              Ritual Title
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Read Philosophy, Wake Up at 5 AM..."
              className="bg-white/5 border-white/10 text-white rounded-xl placeholder-gray-600 focus:border-white/20"
            />
          </div>

          {/* Description input */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
              Description / Intent
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Clarify the deeper intention of this recurring ritual..."
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/20 transition-all placeholder-gray-600"
            />
          </div>

          {/* Difficulty Dropdown */}
          <div className="space-y-2 relative">
            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
              Discipline Difficulty
            </label>
            <Dropdown
              value={difficulty}
              onChange={handleDifficultyChange}
              options={difficultyOptions}
              className="w-full bg-white/5 border border-white/10 text-white rounded-xl"
            />
          </div>

          {/* XP Reward Preview */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-forge-cyan" />
              <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">
                Experience Reward
              </span>
            </div>
            <span className="text-sm font-mono font-bold text-forge-cyan">
              +{getXpReward()} XP
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="rounded-xl border border-white/5 text-gray-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createHabitMutation.isPending}
              className="rounded-xl bg-white text-black hover:bg-white/90 disabled:opacity-50"
            >
              {createHabitMutation.isPending ? 'Establishing...' : 'Establish Ritual'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const Habits: React.FC = () => {
  const { t } = useLanguage();
  const { playSound } = useSound();
  const { data: habits = [], isLoading } = useHabits();
  const completeHabitMutation = useCompleteHabit();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleComplete = async (id: string) => {
    playSound('success');
    try {
      await completeHabitMutation.mutate(id);
    } catch (err) {
      console.error(err);
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
      case 'easy':
        return 'text-emerald-400/80 bg-emerald-500/5 border-emerald-500/10';
      case 'medium':
        return 'text-amber-400/80 bg-amber-500/5 border-amber-500/10';
      case 'hard':
        return 'text-rose-400/80 bg-rose-500/5 border-rose-500/10';
      default:
        return 'text-gray-400 bg-white/5 border-white/10';
    }
  };

  const activeCount = habits.length;
  const totalCompletions = habits.reduce((acc, h) => acc + h.streak, 0);
  const highestStreak = habits.reduce((acc, h) => Math.max(acc, h.streak), 0);

  return (
    <div className="h-full flex bg-transparent overflow-hidden text-white font-sans">
      <div className="flex-1 h-full overflow-y-auto scrollbar-hide p-8 pb-32">

        {/* Serene Header */}
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 opacity-80 mb-3">
              <div className="h-px w-8 bg-gradient-to-r from-forge-cyan/40 to-transparent" />
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-forge-cyan/80">
                Evolution Engine
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              Habit Rituals
            </h1>
            <p className="text-xs text-gray-500 mt-2 font-light max-w-xl leading-relaxed italic">
              "We are what we repeatedly do. Excellence, then, is not an act, but a habit." — Aristotle
            </p>
          </div>

          <button
            onClick={() => {
              playSound('click');
              setShowCreateModal(true);
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.1)] group text-xs uppercase tracking-wider font-mono shrink-0 cursor-pointer"
          >
            <Plus size={14} className="group-hover:rotate-90 transition-transform duration-300" />
            Establish Ritual
          </button>
        </header>

        {/* Quiet Diagnostic Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10 relative z-10">
          {[
            { label: 'Active Rituals', value: activeCount, icon: Target, desc: 'Currently tracked disciplines' },
            { label: 'Accrued Streaks', value: `${totalCompletions} days`, icon: Flame, desc: 'Accumulated repeat achievements' },
            { label: 'Peak Consistency', value: `${highestStreak} days`, icon: TrendingUp, desc: 'Longest continuous streak' },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md flex items-center justify-between"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500 block">
                  {stat.label}
                </span>
                <span className="text-2xl font-bold text-white block">
                  {isLoading ? '...' : stat.value}
                </span>
                <span className="text-[10px] text-gray-600 block italic">
                  {stat.desc}
                </span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <stat.icon size={20} className="text-forge-cyan/70" />
              </div>
            </div>
          ))}
        </div>

        {/* Habits Grid Content */}
        <div className="relative z-10">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-44 bg-white/[0.02] border border-white/5 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : habits.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {habits.map((habit) => (
                <div
                  key={habit.id}
                  className="group relative rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md p-6 hover:bg-white/[0.02] hover:border-white/10 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-lg min-h-[190px]"
                >
                  <div className="space-y-3">
                    {/* Top tags */}
                    <div className="flex items-center justify-between">
                      <span className={cn('text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded border', getDifficultyColor(habit.difficulty))}>
                        {habit.difficulty}
                      </span>
                      <div className="flex items-center gap-1 text-[9px] font-mono text-forge-cyan/70 tracking-wider uppercase">
                        <Zap size={11} /> Quest Linked
                      </div>
                    </div>

                    {/* Title & Desc */}
                    <div className="space-y-1.5">
                      <h3 className="text-base font-display font-medium text-gray-200 group-hover:text-white transition-colors duration-500">
                        {habit.title}
                      </h3>
                      {habit.description && (
                        <p className="text-xs text-gray-500 font-sans line-clamp-2 leading-relaxed font-light">
                          {habit.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions & Streaks */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-4">
                    {/* Streaks info */}
                    <div className="flex items-center gap-1.5 text-xs text-amber-500/80 font-mono">
                      <Flame size={14} className={cn(habit.streak > 0 ? 'animate-pulse' : 'opacity-30')} />
                      <span className="font-bold">{habit.streak}d streak</span>
                    </div>

                    {/* Complete button circle */}
                    <button
                      onClick={() => handleComplete(habit.id)}
                      disabled={completeHabitMutation.isPending}
                      className={cn(
                        'w-8 h-8 rounded-full border border-white/10 hover:border-forge-cyan bg-white/5 hover:bg-forge-cyan/10 transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 group/btn',
                        completeHabitMutation.isPending && 'opacity-50 pointer-events-none'
                      )}
                      title="Perform Ritual"
                    >
                      <Check size={14} className="text-gray-400 group-hover/btn:text-forge-cyan transition-colors" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Serene Empty state
            <div className="flex flex-col items-center justify-center py-28 border border-dashed border-white/5 rounded-3xl bg-white/[0.01] backdrop-blur-md">
              <Repeat size={48} className="text-white/20 mb-4 animate-pulse" />
              <h3 className="text-lg font-display font-semibold text-white mb-2">No Rituals Established</h3>
              <p className="text-xs text-gray-500 max-w-sm text-center leading-relaxed mb-6 font-light">
                Discipline is built on repeating quiet, purposeful actions. Establish your first recurring habit ritual above.
              </p>
              <button
                onClick={() => {
                  playSound('click');
                  setShowCreateModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-forge-cyan/20 bg-forge-cyan/5 text-forge-cyan hover:bg-forge-cyan/10 transition-all text-xs font-mono font-semibold tracking-wider uppercase"
              >
                Establish Ritual
              </button>
            </div>
          )}
        </div>
      </div>

      <CreateHabitModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </div>
  );
};
