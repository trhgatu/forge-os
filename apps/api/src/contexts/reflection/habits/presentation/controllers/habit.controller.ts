import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../../iam/auth/application/guards/jwt-auth.guard';
import { User } from '@shared/decorators';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { CreateHabitDto } from '../dto/create-habit.dto';
import { UpdateHabitDto } from '../dto/update-habit.dto';
import {
  CreateHabitCommand,
  CompleteHabitCommand,
  UpdateHabitCommand,
  DeleteHabitCommand,
} from '../../application/commands';
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
    private readonly presenter: HabitPresenter,
    private readonly prisma: PrismaService,
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
        dto.actionType,
      ),
    );
    const resp = this.presenter.toResponse(habit);
    return {
      ...resp,
      isCompletedToday: false,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all active habits for the user' })
  async findAll(@User('id') userId: string) {
    const habits = await this.queryBus.execute<GetAllHabitsQuery, Habit[]>(
      new GetAllHabitsQuery(userId),
    );

    const todayStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const start = new Date(`${todayStr}T00:00:00.000Z`);
    const end = new Date(`${todayStr}T23:59:59.999Z`);

    const completions = await this.prisma.habitCompletion.findMany({
      where: {
        userId,
        completedAt: {
          gte: start,
          lte: end,
        },
      },
      select: { habitId: true },
    });

    const completedHabitIds = new Set(completions.map((c) => c.habitId));

    return habits.map((habit) => {
      const resp = this.presenter.toResponse(habit);
      return {
        ...resp,
        isCompletedToday: completedHabitIds.has(habit.id),
      };
    });
  }

  @Post(':id/complete')
  @ApiOperation({ summary: 'Complete a habit for today' })
  async complete(@Param('id') id: string, @User('id') userId: string) {
    return this.commandBus.execute(new CompleteHabitCommand(userId, id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing habit' })
  async update(@Param('id') id: string, @Body() dto: UpdateHabitDto, @User('id') userId: string) {
    const habit = await this.commandBus.execute<UpdateHabitCommand, Habit>(
      new UpdateHabitCommand(
        userId,
        id,
        dto.title,
        dto.description,
        dto.difficulty,
        dto.xpReward,
        dto.actionType,
      ),
    );
    return this.presenter.toResponse(habit);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a habit' })
  async delete(@Param('id') id: string, @User('id') userId: string) {
    await this.commandBus.execute(new DeleteHabitCommand(userId, id));
    return { success: true };
  }
}
