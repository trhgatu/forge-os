import { NotificationEvent } from '@shared/interfaces';

export class QuestCompletedEvent implements NotificationEvent {
  constructor(
    public readonly userId: string,
    public readonly questId: string,
    public readonly title: string,
    public readonly xpReward: number,
  ) {}

  getUserId(): string {
    return this.userId;
  }

  getNotificationPayload() {
    return {
      type: 'QUEST_COMPLETED',
      title: 'Quest Cleared! 🏆',
      description: `You've completed the quest "${this.title}" and earned ${this.xpReward} XP!`,
      xp: this.xpReward,
      metadata: {
        questId: this.questId,
      },
    };
  }
}
