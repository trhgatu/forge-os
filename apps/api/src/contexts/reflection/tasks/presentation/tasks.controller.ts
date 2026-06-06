import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../iam/auth/application/guards/jwt-auth.guard';
import { User } from '@shared/decorators';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTaskCommand, UpdateTaskCommand, DeleteTaskCommand } from '../application/commands';
import { GetTasksQuery, GetTaskByIdQuery } from '../application/queries';
import { TaskPresenter } from './presenters/task.presenter';
import { CreateTaskDto, UpdateTaskDto } from './dto';

@ApiTags('Reflection / Tasks')
@ApiBearerAuth()
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly presenter: TaskPresenter,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new standalone workspace task' })
  @ApiResponse({ status: 201, description: 'Task successfully created' })
  async create(@Body() dto: CreateTaskDto, @User('id') userId: string) {
    const task = await this.commandBus.execute(new CreateTaskCommand(userId, dto));
    return this.presenter.toResponse(task);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active tasks for current user' })
  async findAll(@User('id') userId: string) {
    const tasks = await this.queryBus.execute(new GetTasksQuery(userId));
    return this.presenter.toResponseArray(tasks);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific task by ID' })
  async findOne(@Param('id') id: string, @User('id') userId: string) {
    const task = await this.queryBus.execute(new GetTaskByIdQuery(userId, id));
    return this.presenter.toResponse(task);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a specific task details or status' })
  async update(@Param('id') id: string, @Body() dto: UpdateTaskDto, @User('id') userId: string) {
    const task = await this.commandBus.execute(new UpdateTaskCommand(userId, id, dto));
    return this.presenter.toResponse(task);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a task' })
  async remove(@Param('id') id: string, @User('id') userId: string) {
    const task = await this.commandBus.execute(new DeleteTaskCommand(userId, id));
    return this.presenter.toResponse(task);
  }
}
