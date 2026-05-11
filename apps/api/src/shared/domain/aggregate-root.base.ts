export abstract class AggregateRoot<TId> {
  private _domainEvents: any[] = [];

  protected constructor(protected readonly _id: TId) {}

  public get id(): TId {
    return this._id;
  }

  public get domainEvents(): any[] {
    return [...this._domainEvents];
  }

  protected addDomainEvent(event: any): void {
    this._domainEvents.push(event);
  }

  public clearDomainEvents(): void {
    this._domainEvents = [];
  }
}
