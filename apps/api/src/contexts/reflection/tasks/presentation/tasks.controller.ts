import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../iam/auth/application/guards/jwt-auth.guard';
import { User } from '@shared/decorators';
import { TasksService } from '../application/tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';

@ApiTags('Reflection / Tasks')
@ApiBearerAuth()
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new standalone workspace task' })
  @ApiResponse({ status: 201, description: 'Task successfully created' })
  async create(@Body() dto: CreateTaskDto, @User('id') userId: string) {
    return this.tasksService.createTask(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active tasks for current user' })
  async findAll(@User('id') userId: string) {
    return this.tasksService.getTasks(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific task by ID' })
  async findOne(@Param('id') id: string, @User('id') userId: string) {
    return this.tasksService.getTaskById(userId, id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a specific task details or status' })
  async update(@Param('id') id: string, @Body() dto: UpdateTaskDto, @User('id') userId: string) {
    return this.tasksService.updateTask(userId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a task' })
  async remove(@Param('id') id: string, @User('id') userId: string) {
    return this.tasksService.deleteTask(userId, id);
  }
}
