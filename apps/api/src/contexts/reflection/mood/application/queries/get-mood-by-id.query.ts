import { MoodId } from '../../domain/value-objects/mood-id.vo';

export class GetMoodByIdQuery {
  constructor(public readonly id: MoodId) {}
}
