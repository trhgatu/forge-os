import { PermissionId } from './value-objects/permission-id.vo';

export interface PermissionProps {
  id: PermissionId;
  name: string;
  description?: string;
  resource: string;
  action: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Permission {
  private constructor(private readonly props: PermissionProps) {}

  static create(props: PermissionProps): Permission {
    return new Permission(props);
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

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  update(props: Partial<Omit<PermissionProps, 'id'>>): void {
    if (props.name !== undefined) this.props.name = props.name;
    if (props.description !== undefined)
      this.props.description = props.description;
    if (props.resource !== undefined) this.props.resource = props.resource;
    if (props.action !== undefined) this.props.action = props.action;
    this.props.updatedAt = new Date();
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      name: this.props.name,
      description: this.props.description,
      resource: this.props.resource,
      action: this.props.action,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }

  toJSON() {
    return this.toPrimitives();
  }
}
