'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Activity, ShieldAlert, Cpu, Sliders, Database } from 'lucide-react';
import { WidgetShell, Button, Label, Input, GlassCard, Dropdown, FloatingDock } from '@/shared/components/ui';
import { useSystemConfigs, useUpdateSystemConfig } from '../hooks/useSystemConfigs';
import { useSound, useNovaView } from '@/contexts';
import { View } from '@/shared/types/os';
import { useRouter } from 'next/navigation';

export interface SettingsProps {
  slug?: string[];
}

export function Settings({ slug }: SettingsProps) {
  const router = useRouter();
  const { data: configs, isLoading } = useSystemConfigs();
  const updateConfigMutation = useUpdateSystemConfig();
  const { playSound } = useSound();
  const { setCurrentView } = useNovaView();

  useEffect(() => {
    setCurrentView(View.SETTINGS || 'settings' as any);
  }, [setCurrentView]);

  const activeTab = (slug?.[0] as 'bio' | 'alchemy' | 'ai' | 'os') || 'bio';

  const setActiveTab = (tab: 'bio' | 'alchemy' | 'ai' | 'os') => {
    router.push(`/forge/settings/${tab}`);
  };

  const NAV_ITEMS = [
    { id: 'bio', label: 'Bio-Telemetry', icon: Activity },
    { id: 'alchemy', label: 'Alchemical Rules', icon: Sliders },
    { id: 'ai', label: 'AI Chamber', icon: Sparkles },
    { id: 'os', label: 'Core OS Control', icon: Cpu },
  ];

  // Bio-telemetry state  
  const [hydrationTarget, setHydrationTarget] = useState('');
  const [hydrationRatio, setHydrationRatio] = useState('');
  const [sleepTarget, setSleepTarget] = useState('');
  const [sleepReset, setSleepReset] = useState('');

  // Alchemy state
  const [flowThreshold, setFlowThreshold] = useState('');
  const [flowMultiplier, setFlowMultiplier] = useState('');
  const [stoicBonus, setStoicBonus] = useState('');
  const [caffeineBonus, setCaffeineBonus] = useState('');

  // AI state
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-flash');
  const [promptPhilosopher, setPromptPhilosopher] = useState('');
  const [promptLogician, setPromptLogician] = useState('');
  const [promptCreator, setPromptCreator] = useState('');
  const [promptArchivist, setPromptArchivist] = useState('');

  // Sync state when configs are loaded
  useEffect(() => {
    if (configs) {
      setHydrationTarget(String(configs.hydration_daily_target_ml || 3000));
      setHydrationRatio(String(configs.hydration_stamina_recharge_ratio || 5));
      setSleepTarget(String(configs.sleep_daily_target_hours || 8));
      setSleepReset(String(configs.sleep_stamina_reset_percent || 90));

      setFlowThreshold(String(configs.flow_state_stamina_threshold || 70));
      setFlowMultiplier(String(configs.flow_state_xp_multiplier || 0.2));
      setStoicBonus(String(configs.stoic_resolve_xp_bonus || 0.2));
      setCaffeineBonus(String(configs.caffeine_rush_xp_bonus || 0.1));

      setSelectedModel(configs.ai_selected_model || 'gemini-2.5-flash');
      setPromptPhilosopher(configs.ai_prompt_philosopher || '');
      setPromptLogician(configs.ai_prompt_logician || '');
      setPromptCreator(configs.ai_prompt_creator || '');
      setPromptArchivist(configs.ai_prompt_archivist || '');
    }
  }, [configs]);

  if (isLoading || !configs) {
    return (
      <div className="flex-1 h-full flex flex-col items-center justify-center p-6 bg-transparent text-white font-sans animate-pulse">
        <span className="text-xs uppercase tracking-[0.25em] text-forge-cyan/60 font-mono">
          Loading system rules...
        </span>
      </div>
    );
  }

  const handleUpdate = async (key: string, value: any) => {
    playSound('click');
    await updateConfigMutation.mutateAsync({ key, value });
  };

  const handlePurgeCache = () => {
    playSound('click');
    // Simulated system call
    alert('Redis memory cache purged successfully!');
  };

  return (
    <div className="relative flex h-full overflow-hidden bg-transparent text-white animate-in fade-in duration-700">
      <div className="relative z-10 flex h-full flex-1 flex-col overflow-hidden">
        {/* Page Header */}
        <div className="sticky top-0 z-20 border-b border-white/5 px-8 py-8 backdrop-blur-xl bg-transparent">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="mb-3 flex items-center gap-2 opacity-80">
                <div className="h-px w-8 bg-gradient-to-r from-forge-cyan/40 to-transparent" />
                <Label variant="cyan" className="text-[10px] font-mono tracking-[0.4em] uppercase text-forge-cyan">
                  Control Panel
                </Label>
              </div>
              <Label variant="default" className="text-4xl md:text-5xl font-bold text-white tracking-tight block capitalize">
                System Settings
              </Label>
              <p className="text-sm text-gray-400 font-light leading-relaxed max-w-xl">
                Configure your biological telemetries, gamified multipliers, AI chamber agents, and core OS parameters.
              </p>
            </div>
          </div>
        </div>
        {/* Scrollable View Content */}
        <div className="scrollbar-hide flex-1 overflow-y-auto px-8 py-6 space-y-6 max-w-4xl pb-32">
          {activeTab === 'bio' && (
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
          )}

          {activeTab === 'alchemy' && (
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
          )}

          {activeTab === 'ai' && (
            <div className="space-y-6">
              <WidgetShell title="AI Agent Prompts" glowColor="purple-400">
                <div className="space-y-6 mt-2">
                  <div>
                    <Label variant="dim" className="text-[10px] font-mono uppercase tracking-widest block mb-2">Selected LLM Model</Label>
                    <Dropdown
                      options={[
                        { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash (Recommended)' },
                        { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
                      ]}
                      value={selectedModel}
                      onChange={(val) => {
                        setSelectedModel(val);
                        handleUpdate('ai_selected_model', val);
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label variant="dim" className="text-[10px] font-mono uppercase tracking-widest block">
                      The Philosopher Prompt
                    </Label>
                    <textarea
                      value={promptPhilosopher}
                      onChange={(e) => setPromptPhilosopher(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-forge-cyan h-24 resize-none"
                    />
                    <Button onClick={() => handleUpdate('ai_prompt_philosopher', promptPhilosopher)}>
                      Update Prompt
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label variant="dim" className="text-[10px] font-mono uppercase tracking-widest block">
                      The Logician Prompt
                    </Label>
                    <textarea
                      value={promptLogician}
                      onChange={(e) => setPromptLogician(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-forge-cyan h-24 resize-none"
                    />
                    <Button onClick={() => handleUpdate('ai_prompt_logician', promptLogician)}>
                      Update Prompt
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label variant="dim" className="text-[10px] font-mono uppercase tracking-widest block">
                      The Creator Prompt
                    </Label>
                    <textarea
                      value={promptCreator}
                      onChange={(e) => setPromptCreator(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-forge-cyan h-24 resize-none"
                    />
                    <Button onClick={() => handleUpdate('ai_prompt_creator', promptCreator)}>
                      Update Prompt
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label variant="dim" className="text-[10px] font-mono uppercase tracking-widest block">
                      The Archivist Prompt
                    </Label>
                    <textarea
                      value={promptArchivist}
                      onChange={(e) => setPromptArchivist(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-forge-cyan h-24 resize-none"
                    />
                    <Button onClick={() => handleUpdate('ai_prompt_archivist', promptArchivist)}>
                      Update Prompt
                    </Button>
                  </div>
                </div>
              </WidgetShell>
            </div>
          )}

          {activeTab === 'os' && (
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
                      <Database className="text-emerald-400 mb-2" size={24} />
                      <span className="text-lg font-bold">PostgreSQL + Redis</span>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest block mt-1">Caching Layer State</span>
                      <Button onClick={handlePurgeCache}>
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
          )}
        </div>
      </div>
      <FloatingDock
        items={NAV_ITEMS}
        activeTab={activeTab}
        onChange={(tab) => setActiveTab(tab as any)}
      />
    </div>
  );
}
