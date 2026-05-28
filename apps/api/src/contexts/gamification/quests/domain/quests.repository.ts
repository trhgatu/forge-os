import { Quest, UserObjectiveProgress } from './quest.entity';

export abstract class QuestsRepository {
  abstract saveQuest(quest: Quest): Promise<void>;
  abstract findQuestById(id: string): Promise<Quest | null>;
  abstract findAllActiveQuests(userId: string): Promise<Quest[]>;
  abstract findObjectiveProgress(
    userId: string,
    objectiveId: string,
    date: string | null,
  ): Promise<UserObjectiveProgress | null>;
  abstract findActiveObjectiveProgresses(
    userId: string,
    actionType: string,
  ): Promise<UserObjectiveProgress[]>;
  abstract saveObjectiveProgress(progress: UserObjectiveProgress): Promise<void>;
  abstract completeQuest(userId: string, questId: string): Promise<void>;
  abstract isQuestCompleted(userId: string, questId: string): Promise<boolean>;
}
