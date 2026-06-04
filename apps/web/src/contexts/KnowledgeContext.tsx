'use client';

import React, { useCallback } from 'react';

import { useLanguage } from '@/contexts/LanguageContext';
import { useKnowledgeStore } from '@/shared/store/knowledgeStore';
import type { KnowledgeConcept } from '@/shared/types';

interface KnowledgeProviderProps {
  children: React.ReactNode;
}

export const KnowledgeProvider: React.FC<KnowledgeProviderProps> = ({ children }) => (
  <>{children}</>
);

export const useKnowledge = () => {
  const searchResults = useKnowledgeStore((state) => state.searchResults);
  const activeConcept = useKnowledgeStore((state) => state.activeConcept);
  const history = useKnowledgeStore((state) => state.history);
  const savedConcepts = useKnowledgeStore((state) => state.savedConcepts);
  const isLoading = useKnowledgeStore((state) => state.isLoading);
  const clearActive = useKnowledgeStore((state) => state.clearActive);
  const clearHistory = useKnowledgeStore((state) => state.clearHistory);

  const clearResults = useKnowledgeStore((state) => state.clearResults);
  const discoveryItems = useKnowledgeStore((state) => state.discoveryItems);
  const loadDiscovery = useKnowledgeStore((state) => state.loadDiscovery);

  const loadSavedConcepts = useKnowledgeStore((state) => state.loadSavedConcepts);
  const saveConcept = useKnowledgeStore((state) => state.saveConcept);
  const deleteConcept = useKnowledgeStore((state) => state.deleteConcept);

  // Actions that need dynamic arguments (language)
  const { language } = useLanguage();

  // We access the raw methods to avoid subscription if we only need to call them
  // But since they are on the store, we can use useKnowledgeStore.getState() inside callback
  // OR just use the bound functions if we selected them.
  // Wait, the store methods defined in create() are stable.
  const searchAction = useKnowledgeStore((state) => state.search);
  const selectAction = useKnowledgeStore((state) => state.selectConcept);

  const search = useCallback(
    async (query: string, searchLang?: string) => {
      await searchAction(query, searchLang || language);
    },
    [searchAction, language],
  );

  const selectConcept = useCallback(
    async (concept: KnowledgeConcept, selectLang?: string) => {
      await selectAction(concept, selectLang || language);
    },
    [selectAction, language],
  );

  const loadDiscoveryWrapper = useCallback(async () => {
    await loadDiscovery(language);
  }, [loadDiscovery, language]);

  return {
    searchResults,
    activeConcept,
    history,
    savedConcepts,
    isLoading,
    discoveryItems,
    loadDiscovery: loadDiscoveryWrapper,
    search,
    selectConcept,
    clearActive,
    clearHistory,
    clearResults,
    loadSavedConcepts,
    saveConcept,
    deleteConcept,
  };
};


