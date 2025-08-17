'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

// Southpole.com 风格的导航动效配置
const navAnimations = {
  // 导航栏进入动画
  navbar: {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] // easeOutQuart
    }
  },
  
  // 滚动时背景变化
  navbarScrolled: {
    background: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  
  navbarTop: {
    background: 'rgba(255, 255, 255, 0)',
    backdropFilter: 'blur(0px)',
    borderBottom: '1px solid transparent',
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  
  // 下划线动画
  underline: {
    initial: { scaleX: 0, transformOrigin: 'left' },
    hover: { 
      scaleX: 1,
      transition: { 
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      scaleX: 0,
      transformOrigin: 'right',
      transition: {
        duration: 0.25,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },
  
  // 移动端汉堡菜单
  hamburger: {
    line1: {
      closed: { rotate: 0, y: 0 },
      open: { rotate: 45, y: 6 }
    },
    line2: {
      closed: { opacity: 1 },
      open: { opacity: 0 }
    },
    line3: {
      closed: { rotate: 0, y: 0 },
      open: { rotate: -45, y: -6 }
    }
  },
  
  // 移动端菜单弹出
  mobileMenu: {
    initial: { 
      opacity: 0, 
      y: -20,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.05
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: [0.55, 0.055, 0.675, 0.19]
      }
    }
  },
  
  // 移动端菜单项
  mobileMenuItem: {
    initial: { opacity: 0, x: -30 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: { 
      opacity: 0, 
      x: -30,
      transition: {
        duration: 0.2
      }
    }
  }
};

export function Navigation() {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { scrollY } = useScroll();
  
  // 监听滚动位置
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);
  });
  
  // 防止移动端菜单开启时滚动
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navigationItems = [
    { key: 'home', href: '/' },
    { key: 'solutions', href: '/solutions' },
    { key: 'cases', href: '/cases' },
    { key: 'insights', href: '/insights' },
    { key: 'about', href: '/about' },
  ];
  
  // 检查是否是当前路由
  const isCurrentRoute = (href: string) => {
    if (href === '/' && pathname === '/zh') return true;
    return pathname.includes(href) && href !== '/';
  };

  return (
    <>
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        initial="initial"
        animate="animate"
        variants={navAnimations.navbar}
        style={{
          background: isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0)',
          backdropFilter: isScrolled ? 'blur(20px)' : 'blur(0px)',
          borderBottom: isScrolled ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid transparent'
        }}
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
          <div className="hidden md:flex items-center space-x-12">
            {navigationItems.map((item) => (
              <motion.div
                key={item.key}
                className="relative"
                initial={false}
              >
                <Link 
                  href={item.href}
                  className={`relative py-2 text-sm font-medium tracking-wide transition-all duration-300 ${
                    isCurrentRoute(item.href) 
                      ? 'text-black' 
                      : 'text-gray-700 hover:text-black'
                  }`}
                >
                  {t(item.key)}
                  
                  {/* 下划线动画 */}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black origin-left"
                    initial={false}
                    animate={{
                      scaleX: isCurrentRoute(item.href) ? 1 : 0,
                      transformOrigin: 'left'
                    }}
                    whileHover={{
                      scaleX: 1,
                      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  />
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
            className="md:hidden relative flex flex-col items-center justify-center w-10 h-10 group"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label="切换菜单"
          >
            <motion.span
              className="absolute w-6 h-0.5 bg-black rounded-full transition-all duration-300"
              animate={isMobileMenuOpen ? navAnimations.hamburger.line1.open : navAnimations.hamburger.line1.closed}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
            <motion.span
              className="absolute w-6 h-0.5 bg-black rounded-full transition-all duration-300"
              animate={isMobileMenuOpen ? navAnimations.hamburger.line2.open : navAnimations.hamburger.line2.closed}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
            <motion.span
              className="absolute w-6 h-0.5 bg-black rounded-full transition-all duration-300"
              animate={isMobileMenuOpen ? navAnimations.hamburger.line3.open : navAnimations.hamburger.line3.closed}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </motion.button>
        </div>

      </div>
      </motion.nav>
      
      {/* 移动端全屏菜单 */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            variants={navAnimations.mobileMenu}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* 背景遮罩 */}
            <motion.div 
              className="absolute inset-0 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* 菜单内容 */}
            <div className="relative h-full flex flex-col">
              {/* 占位空间（Header 高度） */}
              <div className="h-16" />
              
              {/* 菜单项 */}
              <div className="flex-1 flex flex-col justify-center px-8 space-y-8">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.key}
                    variants={navAnimations.mobileMenuItem}
                    className="text-center"
                  >
                    <Link
                      href={item.href}
                      className={`block text-4xl font-light tracking-wide transition-all duration-300 ${
                        isCurrentRoute(item.href) 
                          ? 'text-black' 
                          : 'text-gray-400 hover:text-black'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t(item.key)}
                    </Link>
                  </motion.div>
                ))}
                
                {/* 联系按钮 */}
                <motion.div
                  variants={navAnimations.mobileMenuItem}
                  className="pt-12 text-center"
                >
                  <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button size="lg" className="px-12">
                      {t('contact')}
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}