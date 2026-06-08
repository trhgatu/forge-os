export interface ObjectiveInput {
  id?: string;
  type: string;
  targetCount: number;
  referenceType: string;
  referenceId?: string | null;
}

export class CreateQuestCommand {
  constructor(
    public readonly userId: string | null,
    public readonly title: string,
    public readonly description: string | undefined,
    public readonly type: string | undefined,
    public readonly xpReward: number | undefined,
    public readonly objectives: ObjectiveInput[],
  ) {}
}
