'use client';

import { useEffect } from 'react';
import { performanceUtils } from '@/lib/performance';

/**
 * 性能优化包装组件
 * 提供预加载、性能监控等功能
 */
export function PerformanceWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 预连接到常用的外部服务
    const preconnectDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ];

    preconnectDomains.forEach(domain => {
      performanceUtils.preconnect(domain);
    });

    // 预加载关键 CSS
    if (typeof document !== 'undefined') {
      const criticalCSS = document.querySelector('style[data-emotion-css]');
      if (criticalCSS) {
        performanceUtils.preloadResource('/css/critical.css', 'style');
      }
    }

    // 优化图片加载
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // 在空闲时间预加载重要图片
        const imagesToPreload = [
          '/images/hero-bg.jpg',
          '/images/solutions/monitoring.jpg',
        ];

        imagesToPreload.forEach(src => {
          const img = new Image();
          img.src = src;
        });
      });
    }

    return () => {
      // 清理资源
    };
  }, []);

  return <>{children}</>;
}

/**
 * 开发环境性能调试组件
 */
export function PerformanceDebugger() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // 性能监控热键
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'P') {
          // 显示性能报告
          const report = {
            timing: performance.timing,
            memory: (performance as any).memory,
            navigation: performance.navigation
          };
          
          console.group('🎯 Performance Report');
          console.table(report.timing);
          if (report.memory) {
            console.log('💾 Memory:', {
              used: `${(report.memory.usedJSHeapSize / 1048576).toFixed(2)}MB`,
              total: `${(report.memory.totalJSHeapSize / 1048576).toFixed(2)}MB`,
              limit: `${(report.memory.jsHeapSizeLimit / 1048576).toFixed(2)}MB`
            });
          }
          console.groupEnd();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div 
      className="fixed bottom-4 right-4 z-50 bg-black text-white text-xs p-2 rounded opacity-50 pointer-events-none"
      title="Press Ctrl+Shift+P for performance report"
    >
      🎯 DEV
    </div>
  );
}