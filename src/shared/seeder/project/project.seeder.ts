import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Project,
  ProjectDocument,
} from 'src/contexts/engineering/project/infrastructure/project.schema';
import { projects } from './data';

@Injectable()
export class ProjectSeeder {
  private readonly logger = new Logger(ProjectSeeder.name);

  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async seed() {
    this.logger.log('Seeding projects...');

    for (const projectData of projects) {
      const exists = await this.projectModel.findOne({
        title: projectData.title,
      });
      if (!exists) {
        await this.projectModel.create(projectData);
        this.logger.log(`Created project: ${projectData.title}`);
      } else {
        this.logger.debug(`Project ${projectData.title} already exists`);
      }
    }

    this.logger.log('Projects seeding completed.');
  }
}
