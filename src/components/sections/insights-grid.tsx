'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

// 扩展的文章数据
const allInsights = [
  { id: '1', category: 'technology', date: '2024-01-15', readTime: 5, featured: true },
  { id: '2', category: 'policy', date: '2024-01-12', readTime: 8, featured: true },
  { id: '3', category: 'market', date: '2024-01-10', readTime: 6, featured: false },
  { id: '4', category: 'case-study', date: '2024-01-08', readTime: 10, featured: false },
  { id: '5', category: 'technology', date: '2024-01-05', readTime: 7, featured: false },
  { id: '6', category: 'policy', date: '2024-01-03', readTime: 9, featured: false },
  { id: '7', category: 'market', date: '2024-01-02', readTime: 5, featured: false },
  { id: '8', category: 'technology', date: '2023-12-28', readTime: 8, featured: false },
  { id: '9', category: 'case-study', date: '2023-12-25', readTime: 12, featured: false },
];

export function InsightsGrid() {
  const t = useTranslations('insights');
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // 获取唯一的分类
  const categories = ['all', ...Array.from(new Set(allInsights.map(a => a.category)))];

  // 过滤文章
  const filteredInsights = allInsights.filter(article => {
    const categoryMatch = selectedCategory === 'all' || article.category === selectedCategory;
    return categoryMatch;
  });

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
    <section className="py-32 bg-white pt-28">
      <div className="container-custom">
        {/* 页面标题 */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h1 
            className="heading-1 text-black mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t('title')}
          </motion.h1>
          <motion.p 
            className="text-large text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* 分类筛选 */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category === 'all' ? '全部' : t(`category.${category}`)}
            </Button>
          ))}
        </div>

        {/* 特色文章 */}
        {selectedCategory === 'all' && (
          <div className="mb-16">
            <h2 className="heading-2 text-black mb-8">精选文章</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {filteredInsights.filter(a => a.featured).map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
                    onClick={() => router.push(`/zh/insights/${article.id}`)}
                  >
                    {/* 大图片占位 */}
                    <div className="relative h-[300px] overflow-hidden bg-gray-100">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-gray-400">精选文章图片</span>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryStyle(article.category)}`}>
                          {t(`category.${article.category}`)}
                        </span>
                      </div>
                    </div>

                    <div className="p-8 space-y-4">
                      <h3 className="heading-2 text-black line-clamp-2 group-hover:text-primary transition-colors">
                        {t(`article${article.id}.title`)}
                      </h3>
                      <p className="text-gray-600 line-clamp-3 text-lg">
                        {t(`article${article.id}.excerpt`)}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{new Date(article.date).toLocaleDateString('zh-CN')}</span>
                          <span>{article.readTime} {t('minRead')}</span>
                        </div>
                        <span className="text-primary font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
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
        )}

        {/* 文章网格 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredInsights.filter(a => selectedCategory !== 'all' || !a.featured).map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                onClick={() => router.push(`/zh/insights/${article.id}`)}
              >
                {/* 图片占位 */}
                <div className="relative h-[200px] overflow-hidden bg-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-400">文章图片</span>
                  </div>
                </div>

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
                    {t(`article${article.id}.title`) || `文章 ${article.id} 标题`}
                  </h3>

                  {/* 简介 */}
                  <p className="text-gray-600 line-clamp-3">
                    {t(`article${article.id}.excerpt`) || `这是文章 ${article.id} 的简介内容，展示文章的核心观点和价值。`}
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

        {/* 加载更多 */}
        <div className="text-center mt-12">
          <Button variant="secondary" size="lg">
            加载更多文章
          </Button>
        </div>
      </div>
    </section>
  );
}