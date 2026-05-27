import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { CreateFlowMomentDto } from '../../presentation/dto/create-flow-moment.dto';
import { IncrementObjectiveProgressCommand } from '../../../../gamification/quests/application/commands/increment-objective-progress.command';

@Injectable()
export class EchoesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly commandBus: CommandBus,
  ) {}

  async syncMoment(userId: string, dto: CreateFlowMomentDto) {
    const newMoment = await this.prisma.flowMoment.create({
      data: {
        userId,
        fileName: dto.fileName,
        gitBranch: dto.gitBranch,
        cpuLoad: dto.cpuLoad,
        coordX: dto.coordX,
        coordY: dto.coordY,
      },
    });

    const allMoments = await this.prisma.flowMoment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    if (allMoments.length > 8) {
      const momentsToDelete = allMoments.slice(8);
      const idsToDelete = momentsToDelete.map((m) => m.id);
      await this.prisma.flowMoment.deleteMany({
        where: { id: { in: idsToDelete } },
      });
    }

    try {
      await this.commandBus.execute(
        new IncrementObjectiveProgressCommand(userId, 'WS_PRESENCE', 1, null),
      );
    } catch (err) {
      console.warn('Failed to increment presence attribute for flow moment', err);
    }

    return newMoment;
  }

  async getHistory(userId: string) {
    return this.prisma.flowMoment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 8,
    });
  }

  async clearHistory(userId: string) {
    await this.prisma.flowMoment.deleteMany({
      where: { userId },
    });
    return { success: true };
  }
}
