'use client';

import React, { useState, useEffect } from 'react';
import { WidgetShell, Button, Label, Input } from '@/shared/components/ui';

interface BioTelemetrySettingsProps {
  configs: any;
  handleUpdate: (key: string, value: any) => Promise<void>;
}

export function BioTelemetrySettings({ configs, handleUpdate }: BioTelemetrySettingsProps) {
  const [hydrationTarget, setHydrationTarget] = useState('');
  const [hydrationRatio, setHydrationRatio] = useState('');
  const [sleepTarget, setSleepTarget] = useState('');
  const [sleepReset, setSleepReset] = useState('');

  useEffect(() => {
    if (configs) {
      setHydrationTarget(String(configs.hydration_daily_target_ml || 3000));
      setHydrationRatio(String(configs.hydration_stamina_recharge_ratio || 5));
      setSleepTarget(String(configs.sleep_daily_target_hours || 8));
      setSleepReset(String(configs.sleep_stamina_reset_percent || 90));
    }
  }, [configs]);

  return (
    <div className="space-y-6">
      <WidgetShell title="Hydration Parameters" glowColor="forge-cyan">
        <div className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label variant="dim" className="text-[10px] font-mono uppercase tracking-widest block mb-2">Daily Target (ml)</Label>
              <Input
                type="number"
                value={hydrationTarget}
                onChange={(e) => setHydrationTarget(e.target.value)}
                className="bg-black/40 border-white/10 text-white rounded-xl"
              />
            </div>
            <div>
              <Label variant="dim" className="text-[10px] font-mono uppercase tracking-widest block mb-2">Stamina Recovery Per 250ml</Label>
              <Input
                type="number"
                value={hydrationRatio}
                onChange={(e) => setHydrationRatio(e.target.value)}
                className="bg-black/40 border-white/10 text-white rounded-xl"
              />
            </div>
          </div>
          <Button
            onClick={() => handleUpdate('hydration_daily_target_ml', parseInt(hydrationTarget))}
            className="mt-2"
          >
            Save Target
          </Button>
          <Button
            onClick={() => handleUpdate('hydration_stamina_recharge_ratio', parseFloat(hydrationRatio))}
            className="mt-2 ml-2"
          >
            Save Recovery Ratio
          </Button>
        </div>
      </WidgetShell>

      <WidgetShell title="Sleep Parameters" glowColor="white">
        <div className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label variant="dim" className="text-[10px] font-mono uppercase tracking-widest block mb-2">Sleep Target (Hours)</Label>
              <Input
                type="number"
                value={sleepTarget}
                onChange={(e) => setSleepTarget(e.target.value)}
                className="bg-black/40 border-white/10 text-white rounded-xl"
              />
            </div>
            <div>
              <Label variant="dim" className="text-[10px] font-mono uppercase tracking-widest block mb-2">Morning Stamina Reset (%)</Label>
              <Input
                type="number"
                value={sleepReset}
                onChange={(e) => setSleepReset(e.target.value)}
                className="bg-black/40 border-white/10 text-white rounded-xl"
              />
            </div>
          </div>
          <Button
            onClick={() => handleUpdate('sleep_daily_target_hours', parseFloat(sleepTarget))}
            className="mt-2"
          >
            Save Target Hours
          </Button>
          <Button
            onClick={() => handleUpdate('sleep_stamina_reset_percent', parseInt(sleepReset))}
            className="mt-2 ml-2"
          >
            Save Reset %
          </Button>
        </div>
      </WidgetShell>
    </div>
  );
}
