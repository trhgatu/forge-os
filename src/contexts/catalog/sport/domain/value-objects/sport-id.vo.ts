export class SportId {
  private constructor(private readonly value: string) {}

  static create(id: string) {
    if (!id || typeof id !== 'string') throw new Error('Invalid SportId');
    return new SportId(id);
  }

  toString(): string {
    return this.value;
  }
}
