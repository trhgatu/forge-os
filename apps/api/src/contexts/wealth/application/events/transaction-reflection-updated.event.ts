export class TransactionReflectionUpdatedEvent {
  constructor(
    public readonly id: string,
    public readonly userId: string,
  ) {}
}
