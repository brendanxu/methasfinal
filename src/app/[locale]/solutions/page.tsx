import { getTranslations } from 'next-intl/server';
import { Navigation } from '@/components/ui/navigation';
import { SouthpoleSolutionsSection } from '@/components/sections/southpole-solutions-section';
import { generateSEOMetadata, seoTemplates } from '@/components/seo/seo-head';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return generateSEOMetadata(seoTemplates.solutions(locale));
}

export default async function SolutionsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <SouthpoleSolutionsSection />
    </main>
  );
}