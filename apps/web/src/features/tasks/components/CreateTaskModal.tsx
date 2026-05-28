'use client';

import { ListTodo, X, Zap } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { useSound } from '@/contexts';
import { Button, Dropdown, Input } from '@/shared/components/ui';

import { useCreateTask } from '../hooks/useTasks';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ isOpen, onClose }) => {
  const { playSound } = useSound();
  const createTaskMutation = useCreateTask();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  if (!isOpen) return null;

  const handlePriorityChange = (val: string) => {
    playSound('click');
    setPriority(val as 'low' | 'medium' | 'high');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Title is required to issue an action');
      return;
    }

    try {
      await createTaskMutation.mutateAsync({
        title,
        description: description || undefined,
        priority,
        xpReward: 0,
      });
      playSound('success');
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const priorityOptions = [
    { value: 'low', label: 'Low', description: 'Routine maintenance actions' },
    { value: 'medium', label: 'Medium', description: 'Deliberate development items' },
    { value: 'high', label: 'High', description: 'Critical architectural shifts' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-500"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg overflow-visible rounded-3xl border border-white/10 bg-[#09090b] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-all"
        >
          <X size={18} />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-forge-cyan uppercase tracking-widest mb-2">
            <ListTodo size={14} /> Forge New Action
          </div>
          <h2 className="text-2xl font-display font-bold text-white tracking-tight">
            Design Action Core
          </h2>
          <p className="text-xs text-gray-500 mt-1 italic font-light">
            "An action is the real fruit of knowledge." — Stoic maxim
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
              Action Title
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Implement refresh tokens, Refactor styles..."
              className="bg-white/5 border-white/10 text-white rounded-xl placeholder-gray-600 focus:border-white/20"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
              Detailed Scope
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Outline the parameters of this specific architectural action..."
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/20 transition-all placeholder-gray-600"
            />
          </div>

          {/* Priority */}
          <div className="space-y-2 relative">
            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
              Execution Urgency
            </label>
            <Dropdown
              value={priority}
              onChange={handlePriorityChange}
              options={priorityOptions}
              className="w-full bg-white/5 border border-white/10 text-white rounded-xl"
            />
          </div>

          {/* Quest Contribution Indicator */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-forge-cyan animate-pulse" />
              <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">
                Quest Contribution
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold text-forge-cyan uppercase tracking-widest bg-forge-cyan/10 px-2.5 py-1 rounded-full border border-forge-cyan/25">
              Active
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
              Dissolve
            </Button>
            <Button
              type="submit"
              disabled={createTaskMutation.isPending}
              className="rounded-xl bg-white text-black hover:bg-white/90 disabled:opacity-50"
            >
              {createTaskMutation.isPending ? 'Forging...' : 'Forge Action'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
