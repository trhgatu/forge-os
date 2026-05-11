export abstract class BaseId {
  protected readonly _value: string;

  protected constructor(value: string) {
    if (!value) {
      throw new Error('Invalid ID: value is required');
    }
    this._value = value;
  }

  public equals(id?: BaseId): boolean {
    if (id === null || id === undefined) return false;
    return this._value === id._value;
  }

  public toString(): string {
    return this._value;
  }

  public get value(): string {
    return this._value;
  }
}
