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
  const store = useKnowledgeStore();
  const { language } = useLanguage();

  const search = useCallback(
    async (query: string) => {
      await store.search(query, language);
    },
    [store, language]
  );

  const selectConcept = useCallback(
    async (concept: KnowledgeConcept) => {
      await store.selectConcept(concept, language);
    },
    [store, language]
  );

  return {
    searchResults: store.searchResults,
    activeConcept: store.activeConcept,
    history: store.history,
    isLoading: store.isLoading,

    search,
    selectConcept,

    clearActive: store.clearActive,
    clearHistory: store.clearHistory,
    clearResults: store.clearResults,
  };
};
