import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../../iam/auth/application/guards/jwt-auth.guard';
import { PermissionsGuard } from '@shared/guards/permissions.guard';
import { Permissions, User } from '@shared/decorators';
import { PermissionEnum } from '@shared/enums';
import { CreateGoalDto } from '../dto/create-goal.dto';
import { UpdateGoalDto } from '../dto/update-goal.dto';
import {
  CreateGoalCommand,
  UpdateGoalCommand,
  DeleteGoalCommand,
} from '../../application/commands';
import { GetGoalsQuery, GetGoalByIdQuery } from '../../application/queries';
import { GoalPresenter } from '../presenters/goal.presenter';

@ApiTags('Evolution / Epic Goals')
@ApiBearerAuth()
@Controller('goals')
@UseGuards(JwtAuthGuard)
export class GoalController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all epic goals with dynamic user progress' })
  async findAll(@User('id') userId: string) {
    const goals = await this.queryBus.execute(new GetGoalsQuery(userId));
    return GoalPresenter.toResponseArray(goals);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single epic goal with details' })
  async findOne(@Param('id') id: string, @User('id') userId: string) {
    const goal = await this.queryBus.execute(new GetGoalByIdQuery(id, userId));
    return GoalPresenter.toResponse(goal);
  }

  @Post()
  @UseGuards(PermissionsGuard)
  @Permissions(PermissionEnum.CREATE_GOAL)
  @ApiOperation({ summary: 'Create an Epic Goal and its objectives (Admin Only)' })
  async create(@Body() dto: CreateGoalDto) {
    const goal = await this.commandBus.execute(
      new CreateGoalCommand(
        null,
        dto.title,
        dto.description,
        dto.xpReward,
        dto.badgeIcon,
        dto.objectives,
      ),
    );
    return GoalPresenter.toResponse(goal);
  }

  @Put(':id')
  @UseGuards(PermissionsGuard)
  @Permissions(PermissionEnum.UPDATE_GOAL)
  @ApiOperation({ summary: 'Update an Epic Goal and sync its objectives (Admin Only)' })
  async update(@Param('id') id: string, @Body() dto: UpdateGoalDto) {
    const goal = await this.commandBus.execute(
      new UpdateGoalCommand(
        id,
        dto.title,
        dto.description,
        dto.xpReward,
        dto.badgeIcon,
        dto.isActive,
        dto.objectives,
      ),
    );
    return GoalPresenter.toResponse(goal);
  }

  @Delete(':id')
  @UseGuards(PermissionsGuard)
  @Permissions(PermissionEnum.DELETE_GOAL)
  @ApiOperation({ summary: 'Hard delete an Epic Goal (Admin Only)' })
  async remove(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteGoalCommand(id));
  }
}
