import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// 配置上传限制
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

// 确保上传目录存在
async function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
}

// 生成唯一文件名
function generateFileName(originalName: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const ext = path.extname(originalName);
  return `${timestamp}_${randomString}${ext}`;
}

// 图片上传API
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string || 'general';

    if (!file) {
      return NextResponse.json({ error: '未选择文件' }, { status: 400 });
    }

    // 验证文件类型
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ 
        error: '不支持的文件类型，请上传 JPG、PNG 或 WebP 格式的图片' 
      }, { status: 400 });
    }

    // 验证文件大小
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ 
        error: '文件大小超过限制（最大 5MB）' 
      }, { status: 400 });
    }

    // 确保上传目录存在
    await ensureUploadDir();

    // 创建分类子目录
    const categoryDir = path.join(UPLOAD_DIR, category);
    if (!existsSync(categoryDir)) {
      await mkdir(categoryDir, { recursive: true });
    }

    // 生成文件名和路径
    const fileName = generateFileName(file.name);
    const filePath = path.join(categoryDir, fileName);
    const publicPath = `/uploads/${category}/${fileName}`;

    // 保存文件
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // 返回文件信息
    return NextResponse.json({
      success: true,
      data: {
        filename: fileName,
        originalName: file.name,
        path: publicPath,
        url: publicPath,
        size: file.size,
        type: file.type,
        category,
        uploadedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: '上传失败，请重试' 
    }, { status: 500 });
  }
}

// 获取上传的文件列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    // 这里可以实现获取文件列表的逻辑
    // 目前返回空数组，后续可以扩展
    
    return NextResponse.json({
      success: true,
      data: {
        files: [],
        categories: ['hero', 'services', 'articles', 'general']
      }
    });

  } catch (error) {
    console.error('Get files error:', error);
    return NextResponse.json({ 
      error: '获取文件列表失败' 
    }, { status: 500 });
  }
}