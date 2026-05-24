import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';

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

      // Static UUIDs for robust referencing across the event hierarchy
      const q1Id = 'quest-daily-journal-sunset';
      const q2Id = 'quest-daily-habit-ritual';
      const q3Id = 'quest-main-stoic-memory';
      const metaQId = 'quest-daily-meta-alignment';

      // 1. Daily Journal Quest
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
              id: 'obj-daily-journal',
              type: 'CREATE_JOURNAL',
              targetCount: 1,
              referenceType: 'Journal',
            },
          },
        },
      });

      // 2. Daily Habit Quest
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
              id: 'obj-daily-habit',
              type: 'CHECK_HABIT',
              targetCount: 1,
              referenceType: 'Habit',
            },
          },
        },
      });

      // 3. Main Memory Quest
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
              id: 'obj-main-memory',
              type: 'CREATE_MEMORY',
              targetCount: 1,
              referenceType: 'Memory',
            },
          },
        },
      });

      // 4. Daily Meta-Quest: Perfect Alignment
      await this.prisma.quest.create({
        data: {
          id: metaQId,
          title: 'Perfect Alignment (Nghi thức tối hảo)',
          description:
            'Đạt sự hòa hợp tâm thức Stoic bằng cách hoàn thành cả 2 Nhiệm vụ Daily hôm nay',
          type: 'daily',
          xpReward: 100, // Meta-Quest awards a large reward!
          isActive: true,
          objectives: {
            create: [
              {
                id: 'obj-meta-journal-quest',
                type: 'COMPLETE_QUEST',
                targetCount: 1,
                referenceType: 'Quest',
                referenceId: q1Id,
              },
              {
                id: 'obj-meta-habit-quest',
                type: 'COMPLETE_QUEST',
                targetCount: 1,
                referenceType: 'Quest',
                referenceId: q2Id,
              },
            ],
          },
        },
      });

      console.log('✅ Default Stoic System Quests successfully seeded!');
    } catch (err) {
      console.error('❌ Error during Quests auto-seeding:', err);
    }
  }
}
