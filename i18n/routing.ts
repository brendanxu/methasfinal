import { defineRouting } from 'next-intl/routing';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // 支持的语言列表
  locales: ['zh', 'en'],
  
  // 默认语言
  defaultLocale: 'zh',
  
  // URL 路径策略
  localePrefix: 'always', // 总是显示语言前缀
  
  // 路径名配置 (共享路径名)
  pathnames: {
    '/': '/',
    '/solutions': '/solutions',
    '/cases': '/cases',
    '/insights': '/insights',
    '/insights/[id]': '/insights/[id]',
    '/about': '/about',
    '/contact': '/contact',
  }
});

// 类型安全的导航助手
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation(routing);