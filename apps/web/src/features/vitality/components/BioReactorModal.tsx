'use client';

import React, { useState } from 'react';
import { Button, Modal, Input, Label, Dropdown } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';

interface BioReactorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    type: 'SLEEP' | 'WORKOUT' | 'CAFFEINE';
    value: number;
    metadata?: any;
  }) => void;
  isPending: boolean;
}

const workoutTypeOptions = [
  { value: 'STRENGTH', label: 'Strength Training' },
  { value: 'CARDIO', label: 'Cardio / Running' },
  { value: 'YOGA', label: 'Yoga / Stretching' },
  { value: 'SPORTS', label: 'Sports / Recreational' }
];

export const BioReactorModal: React.FC<BioReactorModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isPending,
}) => {
  const [activeTab, setActiveTab] = useState<'sleep' | 'workout' | 'caffeine'>('sleep');

  // Custom inputs for logging
  const [sleepHours, setSleepHours] = useState('8');
  const [sleepQuality, setSleepQuality] = useState('4');
  const [workoutType, setWorkoutType] = useState('STRENGTH');
  const [workoutDuration, setWorkoutDuration] = useState('45');
  const [caffeineMg, setCaffeineMg] = useState('100');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'sleep') {
      onSubmit({
        type: 'SLEEP',
        value: parseFloat(sleepHours),
        metadata: { quality: parseInt(sleepQuality) },
      });
    } else if (activeTab === 'workout') {
      onSubmit({
        type: 'WORKOUT',
        value: parseFloat(workoutDuration),
        metadata: { workoutType },
      });
    } else if (activeTab === 'caffeine') {
      onSubmit({
        type: 'CAFFEINE',
        value: parseFloat(caffeineMg),
      });
    }
  };

  const modalTitle = (
    <div className="text-left py-1">
      <Label variant="cyan" className="text-base font-bold tracking-wider">
        Log Vitality Activity
      </Label>
      <p className="text-xs text-gray-500 mt-1 italic normal-case font-sans font-light">
        "Log your biological telemetry to synchronize energy baselines."
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
      <div className="flex border-b border-white/5 mb-6">
        {(['sleep', 'workout', 'caffeine'] as const).map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-3 text-xs font-mono uppercase tracking-wider border-b-2 transition-all cursor-pointer font-bold",
              activeTab === tab
                ? "border-emerald-500 text-white bg-white/[0.02]"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        {activeTab === 'sleep' && (
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-2">Duration (Hours)</label>
              <Input
                type="number"
                step="0.1"
                value={sleepHours}
                onChange={e => setSleepHours(e.target.value)}
                className="bg-black/40 border-white/10 text-white rounded-xl focus:border-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-2">Quality (1-5)</label>
              <div className="flex justify-between gap-2">
                {[1, 2, 3, 4, 5].map(q => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setSleepQuality(q.toString())}
                    className={cn(
                      "flex-1 py-2 rounded-xl text-xs font-mono font-bold transition-all border",
                      sleepQuality === q.toString()
                        ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                        : "bg-black/20 border-white/5 text-zinc-400 hover:border-white/10"
                    )}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'workout' && (
          <div className="space-y-4 text-left">
            <div>
              <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-2">Workout Type</label>
              <Dropdown
                options={workoutTypeOptions}
                value={workoutType}
                onChange={setWorkoutType}
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-2">Duration (Minutes)</label>
              <Input
                type="number"
                value={workoutDuration}
                onChange={e => setWorkoutDuration(e.target.value)}
                className="bg-black/40 border-white/10 text-white rounded-xl focus:border-emerald-500"
                required
              />
            </div>
          </div>
        )}

        {activeTab === 'caffeine' && (
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-2">Caffeine Intake (mg)</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Espresso', mg: 80 },
                  { label: 'Energy Drink', mg: 150 },
                  { label: 'Custom', mg: 100 }
                ].map((preset, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCaffeineMg(preset.mg.toString())}
                    className={cn(
                      "py-3 rounded-xl text-xs font-mono font-bold transition-all border",
                      caffeineMg === preset.mg.toString()
                        ? "bg-amber-500/10 border-amber-500 text-amber-400"
                        : "bg-black/20 border-white/5 text-zinc-400 hover:border-white/10"
                    )}
                  >
                    {preset.label} ({preset.mg}mg)
                  </button>
                ))}
              </div>
              <Input
                type="number"
                value={caffeineMg}
                onChange={e => setCaffeineMg(e.target.value)}
                className="mt-3 bg-black/40 border-white/10 text-white rounded-xl focus:border-emerald-500"
                placeholder="Enter custom mg"
                required
              />
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            type="button"
            className="flex-1 rounded-2xl h-11 text-xs font-mono text-zinc-400"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isPending}
            className="flex-1 rounded-2xl h-11 text-xs font-mono font-bold bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/10"
          >
            Confirm Log
          </Button>
        </div>
      </form>
    </Modal>
  );
};
