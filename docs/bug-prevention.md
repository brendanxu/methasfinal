# Bug 雷达 & 预防手册

> 🎯 **目标**：提前识别并预防常见 Bug，建立自动化质量护栏，确保 Methas.cn 项目稳定可靠。
> 
> 📅 **更新日期**：2025-01-13  
> 👷 **维护者**：质量负责人  
> 🚀 **适用版本**：Next.js 14.x + App Router

## 📖 使用说明

### 风险等级定义
- 🔴 **严重**：影响核心功能，必须立即修复
- 🟡 **中等**：影响用户体验，计划内修复
- 🟢 **轻微**：优化建议，持续改进

### 快速查找索引
- 环境问题 → [第1章](#第1章环境与依赖管理)
- 路由问题 → [第2章](#第2章app-router--组件边界)
- 语言切换 → [第3章](#第3章国际化-i18n)
- 滚动交互 → [第4章](#第4章sticky-step-交互)
- 无障碍 → [第5章](#第5章动效与可访问性)
- 样式问题 → [第6章](#第6章样式系统--tailwind)
- 性能问题 → [第7章](#第7章性能优化--字体管理)
- 安全问题 → [第8章](#第8章表单处理--安全防护)
- CMS 问题 → [第9章](#第9章cms-集成-sanity)
- SEO 问题 → [第10章](#第10章seo-基线配置)
- 部署问题 → [第11章](#第11章构建--部署流程)
- 测试问题 → [第12章](#第12章测试策略--工具链)

---

## 第1章：环境与依赖管理

### 🔍 常见坑
1. **Node 版本不一致** 🔴
   - 开发环境 Node 18，生产环境 Node 16，导致语法不兼容
   - 团队成员版本各异，npm install 结果不同
   
2. **锁文件混乱** 🔴
   - package-lock.json 与 yarn.lock 同时存在
   - 锁文件未提交，CI 环境安装版本飘移
   
3. **包版本飘移** 🟡
   - 使用 `^` 前缀导致 minor 版本自动升级
   - 生产环境包版本与开发不一致

### ⚡ 立即做法
```bash
# 1. 创建 .nvmrc 文件
echo "18.17.0" > .nvmrc

# 2. 使用 npm ci 替代 npm install
npm ci  # 严格按照 lock 文件安装

# 3. 依赖版本策略
{
  "dependencies": {
    "next": "14.0.4",           // 精确版本
    "react": "~18.2.0",         // 补丁版本可升级
    "tailwindcss": "3.3.0"      // 精确版本
  }
}

# 4. 清理并统一包管理器
rm -rf node_modules package-lock.json yarn.lock
npm install  # 重新生成统一的 lock 文件
```

### ✅ 验收点
- [ ] `node -v` 输出与 .nvmrc 一致
- [ ] `npm ci` 在全新环境下成功运行
- [ ] package-lock.json 已提交到 Git
- [ ] 团队成员本地构建结果一致
- [ ] CI/CD 环境构建稳定

### 🤖 自动化护栏
```json
// package.json
{
  "engines": {
    "node": ">=18.17.0",
    "npm": ">=9.0.0"
  },
  "scripts": {
    "preinstall": "node scripts/check-versions.js"
  }
}
```

```javascript
// scripts/check-versions.js
const { engines } = require('../package.json');
const version = process.version;
if (!version.match(engines.node)) {
  console.error(`Node 版本不匹配！需要 ${engines.node}，当前 ${version}`);
  process.exit(1);
}
```

---

## 第2章：App Router & 组件边界

### 🔍 常见坑
1. **Server/Client 组件混用** 🔴
   - 在 Server Component 中使用 useState/useEffect
   - Client Component 导入过大的依赖包
   
2. **'use client' 指令问题** 🔴
   - 忘记添加导致 hooks 报错
   - 过度使用导致 bundle 过大
   
3. **Hydration 错误** 🔴
   - Server 和 Client 渲染结果不一致
   - Date/Random 等动态内容导致不匹配
   
4. **Image 配置问题** 🟡
   - 外部图片域名未配置
   - 图片尺寸未优化
   
5. **Metadata 与 i18n 冲突** 🟡
   - generateMetadata 中 locale 处理不当
   - 动态路由参数丢失

### ⚡ 立即做法
```typescript
// ✅ 正确：最小化 Client 边界
// app/components/interactive-card.tsx
'use client';
import { useState } from 'react';

export function InteractiveCard({ data }) {
  const [expanded, setExpanded] = useState(false);
  // 仅交互逻辑在 Client
  return <div onClick={() => setExpanded(!expanded)}>...</div>;
}

// app/components/card-container.tsx
// 无 'use client' - 这是 Server Component
import { InteractiveCard } from './interactive-card';
import { fetchData } from '@/lib/api';

export async function CardContainer() {
  const data = await fetchData(); // Server 端数据获取
  return <InteractiveCard data={data} />;
}

// next.config.js - 配置外部图片域名
module.exports = {
  images: {
    domains: ['cdn.methas.cn', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },
};

// app/[locale]/layout.tsx - 处理语言重定向
import { redirect } from 'next/navigation';
import { locales } from '@/config/i18n';

export default function LocaleLayout({ params, children }) {
  if (!locales.includes(params.locale)) {
    redirect('/zh'); // 默认重定向到中文
  }
  return children;
}
```

### ✅ 验收点
- [ ] 控制台无 hydration 警告
- [ ] Client Components 标记明确且最小化
- [ ] `/zh` 和 `/en` 路由都能正常访问
- [ ] 图片加载正常，无 403 错误
- [ ] Metadata 在各语言版本正确显示

### 🤖 自动化护栏
```javascript
// .eslintrc.js
module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@next/next/no-img-element': 'error',
  },
};
```

---

## 第3章：国际化 (i18n)

### 🔍 常见坑
1. **Locale 路由段丢失** 🔴
   - 内部链接忘记添加 locale 前缀
   - API 路由与 locale 路由混淆
   
2. **消息键缺失导致崩溃** 🔴
   - 翻译文件不同步
   - 缺少 fallback 处理
   
3. **SEO 标签错误** 🟡
   - hreflang 标签配置错误
   - canonical URL 不一致

### ⚡ 立即做法
```typescript
// app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

const locales = ['zh', 'en'];

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}) {
  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await import(`@/messages/${locale}.json`)
    .then(m => m.default)
    .catch(() => {
      // Fallback 到默认语言
      return import('@/messages/zh.json').then(m => m.default);
    });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

// components/language-switcher.tsx
import { usePathname, useRouter } from 'next/navigation';

export function LanguageSwitcher({ currentLocale }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const switchLocale = (newLocale: string) => {
    // 保持当前路径，只切换语言
    const newPath = pathname.replace(/^\/[^\/]+/, `/${newLocale}`);
    router.push(newPath);
  };
  
  return (
    <select onChange={(e) => switchLocale(e.target.value)} value={currentLocale}>
      <option value="zh">中文</option>
      <option value="en">English</option>
    </select>
  );
}

// 消息文件结构
// messages/zh.json
{
  "common": {
    "nav": {
      "home": "首页",
      "solutions": "解决方案"
    },
    "errors": {
      "404": "页面未找到"
    }
  }
}
```

### ✅ 验收点
- [ ] 语言切换不丢失当前页面路径
- [ ] 所有页面都有正确的 locale 前缀
- [ ] 缺失翻译时显示 fallback 而非报错
- [ ] Google Search Console 无 hreflang 错误
- [ ] 双语 sitemap 正确生成

### 🤖 自动化护栏
```javascript
// scripts/check-translations.js
const fs = require('fs');
const zhMessages = require('../messages/zh.json');
const enMessages = require('../messages/en.json');

function findMissingKeys(obj1, obj2, path = '') {
  const missing = [];
  for (const key in obj1) {
    const newPath = path ? `${path}.${key}` : key;
    if (!(key in obj2)) {
      missing.push(newPath);
    } else if (typeof obj1[key] === 'object') {
      missing.push(...findMissingKeys(obj1[key], obj2[key], newPath));
    }
  }
  return missing;
}

const missingInEn = findMissingKeys(zhMessages, enMessages);
if (missingInEn.length > 0) {
  console.error('英文翻译缺失键：', missingInEn);
  process.exit(1);
}
```

---

## 第4章：Sticky-Step 交互 (Solutions 页)

### 🔍 常见坑
1. **Safari sticky 失效** 🔴
   - 父元素有 transform 或 overflow: hidden
   - z-index 层级问题
   
2. **滚动阈值抖动** 🔴
   - Intersection Observer 阈值设置不当
   - 频繁触发状态更新
   
3. **移动端性能问题** 🟡
   - Sticky 在移动端卡顿
   - 触摸滚动不流畅
   
4. **Reduced Motion 未处理** 🟡
   - 无障碍用户体验差
   - 动画无法关闭

### ⚡ 立即做法
```typescript
// components/sticky-step-scroll.tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export function StickyStepScroll({ steps }) {
  const [activeStep, setActiveStep] = useState(0);
  const observerRefs = useRef([]);
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (isMobile) return; // 移动端禁用 sticky

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const index = observerRefs.current.indexOf(entry.target);
            setActiveStep(index);
          }
        });
      },
      {
        threshold: 0.5, // 50% 可见时触发
        rootMargin: '-20% 0px -20% 0px', // 减少触发区域
      }
    );

    observerRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <div className="relative flex">
      {/* 左侧 Sticky 内容 */}
      <div className={`
        ${isMobile ? 'relative' : 'sticky top-24'}
        w-1/2 h-screen flex items-center
      `}>
        <div className={`
          transition-all
          ${shouldReduceMotion ? '' : 'duration-300 ease-out'}
        `}>
          {steps[activeStep].media}
        </div>
      </div>

      {/* 右侧滚动内容 */}
      <div className="w-1/2 space-y-screen">
        {steps.map((step, index) => (
          <section
            key={index}
            ref={el => observerRefs.current[index] = el}
            className="min-h-screen flex items-center"
            aria-current={activeStep === index ? 'step' : undefined}
          >
            <div className="p-12">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

// 样式规范 - 避免破坏 sticky
/* ❌ 错误：父元素不能有这些属性 */
.parent-container {
  /* transform: translateZ(0); */ /* 会破坏 sticky */
  /* overflow: hidden; */          /* 会破坏 sticky */
  /* filter: blur(0); */           /* 会破坏 sticky */
}

/* ✅ 正确：确保 sticky 容器正常工作 */
.sticky-container {
  position: sticky;
  top: 6rem; /* 留出 header 空间 */
  height: calc(100vh - 6rem);
  z-index: 10; /* 确保层级正确 */
}
```

### ✅ 验收点
- [ ] Safari/Chrome/Firefox 上 sticky 都正常工作
- [ ] 滚动时每个步骤只触发一次
- [ ] 移动端降级为普通滚动
- [ ] prefers-reduced-motion 时动画关闭
- [ ] 无 CLS (Cumulative Layout Shift)

### 🤖 自动化护栏
```javascript
// tests/sticky-step.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Sticky-Step 交互测试', () => {
  test('桌面端 sticky 行为', async ({ page }) => {
    await page.goto('/zh/solutions');
    await page.setViewportSize({ width: 1440, height: 900 });
    
    // 验证初始状态
    const stickyElement = page.locator('[data-sticky-media]');
    await expect(stickyElement).toBeVisible();
    
    // 滚动到第二步
    await page.evaluate(() => window.scrollBy(0, window.innerHeight));
    await page.waitForTimeout(500);
    
    // 验证步骤切换
    const activeStep = page.locator('[aria-current="step"]');
    await expect(activeStep).toHaveText(/第二步/);
  });

  test('移动端降级', async ({ page }) => {
    await page.goto('/zh/solutions');
    await page.setViewportSize({ width: 390, height: 844 });
    
    // 验证 sticky 已禁用
    const stickyElement = page.locator('[data-sticky-media]');
    const position = await stickyElement.evaluate(el => 
      window.getComputedStyle(el).position
    );
    expect(position).not.toBe('sticky');
  });
});
```

---

## 第5章：动效与可访问性

### 🔍 常见坑
1. **动效阻挡交互** 🔴
   - 动画过程中按钮不可点击
   - Loading 状态覆盖整个页面
   
2. **键盘导航失效** 🔴
   - 自定义组件无法 Tab 访问
   - 焦点顺序混乱
   
3. **焦点管理缺失** 🟡
   - Modal 打开后焦点未转移
   - 关闭后焦点丢失
   
4. **屏幕阅读器不友好** 🟡
   - 缺少 ARIA 标签
   - 动态内容未通知

### ⚡ 立即做法
```typescript
// components/accessible-modal.tsx
'use client';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import FocusTrap from 'focus-trap-react';

export function AccessibleModal({ isOpen, onClose, title, children }) {
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      // 保存当前焦点
      previousFocusRef.current = document.activeElement as HTMLElement;
      // 焦点移到关闭按钮
      closeButtonRef.current?.focus();
      // 禁止背景滚动
      document.body.style.overflow = 'hidden';
    } else {
      // 恢复焦点
      previousFocusRef.current?.focus();
      // 恢复滚动
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <FocusTrap>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        {/* 背景遮罩 */}
        <div 
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
          aria-hidden="true"
        />
        
        {/* Modal 内容 */}
        <div className="relative bg-white rounded-lg p-6 max-w-md mx-4">
          <h2 id="modal-title" className="text-xl font-bold mb-4">
            {title}
          </h2>
          
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="absolute top-4 right-4"
            aria-label="关闭对话框"
          >
            <span aria-hidden="true">×</span>
          </button>
          
          {children}
        </div>
      </div>
    </FocusTrap>,
    document.body
  );
}

// components/skip-link.tsx
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="
        sr-only focus:not-sr-only
        focus:absolute focus:top-4 focus:left-4
        bg-blue-600 text-white px-4 py-2 rounded
        focus:z-50
      "
    >
      跳转到主要内容
    </a>
  );
}

// 动画可访问性处理
// components/animated-element.tsx
import { motion, useReducedMotion } from 'framer-motion';

export function AnimatedElement({ children }) {
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
```

### ✅ 验收点
- [ ] Tab 键可遍历所有交互元素
- [ ] 焦点样式清晰可见 (outline 或 ring)
- [ ] Modal 开关焦点正确管理
- [ ] Skip Link 功能正常
- [ ] prefers-reduced-motion 生效
- [ ] 屏幕阅读器可正确朗读内容

### 🤖 自动化护栏
```javascript
// accessibility.config.js
module.exports = {
  rules: [
    { id: 'aria-roles', enabled: true },
    { id: 'button-name', enabled: true },
    { id: 'color-contrast', enabled: true },
    { id: 'duplicate-id', enabled: true },
    { id: 'heading-order', enabled: true },
    { id: 'image-alt', enabled: true },
    { id: 'label', enabled: true },
    { id: 'link-name', enabled: true },
    { id: 'list', enabled: true },
    { id: 'tabindex', enabled: true },
  ],
  // WCAG 2.1 AA 标准
  wcagLevel: 'AA',
  wcagVersion: '2.1',
};

// tests/accessibility.spec.ts
import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('可访问性测试', () => {
  test('首页无障碍检查', async ({ page }) => {
    await page.goto('/zh');
    await injectAxe(page);
    await checkA11y(page, null, {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });
  });
});
```

---

## 第6章：样式系统 & Tailwind

### 🔍 常见坑
1. **动态类名被 Purge** 🔴
   - 运行时拼接的类名在生产环境消失
   - 条件类名未被识别
   
2. **容器宽度不一致** 🟡
   - 自定义容器与 Tailwind container 冲突
   - 断点定义不统一
   
3. **样式优先级冲突** 🟡
   - 组件库样式与 Tailwind 冲突
   - !important 滥用

### ⚡ 立即做法
```typescript
// ❌ 错误：动态拼接会被 Purge
const getButtonClass = (variant: string) => {
  return `bg-${variant}-500 hover:bg-${variant}-600`;
};

// ✅ 正确：使用完整类名映射
const buttonVariants = {
  primary: 'bg-blue-500 hover:bg-blue-600',
  danger: 'bg-red-500 hover:bg-red-600',
  success: 'bg-green-500 hover:bg-green-600',
} as const;

const getButtonClass = (variant: keyof typeof buttonVariants) => {
  return buttonVariants[variant];
};

// tailwind.config.js - 统一容器和断点
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    screens: {
      'sm': '640px',   // 手机横屏
      'md': '768px',   // 平板竖屏
      'lg': '1024px',  // 平板横屏
      'xl': '1280px',  // 桌面
      '2xl': '1536px', // 大屏
    },
    extend: {
      // 自定义设计令牌
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
    },
  },
  // 保护特定类名不被 Purge
  safelist: [
    'bg-blue-500',
    'bg-red-500',
    'bg-green-500',
    { pattern: /^(bg|text|border)-(primary|danger|success)/ },
  ],
};

// components/container.tsx - 统一容器组件
export function Container({ 
  children, 
  className = '' 
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`
      container mx-auto
      px-4 sm:px-6 lg:px-8
      ${className}
    `}>
      {children}
    </div>
  );
}
```

### ✅ 验收点
- [ ] 生产环境构建后所有样式正常显示
- [ ] 容器在各断点宽度一致
- [ ] 无样式闪烁 (FOUC)
- [ ] 关键样式文件大小 < 20KB
- [ ] 无 !important 滥用

### 🤖 自动化护栏
```javascript
// scripts/check-tailwind.js
const postcss = require('postcss');
const fs = require('fs');

// 检查动态类名
function checkDynamicClasses(content) {
  const dynamicPatterns = [
    /className=\{`.*\${.*}.*`\}/g,  // 模板字符串
    /className=.*\+.*\+/g,           // 字符串拼接
    /bg-\${/g,                        // 动态颜色
  ];
  
  const issues = [];
  dynamicPatterns.forEach(pattern => {
    const matches = content.match(pattern);
    if (matches) {
      issues.push(`发现动态类名：${matches[0]}`);
    }
  });
  
  return issues;
}

// 样式快照测试
// tests/styles.spec.ts
test('关键样式快照', async ({ page }) => {
  await page.goto('/zh');
  const criticalCSS = await page.evaluate(() => {
    const styles = document.querySelector('style[data-critical]');
    return styles?.innerHTML;
  });
  expect(criticalCSS).toMatchSnapshot('critical-styles.css');
});
```

---

## 第7章：性能优化 & 字体管理

### 🔍 常见坑
1. **LCP 图片未优化** 🔴
   - 首屏大图未设置 priority
   - 图片格式未优化
   
2. **字体闪烁 (FOIT/FOUT)** 🔴
   - 字体加载策略不当
   - 未使用 next/font
   
3. **Bundle 过大** 🟡
   - 未做代码分割
   - 第三方库全量导入
   
4. **运行时性能问题** 🟡
   - 过多 re-render
   - 大列表未虚拟化

### ⚡ 立即做法
```typescript
// app/layout.tsx - 字体优化
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

// Google 字体 - 英文
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

// 本地字体 - 中文
const notoSansSC = localFont({
  src: [
    {
      path: '../fonts/NotoSansSC-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/NotoSansSC-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-noto-sans-sc',
  preload: true,
});

export default function RootLayout({ children }) {
  return (
    <html className={`${inter.variable} ${notoSansSC.variable}`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}

// components/hero-image.tsx - LCP 优化
import Image from 'next/image';

export function HeroImage() {
  return (
    <Image
      src="/hero-bg.webp"
      alt="Methas 矿山安全技术"
      width={1920}
      height={1080}
      priority // 关键：标记为优先加载
      quality={85}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
      sizes="100vw"
      className="object-cover"
    />
  );
}

// 代码分割示例
// app/components/heavy-component.tsx
import dynamic from 'next/dynamic';

// 动态导入重型组件
const ChartComponent = dynamic(
  () => import('./chart-component'),
  {
    loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
    ssr: false, // 仅客户端渲染
  }
);

// 第三方库按需导入
// ❌ 错误：全量导入
import _ from 'lodash';

// ✅ 正确：按需导入
import debounce from 'lodash/debounce';

// 列表虚拟化
import { FixedSizeList } from 'react-window';

export function VirtualList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].name}
    </div>
  );

  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

### ✅ 验收点
- [ ] LCP ≤ 2.5s (移动端)，≤ 1.5s (桌面端)
- [ ] FID ≤ 100ms
- [ ] CLS ≤ 0.1
- [ ] 首屏 JS Bundle ≤ 180KB
- [ ] 字体加载无闪烁
- [ ] Lighthouse 性能分数 ≥ 90

### 🤖 自动化护栏
```javascript
// lighthouse.config.js
module.exports = {
  ci: {
    collect: {
      url: ['/zh', '/en', '/zh/solutions'],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        throttling: {
          cpuSlowdownMultiplier: 1,
        },
      },
    },
    assert: {
      assertions: {
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'first-contentful-paint': ['error', { maxNumericValue: 1800 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        'interactive': ['error', { maxNumericValue: 3800 }],
      },
    },
  },
};

// package.json
{
  "scripts": {
    "lighthouse": "lhci autorun",
    "bundle-analyze": "ANALYZE=true next build"
  }
}
```

---

## 第8章：表单处理 & 安全防护

### 🔍 常见坑
1. **垃圾提交泛滥** 🔴
   - 无验证码保护
   - 缺少速率限制
   
2. **XSS 注入风险** 🔴
   - 用户输入未转义
   - dangerouslySetInnerHTML 滥用
   
3. **错误处理不当** 🟡
   - 错误信息不友好
   - 敏感信息泄露
   
4. **CSRF 攻击** 🟡
   - 缺少 CSRF Token
   - Cookie 设置不安全

### ⚡ 立即做法
```typescript
// app/api/contact/route.ts - API 安全防护
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';
import { verifyHCaptcha } from '@/lib/hcaptcha';
import DOMPurify from 'isomorphic-dompurify';

// 请求 Schema 验证
const contactSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  company: z.string().min(2).max(100),
  message: z.string().min(10).max(1000),
  captchaToken: z.string(),
});

// 速率限制器
const limiter = rateLimit({
  uniqueTokenPerInterval: 500,
  interval: 60000, // 1 分钟
});

export async function POST(request: NextRequest) {
  try {
    // 1. 速率限制检查
    const identifier = request.ip ?? 'anonymous';
    const { success } = await limiter.check(identifier, 5); // 每分钟最多 5 次
    
    if (!success) {
      return NextResponse.json(
        { error: '请求过于频繁，请稍后再试' },
        { status: 429 }
      );
    }

    // 2. 解析和验证请求体
    const body = await request.json();
    const validationResult = contactSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: '表单数据无效', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    // 3. 验证 hCaptcha
    const captchaValid = await verifyHCaptcha(validationResult.data.captchaToken);
    if (!captchaValid) {
      return NextResponse.json(
        { error: '人机验证失败' },
        { status: 400 }
      );
    }

    // 4. XSS 防护 - 清理输入
    const sanitizedData = {
      name: DOMPurify.sanitize(validationResult.data.name),
      email: DOMPurify.sanitize(validationResult.data.email),
      company: DOMPurify.sanitize(validationResult.data.company),
      message: DOMPurify.sanitize(validationResult.data.message),
    };

    // 5. 处理业务逻辑...
    
    // 6. 安全响应头
    return NextResponse.json(
      { success: true, message: '提交成功' },
      {
        status: 200,
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'X-XSS-Protection': '1; mode=block',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
      }
    );
  } catch (error) {
    // 7. 错误日志（不暴露敏感信息）
    console.error('Contact form error:', {
      time: new Date().toISOString(),
      ip: request.ip,
      // 不记录用户输入的具体内容
    });
    
    return NextResponse.json(
      { error: '服务器错误，请稍后再试' },
      { status: 500 }
    );
  }
}

// components/contact-form.tsx - 前端表单
import { useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

export function ContactForm() {
  const [errors, setErrors] = useState({});
  const [captchaToken, setCaptchaToken] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // 客户端验证
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    // 防止重复提交
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          captchaToken,
        }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        setErrors(error.details || { form: error.error });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* 表单字段 */}
      <input
        type="email"
        name="email"
        required
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        maxLength={100}
      />
      
      {/* hCaptcha */}
      <HCaptcha
        sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY}
        onVerify={setCaptchaToken}
      />
      
      {/* CSRF Token (如果需要) */}
      <input type="hidden" name="csrf" value={csrfToken} />
      
      <button 
        type="submit" 
        disabled={isSubmitting || !captchaToken}
      >
        {isSubmitting ? '提交中...' : '提交'}
      </button>
    </form>
  );
}

// middleware.ts - 全局安全中间件
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // 设置安全响应头
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // CSP 策略
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://hcaptcha.com https://*.hcaptcha.com; frame-src https://hcaptcha.com https://*.hcaptcha.com; style-src 'self' 'unsafe-inline';"
  );
  
  return response;
}
```

### ✅ 验收点
- [ ] 表单提交需通过人机验证
- [ ] 连续提交有速率限制
- [ ] 错误信息友好且安全
- [ ] 无 XSS 注入漏洞
- [ ] 外部链接都有 rel="noopener noreferrer"
- [ ] Cookie 设置 HttpOnly 和 Secure

### 🤖 自动化护栏
```javascript
// security-checklist.md
## 安全检查清单
- [ ] 所有表单都有 CAPTCHA 保护
- [ ] API 路由都有速率限制
- [ ] 用户输入都经过验证和清理
- [ ] 敏感操作有 CSRF 保护
- [ ] 环境变量不包含敏感信息
- [ ] 错误信息不泄露系统信息
- [ ] 日志不记录用户密码等敏感数据
- [ ] 定期更新依赖包版本
- [ ] 使用 npm audit 检查漏洞
```

---

## 第9章：CMS 集成 (Sanity) - 后期启用

### 🔍 常见坑
1. **Dataset/权限混乱** 🔴
   - 开发/生产 dataset 混用
   - API Token 权限过高
   
2. **Slug 重复冲突** 🔴
   - 多语言 slug 管理混乱
   - URL 路径冲突
   
3. **空值导致崩溃** 🟡
   - 字段未做空值处理
   - 图片引用失效
   
4. **预览功能混乱** 🟡
   - 预览模式未正确隔离
   - 草稿内容泄露

### ⚡ 立即做法
```typescript
// lib/sanity.client.ts - 客户端配置
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// 只读客户端（公开数据）
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true, // 生产环境使用 CDN
  perspective: 'published', // 只获取已发布内容
});

// 预览客户端（需要 token）
export const previewClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false, // 预览不使用缓存
  token: process.env.SANITY_API_READ_TOKEN, // 服务端 token
  perspective: 'previewDrafts', // 包含草稿
});

// 图片 URL 构建器
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  if (!source) return '/placeholder.jpg'; // 空值兜底
  return builder.image(source);
}

// lib/sanity.queries.ts - GROQ 查询
import groq from 'groq';

// 空值安全的查询
export const pageQuery = groq`
  *[_type == "page" && slug.current == $slug && locale == $locale][0] {
    _id,
    title,
    "slug": slug.current,
    locale,
    "hero": coalesce(hero, {
      title: "默认标题",
      description: "默认描述"
    }),
    "sections": coalesce(sections[], []),
    "seo": {
      "title": coalesce(seo.title, title),
      "description": coalesce(seo.description, ""),
      "image": coalesce(seo.image, hero.image)
    }
  }
`;

// app/[locale]/[slug]/page.tsx - 页面组件
import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity.client';
import { pageQuery } from '@/lib/sanity.queries';

export async function generateStaticParams() {
  // 预生成所有页面路径
  const pages = await client.fetch(groq`
    *[_type == "page"] {
      "slug": slug.current,
      locale
    }
  `);
  
  return pages.map((page) => ({
    locale: page.locale,
    slug: page.slug,
  }));
}

export default async function Page({ 
  params: { locale, slug } 
}) {
  const page = await client.fetch(pageQuery, { 
    slug, 
    locale 
  });
  
  if (!page) {
    notFound();
  }
  
  // 渲染页面（带空值保护）
  return (
    <div>
      <h1>{page.title || '无标题'}</h1>
      {page.sections?.map((section, index) => (
        <Section key={section._key || index} data={section} />
      ))}
    </div>
  );
}

// sanity/schemas/page.ts - Schema 定义
export default {
  name: 'page',
  type: 'document',
  fields: [
    {
      name: 'slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'locale',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: '中文', value: 'zh' },
          { title: 'English', value: 'en' },
        ],
      },
    },
  ],
  // 防止 slug 重复
  preview: {
    select: {
      title: 'title',
      locale: 'locale',
      slug: 'slug.current',
    },
    prepare({ title, locale, slug }) {
      return {
        title: `${title} (${locale})`,
        subtitle: `/${locale}/${slug}`,
      };
    },
  },
};
```

### ✅ 验收点
- [ ] 本地开发无需 Sanity token 也能启动
- [ ] 空值字段不会导致页面崩溃
- [ ] 预览模式与生产模式正确隔离
- [ ] 多语言内容正确映射
- [ ] 图片 URL 都能正常访问

### 🤖 自动化护栏
```typescript
// scripts/sanity-check.ts
import { client } from '@/lib/sanity.client';

async function checkSanityConnection() {
  try {
    const result = await client.fetch('*[_type == "page"][0...1]');
    console.log('✅ Sanity 连接成功');
    return true;
  } catch (error) {
    console.error('❌ Sanity 连接失败:', error);
    return false;
  }
}

// 空值守卫模板
export function guardedField<T>(
  value: T | null | undefined,
  fallback: T
): T {
  return value ?? fallback;
}

// 使用示例
const title = guardedField(data?.title, '默认标题');
const items = guardedField(data?.items, []);
```

---

## 第10章：SEO 基线配置

### 🔍 常见坑
1. **元数据缺失** 🔴
   - 缺少 title/description
   - Open Graph 标签不全
   
2. **hreflang 错误** 🔴
   - 语言标签格式错误
   - alternate 链接失效
   
3. **Sitemap 问题** 🟡
   - sitemap.xml 404
   - 更新不及时
   
4. **Canonical 混乱** 🟡
   - 重复内容未指定主版本
   - 跨语言 canonical 错误

### ⚡ 立即做法
```typescript
// app/[locale]/layout.tsx - 多语言 SEO
import { Metadata } from 'next';

export async function generateMetadata({ 
  params: { locale } 
}): Promise<Metadata> {
  const messages = await import(`@/messages/${locale}.json`);
  
  return {
    title: {
      template: '%s | Methas 煤田智能',
      default: messages.seo.title,
    },
    description: messages.seo.description,
    keywords: messages.seo.keywords,
    authors: [{ name: 'Methas' }],
    creator: 'Methas',
    publisher: 'Methas',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://methas.cn'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'zh-CN': '/zh',
        'en-US': '/en',
      },
    },
    openGraph: {
      title: messages.seo.title,
      description: messages.seo.description,
      url: `https://methas.cn/${locale}`,
      siteName: 'Methas 煤田智能',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Methas - 矿山安全技术领导者',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.seo.title,
      description: messages.seo.description,
      images: ['/twitter-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      baidu: process.env.NEXT_PUBLIC_BAIDU_SITE_VERIFICATION,
    },
  };
}

// app/sitemap.ts - 动态站点地图
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://methas.cn';
  const locales = ['zh', 'en'];
  
  // 静态页面
  const staticPages = [
    '',           // 首页
    '/solutions', // 解决方案
    '/about',     // 关于我们
    '/insights',  // 碳智观察
  ];
  
  const sitemapEntries: MetadataRoute.Sitemap = [];
  
  // 为每个语言版本生成 URL
  for (const locale of locales) {
    for (const page of staticPages) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 1.0 : 0.8,
        alternates: {
          languages: {
            zh: `${baseUrl}/zh${page}`,
            en: `${baseUrl}/en${page}`,
          },
        },
      });
    }
  }
  
  return sitemapEntries;
}

// app/robots.ts - robots.txt
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/'],
      },
    ],
    sitemap: 'https://methas.cn/sitemap.xml',
    host: 'https://methas.cn',
  };
}

// 结构化数据
// components/structured-data.tsx
export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Methas 煤田智能',
    url: 'https://methas.cn',
    logo: 'https://methas.cn/logo.png',
    description: '矿山安全智能监测技术领导者',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+86-400-xxx-xxxx',
      contactType: 'customer service',
      availableLanguage: ['Chinese', 'English'],
    },
    sameAs: [
      'https://www.linkedin.com/company/methas',
      'https://twitter.com/methas',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
```

### ✅ 验收点
- [ ] 所有页面都有唯一的 title 和 description
- [ ] Open Graph 预览正常显示
- [ ] sitemap.xml 可访问且格式正确
- [ ] robots.txt 正确配置
- [ ] Google Search Console 无错误
- [ ] 结构化数据验证通过

### 🤖 自动化护栏
```javascript
// tests/seo.spec.ts
test.describe('SEO 基线测试', () => {
  test('元数据完整性', async ({ page }) => {
    await page.goto('/zh');
    
    // 检查基础 meta 标签
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(10);
    expect(title.length).toBeLessThan(60);
    
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
    expect(description.length).toBeGreaterThan(50);
    expect(description.length).toBeLessThan(160);
    
    // 检查 Open Graph
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toBeTruthy();
    
    // 检查 hreflang
    const hreflangZh = await page.locator('link[hreflang="zh-CN"]').getAttribute('href');
    expect(hreflangZh).toContain('/zh');
  });
  
  test('sitemap 可访问', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    expect(response?.status()).toBe(200);
    expect(response?.headers()['content-type']).toContain('xml');
  });
});
```

---

## 第11章：构建 & 部署流程

### 🔍 常见坑
1. **环境变量缺失** 🔴
   - Vercel 上忘记配置变量
   - 变量名拼写错误
   
2. **配置不同步** 🔴
   - next.config.js 本地与线上不一致
   - Build 命令差异
   
3. **运行时不匹配** 🟡
   - Edge Runtime vs Node Runtime
   - 区域配置错误
   
4. **预览环境问题** 🟡
   - Preview 与 Production 行为不一致
   - Branch 部署冲突

### ⚡ 立即做法
```bash
# .env.example - 完整的环境变量模板
# 基础配置
NEXT_PUBLIC_SITE_URL=https://methas.cn
NEXT_PUBLIC_API_URL=https://api.methas.cn

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token

# hCaptcha
NEXT_PUBLIC_HCAPTCHA_SITEKEY=your_site_key
HCAPTCHA_SECRET=your_secret_key

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_BAIDU_ANALYTICS=your_baidu_id

# 验证
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code
NEXT_PUBLIC_BAIDU_SITE_VERIFICATION=your_verification_code
```

```javascript
// next.config.js - 统一配置
const config = {
  // 国际化配置
  i18n: {
    locales: ['zh', 'en'],
    defaultLocale: 'zh',
  },
  
  // 图片域名配置
  images: {
    domains: [
      'cdn.methas.cn',
      'cdn.sanity.io',
    ],
    formats: ['image/avif', 'image/webp'],
  },
  
  // 重定向规则
  async redirects() {
    return [
      {
        source: '/',
        destination: '/zh',
        permanent: false,
      },
    ];
  },
  
  // 自定义响应头
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  
  // 环境变量验证
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
  
  // 生产优化
  poweredByHeader: false,
  compress: true,
  
  // TypeScript 和 ESLint
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

// 环境变量验证
if (!process.env.NEXT_PUBLIC_SITE_URL) {
  throw new Error('Missing NEXT_PUBLIC_SITE_URL environment variable');
}

module.exports = config;
```

```json
// vercel.json - Vercel 部署配置
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm ci",
  "regions": ["hkg1"],
  "functions": {
    "app/api/contact/route.ts": {
      "maxDuration": 10
    }
  },
  "crons": [
    {
      "path": "/api/cron/revalidate",
      "schedule": "0 0 * * *"
    }
  ]
}
```

### ✅ 验收点
- [ ] .env.example 包含所有必需变量
- [ ] Vercel 环境变量配置完整
- [ ] Preview 部署正常工作
- [ ] Production 部署无错误
- [ ] 自定义域名配置正确
- [ ] Edge Function 区域设置合理

### 🤖 自动化护栏
```javascript
// scripts/pre-deploy.js
const requiredEnvVars = [
  'NEXT_PUBLIC_SITE_URL',
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
  'NEXT_PUBLIC_HCAPTCHA_SITEKEY',
];

function checkEnvVars() {
  const missing = [];
  for (const varName of requiredEnvVars) {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  }
  
  if (missing.length > 0) {
    console.error('❌ 缺少环境变量:', missing.join(', '));
    process.exit(1);
  }
  
  console.log('✅ 环境变量检查通过');
}

checkEnvVars();

// package.json
{
  "scripts": {
    "predeploy": "node scripts/pre-deploy.js",
    "deploy": "vercel --prod"
  }
}
```

---

## 第12章：测试策略 & 工具链

### 🔍 常见坑
1. **测试覆盖不足** 🔴
   - 关键路径未测试
   - 边界条件遗漏
   
2. **测试环境不一致** 🟡
   - 本地与 CI 环境差异
   - 测试数据不稳定
   
3. **测试执行缓慢** 🟡
   - 没有并行执行
   - 重复的设置步骤

### ⚡ 立即做法
```typescript
// playwright.config.ts - E2E 测试配置
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['junit', { outputFile: 'test-results.xml' }],
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: 'Mobile Chrome',
      use: { 
        ...devices['Pixel 5'],
        viewport: { width: 390, height: 844 },
      },
    },
  ],
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});

// tests/e2e/critical-path.spec.ts
import { test, expect } from '@playwright/test';

test.describe('关键路径测试', () => {
  test('首页到联系表单完整流程', async ({ page }) => {
    // 1. 访问首页
    await page.goto('/zh');
    await expect(page).toHaveTitle(/Methas/);
    
    // 2. 点击解决方案
    await page.click('text=解决方案');
    await expect(page).toHaveURL('/zh/solutions');
    
    // 3. 查看 Sticky-Step
    const stickyElement = page.locator('[data-sticky-content]');
    await expect(stickyElement).toBeVisible();
    
    // 4. 滚动查看内容
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(300);
    
    // 5. 点击联系我们
    await page.click('text=联系我们');
    
    // 6. 填写表单
    await page.fill('input[name="name"]', '测试用户');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="company"]', '测试公司');
    await page.fill('textarea[name="message"]', '这是测试消息');
    
    // 7. 验证提交按钮状态
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeEnabled();
  });
  
  test('语言切换保持路径', async ({ page }) => {
    await page.goto('/zh/solutions');
    
    // 切换到英文
    await page.selectOption('select[data-language-switcher]', 'en');
    
    // 验证 URL 和内容
    await expect(page).toHaveURL('/en/solutions');
    await expect(page.locator('h1')).toContainText('Solutions');
    
    // 切换回中文
    await page.selectOption('select[data-language-switcher]', 'zh');
    await expect(page).toHaveURL('/zh/solutions');
  });
});

// tests/visual-regression.spec.ts
test.describe('视觉回归测试', () => {
  test('首页截图对比', async ({ page }) => {
    await page.goto('/zh');
    await page.waitForLoadState('networkidle');
    
    // 截图对比
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });
  
  test('Sticky-Step 三个状态截图', async ({ page }) => {
    await page.goto('/zh/solutions');
    
    // 状态 1
    await expect(page.locator('[data-sticky-content]'))
      .toHaveScreenshot('sticky-step-1.png');
    
    // 滚动到状态 2
    await page.evaluate(() => window.scrollBy(0, window.innerHeight));
    await page.waitForTimeout(500);
    await expect(page.locator('[data-sticky-content]'))
      .toHaveScreenshot('sticky-step-2.png');
    
    // 滚动到状态 3
    await page.evaluate(() => window.scrollBy(0, window.innerHeight));
    await page.waitForTimeout(500);
    await expect(page.locator('[data-sticky-content]'))
      .toHaveScreenshot('sticky-step-3.png');
  });
});

// package.json - 测试脚本
{
  "scripts": {
    "test": "npm run test:unit && npm run test:e2e",
    "test:unit": "jest",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:visual": "playwright test visual-regression",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "typecheck": "tsc --noEmit",
    "check:all": "npm run lint && npm run typecheck && npm run test"
  }
}
```

### ✅ 验收点
- [ ] E2E 测试覆盖关键用户路径
- [ ] 视觉回归测试建立基线
- [ ] 单元测试覆盖工具函数
- [ ] CI 中所有测试通过
- [ ] 测试报告清晰可读
- [ ] 性能测试基线建立

### 🤖 自动化护栏
```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Type check
        run: npm run typecheck
      
      - name: Unit tests
        run: npm run test:unit
      
      - name: Build
        run: npm run build
      
      - name: E2E tests
        run: npx playwright install --with-deps && npm run test:e2e
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: test-results
          path: |
            playwright-report/
            test-results.xml
```

---

## 📋 附录：实用清单

### 日常开发自检清单 (15项)

```markdown
## 提交代码前自检
- [ ] 1. `npm run typecheck` 无错误
- [ ] 2. `npm run lint` 无错误
- [ ] 3. 新增的类名都是静态的
- [ ] 4. 图片都配置了 alt 属性
- [ ] 5. 新路由都有 locale 前缀
- [ ] 6. 表单都有错误处理
- [ ] 7. API 调用都有 loading 状态
- [ ] 8. 新组件支持键盘导航
- [ ] 9. 动画都检查了 reduced-motion
- [ ] 10. 控制台无 hydration 警告
- [ ] 11. 外部链接都有 rel="noopener"
- [ ] 12. 敏感信息未硬编码
- [ ] 13. 新依赖记录在 package.json
- [ ] 14. 测试覆盖新功能
- [ ] 15. README 更新（如需要）
```

### PR 审查清单 (20项)

```markdown
## PR Review Checklist
### 代码质量
- [ ] 1. 无明显性能问题
- [ ] 2. 无安全漏洞风险
- [ ] 3. 错误处理完善
- [ ] 4. 代码可读性好
- [ ] 5. 遵循项目规范

### 功能完整性
- [ ] 6. 功能符合需求
- [ ] 7. 边界条件已处理
- [ ] 8. 多语言支持完整
- [ ] 9. 响应式适配正确
- [ ] 10. 浏览器兼容性 OK

### 测试覆盖
- [ ] 11. 单元测试通过
- [ ] 12. E2E 测试通过
- [ ] 13. 视觉回归通过
- [ ] 14. Lighthouse 分数达标
- [ ] 15. 无新的 TS 错误

### 文档更新
- [ ] 16. 代码注释充分
- [ ] 17. README 已更新
- [ ] 18. API 文档已更新
- [ ] 19. 依赖说明完整
- [ ] 20. Breaking changes 已标注
```

### 上线前 30 分钟清单 (25项)

```markdown
## 生产部署前最终检查
### 环境准备
- [ ] 1. 所有环境变量已配置
- [ ] 2. Vercel 项目设置正确
- [ ] 3. 域名 DNS 配置完成
- [ ] 4. SSL 证书正常
- [ ] 5. CDN 配置就绪

### 功能验证
- [ ] 6. 关键路径测试通过
- [ ] 7. 表单提交功能正常
- [ ] 8. 支付流程正常（如有）
- [ ] 9. 语言切换正常
- [ ] 10. 搜索功能正常

### 性能检查
- [ ] 11. Lighthouse 分数 ≥ 90
- [ ] 12. 首页加载 < 3s
- [ ] 13. 图片都已优化
- [ ] 14. JS Bundle < 200KB
- [ ] 15. 无内存泄漏

### SEO 检查
- [ ] 16. robots.txt 可访问
- [ ] 17. sitemap.xml 正确
- [ ] 18. Meta 标签完整
- [ ] 19. OG 图片正常
- [ ] 20. 结构化数据有效

### 安全检查
- [ ] 21. HTTPS 强制启用
- [ ] 22. 安全响应头配置
- [ ] 23. API 速率限制启用
- [ ] 24. 敏感数据未暴露
- [ ] 25. 备份计划就绪
```

---

## 🎯 总结

本手册涵盖了 Methas.cn 项目开发过程中的 12 个关键领域，每个章节都提供了：
- **常见问题识别**：基于实践经验的 Bug 模式
- **立即可用的解决方案**：复制粘贴即可使用的代码
- **验收标准**：确保修复有效的检查点
- **自动化保护**：预防问题重现的工具和脚本

**使用建议**：
1. 新功能开发前，查阅相关章节
2. 遇到问题时，按索引快速定位
3. PR 审查时，参考检查清单
4. 定期更新手册，加入新发现的问题

**持续改进**：
- 每个 Sprint 结束后更新手册
- 记录新发现的 Bug 模式
- 优化自动化护栏
- 分享团队最佳实践

---

*最后更新：2025-01-13 | 维护者：质量负责人*