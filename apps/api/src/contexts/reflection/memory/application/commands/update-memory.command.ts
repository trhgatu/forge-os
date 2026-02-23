import { MemoryId } from '../../domain/value-objects/memory-id.vo';
import { MemoryStatus, MoodType } from '@shared/enums';

export interface UpdateMemoryPayload {
  title?: Map<string, string>;
  content?: Map<string, string>;
  mood?: MoodType;
  tags?: string[];
  status?: MemoryStatus;
}

export class UpdateMemoryCommand {
  constructor(
    public readonly id: MemoryId,
    public readonly payload: UpdateMemoryPayload,
    public readonly lang: string = 'en',
  ) {}
}
