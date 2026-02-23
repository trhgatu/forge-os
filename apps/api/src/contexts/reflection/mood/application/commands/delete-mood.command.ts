import { MoodId } from '../../domain/value-objects/mood-id.vo';

export class DeleteMoodCommand {
  constructor(public readonly id: MoodId) {}
}
