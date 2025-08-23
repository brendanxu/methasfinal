'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from '../../../i18n/routing';
import { SouthpoleCard, StatsCard } from '@/components/ui/card';
import { SouthpoleButton } from '@/components/ui/button';

// Southpole 极简动效
const animations = {
  fadeUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0, 0, 0.2, 1] }
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8, ease: [0, 0, 0.2, 1] }
  }
};

export function SouthpoleSolutionsSection() {
  const t = useTranslations('solutions');
  const [activeStep, setActiveStep] = useState(0);

  // 使用翻译数据而不是硬编码
  const serviceSteps = ['monitoring', 'reduction', 'credits', 'compliance'].map((id, index) => ({
    id,
    number: t(`services.${id}.number`),
    title: t(`services.${id}.title`),
    description: t(`services.${id}.description`),
    features: t.raw(`services.${id}.features`),
    image: `/images/solutions/${id}.jpg`,
    href: `#${id}`
  }));

  // 统计数据
  const statsData = ['projects', 'reduction', 'monitoring', 'accuracy'].map(key => ({
    value: t(`stats.${key}.value`),
    label: t(`stats.${key}.label`),
    description: t(`stats.${key}.description`)
  }));

  // 监听滚动，更新活跃步骤
  useEffect(() => {
    // 客户端检查
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const steps = document.querySelectorAll('[data-step]');
      const scrollY = window.scrollY + window.innerHeight / 2;

      steps.forEach((step, index) => {
        const rect = step.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementBottom = elementTop + rect.height;

        if (scrollY >= elementTop && scrollY <= elementBottom) {
          setActiveStep(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Hero Section - Southpole 极简标题 */}
      <section className="southpole-container southpole-section">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1 
            className="southpole-heading-hero text-black mb-8"
            {...animations.fadeUp}
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p 
            className="southpole-body-large max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t('hero.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* 主要服务板块 - Southpole 简洁风格 */}
      <section className="southpole-container py-20">
        <div className="space-y-32">
          {serviceSteps.map((step, index) => (
            <motion.div
              key={step.id}
              className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* 左侧：视觉元素 */}
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="aspect-square bg-gray-50 flex flex-col items-center justify-center p-12 relative overflow-hidden">
                  {/* 背景装饰 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100" />
                  
                  {/* 主要视觉 */}
                  <div className="relative z-10 text-center">
                    <motion.div
                      className="w-24 h-24 bg-black rounded-sm flex items-center justify-center mb-8 mx-auto"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-white text-3xl font-light">
                        {step.number}
                      </span>
                    </motion.div>
                    <h3 className="southpole-heading-3 text-black mb-4">
                      {step.title}
                    </h3>
                    <div className="southpole-caption">
                      {step.title.toUpperCase()}
                    </div>
                  </div>

                  {/* 装饰性元素 */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-black rounded-full opacity-20" />
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-black rounded-full opacity-30" />
                </div>
              </div>

              {/* 右侧：内容 */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                {/* 步骤编号 */}
                <div className="mb-6">
                  <span className="southpole-caption text-gray-400">
                    {step.number}
                  </span>
                </div>

                {/* 标题 */}
                <h2 className="southpole-heading-1 text-black mb-6">
                  {step.title}
                </h2>

                {/* 描述 */}
                <p className="southpole-body-large mb-8">
                  {step.description}
                </p>

                {/* 特色功能列表 */}
                <div className="mb-8">
                  <ul className="space-y-3">
                    {step.features.map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className="w-1 h-1 bg-black rounded-full mt-3 mr-4 flex-shrink-0" />
                        <span className="southpole-body">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 了解更多链接 */}
                <SouthpoleButton.Link asChild>
                  <Link href={step.href}>
                    了解详情
                  </Link>
                </SouthpoleButton.Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 统计数据展示 - Southpole 极简数字 */}
      <section className="southpole-container py-20 bg-gray-50">
        <div className="text-center mb-16">
          <motion.h2 
            className="southpole-heading-1 text-black mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            数据实力
          </motion.h2>
        </div>
        
        <motion.div
          className="southpole-grid southpole-grid-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <StatsCard
                value={stat.value}
                label={stat.label}
                description={stat.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>


      {/* CTA Section - Southpole 极简风格 */}
      <section className="southpole-container southpole-section">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2 
            className="southpole-heading-1 text-black mb-8"
            {...animations.fadeUp}
          >
            {t('cta.title')}
          </motion.h2>
          
          <motion.p 
            className="southpole-body-large mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('cta.subtitle')}
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <SouthpoleButton.CTA asChild>
              <Link href="/contact">
                {t('cta.consultation')}
              </Link>
            </SouthpoleButton.CTA>
            
            <SouthpoleButton.Secondary asChild>
              <Link href="/resources">
                {t('cta.resources')}
              </Link>
            </SouthpoleButton.Secondary>
          </motion.div>
        </div>

        {/* 底部分割线 */}
        <div className="southpole-divider mt-20 max-w-xs mx-auto" />
      </section>
    </>
  );
}