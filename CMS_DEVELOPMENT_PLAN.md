# Methas 后台管理平台开发计划

## 📋 项目概述

基于现有的 Methas 网站，开发一个功能完整的后台内容管理系统 (CMS)，支持网站所有内容的动态管理和更新。

## 🎯 核心需求分析

### 可管理内容模块
1. **Hero 轮播区域** - 支持图片/视频轮播
2. **服务板块** - 图片和内容可更换
3. **统计数据** - 数值和描述可更新
4. **碳智观察** - 文章管理（首页展示最新8篇）
5. **关于我们** - 团队信息、公司介绍
6. **联系方式** - 联系信息管理
7. **网站配置** - 全局设置、SEO、多语言

## 🏗️ 技术架构方案

### 方案一：Headless CMS + 现有前端 (推荐)
**技术栈**:
- **CMS**: Sanity Studio (已集成) + 增强功能
- **前端**: 现有 Next.js 14 项目
- **API**: Sanity API + 自定义 API Routes
- **部署**: Vercel (前端) + Sanity Cloud (CMS)

**优势**: 
- 利用现有 Sanity 基础
- 开发周期短
- 性能优秀
- 成本低

### 方案二：全栈自定义后台
**技术栈**:
- **后端**: Next.js API Routes + Prisma + PostgreSQL
- **前端**: Next.js 14 (网站) + Next.js 14 (管理后台)
- **认证**: NextAuth.js
- **文件存储**: Vercel Blob 或 Cloudinary
- **部署**: Vercel + Vercel Postgres

## 📊 数据模型设计

### 核心内容类型 (Schema)

#### 1. Hero 轮播内容
```typescript
interface HeroSlide {
  id: string
  title: string
  subtitle: string
  mediaType: 'image' | 'video'
  mediaUrl: string
  ctaText: string
  ctaLink: string
  order: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
```

#### 2. 服务板块
```typescript
interface ServiceSection {
  id: string
  step: number
  title: string
  description: string
  image: string
  features: string[]
  isActive: boolean
  order: number
  updatedAt: Date
}
```

#### 3. 碳智观察文章
```typescript
interface Article {
  id: string
  title: string
  subtitle: string
  content: string // Rich text
  coverImage: string
  category: 'trend' | 'policy' | 'technology' | 'market'
  tags: string[]
  isPublished: boolean
  isFeatured: boolean // 首页展示
  publishDate: Date
  author: string
  readTime: number
  seoTitle?: string
  seoDescription?: string
  createdAt: Date
  updatedAt: Date
}
```

#### 4. 统计数据
```typescript
interface Statistics {
  id: string
  label: string
  value: string
  description?: string
  icon?: string
  order: number
  isActive: boolean
  updatedAt: Date
}
```

#### 5. 团队成员
```typescript
interface TeamMember {
  id: string
  name: string
  position: string
  bio: string
  avatar: string
  email?: string
  linkedin?: string
  order: number
  isActive: boolean
  updatedAt: Date
}
```

#### 6. 网站配置
```typescript
interface SiteConfig {
  id: string
  siteName: string
  siteDescription: string
  logo: string
  favicon: string
  contactEmail: string
  contactPhone: string
  address: string
  socialMedia: {
    linkedin?: string
    twitter?: string
    wechat?: string
  }
  seo: {
    defaultTitle: string
    defaultDescription: string
    keywords: string[]
  }
  updatedAt: Date
}
```

## 🗃️ CMS 功能规划

### 管理后台功能模块

#### 1. 仪表板 (Dashboard)
- 网站访问统计
- 内容更新概览
- 最新文章管理
- 快捷操作入口

#### 2. 内容管理
**Hero 轮播管理**:
- 添加/编辑/删除轮播内容
- 支持图片和视频上传
- 拖拽排序
- 预览功能

**服务板块管理**:
- 编辑服务标题、描述、特性
- 更换服务图片
- 调整展示顺序

**统计数据管理**:
- 编辑数值和描述
- 图标管理
- 实时预览

#### 3. 文章管理系统
**文章列表**:
- 分页浏览所有文章
- 按分类/状态筛选
- 搜索功能
- 批量操作

**文章编辑器**:
- 富文本编辑器 (支持 Markdown)
- 图片上传和管理
- SEO 优化设置
- 发布状态控制
- 首页展示控制

**分类管理**:
- 创建/编辑文章分类
- 分类层级管理

#### 4. 媒体库
- 统一的文件上传管理
- 图片批量上传
- 视频文件管理
- 文件大小优化

#### 5. 用户管理
- 管理员账户管理
- 角色权限控制
- 操作日志记录

#### 6. 系统设置
- 网站基本信息
- SEO 全局设置
- 联系信息管理
- 多语言内容管理

## 🎨 后台界面设计

### 设计原则
- 遵循 Methas 品牌风格 (黑白简约)
- 现代化管理界面
- 响应式设计
- 操作直观易用

### 技术实现
- **UI 框架**: Tailwind CSS + Headless UI
- **组件库**: 基于现有设计系统扩展
- **图标**: Heroicons
- **表单**: React Hook Form + Zod
- **富文本**: Tiptap 或 Slate.js

## 🚀 开发阶段规划

### 第一阶段：基础 CMS 架构 (2-3 周)
**目标**: 建立基本的内容管理框架

**任务清单**:
1. **Sanity 架构升级**
   - 定义所有内容类型 Schema
   - 配置 Sanity Studio
   - 设置权限和工作流

2. **前端 API 集成**
   - 创建 Sanity 客户端
   - 实现内容获取 API
   - 建立缓存策略

3. **认证系统**
   - 管理员登录
   - 基础权限控制

**交付物**:
- 可用的 Sanity Studio
- 基本的内容获取 API
- 管理员认证系统

### 第二阶段：Hero 和服务管理 (2 周)
**目标**: 实现首页核心内容管理

**任务清单**:
1. **Hero 轮播管理**
   - 轮播内容 CRUD
   - 图片/视频上传
   - 顺序调整
   - 前端动态展示

2. **服务板块管理**
   - 服务内容编辑
   - 图片更换功能
   - 特性列表管理

3. **统计数据管理**
   - 数值编辑界面
   - 实时更新

**交付物**:
- Hero 轮播完整管理功能
- 服务板块内容管理
- 统计数据管理界面

### 第三阶段：文章管理系统 (3-4 周)
**目标**: 完整的文章内容管理

**任务清单**:
1. **文章编辑功能**
   - 富文本编辑器集成
   - 图片上传和插入
   - 文章元数据管理
   - 草稿/发布状态

2. **分类和标签**
   - 分类管理系统
   - 标签系统
   - 筛选和搜索

3. **碳智观察展示**
   - 首页最新 8 篇展示
   - 独立的文章列表页面
   - 分类筛选页面
   - 文章详情页面

**交付物**:
- 完整的文章管理系统
- 碳智观察独立页面
- 分类展示功能

### 第四阶段：高级功能 (2-3 周)
**目标**: 完善用户体验和系统功能

**任务清单**:
1. **媒体库系统**
   - 统一文件管理
   - 图片优化
   - 批量上传

2. **SEO 管理**
   - 页面级 SEO 设置
   - 全局 SEO 配置
   - 站点地图生成

3. **多语言管理**
   - 中英文内容管理
   - 翻译工作流

4. **系统优化**
   - 缓存策略
   - 性能优化
   - 监控和日志

**交付物**:
- 媒体库管理系统
- SEO 管理功能
- 多语言支持
- 性能优化

### 第五阶段：测试和部署 (1-2 周)
**目标**: 系统稳定性和上线

**任务清单**:
1. **功能测试**
   - 所有功能完整性测试
   - 用户体验测试
   - 性能测试

2. **数据迁移**
   - 现有内容迁移
   - 数据备份策略

3. **部署和监控**
   - 生产环境部署
   - 监控系统设置
   - 使用培训文档

**交付物**:
- 生产就绪的 CMS 系统
- 数据迁移完成
- 使用说明文档

## 💻 技术实现细节

### Sanity Studio 配置示例
```typescript
// sanity.config.ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

const config = defineConfig({
  projectId: 'your-project-id',
  dataset: 'production',
  
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('内容管理')
          .items([
            S.listItem()
              .title('Hero 轮播')
              .child(
                S.documentTypeList('heroSlide')
                  .title('Hero 轮播')
              ),
            S.listItem()
              .title('服务板块')
              .child(
                S.documentTypeList('serviceSection')
                  .title('服务板块')
              ),
            S.listItem()
              .title('碳智观察')
              .child(
                S.documentTypeList('article')
                  .title('碳智观察文章')
              ),
          ])
    }),
    visionTool()
  ],
  
  schema: {
    types: [heroSlide, serviceSection, article, /* other types */]
  }
})

export default config
```

### 前端 API 集成示例
```typescript
// lib/sanity-client.ts
import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production'
})

// 获取 Hero 轮播数据
export async function getHeroSlides() {
  return sanityClient.fetch(`
    *[_type == "heroSlide" && isActive == true] | order(order asc) {
      _id,
      title,
      subtitle,
      mediaType,
      "mediaUrl": media.asset->url,
      ctaText,
      ctaLink,
      order
    }
  `)
}

// 获取最新文章
export async function getLatestArticles(limit = 8) {
  return sanityClient.fetch(`
    *[_type == "article" && isPublished == true] 
    | order(publishDate desc) 
    | [0...${limit}] {
      _id,
      title,
      subtitle,
      "coverImage": coverImage.asset->url,
      category,
      publishDate,
      "slug": slug.current
    }
  `)
}
```

## 📱 前端页面更新

### 新增页面
1. **碳智观察列表页** (`/insights`)
   - 文章列表展示
   - 分类筛选
   - 分页导航
   - 搜索功能

2. **文章详情页** (`/insights/[slug]`)
   - 文章完整内容
   - 相关文章推荐
   - 分享功能
   - SEO 优化

3. **分类页面** (`/insights/category/[category]`)
   - 按分类展示文章
   - 面包屑导航

### 现有页面增强
- 首页 Hero 区域支持轮播
- 服务板块动态内容
- 统计数据动态更新
- 碳智观察区域显示最新 8 篇

## 💰 成本估算

### 开发成本
- **总开发周期**: 10-15 周
- **开发人员**: 1-2 名全栈工程师
- **预估工时**: 400-600 小时

### 运营成本 (月)
- **Sanity**: $99/月 (Growth 计划)
- **Vercel**: $20/月 (Pro 计划)
- **文件存储**: $10-50/月 (根据使用量)
- **总计**: ~$130-170/月

## 🔐 安全考虑

1. **认证和授权**
   - JWT Token 认证
   - 角色权限控制
   - 操作日志记录

2. **数据安全**
   - API 限流
   - 输入验证和过滤
   - XSS/CSRF 防护

3. **文件上传安全**
   - 文件类型限制
   - 大小限制
   - 恶意文件检测

## 📈 未来扩展规划

1. **高级功能**
   - 评论系统
   - 文章统计分析
   - 自动化发布
   - 多作者协作

2. **性能优化**
   - CDN 集成
   - 图片自动压缩
   - 增量静态生成

3. **营销功能**
   - 邮件订阅
   - 社交媒体集成
   - SEO 自动化

## 📋 项目启动清单

### 立即开始
1. ✅ 确认技术方案选择
2. ✅ 准备开发环境
3. ✅ 创建项目管理看板
4. ✅ 设计数据模型
5. ✅ 配置 Sanity 项目

### 第一周任务
1. 搭建 Sanity Studio 基础架构
2. 定义核心内容类型
3. 创建管理员认证系统
4. 建立开发工作流

---

这个计划涵盖了从基础架构到完整功能实现的所有方面。建议从 Sanity CMS 方案开始，因为项目已有基础，可以快速开发出 MVP 版本。

你对这个开发计划有什么想法或需要调整的地方吗？