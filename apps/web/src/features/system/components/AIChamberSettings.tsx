'use client';

import React, { useState, useEffect } from 'react';
import { WidgetShell, Button, Label, Dropdown } from '@/shared/components/ui';

interface AIChamberSettingsProps {
  configs: any;
  handleUpdate: (key: string, value: any) => Promise<void>;
}

export function AIChamberSettings({ configs, handleUpdate }: AIChamberSettingsProps) {
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-flash');
  const [promptPhilosopher, setPromptPhilosopher] = useState('');
  const [promptLogician, setPromptLogician] = useState('');
  const [promptCreator, setPromptCreator] = useState('');
  const [promptArchivist, setPromptArchivist] = useState('');

  useEffect(() => {
    if (configs) {
      setSelectedModel(configs.ai_selected_model || 'gemini-2.5-flash');
      setPromptPhilosopher(configs.ai_prompt_philosopher || '');
      setPromptLogician(configs.ai_prompt_logician || '');
      setPromptCreator(configs.ai_prompt_creator || '');
      setPromptArchivist(configs.ai_prompt_archivist || '');
    }
  }, [configs]);

  return (
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
  );
}
