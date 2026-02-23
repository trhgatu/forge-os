export class ConnectAccountCommand {
  constructor(
    public readonly userId: string,
    public readonly provider: string,
    public readonly identifier: string,
    public readonly metadata: Record<string, any> = {},
  ) {}
}
