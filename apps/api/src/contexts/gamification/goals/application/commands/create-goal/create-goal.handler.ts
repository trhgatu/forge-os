import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateGoalCommand } from './create-goal.command';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@CommandHandler(CreateGoalCommand)
export class CreateGoalHandler implements ICommandHandler<CreateGoalCommand> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: CreateGoalCommand) {
    const { userId, title, description, xpReward, badgeIcon, objectives } = command;
    const goalId = uuidv4();

    return this.prisma.goal.create({
      data: {
        id: goalId,
        userId: userId || null,
        title,
        description: description || null,
        xpReward: xpReward ?? 1000,
        badgeIcon: badgeIcon || null,
        isActive: true,
        objectives: {
          create: objectives.map((o) => ({
            id: uuidv4(),
            type: o.type,
            targetCount: o.targetCount,
            referenceId: o.referenceId || null,
          })),
        },
      },
      include: {
        objectives: true,
      },
    });
  }
}
