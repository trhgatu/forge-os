import { AggregateRoot } from '../../../../shared/domain/aggregate-root.base';
import { HabitId } from './value-objects/habit-id.vo';

export interface HabitProps {
  userId: string;
  title: string;
  description: string | null;
  xpReward: number;
  difficulty: string; // 'easy', 'medium', 'hard'
  frequency: any; // JSON frequency mapping e.g. daily, specific days
  streak: number;
  maxStreak: number;
  habitStrength: number; // 0 to 100 percentage indicator
  isActive: boolean;
  actionType: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Habit extends AggregateRoot<HabitId> {
  private constructor(
    id: HabitId,
    private props: HabitProps,
  ) {
    super(id);
  }

  static create(
    data: Omit<
      HabitProps,
      | 'xpReward'
      | 'difficulty'
      | 'frequency'
      | 'streak'
      | 'maxStreak'
      | 'habitStrength'
      | 'isActive'
      | 'actionType'
      | 'createdAt'
      | 'updatedAt'
    > & {
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
    },
    id: HabitId,
  ): Habit {
    const now = new Date();
    const habit = new Habit(id, {
      userId: data.userId,
      title: data.title,
      description: data.description ?? null,
      xpReward: data.xpReward ?? 10,
      difficulty: data.difficulty ?? 'medium',
      frequency: data.frequency ?? { type: 'daily' },
      streak: data.streak ?? 0,
      maxStreak: data.maxStreak ?? 0,
      habitStrength: data.habitStrength ?? 10,
      isActive: data.isActive ?? true,
      actionType: data.actionType ?? null,
      createdAt: data.createdAt ?? now,
      updatedAt: data.updatedAt ?? now,
    });

    habit.addDomainEvent({ type: 'habit.created', id: id.value });
    return habit;
  }

  static createFromPersistence(props: HabitProps, id: string): Habit {
    return new Habit(HabitId.fromString(id), props);
  }

  // Getters
  get userId(): string {
    return this.props.userId;
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string | null {
    return this.props.description;
  }

  get xpReward(): number {
    return this.props.xpReward;
  }

  get difficulty(): string {
    return this.props.difficulty;
  }

  get frequency(): any {
    return this.props.frequency;
  }

  get streak(): number {
    return this.props.streak;
  }

  get maxStreak(): number {
    return this.props.maxStreak;
  }

  get habitStrength(): number {
    return this.props.habitStrength;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get actionType(): string | null {
    return this.props.actionType;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  // Domain behaviors
  update(data: Partial<Omit<HabitProps, 'userId' | 'createdAt' | 'updatedAt'>>): void {
    this.props = {
      ...this.props,
      ...data,
      updatedAt: new Date(),
    };
  }

  complete(): void {
    const now = new Date();
    this.props.streak += 1;
    if (this.props.streak > this.props.maxStreak) {
      this.props.maxStreak = this.props.streak;
    }
    // Calculate habit strength improvement
    this.props.habitStrength = Math.min(100, this.props.habitStrength + 5);
    this.props.updatedAt = now;

    this.addDomainEvent({ type: 'habit.completed', id: this.id.value, streak: this.props.streak });
  }

  fail(): void {
    this.props.streak = 0;
    this.props.habitStrength = Math.max(0, this.props.habitStrength - 10);
    this.props.updatedAt = new Date();
  }

  archive(): void {
    this.props.isActive = false;
    this.props.updatedAt = new Date();
  }

  toPersistence(): HabitProps {
    return { ...this.props };
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      ...this.props,
    };
  }
}
