import { Quest } from '../../domain/quest.entity';

export class QuestPresenter {
  static toResponse(quest: Quest) {
    return {
      id: quest.id,
      userId: quest.userId,
      title: quest.title,
      description: quest.description,
      type: quest.type,
      xpReward: quest.xpReward,
      isActive: quest.isActive,
      objectives: quest.objectives.map((obj) => ({
        id: obj.id,
        questId: obj.questId,
        type: obj.type,
        targetCount: obj.targetCount,
        referenceType: obj.referenceType,
        referenceId: obj.referenceId,
      })),
      createdAt: quest.createdAt.toISOString(),
      updatedAt: quest.updatedAt.toISOString(),
    };
  }

  static toResponseArray(quests: Quest[]) {
    return quests.map((quest) => this.toResponse(quest));
  }
}
