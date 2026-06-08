import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../../iam/auth/application/guards/jwt-auth.guard';
import { User } from '@shared/decorators';
import { CreateQuestDto } from '../dto/create-quest.dto';
import { CreateQuestCommand } from '../../application/commands';
import { GetDailyQuestsQuery } from '../../application/queries';
import { GoalsService } from '../../../goals/application/goals.service';
import { QuestPresenter } from '../presenters/quest.presenter';
import { Quest } from '../../domain/quest.entity';

@ApiTags('Evolution / Quests')
@ApiBearerAuth()
@Controller('quests')
@UseGuards(JwtAuthGuard)
export class QuestController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly goalsService: GoalsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a custom personal quest' })
  async create(@Body() dto: CreateQuestDto, @User('id') userId: string) {
    const quest = await this.commandBus.execute<CreateQuestCommand, Quest>(
      new CreateQuestCommand(
        userId,
        dto.title,
        dto.description,
        dto.type,
        dto.xpReward,
        dto.objectives,
      ),
    );
    return QuestPresenter.toResponse(quest);
  }

  @Get('daily')
  @ApiOperation({ summary: 'Get all daily, main, and side quests with current progress' })
  async findDaily(@User('id') userId: string) {
    return this.queryBus.execute(new GetDailyQuestsQuery(userId));
  }

  @Get('goals')
  @ApiOperation({ summary: 'Get all epic goals with dynamic user progress' })
  async findGoals(@User('id') userId: string) {
    return this.goalsService.getUserGoals(userId);
  }
}
