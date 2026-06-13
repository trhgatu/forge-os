import { GamifiedEvent, GamificationProgress } from '@shared/interfaces';
import { MemoryId } from '../../domain/value-objects/memory-id.vo';

export class MemoryCreatedEvent implements GamifiedEvent {
  constructor(
    public readonly memoryId: MemoryId,
    public readonly userId: string,
  ) {}

  getUserId(): string {
    return this.userId;
  }

  getGamificationProgresses(): GamificationProgress[] {
    return [
      {
        actionType: 'CREATE_MEMORY',
        amount: 1,
        referenceId: this.memoryId.value,
      },
    ];
  }
}
