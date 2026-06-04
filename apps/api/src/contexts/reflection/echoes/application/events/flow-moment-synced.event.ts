export class FlowMomentSyncedEvent {
  constructor(
    public readonly userId: string,
    public readonly momentId: string,
  ) {}
}
