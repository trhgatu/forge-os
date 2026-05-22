'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Shield, Plus, Search } from 'lucide-react';
import { useSound, useNovaView } from '@/contexts';
import { View } from '@/shared/types/os';
import { toast } from 'sonner';
import { Button } from '@/shared/components/ui';
import type { Habit } from '@/features/gamification/types';
import { gamificationApi } from '@/features/gamification/services/gamificationApi';
import {
  useQuests,
  useCreateQuest,
  useUpdateQuest,
  useDeleteQuest,
} from '../hooks/useQuests';
import type { Quest } from '../types';
import { QuestCard } from './QuestCard';
import { QuestSidebar } from './QuestSidebar';
import { QuestModal } from './QuestModal';

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
    <div className="h-full flex flex-col bg-[#030304] text-white relative overflow-hidden animate-in fade-in duration-1000">
      <div className="flex-1 overflow-y-auto scrollbar-hide relative z-10 p-6 md:p-10 pb-32">
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-white mb-2">Quest Engine</h1>
              <p className="text-gray-400 font-light">
                Stoic Discipline & Multi-Module Quest Linker Board.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search quests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-white/20 w-full md:w-64 transition-colors"
                />
              </div>
              <button
                onClick={handleOpenCreateModal}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-forge-cyan/10 border border-forge-cyan/20 text-forge-cyan hover:bg-forge-cyan/20 transition-all duration-300 font-medium text-sm cursor-pointer"
              >
                <Plus size={16} /> New Quest
              </button>
            </div>
          </div>

          {/* Sidebar & Content Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar / Categories Filter */}
            <QuestSidebar
              quests={quests}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            {/* Content Cards Grid */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
                  {[1, 2, 4].map((i) => (
                    <div key={i} className="h-44 rounded-xl bg-white/5 border border-white/5" />
                  ))}
                </div>
              ) : filteredQuests.length === 0 ? (
                <div className="text-center py-20 text-gray-500 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
                  <Shield className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <span className="text-sm font-medium text-gray-400">
                    No quests found matching query
                  </span>
                  <p className="text-xs text-gray-600 mt-1">
                    Configure active stoic goals from category sidebar
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
