'use client';

import type {
  DragEndEvent} from '@dnd-kit/core';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import {
  Plus,
  Zap,
  Check,
  Target,
  TrendingUp,
  Settings,
  Sparkles,
  Trash2,
  Edit3,
  ArrowRight,
  GripVertical,
  Calendar as CalendarIcon,
} from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'sonner';


import { useLanguage, useSound } from '@/contexts';
import { useHabits, useCompleteHabit } from '@/features/habits/hooks/useHabits';
import { Button, Label, EmptyState, Skeleton, Input, Pagination, Calendar } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';

import { useRoutines, useDeleteRoutine, useReorderRoutineHabits } from '../hooks/useRoutines';

import { AddStepModal } from './AddStepModal';
import { RoutineModal } from './RoutineModal';

export const Routines: React.FC = () => {
  const { playSound } = useSound();
  const { data: routines = [], isLoading } = useRoutines();
  const { data: habits = [] } = useHabits();
  const completeHabitMutation = useCompleteHabit();
  const deleteRoutineMutation = useDeleteRoutine();
  const reorderHabitsMutation = useReorderRoutineHabits();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeRoutineForEdit, setActiveRoutineForEdit] = useState<any | null>(null);
  const [activeRoutineForStep, setActiveRoutineForStep] = useState<string | null>(null);
  const [activeStepCount, setActiveStepCount] = useState(0);

  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [isCalendarMode, setIsCalendarMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const formatDateString = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const highlightedDates = React.useMemo(() => {
    const dates = new Set<string>();
    routines.forEach((r) => {
      r.completions?.forEach((cStr: string) => {
        dates.add(cStr.split('T')[0]);
      });
    });
    return Array.from(dates);
  }, [routines]);

  const isTodaySelected = React.useMemo(() => {
    const today = new Date();
    return (
      selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear()
    );
  }, [selectedDate]);

  const completedHabitIds = React.useMemo(() => {
    return new Set(habits.filter((h) => h.isCompletedToday).map((h) => h.id));
  }, [habits]);

  // Keep a local copy of routines to render during drag & drop operations to prevent lag
  const [localRoutines, setLocalRoutines] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (routines.length > 0) {
      // Sort steps for each routine to match their correct order initially
      const sortedRoutines = routines.map((r) => ({
        ...r,
        steps: [...r.steps].sort((a, b) => a.order - b.order),
      }));
      setLocalRoutines(sortedRoutines);
    } else {
      setLocalRoutines([]);
    }
  }, [routines]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Avoid accidental drags when clicking checkboxes
      },
    })
  );

  const filteredRoutines = React.useMemo(() => {
    return localRoutines.filter((r) => {
      const matchesSearch =
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.steps.some((step: any) => step.title.toLowerCase().includes(searchQuery.toLowerCase()));
      if (!matchesSearch) return false;

      if (isCalendarMode) {
        const dateStr = formatDateString(selectedDate);
        const isCompleted = r.completions?.some((c: string) => c.startsWith(dateStr));
        if (isCompleted) return true;

        const dayOfWeek = selectedDate.getDay() === 0 ? 7 : selectedDate.getDay();
        return !r.frequency?.days || r.frequency.days.includes(dayOfWeek);
      }

      return true;
    });
  }, [localRoutines, searchQuery, isCalendarMode, selectedDate]);

  const totalPages = Math.ceil(filteredRoutines.length / itemsPerPage);
  const paginatedRoutines = React.useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRoutines.slice(start, start + itemsPerPage);
  }, [filteredRoutines, currentPage, itemsPerPage]);

  const handleDragEnd = async (routineId: string, event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const routineIndex = localRoutines.findIndex((r) => r.id === routineId);
    if (routineIndex === -1) return;

    const steps = [...localRoutines[routineIndex].steps];
    const oldIndex = steps.findIndex((s) => s.habitId === active.id);
    const newIndex = steps.findIndex((s) => s.habitId === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const reorderedSteps = arrayMove(steps, oldIndex, newIndex);

    // Update orders sequentially
    const updatedSteps = reorderedSteps.map((step, idx) => ({
      ...step,
      order: idx + 1,
    }));

    // Update local state immediately for snappy responsive feel
    const updatedRoutines = [...localRoutines];
    updatedRoutines[routineIndex] = {
      ...updatedRoutines[routineIndex],
      steps: updatedSteps,
    };
    setLocalRoutines(updatedRoutines);

    // Sync with DB
    const ordersPayload = updatedSteps.map((step) => ({
      habitId: step.habitId,
      order: step.order,
    }));

    try {
      playSound('click');
      await reorderHabitsMutation.mutateAsync({
        routineId,
        orders: ordersPayload,
      });
    } catch (err) {
      console.error(err);
      // Rollback to database-synchronized value in case of API failure
      const sortedRoutines = routines.map((r) => ({
        ...r,
        steps: [...r.steps].sort((a, b) => a.order - b.order),
      }));
      setLocalRoutines(sortedRoutines);
      toast.error('Failed to update habit order.');
    }
  };


  const handleStepCheck = async (
    routineId: string,
    habitId: string,
    steps: { habitId: string }[]
  ) => {
    const key = `${routineId}_${habitId}`;
    if (completedHabitIds.has(habitId) || completedSteps[key]) return; // Already completed today

    playSound('success');
    setCompletedSteps((prev) => ({ ...prev, [key]: true }));

    try {
      await completeHabitMutation.mutateAsync(habitId);
    } catch (err) {
      console.error(err);
      // Rollback checkbox
      setCompletedSteps((prev) => ({ ...prev, [key]: false }));
    }
  };

  const getRoutineComboStatus = (routineId: string, steps: { habitId: string }[]) => {
    if (!steps || steps.length === 0) return false;
    const completedCount = steps.filter((step) => {
      const stepKey = `${routineId}_${step.habitId}`;
      return completedHabitIds.has(step.habitId) || !!completedSteps[stepKey];
    }).length;
    return completedCount === steps.length;
  };

  return (
    <div className="h-full flex bg-transparent overflow-hidden text-white font-sans">
      <div className="flex-1 h-full overflow-y-auto scrollbar-hide p-8 pb-32">
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
              Routine Chains
            </Label>

            {/* Flowing Subtitle */}
            <p className="text-sm text-gray-400 font-light leading-relaxed max-w-xl italic">
              "First we shape our routines, then our routines shape us." Organize habits into sequential daily paths.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              onClick={() => {
                playSound('click');
                setIsCalendarMode(!isCalendarMode);
              }}
              className={cn(
                "border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-xs uppercase tracking-wider font-mono p-4 rounded-xl cursor-pointer transition-all duration-300",
                isCalendarMode ? "text-slate-950 bg-forge-cyan border-forge-cyan hover:bg-forge-cyan/90 font-bold" : "text-gray-300 hover:text-white"
              )}
            >
              <CalendarIcon size={14} className="inline mr-2" />
              Calendar
            </Button>

            <Link href="/forge/habits">
              <Button
                variant="ghost"
                onClick={() => playSound('click')}
                className="border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs uppercase tracking-wider font-mono p-4 rounded-xl cursor-pointer"
              >
                Habit Rituals
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
              Establish Chain
            </Button>
          </div>
        </header>

        {/* Quiet Overview stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10 relative z-10">
          {[
            { label: 'Routine Chains', value: routines.length, icon: Target, desc: 'Structured daily pathways' },
            {
              label: 'Combo Completions',
              value: routines.filter((r) => getRoutineComboStatus(r.id, r.steps)).length,
              icon: Sparkles,
              desc: 'Completed ritual paths today',
            },
            {
              label: 'Total Steps Integrated',
              value: routines.reduce((acc, r) => acc + r.steps.length, 0),
              icon: TrendingUp,
              desc: 'Total active habit connections',
            },
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

        {/* Search Input */}
        <div className="mb-6 flex justify-end relative z-10">
          <div className="w-full sm:w-80">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search routines or steps..."
              className="bg-white/5 border border-white/10 text-white rounded-xl placeholder-gray-600 focus:border-white/20 w-full"
            />
          </div>
        </div>

        {/* Grid Content */}
        <div className="relative z-10 flex flex-col gap-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} variant="glowing" className="h-64 rounded-2xl" />
              ))}
            </div>
          ) : paginatedRoutines.length > 0 ? (
            <>
              <div className={cn(
                isCalendarMode
                  ? "grid grid-cols-1 lg:grid-cols-12 gap-8"
                  : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              )}>
                {isCalendarMode && (
                  <div className="lg:col-span-5 h-fit lg:sticky lg:top-8 z-10">
                    <Calendar
                      selectedDate={selectedDate}
                      onDateChange={setSelectedDate}
                      highlightedDates={highlightedDates}
                    />
                  </div>
                )}

                <div className={cn(
                  isCalendarMode ? "lg:col-span-7 flex flex-col gap-6" : "contents"
                )}>
                  {paginatedRoutines.map((routine) => {
                    const isComboComplete = isCalendarMode
                      ? routine.completions?.some((c: string) => c.startsWith(formatDateString(selectedDate)))
                      : getRoutineComboStatus(routine.id, routine.steps);

                    return (
                      <div
                        key={routine.id}
                        className={cn(
                          'group relative rounded-3xl border bg-white/[0.01] backdrop-blur-md p-6 transition-all duration-700 flex flex-col justify-between overflow-hidden shadow-lg min-h-[250px]',
                          isComboComplete
                            ? 'border-forge-cyan/30 bg-forge-cyan/[0.01] shadow-[0_0_30px_rgba(34,211,238,0.05)]'
                            : 'border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                        )}
                      >
                        {/* Glow backlight inside completed combos */}
                        {isComboComplete && (
                          <div className="absolute inset-0 bg-radial from-forge-cyan/5 to-transparent pointer-events-none opacity-40 animate-pulse" />
                        )}

                        <div className="space-y-4 relative z-10">
                          {/* Bottom status */}
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
                              Ritual Chain
                            </span>
                            <div className="flex items-center gap-1.5 text-[10px] font-mono text-forge-cyan">
                              {isComboComplete ? (
                                <span className="text-forge-cyan font-bold flex items-center gap-0.5">
                                  <Check size={11} className="inline mr-0.5" /> Completed
                                </span>
                              ) : (
                                <>
                                  <Zap size={11} /> Active
                                </>
                              )}
                            </div>
                          </div>

                          {/* Header info */}
                          <div className="flex justify-between items-start gap-4">
                            <div className="space-y-1">
                              <Label
                                variant="default"
                                className="text-lg font-medium text-gray-200 group-hover:text-white transition-colors duration-500 block"
                              >
                                {routine.title}
                              </Label>
                              {(routine.targetTime || routine.frequency?.days) && (
                                <div className="flex flex-wrap gap-1.5 items-center text-[10px] text-gray-500 font-mono">
                                  {routine.targetTime && (
                                    <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5 text-forge-cyan">
                                      {routine.targetTime}
                                    </span>
                                  )}
                                  {routine.frequency?.days && routine.frequency.days.length < 7 && (
                                    <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5">
                                      {routine.frequency.days.map((d: number) => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][d - 1]).join(', ')}
                                    </span>
                                  )}
                                  {routine.frequency?.days && routine.frequency.days.length === 7 && (
                                    <span className="bg-white/5 px-2 py-0.5 rounded border border-white/5">
                                      Everyday
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                            {isTodaySelected && (
                              <div className="flex items-center gap-1.5 shrink-0">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    playSound('click');
                                    setActiveRoutineForEdit(routine);
                                    setShowEditModal(true);
                                  }}
                                  className="p-1.5 rounded-lg border border-white/5 hover:border-white/20 text-gray-500 hover:text-white hover:bg-white/5 transition-all cursor-pointer h-7 w-7"
                                  title="Edit routine title"
                                >
                                  <Edit3 size={12} />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    playSound('click');
                                    setActiveRoutineForStep(routine.id);
                                    setActiveStepCount(routine.steps.length);
                                  }}
                                  className="p-1.5 rounded-lg border border-white/5 hover:border-white/20 text-gray-500 hover:text-white hover:bg-white/5 transition-all cursor-pointer h-7 w-7"
                                  title="Add step habit"
                                >
                                  <Settings size={12} />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    playSound('click');
                                    toast('Delete this routine chain?', {
                                      action: {
                                        label: 'Confirm',
                                        onClick: () => {
                                          deleteRoutineMutation.mutate(routine.id);
                                        },
                                      },
                                    });
                                  }}
                                  className="p-1.5 rounded-lg border border-white/5 hover:border-red-500/20 text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all cursor-pointer h-7 w-7"
                                  title="Delete routine chain"
                                >
                                  <Trash2 size={12} />
                                </Button>
                              </div>
                            )}
                          </div>


                          {/* Steps listing */}
                          <div className="pt-3 border-t border-white/5">
                            {routine.steps.length > 0 ? (
                              <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={(event) => handleDragEnd(routine.id, event)}
                              >
                                <SortableContext
                                  items={routine.steps.map((s: any) => s.habitId)}
                                  strategy={verticalListSortingStrategy}
                                >
                                  <div className="space-y-3">
                                    {routine.steps.map((step: any, idx: number) => {
                                      const stepKey = `${routine.id}_${step.habitId}`;
                                      const isChecked = isTodaySelected
                                        ? (completedHabitIds.has(step.habitId) || !!completedSteps[stepKey])
                                        : isComboComplete;

                                      return (
                                        <SortableStepItem
                                          key={step.habitId}
                                          step={step}
                                          idx={idx}
                                          routineId={routine.id}
                                          isChecked={isChecked}
                                          disabled={!isTodaySelected}
                                          onCheck={() =>
                                            handleStepCheck(
                                              routine.id,
                                              step.habitId,
                                              routine.steps
                                            )
                                          }
                                        />
                                      );
                                    })}
                                  </div>
                                </SortableContext>
                              </DndContext>
                            ) : (
                              <p className="text-[10px] text-gray-600 italic py-2 text-center">
                                No integrated steps yet. Click the cog above to configure rituals.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          ) : (
            // Serene Empty state
            <EmptyState
              title={searchQuery ? "Không Tìm Thấy Chuỗi Nào" : "Chưa Có Chuỗi Hằng Ngày Nào"}
              description={searchQuery ? "Hãy thử thay đổi từ khóa tìm kiếm." : "Chuỗi quy trình cho phép bạn thực hiện nhiều thói quen liên quan một cách tuần tự để nhận được phần thưởng Combo XP cực lớn."}
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
                Establish Routine
              </Button>
            </EmptyState>
          )}
        </div>
      </div>

      <RoutineModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
      <RoutineModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setActiveRoutineForEdit(null);
        }}
        routine={activeRoutineForEdit}
      />

      {activeRoutineForStep && (
        <AddStepModal
          isOpen={!!activeRoutineForStep}
          onClose={() => setActiveRoutineForStep(null)}
          routineId={activeRoutineForStep}
          existingStepCount={activeStepCount}
        />
      )}
    </div>
  );
};

interface SortableStepItemProps {
  step: any;
  idx: number;
  routineId: string;
  isChecked: boolean;
  disabled?: boolean;
  onCheck: () => void;
}

const SortableStepItem: React.FC<SortableStepItemProps> = ({
  step,
  idx,
  routineId,
  isChecked,
  disabled = false,
  onCheck,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: step.habitId,
    disabled: isChecked || disabled,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-center justify-between p-2.5 rounded-xl border border-transparent select-none group/step transition-all duration-200',
        isChecked
          ? 'bg-forge-cyan/5 border-forge-cyan/10 text-forge-cyan opacity-60'
          : isDragging
            ? 'bg-white/10 border-white/20 shadow-[0_5px_15px_rgba(0,0,0,0.3)] scale-[1.02]'
            : 'bg-white/[0.01] hover:bg-white/5'
      )}
    >
      <div className="flex items-center gap-3 w-full">
        {!isChecked && !disabled ? (
          <div
            {...attributes}
            {...listeners}
            className="p-1 -ml-1 rounded hover:bg-white/10 cursor-grab active:cursor-grabbing text-gray-600 hover:text-gray-300 shrink-0 transition-colors"
          >
            <GripVertical size={12} />
          </div>
        ) : (
          <div className="w-5 shrink-0" />
        )}
        <div
          onClick={() => !disabled && onCheck()}
          className={cn(
            'w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0',
            isChecked
              ? 'bg-forge-cyan border-forge-cyan shadow-[0_0_10px_rgba(34,211,238,0.3)]'
              : disabled
                ? 'border-gray-800 cursor-not-allowed'
                : 'border-gray-700 hover:border-forge-cyan/50 cursor-pointer'
          )}
        >
          {isChecked && <Check size={11} className="text-slate-950 font-bold" />}
        </div>
        <span
          onClick={() => !isChecked && !disabled && onCheck()}
          className={cn(
            'text-xs transition-all duration-300 font-light flex-1 select-none',
            isChecked
              ? 'line-through opacity-70 cursor-default'
              : disabled
                ? 'text-gray-500 cursor-not-allowed'
                : 'text-gray-300 hover:text-white cursor-pointer'
          )}
        >
          {step.title}
        </span>
      </div>
      <span className="text-[9px] font-mono text-gray-500 shrink-0 select-none">
        Step {step.order || idx + 1}
      </span>
    </div>
  );
};

