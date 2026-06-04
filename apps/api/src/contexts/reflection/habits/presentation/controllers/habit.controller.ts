import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../../iam/auth/application/guards/jwt-auth.guard';
import { User } from '@shared/decorators';
import { CreateHabitDto } from '../dto/create-habit.dto';
import { CreateHabitCommand, CompleteHabitCommand } from '../../application/commands';
import { GetAllHabitsQuery } from '../../application/queries';
import { HabitPresenter } from '../presenters/habit.presenter';
import { Habit } from '../../domain/habit.entity';

@ApiTags('Reflection / Habits')
@ApiBearerAuth()
@Controller('habits')
@UseGuards(JwtAuthGuard)
export class HabitController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new habit' })
  async create(@Body() dto: CreateHabitDto, @User('id') userId: string) {
    const habit = await this.commandBus.execute<CreateHabitCommand, Habit>(
      new CreateHabitCommand(
        userId,
        dto.title,
        dto.description,
        dto.xpReward,
        dto.difficulty,
        dto.frequency,
      ),
    );
    return HabitPresenter.toResponse(habit);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active habits for the user' })
  async findAll(@User('id') userId: string) {
    const habits = await this.queryBus.execute<GetAllHabitsQuery, Habit[]>(
      new GetAllHabitsQuery(userId),
    );
    return HabitPresenter.toResponseArray(habits);
  }

  @Post(':id/complete')
  @ApiOperation({ summary: 'Complete a habit for today' })
  async complete(@Param('id') id: string, @User('id') userId: string) {
    return this.commandBus.execute(new CompleteHabitCommand(userId, id));
  }
}
