import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserStatsQuery } from '../application/queries/get-user-stats.query';
import { JwtAuthGuard } from '../../iam/auth/application/guards/jwt-auth.guard'; // Check path
import { UserStats } from '../domain/user-stats.entity';

@Controller('gamification')
@UseGuards(JwtAuthGuard)
export class GamificationController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('stats')
  async getUserStats(@Req() req: any): Promise<UserStats> {
    const stats = await this.queryBus.execute(
      new GetUserStatsQuery(String(req.user.id)),
    );
    if (!stats) {
      // Return default stats (or should we create them?)
      // Frontend can handle null, or we can return empty object.
      // Let's return a default structure matching the entity but constructed manually if needed
      // or just return null and let frontend handle empty state.
      return {
        userId: req.user.id,
        xp: 0,
        level: 1,
        title: 'Novice',
        streak: 0,
        lastActivityDate: null,
        achievements: [],
      } as any;
    }
    return stats;
  }
}
