import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const client = createClient({
  projectId,
  dataset,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

// Image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// GROQ Queries
export const QUERIES = {
  // Hero 轮播查询
  heroSlides: `*[_type == "heroSlide" && isActive == true] | order(order asc) {
    _id,
    title,
    subtitle,
    mediaType,
    image {
      asset->,
      alt
    },
    video {
      asset->
    },
    videoUrl,
    ctaButton,
    secondaryButton,
    order
  }`,

  // 服务板块查询
  serviceSections: `*[_type == "serviceSection" && isActive == true] | order(step asc) {
    _id,
    step,
    title,
    description,
    image {
      asset->,
      alt
    },
    features,
    detailedContent
  }`,

  // 统计数据查询
  statistics: `*[_type == "statistics" && isActive == true] | order(order asc) {
    _id,
    label,
    value,
    description,
    icon,
    order
  }`,

  // 首页展示文章 (最新8篇)
  featuredArticles: `*[_type == "article" && isPublished == true && isFeatured == true] | order(publishDate desc) [0...8] {
    _id,
    title,
    subtitle,
    excerpt,
    slug,
    coverImage {
      asset->,
      alt
    },
    category,
    tags,
    author,
    readTime,
    publishDate
  }`,

  // 所有已发布文章
  allArticles: `*[_type == "article" && isPublished == true] | order(publishDate desc) {
    _id,
    title,
    subtitle,
    excerpt,
    slug,
    coverImage {
      asset->,
      alt
    },
    category,
    tags,
    author,
    readTime,
    publishDate
  }`,

  // 按分类获取文章
  articlesByCategory: (category: string) => `*[_type == "article" && isPublished == true && category == "${category}"] | order(publishDate desc) {
    _id,
    title,
    subtitle,
    excerpt,
    slug,
    coverImage {
      asset->,
      alt
    },
    category,
    tags,
    author,
    readTime,
    publishDate
  }`,

  // 单篇文章详情
  articleBySlug: (slug: string) => `*[_type == "article" && slug.current == "${slug}" && isPublished == true][0] {
    _id,
    title,
    subtitle,
    excerpt,
    content,
    coverImage {
      asset->,
      alt
    },
    category,
    tags,
    author,
    readTime,
    publishDate,
    seo
  }`,

  // 相关文章推荐
  relatedArticles: (category: string, currentId: string) => `*[_type == "article" && isPublished == true && category == "${category}" && _id != "${currentId}"] | order(publishDate desc) [0...3] {
    _id,
    title,
    excerpt,
    slug,
    coverImage {
      asset->,
      alt
    },
    category,
    readTime,
    publishDate
  }`,
}

// 检查是否配置了 Sanity
const isConfigured = projectId && projectId !== 'dummy';

// API functions
export const sanityApi = {
  // 获取 Hero 轮播
  async getHeroSlides() {
    if (!isConfigured) return [];
    try {
      return await client.fetch(QUERIES.heroSlides);
    } catch (error) {
      console.warn('Failed to fetch hero slides:', error);
      return [];
    }
  },

  // 获取服务板块
  async getServiceSections() {
    if (!isConfigured) return [];
    try {
      return await client.fetch(QUERIES.serviceSections);
    } catch (error) {
      console.warn('Failed to fetch service sections:', error);
      return [];
    }
  },

  // 获取统计数据
  async getStatistics() {
    if (!isConfigured) return [];
    try {
      return await client.fetch(QUERIES.statistics);
    } catch (error) {
      console.warn('Failed to fetch statistics:', error);
      return [];
    }
  },

  // 获取首页展示文章
  async getFeaturedArticles() {
    if (!isConfigured) return [];
    try {
      return await client.fetch(QUERIES.featuredArticles);
    } catch (error) {
      console.warn('Failed to fetch featured articles:', error);
      return [];
    }
  },

  // 获取所有文章
  async getAllArticles() {
    if (!isConfigured) return [];
    try {
      return await client.fetch(QUERIES.allArticles);
    } catch (error) {
      console.warn('Failed to fetch all articles:', error);
      return [];
    }
  },

  // 按分类获取文章
  async getArticlesByCategory(category: string) {
    if (!isConfigured) return [];
    try {
      return await client.fetch(QUERIES.articlesByCategory(category));
    } catch (error) {
      console.warn('Failed to fetch articles by category:', error);
      return [];
    }
  },

  // 获取单篇文章
  async getArticleBySlug(slug: string) {
    if (!isConfigured) return null;
    try {
      return await client.fetch(QUERIES.articleBySlug(slug));
    } catch (error) {
      console.warn('Failed to fetch article by slug:', error);
      return null;
    }
  },

  // 获取相关文章
  async getRelatedArticles(category: string, currentId: string) {
    if (!isConfigured) return [];
    try {
      return await client.fetch(QUERIES.relatedArticles(category, currentId));
    } catch (error) {
      console.warn('Failed to fetch related articles:', error);
      return [];
    }
  },

  // 搜索文章
  async searchArticles(query: string) {
    if (!isConfigured) return [];
    try {
      return await client.fetch(`*[_type == "article" && isPublished == true && (
        title.zh match "${query}*" || 
        title.en match "${query}*" || 
        excerpt.zh match "${query}*" || 
        excerpt.en match "${query}*" ||
        "${query}" in tags
      )] | order(publishDate desc) {
        _id,
        title,
        excerpt,
        slug,
        coverImage {
          asset->,
          alt
        },
        category,
        readTime,
        publishDate
      }`);
    } catch (error) {
      console.warn('Failed to search articles:', error);
      return [];
    }
  },
}

export default client