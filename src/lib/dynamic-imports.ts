/**
 * 动态导入工具
 * 用于代码分割和懒加载组件
 */

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

// 通用加载组件
export const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin" />
  </div>
);

// Southpole 风格加载组件
export const SouthpoleLoading = () => (
  <div className="southpole-container southpole-section">
    <div className="text-center">
      <div className="w-1 h-16 bg-black animate-pulse mx-auto mb-4" />
      <div className="southpole-caption">加载中...</div>
    </div>
  </div>
);

// 错误边界组件
export const ErrorFallback = ({ error, retry }: { error: Error; retry?: () => void }) => (
  <div className="southpole-container southpole-section">
    <div className="text-center max-w-md mx-auto">
      <h2 className="southpole-heading-2 text-black mb-4">
        加载出错
      </h2>
      <p className="southpole-body mb-6">
        {error.message || '组件加载失败，请稍后重试。'}
      </p>
      {retry && (
        <button 
          onClick={retry}
          className="border border-black px-6 py-2 hover:bg-black hover:text-white transition-colors duration-300"
        >
          重试
        </button>
      )}
    </div>
  </div>
);

// 动态导入配置
const dynamicConfig = {
  loading: SouthpoleLoading,
  ssr: false,
};

// 预定义的动态导入组件
export const DynamicComponents = {
  // 页面级组件 - 路由级别的代码分割
  SolutionsPage: dynamic(() => import('@/components/sections/southpole-solutions-section').then(mod => ({ default: mod.SouthpoleSolutionsSection })), dynamicConfig),
  
  AboutPage: dynamic(() => import('@/components/sections/southpole-about-section').then(mod => ({ default: mod.SouthpoleAboutSection })), dynamicConfig),
  
  // 功能组件 - 按需加载
  StickyStepSection: dynamic(() => import('@/components/sections/sticky-step-section').then(mod => ({ default: mod.StickyStepSection })), dynamicConfig),
  
  // 图表组件 - 延迟加载
  ChartsBundle: dynamic(() => import('@/components/charts/index'), {
    ...dynamicConfig,
    loading: () => (
      <div className="southpole-container py-12">
        <div className="bg-gray-100 h-64 flex items-center justify-center">
          <SouthpoleLoading />
        </div>
      </div>
    )
  }),
  
  // 第三方集成 - 用户交互时才加载
  ContactForm: dynamic(() => import('@/components/forms/contact-form'), {
    ...dynamicConfig,
    loading: () => (
      <div className="p-8 border border-gray-200">
        <SouthpoleLoading />
      </div>
    )
  }),
  
  // 管理面板 - 管理员权限检查后加载
  AdminDashboard: dynamic(() => import('@/components/admin/dashboard'), {
    ...dynamicConfig,
    loading: () => <LoadingSpinner />
  }),
} as const;

// 条件动态导入 Hook
export function useConditionalImport<T extends ComponentType<any>>(
  condition: boolean,
  importFn: () => Promise<{ default: T }>,
  fallback?: ComponentType<any>
): T | ComponentType<any> | null {
  if (!condition) {
    return fallback || null;
  }
  
  return dynamic(importFn, dynamicConfig);
}

// 延迟导入工具
export function lazyImport<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  delay: number = 0
): ComponentType<any> {
  return dynamic(
    () => new Promise(resolve => {
      setTimeout(() => {
        importFn().then(resolve);
      }, delay);
    }),
    dynamicConfig
  );
}

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

// Bundle 分析工具
export const bundleAnalyzer = {
  // 标记关键路径组件
  markCritical: (componentName: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🎯 Critical component loaded: ${componentName}`);
    }
  },
  
  // 标记非关键组件
  markNonCritical: (componentName: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`⏰ Non-critical component loaded: ${componentName}`);
    }
  },
  
  // 测量加载时间
  measureLoadTime: (componentName: string, startTime: number) => {
    if (process.env.NODE_ENV === 'development') {
      const loadTime = performance.now() - startTime;
      console.log(`⚡ ${componentName} loaded in ${loadTime.toFixed(2)}ms`);
    }
  }
};

// 导出类型
export type DynamicComponentKey = keyof typeof DynamicComponents;