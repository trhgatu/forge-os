import type { KnowledgeConcept } from '@/shared/types';

import type { WikiQueryResponse, WikiSearchResponse } from '../types/wiki-api';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export function cleanWikiContent(text: string, lang: string = 'en'): string {
  if (!text) return '';

  const normalized = lang === 'vi' ? 'vi' : 'en';

  // 1. HTML cutoff patterns (e.g. <h2>Chú thích</h2>)
  const htmlPatterns = [
    /<h[2-4].*?>\s*(chú thích|tham khảo|liên kết ngoài|xem thêm|tư liệu liên quan|dữ liệu liên quan|nguồn tham khảo|nguồn)\s*<\/h[2-4]>/i,
    /<h[2-4].*?>\s*(references|external links|see also|further reading|notes|sources|bibliography)\s*<\/h[2-4]>/i,
    /<span.*?id="\s*(chú_thích|tham_khảo|liên_kết_ngoài|xem_thêm|tư_liệu_liên_quan|dữ_liệu_liên_quan)\s*"/i,
    /<span.*?id="\s*(references|external_links|see_also|further_reading|notes|sources)\s*"/i,
  ];

  let cleaned = text;

  for (const pattern of htmlPatterns) {
    const match = cleaned.match(pattern);
    if (match && match.index !== undefined) {
      cleaned = cleaned.substring(0, match.index);
    }
  }

  // 2. Plain text cutoff patterns (e.g. == Chú thích ==)
  const plainPatterns = [
    /\n==+\s*(chú thích|tham khảo|liên kết ngoài|xem thêm|tư liệu liên quan|dữ liệu liên quan|nguồn tham khảo|nguồn)\s*==+/i,
    /\n==+\s*(references|external links|see also|further reading|notes|sources|bibliography)\s*==+/i,
  ];

  for (const pattern of plainPatterns) {
    const match = cleaned.match(pattern);
    if (match && match.index !== undefined) {
      cleaned = cleaned.substring(0, match.index);
    }
  }

  // 3. Resolve protocol-relative image and media URLs
  cleaned = cleaned.replace(/src="\/\//g, 'src="https://');
  cleaned = cleaned.replace(/srcset="\/\//g, 'srcset="https://');

  // 4. Map local Wikipedia links to absolute URLs opening in a new tab
  cleaned = cleaned.replace(/href="\/wiki\//g, `target="_blank" href="https://${normalized}.wikipedia.org/wiki/`);

  return cleaned.trim();
}

const generateInsights = async (html: string): Promise<string[]> => {
  await delay(300);

  // Extract text specifically inside <p>...</p> tags to avoid taxonomic details and formatting elements
  const paragraphMatches = html.match(/<p>([\s\S]*?)<\/p>/gi);
  if (!paragraphMatches || paragraphMatches.length === 0) {
    const clean = html.replace(/<[^>]*>/g, '');
    const sentences = clean
      .split('.')
      .map((s) => s.trim())
      .filter((s) => s.length > 30);
    return sentences.slice(0, 3).map((s) => s + '.');
  }

  // Clean all HTML tags inside matched paragraphs and split into factual sentences
  const bodyText = paragraphMatches
    .map((p) => p.replace(/<[^>]+>/g, '').trim())
    .join(' ');

  const sentences = bodyText
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .map((s) => s.replace(/\[\d+\]/g, '').trim()) // Remove citation markers like [1], [2], etc.
    .filter((s) => s.length > 50 && s.length < 180 && !s.includes('http') && !s.includes('wiki'));

  const selected = sentences.slice(0, 3);
  
  if (selected.length === 0) {
    const fallbackSentences = bodyText
      .split('.')
      .map((s) => s.trim())
      .filter((s) => s.length > 30);
    return fallbackSentences.slice(0, 3).map((s) => s + '.');
  }

  return selected.map((s) => s + '.');
};

const generateReflection = async (title: string, html: string): Promise<string> => {
  await delay(350);

  const paragraphMatches = html.match(/<p>([\s\S]*?)<\/p>/gi);
  const text = paragraphMatches
    ? paragraphMatches.map((p) => p.replace(/<[^>]+>/g, '').trim()).join(' ')
    : html.replace(/<[^>]*>/g, '').trim();

  const wordCount = text.split(/\s+/).length;

  const prompts = [
    wordCount > 500
      ? 'This is a dense concept with significant depth.'
      : 'This is a concise concept with a sharp core.',
    text.includes('theory')
      ? 'It connects strongly with your pattern of theoretical exploration.'
      : 'It aligns with your tendency toward practical synthesis.',
    text.includes('history')
      ? 'There is a historical resonance here that mirrors your reflective nature.'
      : 'Its forward-facing nature matches your evolving mindset.',
  ];

  const intro = prompts[Math.floor(Math.random() * prompts.length)];

  return `${intro} The essence of '${title}' reveals a deeper structure within you.`;
};

const normalizeLang = (lang: string) => (lang === 'vi' ? 'vi' : 'en');

// --------------------------------------------------
// SEARCH
// --------------------------------------------------
export async function searchWikipedia(query: string, lang: string): Promise<KnowledgeConcept[]> {
  if (!query.trim()) return [];

  const normalized = normalizeLang(lang);

  const params = new URLSearchParams({
    origin: '*',
    action: 'query',
    list: 'search',
    format: 'json',
    srsearch: query,
    srlimit: '10',
    srprop: 'snippet',
  });

  const res = await fetch(`https://${normalized}.wikipedia.org/w/api.php?${params}`);
  const data: WikiSearchResponse = await res.json();

  const now = new Date().toISOString();
  const items = data.query?.search ?? [];

  return items.map((item) => ({
    id: `${normalized}-${item.pageid}`,
    title: item.title,
    summary: item.snippet.replace(/<\/?[^>]+>/g, ''),
    extract: item.snippet.replace(/<\/?[^>]+>/g, ''),
    createdAt: now,
    source: 'wikipedia',
    language: normalized,
  }));
}

export async function getConceptDetails(
  title: string,
  lang: string,
): Promise<KnowledgeConcept | null> {
  const normalized = normalizeLang(lang);

  const params = new URLSearchParams({
    origin: '*',
    action: 'query',
    prop: 'extracts|pageimages|info|categories',
    inprop: 'url|displaytitle|touched',
    pithumbsize: '1200',
    redirects: '1',
    format: 'json',
    titles: title,
  });

  try {
    const res = await fetch(`https://${normalized}.wikipedia.org/w/api.php?${params}`);
    const data: WikiQueryResponse = await res.json();

    const pageId = Object.keys(data.query.pages)[0];
    const page = data.query.pages[pageId];

    if (!page || pageId === '-1') return null;

    const extractHTML = page.extract ?? '';

    // Fetch the fully parsed HTML from Wikipedia parse API to preserve infoboxes, tables, taxonomic lists, inline images etc.
    let cleanedHTML = '';
    try {
      const parseParams = new URLSearchParams({
        origin: '*',
        action: 'parse',
        page: page.title,
        prop: 'text',
        format: 'json',
        redirects: '1',
      });
      const parseRes = await fetch(`https://${normalized}.wikipedia.org/w/api.php?${parseParams}`);
      const parseData = await parseRes.json();
      const rawParsedHTML = parseData.parse?.text?.['*'] ?? extractHTML;
      cleanedHTML = cleanWikiContent(rawParsedHTML, normalized);
    } catch (parseErr) {
      console.warn('Wikipedia parse API failed, falling back to query extract:', parseErr);
      cleanedHTML = cleanWikiContent(extractHTML, normalized);
    }

    const rawText = cleanedHTML.replace(/<[^>]+>/g, '').trim();
    const summary = rawText.length > 200 ? rawText.substring(0, 200) + '...' : rawText;

    const insights = await generateInsights(cleanedHTML);
    const reflection = await generateReflection(page.title, cleanedHTML);

    const categories =
      page.categories
        ?.map((c) => c.title.replace('Category:', ''))
        .filter((c) => !c.toLowerCase().includes('articles')) ?? [];

    return {
      id: String(page.pageid),
      title: page.title,
      extract: summary,
      summary,
      content: cleanedHTML,
      url: page.fullurl,
      imageUrl: page.thumbnail?.source,
      language: normalized,
      createdAt: new Date().toISOString(),
      lastModified: page.touched,
      metadata: {
        categories: categories.slice(0, 6),
        keywords: [page.title],
      },
      insights,
      reflection,
    };
  } catch (err) {
    console.error('Knowledge detail error:', err);
    return null;
  }
}

// --------------------------------------------------
// RANDOM DISCOVERY
// --------------------------------------------------
export async function getRandomConcepts(
  lang: string,
  limit: number = 15,
): Promise<KnowledgeConcept[]> {
  const normalized = normalizeLang(lang);

  const randomParams = new URLSearchParams({
    origin: '*',
    action: 'query',
    list: 'random',
    rnnamespace: '0', // Articles only
    rnlimit: String(limit),
    format: 'json',
  });

  try {
    const randomRes = await fetch(`https://${normalized}.wikipedia.org/w/api.php?${randomParams}`);
    const randomData = await randomRes.json();
    const items = randomData.query?.random ?? [];

    if (items.length === 0) return [];

    // Join titles by "|" for batch query
    const titles = items.map((item: any) => item.title).join('|');

    const detailParams = new URLSearchParams({
      origin: '*',
      action: 'query',
      prop: 'extracts|pageimages|info|categories',
      exintro: '1',
      explaintext: '1',
      exchars: '250',
      inprop: 'url',
      pithumbsize: '1000',
      format: 'json',
      titles,
    });

    const detailRes = await fetch(`https://${normalized}.wikipedia.org/w/api.php?${detailParams}`);
    const detailData = await detailRes.json();

    const pages = detailData.query?.pages ?? {};
    const now = new Date().toISOString();

    return Object.values(pages)
      .map((page: any) => {
        const categories = page.categories
          ?.map((c: any) => c.title.replace('Category:', ''))
          .filter((c: string) => !c.toLowerCase().includes('articles')) ?? [];

        const cleanedExtract = cleanWikiContent(page.extract || '', normalized);

        return {
          id: String(page.pageid),
          title: page.title,
          summary: cleanedExtract || 'A random discovery from the global grid.',
          extract: cleanedExtract || 'A random discovery from the global grid.',
          content: cleanedExtract || '',
          url: page.fullurl,
          imageUrl: page.thumbnail?.source,
          language: normalized,
          createdAt: now,
          metadata: {
            categories: categories.slice(0, 3),
            keywords: [page.title],
          },
        };
      })
      .filter((concept: any) => concept.imageUrl); // Filter concepts with images to make Carousel look visually incredible!
  } catch (err) {
    console.error('Random concept error:', err);
    return [];
  }
}

import { apiClient } from '@/services/apiClient';

import type { BackendResponse } from '@forge/core';

export async function saveConceptToDb(data: {
  title: string;
  sourceType: 'WIKIPEDIA' | 'WEB_ARTICLE' | 'CODEX_BOOK' | 'PERSONAL_NOTE';
  sourceUrl?: string;
  content: string;
  summary?: string;
}): Promise<KnowledgeConcept> {
  const res = await apiClient.post<BackendResponse<any>>('/knowledge', data);
  const dbConcept = res.data.data;
  return {
    id: dbConcept.id,
    title: dbConcept.title,
    content: dbConcept.content,
    summary: dbConcept.summary,
    url: dbConcept.sourceUrl,
    language: 'en',
    createdAt: dbConcept.createdAt,
    insights: dbConcept.insights,
    reflection: dbConcept.reflection,
    metadata: {
      categories: [],
      keywords: [],
    },
  };
}

export async function getConceptsFromDb(sourceType?: string): Promise<KnowledgeConcept[]> {
  const params = sourceType ? { sourceType } : {};
  const res = await apiClient.get<BackendResponse<any[]>>('/knowledge', { params });
  return res.data.data.map((dbConcept) => ({
    id: dbConcept.id,
    title: dbConcept.title,
    content: dbConcept.content,
    summary: dbConcept.summary,
    url: dbConcept.sourceUrl,
    language: 'en',
    createdAt: dbConcept.createdAt,
    insights: dbConcept.insights,
    reflection: dbConcept.reflection,
    metadata: {
      categories: [],
      keywords: [],
    },
  }));
}

export async function getConceptDetailsFromDb(id: string): Promise<KnowledgeConcept & { flashcards: any[] }> {
  const res = await apiClient.get<BackendResponse<any>>(`/knowledge/${id}`);
  const dbConcept = res.data.data;
  return {
    id: dbConcept.id,
    title: dbConcept.title,
    content: dbConcept.content,
    summary: dbConcept.summary,
    url: dbConcept.sourceUrl,
    language: 'en',
    createdAt: dbConcept.createdAt,
    insights: dbConcept.insights,
    reflection: dbConcept.reflection,
    metadata: {
      categories: [],
      keywords: [],
    },
    flashcards: dbConcept.flashcards || [],
  };
}

export async function deleteConceptFromDb(id: string): Promise<void> {
  await apiClient.delete(`/knowledge/${id}`);
}

export async function scrapeUrl(url: string): Promise<{ title: string; content: string; summary: string }> {
  const res = await apiClient.post<BackendResponse<{ title: string; content: string; summary: string }>>('/knowledge/scrape', { url });
  return res.data.data;
}

export async function updateConceptInDb(
  id: string,
  data: {
    title?: string;
    content?: string;
    summary?: string;
  },
): Promise<KnowledgeConcept> {
  const res = await apiClient.patch<BackendResponse<any>>(`/knowledge/${id}`, data);
  const dbConcept = res.data.data;
  return {
    id: dbConcept.id,
    title: dbConcept.title,
    content: dbConcept.content,
    summary: dbConcept.summary,
    url: dbConcept.sourceUrl,
    language: 'en',
    createdAt: dbConcept.createdAt,
    insights: dbConcept.insights,
    reflection: dbConcept.reflection,
    metadata: {
      categories: [],
      keywords: [],
    },
  };
}


