import { GamifiedEvent, GamificationProgress } from '@shared/interfaces';

export class TransactionReflectionUpdatedEvent implements GamifiedEvent {
  constructor(
    public readonly id: string,
    public readonly userId: string,
  ) {}

  getUserId(): string {
    return this.userId;
  }

  getGamificationProgresses(): GamificationProgress[] {
    return [
      {
        actionType: 'CREATE_REFLECTION',
        amount: 1,
        referenceId: this.id,
      },
    ];
  }
}
