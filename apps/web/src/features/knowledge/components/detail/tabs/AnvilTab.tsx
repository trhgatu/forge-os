import { Hammer, Eye, Quote, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';

import { useLanguage } from '@/contexts/LanguageContext';
import { ForgeEditor } from '@/shared/components/editor/ForgeEditor';
import { Button, Label, Input, EmptyState } from '@/shared/components/ui';
import { GlassCard } from '@/shared/components/ui/GlassCard';
import { cn } from '@/shared/lib/utils';

import { useKnowledge } from '@/contexts';
import { forgeToast } from '@/shared/lib/toast';

interface AnvilTabProps {
  extracts?: { id: string; text: string }[];
  onRemoveExtract?: (id: string) => void;
}

export const AnvilTab: React.FC<AnvilTabProps> = ({ extracts = [], onRemoveExtract }) => {
  const { t } = useLanguage();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  const { saveConcept } = useKnowledge();

  useEffect(() => {
    setTitle(t('knowledge.new_artifact'));
  }, [t]);

  const handleSave = async () => {
    if (!content.trim() || !title.trim()) {
      forgeToast.system(t('knowledge.artifact_empty') || 'Title and content cannot be empty.');
      return;
    }
    
    setIsSaving(true);
    try {
      await saveConcept({
        id: `custom-${Date.now()}`,
        title,
        content,
        summary: content.length > 200 ? content.substring(0, 200) + '...' : content,
        language: 'en',
        createdAt: new Date().toISOString(),
      });
      
      forgeToast.system(
        t('knowledge.crystallize_success_title') || 'ARTiFACT CRYSTALLiZED',
        t('knowledge.crystallize_success_desc') || `Saved '${title}' into the knowledge base.`
      );
      
      setContent('');
      setTitle(t('knowledge.new_artifact'));
    } catch (err) {
      console.error(err);
      forgeToast.system('FORGE ERROR', 'Failed to crystallize the artifact.');
    } finally {
      setIsSaving(false);
    }
  };

  const insertExtract = (text: string) => {
    setContent((prev) => {
      const prefix = prev ? '\n' : '';
      return `${prev}${prefix}> ${text}\n\n`;
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)] animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-4 h-full min-h-0">
        <GlassCard
          className="h-full flex flex-col bg-[#050508]/50 overflow-hidden"
          innerClassName="h-full flex flex-col overflow-hidden"
        >
          <Label icon={<Eye size={14} />} className="mb-4 shrink-0">
            {t('knowledge.context_extracts')}
          </Label>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin min-h-0">
            {extracts.length === 0 ? (
              <EmptyState
                icon={<Quote size={16} />}
                title={t('knowledge.drag_extracts_here')}
                glowColor="default"
                size="sm"
                className="border-dashed border-white/10 bg-white/5 py-6 px-4"
              />
            ) : (
              extracts.map((e) => (
                <div
                  key={e.id}
                  onClick={() => insertExtract(e.text)}
                  className="group relative p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-forge-accent/50 cursor-pointer transition-all active:scale-95 pr-6"
                >
                  <Quote
                    size={12}
                    className="text-forge-accent mb-2 opacity-50 group-hover:opacity-100"
                  />
                  <p className="text-xs text-gray-300 line-clamp-4 leading-relaxed font-serif italic text-pretty">
                    &quot;{e.text}&quot;
                  </p>
                  {onRemoveExtract && (
                    <Button
                      onClick={(ev) => {
                        ev.stopPropagation();
                        onRemoveExtract(e.id);
                      }}
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 hover:bg-red-500/80 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm z-10 h-7 w-7"
                      title="Remove Extract"
                    >
                      <X size={12} />
                    </Button>
                  )}
                </div>
              ))
            )}
          </div>
        </GlassCard>
      </div>

      <div className="flex-1 flex flex-col h-full gap-4 min-h-0">
        <GlassCard
          className="flex-1 p-0 flex flex-col overflow-hidden bg-[#0c0c0e] relative group min-h-0"
          innerClassName="h-full flex flex-col relative"
        >
          <div className="absolute inset-0 bg-[url('/images/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none" />
          <div className="px-8 pt-8 pb-4 z-10 shrink-0">
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              variant="unstyled"
              className="text-4xl font-display font-bold text-white placeholder-gray-600"
              placeholder={t('knowledge.artifact_title_placeholder')}
            />
          </div>

          {/* Shared Editor */}
          <div className="flex-1 min-h-0 relative z-10 px-8 pb-8 flex flex-col">
            <ForgeEditor
              content={content}
              onChange={setContent}
              placeholder={t('knowledge.editor_placeholder')}
              className="flex-1 h-full min-h-0"
            />
          </div>
        </GlassCard>

        <div className="flex justify-end shrink-0">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            variant="glass"
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-white text-black transition-all hover:bg-gray-200 disabled:opacity-50 h-auto',
              isSaving ? 'cursor-wait' : '',
            )}
          >
            {isSaving ? (
              <div className="w-5 h-5 rounded-full border-2 border-black border-t-transparent animate-spin" />
            ) : (
              <Hammer size={18} className={isSaving ? 'animate-bounce' : ''} />
            )}
            <span>{isSaving ? t('knowledge.forging') : t('knowledge.crystallize_artifact')}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};


