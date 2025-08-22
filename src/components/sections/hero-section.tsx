'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { SouthpoleButton } from '@/components/ui/button';
import { motionVariants, viewportConfig } from '@/lib/motion-config';

export function HeroSection() {
  const t = useTranslations('hero');
  
  return (
    <section className="southpole-container min-h-screen flex flex-col justify-center relative">
      {/* Southpole 主内容 - 居中布局 */}
      <div className="text-center max-w-4xl mx-auto">
        {/* 主标题 - Southpole 超大字号 */}
        <motion.h1 
          className="southpole-heading-hero text-black mb-8 lg:mb-12"
          {...motionVariants.headline}
        >
          {t('headline')}
        </motion.h1>
        
        {/* 副标题 - 克制的描述 */}
        <motion.p 
          className="southpole-body-large max-w-2xl mx-auto mb-12 lg:mb-16"
          {...motionVariants.fadeIn}
        >
          {t('subheadline')}
        </motion.p>
        
        {/* CTA 按钮组 - Southpole 极简风格 */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          {...motionVariants.fadeUp}
        >
          <SouthpoleButton.CTA asChild>
            <Link href="#services">
              {t('cta')}
            </Link>
          </SouthpoleButton.CTA>
          
          <SouthpoleButton.Link asChild>
            <Link href="#about">
              了解更多
            </Link>
          </SouthpoleButton.Link>
        </motion.div>
      </div>
      
      {/* Southpole 风格分割线 - 页面底部 */}
      <motion.div
        className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-px h-16 bg-gray-300"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ 
          duration: 0.8, 
          delay: 1.0,
          ease: [0, 0, 0.2, 1]
        }}
      />
      
      {/* Southpole 滚动指示器 - 极简设计 */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        {...motionVariants.fadeIn}
      >
        <span className="southpole-caption mb-4">SCROLL</span>
        <motion.div
          className="w-px h-8 bg-black origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: [0, 0, 0.2, 1]
          }}
        />
      </motion.div>
    </section>
  );
}

// Southpole 风格的 Hero 变体 - 包含数据统计
export function HeroWithStats() {
  const t = useTranslations('hero');
  
  return (
    <section className="southpole-container min-h-screen flex flex-col justify-center relative">
      {/* 主内容 */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <motion.h1 
          className="southpole-heading-hero text-black mb-8"
          {...motionVariants.headline}
        >
          {t('headline')}
        </motion.h1>
        
        <motion.p 
          className="southpole-body-large max-w-2xl mx-auto mb-12"
          {...motionVariants.fadeIn}
        >
          {t('subheadline')}
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center"
          {...motionVariants.fadeUp}
        >
          <SouthpoleButton.CTA asChild>
            <Link href="#services">
              {t('cta')}
            </Link>
          </SouthpoleButton.CTA>
        </motion.div>
      </div>
      
      {/* Southpole 数据展示 - 极简数字 */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: 1.2,
          ease: [0, 0, 0.2, 1]
        }}
      >
        <div className="text-center">
          <div className="southpole-heading-1 text-black mb-2">500+</div>
          <div className="southpole-caption">PROJECTS</div>
        </div>
        
        <div className="text-center">
          <div className="southpole-heading-1 text-black mb-2">50%</div>
          <div className="southpole-caption">REDUCTION</div>
        </div>
        
        <div className="text-center">
          <div className="southpole-heading-1 text-black mb-2">24/7</div>
          <div className="southpole-caption">MONITORING</div>
        </div>
      </motion.div>
      
      {/* Southpole 分割线 */}
      <div className="southpole-divider mt-20 max-w-xs mx-auto" />
      
      {/* 滚动指示器 */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        {...motionVariants.fadeIn}
      >
        <span className="southpole-caption mb-4">SCROLL</span>
        <motion.div
          className="w-px h-8 bg-black origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: [0, 0, 0.2, 1]
          }}
        />
      </motion.div>
    </section>
  );
}