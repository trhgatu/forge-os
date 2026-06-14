import { GamifiedEvent, GamificationProgress, NotificationEvent } from '@shared/interfaces';

export class HabitCompletedEvent implements GamifiedEvent, NotificationEvent {
  constructor(
    public readonly userId: string,
    public readonly habitId: string,
    public readonly habitTitle: string,
    public readonly xpReward: number,
    public readonly completedAt: Date,
  ) {}

  getUserId(): string {
    return this.userId;
  }

  getGamificationProgresses(): GamificationProgress[] {
    return [
      {
        actionType: 'CHECK_HABIT',
        amount: 1,
        referenceId: this.habitId,
      },
    ];
  }

  getNotificationPayload() {
    return {
      type: 'HABIT_COMPLETED',
      title: 'Habit Completed! ⚡',
      description: `You've checked off "${this.habitTitle}" and earned ${this.xpReward} XP!`,
      xp: this.xpReward,
      metadata: {
        habitId: this.habitId,
        completedAt: this.completedAt,
      },
    };
  }
}
