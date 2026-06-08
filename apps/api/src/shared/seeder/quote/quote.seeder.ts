import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { quotes } from './data';

@Injectable()
export class QuoteSeeder {
  private readonly logger = new Logger(QuoteSeeder.name);

  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    this.logger.log('Seeding quotes...');

    for (const quoteData of quotes) {
      const exists = await this.prisma.quote.findFirst({
        where: {
          content: {
            path: ['en'],
            equals: quoteData.content.en,
          },
        },
      });

      if (!exists) {
        await this.prisma.quote.create({
          data: {
            content: quoteData.content,
            author: quoteData.author,
            source: quoteData.source,
            tags: quoteData.tags,
            mood: quoteData.mood,
            status: quoteData.status,
          },
        });
        this.logger.log(`Created quote by: ${quoteData.author}`);
      } else {
        this.logger.debug(`Quote by ${quoteData.author} already exists`);
      }
    }

    this.logger.log('Quotes seeding completed.');
  }
}
