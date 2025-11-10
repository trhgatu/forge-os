import { SportId } from '../../domain/value-objects/sport-id.vo';

export class GetSportByIdQuery {
  constructor(public readonly id: SportId) {}
}
