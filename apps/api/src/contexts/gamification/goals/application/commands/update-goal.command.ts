import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { GoalObjectiveInput } from './create-goal.command';

export class UpdateGoalCommand {
  constructor(
    public readonly goalId: string,
    public readonly title: string | undefined,
    public readonly description: string | undefined,
    public readonly xpReward: number | undefined,
    public readonly badgeIcon: string | undefined,
    public readonly isActive: boolean | undefined,
    public readonly objectives: GoalObjectiveInput[] | undefined,
  ) { }
}

@CommandHandler(UpdateGoalCommand)
export class UpdateGoalHandler implements ICommandHandler<UpdateGoalCommand> {
  constructor(private readonly prisma: PrismaService) { }

  async execute(command: UpdateGoalCommand) {
    const { goalId, title, description, xpReward, badgeIcon, isActive, objectives } = command;

    const goal = await this.prisma.goal.findUnique({
      where: { id: goalId },
    });

    if (!goal) {
      throw new NotFoundException(`Epic Goal with ID ${goalId} not found`);
    }

    return this.prisma.$transaction(async (tx) => {
      const updatedGoal = await tx.goal.update({
        where: { id: goalId },
        data: {
          title: title !== undefined ? title : undefined,
          description: description !== undefined ? description : undefined,
          xpReward: xpReward !== undefined ? xpReward : undefined,
          badgeIcon: badgeIcon !== undefined ? badgeIcon : undefined,
          isActive: isActive !== undefined ? isActive : undefined,
        },
      });

      if (objectives !== undefined) {
        await tx.goalObjective.deleteMany({
          where: { goalId },
        });

        await tx.goalObjective.createMany({
          data: objectives.map((o) => ({
            id: uuidv4(),
            goalId,
            type: o.type,
            targetCount: o.targetCount,
            referenceId: o.referenceId || null,
          })),
        });
      }

      return tx.goal.findUnique({
        where: { id: goalId },
        include: {
          objectives: true,
        },
      });
    });
  }
}
