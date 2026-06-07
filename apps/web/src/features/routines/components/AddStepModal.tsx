'use client';

import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { useSound } from '@/contexts';
import { useHabits } from '@/features/habits/hooks/useHabits';
import { Button, Dropdown, Input, Label, Modal } from '@/shared/components/ui';

import { useAddHabitToRoutine } from '../hooks/useRoutines';

interface AddStepModalProps {
  isOpen: boolean;
  onClose: () => void;
  routineId: string;
  existingStepCount: number;
}

export const AddStepModal: React.FC<AddStepModalProps> = ({
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

  const modalTitle = (
    <div className="text-left">
      <div className="mb-2 flex items-center gap-2 opacity-85">
        <div className="h-px w-8 bg-gradient-to-r from-forge-cyan/40 to-transparent" />
        <Label variant="cyan" className="text-[10px] font-mono tracking-[0.4em] uppercase flex items-center gap-1.5">
          Append Ritual Step
        </Label>
      </div>
      <Label variant="default" className="text-2xl font-bold tracking-tight block">
        Integrate Habit Step
      </Label>
      <p className="text-xs text-gray-500 mt-1 italic normal-case font-sans font-light">
        Associate active disciplines to construct this routine chain.
      </p>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6 text-left">
        <div className="space-y-2 relative">
          <Label variant="dim" className="text-[10px] font-mono uppercase tracking-widest block">
            Select Target Habit
          </Label>
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
          <Label variant="dim" className="text-[10px] font-mono uppercase tracking-widest block">
            Step Execution Order
          </Label>
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
    </Modal>
  );
};
