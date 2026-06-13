import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDecksQuery } from './get-decks.query';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';

@QueryHandler(GetDecksQuery)
export class GetDecksHandler implements IQueryHandler<GetDecksQuery, any[]> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetDecksQuery): Promise<any[]> {
    return this.prisma.flashcardDeck.findMany({
      where: { userId: query.userId },
      include: {
        _count: {
          select: { cards: true },
        },
      },
    });
  }
}
