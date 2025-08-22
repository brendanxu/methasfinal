/**
 * 动态导入工具
 * 用于代码分割和懒加载组件
 */

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

// 简单的动态导入配置
const dynamicConfig = {
  ssr: false,
};

// 预定义的动态导入组件
export const DynamicComponents = {
  // 页面级组件 - 路由级别的代码分割
  SolutionsPage: dynamic(() => import('@/components/sections/southpole-solutions-section').then(mod => ({ default: mod.SouthpoleSolutionsSection })), dynamicConfig),
  
  AboutPage: dynamic(() => import('@/components/sections/southpole-about-section').then(mod => ({ default: mod.SouthpoleAboutSection })), dynamicConfig),
  
  // 功能组件 - 按需加载
  StickyStepSection: dynamic(() => import('@/components/sections/sticky-step-section').then(mod => ({ default: mod.StickyStepSection })), dynamicConfig),
} as const;

// 预加载工具
export function preloadComponent(importFn: () => Promise<any>) {
  if (typeof window !== 'undefined') {
    // 在空闲时间预加载
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        importFn();
      });
    } else {
      // 降级到 setTimeout
      setTimeout(() => {
        importFn();
      }, 100);
    }
  }
}

// 导出类型
export type DynamicComponentKey = keyof typeof DynamicComponents;