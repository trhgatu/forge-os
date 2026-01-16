import { KnowledgeConcept } from "@/shared/types";
import type { WikiQueryResponse, WikiSearchResponse } from "../types/wiki-api";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const generateInsights = async (html: string): Promise<string[]> => {
  await delay(300);

  const clean = html.replace(/<[^>]*>/g, "");
  const sentences = clean
    .split(".")
    .map((s) => s.trim())
    .filter((s) => s.length > 30);

  return [...sentences]
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .map((s) => s + ".");
};

const generateReflection = async (title: string, html: string): Promise<string> => {
  await delay(350);

  const text = html.replace(/<[^>]*>/g, "").trim();
  const wordCount = text.split(/\s+/).length;

  const prompts = [
    wordCount > 500
      ? "This is a dense concept with significant depth."
      : "This is a concise concept with a sharp core.",
    text.includes("theory")
      ? "It connects strongly with your pattern of theoretical exploration."
      : "It aligns with your tendency toward practical synthesis.",
    text.includes("history")
      ? "There is a historical resonance here that mirrors your reflective nature."
      : "Its forward-facing nature matches your evolving mindset.",
  ];

  const intro = prompts[Math.floor(Math.random() * prompts.length)];

  return `${intro} The essence of '${title}' reveals a deeper structure within you.`;
};

const normalizeLang = (lang: string) => (lang === "vi" ? "vi" : "en");

// --------------------------------------------------
// SEARCH
// --------------------------------------------------
export async function searchWikipedia(query: string, lang: string): Promise<KnowledgeConcept[]> {
  if (!query.trim()) return [];

  const normalized = normalizeLang(lang);

  const params = new URLSearchParams({
    origin: "*",
    action: "query",
    list: "search",
    format: "json",
    srsearch: query,
    srlimit: "10",
    srprop: "snippet",
  });

  const res = await fetch(`https://${normalized}.wikipedia.org/w/api.php?${params}`);
  const data: WikiSearchResponse = await res.json();

  const now = new Date().toISOString();
  const items = data.query?.search ?? [];

  return items.map((item) => ({
    id: `${normalized}-${item.pageid}`,
    title: item.title,
    summary: item.snippet.replace(/<\/?[^>]+>/g, ""),
    extract: item.snippet.replace(/<\/?[^>]+>/g, ""),
    createdAt: now,
    source: "wikipedia",
    language: normalized,
  }));
}

// --------------------------------------------------
// DETAILS
// --------------------------------------------------
export async function getConceptDetails(
  title: string,
  lang: string
): Promise<KnowledgeConcept | null> {
  const normalized = normalizeLang(lang);

  const params = new URLSearchParams({
    origin: "*",
    action: "query",
    prop: "extracts|pageimages|info|categories",
    inprop: "url|displaytitle|touched",
    pithumbsize: "1200",
    redirects: "1",
    format: "json",
    titles: title,
  });

  try {
    const res = await fetch(`https://${normalized}.wikipedia.org/w/api.php?${params}`);
    const data: WikiQueryResponse = await res.json();

    const pageId = Object.keys(data.query.pages)[0];
    const page = data.query.pages[pageId];

    if (!page || pageId === "-1") return null;

    const extractHTML = page.extract ?? "";

    // Clean summary for preview
    const rawText = extractHTML.replace(/<[^>]+>/g, "").trim();
    const summary = rawText.length > 200 ? rawText.substring(0, 200) + "..." : rawText;

    const insights = await generateInsights(extractHTML);
    const reflection = await generateReflection(page.title, extractHTML);

    const categories =
      page.categories
        ?.map((c) => c.title.replace("Category:", ""))
        .filter((c) => !c.toLowerCase().includes("articles")) ?? [];

    return {
      id: String(page.pageid),
      title: page.title,
      extract: summary,
      summary,
      content: extractHTML,
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
    console.error("Knowledge detail error:", err);
    return null;
  }
}

// --------------------------------------------------
// RANDOM DISCOVERY
// --------------------------------------------------
export async function getRandomConcepts(
  lang: string,
  limit: number = 20
): Promise<KnowledgeConcept[]> {
  const normalized = normalizeLang(lang);

  const params = new URLSearchParams({
    origin: "*",
    action: "query",
    list: "random",
    rnnamespace: "0", // Articles only
    rnlimit: String(limit),
    format: "json",
  });

  try {
    const res = await fetch(`https://${normalized}.wikipedia.org/w/api.php?${params}`);
    const data = await res.json();
    const items = data.query?.random ?? [];

    const now = new Date().toISOString();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return items.map((item: any) => ({
      id: `${normalized}-${item.id}`,
      title: item.title,
      summary: "A random discovery from the global grid.",
      extract: "",
      createdAt: now,
      source: "wikipedia",
      language: normalized,
    }));
  } catch (err) {
    console.error("Random concept error:", err);
    return [];
  }
}
