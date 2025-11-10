import { SportId } from '../../domain/value-objects/sport-id.vo';

export class DeleteSportCommand {
  constructor(public readonly id: SportId) {}
}
