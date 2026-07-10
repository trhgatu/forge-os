import { GamifiedEvent, GamificationProgress, NotificationEvent } from '@shared/interfaces';

export class RoutineCompletedEvent implements GamifiedEvent, NotificationEvent {
  constructor(
    public readonly userId: string,
    public readonly routineId: string,
    public readonly routineTitle: string,
    public readonly comboXp: number,
    public readonly completedAt: Date,
  ) {}

  getUserId(): string {
    return this.userId;
  }

  getGamificationProgresses(): GamificationProgress[] {
    return [
      {
        actionType: 'COMPLETE_ROUTINE',
        amount: 1,
        referenceId: this.routineId,
      },
    ];
  }

  getNotificationPayload() {
    return {
      type: 'ROUTINE_COMPLETED',
      title: 'Routine Completed! 🏆',
      description: `You've completed the routine chain "${this.routineTitle}" and earned ${this.comboXp} XP Combo!`,
      xp: this.comboXp,
      metadata: {
        routineId: this.routineId,
        completedAt: this.completedAt,
      },
    };
  }
}
