"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

import { TRANSLATIONS } from "@/shared/constants/translation";

export type Language = keyof typeof TRANSLATIONS;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    const segments = key.split(".");

    // strict no-any version
    let value: unknown = TRANSLATIONS[language];

    for (const seg of segments) {
      if (typeof value === "object" && value !== null && seg in value) {
        value = (value as Record<string, unknown>)[seg];
      } else {
        return key; // fallback
      }
    }

    return typeof value === "string" ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
