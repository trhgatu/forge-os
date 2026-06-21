import { WealthManagement } from '@/features/wealth';

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function WealthPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  return <WealthManagement slug={slug} />;
}
