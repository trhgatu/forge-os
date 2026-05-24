'use client';

import {
  Clock,
  Plus,
  Zap,
  Check,
  X,
  Target,
  Flame,
  ChevronRight,
  TrendingUp,
  Settings,
  Sparkles,
} from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { useLanguage, useSound } from '@/contexts';
import { useHabits, useCompleteHabit } from '@/features/habits/hooks/useHabits';
import { Button, Dropdown, Input } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';

import { useRoutines, useCreateRoutine, useAddHabitToRoutine } from '../hooks/useRoutines';

interface CreateRoutineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateRoutineModal: React.FC<CreateRoutineModalProps> = ({ isOpen, onClose }) => {
  const { playSound } = useSound();
  const createRoutineMutation = useCreateRoutine();

  const [title, setTitle] = useState('');
  const [comboXp, setComboXp] = useState('50');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Title is required to initialize a routine chain');
      return;
    }

    try {
      await createRoutineMutation.mutateAsync({
        title,
        comboXp: parseInt(comboXp) || 50,
      });
      playSound('success');
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-500"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md overflow-visible rounded-3xl border border-white/10 bg-[#09090b] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-all"
        >
          <X size={18} />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-forge-cyan uppercase tracking-widest mb-2">
            <Clock size={14} /> Initialize Routine Chain
          </div>
          <h2 className="text-2xl font-display font-bold text-white tracking-tight">
            Establish Combo Routine
          </h2>
          <p className="text-xs text-gray-500 mt-1 italic">
            "Order is the foundation upon which focus thrives."
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
              Routine Title
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Morning Focus, Evening Wind-Down..."
              className="bg-white/5 border-white/10 text-white rounded-xl placeholder-gray-600 focus:border-white/20"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
              Combo Completion XP
            </label>
            <Input
              type="number"
              value={comboXp}
              onChange={(e) => setComboXp(e.target.value)}
              placeholder="e.g. 50, 100, 150..."
              className="bg-white/5 border-white/10 text-white rounded-xl placeholder-gray-600 focus:border-white/20"
            />
          </div>

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
              disabled={createRoutineMutation.isPending}
              className="rounded-xl bg-white text-black hover:bg-white/90 disabled:opacity-50"
            >
              {createRoutineMutation.isPending ? 'Establishing...' : 'Establish Chain'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface AddStepModalProps {
  isOpen: boolean;
  onClose: () => void;
  routineId: string;
  existingStepCount: number;
}

const AddStepModal: React.FC<AddStepModalProps> = ({
  isOpen,
  onClose,
  routineId,
  existingStepCount,
}) => {
  const { playSound } = useSound();
  const { data: habits = [] } = useHabits();
  const addStepMutation = useAddHabitToRoutine();

  const [selectedHabitId, setSelectedHabitId] = useState('');
  const [order, setOrder] = useState(String(existingStepCount + 1));

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHabitId) {
      toast.error('Please choose a habit to append as a ritual step');
      return;
    }

    try {
      await addStepMutation.mutateAsync({
        routineId,
        habitId: selectedHabitId,
        order: parseInt(order) || 1,
      });
      playSound('success');
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const habitOptions = habits.map((h) => ({
    value: h.id,
    label: h.title,
    description: `${h.difficulty} Difficulty // Quest Linked`,
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-500"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md overflow-visible rounded-3xl border border-white/10 bg-[#09090b] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-all"
        >
          <X size={18} />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-forge-cyan uppercase tracking-widest mb-2">
            <Plus size={14} /> Append Ritual Step
          </div>
          <h2 className="text-2xl font-display font-bold text-white tracking-tight">
            Integrate Habit Step
          </h2>
          <p className="text-xs text-gray-500 mt-1 italic">
            Associate active disciplines to construct this routine chain.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2 relative">
            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
              Select Target Habit
            </label>
            {habitOptions.length > 0 ? (
              <Dropdown
                value={selectedHabitId}
                onChange={(val) => {
                  playSound('click');
                  setSelectedHabitId(val);
                }}
                options={habitOptions}
                placeholder="Choose established habit..."
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl"
              />
            ) : (
              <p className="text-xs text-red-400 italic">
                No active habits established yet. Go to Habits page to establish one first.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
              Step Execution Order
            </label>
            <Input
              type="number"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              placeholder="e.g. 1, 2, 3..."
              className="bg-white/5 border-white/10 text-white rounded-xl placeholder-gray-600 focus:border-white/20"
            />
          </div>

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
              disabled={addStepMutation.isPending || !selectedHabitId}
              className="rounded-xl bg-white text-black hover:bg-white/90 disabled:opacity-50"
            >
              {addStepMutation.isPending ? 'Integrating...' : 'Integrate Step'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const Routines: React.FC = () => {
  const { playSound } = useSound();
  const { data: routines = [], isLoading } = useRoutines();
  const completeHabitMutation = useCompleteHabit();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeRoutineForStep, setActiveRoutineForStep] = useState<string | null>(null);
  const [activeStepCount, setActiveStepCount] = useState(0);

  // Track completed steps locally per session to display beautiful glowing checkmarks
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const handleStepCheck = async (routineId: string, habitId: string, comboXp: number, stepsLength: number) => {
    const key = `${routineId}_${habitId}`;
    if (completedSteps[key]) return; // Already checked this session

    playSound('success');
    setCompletedSteps((prev) => ({ ...prev, [key]: true }));

    try {
      await completeHabitMutation.mutateAsync(habitId);

      // Check if this was the last remaining step of the routine
      const routineStepsKeys = Object.keys(completedSteps).filter((k) => k.startsWith(`${routineId}_`));
      const newlyCompletedCount = routineStepsKeys.length + 1;

      if (newlyCompletedCount === stepsLength) {
        // Combo success!
        playSound('success');
        toast.success(`Ritual Combo Completed! +${comboXp} XP combo bonus unlocked!`, {
          icon: <Sparkles className="text-yellow-400" />,
        });
      }
    } catch (err) {
      console.error(err);
      // Rollback checkbox
      setCompletedSteps((prev) => ({ ...prev, [key]: false }));
    }
  };

  const getRoutineComboStatus = (routineId: string, stepsLength: number) => {
    if (stepsLength === 0) return false;
    const completedCount = Object.keys(completedSteps).filter(
      (k) => k.startsWith(`${routineId}_`) && completedSteps[k]
    ).length;
    return completedCount === stepsLength;
  };

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
              Routine Chains
            </h1>
            <p className="text-xs text-gray-500 mt-2 font-light max-w-xl leading-relaxed italic">
              "First we shape our routines, then our routines shape us." Organize habits into sequential daily paths.
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
            Establish Chain
          </button>
        </header>

        {/* Quiet Overview stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10 relative z-10">
          {[
            { label: 'Routine Chains', value: routines.length, icon: Target, desc: 'Structured daily pathways' },
            {
              label: 'Combo Completions',
              value: routines.filter((r) => getRoutineComboStatus(r.id, r.steps.length)).length,
              icon: Sparkles,
              desc: 'Completed ritual paths today',
            },
            {
              label: 'Accrued Bonus Potential',
              value: `${routines.reduce((acc, r) => acc + r.comboXp, 0)} XP`,
              icon: TrendingUp,
              desc: 'Combo completion bonuses',
            },
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

        {/* Grid Content */}
        <div className="relative z-10">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 bg-white/[0.02] border border-white/5 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : routines.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {routines.map((routine) => {
                const isComboComplete = getRoutineComboStatus(routine.id, routine.steps.length);

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
                      {/* Top status */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
                          Ritual Chain
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-forge-cyan">
                          <Zap size={11} /> +{routine.comboXp} XP Combo
                        </div>
                      </div>

                      {/* Header info */}
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="text-lg font-display font-medium text-gray-200 group-hover:text-white transition-colors duration-500">
                          {routine.title}
                        </h3>
                        <button
                          onClick={() => {
                            playSound('click');
                            setActiveRoutineForStep(routine.id);
                            setActiveStepCount(routine.steps.length);
                          }}
                          className="p-1.5 rounded-lg border border-white/5 hover:border-white/20 text-gray-500 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                          title="Add step habit"
                        >
                          <Settings size={12} />
                        </button>
                      </div>

                      {/* Steps listing */}
                      <div className="space-y-3 pt-3 border-t border-white/5">
                        {routine.steps.length > 0 ? (
                          routine.steps
                            .sort((a, b) => a.order - b.order)
                            .map((step, idx) => {
                              const stepKey = `${routine.id}_${step.habitId}`;
                              const isChecked = !!completedSteps[stepKey];

                              return (
                                <div
                                  key={step.habitId}
                                  onClick={() =>
                                    handleStepCheck(
                                      routine.id,
                                      step.habitId,
                                      routine.comboXp,
                                      routine.steps.length
                                    )
                                  }
                                  className={cn(
                                    'flex items-center justify-between p-2.5 rounded-xl border border-transparent transition-all duration-300 cursor-pointer select-none group/step',
                                    isChecked
                                      ? 'bg-forge-cyan/5 border-forge-cyan/10 text-forge-cyan'
                                      : 'hover:bg-white/5'
                                  )}
                                >
                                  <div className="flex items-center gap-3">
                                    <div
                                      className={cn(
                                        'w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300',
                                        isChecked
                                          ? 'bg-forge-cyan border-forge-cyan shadow-[0_0_10px_rgba(34,211,238,0.3)]'
                                          : 'border-gray-700 group-hover/step:border-forge-cyan/50'
                                      )}
                                    >
                                      {isChecked && <Check size={11} className="text-slate-950 font-bold" />}
                                    </div>
                                    <span
                                      className={cn(
                                        'text-xs transition-all duration-300 font-light',
                                        isChecked
                                          ? 'line-through opacity-70'
                                          : 'text-gray-300 group-hover/step:text-white'
                                      )}
                                    >
                                      {step.title}
                                    </span>
                                  </div>
                                  <span className="text-[9px] font-mono text-gray-500">
                                    Step {step.order || idx + 1}
                                  </span>
                                </div>
                              );
                            })
                        ) : (
                          <p className="text-[10px] text-gray-600 italic py-2 text-center">
                            No integrated steps yet. Click the cog above to configure rituals.
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Bottom combo complete check banner */}
                    {isComboComplete && (
                      <div className="mt-4 pt-3 border-t border-forge-cyan/20 flex items-center gap-1.5 text-xs text-forge-cyan font-mono font-bold animate-in slide-in-from-bottom-2 duration-500 relative z-10">
                        <Sparkles size={13} className="text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
                        <span>Combo Ritual Complete!</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            // Serene Empty state
            <div className="flex flex-col items-center justify-center py-28 border border-dashed border-white/5 rounded-3xl bg-white/[0.01] backdrop-blur-md">
              <Clock size={48} className="text-white/20 mb-4 animate-pulse" />
              <h3 className="text-lg font-display font-semibold text-white mb-2">No Routine Chains Established</h3>
              <p className="text-xs text-gray-500 max-w-sm text-center leading-relaxed mb-6 font-light">
                Routine chains allow you to execute multiple related thói quen sequentially to gain large Combo XP bonuses.
              </p>
              <button
                onClick={() => {
                  playSound('click');
                  setShowCreateModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-forge-cyan/20 bg-forge-cyan/5 text-forge-cyan hover:bg-forge-cyan/10 transition-all text-xs font-mono font-semibold tracking-wider uppercase"
              >
                Establish Routine
              </button>
            </div>
          )}
        </div>
      </div>

      <CreateRoutineModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />

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
