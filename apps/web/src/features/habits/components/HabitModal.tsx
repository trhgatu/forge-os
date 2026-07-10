'use client';

import { Zap } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { useSound } from '@/contexts';
import { Button, Dropdown, Input, Label, Modal } from '@/shared/components/ui';

import { useCreateHabit, useUpdateHabit, useAutomatableActions } from '../hooks/useHabits';

interface Habit {
  id: string;
  title: string;
  description: string | null;
  difficulty: string;
  xpReward: number;
  actionType?: string | null;
}

interface HabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  habit?: Habit | null;
}

export const HabitModal: React.FC<HabitModalProps> = ({ isOpen, onClose, habit }) => {
  const { data: automatableActions = [] } = useAutomatableActions();
  const { playSound } = useSound();
  const createHabitMutation = useCreateHabit();
  const updateHabitMutation = useUpdateHabit();

  const isEditMode = !!habit;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [actionType, setActionType] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (habit) {
        setTitle(habit.title);
        setDescription(habit.description || '');
        setDifficulty((habit.difficulty.toLowerCase() as any) || 'easy');
        setActionType(habit.actionType || '');
      } else {
        setTitle('');
        setDescription('');
        setDifficulty('easy');
        setActionType('');
      }
    }
  }, [habit, isOpen]);

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
      toast.error(isEditMode ? 'Title is required to update a ritual' : 'Title is required to establish a ritual');
      return;
    }

    try {
      if (isEditMode && habit) {
        await updateHabitMutation.mutateAsync({
          id: habit.id,
          data: {
            title,
            description: description || undefined,
            difficulty,
            xpReward: getXpReward(),
            actionType: actionType || undefined,
          },
        });
      } else {
        await createHabitMutation.mutateAsync({
          title,
          description: description || undefined,
          difficulty,
          xpReward: getXpReward(),
          frequency: { type: 'daily' },
          actionType: actionType || undefined,
        });
      }
      playSound('success');
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const difficultyOptions = [
    { value: 'easy', label: 'Easy', description: 'Trivial everyday action' },
    { value: 'medium', label: 'Medium', description: 'Requires deliberate effort' },
    { value: 'hard', label: 'Hard', description: 'Demands deep focus and discipline' },
  ];

  const modalTitle = (
    <div className="text-left">
      <div className="mb-2 flex items-center gap-2 opacity-85">
        <div className="h-px w-8 bg-gradient-to-r from-forge-cyan/40 to-transparent" />
        <Label variant="cyan" className="text-[10px] font-mono tracking-[0.4em] uppercase flex items-center gap-1.5">
          {isEditMode ? 'Modify Active Ritual' : 'Establish New Ritual'}
        </Label>
      </div>
      <Label variant="default" className="text-2xl font-bold tracking-tight block">
        {isEditMode ? 'Update Habit Ritual' : 'Define Habit Profile'}
      </Label>
      <p className="text-xs text-gray-500 mt-1 italic normal-case font-sans font-light">
        {isEditMode
          ? 'Adjust intent and difficulty metrics for this discipline path.'
          : '"Rituals are the silent architecture of personal sovereignty."'}
      </p>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6 text-left">
        {/* Title input */}
        <div className="space-y-2">
          <Label variant="dim" className="text-[10px] font-mono uppercase tracking-widest block">
            Ritual Title
          </Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Read Philosophy, Wake Up at 5 AM..."
            className="bg-white/5 border-white/10 text-white rounded-xl placeholder-gray-600 focus:border-white/20"
          />
        </div>

        {/* Description input */}
        <div className="space-y-2">
          <Label variant="dim" className="text-[10px] font-mono uppercase tracking-widest block">
            Description / Intent
          </Label>
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
          <Label variant="dim" className="text-[10px] font-mono uppercase tracking-widest block">
            Discipline Difficulty
          </Label>
          <Dropdown
            value={difficulty}
            onChange={handleDifficultyChange}
            options={difficultyOptions}
            className="w-full bg-white/5 border border-white/10 text-white rounded-xl"
          />
        </div>
        <div className="space-y-2 relative">
          <Label variant="dim" className="text-[10px] font-mono uppercase tracking-widest block">
            Auto-Complete Connection (Optional)
          </Label>
          <Dropdown
            value={actionType}
            onChange={(val) => {
              playSound('click');
              setActionType(val);
            }}
            options={[
              { value: '', label: 'Manual Completion Only', sublabel: 'Requires manually checking the checkbox' },
              ...automatableActions.map((act) => ({
                value: act.type,
                label: act.label,
                sublabel: act.sublabel,
              })),
            ]}
            className="w-full bg-white/5 border border-white/10 text-white rounded-xl"
          />
        </div>

        {/* Ritual Impact Preview */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-forge-cyan" />
            <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">
              Ritual Impact
            </span>
          </div>
          <span className="text-sm font-mono font-bold text-forge-cyan">
            +Discipline Attribute
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
            disabled={isEditMode ? updateHabitMutation.isPending : createHabitMutation.isPending}
            className="rounded-xl bg-white text-black hover:bg-white/90 disabled:opacity-50"
          >
            {isEditMode
              ? (updateHabitMutation.isPending ? 'Updating...' : 'Update Ritual')
              : (createHabitMutation.isPending ? 'Establishing...' : 'Establish Ritual')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
