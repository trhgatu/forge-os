import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../../iam/auth/application/guards/jwt-auth.guard';
import { User } from '@shared/decorators';
import { CreateQuestDto } from '../dto/create-quest.dto';
import { CreateQuestCommand } from '../../application/commands/create-quest.command';
import { GetDailyQuestsQuery } from '../../application/queries/get-daily-quests.query';

@ApiTags('Evolution / Quests')
@ApiBearerAuth()
@Controller('quests')
@UseGuards(JwtAuthGuard)
export class QuestController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a custom personal quest' })
  async create(@Body() dto: CreateQuestDto, @User('id') userId: string) {
    return this.commandBus.execute(
      new CreateQuestCommand(
        userId,
        dto.title,
        dto.description,
        dto.type,
        dto.xpReward,
        dto.objectives,
      ),
    );
  }

  @Get('daily')
  @ApiOperation({ summary: 'Get all daily, main, and side quests with current progress' })
  async findDaily(@User('id') userId: string) {
    return this.queryBus.execute(new GetDailyQuestsQuery(userId));
  }
}
