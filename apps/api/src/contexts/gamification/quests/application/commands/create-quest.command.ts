import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { QuestsRepository } from '../../domain/quests.repository';
import { Quest, QuestObjective } from '../../domain/quest.entity';
import { v4 as uuidv4 } from 'uuid';

export interface ObjectiveInput {
  type: string;
  targetCount: number;
  referenceType: string;
  referenceId?: string | null;
}

export class CreateQuestCommand {
  constructor(
    public readonly userId: string | null,
    public readonly title: string,
    public readonly description: string | undefined,
    public readonly type: string | undefined,
    public readonly xpReward: number | undefined,
    public readonly objectives: ObjectiveInput[],
  ) {}
}

@CommandHandler(CreateQuestCommand)
export class CreateQuestHandler implements ICommandHandler<CreateQuestCommand> {
  constructor(private readonly repository: QuestsRepository) {}

  async execute(command: CreateQuestCommand): Promise<Quest> {
    const { userId, title, description, type, xpReward, objectives } = command;

    const questId = uuidv4();
    const mappedObjectives = objectives.map(
      (o) =>
        new QuestObjective(
          uuidv4(),
          questId,
          o.type,
          o.targetCount,
          o.referenceType,
          o.referenceId ?? null,
        ),
    );

    const quest = Quest.create({
      id: questId,
      userId,
      title,
      description,
      type,
      xpReward,
      objectives: mappedObjectives,
    });

    await this.repository.saveQuest(quest);
    return quest;
  }
}
