import { Settings } from '@/features/system/components/Settings';

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function SettingsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  return <Settings slug={slug} />;
}
