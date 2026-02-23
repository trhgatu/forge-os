import { ProjectId } from '../../domain/value-objects/project-id.vo';

export class GetProjectByIdQuery {
  constructor(public readonly id: ProjectId) {}
}
