import { getTranslations } from 'next-intl/server';
import { Navigation } from '@/components/ui/navigation';
import { SouthpoleAboutSection } from '@/components/sections/southpole-about-section';
import { generateSEOMetadata, seoTemplates } from '@/components/seo/seo-head';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return generateSEOMetadata(seoTemplates.about(locale));
}

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <SouthpoleAboutSection />
    </main>
  );
}