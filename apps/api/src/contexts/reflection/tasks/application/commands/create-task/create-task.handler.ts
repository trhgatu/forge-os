import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTaskCommand } from './create-task.command';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: CreateTaskCommand) {
    const { userId, dto } = command;
    return this.prisma.task.create({
      data: {
        userId,
        title: dto.title,
        description: dto.description,
        priority: dto.priority || 'medium',
        xpReward: dto.xpReward ?? 15,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
      },
    });
  }
}
