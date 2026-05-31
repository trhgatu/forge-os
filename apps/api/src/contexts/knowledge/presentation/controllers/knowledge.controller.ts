import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@root/contexts/iam/auth/application/guards/jwt-auth.guard';
import { User } from '@shared/decorators';
import { KnowledgeService } from '../../application/services/knowledge.service';
import { KnowledgeSourceType } from '@prisma/client';

@ApiTags('Knowledge')
@ApiBearerAuth()
@Controller('knowledge')
@UseGuards(JwtAuthGuard)
export class KnowledgeController {
  constructor(private readonly knowledgeService: KnowledgeService) {}

  @ApiOperation({ summary: 'Scrape content and clean text from an external Web URL' })
  @Post('scrape')
  async scrapeUrl(@Body('url') url: string) {
    return this.knowledgeService.scrapeUrl(url);
  }

  @ApiOperation({ summary: 'Save a polymorphic knowledge concept (Wikipedia, URL, Codex, or Personal Note)' })
  @Post()
  async saveConcept(
    @User('id') userId: string,
    @Body() data: {
      title: string;
      sourceType: KnowledgeSourceType;
      sourceUrl?: string;
      content: string;
      summary?: string;
    },
  ) {
    return this.knowledgeService.saveConcept(userId, data);
  }

  @ApiOperation({ summary: 'Get all saved knowledge concepts for the current user' })
  @Get()
  async findAll(
    @User('id') userId: string,
    @Query('sourceType') sourceType?: KnowledgeSourceType,
  ) {
    return this.knowledgeService.findAll(userId, sourceType);
  }

  @ApiOperation({ summary: 'Get detailed concept, including crystallized flashcards' })
  @Get(':id')
  async findOne(@User('id') userId: string, @Param('id') id: string) {
    return this.knowledgeService.findOne(userId, id);
  }

  @ApiOperation({ summary: 'Delete a knowledge concept' })
  @Delete(':id')
  async delete(@User('id') userId: string, @Param('id') id: string) {
    return this.knowledgeService.deleteConcept(userId, id);
  }
}
