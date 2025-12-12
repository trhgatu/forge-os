"use client";

import { createContext, useContext, useState } from "react";
import { View } from "@/shared/types/os";

interface NovaViewContextValue {
  currentView: View;
  setCurrentView: (v: View) => void;
}

const NovaViewContext = createContext<NovaViewContextValue>({
  currentView: View.DEFAULT,
  setCurrentView: () => {},
});

export function NovaViewProvider({ children }: { children: React.ReactNode }) {
  const [currentView, setCurrentView] = useState<View>(View.DEFAULT);

  return (
    <NovaViewContext.Provider value={{ currentView, setCurrentView }}>
      {children}
    </NovaViewContext.Provider>
  );
}

export const useNovaView = () => useContext(NovaViewContext);
