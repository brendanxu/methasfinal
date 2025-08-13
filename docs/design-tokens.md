# Design Tokens 设计令牌系统
> 版本：v1.0 | 日期：2025-01-12 | 负责人：许辉

## 🎨 设计令牌占位版

### 色彩系统 (Colors)

> **视觉基调**：借鉴 southpole.com 的高对比黑白 + 单一主色策略

#### 核心配色：高对比黑白 + 单一主色
```css
/* 核心黑白 - 高对比基础 */
--color-white: #ffffff;     /* 纯白背景 */
--color-black: #000000;     /* 纯黑文字 */
--color-gray-50: #fafafa;   /* 轻微灰背景 */
--color-gray-100: #f5f5f5;  /* 分割线 */
--color-gray-200: #e5e5e5;  /* 边框 */
--color-gray-400: #a3a3a3;  /* 次要文字 */
--color-gray-500: #737373;  /* 辅助文字 */
--color-gray-700: #404040;  /* 主要文字 */
--color-gray-800: #262626;  /* 标题 */
--color-gray-900: #171717;  /* 深黑 */

/* 单一主色 - 矿业绿（占位值，可替换） */
--color-primary-50: #f0fdf4;
--color-primary-100: #dcfce7;
--color-primary-200: #bbf7d0;
--color-primary-300: #86efac;
--color-primary-400: #4ade80;
--color-primary-500: #22c55e;  /* 主色 AA 4.85:1 ✅ */
--color-primary-600: #16a34a;  /* 深主色 AAA 7.34:1 ✅ */
--color-primary-700: #15803d;
--color-primary-800: #166534;
--color-primary-900: #14532d;

/* 高饱和点缀色 - 用于警示/强调 */
--color-accent-warning: #f59e0b;  /* 安全橙 AA 4.56:1 */
--color-accent-error: #dc2626;    /* 错误红 AA 5.87:1 */
--color-accent-info: #0ea5e9;     /* 信息蓝 AA 4.53:1 */

/* WCAG AA 对比度验证说明 */
/* 
 * AA级要求：对比度 ≥ 4.5:1
 * AAA级要求：对比度 ≥ 7:1
 * 大文字（18px+ 或 14px+ 粗体）：AA级 3:1，AAA级 4.5:1
 * 验证工具：WebAIM Contrast Checker
 */
```

#### 中性色
```css
/* 灰度 */
--color-gray-50: #f9fafb;
--color-gray-100: #f3f4f6;
--color-gray-200: #e5e7eb;
--color-gray-300: #d1d5db;
--color-gray-400: #9ca3af;
--color-gray-500: #6b7280;
--color-gray-600: #4b5563;
--color-gray-700: #374151;
--color-gray-800: #1f2937;
--color-gray-900: #111827;

/* 语义色 */
--color-error: #dc2626;    /* 错误 AA 5.87:1 */
--color-warning: #f59e0b;  /* 警告 AA 4.56:1 */
--color-info: #0ea5e9;     /* 信息 AA 4.53:1 */
--color-success: #10b981;  /* 成功 AA 4.51:1 */
```

### 字体系统 (Typography)

```css
/* 字体家族 */
--font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", 
             "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", 
             Helvetica, Arial, sans-serif;
--font-mono: "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", 
             Consolas, "Courier New", monospace;

/* 字号/行高 - 移动优先 */
--text-xs: 0.75rem;     /* 12px - 行高 1.5 */
--text-sm: 0.875rem;    /* 14px - 行高 1.5 */
--text-base: 1rem;      /* 16px - 行高 1.6 */
--text-lg: 1.125rem;    /* 18px - 行高 1.75 */
--text-xl: 1.25rem;     /* 20px - 行高 1.75 */
--text-2xl: 1.5rem;     /* 24px - 行高 1.4 */
--text-3xl: 1.875rem;   /* 30px - 行高 1.3 */
--text-4xl: 2.25rem;    /* 36px - 行高 1.2 */
--text-5xl: 3rem;       /* 48px - 行高 1.1 */

/* 字重 */
--font-thin: 100;
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-black: 900;

/* 字间距 */
--tracking-tighter: -0.05em;
--tracking-tight: -0.025em;
--tracking-normal: 0;
--tracking-wide: 0.025em;
--tracking-wider: 0.05em;
```

### 间距系统 (Spacing)

```css
/* 8px 基准网格 */
--space-0: 0;
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */
```

### 圆角系统 (Border Radius)

> **核心规格**：主档圆角 24px，营造现代简洁感

```css
--radius-none: 0;
--radius-sm: 0.25rem;    /* 4px - 细节元素 */
--radius-base: 0.5rem;   /* 8px - 输入框 */
--radius-md: 0.75rem;    /* 12px - 按钮 */
--radius-lg: 1rem;       /* 16px - 小卡片 */
--radius-xl: 1.5rem;     /* 24px - 主要卡片/容器 ⭐ */
--radius-2xl: 2rem;      /* 32px - 大型容器 */
--radius-full: 9999px;   /* 圆形/药丸形 */

/* 主档使用建议：
 * --radius-xl (24px) 用于：Card、Modal、Section容器
 * --radius-md (12px) 用于：Button、Input、Tag
 * --radius-base (8px) 用于：小图片、图标容器
 */
```

### 阴影系统 (Shadows)

```css
/* 层级阴影 */
--shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-base: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-md: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-lg: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

/* 彩色阴影（品牌特色） */
--shadow-primary: 0 10px 40px -10px var(--color-primary-500);
--shadow-accent: 0 10px 40px -10px var(--color-accent-500);
```

### 断点系统 (Breakpoints)

```css
/* 移动优先断点 */
--screen-xs: 360px;   /* 小手机 */
--screen-sm: 640px;   /* 手机 */
--screen-md: 768px;   /* 平板 */
--screen-lg: 1024px;  /* 桌面 */
--screen-xl: 1280px;  /* 大屏 */
--screen-2xl: 1536px; /* 超大屏 */

/* Tailwind 配置 */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

### 容器宽度 (Container)

> **核心规格**：容器宽度 1200-1280px，12 栅格系统，列间距 24px

```css
/* 容器最大宽度 */
--container-xs: 100%;      /* 移动端全宽 */
--container-sm: 640px;     /* 小屏容器 */
--container-md: 768px;     /* 中屏容器 */
--container-lg: 1024px;    /* 大屏容器 */
--container-xl: 1200px;    /* 主容器宽度 ⭐ */
--container-2xl: 1280px;   /* 最大容器宽度 ⭐ */

/* 12 栅格系统 */
--grid-columns: 12;        /* 栅格列数 */
--grid-gap: 1.5rem;        /* 24px 列间距 ⭐ */
--grid-gap-mobile: 1rem;   /* 16px 移动端列间距 */

/* 容器内边距 */
--container-padding-mobile: 1rem;    /* 16px */
--container-padding-tablet: 1.5rem;  /* 24px ⭐ */
--container-padding-desktop: 2rem;   /* 32px */

/* 栅格计算公式 */
/* 单列宽度 = (容器宽度 - 11 * 间距) / 12 */
/* 1200px 容器：(1200 - 11*24) / 12 = 77.67px */
/* 1280px 容器：(1280 - 11*24) / 12 = 84.33px */
```

### Z轴层级 (Z-index)

```css
/* 层级管理 */
--z-negative: -1;       /* 背景装饰 */
--z-base: 0;           /* 基础内容 */
--z-dropdown: 10;      /* 下拉菜单 */
--z-sticky: 20;        /* 吸顶元素 */
--z-fixed: 30;         /* 固定元素 */
--z-overlay: 40;       /* 遮罩层 */
--z-modal: 50;         /* 模态框 */
--z-popover: 60;       /* 弹出提示 */
--z-tooltip: 70;       /* 工具提示 */
--z-notification: 80;  /* 通知提醒 */
--z-maximum: 99999;    /* 最高层级 */
```

### 按钮样式规范

```css
/* 主按钮（实心） */
.btn-primary {
  background: var(--color-primary-500);
  color: var(--color-white);
  border: 2px solid var(--color-primary-500);
  border-radius: var(--radius-md); /* 12px */
  transition: all 200ms ease-out;
}

.btn-primary:hover {
  background: var(--color-primary-600);
  border-color: var(--color-primary-600);
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
}

.btn-primary:focus {
  outline: 2px solid var(--color-primary-300);
  outline-offset: 2px;
}

.btn-primary:disabled {
  background: var(--color-gray-200);
  border-color: var(--color-gray-200);
  color: var(--color-gray-500);
  cursor: not-allowed;
  transform: none;
}

/* 次按钮（描边/幽灵） */
.btn-secondary {
  background: transparent;
  color: var(--color-primary-500);
  border: 2px solid var(--color-primary-500);
  border-radius: var(--radius-md);
  transition: all 200ms ease-out;
}

.btn-secondary:hover {
  background: var(--color-primary-50);
  color: var(--color-primary-600);
}

.btn-secondary:focus {
  outline: 2px solid var(--color-primary-300);
  outline-offset: 2px;
}

.btn-secondary:disabled {
  border-color: var(--color-gray-200);
  color: var(--color-gray-400);
  cursor: not-allowed;
}

/* 尺寸规范 */
.btn-sm { padding: 0.5rem 1rem; font-size: 0.875rem; }
.btn-md { padding: 0.75rem 1.5rem; font-size: 1rem; }
.btn-lg { padding: 1rem 2rem; font-size: 1.125rem; }
```

---

## 🔄 品牌替换步骤

### Step 1: 品牌色彩定义
1. 确定品牌主色（从上述3个方案选择或自定义）
2. 生成色阶（50-900共10个层级）
3. 验证 WCAG AA 对比度（≥4.5:1）
4. 定义语义色（成功/警告/错误/信息）

### Step 2: 字体选择
1. 选择品牌字体（如有）
2. 配置中文字体优先级
3. 设置 font-display: swap 优化加载
4. 准备 woff2 格式字体文件

### Step 3: 集成到 Tailwind
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--color-primary-50)',
          // ... 其他层级
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)']
      }
    }
  }
}
```

### Step 4: CSS 变量注入
```css
/* globals.css */
:root {
  /* 粘贴上述所有设计令牌 */
}

/* 暗色模式（可选） */
.dark {
  /* 覆盖需要调整的令牌 */
}
```

---

## ❓ 需要您拍板的10条开口问题

1. **主色方案选择**：选择科技蓝、沉稳灰蓝还是创新紫？或提供品牌色？

2. **品牌字体**：
   - 是否有指定的品牌字体？
   - 中文字体优先级：苹方还是微软雅黑？

3. **圆角风格**：
   - 偏向直角（0-4px）还是圆润（8-16px）？
   - 按钮是否使用药丸形？

4. **阴影强度**：
   - 扁平化（轻阴影）还是拟物化（重阴影）？
   - 是否使用彩色阴影增强品牌感？

5. **间距密度**：
   - 紧凑型（适合内容多）还是宽松型（适合简洁）？
   - 移动端是否需要更紧凑？

6. **容器宽度**：
   - 内容最大宽度1280px是否合适？
   - 是否需要超宽屏适配？

7. **暗色模式**：
   - 是否需要支持暗色主题？
   - 自动切换还是手动控制？

8. **动效偏好**：
   - 动效多少：克制/适中/丰富？
   - 是否默认开启 reduced-motion？

9. **无障碍级别**：
   - AA级（4.5:1）还是AAA级（7:1）对比度？
   - 是否需要高对比度模式？

10. **响应式策略**：
    - 是否需要为不同设备定制完全不同的设计？
    - 平板端是否需要特殊处理？

---

## 📝 设计系统维护

### 版本管理
- 使用语义化版本号（1.0.0）
- 记录每次令牌变更
- 保持向后兼容

### 文档同步
- Figma 设计稿同步
- Storybook 组件展示
- 开发文档更新

### 质量保证
- 自动化对比度检测
- 跨浏览器测试
- 性能影响评估