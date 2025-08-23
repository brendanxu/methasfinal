import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'content-v2.json');
const BACKUP_DIR = path.join(process.cwd(), 'data', 'backups');

// 确保备份目录存在
async function ensureBackupDir() {
  try {
    await fs.access(BACKUP_DIR);
  } catch {
    await fs.mkdir(BACKUP_DIR, { recursive: true });
  }
}

// 创建数据备份
async function createBackup() {
  try {
    await ensureBackupDir();
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(BACKUP_DIR, `content-${timestamp}.json`);
    await fs.writeFile(backupFile, data);
    
    // 清理旧备份 (保留最近10个)
    const backups = await fs.readdir(BACKUP_DIR);
    const sortedBackups = backups
      .filter(file => file.startsWith('content-') && file.endsWith('.json'))
      .sort()
      .reverse();
    
    if (sortedBackups.length > 10) {
      const oldBackups = sortedBackups.slice(10);
      for (const backup of oldBackups) {
        await fs.unlink(path.join(BACKUP_DIR, backup));
      }
    }
    
    return backupFile;
  } catch (error) {
    console.error('创建备份失败:', error);
    return null;
  }
}

// 验证数据结构
function validateContentData(data: any): boolean {
  try {
    // 检查必要字段
    if (!data.version || !data.data) {
      return false;
    }

    // 检查数据结构
    const { hero, services, articles, stats } = data.data;
    
    if (!Array.isArray(hero) || !Array.isArray(services) || 
        !Array.isArray(articles) || !Array.isArray(stats)) {
      return false;
    }

    // 验证 hero 数据
    for (const item of hero) {
      if (!item.id || !item.title || !item.subtitle || !item.image?.url) {
        return false;
      }
    }

    // 验证 services 数据
    for (const item of services) {
      if (!item.id || !item.title || !item.description || typeof item.step !== 'number') {
        return false;
      }
    }

    // 验证 articles 数据
    for (const item of articles) {
      if (!item.id || !item.title || !item.category || !item.content) {
        return false;
      }
    }

    // 验证 stats 数据
    for (const item of stats) {
      if (!item.id || !item.label || !item.value || !item.description) {
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('数据验证失败:', error);
    return false;
  }
}

// 获取内容数据
export async function GET() {
  try {
    let data;
    
    try {
      // 尝试读取 v2 数据
      const fileContent = await fs.readFile(DATA_FILE, 'utf-8');
      data = JSON.parse(fileContent);
    } catch (error) {
      // 如果 v2 文件不存在，尝试从旧版本迁移
      try {
        const legacyFile = path.join(process.cwd(), 'data', 'content.json');
        const legacyContent = await fs.readFile(legacyFile, 'utf-8');
        const legacyData = JSON.parse(legacyContent);
        
        // 转换为 v2 格式
        data = convertLegacyData(legacyData);
        
        // 保存转换后的数据
        await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
      } catch (legacyError) {
        // 如果都失败，返回默认数据
        data = getDefaultData();
        await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
      }
    }

    // 验证数据结构
    if (!validateContentData(data)) {
      throw new Error('数据结构无效');
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('获取内容失败:', error);
    return NextResponse.json(
      { error: '获取内容失败' },
      { status: 500 }
    );
  }
}

// 保存内容数据
export async function POST(request: NextRequest) {
  try {
    const contentData = await request.json();

    // 验证数据结构
    if (!validateContentData(contentData)) {
      return NextResponse.json(
        { error: '数据格式无效' },
        { status: 400 }
      );
    }

    // 创建备份
    const backupFile = await createBackup();
    
    // 更新时间戳
    contentData.lastUpdated = new Date().toISOString();
    
    // 保存数据
    await fs.writeFile(DATA_FILE, JSON.stringify(contentData, null, 2));

    return NextResponse.json({ 
      success: true,
      message: '内容保存成功',
      backup: backupFile ? path.basename(backupFile) : null
    });
  } catch (error) {
    console.error('保存内容失败:', error);
    return NextResponse.json(
      { error: '保存内容失败' },
      { status: 500 }
    );
  }
}

// 转换旧版本数据
function convertLegacyData(legacyData: any) {
  return {
    version: '2.0.0',
    lastUpdated: new Date().toISOString(),
    schema: {
      hero: {
        type: 'carousel',
        required: ['title', 'subtitle', 'buttonText', 'image'],
        optional: ['link', 'priority']
      },
      services: {
        type: 'process_steps',
        required: ['step', 'title', 'description', 'features'],
        optional: ['image', 'icon', 'mediaGallery']
      },
      articles: {
        type: 'content_collection',
        required: ['id', 'title', 'category', 'excerpt', 'content', 'publishedAt'],
        optional: ['coverImage', 'gallery', 'tags', 'author', 'status', 'seo']
      },
      stats: {
        type: 'metrics',
        required: ['label', 'value', 'description'],
        optional: ['icon', 'trend', 'unit']
      }
    },
    data: {
      hero: legacyData.hero?.map((item: any, index: number) => ({
        id: `hero_legacy_${index}`,
        title: item.title,
        subtitle: item.subtitle,
        buttonText: item.buttonText,
        image: {
          url: item.image,
          alt: item.title,
          width: 1920,
          height: 1080
        },
        priority: index + 1,
        status: 'published',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })) || [],
      services: legacyData.services?.map((item: any) => ({
        id: `service_legacy_${item.step}`,
        step: item.step,
        title: item.title,
        description: item.description,
        features: typeof item.features === 'string' 
          ? item.features.split(', ').filter((f: string) => f.trim())
          : item.features || [],
        image: {
          url: '/api/placeholder/800/600',
          alt: item.title,
          width: 800,
          height: 600
        },
        icon: getServiceIcon(item.step),
        mediaGallery: [],
        status: 'published',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })) || [],
      articles: legacyData.articles?.map((item: any, index: number) => ({
        id: `article_legacy_${index}`,
        title: item.title || '未命名文章',
        category: item.category || '行业趋势',
        excerpt: item.excerpt || item.summary || '',
        content: item.content || '',
        coverImage: {
          url: item.image || '/api/placeholder/800/450',
          alt: item.title || '文章封面',
          width: 800,
          height: 450
        },
        gallery: [],
        tags: item.tags || [],
        author: {
          name: 'Methas 研究团队',
          avatar: '/images/authors/team.jpg'
        },
        publishedAt: item.publishedAt || new Date().toISOString(),
        status: 'published',
        seo: {
          metaTitle: item.title || '',
          metaDescription: item.excerpt || item.summary || '',
          keywords: (item.tags || []).join(',')
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })) || [],
      stats: legacyData.stats?.map((item: any, index: number) => ({
        id: `stat_legacy_${index}`,
        label: item.label,
        value: String(item.value).replace(/[^0-9]/g, ''),
        unit: String(item.value).replace(/[0-9]/g, ''),
        description: item.description,
        icon: getStatIcon(index),
        trend: {
          direction: 'stable',
          percentage: 0,
          period: '同比去年'
        },
        status: 'published',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })) || []
    },
    settings: {
      contentVersion: '2.0.0',
      autoBackup: true,
      backupInterval: 'daily',
      imageUploadPath: '/uploads',
      maxImageSize: '5MB',
      allowedImageTypes: ['jpg', 'jpeg', 'png', 'webp'],
      contentStatus: {
        draft: '草稿',
        review: '待审核',
        published: '已发布',
        archived: '已归档'
      },
      categories: {
        articles: [
          '行业趋势',
          '政策法规', 
          '技术创新',
          '案例分析',
          '市场动态'
        ]
      }
    }
  };
}

// 获取默认数据
function getDefaultData() {
  return {
    version: '2.0.0',
    lastUpdated: new Date().toISOString(),
    schema: {
      hero: {
        type: 'carousel',
        required: ['title', 'subtitle', 'buttonText', 'image'],
        optional: ['link', 'priority']
      },
      services: {
        type: 'process_steps',
        required: ['step', 'title', 'description', 'features'],
        optional: ['image', 'icon', 'mediaGallery']
      },
      articles: {
        type: 'content_collection',
        required: ['id', 'title', 'category', 'excerpt', 'content', 'publishedAt'],
        optional: ['coverImage', 'gallery', 'tags', 'author', 'status', 'seo']
      },
      stats: {
        type: 'metrics',
        required: ['label', 'value', 'description'],
        optional: ['icon', 'trend', 'unit']
      }
    },
    data: {
      hero: [],
      services: [],
      articles: [],
      stats: []
    },
    settings: {
      contentVersion: '2.0.0',
      autoBackup: true,
      backupInterval: 'daily',
      imageUploadPath: '/uploads',
      maxImageSize: '5MB',
      allowedImageTypes: ['jpg', 'jpeg', 'png', 'webp'],
      contentStatus: {
        draft: '草稿',
        review: '待审核',
        published: '已发布',
        archived: '已归档'
      },
      categories: {
        articles: [
          '行业趋势',
          '政策法规', 
          '技术创新',
          '案例分析',
          '市场动态'
        ]
      }
    }
  };
}

// 获取服务图标
function getServiceIcon(step: number): string {
  const icons = ['🔍', '📋', '⚙️', '📈', '🎯'];
  return icons[step - 1] || '⚙️';
}

// 获取统计图标
function getStatIcon(index: number): string {
  const icons = ['📊', '🏢', '🌱', '⭐', '💼'];
  return icons[index] || '📊';
}