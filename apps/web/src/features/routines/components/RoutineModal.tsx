'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { useSound } from '@/contexts';
import { Button, Label, Input, Modal } from '@/shared/components/ui';
import { useCreateRoutine, useUpdateRoutine } from '../hooks/useRoutines';

interface Routine {
  id: string;
  title: string;
  comboXp: number;
}

interface RoutineModalProps {
  isOpen: boolean;
  onClose: () => void;
  routine?: Routine | null;
}

export const RoutineModal: React.FC<RoutineModalProps> = ({ isOpen, onClose, routine }) => {
  const { playSound } = useSound();
  const createRoutineMutation = useCreateRoutine();
  const updateRoutineMutation = useUpdateRoutine();

  const isEditMode = !!routine;

  const [title, setTitle] = useState('');

  // Khởi tạo state khi modal mở
  useEffect(() => {
    if (isOpen) {
      if (routine) {
        setTitle(routine.title);
      } else {
        setTitle('');
      }
    }
  }, [routine, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error(isEditMode ? 'Title is required to update a routine chain' : 'Title is required to initialize a routine chain');
      return;
    }

    try {
      if (isEditMode && routine) {
        await updateRoutineMutation.mutateAsync({
          id: routine.id,
          data: { title },
        });
      } else {
        await createRoutineMutation.mutateAsync({
          title,
          comboXp: 50, // Default combo XP
        });
      }
      playSound('success');
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const modalTitle = (
    <div className="text-left">
      <div className="mb-2 flex items-center gap-2 opacity-85">
        <div className="h-px w-8 bg-gradient-to-r from-forge-cyan/40 to-transparent" />
        <Label variant="cyan" className="text-[10px] font-mono tracking-[0.4em] uppercase flex items-center gap-1.5">
          {isEditMode ? 'Modify Routine Chain' : 'Initialize Routine Chain'}
        </Label>
      </div>
      <Label variant="default" className="text-2xl font-bold tracking-tight block">
        {isEditMode ? 'Update Combo Routine' : 'Establish Combo Routine'}
      </Label>
      <p className="text-xs text-gray-500 mt-1 italic normal-case font-sans font-light">
        {isEditMode
          ? 'Modify the label of this sequential daily discipline path.'
          : '"Order is the foundation upon which focus thrives."'}
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
        <div className="space-y-2">
          <Label variant="dim" className="text-[10px] font-mono uppercase tracking-widest block">
            Routine Title
          </Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Morning Focus, Evening Wind-Down..."
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
            disabled={isEditMode ? updateRoutineMutation.isPending : createRoutineMutation.isPending}
            className="rounded-xl bg-white text-black hover:bg-white/90 disabled:opacity-50"
          >
            {isEditMode
              ? (updateRoutineMutation.isPending ? 'Updating...' : 'Update Chain')
              : (createRoutineMutation.isPending ? 'Establishing...' : 'Establish Chain')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
