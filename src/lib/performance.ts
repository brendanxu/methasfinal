/**
 * Methas - 性能监控工具
 * 用于监控和优化应用性能指标
 */

// Web Vitals 性能指标接口
interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

// Core Web Vitals 阈值 (基于 CLAUDE.md 性能要求)
const PERFORMANCE_THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 }, // Largest Contentful Paint
  FID: { good: 100, needsImprovement: 300 },   // First Input Delay
  CLS: { good: 0.1, needsImprovement: 0.25 },  // Cumulative Layout Shift
  FCP: { good: 1800, needsImprovement: 3000 }, // First Contentful Paint
  TTFB: { good: 800, needsImprovement: 1800 }  // Time to First Byte
} as const;

// 性能评级函数
function getRating(metric: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = PERFORMANCE_THRESHOLDS[metric as keyof typeof PERFORMANCE_THRESHOLDS];
  if (!threshold) return 'good';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.needsImprovement) return 'needs-improvement';
  return 'poor';
}

// 性能监控器类
class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private observers: PerformanceObserver[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeObservers();
    }
  }

  // 初始化性能观察器
  private initializeObservers() {
    // 监控 LCP, FCP, CLS, FID
    if ('PerformanceObserver' in window) {
      // LCP Observer
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.recordMetric('LCP', lastEntry.startTime);
      });
      
      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      } catch (e) {
        console.warn('LCP observer not supported');
      }

      // FID Observer
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          this.recordMetric('FID', entry.processingStart - entry.startTime);
        });
      });
      
      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.push(fidObserver);
      } catch (e) {
        console.warn('FID observer not supported');
      }

      // CLS Observer
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            this.recordMetric('CLS', clsValue);
          }
        });
      });
      
      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(clsObserver);
      } catch (e) {
        console.warn('CLS observer not supported');
      }
    }

    // Navigation Timing API for TTFB and other metrics
    if ('performance' in window && 'timing' in window.performance) {
      window.addEventListener('load', () => {
        const timing = window.performance.timing;
        const ttfb = timing.responseStart - timing.navigationStart;
        this.recordMetric('TTFB', ttfb);

        const fcp = timing.domContentLoadedEventEnd - timing.navigationStart;
        this.recordMetric('FCP', fcp);
      });
    }
  }

  // 记录性能指标
  private recordMetric(name: string, value: number) {
    const metric: PerformanceMetric = {
      name,
      value,
      rating: getRating(name, value),
      timestamp: Date.now()
    };

    this.metrics.push(metric);
    
    // 在开发环境中记录到控制台
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 ${name}: ${value.toFixed(2)}ms (${metric.rating})`);
    }

    // 发送到分析服务 (生产环境)
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics(metric);
    }
  }

  // 发送数据到分析服务
  private sendToAnalytics(metric: PerformanceMetric) {
    // 这里可以集成 Google Analytics, Vercel Analytics 等
    if ('gtag' in window) {
      // @ts-ignore
      window.gtag('event', 'web_vitals', {
        event_category: 'performance',
        event_label: metric.name,
        value: Math.round(metric.value),
        custom_map: { rating: metric.rating }
      });
    }
  }

  // 获取所有指标
  public getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  // 获取特定指标
  public getMetric(name: string): PerformanceMetric | undefined {
    return this.metrics.find(m => m.name === name);
  }

  // 清理观察器
  public cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.metrics = [];
  }

  // 获取性能报告
  public getPerformanceReport() {
    const report = {
      timestamp: Date.now(),
      metrics: this.getMetrics(),
      summary: {
        good: this.metrics.filter(m => m.rating === 'good').length,
        needsImprovement: this.metrics.filter(m => m.rating === 'needs-improvement').length,
        poor: this.metrics.filter(m => m.rating === 'poor').length
      }
    };

    return report;
  }
}

// 单例实例
const performanceMonitor = new PerformanceMonitor();

// 导出 hook 用于 React 组件
export function usePerformanceMonitor() {
  return {
    getMetrics: () => performanceMonitor.getMetrics(),
    getMetric: (name: string) => performanceMonitor.getMetric(name),
    getReport: () => performanceMonitor.getPerformanceReport()
  };
}

// 性能优化工具函数
export const performanceUtils = {
  // 图片延迟加载
  lazyLoadImage: (src: string, placeholder?: string) => {
    if (typeof window === 'undefined') return src;
    
    if ('IntersectionObserver' in window) {
      return placeholder || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmNWY1ZjUiLz48L3N2Zz4=';
    }
    
    return src;
  },

  // 预加载关键资源
  preloadResource: (href: string, as: string) => {
    if (typeof document !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      document.head.appendChild(link);
    }
  },

  // 预连接到外部域
  preconnect: (href: string) => {
    if (typeof document !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = href;
      document.head.appendChild(link);
    }
  },

  // 防抖函数
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout | null = null;
    
    return (...args: Parameters<T>) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  // 节流函数
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle = false;
    
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

export default performanceMonitor;