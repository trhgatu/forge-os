'use client';

import { BookOpen, Hammer, Network, ArrowLeft, Share2, Bookmark, MoreVertical } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

import { cn } from '@/shared/lib/utils';
import type { KnowledgeConcept } from '@/shared/types';

import { AnvilTab } from './detail/tabs/AnvilTab';
import { NexusTab } from './detail/tabs/NexusTab';
import { SourceTab } from './detail/tabs/SourceTab';

interface KnowledgeDetailProps {
  concept: KnowledgeConcept;
  onClose: () => void;
}

type Tab = 'source' | 'anvil' | 'nexus';

import { useConcepts, useSaveConcept, useDeleteConcept } from '../hooks/useKnowledge';

export const KnowledgeDetail: React.FC<KnowledgeDetailProps> = ({ concept, onClose }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = (searchParams.get('tab') as Tab) || 'source';

  const setActiveTab = (tab: Tab) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const { data: savedConcepts = [] } = useConcepts();
  const saveConceptMutation = useSaveConcept();
  const deleteConceptMutation = useDeleteConcept();

  const dbConcept = savedConcepts.find(
    (c) => c.title.toLowerCase().trim() === concept.title.toLowerCase().trim()
  );
  const isSaved = !!dbConcept;

  const handleToggleSave = async () => {
    if (isSaved && dbConcept) {
      await deleteConceptMutation.mutateAsync(dbConcept.id);
    } else {
      let sourceEnum: 'WIKIPEDIA' | 'WEB_ARTICLE' | 'CODEX_BOOK' | 'PERSONAL_NOTE' = 'WIKIPEDIA';
      if (concept.id && concept.id.startsWith('custom-')) {
        sourceEnum = 'PERSONAL_NOTE';
      } else if (concept.url && !concept.url.includes('wikipedia.org')) {
        sourceEnum = 'WEB_ARTICLE';
      }
      await saveConceptMutation.mutateAsync({
        title: concept.title,
        sourceType: sourceEnum,
        sourceUrl: concept.url,
        content: concept.content || concept.extract || '',
        summary: concept.summary,
      });
    }
  };

  interface ExtractItem {
    id: string;
    text: string;
  }

  const [stagingExtracts, setStagingExtracts] = useState<ExtractItem[]>([]);
  const [committedExtracts, setCommittedExtracts] = useState<ExtractItem[]>([]);

  const handleCapture = (text: string) => {
    setStagingExtracts((prev) => [...prev, { id: crypto.randomUUID(), text }]);
  };

  const handleRemoveStaging = (id: string) => {
    setStagingExtracts((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRemoveCommitted = (id: string) => {
    setCommittedExtracts((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCrystallize = () => {
    if (stagingExtracts.length > 0) {
      setCommittedExtracts((prev) => [...prev, ...stagingExtracts]);
      setStagingExtracts([]);
    }
    setActiveTab('anvil');
  };

  const TABS = [
    { id: 'source', label: 'Source', icon: BookOpen },
    { id: 'anvil', label: 'Anvil', icon: Hammer },
    { id: 'nexus', label: 'Nexus', icon: Network },
  ];

  return (
    <div className="absolute inset-0 z-50 bg-[#030304] animate-in fade-in duration-300 overflow-y-auto custom-scrollbar font-roboto">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[150px] opacity-20" />
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-forge-cyan/5 rounded-full blur-[100px] opacity-10" />
      </div>

      <div className="sticky top-0 z-50 bg-[#030304]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 h-16 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="flex items-center justify-start gap-4 min-w-0">
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors shrink-0"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="h-6 w-px bg-white/10 shrink-0" />
            <h1 className="text-sm font-bold text-white uppercase tracking-wider hidden md:block shrink-0">
              Wisdom Workspace
            </h1>
            <span className="text-gray-600 hidden md:block shrink-0">/</span>
            <span className="text-sm text-gray-300 truncate">{concept.title}</span>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/5 backdrop-blur-md">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all',
                    activeTab === tab.id
                      ? 'bg-white/10 text-white shadow-sm border border-white/5'
                      : 'text-gray-500 hover:text-gray-300 hover:bg-white/5',
                  )}
                >
                  <tab.icon size={14} />
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              onClick={handleToggleSave}
              className={cn(
                'p-2 rounded-lg transition-colors',
                isSaved ? 'text-forge-accent' : 'text-gray-400 hover:text-white',
              )}
            >
              <Bookmark size={20} fill={isSaved ? 'currentColor' : 'none'} />
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Share2 size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 md:py-12 relative z-10 min-h-screen">
        {activeTab === 'source' && (
          <SourceTab
            concept={concept}
            extracts={stagingExtracts}
            onCrystallize={handleCrystallize}
            onCapture={handleCapture}
            onRemoveExtract={handleRemoveStaging}
          />
        )}
        {activeTab === 'anvil' && (
          <AnvilTab extracts={committedExtracts} onRemoveExtract={handleRemoveCommitted} />
        )}
        {activeTab === 'nexus' && <NexusTab concept={concept} />}
      </div>
    </div>
  );
};


