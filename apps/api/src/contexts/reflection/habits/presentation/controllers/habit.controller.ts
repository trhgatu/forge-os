import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../../iam/auth/application/guards/jwt-auth.guard';
import { User } from '@shared/decorators';
import { CreateHabitDto } from '../dto/create-habit.dto';
import { CreateHabitCommand } from '../../application/commands/create-habit.command';
import { CompleteHabitCommand } from '../../application/commands/complete-habit.command';
import { GetAllHabitsQuery } from '../../application/queries/get-all-habits.query';

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
    return this.commandBus.execute(
      new CreateHabitCommand(
        userId,
        dto.title,
        dto.description,
        dto.xpReward,
        dto.difficulty,
        dto.frequency,
      ),
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all active habits for the user' })
  async findAll(@User('id') userId: string) {
    return this.queryBus.execute(new GetAllHabitsQuery(userId));
  }

  @Post(':id/complete')
  @ApiOperation({ summary: 'Complete a habit for today' })
  async complete(@Param('id') id: string, @User('id') userId: string) {
    return this.commandBus.execute(new CompleteHabitCommand(userId, id));
  }
}
