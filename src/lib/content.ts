import fs from 'fs/promises';
import path from 'path';

// 获取内容数据
export async function getContent() {
  const dataFile = path.join(process.cwd(), 'data', 'content.json');
  
  try {
    const data = await fs.readFile(dataFile, 'utf-8');
    return JSON.parse(data);
  } catch {
    // 返回默认数据
    return {
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
  }
}