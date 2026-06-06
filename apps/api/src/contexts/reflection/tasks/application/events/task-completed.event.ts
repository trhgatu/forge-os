import { GamifiedEvent, GamificationProgress } from '@shared/interfaces';

export class TaskCompletedEvent implements GamifiedEvent {
  constructor(
    public readonly userId: string,
    public readonly taskId: string,
  ) {}

  getUserId(): string {
    return this.userId;
  }

  getGamificationProgresses(): GamificationProgress[] {
    return [
      {
        actionType: 'COMPLETE_TASK',
        amount: 1,
        referenceId: this.taskId,
      },
    ];
  }
}
