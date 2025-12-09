import { MoodId } from '../../domain/value-objects/mood-id.vo';

export class SoftDeleteMoodCommand {
  constructor(public readonly id: MoodId) {}
}
