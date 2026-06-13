import { GamifiedEvent, GamificationProgress } from '../../../../../shared/interfaces';

export class ConceptCreatedEvent implements GamifiedEvent {
  constructor(
    public readonly conceptId: string,
    public readonly userId: string,
    public readonly sourceType: string,
  ) {}

  getUserId(): string {
    return this.userId;
  }

  getGamificationProgresses(): GamificationProgress[] {
    return [
      {
        actionType: 'CREATE_KNOWLEDGE',
        amount: 1,
        referenceId: this.conceptId,
      },
    ];
  }
}
