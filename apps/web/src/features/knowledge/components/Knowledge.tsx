'use client';

import { KnowledgeProvider } from '../../../contexts/KnowledgeContext';

import KnowledgeContent from './KnowledgeContent';

export function Knowledge({ slug }: { slug?: string[] }) {
  return (
    <KnowledgeProvider>
      <KnowledgeContent slug={slug} />
    </KnowledgeProvider>
  );
}


