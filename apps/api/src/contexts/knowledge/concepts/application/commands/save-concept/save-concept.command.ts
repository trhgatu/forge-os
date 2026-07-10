import { KnowledgeSourceType } from '@prisma/client';

export interface SaveConceptPayload {
  userId: string;
  title: string;
  sourceType: KnowledgeSourceType;
  sourceUrl?: string;
  content: string;
  summary?: string;
}

export class SaveConceptCommand {
  constructor(public readonly payload: SaveConceptPayload) {}
}
