# Methas CMS 设置指南

## 概述

本项目现已集成 Sanity CMS 用于内容管理，支持以下功能：
- Hero 轮播管理（图片/视频）
- 服务板块内容管理
- 统计数据管理
- 碳智观察文章管理
- 多语言支持（中英文）

## 快速开始

### 1. 环境配置

复制 `.env.example` 到 `.env.local` 并填写 Sanity 配置：

```bash
cp .env.example .env.local
```

编辑 `.env.local`：
```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-sanity-write-token
```

### 2. 获取 Sanity 项目信息

如果还没有 Sanity 项目：

```bash
# 安装 Sanity CLI
npm install -g @sanity/cli

# 登录 Sanity
sanity login

# 创建新项目
sanity init --create-project "Methas CMS" --dataset production
```

如果已有项目，在 https://sanity.io/manage 获取项目 ID。

### 3. 启动 CMS

```bash
# 启动 Sanity Studio
npm run studio
```

访问 http://localhost:3333 进入 CMS 管理界面。

## 内容类型说明

### 1. Hero 轮播 (heroSlide)
- **用途**: 首页顶部轮播内容
- **字段**:
  - 标题/副标题（中英双语）
  - 媒体类型（图片/视频）
  - CTA 按钮配置
  - 排序和状态控制

### 2. 服务板块 (serviceSection)
- **用途**: 首页服务介绍的四个步骤
- **字段**:
  - 步骤编号（1-4）
  - 标题/描述（中英双语）
  - 服务图片
  - 特性列表
  - 详细内容（用于服务详情页）

### 3. 统计数据 (statistics)
- **用途**: 首页统计数据展示
- **字段**:
  - 标签（中英双语）
  - 数值（如 85%, 2000+）
  - 描述
  - 图标类型
  - 排序

### 4. 碳智观察文章 (article)
- **用途**: 新闻和观察文章
- **字段**:
  - 标题/副标题/摘要（中英双语）
  - 富文本内容（支持图片）
  - 封面图片
  - 分类标签
  - 发布设置
  - SEO 优化
  - 首页展示控制

## 内容管理流程

### 创建 Hero 轮播
1. 进入 CMS → 首页设置 → Hero 轮播
2. 点击 "Create" 创建新项目
3. 填写中英文标题和副标题
4. 选择媒体类型（图片或视频）
5. 上传对应媒体文件
6. 配置 CTA 按钮
7. 设置排序和启用状态

### 管理服务板块
1. 进入 CMS → 首页设置 → 服务板块
2. 创建 4 个服务步骤（step 1-4）
3. 每个步骤包含：
   - 中英文标题和描述
   - 服务图片
   - 3-6 个特性点
   - 详细内容（Rich Text）

### 发布文章
1. 进入 CMS → 碳智观察 → 创建新文章
2. 填写文章信息：
   - 中英文标题、副标题、摘要
   - 上传封面图片
   - 编写富文本内容
   - 选择分类和标签
   - 设置作者和阅读时间
3. 设置发布选项：
   - 是否发布
   - 是否在首页展示
   - 发布日期
4. 配置 SEO 信息

## API 使用

### 前端集成
```typescript
import { sanityApi } from '@/sanity/sanity.client';

// 获取 Hero 轮播
const heroSlides = await sanityApi.getHeroSlides();

// 获取首页展示文章
const articles = await sanityApi.getFeaturedArticles();

// 获取单篇文章
const article = await sanityApi.getArticleBySlug('article-slug');
```

### 可用 API 方法
- `getHeroSlides()` - Hero 轮播数据
- `getServiceSections()` - 服务板块数据
- `getStatistics()` - 统计数据
- `getFeaturedArticles()` - 首页展示文章（8篇）
- `getAllArticles()` - 所有已发布文章
- `getArticlesByCategory(category)` - 按分类获取文章
- `getArticleBySlug(slug)` - 获取单篇文章
- `searchArticles(query)` - 搜索文章

## 部署说明

### Studio 部署
```bash
# 构建 Studio
npm run studio:build

# 部署 Studio 到 Sanity 云端
npm run studio:deploy
```

### 环境变量配置
确保生产环境配置了正确的环境变量：
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN`（仅写入操作需要）

## 开发命令

```bash
# 启动开发服务器
npm run dev

# 启动 CMS Studio
npm run studio

# 类型检查
npm run type-check

# 构建项目
npm run build
```

## 注意事项

1. **多语言支持**: 所有文本字段都支持中英双语
2. **图片优化**: 使用 Sanity 的图片处理和 CDN
3. **缓存策略**: 生产环境启用 CDN 缓存
4. **SEO 友好**: 文章包含完整的 SEO 元数据
5. **响应式**: 所有图片都支持响应式处理

## 故障排除

### 常见问题
1. **CMS 无法访问**: 检查 `.env.local` 配置
2. **图片不显示**: 确认 Sanity CDN 配置正确
3. **内容不同步**: 检查 API 密钥和数据集名称
4. **构建失败**: 运行 `npm run type-check` 检查类型错误

### 联系支持
如有问题，请查看 Sanity 官方文档或联系开发团队。