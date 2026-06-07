'use client';

import {
  Plus,
  Flame,
  Check,
  Target,
  TrendingUp,
  Settings,
  Trash2,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { useLanguage, useSound } from '@/contexts';
import { Button, Label, Tag, EmptyState, Skeleton, Pagination, Input } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';

import { useHabits, useCompleteHabit, useDeleteHabit } from '../hooks/useHabits';

import { HabitModal } from './HabitModal';

export const Habits: React.FC = () => {
  const { t } = useLanguage();
  const { playSound } = useSound();
  const { data: habits = [], isLoading } = useHabits();
  const completeHabitMutation = useCompleteHabit();
  const deleteHabitMutation = useDeleteHabit();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeHabitForEdit, setActiveHabitForEdit] = useState<any | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  const filteredHabits = React.useMemo(() => {
    return habits.filter((h) => {
      const matchesSearch =
        h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (h.description?.toLowerCase() || '').includes(searchQuery.toLowerCase());
      const matchesDifficulty =
        selectedDifficulty === 'all' ||
        h.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
      return matchesSearch && matchesDifficulty;
    });
  }, [habits, searchQuery, selectedDifficulty]);

  const totalPages = Math.ceil(filteredHabits.length / itemsPerPage);
  const paginatedHabits = React.useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredHabits.slice(start, start + itemsPerPage);
  }, [filteredHabits, currentPage, itemsPerPage]);

  return (
    <div className="h-full flex bg-transparent overflow-hidden text-white font-sans">
      <div className="flex-1 h-full overflow-y-auto scrollbar-hide p-8 pb-32">

        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <div className="mb-3 flex items-center gap-2 opacity-85">
              <div className="h-px w-8 bg-gradient-to-r from-forge-cyan/40 to-transparent" />
              <Label variant="cyan" className="text-[10px] font-mono tracking-[0.4em] uppercase">
                Evolution Engine
              </Label>
            </div>
            <Label variant="default" className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-3 block capitalize">
              Habit Rituals
            </Label>

            {/* Flowing Subtitle */}
            <p className="text-sm text-gray-400 font-light leading-relaxed max-w-xl italic">
              "We are what we repeatedly do. Excellence, then, is not an act, but a habit." — Aristotle
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link href="/forge/routines">
              <Button
                variant="ghost"
                onClick={() => playSound('click')}
                className="border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs uppercase tracking-wider font-mono p-4 rounded-xl cursor-pointer"
              >
                Routine Chains
                <ArrowRight size={14} className="inline ml-2" />
              </Button>
            </Link>

            <Button
              onClick={() => {
                playSound('click');
                setShowCreateModal(true);
              }}
              className="bg-white hover:bg-gray-200 text-black font-semibold shadow-[0_4px_20px_rgba(255,255,255,0.1)] text-xs uppercase tracking-wider font-mono p-4 rounded-xl cursor-pointer"
            >
              <Plus size={14} className="inline mr-2" />
              Establish Ritual
            </Button>
          </div>
        </header>

        {/* Overview Stats */}
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
                <Label variant="dim" className="text-[10px] font-mono uppercase tracking-wider block">
                  {stat.label}
                </Label>
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

        {/* Search & Filters */}
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {['all', 'easy', 'medium', 'hard'].map((diff) => (
              <Tag
                key={diff}
                variant={diff === 'all' ? 'default' : diff === 'easy' ? 'cyan' : diff === 'medium' ? 'accent' : 'danger'}
                active={selectedDifficulty === diff}
                onClick={() => {
                  playSound('click');
                  setSelectedDifficulty(diff);
                  setCurrentPage(1);
                }}
                interactive
                className="capitalize text-xs px-3 py-1.5 rounded-full"
              >
                {diff}
              </Tag>
            ))}
          </div>

          <div className="w-full sm:w-80">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search rituals..."
              className="bg-white/5 border border-white/10 text-white rounded-xl placeholder-gray-600 focus:border-white/20 w-full"
            />
          </div>
        </div>
        <div className="relative z-10 flex flex-col gap-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              playSound('click');
              setCurrentPage(page);
            }}
            className="pt-0 border-t-0 pb-4 border-b border-white/5"
          />

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} variant="glowing" className="h-44 rounded-2xl" />
              ))}
            </div>
          ) : paginatedHabits.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedHabits.map((habit) => (
                <div
                  key={habit.id}
                  className="group relative rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md p-6 hover:bg-white/[0.02] hover:border-white/10 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-lg min-h-[190px]"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Tag
                        variant={
                          habit.difficulty === 'hard'
                            ? 'danger'
                            : habit.difficulty === 'medium'
                              ? 'accent'
                              : 'cyan'
                        }
                        className={cn(
                          'text-[9px] font-mono uppercase tracking-widest border-none py-1 px-2.5 font-bold',
                          getDifficultyColor(habit.difficulty)
                        )}
                      >
                        {habit.difficulty}
                      </Tag>
                      <div className="flex items-center gap-1 text-[9px] font-mono text-forge-cyan/70 tracking-wider uppercase">
                        Quest Linked
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        variant="default"
                        className="text-base font-display font-medium text-gray-200 group-hover:text-white transition-colors duration-500 block"
                      >
                        {habit.title}
                      </Label>
                      {habit.description && (
                        <p className="text-xs text-gray-500 font-sans line-clamp-2 leading-relaxed font-light">
                          {habit.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-4">
                    <div className="flex items-center gap-1.5 text-xs text-amber-500/80 font-mono">
                      <Flame size={14} className={cn(habit.streak > 0 ? 'animate-pulse' : 'opacity-30')} />
                      <span className="font-bold">{habit.streak}d streak</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          playSound('click');
                          setActiveHabitForEdit(habit);
                          setShowEditModal(true);
                        }}
                        className="w-8 h-8 rounded-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center cursor-pointer"
                        title="Edit Habit"
                      >
                        <Settings size={13} className="text-gray-400 hover:text-white" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          playSound('click');
                          toast('Delete this habit ritual?', {
                            action: {
                              label: 'Confirm',
                              onClick: () => {
                                deleteHabitMutation.mutate(habit.id);
                              },
                            },
                          });
                        }}
                        className="w-8 h-8 rounded-full border border-white/10 hover:border-red-500/20 bg-white/5 hover:bg-red-500/5 transition-all flex items-center justify-center cursor-pointer"
                        title="Delete Habit"
                      >
                        <Trash2 size={13} className="text-gray-400 hover:text-red-400" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => !habit.isCompletedToday && handleComplete(habit.id)}
                        disabled={completeHabitMutation.isPending || habit.isCompletedToday}
                        className={cn(
                          'w-8 h-8 rounded-full border transition-all duration-300 flex items-center justify-center h-8 w-8',
                          habit.isCompletedToday
                            ? 'border-forge-cyan bg-forge-cyan/10 shadow-[0_0_10px_rgba(34,211,238,0.2)] pointer-events-none'
                            : 'border-white/10 hover:border-forge-cyan bg-white/5 hover:bg-forge-cyan/10 cursor-pointer hover:scale-105 active:scale-95 group/btn',
                          completeHabitMutation.isPending && 'opacity-50 pointer-events-none'
                        )}
                        title={habit.isCompletedToday ? 'Ritual Performed Today' : 'Perform Ritual'}
                      >
                        <Check
                          size={14}
                          className={cn(
                            habit.isCompletedToday
                              ? 'text-forge-cyan font-bold'
                              : 'text-gray-400 group-hover/btn:text-forge-cyan transition-colors'
                          )}
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title={searchQuery ? "Không Tìm Thấy Nghi Kỷ Nào" : "Chưa Thiết Lập Nghi Kỷ Nào"}
              description={searchQuery ? "Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc độ khó." : "Kỷ luật tự thân được xây dựng từ những hành động nhỏ bé nhưng kiên định mỗi ngày. Hãy thiết lập nghi kỷ đầu tiên của bạn để bắt đầu hành trình."}
              glowColor="cyan"
              size="lg"
              className="bg-transparent border border-dashed border-white/5 py-20 rounded-3xl"
            >
              <Button
                onClick={() => {
                  playSound('click');
                  setShowCreateModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-forge-cyan/20 bg-forge-cyan/5 text-forge-cyan hover:bg-forge-cyan/10 transition-all text-xs font-mono font-semibold tracking-wider uppercase cursor-pointer"
              >
                Establish Ritual
              </Button>
            </EmptyState>
          )}
        </div>
      </div>

      <HabitModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
      <HabitModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setActiveHabitForEdit(null);
        }}
        habit={activeHabitForEdit}
      />
    </div>
  );
};
