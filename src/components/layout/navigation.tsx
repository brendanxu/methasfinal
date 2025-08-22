'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Southpole 风格的语言切换组件
function LanguageSwitcher() {
  const locale = useLocale();
  const otherLocale = locale === 'zh' ? 'en' : 'zh';
  
  return (
    <Link 
      href={`/${otherLocale}`}
      className="text-xs font-normal tracking-widest text-black/60 hover:text-black transition-colors duration-300 uppercase"
    >
      {otherLocale === 'en' ? 'EN' : 'ZH'}
    </Link>
  );
}

// Southpole 风格的汉堡菜单图标 - 更细的线条
function HamburgerIcon({ 
  isOpen, 
  onClick 
}: { 
  isOpen: boolean; 
  onClick: () => void; 
}) {
  return (
    <button
      onClick={onClick}
      className="relative w-11 h-11 flex items-center justify-center focus:outline-none group southpole-touch-target"
      aria-label="Toggle navigation menu"
    >
      <div className="relative w-5 h-4 flex flex-col justify-between">
        <motion.span
          className="block w-full h-px bg-black origin-left"
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? -0.5 : 0,
            scaleX: isOpen ? 1.15 : 1,
          }}
          transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
        />
        <motion.span
          className="block w-full h-px bg-black"
          animate={{
            opacity: isOpen ? 0 : 1,
            scaleX: isOpen ? 0 : 1,
          }}
          transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
        />
        <motion.span
          className="block w-full h-px bg-black origin-left"
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? 0.5 : 0,
            scaleX: isOpen ? 1.15 : 1,
          }}
          transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
        />
      </div>
    </button>
  );
}

// Southpole 风格的主导航组件
export function Navigation() {
  const t = useTranslations('navigation');
  const locale = useLocale();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // 监听滚动，添加微妙的背景变化
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 导航链接配置
  const navItems = [
    { href: `/${locale}/solutions`, label: t('solutions') },
    { href: `/${locale}/cases`, label: t('cases') },
    { href: `/${locale}/insights`, label: t('insights') },
    { href: `/${locale}/about`, label: t('about') },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-500",
          isScrolled 
            ? "bg-white/95 backdrop-blur-sm border-b border-black/5" 
            : "bg-transparent"
        )}
      >
        <nav className="px-10 lg:px-20 mx-auto max-w-[1440px]">
          <div className="flex h-20 lg:h-24 items-center justify-between">
            {/* Logo - Southpole 风格的极简文字 */}
            <Link 
              href={`/${locale}`} 
              className="text-xl lg:text-2xl font-light tracking-wide text-black hover:opacity-70 transition-opacity duration-300"
            >
              METHAS
            </Link>

            {/* 桌面端导航 - 水平排列，更大间距 */}
            <div className="hidden lg:flex items-center gap-12">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-light tracking-wide text-black/80 hover:text-black transition-colors duration-300 relative group"
                >
                  {item.label}
                  {/* 极细的下划线效果 */}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-black transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* 桌面端操作区 - 极简按钮风格 */}
            <div className="hidden lg:flex items-center gap-8">
              <LanguageSwitcher />
              <Link 
                href={`/${locale}/contact`}
                className="px-8 py-3 border border-black text-sm font-light tracking-wide text-black hover:bg-black hover:text-white transition-all duration-300"
              >
                {t('contact').toUpperCase()}
              </Link>
            </div>

            {/* 移动端汉堡菜单 */}
            <div className="lg:hidden">
              <HamburgerIcon 
                isOpen={isMobileMenuOpen} 
                onClick={toggleMobileMenu} 
              />
            </div>
          </div>
        </nav>
      </header>

      {/* 移动端全屏菜单 - Southpole 风格 */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
            className="fixed inset-0 z-40 bg-white lg:hidden"
          >
            {/* 移动端导航头部 */}
            <div className="px-8 h-20 flex items-center justify-between border-b border-black/10">
              <Link 
                href={`/${locale}`} 
                onClick={closeMobileMenu}
                className="text-xl font-light tracking-wide text-black"
              >
                METHAS
              </Link>
              <HamburgerIcon 
                isOpen={isMobileMenuOpen} 
                onClick={toggleMobileMenu} 
              />
            </div>

            {/* 移动端菜单项 - 大字号，充足间距 */}
            <nav className="px-8 py-12">
              <div className="space-y-8">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: index * 0.05,
                      duration: 0.3,
                      ease: [0, 0, 0.2, 1]
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="block text-2xl font-light text-black hover:opacity-70 transition-opacity duration-300"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                
                {/* 移动端联系按钮 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: navItems.length * 0.05,
                    duration: 0.3,
                    ease: [0, 0, 0.2, 1]
                  }}
                  className="pt-8 border-t border-black/10"
                >
                  <Link 
                    href={`/${locale}/contact`}
                    onClick={closeMobileMenu}
                    className="inline-block px-8 py-3 border border-black text-base font-light tracking-wide text-black"
                  >
                    {t('contact').toUpperCase()}
                  </Link>
                </motion.div>

                {/* 移动端语言切换 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: (navItems.length + 1) * 0.05,
                    duration: 0.3,
                    ease: [0, 0, 0.2, 1]
                  }}
                >
                  <LanguageSwitcher />
                </motion.div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 占位元素，防止内容被固定导航遮挡 */}
      <div className="h-20 lg:h-24" />
    </>
  );
}

export default Navigation;