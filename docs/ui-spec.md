# UI 规范一览表
> 版本：v1.0 | 日期：2025-01-12 | 负责人：许辉

## 🎨 视觉风格指南

### 高对比黑白设计理念
```
设计哲学：southpole.com 的高对比专业感
色彩策略：纯黑 + 纯白 + 单一主绿色
对比标准：≥4.5:1 (WCAG AA级别)
品牌调性：专业、可信、现代、简洁
```

### 色彩规范表
| 用途 | Token名称 | 色值 | 应用场景 |
|------|-----------|------|----------|
| **主背景** | --color-white | #ffffff | 页面背景、卡片背景 |
| **主文字** | --color-black | #000000 | 标题、正文、导航 |
| **主品牌** | --color-primary | 矿业绿 | CTA按钮、链接、强调 |
| **灰度系** | --color-gray-50~900 | 9级灰度 | 边框、次要文字、背景 |

### 字体规范
```css
/* 字体栈：无衬线现代感 */
font-family: 
  "Inter", 
  -apple-system, 
  BlinkMacSystemFont, 
  "Segoe UI", 
  Roboto, 
  "PingFang SC", 
  "Microsoft YaHei", 
  sans-serif;

/* 字号标准 */
--text-xs: 0.75rem;    /* 12px - 辅助信息 */
--text-sm: 0.875rem;   /* 14px - 说明文字 */
--text-base: 1rem;     /* 16px - 正文 ⭐ */
--text-lg: 1.125rem;   /* 18px - 重要文字 */
--text-xl: 1.25rem;    /* 20px - 小标题 */
--text-2xl: 1.5rem;    /* 24px - 标题 */
--text-3xl: 1.875rem;  /* 30px - 大标题 */
--text-4xl: 2.25rem;   /* 36px - Hero标题 */
```

### 圆角规范
| 用途 | Token | 尺寸 | 应用 |
|------|-------|------|------|
| **小圆角** | --radius-sm | 0.25rem (4px) | 标签、徽章 |
| **标准圆角** | --radius-md | 0.5rem (8px) | 输入框、小按钮 |
| **大圆角** | --radius-lg | 1rem (16px) | 大按钮、小卡片 |
| **主圆角** | --radius-xl | 1.5rem (24px) | 主要卡片、容器 ⭐ |
| **特大圆角** | --radius-2xl | 2rem (32px) | Hero区块、特殊容器 |

## 🏗️ 布局系统

### 容器规范
```css
/* 容器宽度：基于1200-1280px设计 */
.container {
  max-width: 1200px;        /* 主要容器 ⭐ */
  margin: 0 auto;
  padding: 0 1.5rem;        /* 24px 左右内边距 */
}

.container-xl {
  max-width: 1280px;        /* 宽屏优化容器 */
}

.container-wide {
  max-width: 1440px;        /* 超宽容器（特殊用途） */
}
```

### 网格系统
| 断点 | 容器宽度 | 列数 | 间距 | 边距 |
|------|----------|------|------|------|
| **移动端** | 100% | 4列 | 16px | 16px |
| **平板端** | 768px | 8列 | 20px | 20px |
| **桌面端** | 1200px | 12列 | 24px | 24px |
| **大屏** | 1280px | 12列 | 24px | 24px |

### 间距系统 (基于8px网格)
```css
/* 间距Token：8px基础系统 */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px ⭐ 基础单位 */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px ⭐ 主要间距 */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

## 🧩 组件规范

### 按钮组件
| 类型 | 样式 | 尺寸 | 圆角 | 用途 |
|------|------|------|------|------|
| **主按钮** | 黑底白字 | 48px高 | 24px | 主要CTA |
| **次按钮** | 白底黑字+边框 | 44px高 | 24px | 次要操作 |
| **文字按钮** | 纯文字+下划线 | auto | 无 | 链接操作 |
| **图标按钮** | 方形 | 40px | 20px | 功能操作 |

```css
/* 按钮样式规范 */
.btn-primary {
  background: var(--color-black);
  color: var(--color-white);
  border: 2px solid var(--color-black);
  border-radius: var(--radius-xl);      /* 24px ⭐ */
  padding: 12px 32px;
  font-weight: 600;
  transition: all 200ms ease-out;
}

.btn-primary:hover {
  background: var(--color-primary);
  border-color: var(--color-primary);
  transform: translateY(-1px);
}
```

### 卡片组件
```css
/* 标准卡片样式 */
.card {
  background: var(--color-white);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-xl);      /* 24px 主圆角 ⭐ */
  padding: var(--space-6);              /* 24px 内边距 ⭐ */
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.06);
  transition: all 300ms ease-out;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 10px 25px rgba(0, 0, 0, 0.1),
    0 4px 6px rgba(0, 0, 0, 0.05);
}
```

### 表单组件
```css
/* 输入框规范 */
.input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--color-gray-300);
  border-radius: var(--radius-md);      /* 8px 标准圆角 */
  font-size: var(--text-base);
  transition: all 200ms ease-out;
}

.input:focus {
  outline: none;
  border-color: var(--color-black);
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
}
```

## 🎬 动效规范

### 动效性格：Snappy 专业感
```css
/* 核心动效Token */
--duration-fast: 200ms;      /* 快速反馈 ⭐ */
--duration-normal: 300ms;    /* 标准过渡 ⭐ */
--duration-slow: 450ms;      /* 复杂动画 */

/* 缓动函数 */
--ease-out: cubic-bezier(0, 0, 0.2, 1);           /* 专业感 ⭐ */
--ease-spring: cubic-bezier(0.68, -0.6, 0.32, 1.6); /* 轻微弹性 */
--ease-bounce: cubic-bezier(0.175, 0.885, 0.32, 1.275); /* 反弹效果 */
```

### 交互动效规范
| 交互类型 | 时长 | 缓动 | 效果 |
|----------|------|------|------|
| **按钮hover** | 200ms | ease-out | 颜色+位移 |
| **卡片hover** | 300ms | ease-out | 阴影+位移 |
| **页面转场** | 450ms | ease-out | 淡入+滑动 |
| **模态框** | 300ms | ease-spring | 缩放+淡入 |
| **加载状态** | 200ms | ease-out | 透明度变化 |

### Sticky-Step 交互规范
```css
/* Sticky-Step配置：基于addx.co优化 */
.sticky-step {
  /* 容器布局 */
  display: grid;
  grid-template-columns: 1fr 1fr;    /* 桌面端1:1分割 */
  gap: var(--space-12);              /* 48px间距 */
  
  /* 固定区域 */
  .sticky-content {
    position: sticky;
    top: 120px;                      /* 导航高度+间距 */
    height: fit-content;
  }
  
  /* 滚动区域 */
  .scroll-sections {
    .section {
      min-height: 60vh;              /* 确保足够滚动距离 */
      padding: var(--space-8) 0;     /* 垂直间距 */
    }
  }
}

/* 移动端降级 */
@media (max-width: 1024px) {
  .sticky-step {
    grid-template-columns: 1fr;      /* 单列堆叠 */
    gap: var(--space-6);
    
    .sticky-content {
      position: static;              /* 取消固定定位 */
    }
  }
}
```

### 滚动优化配置
```javascript
// Intersection Observer 配置
const observerConfig = {
  threshold: 0.5,                    /* 50%进入视口触发 ⭐ */
  rootMargin: "-20% 0px -20% 0px"    /* 视口中央区域 */
};

// 性能优化
const scrollOptimization = {
  throttle: 16,                      /* 60fps节流 */
  debounce: 100,                     /* 防抖动 */
  usePassive: true                   /* 被动监听 */
};
```

## 📱 响应式规范

### 断点定义
```css
/* 响应式断点 */
--breakpoint-sm: 640px;    /* 大手机 */
--breakpoint-md: 768px;    /* 平板 */
--breakpoint-lg: 1024px;   /* 小桌面 */
--breakpoint-xl: 1280px;   /* 大桌面 */
--breakpoint-2xl: 1536px;  /* 超大屏 */
```

### 响应式组件行为
| 组件 | 移动端 | 平板端 | 桌面端 |
|------|--------|--------|--------|
| **导航** | 汉堡菜单 | 简化导航 | 完整导航 |
| **Hero** | 单列居中 | 单列宽松 | 左右分栏 |
| **产品卡片** | 1列 | 2列 | 3-4列 |
| **Sticky-Step** | 堆叠布局 | 堆叠布局 | 并排固定 |
| **表单** | 全宽 | 居中限宽 | 分栏布局 |

## ♿ 无障碍规范

### WCAG 2.1 AA 合规标准
```css
/* 对比度要求 */
--contrast-ratio-normal: 4.5;     /* 普通文字 ⭐ */
--contrast-ratio-large: 3.0;      /* 大字体(≥18px) */
--contrast-ratio-ui: 3.0;         /* UI组件 */

/* 焦点状态 */
:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* 减少动效支持 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 语义化标记要求
```html
<!-- 页面结构 -->
<main role="main" aria-label="主要内容">
  <section aria-labelledby="hero-title">
    <h1 id="hero-title">页面标题</h1>
  </section>
</main>

<!-- 交互组件 -->
<button 
  type="button"
  aria-describedby="help-text"
  aria-expanded="false"
>
  操作按钮
</button>
<div id="help-text" role="tooltip">
  帮助说明
</div>
```

## 🔧 实施指南

### CSS架构建议
```
styles/
├── globals.css          # 全局样式和Token定义
├── components/          # 组件样式
│   ├── Button.module.css
│   ├── Card.module.css
│   └── StickyStep.module.css
├── layouts/             # 布局样式
│   ├── Container.module.css
│   └── Grid.module.css
└── utilities/           # 工具类样式
    ├── spacing.css
    ├── typography.css
    └── responsive.css
```

### 组件开发规范
1. **TypeScript优先**：所有组件使用TypeScript
2. **CSS Modules**：样式封装，避免全局污染
3. **设计Token**：统一使用CSS自定义属性
4. **响应式优先**：移动端优先设计
5. **无障碍内置**：默认支持无障碍访问

### 质量检查清单
- [ ] **色彩对比度**：所有文字≥4.5:1对比度
- [ ] **圆角一致性**：主要容器使用24px圆角
- [ ] **间距规范**：使用8px网格间距系统
- [ ] **动效时长**：快速反馈200ms，标准过渡300ms
- [ ] **响应式测试**：3个主要断点正常显示
- [ ] **焦点状态**：所有交互元素清晰焦点
- [ ] **语义化**：正确使用HTML语义标签
- [ ] **Sticky-Step**：桌面固定，移动堆叠

---

## 📋 快速参考卡片

### 设计Token速查
```css
/* 最重要的设计决策 */
:root {
  /* 高对比配色 */
  --color-white: #ffffff;
  --color-black: #000000;
  
  /* 主要圆角 */
  --radius-xl: 1.5rem;        /* 24px ⭐ */
  
  /* 容器宽度 */
  --container-xl: 1200px;     /* ⭐ */
  
  /* 网格间距 */
  --grid-gap: 1.5rem;         /* 24px ⭐ */
  
  /* 动效时长 */
  --duration-fast: 200ms;     /* ⭐ */
  --duration-normal: 300ms;   /* ⭐ */
}
```

### 核心组件尺寸
| 组件 | 高度 | 圆角 | 内边距 |
|------|------|------|--------|
| **主按钮** | 48px | 24px | 12px 32px |
| **输入框** | 44px | 8px | 12px 16px |
| **卡片** | auto | 24px | 24px |
| **导航** | 80px | 无 | 20px 24px |

---

**UI规范制定完成**：基于southpole.com高对比风格和addx.co现代交互，为Methas.cn提供完整的UI/UX实施指南。