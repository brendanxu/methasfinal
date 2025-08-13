import { Metadata } from 'next';

// SEO配置接口
export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  locale?: string;
  alternateLocales?: Array<{
    locale: string;
    href: string;
  }>;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  nofollow?: boolean;
}

// 默认SEO配置
const defaultSEO: Partial<SEOConfig> = {
  ogType: 'website',
  twitterCard: 'summary_large_image',
  locale: 'zh',
  ogImage: '/og-image.jpg',
};

// 生成完整的Metadata对象
export function generateSEOMetadata(config: SEOConfig): Metadata {
  const seo = { ...defaultSEO, ...config };
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://methas.cn';
  const canonicalUrl = seo.canonical ? `${siteUrl}${seo.canonical}` : siteUrl;

  // 构建robots指令
  let robotsDirectives = ['index', 'follow'];
  if (seo.noindex) robotsDirectives = robotsDirectives.filter(d => d !== 'index').concat('noindex');
  if (seo.nofollow) robotsDirectives = robotsDirectives.filter(d => d !== 'follow').concat('nofollow');

  const metadata: Metadata = {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords?.join(', '),
    
    // 规范链接
    alternates: {
      canonical: canonicalUrl,
      languages: seo.alternateLocales?.reduce((acc, alt) => ({
        ...acc,
        [alt.locale]: `${siteUrl}${alt.href}`
      }), {}) || {
        'zh': `${siteUrl}/zh`,
        'en': `${siteUrl}/en`,
      },
    },

    // Open Graph
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonicalUrl,
      siteName: 'Methas',
      images: [
        {
          url: seo.ogImage!,
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
      locale: seo.locale,
      type: seo.ogType,
      
      // 文章类型的额外元数据
      ...(seo.ogType === 'article' && {
        publishedTime: seo.publishedTime,
        modifiedTime: seo.modifiedTime,
        authors: seo.author ? [seo.author] : undefined,
        section: seo.section,
        tags: seo.tags,
      }),
    },

    // Twitter Cards
    twitter: {
      card: seo.twitterCard,
      title: seo.title,
      description: seo.description,
      images: [seo.ogImage!],
      creator: '@methas_cn',
    },

    // Robots
    robots: {
      index: !seo.noindex,
      follow: !seo.nofollow,
      googleBot: {
        index: !seo.noindex,
        follow: !seo.nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // 其他元数据
    metadataBase: new URL(siteUrl),
    applicationName: 'Methas',
    referrer: 'origin-when-cross-origin',
    creator: 'Methas Team',
    publisher: 'Methas',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };

  return metadata;
}

// 预定义的SEO模板
export const seoTemplates = {
  // 首页
  home: (locale: string): SEOConfig => ({
    title: locale === 'zh' 
      ? 'Methas - 甲烷减排与碳信用解决方案' 
      : 'Methas - Methane Reduction & Carbon Credit Solutions',
    description: locale === 'zh'
      ? '专业的甲烷减排技术与碳信用管理解决方案提供商，帮助企业实现碳中和目标，减少温室气体排放。'
      : 'Professional methane reduction technology and carbon credit management solutions provider, helping enterprises achieve carbon neutrality goals.',
    keywords: [
      '甲烷减排', '碳信用', '碳中和', '温室气体', '环境监测', 
      'methane reduction', 'carbon credits', 'carbon neutral', 'greenhouse gas', 'environmental monitoring'
    ],
    canonical: `/${locale}`,
    locale,
  }),

  // 解决方案页面
  solutions: (locale: string): SEOConfig => ({
    title: locale === 'zh'
      ? '解决方案 - Methas 甲烷减排技术'
      : 'Solutions - Methas Methane Reduction Technology',
    description: locale === 'zh'
      ? '了解Methas的全方位甲烷减排解决方案：实时监测、智能减排、碳信用管理、合规报告。'
      : 'Discover Methas comprehensive methane reduction solutions: real-time monitoring, intelligent reduction, carbon credit management, compliance reporting.',
    keywords: [
      '甲烷监测', '减排技术', '碳信用管理', '合规报告',
      'methane monitoring', 'reduction technology', 'carbon credit management', 'compliance reporting'
    ],
    canonical: `/${locale}/solutions`,
    locale,
  }),

  // 关于我们页面
  about: (locale: string): SEOConfig => ({
    title: locale === 'zh'
      ? '关于我们 - Methas 专业团队'
      : 'About Us - Methas Professional Team',
    description: locale === 'zh'
      ? '了解Methas的专业团队、企业价值观和发展历程。我们致力于通过创新技术推动甲烷减排和碳信用管理的发展。'
      : 'Learn about Methas professional team, corporate values and development history. We are committed to promoting methane reduction and carbon credit management through innovative technology.',
    keywords: [
      '专业团队', '环境责任', '科技创新', '可持续发展',
      'professional team', 'environmental responsibility', 'technological innovation', 'sustainable development'
    ],
    canonical: `/${locale}/about`,
    locale,
  }),

  // 案例研究页面
  caseStudy: (locale: string, title: string, slug: string): SEOConfig => ({
    title: `${title} - Methas 案例研究`,
    description: `了解${title}的甲烷减排实施案例，包括技术方案、实施过程和减排效果。`,
    keywords: ['案例研究', '甲烷减排', '成功案例', '减排效果'],
    canonical: `/${locale}/cases/${slug}`,
    locale,
    ogType: 'article',
  }),

  // 洞察文章页面
  insight: (locale: string, title: string, slug: string, publishedTime?: string): SEOConfig => ({
    title: `${title} - Methas Insights`,
    description: `阅读${title}，获取最新的甲烷减排技术洞察和行业动态。`,
    keywords: ['行业洞察', '技术动态', '甲烷减排', '碳市场'],
    canonical: `/${locale}/insights/${slug}`,
    locale,
    ogType: 'article',
    publishedTime,
    section: 'insights',
  }),
};

// JSON-LD 结构化数据生成器
export function generateJSONLD(type: 'Organization' | 'WebSite' | 'Article', data: any) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://methas.cn';
  
  const schemas = {
    Organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Methas',
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      description: '专业的甲烷减排技术与碳信用管理解决方案提供商',
      foundingDate: '2019',
      sameAs: [
        'https://linkedin.com/company/methas',
        'https://twitter.com/methas_cn',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+86-400-xxx-xxxx',
        contactType: 'customer service',
        availableLanguage: ['Chinese', 'English'],
      },
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'CN',
        addressLocality: '北京',
        addressRegion: '北京',
      },
    },
    
    WebSite: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Methas',
      url: baseUrl,
      description: '专业的甲烷减排技术与碳信用管理解决方案提供商',
      inLanguage: ['zh-CN', 'en-US'],
      potentialAction: {
        '@type': 'SearchAction',
        target: `${baseUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    
    Article: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.title,
      description: data.description,
      image: data.image || `${baseUrl}/og-image.jpg`,
      datePublished: data.publishedTime,
      dateModified: data.modifiedTime || data.publishedTime,
      author: {
        '@type': 'Person',
        name: data.author || 'Methas Team',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Methas',
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/logo.png`,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': data.url,
      },
    },
  };

  return schemas[type];
}

// 导出用于页面的SEO组件
export { generateSEOMetadata as generateMetadata };
export default generateSEOMetadata;