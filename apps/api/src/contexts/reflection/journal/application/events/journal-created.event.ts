import { JournalId } from '../../domain/value-objects/journal-id.vo';
import { GamifiedEvent, GamificationProgress } from '@shared/interfaces';

export class JournalCreatedEvent implements GamifiedEvent {
  constructor(
    public readonly id: JournalId,
    public readonly userId: string,
  ) {}

  getUserId(): string {
    return this.userId;
  }

  getGamificationProgresses(): GamificationProgress[] {
    return [
      {
        actionType: 'CREATE_JOURNAL',
        amount: 1,
        referenceId: this.id.value,
      },
    ];
  }
}
