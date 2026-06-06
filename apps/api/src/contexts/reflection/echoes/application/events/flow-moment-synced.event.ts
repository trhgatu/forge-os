import { GamifiedEvent, GamificationProgress } from '@shared/interfaces';

export class FlowMomentSyncedEvent implements GamifiedEvent {
  constructor(
    public readonly userId: string,
    public readonly momentId: string,
  ) {}

  getUserId(): string {
    return this.userId;
  }

  getGamificationProgresses(): GamificationProgress[] {
    return [
      {
        actionType: 'WS_PRESENCE',
        amount: 1,
        referenceId: null,
      },
    ];
  }
}
