import { SportId } from '../../domain/value-objects/sport-id.vo';

export class GetSportByIdForPublicQuery {
  constructor(public readonly id: SportId) {}
}
