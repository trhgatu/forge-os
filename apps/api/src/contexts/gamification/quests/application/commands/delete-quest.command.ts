import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { QuestsRepository } from '../../domain/quests.repository';
import { NotFoundException } from '@nestjs/common';

export class DeleteQuestCommand {
  constructor(public readonly id: string) {}
}

@CommandHandler(DeleteQuestCommand)
export class DeleteQuestHandler implements ICommandHandler<DeleteQuestCommand> {
  constructor(private readonly repository: QuestsRepository) {}

  async execute(command: DeleteQuestCommand): Promise<void> {
    const quest = await this.repository.findQuestById(command.id);
    if (!quest) {
      throw new NotFoundException('Quest not found');
    }

    quest.isActive = false;
    await this.repository.saveQuest(quest);
  }
}
