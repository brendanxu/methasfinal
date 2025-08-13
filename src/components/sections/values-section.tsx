'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

// 价值观数据
const values = [
  {
    icon: '🌍',
    title: '环境责任',
    description: '我们致力于保护地球环境，通过创新技术减少温室气体排放，为子孙后代留下更清洁的世界。',
    color: 'from-green-500/10 to-emerald-500/10'
  },
  {
    icon: '🔬',
    title: '科技创新',
    description: '持续投入研发，运用最先进的技术和方法，为客户提供领先的甲烷减排解决方案。',
    color: 'from-blue-500/10 to-cyan-500/10'
  },
  {
    icon: '🤝',
    title: '合作共赢',
    description: '与合作伙伴建立长期互信关系，共同推动可持续发展目标的实现。',
    color: 'from-purple-500/10 to-indigo-500/10'
  },
  {
    icon: '⚡',
    title: '高效执行',
    description: '以结果为导向，快速响应客户需求，确保项目按时高质量交付。',
    color: 'from-amber-500/10 to-orange-500/10'
  },
];

export function ValuesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        
        {/* 区块标题 */}
        <div className="text-center mb-16">
          <motion.h2 
            className="heading-2 text-black mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            我们的价值观
          </motion.h2>
          <motion.p 
            className="text-large text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            这些核心价值观指导着我们的每一个决策和行动
          </motion.p>
        </div>

        {/* 价值观网格 */}
        <div className="grid md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0, 0, 0.2, 1]
              }}
              viewport={{ once: true }}
            >
              <Card className="h-full p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="space-y-6">
                  
                  {/* 图标背景 */}
                  <motion.div 
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-2xl">{value.icon}</span>
                  </motion.div>
                  
                  {/* 标题 */}
                  <h3 className="heading-3 text-black">
                    {value.title}
                  </h3>
                  
                  {/* 描述 */}
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                  
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* 底部引用 */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl mx-auto">
            <blockquote className="text-xl text-gray-700 italic leading-relaxed">
              "我们相信，通过技术创新和责任担当，能够为地球的可持续发展贡献我们的力量。"
            </blockquote>
            <div className="mt-6 text-sm text-gray-500">
              — Methas 创始团队
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}