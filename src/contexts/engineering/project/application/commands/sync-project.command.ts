import { ProjectId } from '../../domain/value-objects/project-id.vo';

export class SyncProjectCommand {
  constructor(public readonly id: ProjectId) {}
}
