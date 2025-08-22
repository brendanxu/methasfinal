/**
 * Methas - Southpole 动画配置
 * 优化的 Framer Motion 配置，减少包体积，提升性能
 */

// 核心动画变体 - 统一管理
export const motionVariants = {
  // 基础淡入动画
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, ease: [0, 0, 0.2, 1] }
  },

  // 向上滑动淡入
  fadeUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0, 0, 0.2, 1] }
  },

  // 从左滑入
  slideLeft: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: [0, 0, 0.2, 1] }
  },

  // 从右滑入
  slideRight: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: [0, 0, 0.2, 1] }
  },

  // 标题动画 - Southpole 风格
  headline: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0, 0, 0.2, 1] }
  },

  // 延迟动画组
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  },

  // 子元素动画
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0, 0, 0.2, 1] }
  }
} as const;

// 视窗配置 - 性能优化
export const viewportConfig = {
  // 标准视窗配置
  default: {
    once: true,
    amount: 0.3
  },
  
  // 更敏感的触发
  sensitive: {
    once: true,
    amount: 0.1
  },
  
  // 严格的触发条件
  strict: {
    once: true,
    amount: 0.8
  }
} as const;

// 缓动函数常量
export const easing = {
  // Southpole 主要缓动
  primary: [0, 0, 0.2, 1] as const,
  
  // 更弹性的缓动
  bounce: [0.17, 0.55, 0.55, 1] as const,
  
  // 快速缓动
  snappy: [0.25, 0.46, 0.45, 0.94] as const
} as const;

// 持续时间常量
export const duration = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8
} as const;

// 预设动画组合 - 常用场景
export const presets = {
  // 页面进入动画
  pageEnter: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: duration.slow, ease: easing.primary }
  },

  // 卡片悬停动画
  cardHover: {
    whileHover: { y: -2, transition: { duration: duration.normal } },
    whileTap: { scale: 0.98, transition: { duration: duration.fast } }
  },

  // 按钮点击动画
  buttonPress: {
    whileTap: { scale: 0.95, transition: { duration: duration.fast } }
  },

  // 导航菜单动画
  menuSlide: {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: 'auto' },
    exit: { opacity: 0, height: 0 },
    transition: { duration: duration.normal, ease: easing.primary }
  }
} as const;

// 性能优化配置
export const optimizationConfig = {
  // 减少重绘的 will-change 属性
  willChange: {
    transform: { willChange: 'transform' },
    opacity: { willChange: 'opacity' },
    auto: { willChange: 'auto' }
  },

  // GPU 加速
  gpu: {
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden' as const
  }
} as const;