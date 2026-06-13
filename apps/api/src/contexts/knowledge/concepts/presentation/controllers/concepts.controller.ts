import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@root/contexts/iam/auth/application/guards/jwt-auth.guard';
import { User } from '@shared/decorators';
import { KnowledgeSourceType } from '@prisma/client';
import { ConceptPresenter } from '../presenters/concept.presenter';
import {
  SaveConceptCommand,
  UpdateConceptCommand,
  DeleteConceptCommand,
} from '../../application/commands';
import {
  GetAllConceptsQuery,
  GetConceptByIdQuery,
  ScrapeUrlQuery,
} from '../../application/queries';

@ApiTags('Knowledge')
@ApiBearerAuth()
@Controller('knowledge')
@UseGuards(JwtAuthGuard)
export class ConceptsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly presenter: ConceptPresenter,
  ) {}

  @ApiOperation({ summary: 'Scrape content and clean text from an external Web URL' })
  @Post('scrape')
  async scrapeUrl(@Body('url') url: string) {
    return this.queryBus.execute(new ScrapeUrlQuery(url));
  }

  @ApiOperation({
    summary: 'Save a polymorphic knowledge concept (Wikipedia, URL, Codex, or Personal Note)',
  })
  @Post()
  async saveConcept(
    @User('id') userId: string,
    @Body()
    data: {
      title: string;
      sourceType: KnowledgeSourceType;
      sourceUrl?: string;
      content: string;
      summary?: string;
    },
  ) {
    const concept = await this.commandBus.execute(new SaveConceptCommand({ ...data, userId }));
    return this.presenter.toResponse(concept);
  }

  @ApiOperation({ summary: 'Get all saved knowledge concepts for the current user' })
  @Get()
  async findAll(@User('id') userId: string, @Query('sourceType') sourceType?: KnowledgeSourceType) {
    const concepts = await this.queryBus.execute(new GetAllConceptsQuery(userId, sourceType));
    return this.presenter.toResponseArray(concepts);
  }

  @ApiOperation({ summary: 'Get detailed concept, including crystallized flashcards' })
  @Get(':id')
  async findOne(@User('id') userId: string, @Param('id') id: string) {
    const concept = await this.queryBus.execute(new GetConceptByIdQuery(id, userId));
    return this.presenter.toResponse(concept);
  }

  @ApiOperation({ summary: 'Update a knowledge concept' })
  @Patch(':id')
  async update(
    @User('id') userId: string,
    @Param('id') id: string,
    @Body()
    data: {
      title?: string;
      content?: string;
      summary?: string;
    },
  ) {
    const concept = await this.commandBus.execute(
      new UpdateConceptCommand({ ...data, id, userId }),
    );
    return this.presenter.toResponse(concept);
  }

  @ApiOperation({ summary: 'Delete a knowledge concept' })
  @Delete(':id')
  async delete(@User('id') userId: string, @Param('id') id: string) {
    return this.commandBus.execute(new DeleteConceptCommand(id, userId));
  }
}
