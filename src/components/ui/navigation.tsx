'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

// ADDX.co 风格的导航动效配置
const navAnimations = {
  // 导航栏进入动画
  navbar: {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] // easeOutExpo
    }
  },
  
  // 滚动时背景变化
  navbarScrolled: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(16px)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
    transition: {
      duration: 0.25,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  
  navbarTop: {
    background: 'rgba(255, 255, 255, 0)',
    backdropFilter: 'blur(0px)',
    borderBottom: '1px solid transparent',
    transition: {
      duration: 0.25,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  
  // ADDX 风格的悬停效果
  menuItem: {
    rest: {
      scale: 1,
      opacity: 1
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  },
  
  // 精细的下划线动画
  underline: {
    initial: { 
      scaleX: 0, 
      transformOrigin: 'left',
      opacity: 0
    },
    hover: { 
      scaleX: 1,
      opacity: 1,
      transition: { 
        duration: 0.25,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    active: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: [0.16, 1, 0.3, 1]
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
  
  // ADDX 风格移动端菜单
  mobileMenu: {
    initial: { 
      opacity: 0, 
      y: -10
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.03
      }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      transition: {
        duration: 0.25,
        ease: [0.4, 0, 1, 1]
      }
    }
  },
  
  // ADDX 风格移动端菜单项
  mobileMenuItem: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: { 
      opacity: 0, 
      y: 10,
      transition: {
        duration: 0.2
      }
    }
  },
  
  // ADDX 风格下拉菜单
  dropdown: {
    initial: { 
      opacity: 0, 
      y: -10,
      scale: 0.95 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.02
      }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: [0.4, 0, 1, 1]
      }
    }
  },
  
  // 下拉菜单项
  dropdownItem: {
    initial: { opacity: 0, x: -10 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.2,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: { 
      opacity: 0, 
      x: -10,
      transition: {
        duration: 0.1
      }
    }
  }
};

export function Navigation() {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
  
  const { scrollY } = useScroll();
  
  // 监听滚动位置
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);
  });
  
  // 防止移动端菜单开启时滚动
  useEffect(() => {
    // 客户端检查
    if (typeof document === 'undefined') return;

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isMobileMenuOpen]);

  // 下拉菜单配置 - ADDX.co 风格
  const navigationItems = [
    { key: 'home', href: '/' },
    { 
      key: 'solutions', 
      href: '/solutions',
      hasDropdown: true,
      dropdownItems: [
        { key: 'monitoring', href: '/solutions/monitoring', icon: '📊' },
        { key: 'reduction', href: '/solutions/reduction', icon: '⬇️' },
        { key: 'verification', href: '/solutions/verification', icon: '✅' },
        { key: 'consulting', href: '/solutions/consulting', icon: '💼' },
      ]
    },
    { 
      key: 'insights', 
      href: '/insights',
      hasDropdown: true,
      dropdownItems: [
        { key: 'technology', href: '/insights?category=technology', icon: '🔬' },
        { key: 'policy', href: '/insights?category=policy', icon: '📋' },
        { key: 'market', href: '/insights?category=market', icon: '📈' },
        { key: 'case-study', href: '/insights?category=case-study', icon: '📚' },
      ]
    },
    { key: 'cases', href: '/cases' },
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
        <div className="flex items-center justify-between h-14">
          
          {/* ADDX 风格 Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-7 h-7 bg-black rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
            </motion.div>
            <motion.span 
              className="text-[19px] font-semibold text-black tracking-tight"
              whileHover={{ opacity: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              Methas
            </motion.span>
          </Link>

          {/* ADDX 风格桌面导航菜单 */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <motion.div
                key={item.key}
                className="relative"
                variants={navAnimations.menuItem}
                initial="rest"
                whileHover="hover"
                onMouseEnter={() => item.hasDropdown && setOpenDropdown(item.key)}
                onMouseLeave={() => item.hasDropdown && setOpenDropdown(null)}
              >
                <Link 
                  href={item.href}
                  className={`relative px-3 py-2 text-[15px] font-medium transition-all duration-200 flex items-center gap-1 ${
                    isCurrentRoute(item.href) 
                      ? 'text-black' 
                      : 'text-gray-600 hover:text-black'
                  }`}
                  aria-expanded={item.hasDropdown ? openDropdown === item.key : undefined}
                  aria-haspopup={item.hasDropdown ? 'menu' : undefined}
                >
                  {t(item.key)}
                  
                  {/* 下拉箭头 */}
                  {item.hasDropdown && (
                    <motion.svg
                      className="w-3 h-3 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ rotate: openDropdown === item.key ? 180 : 0 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  )}
                  
                  {/* ADDX 风格的精细下划线 */}
                  <motion.div
                    className="absolute bottom-0 left-3 right-3 h-[1px] bg-black"
                    variants={navAnimations.underline}
                    initial="initial"
                    animate={isCurrentRoute(item.href) ? "active" : "initial"}
                    whileHover="hover"
                  />
                </Link>

                {/* 下拉菜单 */}
                <AnimatePresence>
                  {item.hasDropdown && openDropdown === item.key && (
                    <motion.div
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50"
                      variants={navAnimations.dropdown}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      role="menu"
                      aria-label={`${t(item.key)} 菜单`}
                    >
                      {item.dropdownItems?.map((dropdownItem) => (
                        <motion.div
                          key={dropdownItem.key}
                          variants={navAnimations.dropdownItem}
                        >
                          <Link
                            href={dropdownItem.href}
                            className="flex items-center gap-3 px-4 py-3 text-[14px] text-gray-600 hover:text-black hover:bg-gray-50 transition-all duration-200"
                            role="menuitem"
                          >
                            <span className="text-lg">{dropdownItem.icon}</span>
                            <div>
                              <div className="font-medium">{t(`dropdown.${dropdownItem.key}`)}</div>
                              <div className="text-xs text-gray-500 mt-0.5">{t(`dropdown.${dropdownItem.key}_desc`)}</div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* ADDX 风格右侧按钮 */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/contact">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-[15px] font-medium px-4 py-2 hover:bg-gray-50 transition-colors duration-200"
                >
                  {t('contact')}
                </Button>
              </motion.div>
            </Link>
          </div>

          {/* ADDX 风格移动端菜单按钮 */}
          <motion.button
            className="md:hidden relative w-9 h-9 flex flex-col items-center justify-center rounded-md hover:bg-gray-50 transition-colors duration-150"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label="切换菜单"
          >
            <motion.span
              className="absolute w-5 h-[1.5px] bg-black rounded-full"
              animate={isMobileMenuOpen ? navAnimations.hamburger.line1.open : navAnimations.hamburger.line1.closed}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="absolute w-5 h-[1.5px] bg-black rounded-full"
              animate={isMobileMenuOpen ? navAnimations.hamburger.line2.open : navAnimations.hamburger.line2.closed}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="absolute w-5 h-[1.5px] bg-black rounded-full"
              animate={isMobileMenuOpen ? navAnimations.hamburger.line3.open : navAnimations.hamburger.line3.closed}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.button>
        </div>

      </div>
      </motion.nav>
      
      {/* ADDX 风格移动端菜单 */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            variants={navAnimations.mobileMenu}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* 简洁的背景 */}
            <motion.div 
              className="absolute inset-0 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />
            
            {/* 菜单内容 */}
            <div className="relative h-full flex flex-col">
              {/* Header 空间 */}
              <div className="h-14" />
              
              {/* ADDX 风格的简洁菜单 */}
              <div className="flex-1 px-6 py-8">
                <div className="space-y-1">
                  {navigationItems.map((item) => (
                    <motion.div
                      key={item.key}
                      variants={navAnimations.mobileMenuItem}
                    >
                      {/* 主菜单项 */}
                      <div className="relative">
                        <div className="flex items-center justify-between">
                          <Link
                            href={item.href}
                            className={`flex-1 px-4 py-3 text-lg font-medium rounded-lg transition-all duration-200 ${
                              isCurrentRoute(item.href) 
                                ? 'text-black bg-gray-50' 
                                : 'text-gray-600 hover:text-black hover:bg-gray-50'
                            }`}
                            onClick={() => !item.hasDropdown && setIsMobileMenuOpen(false)}
                          >
                            {t(item.key)}
                          </Link>
                          
                          {/* 移动端下拉箭头 */}
                          {item.hasDropdown && (
                            <motion.button
                              className="px-3 py-3 text-gray-600 hover:text-black"
                              onClick={() => setMobileOpenDropdown(
                                mobileOpenDropdown === item.key ? null : item.key
                              )}
                              animate={{ rotate: mobileOpenDropdown === item.key ? 180 : 0 }}
                              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                              aria-expanded={mobileOpenDropdown === item.key}
                              aria-label={`展开 ${t(item.key)} 菜单`}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </motion.button>
                          )}
                        </div>
                        
                        {/* 移动端下拉菜单 */}
                        <AnimatePresence>
                          {item.hasDropdown && mobileOpenDropdown === item.key && (
                            <motion.div
                              className="mt-2 ml-4 space-y-1"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            >
                              {item.dropdownItems?.map((dropdownItem) => (
                                <Link
                                  key={dropdownItem.key}
                                  href={dropdownItem.href}
                                  className="flex items-center gap-3 px-4 py-2 text-base text-gray-600 hover:text-black hover:bg-gray-50 rounded-md transition-all duration-200"
                                  onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setMobileOpenDropdown(null);
                                  }}
                                >
                                  <span className="text-sm">{dropdownItem.icon}</span>
                                  <div>
                                    <div className="font-medium">{t(`dropdown.${dropdownItem.key}`)}</div>
                                  </div>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* 底部联系按钮 */}
                <motion.div
                  variants={navAnimations.mobileMenuItem}
                  className="pt-8 pb-4"
                >
                  <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button 
                      className="w-full" 
                      size="lg"
                    >
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