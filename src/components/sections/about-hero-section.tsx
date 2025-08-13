'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

// 关于页面 Hero 动效配置
const aboutHeroAnimations = {
  // 主标题
  headline: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.8,
      delay: 0.2,
      ease: [0, 0, 0.2, 1]
    }
  },
  
  // 副标题
  description: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.8,
      delay: 0.4,
      ease: [0, 0, 0.2, 1]
    }
  },
  
  // 统计数据
  stats: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.6,
      delay: 0.8,
      ease: [0, 0, 0.2, 1]
    }
  }
};

export function AboutHeroSection() {
  const t = useTranslations('about');

  const stats = [
    { number: '5+', label: '年专业经验', icon: '📈' },
    { number: '100+', label: '成功项目', icon: '🎯' },
    { number: '50%', label: '平均减排效果', icon: '🌱' },
    { number: '24/7', label: '技术支持', icon: '🛡️' },
  ];

  return (
    <section className="relative pt-24 pb-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-black/3 rounded-full blur-2xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* 主标题 */}
          <motion.h1 
            className="heading-1 text-black mb-8"
            {...aboutHeroAnimations.headline}
          >
            {t('title')}
          </motion.h1>
          
          {/* 描述文字 */}
          <motion.p 
            className="text-xl text-gray-600 leading-relaxed mb-16 max-w-3xl mx-auto"
            {...aboutHeroAnimations.description}
          >
            {t('description')}
          </motion.p>

          {/* 统计数据网格 */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            {...aboutHeroAnimations.stats}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.8 + (index * 0.1),
                  ease: [0, 0, 0.2, 1]
                }}
              >
                <div className="mb-4 text-4xl">{stat.icon}</div>
                <div className="text-3xl font-bold text-black mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}