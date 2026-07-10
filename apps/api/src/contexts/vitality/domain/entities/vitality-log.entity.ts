import { VitalityLogId } from '../value-objects/vitality-id.vo';

export interface VitalityLogProps {
  id?: VitalityLogId;
  userId: string;
  type: string;
  value: number;
  metadata?: any;
  loggedAt?: Date;
}

export class VitalityLog {
  private readonly _id: VitalityLogId;
  private readonly _userId: string;
  private readonly _type: string;
  private readonly _value: number;
  private readonly _metadata: any;
  private readonly _loggedAt: Date;

  private constructor(props: VitalityLogProps) {
    this._id = props.id ?? VitalityLogId.create();
    this._userId = props.userId;
    this._type = props.type;
    this._value = props.value;
    this._metadata = props.metadata ?? null;
    this._loggedAt = props.loggedAt ?? new Date();
  }

  static create(props: VitalityLogProps): VitalityLog {
    return new VitalityLog(props);
  }

  get id(): VitalityLogId {
    return this._id;
  }

  get userId(): string {
    return this._userId;
  }

  get type(): string {
    return this._type;
  }

  get value(): number {
    return this._value;
  }

  get metadata(): any {
    return this._metadata;
  }

  get loggedAt(): Date {
    return this._loggedAt;
  }

  toPrimitives() {
    return {
      id: this._id.value,
      userId: this._userId,
      type: this._type,
      value: this._value,
      metadata: this._metadata,
      loggedAt: this._loggedAt,
    };
  }
}
