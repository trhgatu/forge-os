import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserStatsQuery } from '../application/queries/get-user-stats.query';
import { JwtAuthGuard } from '../../iam/auth/application/guards/jwt-auth.guard'; // Check path
import { UserStatsDto } from '@forge/auth';

@Controller('gamification')
@UseGuards(JwtAuthGuard)
export class GamificationController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('stats')
  async getUserStats(@Req() req: any): Promise<UserStatsDto> {
    const stats = await this.queryBus.execute(new GetUserStatsQuery(String(req.user.id)));
    if (!stats) {
      return {
        userId: req.user.id,
        xp: 0,
        level: 1,
        title: 'Novice',
        streak: 0,
        lastActivityDate: null,
        achievements: [],
        discipline: 0,
        consistency: 0,
        willpower: 0,
        awareness: 0,
        presence: 0,
      } as any;
    }
    return stats;
  }
}
