import { Globe, Brain } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/shared/lib/utils';

import { useKnowledge } from '../../../contexts/KnowledgeContext';

import { KnowledgeDashboard } from './dashboard/KnowledgeDashboard';
import { FlashcardDashboard } from './flashcards/FlashcardDashboard';
import { KnowledgeDetail } from './KnowledgeDetail';

interface KnowledgeContentProps {
  slug?: string[];
}

const KnowledgeContent: React.FC<KnowledgeContentProps> = ({ slug }) => {
  const router = useRouter();
  const { activeConcept, selectConcept, clearActive } = useKnowledge();
  const { language } = useLanguage();

  const view = (slug?.[0] as 'nexus' | 'flashcards') || 'nexus';
  const activeConceptTitle = slug?.[0] === 'nexus' && slug?.[1] ? decodeURIComponent(slug[1]) : null;

  useEffect(() => {
    if (activeConceptTitle) {
      const isMatching = activeConcept &&
        activeConcept.title.toLowerCase().trim() === activeConceptTitle.toLowerCase().trim() &&
        activeConcept.language === language;

      if (!isMatching) {
        selectConcept({
          id: activeConceptTitle,
          title: activeConceptTitle,
          summary: '',
          language: language || 'en',
          createdAt: new Date().toISOString(),
        });
      }
    } else {
      if (activeConcept) {
        clearActive();
      }
    }
  }, [activeConceptTitle, activeConcept, language, selectConcept, clearActive]);

  const setView = (newView: 'nexus' | 'flashcards') => {
    router.push(`/forge/knowledge/${newView}`);
  };

  return (
    <div className="h-full flex bg-transparent text-white relative overflow-hidden selection:bg-indigo-500/30">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-indigo-900/10 rounded-full blur-[200px] opacity-40" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-cyan-900/10 rounded-full blur-[200px] opacity-40" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="flex-1 h-full relative z-10 flex flex-col min-h-0">
        <div className="flex justify-center pt-6 shrink-0">
          <div className="flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/5 backdrop-blur-md">
            <button
              onClick={() => setView('nexus')}
              className={cn(
                'flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer',
                view === 'nexus'
                  ? 'bg-white/10 text-white shadow-sm border border-white/5'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
              )}
            >
              <Globe size={14} />
              <span>{language === 'vi' ? 'Mạng lưới tri thức' : 'Wisdom Nexus'}</span>
            </button>
            <button
              onClick={() => setView('flashcards')}
              className={cn(
                'flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer',
                view === 'flashcards'
                  ? 'bg-white/10 text-forge-cyan shadow-sm border border-white/5'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
              )}
            >
              <Brain size={14} />
              <span>{language === 'vi' ? 'Xưởng đúc trí nhớ' : 'Memory Forge'}</span>
            </button>
          </div>
        </div>

        {view === 'nexus' ? <KnowledgeDashboard /> : <FlashcardDashboard />}
      </div>

      {activeConcept && (
        <KnowledgeDetail concept={activeConcept} onClose={() => router.push('/forge/knowledge/nexus')} />
      )}
    </div>
  );
};

export default KnowledgeContent;


