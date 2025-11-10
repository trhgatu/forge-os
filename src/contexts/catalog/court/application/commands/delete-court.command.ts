import { CourtId } from '../../domain/value-objects/court-id.vo';

export class DeleteCourtCommand {
  constructor(public readonly id: CourtId) {}
}
