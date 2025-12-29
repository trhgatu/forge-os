import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  GetProjectsQuery,
  GetProjectQuery,
} from '../application/queries/get-projects.query';
import { GetGithubStatsQuery } from '../application/queries/get-github-stats.query';
import { GetGithubReposQuery } from '../application/queries/get-github-repos.query';
import { CreateProjectCommand } from '../application/commands/create-project.command';
import { SyncProjectCommand } from '../application/commands/sync-project.command';
import { UpdateProjectCommand } from '../application/commands/update-project.command';

import { CreateProjectDto } from '../application/dtos/create-project.dto';
import { UpdateProjectDto } from '../application/dtos/update-project.dto';
import { DeleteProjectCommand } from '../application/commands/delete-project.command';
import { Permissions } from '@shared/decorators';
import { PermissionEnum } from '@shared/enums/permission.enum';
import { JwtAuthGuard } from '../../../iam/auth/application/guards/jwt-auth.guard';
import { PermissionsGuard } from '@shared/guards/permissions.guard';
import { UseGuards } from '@nestjs/common';

@Controller('engineering/projects')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ProjectController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async findAll() {
    return this.queryBus.execute(new GetProjectsQuery());
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetProjectQuery(id));
  }

  @Post()
  async create(@Body() dto: CreateProjectDto) {
    return this.commandBus.execute(
      new CreateProjectCommand(dto.title, dto.description),
    );
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.commandBus.execute(new UpdateProjectCommand(id, dto));
  }

  @Delete(':id')
  @Permissions(PermissionEnum.DELETE_PROJECT)
  async remove(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteProjectCommand(id));
  }

  @Post(':id/sync')
  async sync(@Param('id') id: string) {
    return this.commandBus.execute(new SyncProjectCommand(id));
  }

  @Get('github/stats/:username')
  async getGithubStats(@Param('username') username: string) {
    return this.queryBus.execute(new GetGithubStatsQuery(username));
  }

  @Get('github/repos/:username')
  async getGithubRepos(@Param('username') username: string) {
    return this.queryBus.execute(new GetGithubReposQuery(username));
  }
}
