export class RoutineStep {
  constructor(
    public readonly habitId: string,
    public readonly title: string,
    public readonly xpReward: number,
    public readonly order: number,
  ) {}
}

export class Routine {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public title: string,
    public comboXp: number,
    public isActive: boolean,
    public targetTime: string | null,
    public frequency: any | null,
    public steps: RoutineStep[],
    public streak: number,
    public maxStreak: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public completions: Date[] = [],
  ) {}

  static create(data: {
    id: string;
    userId: string;
    title: string;
    comboXp?: number;
    isActive?: boolean;
    targetTime?: string | null;
    frequency?: any | null;
    steps?: RoutineStep[];
    streak?: number;
    maxStreak?: number;
    createdAt?: Date;
    updatedAt?: Date;
    completions?: Date[];
  }): Routine {
    return new Routine(
      data.id,
      data.userId,
      data.title,
      data.comboXp ?? 20,
      data.isActive ?? true,
      data.targetTime ?? null,
      data.frequency ?? null,
      data.steps ?? [],
      data.streak ?? 0,
      data.maxStreak ?? 0,
      data.createdAt ?? new Date(),
      data.updatedAt ?? new Date(),
      data.completions ?? [],
    );
  }
}
