import { ProjectId } from '../../domain/value-objects/project-id.vo';

export class DeleteProjectCommand {
  constructor(public readonly id: ProjectId) {}
}
