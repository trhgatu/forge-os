import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class QuestsInitializer implements OnApplicationBootstrap {
  constructor(private readonly prisma: PrismaService) {}

  async onApplicationBootstrap() {
    try {
      const count = await this.prisma.quest.count();
      if (count > 0) {
        return;
      }

      console.log('🌱 Seeding default Stoic System Quests...');

      const q1Id = uuidv4();
      await this.prisma.quest.create({
        data: {
          id: q1Id,
          title: 'Trang sử hoàng hôn',
          description: 'Viết 1 trang nhật ký để phản tỉnh ngày hôm nay',
          type: 'daily',
          xpReward: 25,
          isActive: true,
          objectives: {
            create: {
              id: uuidv4(),
              type: 'CREATE_JOURNAL',
              targetCount: 1,
              referenceType: 'Journal',
            },
          },
        },
      });

      const q2Id = uuidv4();
      await this.prisma.quest.create({
        data: {
          id: q2Id,
          title: 'Nghi thức rèn luyện',
          description: 'Hoàn thành ít nhất một thói quen tích cực trong ngày',
          type: 'daily',
          xpReward: 15,
          isActive: true,
          objectives: {
            create: {
              id: uuidv4(),
              type: 'CHECK_HABIT',
              targetCount: 1,
              referenceType: 'Habit',
            },
          },
        },
      });

      const q3Id = uuidv4();
      await this.prisma.quest.create({
        data: {
          id: q3Id,
          title: 'Khai nguyên kỷ lục',
          description: 'Vun đắp 1 kỷ niệm sâu sắc để lưu giữ tri thức Stoic',
          type: 'main',
          xpReward: 50,
          isActive: true,
          objectives: {
            create: {
              id: uuidv4(),
              type: 'CREATE_MEMORY',
              targetCount: 1,
              referenceType: 'Memory',
            },
          },
        },
      });

      console.log('✅ Default Stoic System Quests successfully seeded!');
    } catch (err) {
      console.error('❌ Error during Quests auto-seeding:', err);
    }
  }
}
