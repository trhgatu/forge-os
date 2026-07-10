import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetRecurringTransactionsQuery } from './get-recurring.query';
import { WealthRepository } from '../../../domain/wealth.repository';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';

@QueryHandler(GetRecurringTransactionsQuery)
export class GetRecurringTransactionsHandler implements IQueryHandler<
  GetRecurringTransactionsQuery,
  any[]
> {
  constructor(
    private readonly wealthRepo: WealthRepository,
    private readonly prisma: PrismaService,
  ) {}

  async execute(query: GetRecurringTransactionsQuery): Promise<any[]> {
    return this.prisma.recurringTransaction.findMany({
      where: { userId: query.userId },
      include: {
        account: {
          select: { name: true, type: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
