import { Routine, RoutineStep } from '../domain/routine.entity';

export class RoutineMapper {
  static toDomain(doc: any): Routine | null {
    if (!doc) return null;

    const steps = (doc.habits || []).map(
      (rh: any) => new RoutineStep(rh.habitId, rh.habit.title, rh.habit.xpReward, rh.order),
    );

    return Routine.createFromPersistence(
      {
        userId: doc.userId,
        title: doc.title,
        comboXp: doc.comboXp,
        isActive: doc.isActive,
        targetTime: doc.targetTime,
        frequency: doc.frequency,
        steps,
        streak: doc.streak,
        maxStreak: doc.maxStreak,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
        completions: (doc.completions || []).map((c: any) => c.completedAt),
      },
      doc.id,
    );
  }

  static toPersistence(entity: Routine): any {
    const props = entity.toPersistence();
    return {
      id: entity.id.value,
      userId: props.userId,
      title: props.title,
      comboXp: props.comboXp,
      isActive: props.isActive,
      targetTime: props.targetTime,
      frequency: props.frequency,
      streak: props.streak,
      maxStreak: props.maxStreak,
    };
  }
}
