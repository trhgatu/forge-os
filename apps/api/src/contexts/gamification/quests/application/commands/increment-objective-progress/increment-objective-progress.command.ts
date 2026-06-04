export class IncrementObjectiveProgressCommand {
  constructor(
    public readonly userId: string,
    public readonly actionType: string,
    public readonly amount: number,
    public readonly referenceId: string | null,
  ) {}
}
