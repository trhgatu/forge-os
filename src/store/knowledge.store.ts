import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { KnowledgeConcept } from "@/shared/types";
import { searchWikipedia, getConceptDetails } from "@/features/knowledge/services";

interface KnowledgeState {
  searchResults: KnowledgeConcept[];
  activeConcept: KnowledgeConcept | null;
  history: KnowledgeConcept[];
  isLoading: boolean;

  // Actions
  search: (query: string, lang: string) => Promise<void>;
  selectConcept: (concept: KnowledgeConcept, systemLang: string) => Promise<void>;
  clearActive: () => void;
  clearHistory: () => void;
  clearResults: () => void;
}

export const useKnowledgeStore = create<KnowledgeState>()(
  persist(
    (set, get) => ({
      searchResults: [],
      activeConcept: null,
      history: [],
      isLoading: false,

      search: async (query: string, lang: string) => {
        set({ isLoading: true });
        try {
          const results = await searchWikipedia(query, lang);
          set({ searchResults: results });
        } catch (error) {
          console.error("Search failed:", error);
          set({ searchResults: [] });
        } finally {
          set({ isLoading: false });
        }
      },

      selectConcept: async (concept: KnowledgeConcept, systemLang: string) => {
        set({ isLoading: true });
        try {
          const lang = concept.language || systemLang;
          const fullConcept = await getConceptDetails(concept.title, lang);

          if (fullConcept) {
            fullConcept.language = lang;
            set({ activeConcept: fullConcept });

            // Update History
            const currentHistory = get().history;
            const exists = currentHistory.some(
              (h) => h.title === fullConcept.title && h.language === fullConcept.language
            );

            if (!exists) {
              const newHistory = [fullConcept, ...currentHistory].slice(0, 10);
              set({ history: newHistory, searchResults: [] });
            } else {
              set({ searchResults: [] });
            }
          }
        } catch (error) {
          console.error("Select concept failed:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      clearActive: () => set({ activeConcept: null }),
      clearHistory: () => set({ history: [] }),
      clearResults: () => set({ searchResults: [] }),
    }),
    {
      name: "forge-knowledge-storage",
      partialize: (state) => ({ history: state.history }), // Only persist history
    }
  )
);
