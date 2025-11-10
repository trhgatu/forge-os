import { CourtId } from '../../domain/value-objects/court-id.vo';

export class RestoreCourtCommand {
  constructor(public readonly id: CourtId) {}
}
