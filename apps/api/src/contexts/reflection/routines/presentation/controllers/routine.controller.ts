import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../../iam/auth/application/guards/jwt-auth.guard';
import { User } from '@shared/decorators';
import { CreateRoutineDto } from '../dto/create-routine.dto';
import { AddHabitToRoutineDto } from '../dto/add-habit-to-routine.dto';
import { CreateRoutineCommand, AddHabitToRoutineCommand } from '../../application/commands';
import { GetAllRoutinesQuery } from '../../application/queries';
import { RoutinePresenter } from '../presenters/routine.presenter';
import { Routine } from '../../domain/routine.entity';

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
    const routine = await this.commandBus.execute<CreateRoutineCommand, Routine>(
      new CreateRoutineCommand(userId, dto.title, dto.comboXp),
    );
    return RoutinePresenter.toResponse(routine);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active routines for the user' })
  async findAll(@User('id') userId: string) {
    const routines = await this.queryBus.execute<GetAllRoutinesQuery, Routine[]>(
      new GetAllRoutinesQuery(userId),
    );
    return RoutinePresenter.toResponseArray(routines);
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
