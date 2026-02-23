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

  // Discovery
  discoveryItems: KnowledgeConcept[];
  loadDiscovery: (lang: string) => Promise<void>;
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
          } else {
            console.warn("Concept details not found for:", concept.title);
            // Optionally set an error state or keeping the current state but stopping loading
            set({ searchResults: [] });
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

      // Discovery
      discoveryItems: [],
      loadDiscovery: async (lang: string) => {
        // Guard: Check if we already have items or are currently loading (partial implementation)
        // Since we don't have isDiscoveryLoading, we check the length as a proxy for "already loaded"
        if (get().discoveryItems.length >= 10) return;

        // Dynamically import to separate logic
        const { getRandomConcepts } = await import("@/features/knowledge/services");
        try {
          const items = await getRandomConcepts(lang, 20);
          // Only update if we still need them
          if (get().discoveryItems.length < 10) {
            set({ discoveryItems: items });
          }
        } catch (e) {
          console.error("Discovery load failed", e);
        }
      },
    }),
    {
      name: "forge-knowledge-storage",
      partialize: (state) => ({
        history: state.history,
        // Optional: persist discovery items too if desired
        discoveryItems: state.discoveryItems,
      }),
    }
  )
);
