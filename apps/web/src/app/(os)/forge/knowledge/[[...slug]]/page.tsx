import { Knowledge } from '@/features/knowledge';

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function KnowledgePage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  return <Knowledge slug={slug} />;
}
