'use client';

import React from 'react';
import { WidgetShell, Button, GlassCard } from '@/shared/components/ui';
import { ShieldAlert, Cpu, Database } from 'lucide-react';

interface CoreOSSettingsProps {
  handlePurgeCache: () => void;
}

export function CoreOSSettings({ handlePurgeCache }: CoreOSSettingsProps) {
  return (
    <div className="space-y-6">
      <WidgetShell title="Core OS Administration" glowColor="emerald-400">
        <div className="space-y-4 mt-2">
          <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-2xl flex items-start gap-3">
            <ShieldAlert className="text-red-400 shrink-0" size={16} />
            <div className="text-xs">
              <span className="font-bold text-red-300 block mb-1">Administrative Privileges Active</span>
              Any modifications to system settings instantly affect calculation behaviors in real-time. Please adjust values carefully to avoid scaling imbalance.
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <GlassCard className="bg-white/[0.01] border-white/5 text-center flex flex-col items-center justify-center p-6">
              <Database className="text-forge-cyan mb-2" size={24} />
              <span className="text-lg font-bold">PostgreSQL + Redis</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest block mt-1">Caching Layer State</span>
              <Button onClick={handlePurgeCache} className="mt-4 bg-white/5 border border-white/10 hover:border-white/20 text-xs py-2">
                Purge Memory Cache
              </Button>
            </GlassCard>

            <GlassCard className="bg-white/[0.01] border-white/5 text-center flex flex-col items-center justify-center p-6">
              <Cpu className="text-forge-cyan mb-2" size={24} />
              <span className="text-lg font-bold">API Server V1</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest block mt-1">Uptime: Nominal</span>
              <span className="text-[10px] text-emerald-400 font-bold block mt-4 font-mono">STATUS: ONLINE</span>
            </GlassCard>
          </div>
        </div>
      </WidgetShell>
    </div>
  );
}
