import { AggregateRoot } from '../../../../shared/domain/aggregate-root.base';
import { RoutineId } from './value-objects/routine-id.vo';

export class RoutineStep {
  constructor(
    public readonly habitId: string,
    public readonly title: string,
    public readonly xpReward: number,
    public readonly order: number,
  ) {}
}

export interface RoutineProps {
  userId: string;
  title: string;
  comboXp: number;
  isActive: boolean;
  targetTime: string | null;
  frequency: any | null;
  steps: RoutineStep[];
  streak: number;
  maxStreak: number;
  createdAt: Date;
  updatedAt: Date;
  completions: Date[];
}

export class Routine extends AggregateRoot<RoutineId> {
  private constructor(
    id: RoutineId,
    private props: RoutineProps,
  ) {
    super(id);
  }

  static create(
    data: Omit<
      RoutineProps,
      | 'comboXp'
      | 'isActive'
      | 'targetTime'
      | 'frequency'
      | 'steps'
      | 'streak'
      | 'maxStreak'
      | 'createdAt'
      | 'updatedAt'
      | 'completions'
    > & {
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
    },
    id: RoutineId,
  ): Routine {
    const now = new Date();
    const routine = new Routine(id, {
      userId: data.userId,
      title: data.title,
      comboXp: data.comboXp ?? 20,
      isActive: data.isActive ?? true,
      targetTime: data.targetTime ?? null,
      frequency: data.frequency ?? null,
      steps: data.steps ?? [],
      streak: data.streak ?? 0,
      maxStreak: data.maxStreak ?? 0,
      createdAt: data.createdAt ?? now,
      updatedAt: data.updatedAt ?? now,
      completions: data.completions ?? [],
    });

    routine.addDomainEvent({ type: 'routine.created', id: id.value });
    return routine;
  }

  static createFromPersistence(props: RoutineProps, id: string): Routine {
    return new Routine(RoutineId.fromString(id), props);
  }

  // Getters
  get userId(): string {
    return this.props.userId;
  }

  get title(): string {
    return this.props.title;
  }

  get comboXp(): number {
    return this.props.comboXp;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get targetTime(): string | null {
    return this.props.targetTime;
  }

  get frequency(): any | null {
    return this.props.frequency;
  }

  get steps(): RoutineStep[] {
    return [...this.props.steps];
  }

  get streak(): number {
    return this.props.streak;
  }

  get maxStreak(): number {
    return this.props.maxStreak;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get completions(): Date[] {
    return [...this.props.completions];
  }

  // Domain behaviors
  update(
    data: Partial<
      Omit<RoutineProps, 'userId' | 'steps' | 'createdAt' | 'updatedAt' | 'completions'>
    >,
  ): void {
    this.props = {
      ...this.props,
      ...data,
      updatedAt: new Date(),
    };
  }

  complete(completedAt: Date = new Date()): void {
    this.props.streak += 1;
    if (this.props.streak > this.props.maxStreak) {
      this.props.maxStreak = this.props.streak;
    }
    this.props.completions.push(completedAt);
    this.props.updatedAt = completedAt;

    this.addDomainEvent({
      type: 'routine.completed',
      id: this.id.value,
      streak: this.props.streak,
    });
  }

  fail(): void {
    this.props.streak = 0;
    this.props.updatedAt = new Date();
  }

  archive(): void {
    this.props.isActive = false;
    this.props.updatedAt = new Date();
  }

  toPersistence(): RoutineProps {
    return { ...this.props };
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      ...this.props,
      steps: this.props.steps,
    };
  }
}
