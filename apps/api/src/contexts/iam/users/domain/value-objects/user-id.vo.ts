export class UserId {
  constructor(private readonly value: string) {
    if (!value) {
      throw new Error('UserId cannot be empty');
    }
  }

  static create(id: string): UserId {
    return new UserId(id);
  }

  toString(): string {
    return this.value;
  }

  equals(other: UserId): boolean {
    return this.value === other.value;
  }
}
