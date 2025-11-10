import { SportId } from '../../domain/value-objects/sport-id.vo';

export class RestoreSportCommand {
  constructor(public readonly id: SportId) {}
}
