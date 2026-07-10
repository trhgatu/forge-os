import { GamifiedEvent, GamificationProgress } from '@shared/interfaces';

export class TransactionCreatedEvent implements GamifiedEvent {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly type: string,
    public readonly categoryType: string,
    public readonly isApprovedByWill: boolean,
    public readonly hasReflection: boolean,
  ) {}

  getUserId(): string {
    return this.userId;
  }

  getGamificationProgresses(): GamificationProgress[] {
    const progresses: GamificationProgress[] = [
      {
        actionType: 'LOG_TRANSACTION',
        amount: 1,
        referenceId: this.id,
      },
    ];

    if (this.hasReflection) {
      progresses.push({
        actionType: 'CREATE_REFLECTION',
        amount: 1,
        referenceId: this.id,
      });
    }

    return progresses;
  }
}
