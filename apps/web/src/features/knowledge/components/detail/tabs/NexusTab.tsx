import { Network, Share2 } from 'lucide-react';
import React from 'react';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button, EmptyState } from '@/shared/components/ui';

export const NexusTab: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-[600px] flex items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <EmptyState
        icon={<Network size={32} className="text-purple-400" />}
        title={t('knowledge.nexus_title')}
        description={t('knowledge.nexus_desc')}
        glowColor="accent"
        size="lg"
        className="max-w-lg mx-auto bg-transparent"
      >
        <Button 
          variant="glass" 
          className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white font-medium cursor-pointer"
        >
          <Share2 size={16} />
          <span>{t('knowledge.generate_graph')}</span>
        </Button>
      </EmptyState>
    </div>
  );
};


