'use client';

import { X, Plus } from 'lucide-react';
import React, { useState, useEffect } from 'react';

import { useSound } from '@/contexts';
import type { Habit } from '@/features/gamification/types';
import { Button, Dropdown, Input, Label } from '@/shared/components/ui';

import type { Quest } from '../types';

interface ObjectiveFormInput {
  id?: string;
  type: string;
  targetCount: number;
  referenceType: string;
  referenceId: string;
}

interface Routine {
  id: string;
  title: string;
  comboXp: number;
}

interface QuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description: string;
    type: string;
    xpReward: number;
    objectives: Array<{
      id?: string;
      type: string;
      targetCount: number;
      referenceType: string;
      referenceId: string | null;
    }>;
  }) => Promise<void>;
  quest: Quest | null;
  habits: Habit[];
  routines: Routine[];
  isPending: boolean;
}

export function QuestModal({
  isOpen,
  onClose,
  onSubmit,
  quest,
  habits,
  routines,
  isPending,
}: QuestModalProps) {
  const { playSound } = useSound();

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('daily');
  const [xpReward, setXpReward] = useState(20);
  const [objectives, setObjectives] = useState<ObjectiveFormInput[]>([
    { type: 'CHECK_HABIT', targetCount: 1, referenceType: 'Habit', referenceId: '' },
  ]);

  // Dropdown Options
  const questTypeOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'main', label: 'Main Quest' },
    { value: 'side', label: 'Side Quest' },
  ];

  const objectiveTypeOptions = [
    { value: 'CHECK_HABIT', label: 'Check Habit', sublabel: 'Complete a daily habit' },
    { value: 'COMPLETE_ROUTINE', label: 'Complete Routine', sublabel: 'Execute a routine chain' },
    { value: 'CREATE_JOURNAL', label: 'Write Journal', sublabel: 'Reflect on your day' },
    { value: 'CREATE_MEMORY', label: 'Log Memory', sublabel: 'Log an important memory node' },
    { value: 'LOG_TRANSACTION', label: 'Log Wealth Transaction', sublabel: 'Track your wealth flow' },
    { value: 'CREATE_REFLECTION', label: 'Create Wealth Reflection', sublabel: 'Review financial alignment' },
  ];

  const habitOptions = [
    { value: '', label: 'Select Habit (Global)...' },
    ...habits.map((h) => ({
      value: h.id,
      label: h.title,
      sublabel: `Difficulty: ${h.difficulty} | Quest Linked`,
    })),
  ];

  const routineOptions = [
    { value: '', label: 'Select Routine (Global)...' },
    ...routines.map((r) => ({
      value: r.id,
      label: r.title,
      sublabel: `Combo XP: ${r.comboXp} | Quest Linked`,
    })),
  ];

  // Sync state with selected editing quest
  useEffect(() => {
    if (quest) {
      setTitle(quest.title);
      setDescription(quest.description || '');
      setType(quest.type);
      setXpReward(quest.xpReward);

      const mapped = quest.objectives.map((o) => ({
        id: o.id,
        type: o.type,
        targetCount: o.targetCount,
        referenceType: o.referenceType,
        referenceId: o.referenceId || '',
      }));
      setObjectives(
        mapped.length > 0
          ? mapped
          : [{ type: 'CHECK_HABIT', targetCount: 1, referenceType: 'Habit', referenceId: '' }],
      );
    } else {
      setTitle('');
      setDescription('');
      setType('daily');
      setXpReward(20);
      setObjectives([
        { type: 'CHECK_HABIT', targetCount: 1, referenceType: 'Habit', referenceId: '' },
      ]);
    }
  }, [quest, isOpen]);

  if (!isOpen) return null;

  const handleAddObjectiveField = () => {
    playSound('click');
    setObjectives([
      ...objectives,
      { type: 'CHECK_HABIT', targetCount: 1, referenceType: 'Habit', referenceId: '' },
    ]);
  };

  const handleRemoveObjectiveField = (index: number) => {
    playSound('click');
    const updated = [...objectives];
    updated.splice(index, 1);
    setObjectives(updated);
  };

  const handleObjectiveChange = (index: number, field: keyof ObjectiveFormInput, value: any) => {
    const updated = [...objectives];

    if (field === 'type') {
      updated[index].type = value;
      if (value === 'CREATE_JOURNAL') {
        updated[index].referenceType = 'Journal';
        updated[index].referenceId = '';
      } else if (value === 'CHECK_HABIT') {
        updated[index].referenceType = 'Habit';
        updated[index].referenceId = '';
      } else if (value === 'CREATE_MEMORY') {
        updated[index].referenceType = 'Memory';
        updated[index].referenceId = '';
      } else if (value === 'COMPLETE_ROUTINE') {
        updated[index].referenceType = 'Routine';
        updated[index].referenceId = '';
      } else if (value === 'LOG_TRANSACTION') {
        updated[index].referenceType = 'Wealth';
        updated[index].referenceId = '';
      } else if (value === 'CREATE_REFLECTION') {
        updated[index].referenceType = 'WealthReflection';
        updated[index].referenceId = '';
      }
    } else {
      updated[index][field] = value as never;
    }

    setObjectives(updated);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playSound('click');

    const cleanObjectives = objectives.map((o) => ({
      id: o.id,
      type: o.type,
      targetCount: o.targetCount,
      referenceType: o.referenceType,
      referenceId: o.referenceId ? o.referenceId : null,
    }));

    await onSubmit({
      title,
      description,
      type,
      xpReward,
      objectives: cleanObjectives,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-xl rounded-2xl bg-[#09090b] border border-white/10 overflow-visible shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between p-5 border-b border-white/5 bg-white/[0.01]">
          <Label variant="cyan" className="text-lg font-semibold block">
            {quest ? 'Configure Quest Profile' : 'Initialize New Quest'}
          </Label>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer h-8 w-8"
          >
            <X size={18} />
          </Button>
        </div>

        <form onSubmit={handleFormSubmit} className="p-5 space-y-4">
          <div>
            <Label variant="dim" className="block text-xs font-mono uppercase tracking-wider mb-1.5">
              Title
            </Label>
            <Input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g., Morning Stoic Review"
            />
          </div>

          <div>
            <Label variant="dim" className="block text-xs font-mono uppercase tracking-wider mb-1.5">
              Description
            </Label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-gray-500 h-20 resize-none"
              placeholder="Describe details of the quest..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label variant="dim" className="block text-xs font-mono uppercase tracking-wider mb-1.5">
                Quest Type
              </Label>
              <Dropdown
                options={questTypeOptions}
                value={type}
                onChange={setType}
              />
            </div>

            <div>
              <Label variant="dim" className="block text-xs font-mono uppercase tracking-wider mb-1.5">
                XP Reward
              </Label>
              <Input
                type="number"
                required
                value={xpReward}
                onChange={(e) => setXpReward(Number(e.target.value))}
                min={1}
              />
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <Label variant="dim" className="block text-xs font-mono uppercase tracking-wider">
                Linked Objectives
              </Label>
              <button
                type="button"
                onClick={handleAddObjectiveField}
                className="text-xs font-semibold text-forge-cyan hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus size={12} /> Add Objective
              </button>
            </div>
            <div className="space-y-2">
              {objectives.map((obj, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/5"
                >
                  <div className="flex-1 min-w-[120px]">
                    <Dropdown
                      options={objectiveTypeOptions}
                      value={obj.type}
                      onChange={(val) => handleObjectiveChange(index, 'type', val)}
                    />
                  </div>

                  {obj.type === 'CHECK_HABIT' && habits.length > 0 && (
                    <div className="flex-1 min-w-[150px]">
                      <Dropdown
                        options={habitOptions}
                        value={obj.referenceId}
                        onChange={(val) => handleObjectiveChange(index, 'referenceId', val)}
                      />
                    </div>
                  )}

                  {obj.type === 'COMPLETE_ROUTINE' && routines.length > 0 && (
                    <div className="flex-1 min-w-[150px]">
                      <Dropdown
                        options={routineOptions}
                        value={obj.referenceId}
                        onChange={(val) => handleObjectiveChange(index, 'referenceId', val)}
                      />
                    </div>
                  )}

                  <div className="w-16 shrink-0">
                    <Input
                      type="number"
                      value={obj.targetCount}
                      onChange={(e) => handleObjectiveChange(index, 'targetCount', Number(e.target.value))}
                      className="text-center"
                      min={1}
                    />
                  </div>

                  {objectives.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveObjectiveField(index)}
                      className="p-1 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer shrink-0"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-white/5">
            <Button
              type="submit"
              variant="default"
              className="flex-1"
              disabled={isPending}
            >
              {quest ? 'Save Changes' : 'Initialize Quest'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
