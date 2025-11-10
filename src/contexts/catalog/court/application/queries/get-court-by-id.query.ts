import { CourtId } from '../../domain/value-objects/court-id.vo';

export class GetCourtByIdQuery {
  constructor(public readonly id: CourtId) {}
}
