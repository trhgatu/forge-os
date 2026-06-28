import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetActiveEffectsQuery } from './get-active-effects.query';
import { StatusEffectRepository } from '../../../domain/ports/status-effect.repository';
import { UserStatusEffect } from '../../../domain/status-effect.entity';

@QueryHandler(GetActiveEffectsQuery)
export class GetActiveEffectsHandler implements IQueryHandler<GetActiveEffectsQuery> {
  constructor(
    @Inject('StatusEffectRepository')
    private readonly repository: StatusEffectRepository,
  ) {}

  async execute(query: GetActiveEffectsQuery): Promise<UserStatusEffect[]> {
    const { userId } = query;
    return this.repository.findActiveByUserId(userId);
  }
}
