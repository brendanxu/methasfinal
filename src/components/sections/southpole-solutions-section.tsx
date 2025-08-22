'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SouthpoleCard, StatsCard } from '@/components/ui/card';
import { SouthpoleButton } from '@/components/ui/button';

// Southpole 风格的服务数据
const serviceSteps = [
  {
    id: 'monitoring',
    number: '01',
    title: '甲烷监测',
    description: '采用先进的传感器技术和AI算法，实现全方位、全天候的甲烷排放监测，为减排决策提供精确数据支撑。',
    features: [
      '实时连续监测，覆盖率达99.5%',
      'AI智能识别泄漏源，准确率>95%',
      '多层级预警系统，响应时间<5分钟',
      '云端数据存储，支持历史追溯'
    ],
    image: '/images/solutions/monitoring.jpg',
    href: '#monitoring'
  },
  {
    id: 'reduction',
    number: '02', 
    title: '智能减排',
    description: '基于监测数据，提供智能化的减排方案，包括设备优化建议、工艺改进方案和自动控制系统集成。',
    features: [
      '自适应优化算法，减排效果可达50%',
      '设备健康诊断，预防性维护',
      '工艺参数智能调节，提升效率',
      'ROI分析，平均回报周期18个月'
    ],
    image: '/images/solutions/reduction.jpg',
    href: '#reduction'
  },
  {
    id: 'credits',
    number: '03',
    title: '碳信用管理', 
    description: '完整的碳信用生命周期管理，从项目开发、认证申请到交易变现，提供一站式专业服务。',
    features: [
      '符合VCS、CDM等国际标准',
      '端到端项目管理，成功率>90%',
      '智能合约交易，透明可追溯',
      '收益最大化，平均溢价15%'
    ],
    image: '/images/solutions/credits.jpg',
    href: '#credits'
  },
  {
    id: 'compliance',
    number: '04',
    title: '合规报告',
    description: '自动化生成各类环保合规报告，满足政府监管要求，简化企业合规管理流程。',
    features: [
      '自动化报告生成，准确率99.8%',
      '多标准兼容，覆盖主要法规',
      '实时合规状态监控',
      '专业审计支持，通过率100%'
    ],
    image: '/images/solutions/compliance.jpg',
    href: '#compliance'
  }
];

// 统计数据
const statsData = [
  { value: '500+', label: 'PROJECTS', description: '成功项目' },
  { value: '50%', label: 'REDUCTION', description: '平均减排效果' },
  { value: '24/7', label: 'MONITORING', description: '全天候监测' },
  { value: '99.5%', label: 'ACCURACY', description: '监测精度' }
];

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
            解决方案
          </motion.h1>
          <motion.p 
            className="southpole-body-large max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            从监测到减排，从合规到变现，提供甲烷管理全链条解决方案
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
                    {step.features.map((feature, featureIndex) => (
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
                      了解详情
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
            完整解决方案
          </motion.h2>
          <motion.p 
            className="southpole-body-large max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            端到端的甲烷管理服务，助力企业实现可持续发展目标
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
            开始您的减排之旅
          </motion.h2>
          
          <motion.p 
            className="southpole-body-large mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            联系我们的专家团队，获取定制化解决方案
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <SouthpoleButton.CTA asChild>
              <Link href="/contact">
                免费咨询
              </Link>
            </SouthpoleButton.CTA>
            
            <SouthpoleButton.Secondary asChild>
              <Link href="/resources">
                下载资料
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