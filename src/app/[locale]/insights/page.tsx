import { getTranslations } from 'next-intl/server';
import { InsightsGrid } from '@/components/sections/insights-grid';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/layout/footer';
import { generateSEOMetadata, seoTemplates } from '@/components/seo/seo-head';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations('insights');
  return {
    title: `${t('title')} | Methas`,
    description: t('subtitle'),
  };
}

export default async function InsightsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        <InsightsGrid />
        <Footer />
      </main>
    </>
  );
}