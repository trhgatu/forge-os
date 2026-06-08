import { MoodId } from '../../../domain/value-objects/mood-id.vo';

export interface UpdateMoodPayload {
  mood?: string;
  intensity?: number;
  note?: string;
  tags?: string[];
  loggedAt?: string;
  userId?: string;
}

export class UpdateMoodCommand {
  constructor(
    public readonly id: MoodId,
    public readonly payload: UpdateMoodPayload,
  ) {}
}
