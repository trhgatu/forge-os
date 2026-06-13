'use client';

import { Sparkles } from 'lucide-react';
import React, { useState } from 'react';

import { GlassCard, Button } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';

interface CreateDeckModalProps {
  t: (key: string) => string;
  onClose: () => void;
  onSubmit: (data: { title: string; description: string; colorTheme: string }) => Promise<void>;
}

export const CreateDeckModal: React.FC<CreateDeckModalProps> = ({ t, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [theme, setTheme] = useState('from-indigo-600 to-cyan-500');

  const themes = [
    { name: 'Cosmic Indigo', value: 'from-indigo-600 to-cyan-500 shadow-indigo-500/10' },
    { name: 'Stoic Gold', value: 'from-amber-600 to-rose-600 shadow-amber-500/10' },
    { name: 'Techno Emerald', value: 'from-emerald-600 to-teal-500 shadow-emerald-500/10' },
    { name: 'Alchemical Purple', value: 'from-purple-600 to-pink-500 shadow-purple-500/10' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await onSubmit({
      title: title.trim(),
      description: desc.trim(),
      colorTheme: theme,
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <GlassCard className="w-full max-w-md p-8 relative animate-in zoom-in-95 duration-200 bg-[#0e0e13]/90">
        <h3 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2">
          <Sparkles size={18} className="text-forge-cyan" /> {t('knowledge.create_deck_title')}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-2">
              {t('knowledge.deck_title_label')}
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-all font-light"
              placeholder={t('knowledge.deck_title_placeholder')}
            />
          </div>

          <div>
            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-2">
              {t('knowledge.deck_description_label')}
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-all font-light h-20 resize-none"
              placeholder={t('knowledge.deck_description_placeholder')}
            />
          </div>

          <div>
            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-2">
              {t('knowledge.color_theme_label')}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.name}
                  type="button"
                  onClick={() => setTheme(themeOption.value)}
                  className={cn(
                    'flex items-center justify-between p-3 rounded-xl border text-[11px] font-medium text-left transition-all',
                    theme === themeOption.value
                      ? 'border-white/40 bg-white/10 text-white font-bold'
                      : 'border-white/5 bg-white/5 text-gray-400 hover:bg-white/10'
                  )}
                >
                  <span>{themeOption.name}</span>
                  <div className={cn('w-3.5 h-3.5 rounded-full bg-gradient-to-r shrink-0 ml-2', themeOption.value.split(' ')[0], themeOption.value.split(' ')[1])} />
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              {t('knowledge.cancel')}
            </Button>
            <Button
              type="submit"
              variant="default"
              className="flex-1"
            >
              {t('knowledge.create')}
            </Button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};
