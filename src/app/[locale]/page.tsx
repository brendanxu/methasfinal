import { getTranslations } from 'next-intl/server';
import { HeroSection } from '@/components/sections/hero-section';
import { StickyStepSection } from '@/components/sections/sticky-step-section';
import { InsightsCarousel } from '@/components/sections/insights-carousel';
import { StatsSection } from '@/components/sections/stats-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Navigation } from '@/components/ui/navigation';
import { Footer } from '@/components/layout/footer';
import { generateSEOMetadata, seoTemplates } from '@/components/seo/seo-head';
import { sanityApi } from '../../../sanity/sanity.client';
import type { HeroSlide, ServiceSection, Statistic, Article } from '@/types/sanity';

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
  // 获取动态内容数据
  const [heroSlides, serviceSections, statistics, featuredArticles] = await Promise.all([
    sanityApi.getHeroSlides().catch(() => []) as Promise<HeroSlide[]>,
    sanityApi.getServiceSections().catch(() => []) as Promise<ServiceSection[]>,
    sanityApi.getStatistics().catch(() => []) as Promise<Statistic[]>,
    sanityApi.getFeaturedArticles().catch(() => []) as Promise<Article[]>,
  ]);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        <HeroSection heroSlides={heroSlides} />
        <StickyStepSection serviceSections={serviceSections} />
        <InsightsCarousel articles={featuredArticles} />
        <StatsSection statistics={statistics} />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}