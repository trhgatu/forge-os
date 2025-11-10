// domain/value-objects/court-id.vo.ts
export class CourtId {
  private constructor(private readonly value: string) {}

  static create(id: string) {
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid CourtId');
    }
    return new CourtId(id);
  }

  toString(): string {
    return this.value;
  }

  equals(other: CourtId): boolean {
    return this.value === other.value;
  }
}
