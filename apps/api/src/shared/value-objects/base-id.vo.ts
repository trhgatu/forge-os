import { Types } from 'mongoose';

export abstract class BaseId {
  protected readonly _value: Types.ObjectId;

  protected constructor(value: string | Types.ObjectId) {
    if (!Types.ObjectId.isValid(value)) {
      throw new Error('Invalid ObjectId');
    }

    this._value = typeof value === 'string' ? new Types.ObjectId(value) : value;
  }

  public equals(id?: BaseId): boolean {
    if (id === null || id === undefined) return false;
    if (id._value === undefined) return false;
    return this._value.equals(id._value);
  }

  public toString(): string {
    return this._value.toHexString();
  }

  public toObjectId(): Types.ObjectId {
    return this._value;
  }

  public get value(): Types.ObjectId {
    return this._value;
  }
}
