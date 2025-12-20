import { UserId } from './value-objects/user-id.vo';

export interface UserProps {
  id: UserId;
  name: string;
  email: string;
  password?: string;
  // Simplified Role interface for Domain traversal
  role?: {
    id: string;
    name: string;
    permissions: string[]; // or Permission objects
  };
  roleId: string; // Foreign Key
  refreshToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User {
  private constructor(private readonly props: UserProps) {}

  static create(props: UserProps): User {
    return new User(props);
  }

  // Reconstitute from persistence (allows hydration without validation logic if needed)
  static reconstitute(props: UserProps): User {
    return new User(props);
  }

  get id(): UserId {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string | undefined {
    return this.props.password;
  }

  get roleId(): string {
    return this.props.roleId;
  }

  get role(): { id: string; name: string; permissions: string[] } | undefined {
    return this.props.role;
  }

  get refreshToken(): string | undefined {
    return this.props.refreshToken;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  update(props: Partial<Omit<UserProps, 'id'>>): void {
    if (props.name !== undefined) this.props.name = props.name;
    if (props.email !== undefined) this.props.email = props.email;
    if (props.password !== undefined) this.props.password = props.password;
    if (props.roleId !== undefined) this.props.roleId = props.roleId;
    if (props.refreshToken !== undefined)
      this.props.refreshToken = props.refreshToken;
    this.props.updatedAt = new Date();
  }

  // ================
  //   SERIALIZATION
  // ================
  toPrimitives() {
    return {
      id: this.id.toString(),
      name: this.props.name,
      email: this.props.email,
      roleId: this.props.roleId,
      role: this.props.role,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }

  toJSON() {
    return this.toPrimitives();
  }
}
