import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function adminMiddleware(request: NextRequest) {
  // 检查是否是管理后台路由
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    // 这里可以添加更严格的验证逻辑
    // 目前使用客户端验证，生产环境建议使用 JWT 或 session
    return NextResponse.next();
  }

  return NextResponse.next();
}