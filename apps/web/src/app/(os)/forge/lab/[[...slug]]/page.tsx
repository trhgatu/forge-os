import { ForgeLab } from '@/features/forge-lab/components/ForgeLab';

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function ForgeLabPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  return <ForgeLab slug={slug} />;
}
