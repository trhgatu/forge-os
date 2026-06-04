import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { KnowledgeSourceType } from '@prisma/client';

@Injectable()
export class KnowledgeService {
  constructor(private readonly prisma: PrismaService) {}

  async saveConcept(
    userId: string,
    data: {
      title: string;
      sourceType: KnowledgeSourceType;
      sourceUrl?: string;
      content: string;
      summary?: string;
    },
  ) {
    const { insights, reflection } = this.generateAutomaticMetadata(data.title, data.content);

    return this.prisma.knowledgeConcept.create({
      data: {
        userId,
        title: data.title,
        sourceType: data.sourceType,
        sourceUrl: data.sourceUrl,
        content: data.content,
        summary:
          data.summary ||
          (data.content.length > 200 ? data.content.substring(0, 200) + '...' : data.content),
        insights: insights as any,
        reflection,
      },
    });
  }

  async scrapeUrl(url: string): Promise<{ title: string; content: string; summary: string }> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!response.ok) throw new Error('Scrape request failed');
      const html = await response.text();

      const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
      const title = titleMatch ? titleMatch[1].trim() : 'External Wisdom Source';

      let bodyText = html
        .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '')
        .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, '')
        .replace(/<\/?[^>]+(>|$)/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      bodyText = bodyText.substring(0, 3000);
      const summary = bodyText.length > 200 ? bodyText.substring(0, 200) + '...' : bodyText;

      return { title, content: bodyText, summary };
    } catch {
      const domain = new URL(url).hostname;
      return {
        title: `Nghiên cứu từ ${domain}`,
        content: `Tài liệu từ trang ${url}. Khắc kỷ học (Stoicism) chỉ ra rằng chúng ta không thể kiểm soát các sự kiện ngoại cảnh (như kết nối mạng bị chậm hoặc trang web chặn robot), nhưng chúng ta hoàn toàn kiểm soát được thái độ của mình đối với nó. Hãy tập trung kết tinh những tri thức sẵn có!`,
        summary: `Tóm lược bài viết từ nguồn ${domain}.`,
      };
    }
  }

  async findAll(userId: string, sourceType?: KnowledgeSourceType) {
    return this.prisma.knowledgeConcept.findMany({
      where: {
        userId,
        ...(sourceType ? { sourceType } : {}),
      },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { flashcards: true },
        },
      },
    });
  }

  async findOne(userId: string, id: string) {
    const concept = await this.prisma.knowledgeConcept.findFirst({
      where: { id, userId },
      include: {
        flashcards: {
          include: {
            vocabulary: true,
          },
        },
      },
    });

    if (!concept) {
      throw new NotFoundException(
        'Tri thức này không tồn tại hoặc không thuộc quyền sở hữu của bạn.',
      );
    }

    return concept;
  }

  async deleteConcept(userId: string, id: string) {
    const concept = await this.prisma.knowledgeConcept.findFirst({
      where: { id, userId },
    });

    if (!concept) {
      throw new NotFoundException('Không tìm thấy khái niệm tri thức.');
    }

    await this.prisma.knowledgeConcept.delete({
      where: { id },
    });

    return { success: true };
  }

  private generateAutomaticMetadata(
    title: string,
    content: string,
  ): { insights: string[]; reflection: string } {
    const sentences = content
      .replace(/<[^>]*>/g, '')
      .split(/[.!?]+?/)
      .map((s) => s.trim())
      .filter((s) => s.length > 30);

    const insights = sentences.slice(0, 3);
    if (insights.length < 3) {
      insights.push(`Tri thức về '${title}' khai mở cho tâm thức những góc nhìn mới.`);
      insights.push(`Sự tập trung phân tích bài học giúp củng cố liên kết thần kinh.`);
      insights.push(
        `Crystallization (Kết tinh) là giao thức chuyển hóa thông tin thô thành trí tuệ.`,
      );
    }

    const reflectionPrompts = [
      `Khái niệm '${title}' liên kết như thế nào với những trải nghiệm thực tế trong ngày hôm nay của bạn?`,
      `Bài học triết học nào từ '${title}' có thể được áp dụng trực tiếp để củng cố lý trí và ý chí của bạn?`,
      `Nếu phải giải thích '${title}' cho một đứa trẻ, bạn sẽ chọn lọc tinh hoa nào để truyền tải?`,
    ];
    const reflection = reflectionPrompts[Math.floor(Math.random() * reflectionPrompts.length)];

    return { insights: insights.slice(0, 3), reflection };
  }
}
