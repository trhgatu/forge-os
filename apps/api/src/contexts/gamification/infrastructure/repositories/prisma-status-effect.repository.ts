import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { StatusEffectRepository } from '../../domain/ports/status-effect.repository';
import { UserStatusEffect, StatusEffectId } from '../../domain/status-effect.entity';

@Injectable()
export class PrismaStatusEffectRepository implements StatusEffectRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(effect: UserStatusEffect): Promise<void> {
    const data = {
      id: effect.id.value,
      userId: effect.userId,
      type: effect.type,
      value: effect.value ?? {},
      createdAt: effect.createdAt,
      expiresAt: effect.expiresAt,
    };

    await this.prisma.userStatusEffect.upsert({
      where: { id: effect.id.value },
      create: data,
      update: data,
    });
  }

  async findActiveByUserId(userId: string): Promise<UserStatusEffect[]> {
    const records = await this.prisma.userStatusEffect.findMany({
      where: {
        userId,
        expiresAt: { gte: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    return records.map((r) =>
      UserStatusEffect.create({
        id: StatusEffectId.fromString(r.id),
        userId: r.userId,
        type: r.type,
        value: r.value,
        createdAt: r.createdAt,
        expiresAt: r.expiresAt,
      }),
    );
  }

  async delete(userId: string, type: string): Promise<void> {
    await this.prisma.userStatusEffect.deleteMany({
      where: { userId, type },
    });
  }
}
