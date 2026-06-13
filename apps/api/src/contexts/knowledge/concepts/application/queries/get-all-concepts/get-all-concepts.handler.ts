import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllConceptsQuery } from './get-all-concepts.query';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';

@QueryHandler(GetAllConceptsQuery)
export class GetAllConceptsHandler implements IQueryHandler<GetAllConceptsQuery, any[]> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetAllConceptsQuery): Promise<any[]> {
    const { userId, sourceType } = query;
    return this.prisma.knowledgeConcept.findMany({
      where: {
        userId,
        ...(sourceType ? { sourceType } : {}),
      },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { flashcards: true },
        },
      },
    });
  }
}
