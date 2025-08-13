'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function ContactSection() {
  const t = useTranslations('contact');
  
  return (
    <section className="py-24 bg-black text-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 左侧内容 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-2 text-white mb-6">
              {t('title')}
            </h2>
            <p className="text-large text-gray-300 mb-8">
              {t('description')}
            </p>
            
            {/* 联系方式 */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <div className="w-5 h-5 mr-3 text-primary">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <span className="text-gray-300">info@methas.cn</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-5 h-5 mr-3 text-primary">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <span className="text-gray-300">+86 400-123-4567</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-5 h-5 mr-3 text-primary">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <span className="text-gray-300">北京市朝阳区某某大厦</span>
              </div>
            </div>
          </motion.div>
          
          {/* 右侧表单 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      {t('form.name')} *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                      placeholder="请输入您的姓名"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      {t('form.email')} *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    {t('form.company')}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    placeholder="请输入公司名称"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    {t('form.message')} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
                    placeholder="请描述您的需求或问题..."
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-primary text-white hover:bg-primary/90"
                >
                  {t('form.submit')}
                </Button>
              </form>
              
              <p className="text-xs text-gray-400 mt-4 text-center">
                提交表单即表示您同意我们的隐私政策和服务条款
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}