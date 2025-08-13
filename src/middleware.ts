import createMiddleware from 'next-intl/middleware';
import { routing } from '../i18n/routing';

export default createMiddleware(routing);

export const config = {
  // 匹配所有路径，除了以下：
  // - api 路由
  // - _next 静态文件
  // - 静态文件 (图片等)
  matcher: [
    // 匹配所有路径
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // 包含根路径
    '/'
  ],
};