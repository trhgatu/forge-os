import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  GetProjectsQuery,
  GetProjectQuery,
} from '../application/queries/get-projects.query';
import { GetGithubStatsQuery } from '../application/queries/get-github-stats.query';
import { CreateProjectCommand } from '../application/commands/create-project.command';
import { SyncProjectCommand } from '../application/commands/sync-project.command';
import { UpdateProjectCommand } from '../application/commands/update-project.command';

import { CreateProjectDto } from '../application/dtos/create-project.dto';
import { UpdateProjectDto } from '../application/dtos/update-project.dto';

@Controller('engineering/projects')
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

  @Post(':id/sync')
  async sync(@Param('id') id: string) {
    return this.commandBus.execute(new SyncProjectCommand(id));
  }

  @Get('github/stats/:username')
  async getGithubStats(@Param('username') username: string) {
    return this.queryBus.execute(new GetGithubStatsQuery(username));
  }
}
