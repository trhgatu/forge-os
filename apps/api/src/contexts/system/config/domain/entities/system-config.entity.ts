export class SystemConfig {
  constructor(
    public readonly key: string,
    public readonly value: any,
    public readonly updatedAt?: Date,
  ) {}

  static create(key: string, value: any): SystemConfig {
    return new SystemConfig(key, value, new Date());
  }

  toPrimitives(): any {
    return {
      key: this.key,
      value: this.value,
      updatedAt: this.updatedAt,
    };
  }
}
