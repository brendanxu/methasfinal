'use client';

import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// 语言切换组件
function LanguageSwitcher() {
  const locale = useLocale();
  const otherLocale = locale === 'zh' ? 'en' : 'zh';
  
  return (
    <Link 
      href={`/${otherLocale}`}
      className="text-sm font-medium text-gray-600 hover:text-black transition-colors duration-fast"
    >
      {otherLocale === 'en' ? 'EN' : '中文'}
    </Link>
  );
}

// 移动端菜单项组件
function MobileNavItem({ 
  href, 
  children, 
  onClick 
}: { 
  href: string; 
  children: React.ReactNode; 
  onClick: () => void; 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={href}
        onClick={onClick}
        className="block py-4 text-lg font-medium text-black hover:text-primary transition-colors border-b border-gray-100 last:border-b-0"
      >
        {children}
      </Link>
    </motion.div>
  );
}

// 汉堡菜单图标
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
      className="flex flex-col justify-center items-center w-6 h-6 focus:outline-none"
      aria-label="Toggle navigation menu"
    >
      <motion.span
        className="block w-6 h-0.5 bg-black mb-1.5"
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 8 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block w-6 h-0.5 bg-black mb-1.5"
        animate={{
          opacity: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block w-6 h-0.5 bg-black"
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -8 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </button>
  );
}

// 主导航组件
export function Navigation() {
  const t = useTranslations('navigation');
  const locale = useLocale();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 导航链接配置
  const navItems = [
    { href: `/${locale}`, label: t('home') },
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
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <nav className="container-custom mx-auto">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href={`/${locale}`} 
              className="text-2xl font-bold text-black hover:text-primary transition-colors duration-fast"
            >
              Methas
            </Link>
          </div>

          {/* 桌面端导航 */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-fast relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-fast group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* 桌面端操作区 */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSwitcher />
            <Button asChild size="default">
              <Link href={`/${locale}/contact`}>
                {t('contact')}
              </Link>
            </Button>
          </div>

          {/* 移动端汉堡菜单 */}
          <div className="lg:hidden">
            <HamburgerIcon 
              isOpen={isMobileMenuOpen} 
              onClick={toggleMobileMenu} 
            />
          </div>
        </div>

        {/* 移动端菜单 */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden border-t border-gray-200 bg-white"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: index * 0.1,
                      duration: 0.2 
                    }}
                  >
                    <MobileNavItem 
                      href={item.href} 
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </MobileNavItem>
                  </motion.div>
                ))}
                
                {/* 移动端操作区 */}
                <motion.div 
                  className="pt-4 border-t border-gray-100 flex flex-col space-y-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: navItems.length * 0.1,
                    duration: 0.2 
                  }}
                >
                  <div className="flex justify-between items-center">
                    <LanguageSwitcher />
                    <Button asChild size="sm">
                      <Link href={`/${locale}/contact`} onClick={closeMobileMenu}>
                        {t('contact')}
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 移动端菜单背景遮罩 */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 top-20 bg-black/20 backdrop-blur-sm z-40"
            onClick={closeMobileMenu}
          />
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navigation;