'use client';

import { Plus } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';

import { useSound, useNovaView } from '@/contexts';
import { gamificationApi } from '@/features/gamification/services/gamificationApi';
import type { Habit } from '@/features/gamification/types';
import { Button, Label, EmptyState, Skeleton, Pagination } from '@/shared/components/ui';
import { View } from '@/shared/types/os';

import {
  useQuests,
  useCreateQuest,
  useUpdateQuest,
  useDeleteQuest,
} from '../hooks/useQuests';
import type { Quest } from '../types';

import { useRoutines } from '@/features/routines/hooks/useRoutines';

import { QuestCard } from './QuestCard';
import { QuestModal } from './QuestModal';
import { QuestSidebar } from './QuestSidebar';

type CategoryType = 'all' | 'daily' | 'weekly' | 'main' | 'side';

export function QuestsManagement() {
  const { data: quests = [], isLoading } = useQuests();
  const { data: routines = [] } = useRoutines();
  const { setCurrentView } = useNovaView();

  useEffect(() => {
    setCurrentView(View.QUESTS);
  }, [setCurrentView]);

  const [habits, setHabits] = useState<Habit[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredQuests.length / itemsPerPage);
  }, [filteredQuests, itemsPerPage]);

  const paginatedQuests = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredQuests.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredQuests, currentPage, itemsPerPage]);

  return (
    <div className="h-full flex flex-col bg-transparent text-white relative overflow-hidden animate-in fade-in duration-1000 font-sans">
      <div className="flex-1 overflow-y-auto scrollbar-hide relative z-10 p-6 md:p-10 pb-32">
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
          {/* Serene Header - Synchronized Alchemical Style */}
          <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
            <div>
              {/* Ethereal label */}
              <div className="mb-3 flex items-center gap-2 opacity-85">
                <div className="h-px w-8 bg-gradient-to-r from-forge-cyan/40 to-transparent" />
                <Label variant="cyan" className="text-[10px] font-mono tracking-[0.4em] uppercase">
                  Evolution Engine
                </Label>
              </div>

              {/* Poetic Title */}
              <Label variant="default" className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-3 block capitalize">
                Quest Log
              </Label>

              <p className="text-sm text-gray-400 font-light leading-relaxed max-w-xl italic">
                "We do not rise to the level of our goals. We fall to the level of our systems." Align your daily disciplines to complete active missions.
              </p>
            </div>

            <Button
              onClick={handleOpenCreateModal}
              className="bg-white hover:bg-gray-200 text-black font-semibold shadow-[0_4px_20px_rgba(255,255,255,0.1)] text-xs uppercase tracking-wider font-mono shrink-0 cursor-pointer p-4 rounded-xl"
            >
              <Plus size={14} className="inline mr-2" />
              New Quest
            </Button>
          </header>

          {/* Top Categories Filter & Search */}
          <QuestSidebar
            quests={quests}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />


          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              playSound('click');
              setCurrentPage(page);
            }}
            className="pt-0 border-t-0 pb-4 border-b border-white/5"
          />

          {/* Content Cards Grid */}
          <div className="w-full mt-6">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[1, 2, 4].map((i) => (
                  <Skeleton key={i} variant="glowing" className="h-64 rounded-3xl" />
                ))}
              </div>
            ) : filteredQuests.length === 0 ? (
              <EmptyState
                title="Chưa Có Nhiệm Vụ Nào"
                description="Không tìm thấy nhiệm vụ nào phù hợp với yêu cầu. Hãy thiết lập các sứ mệnh stoic mới từ thanh danh mục bên cạnh để rèn luyện thói quen kỷ luật."
                glowColor="cyan"
                size="lg"
                className="bg-transparent border border-dashed border-white/5 py-20 rounded-3xl"
              />
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedQuests.map((quest) => (
                    <QuestCard
                      key={quest.id}
                      quest={quest}
                      onEdit={handleOpenEditModal}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <QuestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        quest={editingQuest}
        habits={habits}
        routines={routines}
        isPending={createQuestMutation.isPending || updateQuestMutation.isPending}
      />
    </div>
  );
}
