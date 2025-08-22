'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { InsightsCarouselProps } from '@/types/sanity';

// 模拟文章数据
const mockInsights = [
  {
    id: '1',
    category: 'technology',
    date: '2024-01-15',
    readTime: 5,
    image: '/api/placeholder/600/400',
  },
  {
    id: '2',
    category: 'policy',
    date: '2024-01-12',
    readTime: 8,
    image: '/api/placeholder/600/400',
  },
  {
    id: '3',
    category: 'market',
    date: '2024-01-10',
    readTime: 6,
    image: '/api/placeholder/600/400',
  },
  {
    id: '4',
    category: 'case-study',
    date: '2024-01-08',
    readTime: 10,
    image: '/api/placeholder/600/400',
  },
  {
    id: '5',
    category: 'technology',
    date: '2024-01-05',
    readTime: 7,
    image: '/api/placeholder/600/400',
  },
  {
    id: '6',
    category: 'policy',
    date: '2024-01-03',
    readTime: 9,
    image: '/api/placeholder/600/400',
  },
];

export function InsightsCarousel({ articles = [] }: InsightsCarouselProps) {
  const t = useTranslations('insights');
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400; // 一次滚动的距离
      const newScrollLeft = scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 300);
    }
  };

  // 获取分类标签样式
  const getCategoryStyle = (category: string) => {
    const styles = {
      'technology': 'bg-blue-100 text-blue-900',
      'policy': 'bg-purple-100 text-purple-900',
      'market': 'bg-green-100 text-green-900',
      'case-study': 'bg-orange-100 text-orange-900',
    };
    return styles[category as keyof typeof styles] || 'bg-gray-100 text-gray-900';
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container-custom">
        {/* 标题部分 */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <motion.h2 
              className="heading-1 text-black mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {t('title')}
            </motion.h2>
            <motion.p 
              className="text-large text-gray-600 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {t('subtitle')}
            </motion.p>
          </div>
          
          {/* 导航按钮和查看全部 */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="rounded-full border border-gray-300 disabled:opacity-30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="rounded-full border border-gray-300 disabled:opacity-30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
            <Link href="/zh/insights">
              <Button variant="secondary">
                {t('viewAll')}
              </Button>
            </Link>
          </div>
        </div>

        {/* 文章轮播容器 */}
        <div className="relative">
          <div 
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {mockInsights.map((article, index) => (
              <motion.div
                key={article.id}
                className="flex-none w-[400px]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "0px 100px" }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                  onClick={() => router.push(`/zh/insights/${article.id}`)}
                >
                  {/* 文章图片 */}
                  <div className="relative h-[240px] overflow-hidden bg-gray-100">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-400">图片占位</span>
                    </div>
                  </div>

                  {/* 文章内容 */}
                  <div className="p-6 space-y-4">
                    {/* 分类和日期 */}
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryStyle(article.category)}`}>
                        {t(`category.${article.category}`)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {article.readTime} {t('minRead')}
                      </span>
                    </div>

                    {/* 标题 */}
                    <h3 className="heading-3 text-black line-clamp-2 group-hover:text-primary transition-colors">
                      {t(`article${article.id}.title`)}
                    </h3>

                    {/* 简介 */}
                    <p className="text-gray-600 line-clamp-3">
                      {t(`article${article.id}.excerpt`)}
                    </p>

                    {/* 日期和阅读更多 */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-500">
                        {new Date(article.date).toLocaleDateString('zh-CN')}
                      </span>
                      <span className="text-primary font-medium text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        {t('readMore')}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}