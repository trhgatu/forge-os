'use client';

import React, { useState, useEffect } from 'react';
import { WidgetShell, Button, Label, Input } from '@/shared/components/ui';

interface AlchemicalRulesSettingsProps {
  configs: any;
  handleUpdate: (key: string, value: any) => Promise<void>;
}

export function AlchemicalRulesSettings({ configs, handleUpdate }: AlchemicalRulesSettingsProps) {
  const [flowThreshold, setFlowThreshold] = useState('');
  const [flowMultiplier, setFlowMultiplier] = useState('');
  const [stoicBonus, setStoicBonus] = useState('');
  const [caffeineBonus, setCaffeineBonus] = useState('');

  useEffect(() => {
    if (configs) {
      setFlowThreshold(String(configs.flow_state_stamina_threshold || 70));
      setFlowMultiplier(String(configs.flow_state_xp_multiplier || 0.2));
      setStoicBonus(String(configs.stoic_resolve_xp_bonus || 0.2));
      setCaffeineBonus(String(configs.caffeine_rush_xp_bonus || 0.1));
    }
  }, [configs]);

  return (
    <div className="space-y-6">
      <WidgetShell title="Flow State Adjuster" glowColor="forge-cyan">
        <div className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label variant="dim" className="text-[10px] font-mono uppercase tracking-widest block mb-2">Stamina Threshold (%)</Label>
              <Input
                type="number"
                value={flowThreshold}
                onChange={(e) => setFlowThreshold(e.target.value)}
                className="bg-black/40 border-white/10 text-white rounded-xl"
              />
            </div>
            <div>
              <Label variant="dim" className="text-[10px] font-mono uppercase tracking-widest block mb-2">XP Multiplier Bonus</Label>
              <Input
                type="number"
                step="0.05"
                value={flowMultiplier}
                onChange={(e) => setFlowMultiplier(e.target.value)}
                className="bg-black/40 border-white/10 text-white rounded-xl"
              />
            </div>
          </div>
          <Button
            onClick={() => handleUpdate('flow_state_stamina_threshold', parseInt(flowThreshold))}
            className="mt-2"
          >
            Save Threshold
          </Button>
          <Button
            onClick={() => handleUpdate('flow_state_xp_multiplier', parseFloat(flowMultiplier))}
            className="mt-2 ml-2"
          >
            Save XP Bonus
          </Button>
        </div>
      </WidgetShell>

      <WidgetShell title="Status Effects Rules" glowColor="white">
        <div className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label variant="dim" className="text-[10px] font-mono uppercase tracking-widest block mb-2">Stoic Resolve XP Bonus</Label>
              <Input
                type="number"
                step="0.05"
                value={stoicBonus}
                onChange={(e) => setStoicBonus(e.target.value)}
                className="bg-black/40 border-white/10 text-white rounded-xl"
              />
            </div>
            <div>
              <Label variant="dim" className="text-[10px] font-mono uppercase tracking-widest block mb-2">Caffeine Rush XP Bonus</Label>
              <Input
                type="number"
                step="0.05"
                value={caffeineBonus}
                onChange={(e) => setCaffeineBonus(e.target.value)}
                className="bg-black/40 border-white/10 text-white rounded-xl"
              />
            </div>
          </div>
          <Button
            onClick={() => handleUpdate('stoic_resolve_xp_bonus', parseFloat(stoicBonus))}
            className="mt-2"
          >
            Save Stoic Bonus
          </Button>
          <Button
            onClick={() => handleUpdate('caffeine_rush_xp_bonus', parseFloat(caffeineBonus))}
            className="mt-2 ml-2"
          >
            Save Caffeine Bonus
          </Button>
        </div>
      </WidgetShell>
    </div>
  );
}
