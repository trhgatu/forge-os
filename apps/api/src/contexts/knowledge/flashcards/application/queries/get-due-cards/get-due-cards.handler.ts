import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDueCardsQuery } from './get-due-cards.query';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';

@QueryHandler(GetDueCardsQuery)
export class GetDueCardsHandler implements IQueryHandler<GetDueCardsQuery, any[]> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetDueCardsQuery): Promise<any[]> {
    const now = new Date();
    return this.prisma.userFlashcard.findMany({
      where: {
        userId: query.userId,
        ...(query.deckId ? { deckId: query.deckId } : {}),
        nextReviewDate: {
          lte: now,
        },
      },
      include: {
        vocabulary: true,
        concept: {
          select: { title: true, id: true },
        },
      },
      orderBy: { nextReviewDate: 'asc' },
    });
  }
}
