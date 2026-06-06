import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTasksQuery } from './get-tasks.query';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';

@QueryHandler(GetTasksQuery)
export class GetTasksHandler implements IQueryHandler<GetTasksQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetTasksQuery) {
    const { userId } = query;
    return this.prisma.task.findMany({
      where: {
        userId,
        isDeleted: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
