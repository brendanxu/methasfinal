'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

// 团队成员数据
const teamMembers = [
  {
    name: '张博士',
    role: '首席技术官',
    bio: '环境工程博士，15年甲烷减排技术研发经验，曾主导多个国际级环保项目。',
    avatar: '👨‍🔬',
    expertise: ['技术研发', '项目管理', '环境科学']
  },
  {
    name: '李工程师',
    role: '解决方案架构师',
    bio: '资深系统架构师，专注于大规模环境监测系统设计与实施。',
    avatar: '👩‍💻',
    expertise: ['系统架构', '数据分析', 'IoT技术']
  },
  {
    name: '王博士',
    role: '碳市场专家',
    bio: '碳交易市场资深专家，深度参与碳信用标准制定和市场机制设计。',
    avatar: '👨‍💼',
    expertise: ['碳市场', '政策法规', '金融工具']
  },
  {
    name: '陈总监',
    role: '客户成功总监',
    bio: '10年企业服务经验，致力于为客户提供最优质的解决方案和服务体验。',
    avatar: '👩‍💼',
    expertise: ['客户服务', '业务咨询', '项目交付']
  },
];

export function TeamSection() {
  return (
    <section className="py-20 bg-gray-50">
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
            专业团队
          </motion.h2>
          <motion.p 
            className="text-large text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            汇聚行业顶尖人才，为您提供专业可靠的服务
          </motion.p>
        </div>

        {/* 团队成员网格 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
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
              <Card className="h-full p-6 text-center hover:shadow-lg transition-all duration-300 group">
                <div className="space-y-4">
                  
                  {/* 头像 */}
                  <motion.div 
                    className="w-20 h-20 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center text-4xl"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {member.avatar}
                  </motion.div>
                  
                  {/* 姓名和职位 */}
                  <div>
                    <h3 className="heading-4 text-black mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-primary font-medium">
                      {member.role}
                    </p>
                  </div>
                  
                  {/* 简介 */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {member.bio}
                  </p>
                  
                  {/* 专业领域标签 */}
                  <div className="space-y-2">
                    <div className="text-xs text-gray-500 font-medium">专业领域</div>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {member.expertise.map((skill, skillIndex) => (
                        <motion.span
                          key={skillIndex}
                          className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded-md"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            duration: 0.3, 
                            delay: (index * 0.1) + (skillIndex * 0.05)
                          }}
                          viewport={{ once: true }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* 加入我们 CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="heading-3 text-black">
              加入我们的团队
            </h3>
            <p className="text-gray-600">
              我们正在寻找志同道合的伙伴，一起为地球的可持续发展贡献力量
            </p>
            <motion.a
              href="/careers"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              查看职位
            </motion.a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}