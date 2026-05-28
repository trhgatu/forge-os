import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../../iam/auth/application/guards/jwt-auth.guard';
import { User } from '@shared/decorators';
import { CreateRoutineDto } from '../dto/create-routine.dto';
import { AddHabitToRoutineDto } from '../dto/add-habit-to-routine.dto';
import { CreateRoutineCommand } from '../../application/commands/create-routine.command';
import { AddHabitToRoutineCommand } from '../../application/commands/add-habit-to-routine.command';
import { GetAllRoutinesQuery } from '../../application/queries/get-all-routines.query';

@ApiTags('Reflection / Routines')
@ApiBearerAuth()
@Controller('routines')
@UseGuards(JwtAuthGuard)
export class RoutineController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new routine ritual' })
  async create(@Body() dto: CreateRoutineDto, @User('id') userId: string) {
    return this.commandBus.execute(new CreateRoutineCommand(userId, dto.title, dto.comboXp));
  }

  @Get()
  @ApiOperation({ summary: 'Get all active routines for the user' })
  async findAll(@User('id') userId: string) {
    return this.queryBus.execute(new GetAllRoutinesQuery(userId));
  }

  @Post(':id/habits')
  @ApiOperation({ summary: 'Add a habit step to this routine' })
  async addHabit(
    @Param('id') id: string,
    @Body() dto: AddHabitToRoutineDto,
    @User('id') userId: string,
  ) {
    return this.commandBus.execute(
      new AddHabitToRoutineCommand(userId, id, dto.habitId, dto.order),
    );
  }
}
