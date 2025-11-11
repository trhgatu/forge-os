import { MemoryStatus, MoodType } from '@shared/enums';

export interface CreateMemoryPayload {
  title: Record<string, string>;
  content: Record<string, string>;
  mood?: MoodType;
  tags?: string[];
  status?: MemoryStatus;
}

export class CreateMemoryCommand {
  constructor(
    public readonly payload: CreateMemoryPayload,
    public readonly lang: string = 'en',
  ) {}
}
