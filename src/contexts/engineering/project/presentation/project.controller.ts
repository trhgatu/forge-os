import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { Request } from 'express';

import { GetAllProjectsQuery } from '../application/queries/get-all-projects.query';
import { GetProjectByIdQuery } from '../application/queries/get-project-by-id.query';
import { QueryProjectDto } from './dto/query-project.dto';
import { GetGithubStatsQuery } from '../application/queries/get-github-stats.query';
import { GetGithubReposQuery } from '../application/queries/get-github-repos.query';
import { CreateProjectCommand } from '../application/commands/create-project.command';
import { SyncProjectCommand } from '../application/commands/sync-project.command';
import { ProjectId } from '../domain/value-objects/project-id.vo';
import { Project } from '../domain/project.entity';
import { UpdateProjectCommand } from '../application/commands/update-project.command';

import { CreateProjectDto } from '../application/dtos/create-project.dto';
import { UpdateProjectDto } from '../application/dtos/update-project.dto';
import { DeleteProjectCommand } from '../application/commands/delete-project.command';
import { ProjectPresenter } from './project.presenter';
import { Permissions, User } from '@shared/decorators';
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
  @Permissions(PermissionEnum.READ_PROJECT)
  async findAll(@Query() query: QueryProjectDto) {
    return this.queryBus.execute(new GetAllProjectsQuery(query));
  }

  @Get(':id')
  @Permissions(PermissionEnum.READ_PROJECT)
  async findOne(@Param('id') id: string, @Req() req: Request) {
    const project = (await this.queryBus.execute(
      new GetProjectByIdQuery(ProjectId.create(id)),
    )) as Project;
    const protocol = req.protocol;
    const host = req.get('host');
    const baseUrl = `${protocol}://${host}/engineering`;
    return ProjectPresenter.toSummaryResponse(project, baseUrl);
  }
  @Get(':id/github-stats')
  @Permissions(PermissionEnum.READ_PROJECT)
  async getProjectGithubStats(@Param('id') id: string) {
    const project = (await this.queryBus.execute(
      new GetProjectByIdQuery(ProjectId.create(id)),
    )) as Project;
    return ProjectPresenter.toGithubStatsResponse(project);
  }

  @Get(':id/readme')
  @Permissions(PermissionEnum.READ_PROJECT)
  async getReadme(@Param('id') id: string) {
    const project = (await this.queryBus.execute(
      new GetProjectByIdQuery(ProjectId.create(id)),
    )) as Project;
    return ProjectPresenter.toReadmeResponse(project);
  }

  @Get(':id/taskboard')
  @Permissions(PermissionEnum.READ_PROJECT)
  async getTaskBoard(@Param('id') id: string) {
    const project = (await this.queryBus.execute(
      new GetProjectByIdQuery(ProjectId.create(id)),
    )) as Project;
    return ProjectPresenter.toTaskBoardResponse(project);
  }

  @Get(':id/logs')
  @Permissions(PermissionEnum.READ_PROJECT)
  async getLogs(
    @Param('id') id: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    const project = (await this.queryBus.execute(
      new GetProjectByIdQuery(ProjectId.create(id)),
    )) as Project;
    return ProjectPresenter.toLogsResponse(
      project,
      Number(page),
      Number(limit),
    );
  }

  @Post()
  @Permissions(PermissionEnum.CREATE_PROJECT)
  async create(@Body() dto: CreateProjectDto, @User('id') userId: string) {
    const project = (await this.commandBus.execute(
      new CreateProjectCommand({
        ...dto,
        userId,
      }),
    )) as Project;
    return ProjectPresenter.toResponse(project);
  }

  @Patch(':id')
  @Permissions(PermissionEnum.UPDATE_PROJECT)
  async update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    const project = (await this.commandBus.execute(
      new UpdateProjectCommand(ProjectId.create(id), dto),
    )) as Project;
    return ProjectPresenter.toResponse(project);
  }

  @Delete(':id')
  @Permissions(PermissionEnum.DELETE_PROJECT)
  async remove(@Param('id') id: string) {
    await this.commandBus.execute(
      new DeleteProjectCommand(ProjectId.create(id)),
    );
    return { success: true };
  }

  @Post(':id/sync')
  @Permissions(PermissionEnum.UPDATE_PROJECT)
  async sync(@Param('id') id: string) {
    const project = (await this.commandBus.execute(
      new SyncProjectCommand(ProjectId.create(id)),
    )) as Project;
    return ProjectPresenter.toResponse(project);
  }

  @Get('github/stats/:username')
  @Permissions(PermissionEnum.READ_PROJECT)
  async getGithubUserStats(@Param('username') username: string) {
    return this.queryBus.execute(new GetGithubStatsQuery(username));
  }

  @Get('github/repos/:username')
  @Permissions(PermissionEnum.READ_PROJECT)
  async getGithubRepos(@Param('username') username: string) {
    return this.queryBus.execute(new GetGithubReposQuery(username));
  }
}
