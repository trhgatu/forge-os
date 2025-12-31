export class AwardXpCommand {
  constructor(
    public readonly userId: string,
    public readonly amount: number,
    public readonly source: string, // e.g: 'project-creation', 'daily-log'
    public readonly reason?: string,
  ) {}
}
