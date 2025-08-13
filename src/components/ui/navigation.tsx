'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// 导航动效配置 - 基于 motion-language.md
const navAnimations = {
  // 导航栏进入动画
  navbar: {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: {
      duration: 0.6,
      ease: [0, 0, 0.2, 1]
    }
  },
  
  // 导航项悬停
  navItem: {
    rest: { scale: 1, color: '#000000' },
    hover: { 
      scale: 1.05, 
      color: '#22c55e',
      transition: { 
        duration: 0.2,
        ease: [0, 0, 0.2, 1]
      }
    }
  },
  
  // 移动菜单
  mobileMenu: {
    initial: { opacity: 0, height: 0 },
    animate: { 
      opacity: 1, 
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: [0, 0, 0.2, 1]
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0, 0, 0.2, 1]
      }
    }
  }
};

export function Navigation() {
  const t = useTranslations('navigation');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { key: 'home', href: '/' },
    { key: 'solutions', href: '/solutions' },
    { key: 'cases', href: '/cases' },
    { key: 'insights', href: '/insights' },
    { key: 'about', href: '/about' },
  ];

  return (
    <motion.nav 
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200"
      {...navAnimations.navbar}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <motion.div
              className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              M
            </motion.div>
            <motion.span 
              className="text-xl font-bold text-black"
              whileHover={{ color: '#22c55e' }}
              transition={{ duration: 0.2 }}
            >
              Methas
            </motion.span>
          </Link>

          {/* 桌面导航菜单 */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <motion.div
                key={item.key}
                variants={navAnimations.navItem}
                initial="rest"
                whileHover="hover"
              >
                <Link 
                  href={item.href}
                  className="font-medium text-black hover:text-primary transition-colors"
                >
                  {t(item.key)}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* 右侧按钮组 */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/contact" className="inline-block">
              <Button variant="secondary" size="sm">
                {t('contact')}
              </Button>
            </Link>
          </div>

          {/* 移动端菜单按钮 */}
          <motion.button
            className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="w-6 h-0.5 bg-black rounded-full"
              animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-black rounded-full"
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-black rounded-full"
              animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </motion.button>
        </div>

        {/* 移动端菜单 */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden border-t border-gray-200"
              variants={navAnimations.mobileMenu}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="py-4 space-y-4">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      transition: { 
                        delay: index * 0.1,
                        duration: 0.3 
                      }
                    }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <Link
                      href={item.href}
                      className="block py-2 text-lg font-medium text-black hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t(item.key)}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  className="pt-4 border-t border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      delay: navigationItems.length * 0.1,
                      duration: 0.3 
                    }
                  }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <Link href="/contact" className="inline-block">
                    <Button className="w-full">
                      {t('contact')}
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}