'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  XMarkIcon,
  PencilIcon,
  EyeIcon,
  ClockIcon,
  TagIcon,
  UserIcon,
  CalendarIcon,
  PhotoIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';

interface ContentPreviewProps {
  item: any;
  type: 'hero' | 'services' | 'articles' | 'stats';
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onStatusChange: (status: string) => void;
}

export default function ContentPreview({
  item,
  type,
  isOpen,
  onClose,
  onEdit,
  onStatusChange
}: ContentPreviewProps) {
  const [showMetadata, setShowMetadata] = useState(false);

  if (!isOpen || !item) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'text-green-700 bg-green-100';
      case 'draft': return 'text-yellow-700 bg-yellow-100';
      case 'review': return 'text-blue-700 bg-blue-100';
      case 'archived': return 'text-gray-700 bg-gray-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published': return '已发布';
      case 'draft': return '草稿';
      case 'review': return '待审核';
      case 'archived': return '已归档';
      default: return '未知';
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'hero': return PhotoIcon;
      case 'services': return ChartBarIcon;
      case 'articles': return DocumentTextIcon;
      case 'stats': return ChartBarIcon;
    }
  };

  const TypeIcon = getTypeIcon();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* 头部 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <TypeIcon className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">内容预览</h2>
              <p className="text-sm text-gray-500">
                {type === 'hero' ? '首页轮播' :
                 type === 'services' ? '服务介绍' :
                 type === 'articles' ? '碳智观察' : '统计数据'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setShowMetadata(!showMetadata)}
              className="bg-gray-100 text-gray-700 hover:bg-gray-200"
              size="sm"
            >
              {showMetadata ? '隐藏详情' : '显示详情'}
            </Button>
            <Button onClick={onEdit} size="sm">
              <PencilIcon className="w-4 h-4 mr-2" />
              编辑
            </Button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 min-h-full">
            {/* 主预览区域 */}
            <div className="lg:col-span-2 p-6 border-r border-gray-200">
              {type === 'hero' && (
                <HeroPreview item={item} />
              )}
              
              {type === 'services' && (
                <ServicePreview item={item} />
              )}
              
              {type === 'articles' && (
                <ArticlePreview item={item} />
              )}
              
              {type === 'stats' && (
                <StatPreview item={item} />
              )}
            </div>

            {/* 侧边栏信息 */}
            <div className="p-6 bg-gray-50">
              <div className="space-y-6">
                {/* 状态管理 */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">发布状态</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                        {getStatusText(item.status)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['draft', 'review', 'published', 'archived'].map((status) => (
                        <button
                          key={status}
                          onClick={() => onStatusChange(status)}
                          className={`px-3 py-1 rounded-full text-xs transition-colors ${
                            item.status === status
                              ? getStatusColor(status)
                              : 'text-gray-600 bg-gray-200 hover:bg-gray-300'
                          }`}
                        >
                          {getStatusText(status)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 基本信息 */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">基本信息</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">创建：</span>
                      <span>{new Date(item.createdAt).toLocaleString('zh-CN')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <ClockIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">更新：</span>
                      <span>{new Date(item.updatedAt).toLocaleString('zh-CN')}</span>
                    </div>
                    {item.publishedAt && (
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircleIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">发布：</span>
                        <span>{new Date(item.publishedAt).toLocaleString('zh-CN')}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 元数据（如果显示详情） */}
                {showMetadata && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">技术信息</h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">ID:</span>
                        <span className="font-mono text-gray-800">{item.id}</span>
                      </div>
                      {item.priority && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">优先级:</span>
                          <span>{item.priority}</span>
                        </div>
                      )}
                      {item.step && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">步骤:</span>
                          <span>{item.step}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 文章特有信息 */}
                {type === 'articles' && item.tags && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">标签</h3>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 作者信息 */}
                {type === 'articles' && item.author && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">作者</h3>
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{item.author.name}</span>
                    </div>
                  </div>
                )}

                {/* 趋势信息 */}
                {type === 'stats' && item.trend && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">趋势</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">方向:</span>
                        <span className={
                          item.trend.direction === 'up' ? 'text-green-600' :
                          item.trend.direction === 'down' ? 'text-red-600' :
                          'text-gray-600'
                        }>
                          {item.trend.direction === 'up' ? '上升' :
                           item.trend.direction === 'down' ? '下降' : '稳定'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">变化:</span>
                        <span>{item.trend.percentage}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">期间:</span>
                        <span>{item.trend.period}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 首页轮播预览组件
function HeroPreview({ item }: { item: any }) {
  return (
    <div className="space-y-6">
      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
        {item.image?.url ? (
          <Image
            src={item.image.url}
            alt={item.image.alt || item.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <PhotoIcon className="w-12 h-12 text-gray-400" />
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white p-6">
            <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
            <p className="text-xl mb-6 opacity-90">{item.subtitle}</p>
            <button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
              {item.buttonText}
            </button>
          </div>
        </div>
      </div>
      <div className="prose max-w-none">
        <h3>轮播内容</h3>
        <ul>
          <li><strong>标题：</strong>{item.title}</li>
          <li><strong>副标题：</strong>{item.subtitle}</li>
          <li><strong>按钮文字：</strong>{item.buttonText}</li>
          {item.link && <li><strong>跳转链接：</strong>{item.link}</li>}
        </ul>
      </div>
    </div>
  );
}

// 服务预览组件
function ServicePreview({ item }: { item: any }) {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg">
          {item.step}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
          <p className="text-gray-600 text-lg">{item.description}</p>
        </div>
      </div>
      
      {item.image?.url && (
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={item.image.url}
            alt={item.image.alt || item.title}
            width={800}
            height={450}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div>
        <h3 className="text-lg font-medium mb-3">服务特性</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {item.features.map((feature: string, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 text-green-500" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 文章预览组件
function ArticlePreview({ item }: { item: any }) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {item.category}
          </span>
          <span className="text-gray-500 text-sm">
            {new Date(item.publishedAt).toLocaleDateString('zh-CN')}
          </span>
        </div>
        <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
        <p className="text-xl text-gray-600 leading-relaxed">{item.excerpt}</p>
      </div>
      
      {item.coverImage?.url && (
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={item.coverImage.url}
            alt={item.coverImage.alt || item.title}
            width={800}
            height={450}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: item.content.replace(/\n/g, '<br>') }} />
      </div>
    </div>
  );
}

// 统计数据预览组件
function StatPreview({ item }: { item: any }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">{item.icon}</div>
        <div className="text-5xl font-bold mb-2">
          {item.value}
          <span className="text-3xl text-gray-500">{item.unit}</span>
        </div>
        <h2 className="text-2xl font-semibold mb-2">{item.label}</h2>
        <p className="text-gray-600 text-lg">{item.description}</p>
      </div>
      
      {item.trend && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">趋势分析</h3>
          <div className="flex items-center justify-center gap-4">
            <div className={`text-2xl ${
              item.trend.direction === 'up' ? 'text-green-500' :
              item.trend.direction === 'down' ? 'text-red-500' :
              'text-gray-500'
            }`}>
              {item.trend.direction === 'up' ? '↗' :
               item.trend.direction === 'down' ? '↘' : '→'}
            </div>
            <div>
              <div className="text-xl font-bold">
                {item.trend.percentage}%
              </div>
              <div className="text-sm text-gray-500">
                {item.trend.period}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}