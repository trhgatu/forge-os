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
    public steps: RoutineStep[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(data: {
    id: string;
    userId: string;
    title: string;
    comboXp?: number;
    isActive?: boolean;
    steps?: RoutineStep[];
    createdAt?: Date;
    updatedAt?: Date;
  }): Routine {
    return new Routine(
      data.id,
      data.userId,
      data.title,
      data.comboXp ?? 20,
      data.isActive ?? true,
      data.steps ?? [],
      data.createdAt ?? new Date(),
      data.updatedAt ?? new Date(),
    );
  }
}
