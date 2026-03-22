export abstract class BaseId {
  protected constructor(protected readonly _value: string) {
    this.validate(_value);
  }

  get value(): string {
    return this._value;
  }

  protected validate(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new Error('ID_CANNOT_BE_EMPTY');
    }
  }

  public toString(): string {
    return this._value;
  }

  public equals(other?: BaseId): boolean {
    if (other === null || other === undefined) return false;
    return this._value === other.value;
  }
}
