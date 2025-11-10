import { CourtId } from '../../domain/value-objects/court-id.vo';

export class GetCourtByIdForPublicQuery {
  constructor(public readonly id: CourtId) {}
}
