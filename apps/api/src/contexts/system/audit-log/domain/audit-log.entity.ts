import { AggregateRoot } from '@nestjs/cqrs';
import { AuditLogId } from './value-objects/audit-log-id.vo';

export interface AuditLogProps {
  id: AuditLogId;
  action: string;
  method: string;
  statusCode: number;
  userId: string;
  path: string;
  params: any;
  query: any;
  body: any;
  createdAt?: Date;
  updatedAt?: Date;
}

export class AuditLog extends AggregateRoot {
  private readonly _id: AuditLogId;
  private readonly _action: string;
  private readonly _method: string;
  private readonly _statusCode: number;
  private readonly _userId: string;
  private readonly _path: string;
  private readonly _params: any;
  private readonly _query: any;
  private readonly _body: any;
  private readonly _createdAt?: Date;
  private readonly _updatedAt?: Date;

  private constructor(props: AuditLogProps) {
    super();
    this._id = props.id;
    this._action = props.action;
    this._method = props.method;
    this._statusCode = props.statusCode;
    this._userId = props.userId;
    this._path = props.path;
    this._params = props.params;
    this._query = props.query;
    this._body = props.body;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  static create(
    props: Omit<AuditLogProps, 'id' | 'createdAt' | 'updatedAt'>,
  ): AuditLog {
    return new AuditLog({
      ...props,
      id: AuditLogId.create(),
    });
  }

  static reconstitute(props: AuditLogProps): AuditLog {
    return new AuditLog(props);
  }

  get id(): AuditLogId {
    return this._id;
  }

  get action(): string {
    return this._action;
  }

  get method(): string {
    return this._method;
  }

  get statusCode(): number {
    return this._statusCode;
  }

  get userId(): string {
    return this._userId;
  }

  get path(): string {
    return this._path;
  }

  get params(): any {
    return this._params;
  }

  get query(): any {
    return this._query;
  }

  get body(): any {
    return this._body;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  toPrimitives(): any {
    return {
      id: this.id.toString(),
      action: this.action,
      method: this.method,
      statusCode: this.statusCode,
      userId: this.userId,
      path: this.path,
      params: this.params,
      query: this.query,
      body: this.body,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
