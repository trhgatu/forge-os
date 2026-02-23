import { PermissionId } from './value-objects/permission-id.vo';

export interface PermissionProps {
  id: PermissionId;
  name: string;
  description?: string;
  resource: string;
  action: string;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Permission {
  private constructor(private readonly props: PermissionProps) {}

  static create(props: Omit<PermissionProps, 'isDeleted' | 'deletedAt'>): Permission {
    return new Permission({ ...props, isDeleted: false });
  }

  static reconstitute(props: PermissionProps): Permission {
    return new Permission(props);
  }

  get id(): PermissionId {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get resource(): string {
    return this.props.resource;
  }

  get action(): string {
    return this.props.action;
  }

  get isDeleted(): boolean {
    return this.props.isDeleted;
  }

  get deletedAt(): Date | undefined {
    return this.props.deletedAt;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  update(props: Partial<Omit<PermissionProps, 'id' | 'isDeleted' | 'deletedAt'>>): void {
    if (props.name !== undefined) this.props.name = props.name;
    if (props.description !== undefined) this.props.description = props.description;
    if (props.resource !== undefined) this.props.resource = props.resource;
    if (props.action !== undefined) this.props.action = props.action;
    this.props.updatedAt = new Date();
  }

  delete(): void {
    if (this.props.isDeleted) return;
    this.props.isDeleted = true;
    this.props.deletedAt = new Date();
    this.props.updatedAt = new Date();
  }

  restore(): void {
    if (!this.props.isDeleted) return;
    this.props.isDeleted = false;
    this.props.deletedAt = undefined;
    this.props.updatedAt = new Date();
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      name: this.props.name,
      description: this.props.description,
      resource: this.props.resource,
      action: this.props.action,
      isDeleted: this.props.isDeleted,
      deletedAt: this.props.deletedAt,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }

  toJSON() {
    return this.toPrimitives();
  }
}
