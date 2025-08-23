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

      {/* Southpole Sticky-Scroll 服务板块 */}
      <section className="southpole-sticky-section southpole-container py-20">
        {/* 左侧固定图片 */}
        <div className="southpole-sticky-media">
          <motion.div 
            className="w-full h-full bg-gray-100 flex items-center justify-center"
            key={activeStep}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* 这里可以放置实际的图片，目前用占位符 */}
            <div className="text-center">
              <div className="w-32 h-32 bg-black mx-auto mb-6 flex items-center justify-center rounded-sm">
                <span className="text-white text-4xl font-light">
                  {serviceSteps[activeStep]?.number}
                </span>
              </div>
              <div className="southpole-caption">
                {serviceSteps[activeStep]?.title.toUpperCase()}
              </div>
            </div>
          </motion.div>
        </div>

        {/* 右侧滚动内容 */}
        <div className="southpole-scroll-content">
          {serviceSteps.map((step, index) => (
            <div 
              key={step.id} 
              className="southpole-scroll-step"
              data-step={index}
            >
              <div className="max-w-2xl">
                {/* 步骤编号 */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <span className="southpole-caption text-gray-400">
                    {step.number}
                  </span>
                </motion.div>

                {/* 标题 */}
                <motion.h2 
                  className="southpole-heading-1 text-black mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  {step.title}
                </motion.h2>

                {/* 描述 */}
                <motion.p 
                  className="southpole-body-large mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {step.description}
                </motion.p>

                {/* 特色功能列表 */}
                <motion.div
                  className="mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <ul className="space-y-4">
                    {step.features.map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className="w-1 h-1 bg-black rounded-full mt-3 mr-4 flex-shrink-0" />
                        <span className="southpole-body">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* 了解更多链接 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <SouthpoleButton.Link asChild>
                    <Link href={step.href}>
                      {t('common.learnMore')}
                    </Link>
                  </SouthpoleButton.Link>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 统计数据展示 - Southpole 极简数字 */}
      <section className="southpole-container southpole-section">
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

      {/* 服务网格 - Southpole 3列网格展示 */}
      <section className="southpole-container southpole-section bg-gray-50">
        <div className="text-center mb-16">
          <motion.h2 
            className="southpole-heading-1 text-black mb-6"
            {...animations.fadeUp}
          >
            {t('complete.title')}
          </motion.h2>
          <motion.p 
            className="southpole-body-large max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('complete.subtitle')}
          </motion.p>
        </div>

        <div className="southpole-grid southpole-grid-3">
          {serviceSteps.slice(0, 3).map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <SouthpoleCard.Service
                number={service.number}
                title={service.title}
                description={service.description}
                features={service.features.slice(0, 2)} // 只显示前两个特性
                href={service.href}
              />
            </motion.div>
          ))}
        </div>
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