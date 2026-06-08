import { GoalObjectiveInput } from '../create-goal/create-goal.command';

export class UpdateGoalCommand {
  constructor(
    public readonly goalId: string,
    public readonly title: string | undefined,
    public readonly description: string | undefined,
    public readonly xpReward: number | undefined,
    public readonly badgeIcon: string | undefined,
    public readonly isActive: boolean | undefined,
    public readonly objectives: GoalObjectiveInput[] | undefined,
  ) {}
}
