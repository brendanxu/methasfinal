'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, StatsCard } from '@/components/ui/card';
import { SouthpoleButton } from '@/components/ui/button';

// 团队成员数据
const teamMembers = [
  {
    id: 'zhang-wei',
    name: '张伟',
    role: '创始人 & CEO',
    bio: '15年环保技术经验，曾任职于知名环境咨询公司，专注甲烷减排技术研发与应用。',
    image: '/images/team/zhang-wei.jpg',
    expertise: ['甲烷监测', '碳市场', '环保政策']
  },
  {
    id: 'li-ming',
    name: '李明',
    role: '技术总监',
    bio: '北京大学环境工程博士，拥有多项甲烷检测专利，致力于AI算法在环保领域的应用。',
    image: '/images/team/li-ming.jpg',
    expertise: ['AI算法', '传感器技术', '数据分析']
  },
  {
    id: 'wang-li',
    name: '王丽',
    role: '商务总监',
    bio: '10年企业服务经验，深度理解客户需求，致力于为企业提供最优的减排解决方案。',
    image: '/images/team/wang-li.jpg',
    expertise: ['客户关系', '项目管理', '商务拓展']
  }
];

// 核心价值观
const coreValues = [
  {
    title: '技术创新',
    description: '持续投入研发，运用最先进的技术为客户创造价值',
    icon: '🔬'
  },
  {
    title: '环境责任',
    description: '以减少环境影响为使命，为地球的可持续发展贡献力量',
    icon: '🌱'
  },
  {
    title: '客户至上',
    description: '深入理解客户需求，提供超越期望的专业服务',
    icon: '🤝'
  },
  {
    title: '诚信合作',
    description: '建立信任关系，与合作伙伴共同成长，实现共赢',
    icon: '⚖️'
  }
];

// 公司里程碑
const milestones = [
  {
    year: '2020',
    title: '公司成立',
    description: 'Methas 在北京成立，开始甲烷监测技术研发'
  },
  {
    year: '2021',
    title: '技术突破',
    description: '成功开发AI智能甲烷检测算法，获得多项技术专利'
  },
  {
    year: '2022',
    title: '商业化部署',
    description: '首批产品成功部署，服务100+企业客户'
  },
  {
    year: '2023',
    title: '国际认证',
    description: '获得ISO认证，产品符合国际标准，拓展海外市场'
  },
  {
    year: '2024',
    title: '持续创新',
    description: '推出碳信用管理平台，建立完整生态服务体系'
  }
];

// 统计数据
const companyStats = [
  { value: '500+', label: 'CLIENTS', description: '服务客户' },
  { value: '5年', label: 'EXPERIENCE', description: '行业经验' },
  { value: '50+', label: 'PATENTS', description: '技术专利' },
  { value: '99.5%', label: 'ACCURACY', description: '检测精度' }
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
  },
  staggerChildren: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
};

export function SouthpoleAboutSection() {
  const t = useTranslations('about');
  
  return (
    <>
      {/* Hero Section - Southpole 极简标题 */}
      <section className="southpole-container southpole-section">
        <div className="max-w-4xl">
          <motion.h1 
            className="southpole-heading-hero text-black mb-8"
            {...animations.fadeUp}
          >
            关于 Methas
          </motion.h1>
          <motion.p 
            className="southpole-body-large max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            我们是一家专注于甲烷减排技术的创新企业，通过先进的监测技术和智能化解决方案，
            帮助企业实现环境目标，创造可持续价值。
          </motion.p>
        </div>
      </section>

      {/* 图文混排 - 公司故事 */}
      <section className="southpole-container southpole-section">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* 左侧图片 */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
              {/* 这里可以放置实际图片 */}
              <div className="text-center">
                <div className="w-24 h-24 bg-black mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white text-2xl">🏢</span>
                </div>
                <div className="southpole-caption">公司远景</div>
              </div>
            </div>
          </motion.div>

          {/* 右侧内容 */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="southpole-heading-1 text-black mb-6">
                我们的使命
              </h2>
              <p className="southpole-body-large leading-8 mb-6">
                致力于成为全球领先的甲烷减排技术提供商，通过创新技术和专业服务，
                帮助企业实现环境保护目标，推动全球可持续发展进程。
              </p>
              <p className="southpole-body">
                我们相信，每一个企业都有责任为环境保护贡献力量。通过我们的技术和服务，
                让环保不再是负担，而是企业发展的新机遇。
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 统计数据 - 反向图文布局 */}
      <section className="southpole-container southpole-section">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* 左侧内容 */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 lg:order-last"
          >
            <div>
              <h2 className="southpole-heading-1 text-black mb-6">
                数据驱动成果
              </h2>
              <p className="southpole-body-large leading-8 mb-8">
                自成立以来，我们已为500+企业客户提供专业服务，
                帮助他们实现了显著的环境效益和经济回报。
              </p>
            </div>
            
            {/* 统计网格 */}
            <div className="grid grid-cols-2 gap-8">
              {companyStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <StatsCard
                    value={stat.value}
                    label={stat.label}
                    description={stat.description}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 右侧图片 */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-black mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white text-2xl">📊</span>
                </div>
                <div className="southpole-caption">数据成果</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 核心价值观 - 全宽度网格 */}
      <section className="southpole-container southpole-section bg-gray-50">
        <div className="text-center mb-16">
          <motion.h2 
            className="southpole-heading-1 text-black mb-6"
            {...animations.fadeUp}
          >
            核心价值观
          </motion.h2>
          <motion.p 
            className="southpole-body-large max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            这些价值观指导着我们的每一个决策，塑造着我们的企业文化
          </motion.p>
        </div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={animations.staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {coreValues.map((value, index) => (
            <motion.div
              key={value.title}
              variants={animations.fadeUp}
            >
              <Card variant="ghost" padding="lg">
                <div className="text-center">
                  <div className="text-4xl mb-6">{value.icon}</div>
                  <h3 className="southpole-heading-3 text-black mb-4">
                    {value.title}
                  </h3>
                  <p className="southpole-body">
                    {value.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 团队介绍 - 交错布局 */}
      <section className="southpole-container southpole-section">
        <div className="text-center mb-16">
          <motion.h2 
            className="southpole-heading-1 text-black mb-6"
            {...animations.fadeUp}
          >
            核心团队
          </motion.h2>
          <motion.p 
            className="southpole-body-large max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            由经验丰富的专业人士组成，致力于为客户提供最优质的服务
          </motion.p>
        </div>

        <div className="space-y-20">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              {/* 头像 */}
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="aspect-square max-w-md mx-auto bg-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-black mx-auto mb-6 flex items-center justify-center rounded-sm">
                      <span className="text-white text-4xl font-light">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    <div className="southpole-caption">{member.name}</div>
                  </div>
                </div>
              </div>

              {/* 介绍 */}
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <div className="max-w-lg">
                  <h3 className="southpole-heading-2 text-black mb-2">
                    {member.name}
                  </h3>
                  <div className="southpole-caption mb-6">
                    {member.role}
                  </div>
                  <p className="southpole-body mb-8 leading-7">
                    {member.bio}
                  </p>
                  
                  {/* 专业领域 */}
                  <div>
                    <div className="southpole-caption mb-4">专业领域</div>
                    <div className="flex flex-wrap gap-3">
                      {member.expertise.map((skill) => (
                        <span 
                          key={skill}
                          className="px-4 py-2 border border-black text-sm hover:bg-black hover:text-white transition-colors duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 发展历程 - 时间线 */}
      <section className="southpole-container southpole-section bg-gray-50">
        <div className="text-center mb-16">
          <motion.h2 
            className="southpole-heading-1 text-black mb-6"
            {...animations.fadeUp}
          >
            发展历程
          </motion.h2>
          <motion.p 
            className="southpole-body-large max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            从创立至今，我们不断创新突破，为环保事业贡献力量
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* 年份 */}
                <div className="lg:text-right">
                  <div className="southpole-heading-2 text-black">
                    {milestone.year}
                  </div>
                </div>
                
                {/* 分割线 */}
                <div className="hidden lg:flex justify-center">
                  <div className="w-px h-20 bg-black"></div>
                </div>
                
                {/* 内容 */}
                <div className="lg:col-span-2">
                  <h3 className="southpole-heading-3 text-black mb-4">
                    {milestone.title}
                  </h3>
                  <p className="southpole-body">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="southpole-container southpole-section">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2 
            className="southpole-heading-1 text-black mb-8"
            {...animations.fadeUp}
          >
            加入我们的使命
          </motion.h2>
          
          <motion.p 
            className="southpole-body-large mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            与 Methas 携手，共同为地球的可持续发展贡献力量
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <SouthpoleButton.CTA asChild>
              <Link href="/contact">
                联系我们
              </Link>
            </SouthpoleButton.CTA>
            
            <SouthpoleButton.Secondary asChild>
              <Link href="/careers">
                加入团队
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