import { getTranslations } from 'next-intl/server';
import { HeroSection } from '@/components/sections/hero-section';
import { StickyStepSection } from '@/components/sections/sticky-step-section';
import { InsightsCarousel } from '@/components/sections/insights-carousel';
import { StatsSection } from '@/components/sections/stats-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/layout/footer';
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
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        <HeroSection />
        <StickyStepSection />
        <InsightsCarousel />
        <StatsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}