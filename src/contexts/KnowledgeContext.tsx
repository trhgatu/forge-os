"use client";

import React, { useCallback } from "react";
import type { KnowledgeConcept } from "@/shared/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useKnowledgeStore } from "@/store/knowledge.store";

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
  const isLoading = useKnowledgeStore((state) => state.isLoading);
  const clearActive = useKnowledgeStore((state) => state.clearActive);
  const clearHistory = useKnowledgeStore((state) => state.clearHistory);
  const clearResults = useKnowledgeStore((state) => state.clearResults);

  // Actions that need dynamic arguments (language)
  const { language } = useLanguage();

  // We access the raw methods to avoid subscription if we only need to call them
  // But since they are on the store, we can use useKnowledgeStore.getState() inside callback
  // OR just use the bound functions if we selected them.
  // Wait, the store methods defined in create() are stable.
  const searchAction = useKnowledgeStore((state) => state.search);
  const selectAction = useKnowledgeStore((state) => state.selectConcept);

  const search = useCallback(
    async (query: string) => {
      await searchAction(query, language);
    },
    [searchAction, language]
  );

  const selectConcept = useCallback(
    async (concept: KnowledgeConcept) => {
      await selectAction(concept, language);
    },
    [selectAction, language]
  );

  return {
    searchResults,
    activeConcept,
    history,
    isLoading,
    search,
    selectConcept,
    clearActive,
    clearHistory,
    clearResults,
  };
};
