import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../../iam/auth/application/guards/jwt-auth.guard';
import { PermissionsGuard } from '@shared/guards/permissions.guard';
import { Permissions } from '@shared/decorators';
import { PermissionEnum } from '@shared/enums';
import { CreateQuestDto } from '../dto/create-quest.dto';
import { UpdateQuestDto } from '../dto/update-quest.dto';
import { CreateQuestCommand } from '../../application/commands/create-quest.command';
import { UpdateQuestCommand } from '../../application/commands/update-quest.command';
import { DeleteQuestCommand } from '../../application/commands/delete-quest.command';
import { GetAllQuestsQuery } from '../../application/queries/get-all-quests.query';
import { GetQuestByIdQuery } from '../../application/queries/get-quest-by-id.query';

@ApiTags('Evolution / Quests (Admin)')
@ApiBearerAuth()
@Controller('admin/quests')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class QuestAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions(PermissionEnum.CREATE_QUEST)
  @ApiOperation({ summary: 'Create a global system quest' })
  async create(@Body() dto: CreateQuestDto) {
    return this.commandBus.execute(
      new CreateQuestCommand(
        null,
        dto.title,
        dto.description,
        dto.type,
        dto.xpReward,
        dto.objectives,
      ),
    );
  }

  @Get()
  @Permissions(PermissionEnum.READ_QUEST)
  @ApiOperation({ summary: 'Get all system and custom quests' })
  async findAll(@Query('type') type?: string, @Query('isActive') isActive?: boolean) {
    return this.queryBus.execute(new GetAllQuestsQuery(type, isActive));
  }

  @Get(':id')
  @Permissions(PermissionEnum.READ_QUEST)
  @ApiOperation({ summary: 'Get a quest by ID' })
  async findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetQuestByIdQuery(id));
  }

  @Put(':id')
  @Permissions(PermissionEnum.UPDATE_QUEST)
  @ApiOperation({ summary: 'Update a quest and its objectives' })
  async update(@Param('id') id: string, @Body() dto: UpdateQuestDto) {
    return this.commandBus.execute(
      new UpdateQuestCommand(
        id,
        dto.title,
        dto.description,
        dto.type,
        dto.xpReward,
        dto.objectives,
      ),
    );
  }

  @Delete(':id')
  @Permissions(PermissionEnum.DELETE_QUEST)
  @ApiOperation({ summary: 'Deactivate / Soft delete a quest' })
  async remove(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteQuestCommand(id));
  }
}
