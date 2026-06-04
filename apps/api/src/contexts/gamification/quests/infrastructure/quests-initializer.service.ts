import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';

@Injectable()
export class QuestsInitializer implements OnApplicationBootstrap {
  constructor(private readonly prisma: PrismaService) {}

  async onApplicationBootstrap() {
    try {
      console.log('🌱 Seeding/Synchronizing default Stoic System Quests...');

      // Static UUIDs for robust referencing across the event hierarchy
      const q1Id = 'quest-daily-journal-sunset';
      const q2Id = 'quest-daily-habit-ritual';
      const q3Id = 'quest-main-stoic-memory';
      const q4Id = 'quest-daily-routine-loop';
      const q5Id = 'quest-daily-study-light';
      const q6Id = 'quest-daily-spaced-review';
      const q7Id = 'quest-daily-wealth-ledger';
      const q8Id = 'quest-daily-wealth-reflection';
      const metaQId = 'quest-daily-meta-alignment';

      // Helper function to seed or update a quest with its objective(s)
      const upsertQuest = async (questData: {
        id: string;
        title: string;
        description: string;
        type: string;
        xpReward: number;
        objectives: {
          id: string;
          type: string;
          targetCount: number;
          referenceType: string;
          referenceId?: string;
        }[];
      }) => {
        const existing = await this.prisma.quest.findUnique({
          where: { id: questData.id },
          include: { objectives: true },
        });

        if (!existing) {
          await this.prisma.quest.create({
            data: {
              id: questData.id,
              title: questData.title,
              description: questData.description,
              type: questData.type,
              xpReward: questData.xpReward,
              isActive: true,
              objectives: {
                create: questData.objectives.map((obj) => ({
                  id: obj.id,
                  type: obj.type,
                  targetCount: obj.targetCount,
                  referenceType: obj.referenceType,
                  referenceId: obj.referenceId,
                })),
              },
            },
          });
        }
      };

      // 1. Daily Journal Quest
      await upsertQuest({
        id: q1Id,
        title: 'Trang sử hoàng hôn',
        description: 'Viết 1 trang nhật ký để phản tỉnh ngày hôm nay',
        type: 'daily',
        xpReward: 25,
        objectives: [
          {
            id: 'obj-daily-journal',
            type: 'CREATE_JOURNAL',
            targetCount: 1,
            referenceType: 'Journal',
          },
        ],
      });

      // 2. Daily Habit Quest
      await upsertQuest({
        id: q2Id,
        title: 'Nghi thức rèn luyện',
        description: 'Hoàn thành ít nhất một thói quen tích cực trong ngày',
        type: 'daily',
        xpReward: 15,
        objectives: [
          {
            id: 'obj-daily-habit',
            type: 'CHECK_HABIT',
            targetCount: 1,
            referenceType: 'Habit',
          },
        ],
      });

      // 3. Main Memory Quest
      await upsertQuest({
        id: q3Id,
        title: 'Khai nguyên kỷ lục',
        description: 'Vun đắp 1 kỷ niệm sâu sắc để lưu giữ tri thức Stoic',
        type: 'main',
        xpReward: 50,
        objectives: [
          {
            id: 'obj-main-memory',
            type: 'CREATE_MEMORY',
            targetCount: 1,
            referenceType: 'Memory',
          },
        ],
      });

      // 4. Daily Routine Quest (New!)
      await upsertQuest({
        id: q4Id,
        title: 'Giao thức Thần kinh',
        description: 'Hoàn thành ít nhất một chuỗi Nghi thức (Routine) hôm nay',
        type: 'daily',
        xpReward: 30,
        objectives: [
          {
            id: 'obj-daily-routine',
            type: 'COMPLETE_ROUTINE',
            targetCount: 1,
            referenceType: 'Routine',
          },
        ],
      });

      // 5. Daily Knowledge Study Quest (New!)
      await upsertQuest({
        id: q5Id,
        title: 'Khai sáng tâm thức',
        description: 'Nghiên cứu ít nhất 1 khái niệm tri thức mới hôm nay',
        type: 'daily',
        xpReward: 20,
        objectives: [
          {
            id: 'obj-daily-study',
            type: 'STUDY_CONCEPT',
            targetCount: 1,
            referenceType: 'KnowledgeConcept',
          },
        ],
      });

      // 6. Daily Spaced Repetition Flashcard Quest (New!)
      await upsertQuest({
        id: q6Id,
        title: 'Giao thức Trí nhớ',
        description: 'Ôn tập ít nhất 10 thẻ học Spaced Repetition hôm nay',
        type: 'daily',
        xpReward: 30,
        objectives: [
          {
            id: 'obj-daily-spaced-review',
            type: 'REVIEW_FLASHCARD',
            targetCount: 10,
            referenceType: 'UserFlashcard',
          },
        ],
      });

      // 7. Daily Meta-Quest: Perfect Alignment (Meta-Quest now aggregates all 5 daily quests!)
      const metaExists = await this.prisma.quest.findUnique({ where: { id: metaQId } });
      if (!metaExists) {
        await this.prisma.quest.create({
          data: {
            id: metaQId,
            title: 'Perfect Alignment (Nghi thức tối hảo)',
            description:
              'Đạt sự hòa hợp tâm thức Stoic bằng cách hoàn thành tất cả 5 Nhiệm vụ Daily hôm nay',
            type: 'daily',
            xpReward: 150, // Higher reward for completing all 5!
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
                {
                  id: 'obj-meta-routine-quest',
                  type: 'COMPLETE_QUEST',
                  targetCount: 1,
                  referenceType: 'Quest',
                  referenceId: q4Id,
                },
                {
                  id: 'obj-meta-study-quest',
                  type: 'COMPLETE_QUEST',
                  targetCount: 1,
                  referenceType: 'Quest',
                  referenceId: q5Id,
                },
                {
                  id: 'obj-meta-spaced-review-quest',
                  type: 'COMPLETE_QUEST',
                  targetCount: 1,
                  referenceType: 'Quest',
                  referenceId: q6Id,
                },
              ],
            },
          },
        });
      }

      // 8. Daily Wealth Ledger Quest
      await upsertQuest({
        id: q7Id,
        title: 'Lập thư tịch kim tiền',
        description: 'Ghi nhận ít nhất 1 dòng chảy tài chính hôm nay để rèn luyện sự tự chủ',
        type: 'daily',
        xpReward: 20,
        objectives: [
          {
            id: 'obj-daily-wealth-ledger',
            type: 'LOG_TRANSACTION',
            targetCount: 1,
            referenceType: 'FinancialTransaction',
          },
        ],
      });

      // 9. Daily Wealth Reflection Quest
      await upsertQuest({
        id: q8Id,
        title: 'Đại ngộ vật chất',
        description: 'Viết cảm nhận phản tỉnh sau khi chi tiêu một khoản xa xỉ để nuôi dưỡng ý chí',
        type: 'daily',
        xpReward: 25,
        objectives: [
          {
            id: 'obj-daily-wealth-reflection',
            type: 'CREATE_REFLECTION',
            targetCount: 1,
            referenceType: 'FinancialTransaction',
          },
        ],
      });

      console.log('✅ Default Stoic System Quests successfully seeded & synchronized!');
    } catch (err) {
      console.error('❌ Error during Quests auto-seeding:', err);
    }
  }
}
