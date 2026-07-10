import { GamifiedEvent, GamificationProgress } from '../../../../../shared/interfaces';

export class ConceptModifiedEvent implements GamifiedEvent {
  constructor(
    public readonly conceptId: string,
    public readonly userId: string,
  ) {}

  getUserId(): string {
    return this.userId;
  }

  getGamificationProgresses(): GamificationProgress[] {
    return [
      {
        actionType: 'UPDATE_KNOWLEDGE',
        amount: 1,
        referenceId: this.conceptId,
      },
    ];
  }
}
