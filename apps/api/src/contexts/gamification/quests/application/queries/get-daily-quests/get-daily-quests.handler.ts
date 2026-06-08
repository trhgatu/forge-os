import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetDailyQuestsQuery } from './get-daily-quests.query';
import { QuestsRepository } from '../../../domain/quests.repository';
import { UserObjectiveProgress } from '../../../domain/quest.entity';
import { v4 as uuidv4 } from 'uuid';

@QueryHandler(GetDailyQuestsQuery)
export class GetDailyQuestsHandler implements IQueryHandler<GetDailyQuestsQuery> {
  constructor(private readonly repository: QuestsRepository) {}

  async execute(query: GetDailyQuestsQuery): Promise<any[]> {
    const { userId } = query;
    const todayStr = new Date().toISOString().split('T')[0];

    const quests = await this.repository.findAllActiveQuests(userId);
    const result: any[] = [];

    for (const quest of quests) {
      const isCompleted = await this.repository.isQuestCompleted(userId, quest.id);

      const objectivesProgress: any[] = [];
      for (const obj of quest.objectives) {
        const dateLimit = quest.type === 'daily' ? todayStr : null;

        let progress = await this.repository.findObjectiveProgress(userId, obj.id, dateLimit);

        if (!progress) {
          progress = new UserObjectiveProgress(uuidv4(), userId, obj.id, 0, false, dateLimit);
          await this.repository.saveObjectiveProgress(progress);
        }

        objectivesProgress.push({
          id: obj.id,
          type: obj.type,
          targetCount: obj.targetCount,
          referenceType: obj.referenceType,
          referenceId: obj.referenceId,
          currentCount: progress.currentCount,
          isCompleted: progress.isCompleted,
        });
      }

      result.push({
        id: quest.id,
        title: quest.title,
        description: quest.description,
        type: quest.type,
        xpReward: quest.xpReward,
        isCompleted,
        objectives: objectivesProgress,
      });
    }

    return result;
  }
}
