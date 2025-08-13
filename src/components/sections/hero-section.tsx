'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Hero区动效配置 - 基于 motion-language.md 配方1
const heroAnimations = {
  // 背景 - 第0层
  background: {
    initial: { opacity: 0, scale: 1.1 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: 1.2,
      ease: [0, 0, 0.2, 1]
    }
  },
  
  // 主标题 - 第1层
  headline: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.8,
      delay: 0.2,
      ease: [0, 0, 0.2, 1]
    }
  },
  
  // 副标题 - 第2层
  subheadline: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.8,
      delay: 0.4,
      ease: [0, 0, 0.2, 1]
    }
  },
  
  // CTA按钮 - 第3层
  cta: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: 0.5,
      delay: 0.6,
      ease: [0.68, -0.55, 0.265, 1.55] // spring
    }
  },
  
  // 装饰元素 - 第4层
  decoration: {
    initial: { opacity: 0, rotate: -10 },
    animate: { opacity: 1, rotate: 0 },
    transition: {
      duration: 1.2,
      delay: 0.8,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export function HeroSection() {
  const t = useTranslations('hero');
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      {/* 背景装饰 */}
      <motion.div
        className="absolute inset-0 z-0"
        {...heroAnimations.background}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-black/5 rounded-full blur-2xl" />
      </motion.div>
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 左侧内容 */}
          <div className="text-center lg:text-left">
            {/* 主标题 */}
            <motion.h1 
              className="heading-1 text-black mb-6"
              {...heroAnimations.headline}
            >
              {t('headline')}
            </motion.h1>
            
            {/* 副标题 */}
            <motion.p 
              className="text-large text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0"
              {...heroAnimations.subheadline}
            >
              {t('subheadline')}
            </motion.p>
            
            {/* CTA按钮组 */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              {...heroAnimations.cta}
            >
              <Link href="#products" className="inline-block">
                <Button size="lg">
                  {t('cta')}
                </Button>
              </Link>
              
              <Link href="/contact" className="inline-block">
                <Button variant="secondary" size="lg">
                  {t('cta_contact')}
                </Button>
              </Link>
            </motion.div>
            
            {/* 统计数据预览 */}
            <motion.div 
              className="flex flex-wrap gap-8 justify-center lg:justify-start mt-12 pt-8 border-t border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-black">500+</div>
                <div className="text-sm text-gray-600">项目经验</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-black">50%</div>
                <div className="text-sm text-gray-600">减排效果</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-black">24/7</div>
                <div className="text-sm text-gray-600">监测覆盖</div>
              </div>
            </motion.div>
          </div>
          
          {/* 右侧视觉内容 */}
          <motion.div 
            className="relative"
            {...heroAnimations.decoration}
          >
            <div className="relative">
              {/* 主要视觉元素 - 这里可以放置图片或者SVG图形 */}
              <div className="relative w-full h-96 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 bg-white rounded-xl shadow-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">
                        M
                      </div>
                      <div className="text-lg font-bold text-black">Methas</div>
                      <div className="text-sm text-gray-600">甲烷减排专家</div>
                    </div>
                  </div>
                </div>
                
                {/* 浮动元素 */}
                <motion.div
                  className="absolute top-4 right-4 w-12 h-12 bg-primary/20 rounded-full"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.div
                  className="absolute bottom-8 left-8 w-8 h-8 bg-black/10 rounded-full"
                  animate={{
                    y: [0, -15, 0],
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </div>
              
              {/* 装饰性网格 */}
              <div className="absolute -z-10 top-8 left-8 w-32 h-32 opacity-10">
                <div className="grid grid-cols-4 gap-2 h-full">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="bg-primary rounded-sm"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 1.2 + (i * 0.05),
                        duration: 0.3
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* 滚动指示器 */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center"
          whileHover={{ borderColor: '#22c55e' }}
        >
          <motion.div
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}