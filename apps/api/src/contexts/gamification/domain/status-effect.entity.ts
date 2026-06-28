import { BaseId } from '@shared/value-objects/base-id.vo';
import { v4 as uuid } from 'uuid';

export class StatusEffectId extends BaseId {
  private constructor(id: string) {
    super(id);
  }

  static create(id?: string): StatusEffectId {
    return new StatusEffectId(id ?? uuid());
  }

  static fromString(id: string): StatusEffectId {
    return new StatusEffectId(id);
  }

  static random(): StatusEffectId {
    return new StatusEffectId(uuid());
  }
}

export interface StatusEffectProps {
  id?: StatusEffectId;
  userId: string;
  type: string;
  value?: any;
  createdAt?: Date;
  expiresAt: Date;
}

export class UserStatusEffect {
  private readonly _id: StatusEffectId;
  private readonly _userId: string;
  private readonly _type: string;
  private readonly _value: any;
  private readonly _createdAt: Date;
  private readonly _expiresAt: Date;

  private constructor(props: StatusEffectProps) {
    this._id = props.id ?? StatusEffectId.create();
    this._userId = props.userId;
    this._type = props.type;
    this._value = props.value ?? null;
    this._createdAt = props.createdAt ?? new Date();
    this._expiresAt = props.expiresAt;
  }

  static create(props: StatusEffectProps): UserStatusEffect {
    return new UserStatusEffect(props);
  }

  get id(): StatusEffectId {
    return this._id;
  }

  get userId(): string {
    return this._userId;
  }

  get type(): string {
    return this._type;
  }

  get value(): any {
    return this._value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get expiresAt(): Date {
    return this._expiresAt;
  }

  isExpired(now: Date = new Date()): boolean {
    return now.getTime() > this._expiresAt.getTime();
  }

  toPrimitives() {
    return {
      id: this._id.value,
      userId: this._userId,
      type: this._type,
      value: this._value,
      createdAt: this._createdAt,
      expiresAt: this._expiresAt,
    };
  }
}
