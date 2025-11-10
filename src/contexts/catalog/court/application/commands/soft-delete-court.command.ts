import { CourtId } from '../../domain/value-objects/court-id.vo';

export class SoftDeleteCourtCommand {
  constructor(public readonly id: CourtId) {}
}
