import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
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
  async findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetProjectByIdQuery(ProjectId.create(id)));
  }

  @Post()
  @Permissions(PermissionEnum.CREATE_PROJECT)
  async create(@Body() dto: CreateProjectDto, @User('id') userId: string) {
    const project = (await this.commandBus.execute(
      new CreateProjectCommand({
        ...dto,
        userId,
      }),
    )) as unknown as Project; // Explicit cast to avoid unsafe assignment
    return ProjectPresenter.toResponse(project);
  }

  @Patch(':id')
  @Permissions(PermissionEnum.UPDATE_PROJECT)
  async update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    const project = (await this.commandBus.execute(
      new UpdateProjectCommand(ProjectId.create(id), dto),
    )) as unknown as Project;
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
    )) as unknown as Project;
    return ProjectPresenter.toResponse(project);
  }

  @Get('github/stats/:username')
  @Permissions(PermissionEnum.READ_PROJECT)
  async getGithubStats(@Param('username') username: string) {
    return this.queryBus.execute(new GetGithubStatsQuery(username));
  }

  @Get('github/repos/:username')
  @Permissions(PermissionEnum.READ_PROJECT)
  async getGithubRepos(@Param('username') username: string) {
    return this.queryBus.execute(new GetGithubReposQuery(username));
  }
}
