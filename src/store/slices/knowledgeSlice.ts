import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { KnowledgeConcept } from "@/shared/types";
import { searchWikipedia, getConceptDetails } from "@/features/knowledge/services";

interface KnowledgeState {
  searchResults: KnowledgeConcept[];
  activeConcept: KnowledgeConcept | null;
  history: KnowledgeConcept[];
  isLoading: boolean;
}

const initialState: KnowledgeState = {
  searchResults: [],
  activeConcept: null,
  history: [],
  isLoading: false,
};

export const searchKnowledge = createAsyncThunk(
  "knowledge/search",
  async ({ query, lang }: { query: string; lang: string }) => {
    return await searchWikipedia(query, lang);
  }
);

export const selectConcept = createAsyncThunk(
  "knowledge/select",
  async ({ concept, systemLang }: { concept: KnowledgeConcept; systemLang: string }) => {
    const lang = concept.language || systemLang;
    const fullConcept = await getConceptDetails(concept.title, lang);
    if (fullConcept) fullConcept.language = lang;
    return fullConcept;
  }
);

export const knowledgeSlice = createSlice({
  name: "knowledge",
  initialState,
  reducers: {
    clearActive: (state) => {
      state.activeConcept = null;
    },
    clearHistory: (state) => {
      state.history = [];
    },
    clearResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchKnowledge.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchKnowledge.fulfilled, (state, action: PayloadAction<KnowledgeConcept[]>) => {
        state.searchResults = action.payload;
        state.isLoading = false;
      })
      .addCase(selectConcept.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(selectConcept.fulfilled, (state, action: PayloadAction<KnowledgeConcept | null>) => {
        if (action.payload) {
          state.activeConcept = action.payload;
          state.searchResults = [];

          const exists = state.history.some((h) => h.title === action.payload?.title);
          if (!exists) {
            state.history.unshift(action.payload);
            if (state.history.length > 10) state.history.pop();
          }
        }
        state.isLoading = false;
      });
  },
});

export const { clearActive, clearHistory, clearResults } = knowledgeSlice.actions;
export default knowledgeSlice.reducer;
