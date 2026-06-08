import { GamifiedEvent, GamificationProgress } from '@shared/interfaces';

export class RoutineCompletedEvent implements GamifiedEvent {
  constructor(
    public readonly userId: string,
    public readonly routineId: string,
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
}
