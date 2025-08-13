import { createClient } from '@sanity/client';

// Sanity 客户端配置 - 基于 ADR-001 技术选择
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01', // 使用固定日期确保API稳定性
  useCdn: process.env.NODE_ENV === 'production', // 生产环境使用CDN
  perspective: 'published', // 只获取已发布内容
  
  // 如果需要写入权限，添加token
  token: process.env.SANITY_API_TOKEN,
});

// Sanity 图片URL构建器
export const urlFor = (source: any) => {
  if (!source?.asset?._ref) {
    return '';
  }
  
  const [, id, dimensions, format] = source.asset._ref.split('-');
  const [width, height] = dimensions.split('x');
  
  return `https://cdn.sanity.io/images/${sanityClient.config().projectId}/${sanityClient.config().dataset}/${id}-${dimensions}.${format}`;
};

// 通用GROQ查询类型
export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

// 页面内容类型
export interface PageContent extends SanityDocument {
  title: string;
  slug: {
    current: string;
  };
  content?: any[]; // Portable Text
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

// 案例研究类型
export interface CaseStudy extends SanityDocument {
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  content: any[]; // Portable Text
  featuredImage?: any;
  industry: string;
  results: {
    emissionReduction: number;
    costSavings: number;
    implementationTime: number;
  };
  publishedAt: string;
}

// 团队成员类型
export interface TeamMember extends SanityDocument {
  name: string;
  role: string;
  bio: string;
  avatar?: any;
  expertise: string[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

// 新闻/洞察类型
export interface Insight extends SanityDocument {
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  content: any[]; // Portable Text
  featuredImage?: any;
  category: 'news' | 'research' | 'whitepaper' | 'industry-update';
  tags: string[];
  publishedAt: string;
  author?: TeamMember;
}

// 常用GROQ查询
export const queries = {
  // 获取所有页面
  allPages: `*[_type == "page"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    _createdAt,
    _updatedAt
  }`,
  
  // 根据slug获取页面
  pageBySlug: (slug: string) => `*[_type == "page" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    content,
    seo,
    _createdAt,
    _updatedAt
  }`,
  
  // 获取所有案例研究
  allCaseStudies: `*[_type == "caseStudy"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    industry,
    results,
    publishedAt
  }`,
  
  // 根据slug获取案例研究
  caseStudyBySlug: (slug: string) => `*[_type == "caseStudy" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    featuredImage,
    industry,
    results,
    publishedAt
  }`,
  
  // 获取所有团队成员
  allTeamMembers: `*[_type == "teamMember"] | order(_createdAt asc) {
    _id,
    name,
    role,
    bio,
    avatar,
    expertise,
    socialLinks
  }`,
  
  // 获取最新洞察
  latestInsights: (limit: number = 6) => `*[_type == "insight"] | order(publishedAt desc)[0...${limit}] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    category,
    tags,
    publishedAt,
    author->{name, role, avatar}
  }`,
  
  // 根据分类获取洞察
  insightsByCategory: (category: string) => `*[_type == "insight" && category == "${category}"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    category,
    tags,
    publishedAt,
    author->{name, role, avatar}
  }`,
  
  // 根据slug获取洞察
  insightBySlug: (slug: string) => `*[_type == "insight" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    featuredImage,
    category,
    tags,
    publishedAt,
    author->{name, role, avatar, bio}
  }`,
};

// API辅助函数
export const sanityApi = {
  // 获取所有页面
  async getAllPages(): Promise<PageContent[]> {
    return sanityClient.fetch(queries.allPages);
  },
  
  // 根据slug获取页面
  async getPageBySlug(slug: string): Promise<PageContent | null> {
    return sanityClient.fetch(queries.pageBySlug(slug));
  },
  
  // 获取所有案例研究
  async getAllCaseStudies(): Promise<CaseStudy[]> {
    return sanityClient.fetch(queries.allCaseStudies);
  },
  
  // 根据slug获取案例研究
  async getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
    return sanityClient.fetch(queries.caseStudyBySlug(slug));
  },
  
  // 获取所有团队成员
  async getAllTeamMembers(): Promise<TeamMember[]> {
    return sanityClient.fetch(queries.allTeamMembers);
  },
  
  // 获取最新洞察
  async getLatestInsights(limit: number = 6): Promise<Insight[]> {
    return sanityClient.fetch(queries.latestInsights(limit));
  },
  
  // 根据分类获取洞察
  async getInsightsByCategory(category: string): Promise<Insight[]> {
    return sanityClient.fetch(queries.insightsByCategory(category));
  },
  
  // 根据slug获取洞察
  async getInsightBySlug(slug: string): Promise<Insight | null> {
    return sanityClient.fetch(queries.insightBySlug(slug));
  },
};

// 环境变量验证
export const validateSanityConfig = () => {
  const requiredEnvVars = [
    'NEXT_PUBLIC_SANITY_PROJECT_ID',
    'NEXT_PUBLIC_SANITY_DATASET',
  ];
  
  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );
  
  if (missingVars.length > 0) {
    console.warn(
      `Missing Sanity environment variables: ${missingVars.join(', ')}`
    );
    return false;
  }
  
  return true;
};

// 开发环境配置检查
if (process.env.NODE_ENV === 'development') {
  const isConfigValid = validateSanityConfig();
  if (!isConfigValid) {
    console.log('Sanity配置不完整，将使用静态数据进行开发。');
  }
}