import { Module } from '@nestjs/common';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [ProjectModule],
  exports: [ProjectModule],
})
export class EngineeringModule {}
