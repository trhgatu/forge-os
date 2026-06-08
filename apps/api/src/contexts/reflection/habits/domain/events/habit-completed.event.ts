import { GamifiedEvent, GamificationProgress } from '@shared/interfaces';

export class HabitCompletedEvent implements GamifiedEvent {
  constructor(
    public readonly userId: string,
    public readonly habitId: string,
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
}
