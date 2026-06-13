import { GamifiedEvent, GamificationProgress } from '../../../../../shared/interfaces';
import { MoodId } from '../../domain/value-objects/mood-id.vo';

export class MoodLoggedEvent implements GamifiedEvent {
  constructor(
    public readonly moodId: MoodId,
    public readonly userId: string,
    public readonly mood: string,
  ) {}

  getUserId(): string {
    return this.userId;
  }

  getGamificationProgresses(): GamificationProgress[] {
    return [
      {
        actionType: 'LOG_MOOD',
        amount: 1,
        referenceId: this.moodId.value,
      },
    ];
  }
}
