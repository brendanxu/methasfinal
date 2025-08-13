# Motion Language 动效语言系统
> 版本：v1.0 | 日期：2025-01-12 | 负责人：许辉

## ⚡ Motion Tokens 动效令牌

### 时长系统 (Duration)

> **性格设定**：Snappy - 以 200/300ms 为常用档，营造快速响应感

```css
/* Snappy 性格时长配置 */
--duration-instant: 100ms;   /* 瞬时反馈：hover、active、focus */
--duration-fast: 200ms;      /* 快速过渡：小元素、微交互 ⭐ */
--duration-normal: 300ms;    /* 标准动效：大部分过渡 ⭐ */
--duration-slow: 450ms;      /* 中缓过渡：大元素、容器切换 */
--duration-slower: 600ms;    /* 慢速进入：hero区、重要入场 */
--duration-slowest: 800ms;   /* 特殊动效：滚动视差、背景 */

/* 场景映射 */
--duration-hover: var(--duration-instant);
--duration-fade: var(--duration-fast);
--duration-slide: var(--duration-normal);
--duration-page: var(--duration-slow);
--duration-hero: var(--duration-slower);
--duration-parallax: var(--duration-slowest);
```

### 缓动函数 (Easing)

> **Snappy 缓动策略**：以 ease-out 为主，营造快速响应 + 稳定结束

```css
/* Snappy 核心缓动 */
--ease-linear: linear;                                    /* 匀速：进度条、循环 */
--ease-out: cubic-bezier(0, 0, 0.2, 1);                /* 主用：元素进入、状态变化 ⭐ */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);           /* 次用：页面切换、大动作 */
--ease-spring-snappy: cubic-bezier(0.68, -0.6, 0.32, 1.6); /* 快弹：CTA按钮、强调动效 ⭐ */

/* Snappy Framer Motion 映射 */
const snappyEasings = {
  linear: [0, 0, 1, 1],
  out: [0, 0, 0.2, 1],           // 主用 ⭐
  inOut: [0.4, 0, 0.2, 1],       // 次用
  springSnappy: [0.68, -0.6, 0.32, 1.6], // 快弹 ⭐
  spring: {
    type: "spring",
    stiffness: 300,              // 高刚性 = 快速
    damping: 25,                 // 低阻尼 = 快估恢复
    mass: 0.8                    // 低质量 = 轻快
  }
};
```

### 层级规则 (Stagger)

```css
/* Snappy 层级延迟 - 加快节奏 */
--stagger-fast: 40ms;     /* 列表项快速展开 ⭐ */
--stagger-normal: 80ms;   /* 卡片组标准展开 ⭐ */
--stagger-slow: 120ms;    /* 大块内容缓慢展开 */

/* 方向性 */
--stagger-top-down: 1;    /* 从上到下 */
--stagger-bottom-up: -1;  /* 从下到上 */
--stagger-center-out: 0;  /* 从中心扩散 */
```

### 滚动阈值 (Scroll Triggers)

```javascript
/* 视口触发点 */
const scrollThresholds = {
  early: 0.1,    // 10% 进入视口即触发
  default: 0.3,  // 30% 标准触发点
  center: 0.5,   // 50% 中心触发
  late: 0.7,     // 70% 延迟触发
  full: 1.0      // 100% 完全进入
};

/* 视差强度 */
const parallaxIntensity = {
  subtle: 0.1,   // 微弱视差
  light: 0.3,    // 轻度视差
  medium: 0.5,   // 中度视差
  strong: 0.8    // 强烈视差
};
```

### Reduced Motion 降级策略

```css
/* 无障碍动效降级 */
@media (prefers-reduced-motion: reduce) {
  * {
    --duration-instant: 0ms !important;
    --duration-fast: 0ms !important;
    --duration-normal: 0ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  /* 保留必要的过渡 */
  .essential-transition {
    transition-duration: 200ms !important;
  }
}
```

---

### Sticky-Step 交互优化

> **核心参数**：左 Sticky 媒体 + 右 4 段滚动，IO 阈值 0.5，切换 300-450ms

```javascript
// Sticky-Step 核心配置
const stickyStepConfig = {
  // Intersection Observer 设置
  observerOptions: {
    threshold: 0.5,                    // 50% 可见时触发 ⭐
    rootMargin: "-20% 0px -20% 0px"    // 减少触发区域，避免抖动
  },
  
  // 切换动效
  transition: {
    duration: 350,                     // 300-450ms 范围 ⭐
    ease: "cubic-bezier(0, 0, 0.2, 1)", // ease-out
    properties: ["opacity", "transform"] // 仅变更这两个属性
  },
  
  // 预加载策略
  preloadStrategy: {
    preloadNext: true,                 // 预加载下一帧 ⭐
    preloadDistance: 1,                // 预加载 1 帧距离
    lazyLoadMedia: true                // 媒体懒加载
  },
  
  // 滚动优化
  scrollOptimization: {
    throttle: 16,                      // 60fps 节流 ⭐
    debounce: 100,                     // 100ms 防抖动 ⭐
    passive: true                      // 被动监听器
  },
  
  // 移动端降级
  responsive: {
    disableStickyBelow: 768,           // 768px 以下禁用 sticky
    fallbackToStacked: true            // 降级为垂直堆叠
  }
};

// 实现示例
const StickyStepOptimized = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isThrottled, setIsThrottled] = useState(false);
  const observerRef = useRef(null);
  
  // 节流处理
  const throttledUpdate = useCallback(
    throttle((index) => {
      setActiveStep(index);
      // 预加载下一帧
      if (index < steps.length - 1) {
        preloadMedia(steps[index + 1].media);
      }
    }, stickyStepConfig.scrollOptimization.throttle),
    [steps]
  );
  
  // 防抖动处理
  const debouncedUpdate = useCallback(
    debounce(() => {
      setIsThrottled(false);
    }, stickyStepConfig.scrollOptimization.debounce),
    []
  );
  
  return (
    <div className="sticky-step-container">
      {/* 左侧 Sticky 媒体 */}
      <div className="sticky-media">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: stickyStepConfig.transition.duration / 1000,
              ease: stickyStepConfig.transition.ease
            }}
          >
            {steps[activeStep].media}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* 右侧 4 段内容 */}
      <div className="scroll-content">
        {steps.map((step, index) => (
          <section
            key={index}
            ref={/* observer setup */}
            className="content-section"
          >
            {step.content}
          </section>
        ))}
      </div>
    </div>
  );
};
```

## 🎬 首页区块动效配方

### 配方1：Hero区 - 渐进式入场

```javascript
// Hero区动效时序
const heroAnimation = {
  // 背景视频/图片 - 第0层
  background: {
    initial: { opacity: 0, scale: 1.1 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: 1.2,  // --duration-slowest
      ease: [0, 0, 0.2, 1]  // ease-out
    }
  },
  
  // 主标题 - 第1层
  headline: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.8,  // --duration-slower
      delay: 0.2,
      ease: [0, 0, 0.2, 1]
    }
  },
  
  // 副标题 - 第2层
  subheadline: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.8,
      delay: 0.4,
      ease: [0, 0, 0.2, 1]
    }
  },
  
  // CTA按钮 - 第3层
  cta: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: 0.5,  // --duration-slow
      delay: 0.6,
      ease: [0.68, -0.55, 0.265, 1.55]  // ease-spring
    }
  },
  
  // 装饰元素 - 第4层
  decoration: {
    initial: { opacity: 0, rotate: -10 },
    animate: { opacity: 1, rotate: 0 },
    transition: {
      duration: 1.2,
      delay: 0.8,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// 时序总结
// 0ms: 背景开始淡入
// 200ms: 主标题开始上升
// 400ms: 副标题开始上升
// 600ms: CTA按钮弹性出现
// 800ms: 装饰元素旋转进入
// 总时长: 2000ms
```

### 配方2：产品卡片组 - 错落展开

```javascript
// 产品卡片组动效
const productCardsAnimation = {
  // 容器整体
  container: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.3 }
  },
  
  // 单个卡片
  card: {
    initial: { opacity: 0, y: 50, scale: 0.95 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, amount: 0.3 },
    transition: {
      duration: 0.5,
      ease: [0, 0, 0.2, 1],
      staggerChildren: 0.1  // 100ms 错落
    }
  },
  
  // 卡片内元素
  cardContent: {
    icon: {
      initial: { scale: 0, rotate: -180 },
      animate: { scale: 1, rotate: 0 },
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: [0.68, -0.55, 0.265, 1.55]
      }
    },
    title: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: {
        duration: 0.3,
        delay: 0.3
      }
    },
    description: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: {
        duration: 0.3,
        delay: 0.4
      }
    }
  },
  
  // hover 交互
  hoverEffect: {
    scale: 1.05,
    boxShadow: "0 20px 40px -10px rgba(0,0,0,0.2)",
    transition: {
      duration: 0.2,  // --duration-fast
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// 时序总结（3卡片）
// 0ms: 容器淡入
// 0ms: 第1张卡片开始
// 100ms: 第2张卡片开始
// 200ms: 第3张卡片开始
// 500ms: 所有卡片就位
// +200ms: 图标旋转进入
// +300ms: 标题滑入
// +400ms: 描述淡入
// 总时长: 900ms
```

### 配方3：数据统计区 - 数字滚动

```javascript
// 数据统计动效
const statsAnimation = {
  // 区块进入
  section: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, amount: 0.5 },
    transition: { duration: 0.5 }
  },
  
  // 数字滚动
  counter: {
    initial: { opacity: 0, scale: 0.5 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, amount: 0.5 },
    transition: {
      duration: 0.5,
      ease: [0, 0, 0.2, 1]
    },
    // 数字动画
    animate: {
      from: 0,
      to: 500,  // 目标数值
      duration: 2000,  // 2秒计数
      ease: "easeOut",
      onUpdate: (value) => {
        // 格式化显示
        return Math.floor(value) + "+";
      }
    }
  },
  
  // 单位标签
  label: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.3,
      delay: 0.5
    }
  },
  
  // 背景装饰
  decoration: {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 0.3 },
    transition: {
      duration: 1.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// 时序总结
// 0ms: 区块淡入
// 0ms: 数字开始缩放进入
// 0ms: 数字开始滚动（2秒）
// 500ms: 单位标签上升
// 0-1500ms: 装饰线条绘制
// 总时长: 2000ms
```

### 配方4：客户Logo墙 - 无限循环

```javascript
// Logo墙自动滚动
const logoWallAnimation = {
  // 容器设置
  container: {
    overflow: "hidden",
    position: "relative",
    width: "100%"
  },
  
  // 滚动轨道
  track: {
    display: "flex",
    animate: {
      x: [0, "-50%"],  // 滚动50%后重置
    },
    transition: {
      x: {
        duration: 30,  // 30秒一个循环
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  },
  
  // 单个Logo
  logo: {
    initial: { opacity: 0.5, scale: 0.8 },
    whileHover: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.2 }
    },
    // 鼠标悬停暂停
    whileHoverContainer: {
      animationPlayState: "paused"
    }
  },
  
  // 渐变遮罩
  gradientMask: {
    background: `
      linear-gradient(
        90deg,
        transparent 0%,
        black 10%,
        black 90%,
        transparent 100%
      )
    `
  }
};

// 时序总结
// 0ms: 开始无限滚动
// hover: 暂停滚动
// 单个logo hover: 200ms 放大高亮
// 循环: 每30秒
```

---

## 🎯 动效设计原则

### 性能优先
1. **GPU加速**：使用 transform 和 opacity
2. **will-change**：关键动画预声明
3. **防抖节流**：滚动事件优化
4. **懒加载**：视口外动画延迟初始化

### 用户体验
1. **有意义**：动效服务于内容理解
2. **可预期**：保持动效逻辑一致性
3. **可中断**：支持用户跳过或快进
4. **响应式**：移动端减少复杂动效

### 品牌表达
1. **专业感**：避免过度花哨
2. **科技感**：适度使用3D和视差
3. **可靠感**：动效稳定不突兀
4. **创新感**：关键区域可有亮点

---

## 🔧 Framer Motion 实现示例

### 基础组件封装

```jsx
// 淡入组件
export const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{
      duration: 0.5,
      delay,
      ease: [0, 0, 0.2, 1]
    }}
  >
    {children}
  </motion.div>
);

// 错落展开容器
export const StaggerContainer = ({ children, stagger = 0.1 }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={{
      visible: {
        transition: {
          staggerChildren: stagger
        }
      }
    }}
  >
    {children}
  </motion.div>
);

// 视差滚动
export const Parallax = ({ children, offset = 50 }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, offset]);
  
  return (
    <motion.div style={{ y }}>
      {children}
    </motion.div>
  );
};
```

---

## ❓ 需要您拍板的10条开口问题

1. **动效密度**：整体动效是克制（20%页面）、适中（50%）还是丰富（80%）？

2. **首屏策略**：
   - Hero区是否需要自动播放视频背景？
   - 还是静态图片 + 轻动效？

3. **滚动触发**：
   - 动效是一次性触发还是可重复？
   - 滚动时机：早触发（10%）还是晚触发（50%）？

4. **加载动画**：
   - 是否需要首次加载动画？
   - 页面切换是否需要过渡？

5. **交互反馈**：
   - 按钮点击：缩放还是波纹效果？
   - 卡片hover：抬升还是边框高亮？

6. **数据展示**：
   - 数字是否需要滚动动画？
   - 图表是否需要绘制动画？

7. **移动端策略**：
   - 移动端保留哪些核心动效？
   - 是否默认关闭视差效果？

8. **性能底线**：
   - 动画是否可以牺牲流畅度换取兼容性？
   - 低端设备是否自动降级？

9. **品牌特色**：
   - 是否需要signature动效（品牌专属）？
   - Logo是否需要动态效果？

10. **无障碍支持**：
    - 是否默认respect用户系统设置？
    - 是否提供动效开关按钮？

---

## 📝 动效清单

### MVP必需动效
- [ ] 页面淡入
- [ ] 导航交互
- [ ] 按钮反馈
- [ ] 表单验证
- [ ] 加载状态

### 增强动效
- [ ] Hero区入场
- [ ] 滚动触发
- [ ] 视差效果
- [ ] 数字滚动
- [ ] 路径动画

### 高级动效
- [ ] 3D变换
- [ ] 鼠标跟随
- [ ] 滚动驱动
- [ ] 手势交互
- [ ] 物理动画