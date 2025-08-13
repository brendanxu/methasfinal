import { getTranslations } from 'next-intl/server';
import { HeroSection } from '@/components/sections/hero-section';
import { Navigation } from '@/components/ui/navigation';
import { generateSEOMetadata, seoTemplates } from '@/components/seo/seo-head';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return generateSEOMetadata(seoTemplates.home(locale));
}

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
    </main>
  );
}