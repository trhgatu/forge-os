export class QuestObjective {
  constructor(
    public readonly id: string,
    public readonly questId: string,
    public readonly type: string, // 'CREATE_JOURNAL', 'CHECK_HABIT', etc.
    public readonly targetCount: number,
    public readonly referenceType: string, // 'Journal', 'Project', 'Habit', etc.
    public readonly referenceId: string | null,
  ) {}
}

export class Quest {
  constructor(
    public readonly id: string,
    public readonly userId: string | null, // null = System Quest
    public title: string,
    public description: string | null,
    public type: string, // 'daily', 'weekly', 'main', 'side'
    public xpReward: number,
    public isActive: boolean,
    public objectives: QuestObjective[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(data: {
    id: string;
    userId?: string | null;
    title: string;
    description?: string | null;
    type?: string;
    xpReward?: number;
    isActive?: boolean;
    objectives?: QuestObjective[];
    createdAt?: Date;
    updatedAt?: Date;
  }): Quest {
    return new Quest(
      data.id,
      data.userId ?? null,
      data.title,
      data.description ?? null,
      data.type ?? 'daily',
      data.xpReward ?? 15,
      data.isActive ?? true,
      data.objectives ?? [],
      data.createdAt ?? new Date(),
      data.updatedAt ?? new Date(),
    );
  }
}

export class UserObjectiveProgress {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly objectiveId: string,
    public currentCount: number,
    public isCompleted: boolean,
    public date: string | null, // YYYY-MM-DD for daily quests
    public objective?: QuestObjective, // Mapped join relation
  ) {}
}
