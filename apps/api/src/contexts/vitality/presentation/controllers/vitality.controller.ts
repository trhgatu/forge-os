import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@root/contexts/iam/auth/application/guards/jwt-auth.guard';
import { User } from '@shared/decorators';
import { LogVitalityDto } from '../dto/log-vitality.dto';
import { LogVitalityActionCommand } from '../../application/commands/log-vitality-action/log-vitality-action.command';
import { GetVitalityStatsQuery } from '../../application/queries/get-vitality/get-vitality.query';
import { VitalityPresenter } from '../presenters/vitality.presenter';

@ApiTags('Reflection / Vitality')
@ApiBearerAuth()
@Controller('vitality')
@UseGuards(JwtAuthGuard)
export class VitalityController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly presenter: VitalityPresenter,
  ) {}

  @Post('log')
  @ApiOperation({
    summary: 'Log a new physical health activity (hydration, sleep, caffeine, steps, workout)',
  })
  async logActivity(@Body() dto: LogVitalityDto, @User('id') userId: string) {
    const result = await this.commandBus.execute(
      new LogVitalityActionCommand(userId, dto.type, dto.value, dto.metadata),
    );
    return this.presenter.toStatsResponse(result);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Retrieve current user vitality stats and today averages' })
  async getStats(@User('id') userId: string) {
    const result = await this.queryBus.execute(new GetVitalityStatsQuery(userId));
    return this.presenter.toStatsResponse(result);
  }
}
