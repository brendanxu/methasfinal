// Sanity CMS 数据类型定义

export interface LocalizedText {
  zh: string;
  en: string;
}

export interface SanityImage {
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

export interface SanityFile {
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

// Hero 轮播类型
export interface HeroSlide {
  _id: string;
  title: LocalizedText;
  subtitle?: LocalizedText;
  mediaType: 'image' | 'video';
  image?: SanityImage;
  video?: SanityFile;
  videoUrl?: string;
  ctaButton?: {
    text: LocalizedText;
    link: string;
  };
  secondaryButton?: {
    text: LocalizedText;
    link: string;
  };
  order: number;
}

// 服务板块类型
export interface ServiceSection {
  _id: string;
  step: number;
  title: LocalizedText;
  description: LocalizedText;
  image: SanityImage;
  features: {
    zh: string[];
    en: string[];
  };
  detailedContent?: any[]; // Rich text array
}

// 统计数据类型
export interface Statistic {
  _id: string;
  label: LocalizedText;
  value: string;
  description?: LocalizedText;
  icon: 'emission' | 'project' | 'client' | 'cost' | 'time' | 'efficiency';
  order: number;
}

// 文章类型
export interface Article {
  _id: string;
  title: LocalizedText;
  subtitle?: LocalizedText;
  excerpt: LocalizedText;
  content?: LocalizedText;
  slug: {
    current: string;
  };
  coverImage: SanityImage;
  category: 'trend' | 'policy' | 'technology' | 'market' | 'case' | 'research';
  tags?: string[];
  author: string;
  readTime: number;
  publishDate: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

// 组件 Props 类型
export interface HeroSectionProps {
  heroSlides?: HeroSlide[];
}

export interface StickyStepSectionProps {
  serviceSections?: ServiceSection[];
}

export interface StatsSectionProps {
  statistics?: Statistic[];
}

export interface InsightsCarouselProps {
  articles?: Article[];
}