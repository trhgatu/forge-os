export class VenueId {
  private constructor(private readonly value: string) {}

  static create(id: string) {
    if (!id || typeof id !== 'string') throw new Error('Invalid VenueId');
    return new VenueId(id);
  }

  toString(): string {
    return this.value;
  }
}
