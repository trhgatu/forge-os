import { Injectable } from '@nestjs/common';

@Injectable()
export class VitalityPresenter {
  toStatsResponse(data: any): any {
    return {
      userId: data.userId,
      stamina: data.stamina,
      maxStamina: data.maxStamina,
      strength: data.strength,
      lastStaminaUpdatedAt:
        data.lastStaminaUpdatedAt instanceof Date
          ? data.lastStaminaUpdatedAt.toISOString()
          : data.lastStaminaUpdatedAt,
      totalsToday: data.totalsToday
        ? {
            hydrationMl: data.totalsToday.hydrationMl,
            sleep: {
              logged: data.totalsToday.sleep.logged,
              durationHours: data.totalsToday.sleep.durationHours,
              quality: data.totalsToday.sleep.quality,
            },
            workouts: (data.totalsToday.workouts || []).map((w: any) => ({
              id: w.id,
              type: w.type,
              durationMinutes: w.durationMinutes,
              intensity: w.intensity,
              caloriesBurned: w.caloriesBurned,
              loggedAt: w.loggedAt instanceof Date ? w.loggedAt.toISOString() : w.loggedAt,
            })),
          }
        : undefined,
    };
  }
}
