import { ProjectId } from '../../../domain/value-objects/project-id.vo';

export interface SyncProjectPayload {
  userId: string;
  id: ProjectId;
}

export class SyncProjectCommand {
  constructor(public readonly payload: SyncProjectPayload) {}
}
