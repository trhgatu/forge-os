import { UserVitality } from './user-vitality.entity';

describe('UserVitality (Domain Entity Unit Test)', () => {
  const userId = 'user-uuid-123';

  it('should decrease stamina based on passive decay over time', () => {
    const lastUpdate = new Date('2026-06-28T08:00:00Z');
    const vitality = UserVitality.create({
      userId,
      stamina: 100,
      maxStamina: 100,
      strength: 10,
      lastStaminaUpdatedAt: lastUpdate,
    });

    // Giả lập thời gian trôi qua 2 tiếng (Đến 10:00:00Z)
    // Tốc độ giảm mặc định: 3 stamina/giờ => 2 tiếng giảm 6 stamina
    const now = new Date('2026-06-28T10:00:00Z');
    vitality.updateStaminaState(now, [], []);

    expect(vitality.stamina).toBe(94);
    expect(vitality.lastStaminaUpdatedAt.toISOString()).toBe(now.toISOString());
  });

  it('should halve stamina decay rate when CAFFEINE_RUSH status effect is active', () => {
    const lastUpdate = new Date('2026-06-28T08:00:00Z');
    const vitality = UserVitality.create({
      userId,
      stamina: 100,
      maxStamina: 100,
      strength: 10,
      lastStaminaUpdatedAt: lastUpdate,
    });

    const now = new Date('2026-06-28T10:00:00Z');
    // Có hiệu ứng CAFFEINE_RUSH => Tốc độ giảm 3 stamina/giờ giảm 50% => 1.5/giờ => 2 tiếng giảm 3 stamina
    vitality.updateStaminaState(now, [], ['CAFFEINE_RUSH']);

    expect(vitality.stamina).toBe(97);
  });

  it('should double stamina decay rate when CAFFEINE_CRASH status effect is active', () => {
    const lastUpdate = new Date('2026-06-28T08:00:00Z');
    const vitality = UserVitality.create({
      userId,
      stamina: 100,
      maxStamina: 100,
      strength: 10,
      lastStaminaUpdatedAt: lastUpdate,
    });

    const now = new Date('2026-06-28T10:00:00Z');
    // Có hiệu ứng CAFFEINE_CRASH => Tốc độ giảm nhân đôi => 6/giờ => 2 tiếng giảm 12 stamina
    vitality.updateStaminaState(now, [], ['CAFFEINE_CRASH']);

    expect(vitality.stamina).toBe(88);
  });

  it('should recharge stamina correctly when drinking water', () => {
    const lastUpdate = new Date('2026-06-28T08:00:00Z');
    const vitality = UserVitality.create({
      userId,
      stamina: 50,
      maxStamina: 100,
      strength: 10,
      lastStaminaUpdatedAt: lastUpdate,
    });

    // Uống 500ml nước tại mốc 08:00 (hệ số hồi: 5 stamina mỗi 250ml => uống 500ml được +10 stamina)
    vitality.drinkWater(500, [], lastUpdate);

    expect(vitality.stamina).toBe(60);
  });

  it('should auto-recharge stamina when time crosses 07:00 AM (next day wake-up transition)', () => {
    // Sử dụng mốc giờ của hệ thống cục bộ để độc lập với múi giờ chạy test
    const now = new Date();
    now.setHours(8, 0, 0, 0); // 08:00 AM giờ cục bộ hôm nay

    const lastUpdate = new Date(now);
    lastUpdate.setDate(lastUpdate.getDate() - 1); // Hôm qua
    lastUpdate.setHours(23, 0, 0, 0); // 11:00 PM giờ cục bộ hôm qua

    const vitality = UserVitality.create({
      userId,
      stamina: 20,
      maxStamina: 100,
      strength: 10,
      lastStaminaUpdatedAt: lastUpdate,
    });

    // Đến 08:00 AM sáng hôm sau (đã vượt qua mốc 07:00 AM)
    // Tự động reset về mức mặc định (90% của maxStamina = 90), sau đó giảm 3 stamina cho 1 tiếng (từ 7:00 đến 8:00) => 90 - 3 = 87
    vitality.updateStaminaState(now, [], [], 8.0, 90);

    expect(vitality.stamina).toBe(87);
  });
});
