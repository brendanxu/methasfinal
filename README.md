# Methas Website

专业的甲烷减排技术与碳信用管理解决方案官网。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS 3.x
- **动效**: Framer Motion 11.x
- **多语言**: next-intl
- **CMS**: Sanity (待集成)
- **部署**: Vercel

## 设计系统

基于文档 `/docs/ui-spec.md` 的设计规范：
- **配色**: 高对比黑白 + 单一主绿色
- **圆角**: 24px 主圆角
- **动效**: Snappy 性格 (200/300ms)
- **容器**: 1200px 最大宽度
- **网格**: 24px 间距

## 开发环境搭建

1. **安装依赖**:
```bash
npm install
```

2. **环境配置**:
```bash
cp .env.local.example .env.local
# 编辑 .env.local 文件，配置必要的环境变量
```

3. **启动开发服务器**:
```bash
npm run dev
```

4. **访问应用**:
打开 [http://localhost:3000](http://localhost:3000)

## 脚本命令

```bash
npm run dev          # 开发环境
npm run build        # 生产构建
npm run start        # 生产环境运行
npm run lint         # 代码检查
npm run type-check   # 类型检查
npm run format       # 代码格式化
npm run analyze      # Bundle分析
```

## 项目结构

```
src/
├── app/                 # Next.js 14 App Router
│   ├── globals.css      # 全局样式和设计系统
│   ├── layout.tsx       # 根布局
│   └── [locale]/        # 多语言路由
├── components/          # React组件
│   ├── ui/             # 基础UI组件
│   ├── layout/         # 布局组件
│   └── sections/       # 页面区块组件
├── lib/                # 工具函数
├── styles/             # 样式文件
└── types/              # TypeScript类型定义

messages/               # 多语言文件
public/                 # 静态资源
docs/                   # 项目文档
```

## 核心功能

### 已实现
- ✅ Next.js 14 App Router 基础架构
- ✅ 多语言支持 (中文/英文)
- ✅ 响应式设计系统
- ✅ Framer Motion 动效系统
- ✅ 基础组件库 (Button, Card, Navigation)
- ✅ 首页核心区块 (Hero, Products, Stats, Contact)

### 待实现
- ⏳ Solutions 页面 (Sticky-Step 交互)
- ⏳ About 页面
- ⏳ Sanity CMS 集成
- ⏳ SEO 优化
- ⏳ 性能优化

## 设计特色

### Sticky-Step 交互
基于 addx.co 的设计灵感，Solutions 页面将采用左侧固定媒体 + 右侧4段滚动的交互模式:
- **IO 阈值**: 0.5 (50% 进入视口触发)
- **切换动效**: 300-450ms 过渡
- **移动端降级**: 堆叠布局

### Snappy 动效性格
- **快速响应**: 200ms hover 效果
- **标准过渡**: 300ms 页面切换
- **弹性动效**: spring 缓动用于 CTA 按钮
- **减少动效支持**: 遵循 WCAG 无障碍标准

## 性能目标

基于 `/docs/ADR-001-tech-choice.md` 的性能指标:
- **LCP**: ≤ 2.5s (移动端), ≤ 1.5s (桌面端)
- **CLS**: ≤ 0.1
- **FID**: ≤ 100ms
- **首屏 JS**: ≤ 180KB (gzipped)

## 部署

项目配置为 Vercel 部署，支持：
- 自动构建和部署
- Preview 部署
- 边缘函数优化
- 图片自动优化

## 文档参考

项目文档位于 `/docs` 目录：
- `design-tokens.md` - 设计系统令牌
- `ui-spec.md` - UI规范一览
- `motion-language.md` - 动效语言系统
- `bug-prevention.md` - Bug预防手册
- `test-release-checklist.md` - 测试发布清单

## 贡献

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

© 2024 Methas. 保留所有权利。