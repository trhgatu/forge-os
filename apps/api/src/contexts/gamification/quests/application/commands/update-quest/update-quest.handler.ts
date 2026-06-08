import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateQuestCommand } from './update-quest.command';
import { QuestsRepository } from '../../../domain/quests.repository';
import { Quest, QuestObjective } from '../../../domain/quest.entity';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@CommandHandler(UpdateQuestCommand)
export class UpdateQuestHandler implements ICommandHandler<UpdateQuestCommand> {
  constructor(private readonly repository: QuestsRepository) {}

  async execute(command: UpdateQuestCommand): Promise<Quest> {
    const { id, title, description, type, xpReward, objectives } = command;

    const quest = await this.repository.findQuestById(id);
    if (!quest) {
      throw new NotFoundException('Quest not found');
    }

    quest.title = title;
    quest.description = description ?? null;
    if (type !== undefined) quest.type = type;
    if (xpReward !== undefined) quest.xpReward = xpReward;

    quest.objectives = objectives.map(
      (o) =>
        new QuestObjective(
          o.id || uuidv4(),
          quest.id,
          o.type,
          o.targetCount,
          o.referenceType,
          o.referenceId ?? null,
        ),
    );

    await this.repository.saveQuest(quest);
    return quest;
  }
}
