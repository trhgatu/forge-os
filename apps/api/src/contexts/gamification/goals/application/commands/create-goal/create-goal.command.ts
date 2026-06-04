export interface GoalObjectiveInput {
  type: string;
  targetCount: number;
  referenceId?: string | null;
}

export class CreateGoalCommand {
  constructor(
    public readonly userId: string | null,
    public readonly title: string,
    public readonly description: string | undefined,
    public readonly xpReward: number | undefined,
    public readonly badgeIcon: string | undefined,
    public readonly objectives: GoalObjectiveInput[],
  ) {}
}
