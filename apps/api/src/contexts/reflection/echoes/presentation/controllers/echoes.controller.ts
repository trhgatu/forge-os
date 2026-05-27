import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../../iam/auth/application/guards/jwt-auth.guard';
import { User } from '@shared/decorators';
import { CreateFlowMomentDto } from '../dto/create-flow-moment.dto';
import { EchoesService } from '../../application/services/echoes.service';

@ApiTags('Reflection / Echoes')
@ApiBearerAuth()
@Controller('echoes')
@UseGuards(JwtAuthGuard)
export class EchoesController {
  constructor(private readonly echoesService: EchoesService) {}

  @Post('sync')
  @ApiOperation({ summary: 'Sync and record a new sensory flow moment' })
  async syncMoment(@Body() dto: CreateFlowMomentDto, @User('id') userId: string) {
    return this.echoesService.syncMoment(userId, dto);
  }

  @Get('history')
  @ApiOperation({ summary: 'Retrieve sensory flow moment constellation history' })
  async getHistory(@User('id') userId: string) {
    return this.echoesService.getHistory(userId);
  }

  @Post('clear')
  @ApiOperation({ summary: 'Clear sensory flow moment constellation history' })
  async clearHistory(@User('id') userId: string) {
    return this.echoesService.clearHistory(userId);
  }
}
