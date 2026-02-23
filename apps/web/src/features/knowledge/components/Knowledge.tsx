"use client";

import { KnowledgeProvider } from "../../../contexts/KnowledgeContext";

import KnowledgeContent from "./KnowledgeContent";

export function Knowledge() {
  return (
    <KnowledgeProvider>
      <KnowledgeContent />
    </KnowledgeProvider>
  );
}
