import { Controller, Get, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../../../../iam/auth/application/guards/jwt-auth.guard';
import { ConfigService } from '../../application/services/config.service';
import { UpdateSystemConfigCommand } from '../../application/commands/update-config/update-config.command';

@Controller('system/configs')
@UseGuards(JwtAuthGuard)
export class SystemConfigController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  async getConfigs() {
    return {
      status: 'success',
      data: this.configService.getAll(),
    };
  }

  @Patch(':key')
  async updateConfig(@Param('key') key: string, @Body('value') value: any) {
    await this.commandBus.execute(new UpdateSystemConfigCommand(key, value));
    return {
      status: 'success',
      message: `System configuration updated for key: ${key}`,
    };
  }
}
