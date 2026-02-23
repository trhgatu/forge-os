import { MoodId } from '../../domain/value-objects/mood-id.vo';

export class RestoreMoodCommand {
  constructor(public readonly id: MoodId) {}
}
