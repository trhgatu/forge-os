import { KnowledgeSourceType } from '@prisma/client';

export class GetAllConceptsQuery {
  constructor(
    public readonly userId: string,
    public readonly sourceType?: KnowledgeSourceType,
  ) {}
}
