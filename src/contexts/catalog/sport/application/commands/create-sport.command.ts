import { SportStatus } from '@shared/enums';

export interface CreateSportPayload {
  name: string;
  description?: string;
  icon?: string;
  status?: SportStatus;
  sortOrder?: number;
  createdBy?: string;
}

export class CreateSportCommand {
  constructor(public readonly payload: CreateSportPayload) {}
}
