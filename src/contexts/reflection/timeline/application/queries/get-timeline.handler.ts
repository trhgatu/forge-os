import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { GetTimelineQuery } from './get-timeline.query';
import { PaginatedResponse } from '@shared/types';
import { TimelineResponse } from '../../presentation/dto/timeline.response';
import { GetAllMemoriesForPublicQuery } from '../../../memory/application/queries';
import { GetAllJournalsForPublicQuery } from '../../../journal/application/queries';
import { GetAllMoodsQuery } from '../../../mood/application/queries';

@QueryHandler(GetTimelineQuery)
export class GetTimelineHandler implements IQueryHandler<GetTimelineQuery> {
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    queryDto: GetTimelineQuery,
  ): Promise<PaginatedResponse<TimelineResponse>> {
    const { page = 1, limit = 20, lang } = queryDto.query;

    // Fetch more than needed to ensure sorting correctness across pagination boundaries (Naive Aggregation)
    // Ideally, we fetch 'limit' from EACH, then sort and slice.
    // But for deep pagination this is tricky.
    // For now, we fetch 'page * limit' items from each source to be safe, or just fetch all?
    // Fetching all might be too heavy.
    // Fetching (page * limit) from each ensures we have enough candidates to fill the top (page * limit).
    // Then we slice the specific page window.

    const fetchLimit = page * limit;

    const [memories, journals, moods] = await Promise.all([
      this.queryBus.execute(
        new GetAllMemoriesForPublicQuery({ page: 1, limit: fetchLimit, lang }),
      ),
      this.queryBus.execute(
        new GetAllJournalsForPublicQuery({ page: 1, limit: fetchLimit }),
      ),
      this.queryBus.execute(
        new GetAllMoodsQuery({ page: 1, limit: fetchLimit }),
      ),
    ]);

    // Map and Tag
    const memoryItems: TimelineResponse[] = memories.data.map((m: any) => ({
      ...m,
      type: 'memory',
    }));
    const journalItems: TimelineResponse[] = journals.data.map((j: any) => ({
      ...j,
      type: 'journal',
    }));
    const moodItems: TimelineResponse[] = moods.data.map((m: any) => ({
      ...m,
      type: 'mood',
    }));

    // Combine
    const allItems = [...memoryItems, ...journalItems, ...moodItems];

    // Sort by date desc using common createdAt
    allItems.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });

    // Slice for Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedItems = allItems.slice(startIndex, endIndex);

    return {
      data: paginatedItems,
      meta: {
        total: memories.meta.total + journals.meta.total + moods.meta.total, // Approx
        page,
        limit,
        totalPages: Math.ceil(allItems.length / limit), // Rough calc based on fetched
      },
    };
  }
}
