"use client";

import React, { useCallback } from "react";
import type { KnowledgeConcept } from "@/shared/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  searchKnowledge,
  selectConcept as reduxSelect,
  clearActive as reduxClearActive,
  clearHistory as reduxClearHistory,
  clearResults as reduxClearResults,
} from "@/store/slices/knowledgeSlice";
import { useLanguage } from "@/contexts/LanguageContext";

interface KnowledgeProviderProps {
  children: React.ReactNode;
}

export const KnowledgeProvider: React.FC<KnowledgeProviderProps> = ({ children }) => (
  <>{children}</>
);

export const useKnowledge = () => {
  const { searchResults, activeConcept, history, isLoading } = useAppSelector(
    (state) => state.knowledge
  );

  const dispatch = useAppDispatch();
  const { language } = useLanguage();

  /** -----------------------------
   *  Stable Functions (NO RECREATION)
   *  -----------------------------
   */

  const search = useCallback(
    async (query: string) => {
      await dispatch(searchKnowledge({ query, lang: language }));
    },
    [dispatch, language]
  );

  const selectConcept = useCallback(
    async (concept: KnowledgeConcept) => {
      await dispatch(reduxSelect({ concept, systemLang: language }));
    },
    [dispatch, language]
  );

  const clearActive = useCallback(() => dispatch(reduxClearActive()), [dispatch]);

  const clearHistory = useCallback(() => dispatch(reduxClearHistory()), [dispatch]);

  const clearResults = useCallback(() => dispatch(reduxClearResults()), [dispatch]);

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
