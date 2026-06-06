import { ObjectiveInput } from '../create-quest/create-quest.command';

export class UpdateQuestCommand {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string | undefined,
    public readonly type: string | undefined,
    public readonly xpReward: number | undefined,
    public readonly objectives: ObjectiveInput[],
  ) {}
}
