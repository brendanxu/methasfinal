import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// 数据文件路径
const DATA_FILE = path.join(process.cwd(), 'data', 'content.json');

// 确保数据目录存在
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// 读取内容
export async function GET() {
  try {
    await ensureDataDir();
    
    // 尝试读取文件
    try {
      const data = await fs.readFile(DATA_FILE, 'utf-8');
      return NextResponse.json(JSON.parse(data));
    } catch {
      // 如果文件不存在，返回默认数据
      const defaultData = {
        hero: [
          {
            title: '推动甲烷减排',
            subtitle: '助力农业农村减污降碳',
            buttonText: '了解更多',
            image: '/api/placeholder/1200/600'
          }
        ],
        services: [
          {
            step: 1,
            title: '现场调研',
            description: '深入了解您的排放源和运营特点',
            features: '实地考察, 数据采集, 问题诊断'
          },
          {
            step: 2,
            title: '方案设计',
            description: '制定科学可行的减排方案',
            features: '技术选择, 成本分析, 效益评估'
          },
          {
            step: 3,
            title: '实施部署',
            description: '专业团队负责方案落地',
            features: '设备安装, 系统调试, 人员培训'
          },
          {
            step: 4,
            title: '持续优化',
            description: '长期跟踪效果并持续改进',
            features: '数据监测, 效果评估, 方案优化'
          }
        ],
        articles: [],
        stats: [
          {
            label: '减排效率',
            value: '85%',
            description: '平均甲烷减排率'
          },
          {
            label: '服务项目',
            value: '200+',
            description: '累计服务项目数'
          },
          {
            label: '碳减排量',
            value: '50万吨',
            description: '年度碳减排总量'
          },
          {
            label: '客户满意度',
            value: '98%',
            description: '客户满意度评分'
          }
        ]
      };
      
      // 保存默认数据
      await fs.writeFile(DATA_FILE, JSON.stringify(defaultData, null, 2));
      return NextResponse.json(defaultData);
    }
  } catch (error) {
    console.error('Error reading content:', error);
    return NextResponse.json({ error: 'Failed to read content' }, { status: 500 });
  }
}

// 保存内容
export async function POST(request: NextRequest) {
  try {
    await ensureDataDir();
    const content = await request.json();
    
    // 保存到文件
    await fs.writeFile(DATA_FILE, JSON.stringify(content, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving content:', error);
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}