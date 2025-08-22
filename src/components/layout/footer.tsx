'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Southpole 风格的页脚数据结构
const footerSections = [
  {
    id: 'solutions',
    links: [
      { href: '/monitoring', label: '甲烷监测' },
      { href: '/reduction', label: '智能减排' },
      { href: '/credits', label: '碳信用管理' },
      { href: '/compliance', label: '合规报告' },
    ]
  },
  {
    id: 'company',
    links: [
      { href: '/about', label: '关于我们' },
      { href: '/team', label: '专家团队' },
      { href: '/careers', label: '加入我们' },
      { href: '/contact', label: '联系我们' },
    ]
  },
  {
    id: 'resources',
    links: [
      { href: '/insights', label: '行业洞察' },
      { href: '/cases', label: '客户案例' },
      { href: '/resources', label: '下载中心' },
      { href: '/support', label: '技术支持' },
    ]
  }
];

// 极简动效配置
const animations = {
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0, 0, 0.2, 1] }
  }
};

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white southpole-container">
      {/* 主要内容区域 */}
      <div className="southpole-section">
        {/* 顶部分割线 */}
        <div className="southpole-divider mb-20" />
        
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 mb-20">
          {/* Logo 区域 - 占用2列 */}
          <motion.div 
            className="col-span-2"
            {...animations.fadeUp}
          >
            <Link 
              href={`/${locale}`} 
              className="southpole-heading-2 text-black hover:opacity-60 transition-opacity duration-300 mb-8 block"
            >
              METHAS
            </Link>
            <p className="southpole-body max-w-sm leading-7">
              专业的甲烷减排技术与碳信用管理解决方案提供商，通过创新技术推动可持续发展。
            </p>
          </motion.div>
          
          {/* 解决方案列 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="southpole-caption mb-8">
              解决方案
            </h3>
            <ul className="space-y-6">
              {footerSections[0].links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="southpole-body hover:text-black transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* 公司信息列 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="southpole-caption mb-8">
              公司
            </h3>
            <ul className="space-y-6">
              {footerSections[1].links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="southpole-body hover:text-black transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* 资源列 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="southpole-caption mb-8">
              资源
            </h3>
            <ul className="space-y-6">
              {footerSections[2].links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="southpole-body hover:text-black transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* 联系信息列 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="southpole-caption mb-8">
              联系
            </h3>
            <div className="space-y-6">
              <div>
                <div className="southpole-body">
                  info@methas.cn
                </div>
              </div>
              <div>
                <div className="southpole-body">
                  +86 400-123-4567
                </div>
              </div>
              <div>
                <div className="southpole-body">
                  北京市朝阳区<br/>
                  科技园区
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* 底部版权区域 - Southpole 极简风格 */}
        <motion.div
          className="southpole-divider pt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            {/* 版权信息 */}
            <div className="southpole-caption">
              © {currentYear} Methas. 保留所有权利
            </div>
            
            {/* 法律链接 */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
              <Link 
                href={`/${locale}/privacy`}
                className="southpole-caption hover:text-black transition-colors duration-300"
              >
                隐私政策
              </Link>
              <Link 
                href={`/${locale}/terms`}
                className="southpole-caption hover:text-black transition-colors duration-300"
              >
                使用条款
              </Link>
              <Link 
                href={`/${locale}/cookies`}
                className="southpole-caption hover:text-black transition-colors duration-300"
              >
                Cookie 政策
              </Link>
            </div>
            
            {/* 语言切换 - 极简风格 */}
            <div className="flex gap-6">
              <Link
                href="/zh"
                className={`southpole-caption transition-colors duration-300 ${
                  locale === 'zh' ? 'text-black' : 'hover:text-black'
                }`}
              >
                中文
              </Link>
              <Link
                href="/en"
                className={`southpole-caption transition-colors duration-300 ${
                  locale === 'en' ? 'text-black' : 'hover:text-black'
                }`}
              >
                English
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}