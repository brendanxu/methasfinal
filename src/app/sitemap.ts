import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://methas.cn';
  
  // 静态页面路由
  const staticRoutes = [
    '',
    '/solutions',
    '/about',
    '/contact',
    '/cases',
    '/insights',
  ];

  // 为每个路由生成多语言版本
  const routes: MetadataRoute.Sitemap = [];
  
  const locales = ['zh', 'en'];
  const currentDate = new Date().toISOString();

  staticRoutes.forEach(route => {
    locales.forEach(locale => {
      routes.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: currentDate,
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : 0.8,
      });
    });
  });

  // TODO: 动态添加来自CMS的内容
  // 当Sanity CMS配置完成后，可以添加：
  // - 案例研究页面
  // - 洞察文章页面
  // - 其他动态内容

  return routes;
}

// 生成robots.txt
export function generateRobotstxt(): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://methas.cn';
  
  return `User-agent: *
Allow: /

# 禁止爬取API路由
Disallow: /api/

# 禁止爬取私有文件
Disallow: /_next/
Disallow: /admin/

# Sitemap位置
Sitemap: ${baseUrl}/sitemap.xml

# 爬取延迟（可选）
Crawl-delay: 1`;
}