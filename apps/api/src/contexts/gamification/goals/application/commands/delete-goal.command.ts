import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

export class DeleteGoalCommand {
  constructor(public readonly goalId: string) {}
}

@CommandHandler(DeleteGoalCommand)
export class DeleteGoalHandler implements ICommandHandler<DeleteGoalCommand> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: DeleteGoalCommand): Promise<void> {
    const { goalId } = command;

    const goal = await this.prisma.goal.findUnique({
      where: { id: goalId },
    });

    if (!goal) {
      throw new NotFoundException(`Epic Goal with ID ${goalId} not found`);
    }

    // Prisma onDelete: Cascade will automatically clean up objectives and user progress/statuses!
    await this.prisma.goal.delete({
      where: { id: goalId },
    });
  }
}
