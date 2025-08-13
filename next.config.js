const withNextIntl = require('next-intl/plugin')('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 基于 ADR-001 的配置
  reactStrictMode: true,
  swcMinify: true,
  
  // 实验性功能
  experimental: {
    optimizePackageImports: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  
  // 图片优化配置
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [
      'cdn.sanity.io', // Sanity CDN
      'images.unsplash.com', // 临时图片源
    ],
  },
  
  // 性能优化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // 构建优化
  webpack: (config, { dev, isServer }) => {
    // Framer Motion 优化
    if (!dev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'framer-motion': 'framer-motion/dist/framer-motion',
      };
    }
    
    return config;
  },
  
  // 重定向规则
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/zh', // 默认重定向到中文
        permanent: false,
      },
    ];
  },
  
  // 头部配置
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

// Bundle 分析器 (开发时使用)
if (process.env.ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  });
  module.exports = withBundleAnalyzer(withNextIntl(nextConfig));
} else {
  module.exports = withNextIntl(nextConfig);
}