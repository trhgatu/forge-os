'use client';

import confetti from 'canvas-confetti';
import { Settings, Plus, Target } from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { toast } from 'sonner';

import { useSound } from '@/contexts';
import { useGoals, useCreateGoal, useUpdateGoal, useDeleteGoal } from '@/features/gamification/hooks/useGoals';
import type { Goal } from '@/features/gamification/types';
import { useQuests } from '@/features/quests/hooks/useQuests';
import { Button } from '@/shared/components/ui';
import { useAuthStore } from '@/shared/store/authStore';

import { GoalCard } from './GoalCard';
import { GoalModal } from './GoalModal';
import { GoalSidebar } from './GoalSidebar';

type CategoryType = 'all' | 'active' | 'completed';

export function GoalsManagement() {
  const { user } = useAuthStore();
  const { data: goals = [], isLoading } = useGoals();
  const { data: quests = [] } = useQuests();
  const { playSound } = useSound();
  const createGoalMutation = useCreateGoal();
  const updateGoalMutation = useUpdateGoal();
  const deleteGoalMutation = useDeleteGoal();

  // State Management
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');

  const isAdmin = user?.role?.name === 'admin' || user?.role?.name === 'super_admin' || user?.email === 'admin@example.com' || user?.email?.includes('admin');

  // Trigger celebration confetti
  const triggerCelebration = () => {
    playSound('success');
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#fbbf24', '#f59e0b', '#ffffff', '#22d3ee']
    });
  };

  const handleOpenCreateModal = () => {
    playSound('click');
    setEditingGoal(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (goal: Goal) => {
    playSound('click');
    setEditingGoal(goal);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (goalData: any) => {
    if (editingGoal) {
      await updateGoalMutation.mutateAsync({
        id: editingGoal.id,
        data: {
          ...goalData,
          isActive: true
        }
      });
    } else {
      await createGoalMutation.mutateAsync(goalData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    playSound('click');
    toast.custom((t) => (
      <div className="flex flex-col gap-2 rounded-xl border border-red-500/20 bg-black/90 p-4 text-sm text-white shadow-xl backdrop-blur-md">
        <p className="font-bold">Delete this Epic Goal?</p>
        <p className="text-gray-400">This will permanently remove this epic goal and reset progress.</p>
        <div className="mt-2 flex gap-2">
          <Button
            variant="danger"
            size="sm"
            onClick={async () => {
              toast.dismiss(t);
              playSound('click');
              await deleteGoalMutation.mutateAsync(id);
            }}
          >
            Confirm
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              playSound('click');
              toast.dismiss(t);
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    ));
  };

  const filteredGoals = useMemo(() => {
    return goals.filter((g) => {
      const matchesSearch =
        g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (g.description && g.description.toLowerCase().includes(searchQuery.toLowerCase()));

      if (activeCategory === 'active') {
        return matchesSearch && !g.isCompleted;
      }
      if (activeCategory === 'completed') {
        return matchesSearch && g.isCompleted;
      }
      return matchesSearch;
    });
  }, [goals, searchQuery, activeCategory]);

  return (
    <div className="h-full flex flex-col bg-transparent text-white relative overflow-hidden animate-in fade-in duration-1000 font-sans">
      {/* Alchemical background glowing spots */}
      <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-forge-cyan/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="flex-1 overflow-y-auto scrollbar-hide relative z-10 p-6 md:p-10 pb-32">
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">

          {/* Header Section */}
          <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 opacity-80 mb-3">
                <div className="h-px w-8 bg-gradient-to-r from-forge-cyan/40 to-transparent" />
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-forge-cyan/80">
                  Evolution Engine
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
                Epic Goals & Achievements
              </h1>
              <p className="text-xs text-gray-500 mt-2 font-light max-w-xl leading-relaxed italic">
                "We do not rise to the level of our goals. We fall to the level of our systems." Align your daily disciplines to master long-term epic honors.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {isAdmin && (
                <button
                  onClick={() => { playSound('click'); setIsAdminMode(!isAdminMode); }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-[10px] uppercase tracking-wider font-mono transition-all duration-300 cursor-pointer ${isAdminMode
                    ? 'bg-forge-cyan/10 border-forge-cyan/30 text-forge-cyan shadow-[0_0_15px_rgba(34,211,238,0.05)]'
                    : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/[0.08]'
                    }`}
                >
                  <Settings size={12} />
                  <span>Admin</span>
                </button>
              )}

              {isAdminMode && (
                <button
                  onClick={handleOpenCreateModal}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.1)] group text-xs uppercase tracking-wider font-mono shrink-0 cursor-pointer"
                >
                  <Plus size={14} className="group-hover:rotate-90 transition-transform duration-300" />
                  New Goal
                </button>
              )}
            </div>
          </header>

          {/* Grid Layout of Goals Page */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* Sidebar Column */}
            <GoalSidebar
              goals={goals}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              triggerCelebration={triggerCelebration}
            />

            {/* Goals Display Grid */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
                  {[1, 2].map((i) => (
                    <div key={i} className="h-64 rounded-3xl bg-white/[0.01] border border-white/5" />
                  ))}
                </div>
              ) : filteredGoals.length === 0 ? (
                <div className="text-center py-28 text-gray-500 border border-dashed border-white/5 rounded-3xl bg-white/[0.01] backdrop-blur-md">
                  <Target className="w-12 h-12 text-white/20 mx-auto mb-4" />
                  <span className="text-sm font-medium text-gray-400">
                    No epic goals found matching filter
                  </span>
                  <p className="text-xs text-gray-600 mt-1 font-light italic">
                    Unlock long-term challenges to earn legendary achievements
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredGoals.map((goal) => (
                    <GoalCard
                      key={goal.id}
                      goal={goal}
                      quests={quests}
                      isAdminMode={isAdminMode}
                      onEdit={handleOpenEditModal}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Premium Configure Epic Goal Modal Overlay */}
      <GoalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        goal={editingGoal}
        isPending={createGoalMutation.isPending || updateGoalMutation.isPending}
        quests={quests}
      />

    </div>
  );
}
