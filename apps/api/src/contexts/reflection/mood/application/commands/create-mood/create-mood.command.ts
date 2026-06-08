export interface CreateMoodPayload {
  mood: string;
  intensity?: number;
  note?: string;
  tags?: string[];
  loggedAt?: string;
  userId?: string;
}

export class CreateMoodCommand {
  constructor(public readonly payload: CreateMoodPayload) {}
}
