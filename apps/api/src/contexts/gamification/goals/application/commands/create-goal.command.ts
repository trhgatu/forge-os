import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

export interface GoalObjectiveInput {
  type: string;
  targetCount: number;
  referenceId?: string | null;
}

export class CreateGoalCommand {
  constructor(
    public readonly userId: string | null, // null for Global Goals, String for user-specific
    public readonly title: string,
    public readonly description: string | undefined,
    public readonly xpReward: number | undefined,
    public readonly badgeIcon: string | undefined,
    public readonly objectives: GoalObjectiveInput[],
  ) {}
}

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
