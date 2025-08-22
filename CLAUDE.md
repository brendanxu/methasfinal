# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Methas is a professional methane emission reduction and carbon credit management solutions website built with Next.js 14, featuring a **complete Southpole.com-inspired design system** with extreme minimalism, high-contrast black & white aesthetics, and sophisticated typography hierarchy.

### 🎨 Design System (完全重新设计)
- **Southpole 极简美学**: 大量留白、纯黑白对比、1440px 容器系统
- **大字号层级**: Hero 标题 64px，标题 48px，确保视觉冲击力
- **无边框卡片**: 纯净的内容展示，极细分割线点缀
- **克制动效**: 200/300ms 时长，ease-out 缓动，微妙而优雅
- **触摸优化**: 44px 最小触摸尺寸，移动端友好的交互体验

## Key Commands

### Development
```bash
npm run dev          # Start development server at localhost:3000
npm run build        # Production build
npm run start        # Start production server
npm run analyze      # Bundle size analysis with visual report
```

### Code Quality
```bash
npm run lint         # Run ESLint checks
npm run type-check   # TypeScript type checking
npm run format       # Format code with Prettier
npm run format:check # Check format without changes
```

**Important**: Always run `npm run lint` and `npm run type-check` before marking any task as complete.

## Architecture & Patterns

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + Southpole 设计系统 (globals.css)
- **Animations**: Framer Motion (11.x) + 优化动画配置 (`motion-config.ts`)
- **i18n**: next-intl for zh/en localization
- **Performance**: 性能监控、代码分割、图片优化
- **Deployment**: Vercel optimized

### Project Structure
- `/src/app/[locale]/` - Internationalized app routes
- `/src/components/ui/` - Southpole UI components (Button, Card, etc.)
- `/src/components/sections/` - Southpole 页面组件 (Hero, About, Solutions)
- `/src/components/layout/` - 导航和页脚组件
- `/src/components/performance/` - 性能优化组件
- `/src/lib/` - 工具函数、动画配置、性能监控
- `/messages/` - 本地化文件 (zh.json, en.json)
- `/docs/` - 设计系统文档和原型

### Southpole Design System (全新实现)

基于 `/docs/southpole-ui-prototype.md` 的完整设计系统：

**核心设计理念**:
- **极简主义**: 大量留白，克制的视觉元素
- **高对比**: 纯黑白为主，极少量的品牌色点缀  
- **大字号系统**: 64px Hero 标题，48px 大标题，优雅的层级
- **1440px 容器**: 更宽的设计容器，40px 内边距
- **120px 区块间距**: 更大的垂直韵律

**核心 CSS 类** (`globals.css`):
- `.southpole-heading-hero` - 64px Hero 标题
- `.southpole-heading-1` - 48px 大标题  
- `.southpole-container` - 1440px 容器系统
- `.southpole-section` - 120px 垂直间距
- `.southpole-card` - 无边框卡片
- `.southpole-divider` - 极细分割线

Motion language (`/docs/motion-language.md`):
- **Snappy personality**: 200ms (fast) / 300ms (normal) timings
- **Primary easing**: ease-out (cubic-bezier(0, 0, 0.2, 1))
- **Spring effects**: For CTA buttons and emphasis

### Component Patterns

All components follow CVA (class-variance-authority) pattern for variant management:
```tsx
// Standard component structure
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const componentVariants = cva(
  'base-classes', // Base styles always applied
  {
    variants: {
      variant: { primary: '...', secondary: '...' },
      size: { sm: '...', md: '...', lg: '...' }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);

// Component props extend VariantProps
interface ComponentProps extends VariantProps<typeof componentVariants> {
  // Additional props
}
```

Key utility functions in `/src/lib/utils.ts`:
- `cn()` - Merges Tailwind classes with conflict resolution
- `formatNumber()` - Locale-aware number formatting
- `debounce()` / `throttle()` - Performance optimization helpers

### Routing & i18n

- Routes defined in `/i18n/routing.ts`
- Locales: 'zh' (default), 'en'
- All routes prefixed with locale (e.g., `/zh/solutions`, `/en/about`)
- Use `useTranslations()` hook for accessing translations

### Path Aliases

TypeScript paths configured in `tsconfig.json`:
- `@/*` → `./src/*`
- `@/components/*` → `./src/components/*`
- `@/lib/*` → `./src/lib/*`
- `@/styles/*` → `./src/styles/*`
- `@/types/*` → `./src/types/*`
- `@/hooks/*` → `./src/hooks/*`
- `@/utils/*` → `./src/utils/*`

### Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_SANITY_*` - Sanity CMS config (when integrated)
- `NEXT_PUBLIC_SITE_URL` - Production URL
- `NODE_ENV` - Environment setting

## Important Implementation Notes

### Recent UI Implementations
The Header component now follows ADDX.co style menu system:
- Dropdown menus with smooth animations
- Hover-triggered with 300ms delay
- Black/white contrast with subtle shadows
- Consistent 24px border radius

### Sticky-Step Interaction Pattern
The Solutions page uses a sophisticated sticky-step pattern (reference: addx.co):
- Left side: Fixed media container
- Right side: 4-step scrolling content
- Intersection Observer threshold: 0.5
- Transition timing: 300-450ms

### Performance Optimizations (全新实现)

### 性能监控系统
- **实时监控**: `/src/lib/performance.ts` 提供 Web Vitals 监控
- **开发调试**: Ctrl+Shift+P 显示性能报告
- **自动上报**: 生产环境集成 Google Analytics 事件跟踪

### 代码分割策略
- **动态导入**: `/src/lib/dynamic-imports.ts` 统一管理懒加载
- **页面级分割**: Solutions、About 页面按需加载
- **组件级分割**: 图表、表单等重型组件延迟加载
- **Framer Motion 优化**: 统一动画配置减少包体积

### 图片优化
- **OptimizedImage 组件**: 自动占位符、错误处理、响应式
- **SouthpoleImage**: 预设黑白滤镜的图片组件
- **ResponsiveImage**: 根据屏幕尺寸自动选择图片

### 性能目标 (基于 CLAUDE.md 要求):
- LCP ≤ 2.5s (移动端), ≤ 1.5s (桌面端)
- CLS ≤ 0.1, FID ≤ 100ms
- 初始 JS 包 ≤ 180KB (gzipped)
- 移动端触摸友好 (44px 最小触摸尺寸)

### Southpole Component 开发清单
1. **设计系统遵循**: 使用 Southpole CSS 类 (`.southpole-*`)
2. **动画配置**: 使用 `/src/lib/motion-config.ts` 统一动画
3. **无障碍标准**: WCAG AA 合规 (4.5:1 对比度最小)
4. **多语言支持**: 支持 zh/en 双语切换
5. **样式合并**: 使用 `cn()` 工具函数
6. **触摸优化**: 44px 最小触摸尺寸，移动端友好
7. **性能考量**: 使用动态导入、图片优化组件
8. **极简美学**: 遵循大量留白、纯黑白对比原则

### Deployment Notes
- Vercel auto-deployment on push to main
- Image optimization enabled via Next.js Image component
- Edge functions for optimal performance
- Default redirect from `/` to `/zh`

## Common Patterns to Follow

1. **State Management**: Use React hooks and context where needed
2. **Data Fetching**: Server components by default, client components only when necessary  
3. **Error Handling**: Implement error boundaries for sections
4. **SEO**: Use metadata API in layout.tsx files
5. **Accessibility**: Semantic HTML, proper ARIA labels, keyboard navigation support

## Architecture Decisions

### Framer Motion Configuration
The project uses Framer Motion 11.x with experimental optimization features. If encountering version conflicts:
- Check `framer-motion` configuration in components
- Ensure proper import of motion components
- Follow the "Snappy" timing system (200ms/300ms)

### Navigation Pattern
The Header uses a sophisticated dropdown system inspired by ADDX.co:
- Menu items defined in `navigationData` with nested structure
- Hover interactions with deliberate delays for better UX
- Consistent visual language across all dropdowns

## Testing Approach

While no test framework is currently set up, when implementing tests:
- Focus on critical user paths
- Test i18n functionality
- Validate responsive breakpoints
- Check animation performance on lower-end devices