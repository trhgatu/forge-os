import { SportId } from '../../domain/value-objects/sport-id.vo';
import { SportStatus } from '@shared/enums';

export interface UpdateSportPayload {
  name?: string;
  slug?: string;
  description?: string;
  icon?: string;
  status?: SportStatus;
  sortOrder?: number;
}

export class UpdateSportCommand {
  constructor(
    public readonly id: SportId,
    public readonly payload: UpdateSportPayload,
  ) {}
}
