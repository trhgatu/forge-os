'use client';

import { X, Plus } from 'lucide-react';
import React, { useState, useEffect } from 'react';

import { useSound } from '@/contexts';
import { Button, Input, Dropdown } from '@/shared/components/ui';

import type { Goal } from '../types';

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description: string;
    xpReward: number;
    badgeIcon: string;
    objectives: Array<{
      type: string;
      targetCount: number;
      referenceId: string | null;
    }>;
  }) => Promise<void>;
  goal: Goal | null;
  isPending: boolean;
  quests: any[];
}

const badgeOptions = [
  { value: 'achievement_master_of_reality', label: 'Master of Reality', sublabel: 'Legendary gold honor' },
  { value: 'achievement_stoic_sage', label: 'Stoic Sage', sublabel: 'Epic purple honor' },
  { value: 'achievement_focus_lord', label: 'Focus Lord', sublabel: 'Rare neon cyan honor' },
  { value: 'achievement_eternal_alchemist', label: 'Eternal Alchemist', sublabel: 'Uncommon emerald honor' }
];

const objectiveTypeOptions = [
  { value: 'COMPLETE_QUEST', label: 'Complete Quest', sublabel: 'Finish a general quest' },
  { value: 'COMPLETE_DAILY_QUEST', label: 'Complete Daily Quest', sublabel: 'Finish a daily alignment quest' }
];

export function GoalModal({
  isOpen,
  onClose,
  onSubmit,
  goal,
  isPending,
  quests = [],
}: GoalModalProps) {
  const { playSound } = useSound();

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [xpReward, setXpReward] = useState(1000);
  const [badgeIcon, setBadgeIcon] = useState('achievement_master_of_reality');
  const [objectives, setObjectives] = useState<Array<{ type: string; targetCount: number; referenceId: string | null }>>([
    { type: 'COMPLETE_QUEST', targetCount: 10, referenceId: 'quest-daily-meta-alignment' }
  ]);

  // Sync state with selected editing goal
  useEffect(() => {
    if (goal) {
      setTitle(goal.title);
      setDescription(goal.description || '');
      setXpReward(goal.xpReward);
      setBadgeIcon(goal.badgeIcon || 'achievement_master_of_reality');
      setObjectives(
        goal.objectives.map((o) => ({
          type: o.type,
          targetCount: o.targetCount,
          referenceId: o.referenceId,
        }))
      );
    } else {
      setTitle('');
      setDescription('');
      setXpReward(1000);
      setBadgeIcon('achievement_master_of_reality');
      setObjectives([
        { type: 'COMPLETE_QUEST', targetCount: 10, referenceId: 'quest-daily-meta-alignment' }
      ]);
    }
  }, [goal, isOpen]);

  // Map quests to options
  const questOptions = [
    { value: '', label: 'Select Quest...' },
    ...quests.map((q) => ({
      value: q.id,
      label: q.title,
      sublabel: `Type: ${q.type} | +${q.xpReward} XP`,
    })),
  ];

  if (!isOpen) return null;

  const handleAddObjectiveField = () => {
    playSound('click');
    setObjectives([...objectives, { type: 'COMPLETE_QUEST', targetCount: 10, referenceId: '' }]);
  };

  const handleRemoveObjectiveField = (index: number) => {
    playSound('click');
    setObjectives(objectives.filter((_, i) => i !== index));
  };

  const handleObjectiveChange = (index: number, field: string, value: any) => {
    const updated = [...objectives];
    updated[index] = { ...updated[index], [field]: value };
    setObjectives(updated);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playSound('click');

    const cleanObjectives = objectives.map((o) => ({
      type: o.type,
      targetCount: o.targetCount,
      referenceId: o.referenceId ? o.referenceId : null,
    }));

    await onSubmit({
      title,
      description,
      xpReward,
      badgeIcon,
      objectives: cleanObjectives,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-2xl rounded-2xl bg-[#09090b] border border-white/10 overflow-visible shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/5 bg-white/[0.01]">
          <h2 className="text-lg font-semibold text-white">
            {goal ? 'Configure Epic Goal Profile' : 'Initialize New Epic Goal'}
          </h2>
          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleFormSubmit} className="p-5 space-y-4 overflow-visible">
          <div>
            <label className="block text-xs font-mono uppercase text-gray-500 tracking-wider mb-1.5">
              Goal Title
            </label>
            <Input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g., Grand Stoic Discipline"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-gray-500 tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-gray-500 h-20 resize-none font-sans"
              placeholder="Describe target milestones of this epic goal..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-gray-500 tracking-wider mb-1.5">
                XP Reward
              </label>
              <Input
                type="number"
                required
                value={xpReward}
                onChange={(e) => setXpReward(Number(e.target.value))}
                min={1}
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-gray-500 tracking-wider mb-1.5">
                Badge Medal
              </label>
              <Dropdown
                options={badgeOptions}
                value={badgeIcon}
                onChange={setBadgeIcon}
              />
            </div>
          </div>

          {/* Dynamic Requirements / Objectives Builder */}
          <div className="space-y-2.5 overflow-visible">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-mono uppercase text-gray-500 tracking-wider">
                Required Milestones
              </label>
              <button
                type="button"
                onClick={handleAddObjectiveField}
                className="text-xs font-semibold text-forge-cyan hover:underline flex items-center gap-1 cursor-pointer font-sans"
              >
                <Plus size={12} /> Add Requirement
              </button>
            </div>

            <div className="space-y-3 overflow-visible">
              {objectives.map((obj, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/5 overflow-visible"
                >
                  <div className="flex-1 min-w-[140px]">
                    <Dropdown
                      options={objectiveTypeOptions}
                      value={obj.type}
                      onChange={(val) => handleObjectiveChange(index, 'type', val)}
                    />
                  </div>

                  <div className="flex-2 min-w-[200px]">
                    <Dropdown
                      options={questOptions}
                      value={obj.referenceId || ''}
                      onChange={(val) => handleObjectiveChange(index, 'referenceId', val)}
                      placeholder="Select Target Quest..."
                    />
                  </div>

                  <div className="w-16 shrink-0">
                    <Input
                      type="number"
                      value={obj.targetCount}
                      onChange={(e) => handleObjectiveChange(index, 'targetCount', Number(e.target.value))}
                      className="text-center h-10 text-xs font-mono"
                      min={1}
                      required
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

          {/* Modal Actions */}
          <div className="flex gap-3 pt-4 border-t border-white/5">
            <Button
              type="submit"
              variant="default"
              className="flex-1 h-10 text-xs font-mono uppercase tracking-wider font-bold cursor-pointer"
              disabled={isPending}
            >
              {isPending ? (
                <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin mx-auto" />
              ) : goal ? (
                'Save Configuration'
              ) : (
                'Initialize Epic Goal'
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-10 text-xs font-mono uppercase tracking-wider font-bold cursor-pointer"
              onClick={() => {
                playSound('click');
                onClose();
              }}
            >
              Cancel
            </Button>
          </div>

        </form>

      </div>
    </div>
  );
}
