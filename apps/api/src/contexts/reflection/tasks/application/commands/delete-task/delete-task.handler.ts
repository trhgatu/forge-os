import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTaskCommand } from './delete-task.command';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteTaskCommand)
export class DeleteTaskHandler implements ICommandHandler<DeleteTaskCommand> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: DeleteTaskCommand) {
    const { userId, id } = command;

    const task = await this.prisma.task.findFirst({
      where: {
        id,
        userId,
        isDeleted: false,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return this.prisma.task.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  }
}
