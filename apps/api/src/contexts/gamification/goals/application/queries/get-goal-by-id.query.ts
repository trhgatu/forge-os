import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

export class GetGoalByIdQuery {
  constructor(
    public readonly goalId: string,
    public readonly userId?: string,
  ) {}
}

@QueryHandler(GetGoalByIdQuery)
export class GetGoalByIdHandler implements IQueryHandler<GetGoalByIdQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetGoalByIdQuery) {
    const { goalId, userId } = query;

    const goal = await this.prisma.goal.findUnique({
      where: { id: goalId },
      include: {
        objectives: true,
      },
    });

    if (!goal) {
      throw new NotFoundException(`Epic Goal with ID ${goalId} not found`);
    }

    if (!userId) {
      return goal;
    }

    // Map single goal progress
    const statusDoc = await this.prisma.userGoalStatus.findUnique({
      where: {
        userId_goalId: {
          userId,
          goalId,
        },
      },
    });

    const objectivesProgress: any[] = [];
    for (const obj of goal.objectives) {
      const progress = await this.prisma.userGoalProgress.findUnique({
        where: {
          userId_objectiveId: {
            userId,
            objectiveId: obj.id,
          },
        },
      });

      objectivesProgress.push({
        id: obj.id,
        type: obj.type,
        targetCount: obj.targetCount,
        referenceId: obj.referenceId,
        currentCount: progress?.currentCount || 0,
        isCompleted: progress?.isCompleted || false,
      });
    }

    return {
      id: goal.id,
      title: goal.title,
      description: goal.description,
      xpReward: goal.xpReward,
      badgeIcon: goal.badgeIcon,
      isActive: goal.isActive,
      isCompleted: statusDoc?.status === 'completed',
      completedAt: statusDoc?.completedAt || null,
      objectives: objectivesProgress,
    };
  }
}
