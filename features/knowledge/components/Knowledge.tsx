"use client";

import KnowledgeContent from "./KnowledgeContent";
import { KnowledgeProvider } from "../../../contexts/KnowledgeContext";

export function Knowledge() {
  return (
    <KnowledgeProvider>
      <KnowledgeContent />
    </KnowledgeProvider>
  );
}
