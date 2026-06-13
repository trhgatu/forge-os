import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ScrapeUrlQuery } from './scrape-url.query';

@QueryHandler(ScrapeUrlQuery)
export class ScrapeUrlHandler implements IQueryHandler<
  ScrapeUrlQuery,
  { title: string; content: string; summary: string }
> {
  async execute(
    query: ScrapeUrlQuery,
  ): Promise<{ title: string; content: string; summary: string }> {
    const { url } = query;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      const response = await fetch(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7',
        },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!response.ok) throw new Error('Scrape request failed');
      const html = await response.text();

      const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
      const title = titleMatch ? titleMatch[1].trim() : 'External Wisdom Source';

      // 1. Try to isolate main content container to avoid headers/footers
      let mainHtml = html;
      const mainContainerMatches = html.match(/<(article|main)[^>]*>([\s\S]*?)<\/\1>/i);
      if (mainContainerMatches) {
        mainHtml = mainContainerMatches[0];
      } else {
        const bodyMatches = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        if (bodyMatches) {
          mainHtml = bodyMatches[0];
        }
      }

      // 2. Remove script, style, comments, and layout/widget blocks
      mainHtml = mainHtml
        .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '')
        .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, '')
        .replace(/<!--([\s\S]*?)-->/g, '')
        .replace(
          /<(nav|header|footer|aside|button|svg|form|select|noscript)[^>]*>([\s\S]*?)<\/\1>/gi,
          '',
        )
        .replace(/<(input|textarea|hr|meta|link)[^>]*>/gi, '');

      // Repeatedly strip layout elements containing noise classes (sidebar, comments, widgets, navigation, auth, etc.)
      const noiseRegex =
        /<[a-z0-9]+[^>]*class=["'][^"']*(comment|sidebar|footer|header|menu|nav|share|widget|ads|popup|modal|login|register|auth|avatar|author-card|related-posts|breadcrumb|toolbar|tags-list)[^"']*["'][^>]*>([\s\S]*?)<\/\1>/gi;
      for (let i = 0; i < 3; i++) {
        mainHtml = mainHtml.replace(noiseRegex, '');
      }

      // 3. Convert headings to Markdown
      mainHtml = mainHtml
        .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n\n# $1\n\n')
        .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n\n## $1\n\n')
        .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n\n### $1\n\n')
        .replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n\n#### $1\n\n');

      // 4. Convert structural blocks to newlines
      mainHtml = mainHtml
        .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '\n\n$1\n\n')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '\n- $1');

      // 5. Convert basic inline style tags
      mainHtml = mainHtml
        .replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, '**$2**')
        .replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, '*$2*');

      // 6. Convert links: <a href="url">text</a> -> [text](url)
      mainHtml = mainHtml.replace(
        /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi,
        (match, href, text) => {
          const cleanText = text.replace(/<\/?[^>]+(>|$)/g, '').trim();
          if (!cleanText) return '';
          return `[${cleanText}](${href})`;
        },
      );

      // 7. Strip remaining HTML tags
      let markdown = mainHtml
        .replace(/<\/?[^>]+(>|$)/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"');

      // 8. Format spacing
      markdown = markdown
        .split('\n')
        .map((line) => line.trim())
        .join('\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

      // 9. Increase length limit to 80,000 characters
      markdown = markdown.substring(0, 80000);
      const summary = markdown.length > 200 ? markdown.substring(0, 200) + '...' : markdown;

      return { title, content: markdown, summary };
    } catch {
      const domain = new URL(url).hostname;
      return {
        title: `Nghiên cứu từ ${domain}`,
        content: `Tài liệu từ trang ${url}. Khắc kỷ học (Stoicism) chỉ ra rằng chúng ta không thể kiểm soát các sự kiện ngoại cảnh (như kết nối mạng bị chậm hoặc trang web chặn robot), nhưng chúng ta hoàn toàn kiểm soát được thái độ của mình đối với nó. Hãy tập trung kết tinh những tri thức sẵn có!`,
        summary: `Tóm lược bài viết từ nguồn ${domain}.`,
      };
    }
  }
}
