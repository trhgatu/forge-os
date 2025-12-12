import { configureStore } from "@reduxjs/toolkit";
import knowledgeReducer from "./slices/knowledgeSlice";

export const store = configureStore({
  reducer: {
    knowledge: knowledgeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
