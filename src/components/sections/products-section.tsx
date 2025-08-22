'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ServiceCard } from '@/components/ui/card';

// 产品图标组件
function MonitorIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>
  );
}

function TechnologyIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  );
}

function CreditIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );
}

function ReportIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
      <polyline points="14,2 14,8 20,8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10,9 9,9 8,9"/>
    </svg>
  );
}

// 产品卡片动效配置 - 基于 motion-language.md 配方2
const cardAnimations = {
  container: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.3 }
  },
  
  card: {
    initial: { opacity: 0, y: 50, scale: 0.95 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, amount: 0.3 },
    transition: (index: number) => ({
      duration: 0.5,
      delay: index * 0.1, // 错落展开
      ease: [0, 0, 0.2, 1]
    })
  },
  
  hoverEffect: {
    scale: 1.02,
    y: -8,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export function ProductsSection() {
  const t = useTranslations('solutions');
  
  // 产品数据
  const products = [
    {
      icon: <MonitorIcon />,
      title: t('step1.title'),
      description: t('step1.description'),
      features: [
        '实时数据采集',
        '智能预警系统',
        '多点位监测',
        '数据可视化'
      ]
    },
    {
      icon: <TechnologyIcon />,
      title: t('step2.title'),
      description: t('step2.description'),
      features: [
        '高效捕获技术',
        '资源化利用',
        '安全处理系统',
        '成本优化'
      ]
    },
    {
      icon: <CreditIcon />,
      title: t('step3.title'),
      description: t('step3.description'),
      features: [
        '量化评估',
        '认证服务',
        '交易支持',
        '价值最大化'
      ]
    },
    {
      icon: <ReportIcon />,
      title: t('step4.title'),
      description: t('step4.description'),
      features: [
        '合规报告',
        '标准认证',
        '审计支持',
        '文档管理'
      ]
    }
  ];
  
  return (
    <section id="products" className="py-24 bg-white">
      <div className="container-custom">
        {/* 标题区域 */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-2 text-black mb-4">
            {t('title')}
          </h2>
          <p className="text-large text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>
        
        {/* 产品网格 */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          {...cardAnimations.container}
        >
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={cardAnimations.card.initial}
              whileInView={cardAnimations.card.whileInView}
              whileHover={cardAnimations.hoverEffect}
              viewport={cardAnimations.card.viewport}
              transition={cardAnimations.card.transition(index)}
            >
              <ServiceCard
                title={product.title}
                description={product.description}
                features={product.features}
                href={`/solutions#step-${index + 1}`}
                className="h-full"
              />
            </motion.div>
          ))}
        </motion.div>
        
        {/* 底部CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-600 mb-6">
            想了解更多解决方案？
          </p>
          <motion.a
            href="/solutions"
            className="inline-flex items-center text-lg font-semibold text-primary hover:text-primary/80 transition-colors"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            查看完整解决方案
            <svg 
              className="ml-2 w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}