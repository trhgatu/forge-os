import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { projects } from './data';

@Injectable()
export class ProjectSeeder {
  private readonly logger = new Logger(ProjectSeeder.name);

  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    this.logger.log('Seeding projects...');

    for (const projectData of projects) {
      const exists = await this.prisma.project.findFirst({
        where: { title: projectData.title },
      });
      if (!exists) {
        await this.prisma.project.create({
          data: {
            title: projectData.title,
            description: projectData.description || '',
            status: projectData.status || 'ACTIVE',
            tags: projectData.tags || [],
            isPinned: projectData.isPinned || false,
            progress: projectData.progress || 0,
            githubStats: projectData.githubStats || {},
            metadata: projectData.metadata || {},
            taskBoard: projectData.taskBoard || {},
            links: projectData.links || [],
          },
        });
        this.logger.log(`Created project: ${projectData.title}`);
      } else {
        this.logger.debug(`Project ${projectData.title} already exists`);
      }
    }

    this.logger.log('Projects seeding completed.');
  }
}
