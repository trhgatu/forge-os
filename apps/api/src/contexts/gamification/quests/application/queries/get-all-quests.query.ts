import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';

export class GetAllQuestsQuery {
  constructor(
    public readonly type?: string,
    public readonly isActive?: boolean,
  ) {}
}

@QueryHandler(GetAllQuestsQuery)
export class GetAllQuestsHandler implements IQueryHandler<GetAllQuestsQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetAllQuestsQuery): Promise<any[]> {
    const where: any = {};
    if (query.type) where.type = query.type;
    if (query.isActive !== undefined) where.isActive = query.isActive;

    return this.prisma.quest.findMany({
      where,
      include: {
        objectives: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
