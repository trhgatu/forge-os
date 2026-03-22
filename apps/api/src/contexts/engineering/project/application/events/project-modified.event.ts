import { ProjectId } from '../../domain/value-objects/project-id.vo';

export class ProjectModifiedEvent {
  constructor(
    public readonly projectId: ProjectId,
    public readonly action: 'create' | 'update' | 'delete' | 'restore' | 'soft-delete',
    public readonly userId: string,
  ) {}
}
