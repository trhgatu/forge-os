import { Injectable, BadRequestException } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { CreateFlowMomentDto } from '../../presentation/dto/create-flow-moment.dto';
import { FlowMomentSyncedEvent } from '../events/flow-moment-synced.event';

@Injectable()
export class EchoesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async syncMoment(userId: string, dto: CreateFlowMomentDto) {
    const COOLDOWN_MS = 45 * 60 * 1000;

    const lastMoment = await this.prisma.flowMoment.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    if (lastMoment) {
      const elapsed = Date.now() - new Date(lastMoment.createdAt).getTime();
      if (elapsed < COOLDOWN_MS) {
        const remainingMinutes = Math.ceil((COOLDOWN_MS - elapsed) / 60000);
        throw new BadRequestException(
          `Resonance cooldown active. Please remain focused for another ${remainingMinutes} minute(s).`,
        );
      }
    }

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

    this.eventBus.publish(new FlowMomentSyncedEvent(userId, newMoment.id));

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
