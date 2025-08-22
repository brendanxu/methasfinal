'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import type { StatsSectionProps } from '@/types/sanity';

// 数字滚动组件 - 基于 motion-language.md 配方3
function CountUpNumber({ 
  end, 
  duration = 2000, 
  suffix = "" 
}: { 
  end: number; 
  duration?: number; 
  suffix?: string; 
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const startTime = Date.now();
      const endTime = startTime + duration;
      
      const updateCount = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        
        // 使用 easeOut 缓动
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.floor(easeOut * end);
        
        setCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          setCount(end);
        }
      };
      
      requestAnimationFrame(updateCount);
    }
  }, [isInView, end, duration]);

  return (
    <motion.span
      ref={ref}
      className="text-4xl md:text-5xl font-bold text-black"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: 0.5,
        ease: [0, 0, 0.2, 1]
      }}
    >
      {count}{suffix}
    </motion.span>
  );
}

// 统计项组件
function StatItem({ 
  number, 
  suffix = "", 
  label, 
  description,
  index = 0 
}: {
  number: number;
  suffix?: string;
  label: string;
  description: string;
  index?: number;
}) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0, 0, 0.2, 1]
      }}
    >
      <div className="mb-2">
        <CountUpNumber end={number} suffix={suffix} />
      </div>
      
      <motion.div
        className="text-lg font-semibold text-black mb-2"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 0.3,
          delay: 0.5 + (index * 0.1)
        }}
      >
        {label}
      </motion.div>
      
      <motion.p
        className="text-gray-600 text-sm max-w-xs mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 0.3,
          delay: 0.7 + (index * 0.1)
        }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}

export function StatsSection({ statistics = [] }: StatsSectionProps) {
  // 统计数据
  const stats = [
    {
      number: 500,
      suffix: "+",
      label: "项目经验",
      description: "累计完成的甲烷减排项目数量，覆盖多个行业领域"
    },
    {
      number: 50,
      suffix: "%",
      label: "减排效果",
      description: "平均甲烷减排效率，通过技术创新实现显著成果"
    },
    {
      number: 24,
      suffix: "/7",
      label: "监测覆盖",
      description: "全天候实时监测服务，确保系统稳定运行"
    },
    {
      number: 99,
      suffix: "%",
      label: "客户满意度",
      description: "基于专业服务和技术支持获得的客户认可"
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
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
            数据说话，成果可见
          </h2>
          <p className="text-large text-gray-600 max-w-2xl mx-auto">
            通过专业技术和持续创新，我们为客户创造了可量化的价值
          </p>
        </motion.div>

        {/* 统计数据网格 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              number={stat.number}
              suffix={stat.suffix}
              label={stat.label}
              description={stat.description}
              index={index}
            />
          ))}
        </div>

        {/* 装饰性背景 */}
        <motion.div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.5 }}
        >
          <svg 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl opacity-5"
            viewBox="0 0 400 400"
            fill="none"
          >
            <motion.path
              d="M200 50 L350 200 L200 350 L50 200 Z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 2,
                ease: [0.4, 0, 0.2, 1]
              }}
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}