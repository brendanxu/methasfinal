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
import { getContent } from '@/lib/content';
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
  // 优先使用简单管理后台的数据，如果没有则使用 Sanity
  const adminContent = await getContent();
  
  // 获取动态内容数据（Sanity 作为备选）
  const [heroSlides, serviceSections, statistics, featuredArticles] = await Promise.all([
    adminContent.hero?.length > 0 ? adminContent.hero : sanityApi.getHeroSlides().catch(() => []) as Promise<HeroSlide[]>,
    adminContent.services?.length > 0 ? adminContent.services : sanityApi.getServiceSections().catch(() => []) as Promise<ServiceSection[]>,
    adminContent.stats?.length > 0 ? adminContent.stats : sanityApi.getStatistics().catch(() => []) as Promise<Statistic[]>,
    adminContent.articles?.length > 0 ? adminContent.articles : sanityApi.getFeaturedArticles().catch(() => []) as Promise<Article[]>,
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