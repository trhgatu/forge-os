import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteGoalCommand } from './delete-goal.command';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteGoalCommand)
export class DeleteGoalHandler implements ICommandHandler<DeleteGoalCommand, void> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: DeleteGoalCommand): Promise<void> {
    const { goalId } = command;

    const goal = await this.prisma.goal.findUnique({
      where: { id: goalId },
    });

    if (!goal) {
      throw new NotFoundException(`Epic Goal with ID ${goalId} not found`);
    }

    await this.prisma.goal.delete({
      where: { id: goalId },
    });
  }
}
