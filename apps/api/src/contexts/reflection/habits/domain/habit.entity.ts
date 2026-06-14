export class Habit {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public title: string,
    public description: string | null,
    public xpReward: number,
    public difficulty: string, // 'easy', 'medium', 'hard'
    public frequency: any, // JSON frequency mapping e.g. daily, specific days
    public streak: number,
    public maxStreak: number,
    public habitStrength: number, // 0 to 100 percentage indicator
    public isActive: boolean,
    public actionType: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(data: {
    id: string;
    userId: string;
    title: string;
    description?: string | null;
    xpReward?: number;
    difficulty?: string;
    frequency?: any;
    streak?: number;
    maxStreak?: number;
    habitStrength?: number;
    isActive?: boolean;
    actionType?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  }): Habit {
    return new Habit(
      data.id,
      data.userId,
      data.title,
      data.description ?? null,
      data.xpReward ?? 10,
      data.difficulty ?? 'medium',
      data.frequency ?? { type: 'daily' },
      data.streak ?? 0,
      data.maxStreak ?? 0,
      data.habitStrength ?? 10,
      data.isActive ?? true,
      data.actionType ?? null,
      data.createdAt ?? new Date(),
      data.updatedAt ?? new Date(),
    );
  }
}
