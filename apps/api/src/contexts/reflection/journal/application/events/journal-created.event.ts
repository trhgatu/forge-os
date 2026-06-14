import { JournalId } from '../../domain/value-objects/journal-id.vo';
import { GamifiedEvent, GamificationProgress, NotificationEvent } from '@shared/interfaces';

export class JournalCreatedEvent implements GamifiedEvent, NotificationEvent {
  constructor(
    public readonly id: JournalId,
    public readonly userId: string,
    public readonly title: string,
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

  getNotificationPayload() {
    return {
      type: 'JOURNAL_CREATED',
      title: 'Reflection Sealed! 📝',
      description: `You've successfully saved and sealed "${this.title || 'Untitled reflection'}".`,
      metadata: {
        journalId: this.id.value,
      },
    };
  }
}
