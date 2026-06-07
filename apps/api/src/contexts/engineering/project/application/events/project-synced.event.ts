import { ProjectId } from '../../domain/value-objects/project-id.vo';
import { GamifiedEvent, GamificationProgress } from '@shared/interfaces';

export class ProjectSyncedEvent implements GamifiedEvent {
  constructor(
    public readonly projectId: ProjectId,
    public readonly userId: string,
  ) {}

  getUserId(): string {
    return this.userId;
  }

  getGamificationProgresses(): GamificationProgress[] {
    return [
      {
        actionType: 'SYNC_PROJECT',
        amount: 1,
        referenceId: this.projectId.value,
      },
    ];
  }
}
