import { VitalityLog } from './vitality-log.entity';

export interface UserVitalityProps {
  userId: string;
  stamina: number;
  maxStamina: number;
  strength: number;
  lastStaminaUpdatedAt: Date;
}

export class UserVitality {
  private readonly _userId: string;
  private _stamina: number;
  private _maxStamina: number;
  private _strength: number;
  private _lastStaminaUpdatedAt: Date;

  private constructor(props: UserVitalityProps) {
    this._userId = props.userId;
    this._stamina = props.stamina;
    this._maxStamina = props.maxStamina;
    this._strength = props.strength;
    this._lastStaminaUpdatedAt = props.lastStaminaUpdatedAt;
  }

  static create(props: UserVitalityProps): UserVitality {
    return new UserVitality(props);
  }

  get userId(): string {
    return this._userId;
  }

  get stamina(): number {
    return this._stamina;
  }

  get maxStamina(): number {
    return this._maxStamina;
  }

  get strength(): number {
    return this._strength;
  }

  get lastStaminaUpdatedAt(): Date {
    return this._lastStaminaUpdatedAt;
  }

  // --- CORE DOMAIN LAZY CALCULATION LOGIC ---
  /**
   * Recalculates stamina based on elapsed time, passive decay, and sleep auto-recharges.
   */
  public updateStaminaState(
    now: Date = new Date(),
    logsSinceLastUpdate: VitalityLog[] = [],
    activeEffectTypes: string[] = [],
    sleepTargetHours: number = 8.0,
    sleepStaminaResetPercent: number = 90,
  ): void {
    const elapsedMs = now.getTime() - this._lastStaminaUpdatedAt.getTime();
    if (elapsedMs <= 0) return;

    const elapsedHours = elapsedMs / (3600 * 1000);

    // 1. Calculate Decay Multipliers from Status Effects
    let decayMultiplier = 1.0;

    if (activeEffectTypes.includes('CAFFEINE_CRASH')) {
      decayMultiplier = 2.0; // Crash doubles stamina decay rate
    } else if (activeEffectTypes.includes('CAFFEINE_RUSH')) {
      decayMultiplier = 0.5; // Rush halves stamina decay rate
    }

    const BASE_DECAY_RATE = 3.0; // 3 stamina per hour
    let staminaLoss = elapsedHours * BASE_DECAY_RATE * decayMultiplier;

    // 2. Check if a wake-up time transition has occurred (passing 07:00 AM)
    const passedWakeUpTime = this.hasPassedWakeUpTime(this._lastStaminaUpdatedAt, now);

    let baseStamina = this._stamina;

    if (passedWakeUpTime) {
      // Apply morning recharge
      const sleepLog = logsSinceLastUpdate.find((log) => log.type === 'SLEEP');
      if (sleepLog) {
        // Calculate custom sleep score
        const duration = sleepLog.value; // hours
        const quality = sleepLog.metadata?.quality ?? 4; // 1-5 scale
        const sleepScore = Math.min(
          100,
          Math.round((duration / sleepTargetHours) * 100 * (quality / 5)),
        );

        // Morning recharge sets the base stamina to the sleep score percentage of maxStamina
        baseStamina = Math.round((sleepScore / 100) * this._maxStamina);
      } else {
        // Default auto-recharge to configured percent of maxStamina
        baseStamina = Math.round((sleepStaminaResetPercent / 100) * this._maxStamina);
      }

      // Calculate decay only from 07:00 AM (or wake up time) to 'now'
      const wakeTimeToday = new Date(now);
      wakeTimeToday.setHours(7, 0, 0, 0);
      if (now > wakeTimeToday) {
        const postWakeHours = (now.getTime() - wakeTimeToday.getTime()) / (3600 * 1000);
        staminaLoss = postWakeHours * BASE_DECAY_RATE * decayMultiplier;
      } else {
        staminaLoss = 0;
      }
    }

    // Apply calculations
    this._stamina = Math.max(0, Math.min(this._maxStamina, Math.round(baseStamina - staminaLoss)));
    this._lastStaminaUpdatedAt = now;
  }

  /**
   * Helper to check if time has crossed 07:00 AM
   */
  private hasPassedWakeUpTime(prev: Date, current: Date): boolean {
    const prevDayStr = prev.toDateString();
    const currentDayStr = current.toDateString();

    if (prevDayStr !== currentDayStr) {
      // Different days, definitely passed morning
      return true;
    }

    // Same day, check if prev was before 7am and current is after 7am
    const prevHours = prev.getHours();
    const currentHours = current.getHours();
    return prevHours < 7 && currentHours >= 7;
  }

  public drinkWater(
    amountMl: number,
    activeEffectTypes: string[] = [],
    loggedAt: Date = new Date(),
    staminaRechargeRatio: number = 5,
  ): void {
    this.updateStaminaState(loggedAt, [], activeEffectTypes);

    const staminaGain = Math.round((amountMl / 250) * staminaRechargeRatio);
    this._stamina = Math.min(this._maxStamina, this._stamina + staminaGain);
    this._lastStaminaUpdatedAt = loggedAt;
  }

  public consumeStamina(
    amount: number,
    activeEffectTypes: string[] = [],
    now: Date = new Date(),
  ): void {
    this.updateStaminaState(now, [], activeEffectTypes);

    const hasStoicResolve = activeEffectTypes.includes('STOIC_RESOLVE');
    if (hasStoicResolve) {
      return;
    }

    this._stamina = Math.max(0, this._stamina - amount);
    this._lastStaminaUpdatedAt = now;
  }

  public toPrimitives() {
    return {
      userId: this._userId,
      stamina: this._stamina,
      maxStamina: this._maxStamina,
      strength: this._strength,
      lastStaminaUpdatedAt: this._lastStaminaUpdatedAt,
    };
  }
}
