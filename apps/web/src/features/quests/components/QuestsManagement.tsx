'use client';

import { Shield, Plus } from 'lucide-react';
import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';

import { useSound, useNovaView } from '@/contexts';
import { gamificationApi } from '@/features/gamification/services/gamificationApi';
import type { Habit } from '@/features/gamification/types';
import { Button } from '@/shared/components/ui';
import { View } from '@/shared/types/os';

import {
  useQuests,
  useCreateQuest,
  useUpdateQuest,
  useDeleteQuest,
} from '../hooks/useQuests';
import type { Quest } from '../types';

import { QuestCard } from './QuestCard';
import { QuestModal } from './QuestModal';
import { QuestSidebar } from './QuestSidebar';

type CategoryType = 'all' | 'daily' | 'weekly' | 'main' | 'side';

export function QuestsManagement() {
  const { data: quests = [], isLoading } = useQuests();
  const { setCurrentView } = useNovaView();

  useEffect(() => {
    setCurrentView(View.QUESTS);
  }, [setCurrentView]);

  const [habits, setHabits] = useState<Habit[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');

  // Mutation Hooks
  const createQuestMutation = useCreateQuest();
  const updateQuestMutation = useUpdateQuest();
  const deleteQuestMutation = useDeleteQuest();

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuest, setEditingQuest] = useState<Quest | null>(null);

  const { playSound } = useSound();

  // Load complementary habits data
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const habitsData = await gamificationApi.getHabits();
        setHabits(habitsData);
      } catch (err) {
        console.error('Failed to load habits:', err);
      }
    };
    fetchHabits();
  }, []);

  const handleOpenCreateModal = () => {
    playSound('click');
    setEditingQuest(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (quest: Quest) => {
    playSound('click');
    setEditingQuest(quest);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (questData: any) => {
    if (editingQuest) {
      await updateQuestMutation.mutateAsync({
        id: editingQuest.id,
        data: questData,
      });
    } else {
      await createQuestMutation.mutateAsync(questData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    playSound('click');
    toast.custom((t) => (
      <div className="flex flex-col gap-2 rounded-xl border border-red-500/20 bg-black/90 p-4 text-sm text-white shadow-xl backdrop-blur-md">
        <p className="font-bold">Archive this quest?</p>
        <p className="text-gray-400">This will remove it from active Quest Log boards.</p>
        <div className="mt-2 flex gap-2">
          <Button
            variant="danger"
            size="sm"
            onClick={async () => {
              toast.dismiss(t);
              await deleteQuestMutation.mutateAsync(id);
            }}
          >
            Confirm
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.dismiss(t)}
          >
            Cancel
          </Button>
        </div>
      </div>
    ));
  };

  const filteredQuests = useMemo(() => {
    return quests.filter((q) => {
      if (q.isActive === false) return false;
      const matchesSearch =
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (q.description && q.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = activeCategory === 'all' || q.type === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [quests, searchQuery, activeCategory]);

  return (
    <div className="h-full flex flex-col bg-transparent text-white relative overflow-hidden animate-in fade-in duration-1000 font-sans">
      <div className="flex-1 overflow-y-auto scrollbar-hide relative z-10 p-6 md:p-10 pb-32">
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
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
                Quest Log
              </h1>
              <p className="text-xs text-gray-500 mt-2 font-light max-w-xl leading-relaxed italic">
                "We do not rise to the level of our goals. We fall to the level of our systems." Align your daily disciplines to complete active missions.
              </p>
            </div>

            <button
              onClick={handleOpenCreateModal}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.1)] group text-xs uppercase tracking-wider font-mono shrink-0 cursor-pointer"
            >
              <Plus size={14} className="group-hover:rotate-90 transition-transform duration-300" />
              New Quest
            </button>
          </header>

          {/* Sidebar & Content Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar / Categories Filter */}
            <QuestSidebar
              quests={quests}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {/* Content Cards Grid */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
                  {[1, 2, 4].map((i) => (
                    <div key={i} className="h-64 rounded-3xl bg-white/[0.01] border border-white/5" />
                  ))}
                </div>
              ) : filteredQuests.length === 0 ? (
                <div className="text-center py-28 text-gray-500 border border-dashed border-white/5 rounded-3xl bg-white/[0.01] backdrop-blur-md">
                  <Shield className="w-12 h-12 text-white/20 mx-auto mb-4" />
                  <span className="text-sm font-medium text-gray-400">
                    No quests found matching query
                  </span>
                  <p className="text-xs text-gray-600 mt-1 font-light italic">
                    Configure active stoic goals from category sidebar
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredQuests.map((quest) => (
                    <QuestCard
                      key={quest.id}
                      quest={quest}
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

      {/* 🚀 Create / Edit Quest Modal */}
      <QuestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        quest={editingQuest}
        habits={habits}
        isPending={createQuestMutation.isPending || updateQuestMutation.isPending}
      />
    </div>
  );
}
