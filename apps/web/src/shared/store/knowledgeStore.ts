import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { searchWikipedia, getConceptDetails, scrapeUrl } from '@/features/knowledge/services';
import type { KnowledgeConcept } from '@/shared/types';

interface KnowledgeState {
  searchResults: KnowledgeConcept[];
  activeConcept: KnowledgeConcept | null;
  history: KnowledgeConcept[];
  savedConcepts: KnowledgeConcept[];
  isLoading: boolean;

  // Actions
  search: (query: string, lang: string) => Promise<void>;
  selectConcept: (concept: KnowledgeConcept, systemLang: string) => Promise<void>;
  clearActive: () => void;
  clearHistory: () => void;
  clearResults: () => void;

  // Database-backed Actions
  loadSavedConcepts: () => Promise<void>;
  saveConcept: (concept: KnowledgeConcept) => Promise<void>;
  deleteConcept: (id: string) => Promise<void>;

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
      savedConcepts: [],
      isLoading: false,

      search: async (query: string, lang: string) => {
        set({ isLoading: true });
        try {
          const trimmed = query.trim();
          if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
            const scraped = await scrapeUrl(trimmed);
            set({
              searchResults: [
                {
                  id: `scraped-${Date.now()}`,
                  title: scraped.title,
                  summary: scraped.summary,
                  content: scraped.content,
                  url: trimmed,
                  language: lang,
                  createdAt: new Date().toISOString(),
                  metadata: {
                    categories: [],
                    keywords: [],
                  },
                },
              ],
            });
          } else {
            const results = await searchWikipedia(trimmed, lang);
            set({ searchResults: results });
          }
        } catch (error) {
          console.error('Search failed:', error);
          set({ searchResults: [] });
        } finally {
          set({ isLoading: false });
        }
      },

      selectConcept: async (concept: KnowledgeConcept, systemLang: string) => {
        set({ isLoading: true });
        try {
          // If the concept is already in the database and has a UUID, we can load it from the database!
          const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(concept.id);
          let fullConcept: KnowledgeConcept | null = null;

          if (isUuid) {
            const { getConceptDetailsFromDb } = await import('@/features/knowledge/services');
            try {
              fullConcept = await getConceptDetailsFromDb(concept.id);
            } catch (dbErr) {
              console.warn('Failed to load from DB, falling back to Wikipedia/Search details', dbErr);
            }
          }

          if (!fullConcept) {
            // Check if it's in savedConcepts
            const saved = get().savedConcepts.find(
              (c) => c.id === concept.id || c.title.toLowerCase().trim() === concept.title.toLowerCase().trim()
            );
            if (saved) {
              fullConcept = saved;
            }
          }

          if (!fullConcept) {
            const lang = concept.language || systemLang;
            // Check if it was scraped content
            if (concept.url && !concept.url.includes('wikipedia.org')) {
              fullConcept = concept;
            } else {
              fullConcept = await getConceptDetails(concept.title, lang);
            }
          }

          if (fullConcept) {
            set({ activeConcept: fullConcept });

            // Update History
            const currentHistory = get().history;
            const exists = currentHistory.some(
              (h) => h.title === fullConcept!.title && h.language === fullConcept!.language,
            );

            if (!exists) {
              const newHistory = [fullConcept, ...currentHistory].slice(0, 10);
              set({ history: newHistory, searchResults: [] });
            } else {
              set({ searchResults: [] });
            }
          } else {
            console.warn('Concept details not found for:', concept.title);
            set({ searchResults: [] });
          }
        } catch (error) {
          console.error('Select concept failed:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      clearActive: () => set({ activeConcept: null }),
      clearHistory: () => set({ history: [] }),
      clearResults: () => set({ searchResults: [] }),

      // Database actions
      loadSavedConcepts: async () => {
        set({ isLoading: true });
        const { getConceptsFromDb } = await import('@/features/knowledge/services');
        try {
          const concepts = await getConceptsFromDb();
          set({ savedConcepts: concepts });
        } catch (error) {
          console.error('Load saved concepts failed:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      saveConcept: async (concept: KnowledgeConcept) => {
        set({ isLoading: true });
        const { saveConceptToDb } = await import('@/features/knowledge/services');
        try {
          let sourceEnum: 'WIKIPEDIA' | 'WEB_ARTICLE' | 'CODEX_BOOK' | 'PERSONAL_NOTE' = 'WIKIPEDIA';
          if (concept.id && concept.id.startsWith('custom-')) {
            sourceEnum = 'PERSONAL_NOTE';
          } else if (concept.url && !concept.url.includes('wikipedia.org')) {
            sourceEnum = 'WEB_ARTICLE';
          }
          const dbConcept = await saveConceptToDb({
            title: concept.title,
            sourceType: sourceEnum,
            sourceUrl: concept.url,
            content: concept.content || concept.extract || '',
            summary: concept.summary,
          });

          set((state) => ({
            savedConcepts: [dbConcept, ...state.savedConcepts],
            // Update activeConcept to have the DB generated UUID
            activeConcept: state.activeConcept?.title === concept.title ? { ...state.activeConcept, id: dbConcept.id } : state.activeConcept,
          }));
        } catch (error) {
          console.error('Save concept failed:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      deleteConcept: async (id: string) => {
        set({ isLoading: true });
        const { deleteConceptFromDb } = await import('@/features/knowledge/services');
        try {
          await deleteConceptFromDb(id);
          set((state) => ({
            savedConcepts: state.savedConcepts.filter((c) => c.id !== id),
            activeConcept: state.activeConcept?.id === id ? null : state.activeConcept,
          }));
        } catch (error) {
          console.error('Delete concept failed:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      // Discovery
      discoveryItems: [],
      loadDiscovery: async (lang: string) => {
        const currentItems = get().discoveryItems;
        const currentLang = currentItems[0]?.language;

        if (currentItems.length > 0 && currentLang === lang) return;
        if (get().isLoading) return;

        set({ isLoading: true });
        const { getRandomConcepts } = await import('@/features/knowledge/services');
        try {
          const items = await getRandomConcepts(lang, 15);
          if (items.length > 0) {
            set({ discoveryItems: items });
          }
        } catch (e) {
          console.error('Discovery load failed', e);
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'forge-knowledge-storage',
      partialize: (state) => ({
        history: state.history,
      }),
    },
  ),
);


