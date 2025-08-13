'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Sticky-Step 交互配置 - 基于 test-release-checklist.md 规范
const stickyStepConfig = {
  // IO 阈值：0.5 (50% 可见时触发)
  intersectionThreshold: 0.5,
  
  // 动画时长：300-450ms (Snappy 个性)
  animationDuration: {
    fast: 300,     // 快速响应
    normal: 450,   // 标准过渡
  },
  
  // 缓动曲线：ease-out
  easingCurve: [0, 0, 0.2, 1],
  
  // 粘性滚动偏移
  stickyOffset: 100,
  
  // 步骤间距
  stepSpacing: 800,
};

// 步骤数据
const steps = [
  {
    id: 'step1',
    icon: '📊',
    highlight: '实时监测',
    visual: 'monitoring'
  },
  {
    id: 'step2', 
    icon: '⚡',
    highlight: '智能减排',
    visual: 'reduction'
  },
  {
    id: 'step3',
    icon: '💳',
    highlight: '碳信用管理',
    visual: 'credits'
  },
  {
    id: 'step4',
    icon: '📋',
    highlight: '合规报告',
    visual: 'compliance'
  },
];

// 定义元素类型
type VisualElement = 
  | { type: 'bar'; height: string; delay: number }
  | { type: 'circle'; size: string; delay: number }
  | { type: 'card'; width: string; delay: number }
  | { type: 'doc'; height: string; delay: number };

// 视觉元素组件
function StepVisual({ visual, isActive }: { visual: string; isActive: boolean }) {
  const visualConfig: Record<string, {
    bgColor: string;
    iconBg: string;
    elements: VisualElement[];
  }> = {
    monitoring: {
      bgColor: 'from-blue-500/20 to-cyan-500/20',
      iconBg: 'bg-blue-500',
      elements: [
        { type: 'bar', height: '60%', delay: 0 },
        { type: 'bar', height: '80%', delay: 0.1 },
        { type: 'bar', height: '45%', delay: 0.2 },
        { type: 'bar', height: '90%', delay: 0.3 },
        { type: 'bar', height: '70%', delay: 0.4 },
      ]
    },
    reduction: {
      bgColor: 'from-green-500/20 to-emerald-500/20',
      iconBg: 'bg-green-500',
      elements: [
        { type: 'circle', size: '40px', delay: 0 },
        { type: 'circle', size: '60px', delay: 0.2 },
        { type: 'circle', size: '80px', delay: 0.4 },
      ]
    },
    credits: {
      bgColor: 'from-primary/20 to-green-500/20',
      iconBg: 'bg-primary',
      elements: [
        { type: 'card', width: '100px', delay: 0 },
        { type: 'card', width: '120px', delay: 0.15 },
        { type: 'card', width: '90px', delay: 0.3 },
      ]
    },
    compliance: {
      bgColor: 'from-purple-500/20 to-indigo-500/20', 
      iconBg: 'bg-purple-500',
      elements: [
        { type: 'doc', height: '120px', delay: 0 },
        { type: 'doc', height: '100px', delay: 0.1 },
        { type: 'doc', height: '110px', delay: 0.2 },
      ]
    }
  };

  const config = visualConfig[visual as keyof typeof visualConfig];

  return (
    <div className={`relative w-full h-80 bg-gradient-to-br ${config.bgColor} rounded-xl overflow-hidden`}>
      {/* 背景装饰 */}
      <motion.div
        className="absolute inset-0 opacity-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isActive ? 0.1 : 0.05, 
          scale: isActive ? 1 : 0.8 
        }}
        transition={{ 
          duration: stickyStepConfig.animationDuration.normal / 1000,
          ease: stickyStepConfig.easingCurve 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
      </motion.div>

      {/* 中心图标 */}
      <motion.div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 ${config.iconBg} rounded-full flex items-center justify-center text-white font-bold text-xl`}
        initial={{ scale: 0.8, opacity: 0.8 }}
        animate={{ 
          scale: isActive ? 1.1 : 1, 
          opacity: isActive ? 1 : 0.8 
        }}
        transition={{ 
          duration: stickyStepConfig.animationDuration.fast / 1000,
          ease: stickyStepConfig.easingCurve 
        }}
      >
        {steps.find(s => s.visual === visual)?.icon}
      </motion.div>

      {/* 动态元素 */}
      <div className="absolute inset-0 flex items-center justify-center">
        {visual === 'monitoring' && (
          <div className="flex items-end gap-2 h-20">
            {config.elements.map((el, i) => (
              el.type === 'bar' && (
                <motion.div
                  key={i}
                  className="w-4 bg-blue-500/60 rounded-t"
                  style={{ height: el.height }}
                  initial={{ scaleY: 0.3 }}
                  animate={{ scaleY: isActive ? 1 : 0.5 }}
                  transition={{ 
                    delay: el.delay,
                    duration: stickyStepConfig.animationDuration.normal / 1000,
                    ease: stickyStepConfig.easingCurve 
                  }}
                />
              )
            ))}
          </div>
        )}

        {visual === 'reduction' && (
          <div className="relative">
            {config.elements.map((el, i) => (
              el.type === 'circle' && (
                <motion.div
                  key={i}
                  className="absolute border-2 border-green-500/40 rounded-full"
                  style={{ 
                    width: el.size, 
                    height: el.size,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: isActive ? 1 : 0.7, 
                    opacity: isActive ? 0.6 : 0.3 
                  }}
                  transition={{ 
                    delay: el.delay,
                    duration: stickyStepConfig.animationDuration.normal / 1000,
                    ease: stickyStepConfig.easingCurve 
                  }}
                />
              )
            ))}
          </div>
        )}

        {visual === 'credits' && (
          <div className="flex gap-3">
            {config.elements.map((el, i) => (
              el.type === 'card' && (
                <motion.div
                  key={i}
                  className="h-16 bg-primary/30 rounded-lg border border-primary/40"
                  style={{ width: el.width }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ 
                    y: isActive ? 0 : 10, 
                    opacity: isActive ? 1 : 0.5 
                  }}
                  transition={{ 
                    delay: el.delay,
                    duration: stickyStepConfig.animationDuration.normal / 1000,
                    ease: stickyStepConfig.easingCurve 
                  }}
                />
              )
            ))}
          </div>
        )}

        {visual === 'compliance' && (
          <div className="flex gap-2">
            {config.elements.map((el, i) => (
              el.type === 'doc' && (
                <motion.div
                  key={i}
                  className="w-8 bg-purple-500/30 rounded border border-purple-500/40"
                  style={{ height: el.height }}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ 
                    y: isActive ? 0 : 15, 
                    opacity: isActive ? 1 : 0.5 
                  }}
                  transition={{ 
                    delay: el.delay,
                    duration: stickyStepConfig.animationDuration.normal / 1000,
                    ease: stickyStepConfig.easingCurve 
                  }}
                />
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function StickyStepSection() {
  const t = useTranslations('solutions');
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // 根据滚动进度计算当前激活步骤
  const currentStep = useTransform(scrollYProgress, [0, 1], [0, steps.length - 1]);

  return (
    <section className="relative bg-white py-20" ref={containerRef}>
      {/* 页面标题 */}
      <div className="container-custom mb-20">
        <div className="text-center max-w-3xl mx-auto">
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
      </div>

      {/* Sticky-Step 主体 */}
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* 左侧：粘性视觉区域 */}
          <div className="lg:sticky lg:top-24 space-y-8">
            {/* 当前步骤视觉 */}
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: stickyStepConfig.animationDuration.normal / 1000,
                ease: stickyStepConfig.easingCurve 
              }}
            >
              <StepVisual 
                visual={steps[activeStep]?.visual || 'monitoring'} 
                isActive={true}
              />
            </motion.div>

            {/* 步骤指示器 */}
            <div className="flex justify-center space-x-4">
              {steps.map((step, index) => (
                <motion.button
                  key={step.id}
                  className={`w-3 h-3 rounded-full transition-all duration-${stickyStepConfig.animationDuration.fast} ${
                    index === activeStep 
                      ? 'bg-primary scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => setActiveStep(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>

          {/* 右侧：步骤内容区域 */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="min-h-screen flex items-center"
                onViewportEnter={() => setActiveStep(index)}
                viewport={{ 
                  amount: stickyStepConfig.intersectionThreshold,
                  margin: `-${stickyStepConfig.stickyOffset}px`
                }}
              >
                <Card className="w-full p-8 lg:p-12">
                  <div className="space-y-6">
                    {/* 步骤标题 */}
                    <div className="flex items-center gap-4">
                      <motion.div
                        className="text-4xl"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ 
                          duration: stickyStepConfig.animationDuration.fast / 1000,
                          ease: stickyStepConfig.easingCurve 
                        }}
                        viewport={{ once: true }}
                      >
                        {step.icon}
                      </motion.div>
                      <div>
                        <motion.div
                          className="text-sm font-semibold text-primary mb-2"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                          viewport={{ once: true }}
                        >
                          步骤 {index + 1}
                        </motion.div>
                        <motion.h3
                          className="heading-3 text-black"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          viewport={{ once: true }}
                        >
                          {t(`${step.id}.title`)}
                        </motion.h3>
                      </div>
                    </div>

                    {/* 步骤描述 */}
                    <motion.p
                      className="text-large text-gray-600 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      {t(`${step.id}.description`)}
                    </motion.p>

                    {/* 关键亮点 */}
                    <motion.div
                      className="p-4 bg-gray-50 rounded-xl border border-gray-200"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="font-semibold text-black">
                          关键优势: {step.highlight}
                        </span>
                      </div>
                    </motion.div>

                    {/* 行动按钮 */}
                    <motion.div
                      className="pt-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <Button variant="secondary" size="lg">
                        了解详情
                      </Button>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 底部 CTA */}
      <motion.div
        className="container-custom mt-20 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="heading-2 text-black">
            准备开始您的甲烷减排之旅？
          </h2>
          <p className="text-large text-gray-600">
            联系我们的专家团队，获取定制化的解决方案建议
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              免费咨询
            </Button>
            <Button variant="secondary" size="lg">
              下载方案
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}