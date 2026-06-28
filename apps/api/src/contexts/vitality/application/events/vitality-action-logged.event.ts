import { GamifiedEvent, GamificationProgress } from '../../../../shared/interfaces';

export class VitalityActionLoggedEvent implements GamifiedEvent {
  constructor(
    public readonly logId: string,
    public readonly userId: string,
    public readonly type: string,
    public readonly value: number,
  ) {}

  getUserId(): string {
    return this.userId;
  }

  getGamificationProgresses(): GamificationProgress[] {
    let actionType = '';
    if (this.type === 'HYDRATION') actionType = 'LOG_HYDRATION';
    else if (this.type === 'SLEEP') actionType = 'LOG_SLEEP';
    else if (this.type === 'WORKOUT') actionType = 'COMPLETE_WORKOUT';

    if (!actionType) return [];

    return [
      {
        actionType,
        amount: 1,
        referenceId: this.logId,
      },
    ];
  }
}
