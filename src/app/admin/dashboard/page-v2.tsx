'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  PhotoIcon,
  DocumentTextIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  CloudArrowUpIcon,
  ClockIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ImageUpload from '@/components/admin/ImageUpload';
import ManagementTools from '@/components/admin/ManagementTools';
import ContentPreview from '@/components/admin/ContentPreview';
import DataManager from '@/components/admin/DataManager';
import SystemSettings from '@/components/admin/SystemSettings';
import KeyboardShortcuts, { useKeyboardShortcuts } from '@/components/admin/KeyboardShortcuts';
import OperationHistory, { useOperationHistory } from '@/components/admin/OperationHistory';

// 数据类型定义
interface ContentData {
  version: string;
  lastUpdated: string;
  data: {
    hero: HeroItem[];
    services: ServiceItem[];
    articles: ArticleItem[];
    stats: StatItem[];
  };
  settings: any;
}

interface HeroItem {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  image: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  link?: string;
  priority: number;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}

interface ServiceItem {
  id: string;
  step: number;
  title: string;
  description: string;
  features: string[];
  image: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  icon: string;
  mediaGallery: any[];
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}

interface ArticleItem {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  gallery: any[];
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  status: 'draft' | 'review' | 'published' | 'archived';
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface StatItem {
  id: string;
  label: string;
  value: string;
  unit: string;
  description: string;
  icon: string;
  trend: {
    direction: 'up' | 'down' | 'stable';
    percentage: number;
    period: string;
  };
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export default function AdminDashboardV2() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [contentData, setContentData] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  
  // 新增状态管理
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    dateRange: 'all'
  });
  const [showPreview, setShowPreview] = useState(false);
  const [previewItem, setPreviewItem] = useState<any>(null);
  const [previewType, setPreviewType] = useState<'hero' | 'services' | 'articles' | 'stats'>('hero');
  const [showDataManager, setShowDataManager] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showOperationHistory, setShowOperationHistory] = useState(false);
  
  // 操作历史管理
  const { history, addOperation, undoOperation, clearHistory } = useOperationHistory();
  
  // 快捷键支持
  const { showHelp, setShowHelp, handleShortcut } = useKeyboardShortcuts((action: string) => {
    switch (action) {
      case 'goto_hero':
        setActiveTab('hero');
        break;
      case 'goto_services':
        setActiveTab('services');
        break;
      case 'goto_articles':
        setActiveTab('articles');
        break;
      case 'goto_stats':
        setActiveTab('stats');
        break;
      case 'goto_overview':
        setActiveTab('overview');
        break;
      case 'new_content':
        handleNewContent();
        break;
      case 'search':
        document.getElementById('search-input')?.focus();
        break;
      case 'refresh':
        loadContent();
        break;
      case 'open_settings':
        setShowSettings(true);
        break;
      case 'data_manager':
        setShowDataManager(true);
        break;
      case 'bulk_actions':
        // 显示批量操作面板
        break;
      case 'cancel':
        setShowPreview(false);
        setShowDataManager(false);
        setShowSettings(false);
        setShowHelp(false);
        setShowOperationHistory(false);
        break;
    }
  });

  // 检查登录状态
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn) {
      router.push('/admin');
      return;
    }
    loadContent();
  }, [router]); // loadContent 不变，所以不需要添加到依赖

  // 加载内容数据
  const loadContent = async () => {
    try {
      const response = await fetch('/api/admin/content');
      const data = await response.json();
      
      // 如果是旧版本数据，进行转换
      if (!data.version) {
        const convertedData = convertLegacyData(data);
        setContentData(convertedData);
      } else {
        setContentData(data);
      }
    } catch (error) {
      console.error('加载数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 转换旧版本数据格式
  const convertLegacyData = (legacyData: any): ContentData => {
    return {
      version: '2.0.0',
      lastUpdated: new Date().toISOString(),
      data: {
        hero: legacyData.hero?.map((item: any, index: number) => ({
          id: `hero_${Date.now()}_${index}`,
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
          id: `service_${Date.now()}_${item.step}`,
          step: item.step,
          title: item.title,
          description: item.description,
          features: item.features?.split(', ') || [],
          image: {
            url: '/api/placeholder/800/600',
            alt: item.title,
            width: 800,
            height: 600
          },
          icon: '⚙️',
          mediaGallery: [],
          status: 'published',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })) || [],
        articles: legacyData.articles || [],
        stats: legacyData.stats?.map((item: any, index: number) => ({
          id: `stat_${Date.now()}_${index}`,
          label: item.label,
          value: item.value.replace(/[^0-9]/g, ''),
          unit: item.value.replace(/[0-9]/g, ''),
          description: item.description,
          icon: '📊',
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
        categories: {
          articles: ['行业趋势', '政策法规', '技术创新', '案例分析', '市场动态']
        }
      }
    };
  };

  // 保存内容数据
  const saveContent = async (data: ContentData) => {
    try {
      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          lastUpdated: new Date().toISOString()
        }),
      });

      if (response.ok) {
        alert('保存成功！');
        loadContent();
      } else {
        alert('保存失败，请重试');
      }
    } catch (error) {
      console.error('保存失败:', error);
      alert('保存失败，请重试');
    }
  };

  // 新建内容
  const handleNewContent = () => {
    switch (activeTab) {
      case 'hero':
        // 触发轮播管理组件的添加功能
        break;
      case 'services':
        // 服务不支持新增，跳过
        break;
      case 'articles':
        // 触发文章管理组件的添加功能
        break;
      case 'stats':
        // 触发统计数据管理组件的添加功能
        break;
    }
  };

  // 批量操作
  const handleBulkAction = (action: string, items: string[]) => {
    if (!contentData) return;
    
    // 记录操作到历史
    addOperation({
      type: action,
      description: `${action === 'publish' ? '发布' : action === 'draft' ? '转为草稿' : action === 'archive' ? '归档' : action === 'delete' ? '删除' : action}了 ${items.length} 个项目`,
      items: items,
      tab: activeTab,
      metadata: {
        affectedCount: items.length
      }
    });
    
    switch (action) {
      case 'publish':
        updateItemsStatus(items, 'published');
        break;
      case 'draft':
        updateItemsStatus(items, 'draft');
        break;
      case 'archive':
        updateItemsStatus(items, 'archived');
        break;
      case 'delete':
        if (confirm(`确定要删除 ${items.length} 个项目吗？`)) {
          deleteItems(items);
        }
        break;
    }
    
    setSelectedItems([]);
  };

  // 更新状态
  const updateItemsStatus = (itemIds: string[], status: string) => {
    if (!contentData) return;
    
    const updatedContent = { ...contentData };
    const dataKey = activeTab as keyof typeof contentData.data;
    
    if (updatedContent.data[dataKey]) {
      (updatedContent.data[dataKey] as any[]) = (updatedContent.data[dataKey] as any[]).map(item => 
        itemIds.includes(item.id) 
          ? { ...item, status, updatedAt: new Date().toISOString() }
          : item
      );
      saveContent(updatedContent);
    }
  };

  // 删除项目
  const deleteItems = (itemIds: string[]) => {
    if (!contentData) return;
    
    const updatedContent = { ...contentData };
    const dataKey = activeTab as keyof typeof contentData.data;
    
    if (updatedContent.data[dataKey]) {
      (updatedContent.data[dataKey] as any[]) = (updatedContent.data[dataKey] as any[]).filter(item => 
        !itemIds.includes(item.id)
      );
      saveContent(updatedContent);
    }
  };

  // 预览内容
  const handlePreview = (item: any, type: 'hero' | 'services' | 'articles' | 'stats') => {
    setPreviewItem(item);
    setPreviewType(type);
    setShowPreview(true);
  };

  // 状态变更
  const handleStatusChange = (itemId: string, newStatus: string, type: string) => {
    updateItemsStatus([itemId], newStatus);
  };

  // 退出登录
  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    router.push('/admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  if (!contentData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">数据加载失败</p>
          <Button onClick={loadContent}>重新加载</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div>
                  <h1 className="text-lg font-semibold">Methas 管理后台</h1>
                  <p className="text-xs text-gray-500">内容管理系统 v{contentData.version}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                最后更新：{new Date(contentData.lastUpdated).toLocaleString('zh-CN')}
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => setShowDataManager(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  size="sm"
                >
                  数据管理
                </Button>
                <Button 
                  onClick={() => setShowOperationHistory(true)}
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                  size="sm"
                >
                  <ClockIcon className="w-4 h-4 mr-1" />
                  历史
                </Button>
                <Button 
                  onClick={() => setShowSettings(true)}
                  className="bg-gray-600 hover:bg-gray-700 text-white"
                  size="sm"
                >
                  <Cog6ToothIcon className="w-4 h-4 mr-1" />
                  设置
                </Button>
                <Button 
                  onClick={() => setShowHelp(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  size="sm"
                >
                  ?
                </Button>
                <Button 
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  退出登录
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 导航标签 */}
        <div className="mb-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            {[
              { id: 'overview', name: '概览', icon: ChartBarIcon },
              { id: 'hero', name: '首页轮播', icon: PhotoIcon },
              { id: 'services', name: '服务介绍', icon: Cog6ToothIcon },
              { id: 'articles', name: '碳智观察', icon: DocumentTextIcon },
              { id: 'stats', name: '统计数据', icon: ChartBarIcon },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* 概览页面 */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <PhotoIcon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500">首页轮播</dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {contentData.data.hero.length} 个
                      </dd>
                    </dl>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Cog6ToothIcon className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500">服务步骤</dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {contentData.data.services.length} 个
                      </dd>
                    </dl>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <DocumentTextIcon className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500">文章数量</dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {contentData.data.articles.length} 篇
                      </dd>
                    </dl>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ChartBarIcon className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500">统计数据</dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {contentData.data.stats.length} 项
                      </dd>
                    </dl>
                  </div>
                </div>
              </Card>
            </div>

            {/* 快速操作 */}
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">快速操作</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button 
                  onClick={() => setActiveTab('hero')}
                  className="justify-start"
                >
                  <PhotoIcon className="w-5 h-5 mr-2" />
                  管理轮播图
                </Button>
                <Button 
                  onClick={() => setActiveTab('services')}
                  className="justify-start"
                >
                  <Cog6ToothIcon className="w-5 h-5 mr-2" />
                  编辑服务
                </Button>
                <Button 
                  onClick={() => setActiveTab('articles')}
                  className="justify-start"
                >
                  <PlusIcon className="w-5 h-5 mr-2" />
                  发布文章
                </Button>
                <Button 
                  onClick={() => setActiveTab('stats')}
                  className="justify-start"
                >
                  <ChartBarIcon className="w-5 h-5 mr-2" />
                  更新数据
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* 首页轮播管理 */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <ManagementTools
              type="hero"
              items={contentData.data.hero}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filters={filters}
              onFiltersChange={setFilters}
              onBulkAction={handleBulkAction}
              onPreview={(item) => handlePreview(item, 'hero')}
            />
            <HeroManagement 
              data={contentData.data.hero}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
              searchTerm={searchTerm}
              filters={filters}
              onPreview={(item) => handlePreview(item, 'hero')}
              onSave={(newData) => {
                const updatedContent = {
                  ...contentData,
                  data: { ...contentData.data, hero: newData }
                };
                saveContent(updatedContent);
              }}
            />
          </div>
        )}

        {/* 服务介绍管理 */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <ManagementTools
              type="services"
              items={contentData.data.services}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filters={filters}
              onFiltersChange={setFilters}
              onBulkAction={handleBulkAction}
              onPreview={(item) => handlePreview(item, 'services')}
            />
            <ServicesManagement 
              data={contentData.data.services}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
              searchTerm={searchTerm}
              filters={filters}
              onPreview={(item) => handlePreview(item, 'services')}
              onSave={(newData) => {
                const updatedContent = {
                  ...contentData,
                  data: { ...contentData.data, services: newData }
                };
                saveContent(updatedContent);
              }}
            />
          </div>
        )}

        {/* 文章管理 */}
        {activeTab === 'articles' && (
          <div className="space-y-6">
            <ManagementTools
              type="articles"
              items={contentData.data.articles}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filters={filters}
              onFiltersChange={setFilters}
              onBulkAction={handleBulkAction}
              onPreview={(item) => handlePreview(item, 'articles')}
            />
            <ArticlesManagement 
              data={contentData.data.articles}
              categories={contentData.settings.categories.articles}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
              searchTerm={searchTerm}
              filters={filters}
              onPreview={(item) => handlePreview(item, 'articles')}
              onSave={(newData) => {
                const updatedContent = {
                  ...contentData,
                  data: { ...contentData.data, articles: newData }
                };
                saveContent(updatedContent);
              }}
            />
          </div>
        )}

        {/* 统计数据管理 */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <ManagementTools
              type="stats"
              items={contentData.data.stats}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filters={filters}
              onFiltersChange={setFilters}
              onBulkAction={handleBulkAction}
              onPreview={(item) => handlePreview(item, 'stats')}
            />
            <StatsManagement 
              data={contentData.data.stats}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
              searchTerm={searchTerm}
              filters={filters}
              onPreview={(item) => handlePreview(item, 'stats')}
              onSave={(newData) => {
                const updatedContent = {
                  ...contentData,
                  data: { ...contentData.data, stats: newData }
                };
                saveContent(updatedContent);
              }}
            />
          </div>
        )}
      </div>

      {/* 内容预览模态框 */}
      <ContentPreview
        item={previewItem}
        type={previewType}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onEdit={() => {
          setShowPreview(false);
          // 触发编辑功能
        }}
        onStatusChange={(status) => handleStatusChange(previewItem?.id, status, previewType)}
      />

      {/* 数据管理模态框 */}
      <DataManager
        isOpen={showDataManager}
        onClose={() => setShowDataManager(false)}
        contentData={contentData}
        onDataChange={(newData) => {
          setContentData(newData);
          saveContent(newData);
        }}
      />

      {/* 系统设置模态框 */}
      <SystemSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onSettingsChange={(settings) => {
          // 处理设置变更
          console.log('设置已更新:', settings);
        }}
      />

      {/* 操作历史模态框 */}
      <OperationHistory
        isOpen={showOperationHistory}
        onClose={() => setShowOperationHistory(false)}
        history={history}
        onUndo={undoOperation}
        onClearHistory={clearHistory}
      />

      {/* 键盘快捷键帮助 */}
      <KeyboardShortcuts
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
        onShortcut={handleShortcut}
      />
    </div>
  );
}

// 首页轮播管理组件  
function HeroManagement({ 
  data, 
  selectedItems,
  onSelectionChange,
  searchTerm,
  filters,
  onPreview,
  onSave 
}: { 
  data: HeroItem[], 
  selectedItems?: string[],
  onSelectionChange?: (items: string[]) => void,
  searchTerm?: string,
  filters?: any,
  onPreview?: (item: HeroItem) => void,
  onSave: (data: HeroItem[]) => void 
}) {
  const [items, setItems] = useState<HeroItem[]>(data);
  const [editingItem, setEditingItem] = useState<HeroItem | null>(null);

  const addItem = () => {
    const newItem: HeroItem = {
      id: `hero_${Date.now()}`,
      title: '',
      subtitle: '',
      buttonText: '了解更多',
      image: {
        url: '',
        alt: '',
        width: 1920,
        height: 1080
      },
      priority: items.length + 1,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setEditingItem(newItem);
  };

  const saveItem = (item: HeroItem) => {
    const updatedItems = editingItem?.id && items.find(i => i.id === editingItem.id)
      ? items.map(i => i.id === item.id ? { ...item, updatedAt: new Date().toISOString() } : i)
      : [...items, { ...item, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }];
    
    setItems(updatedItems);
    setEditingItem(null);
    onSave(updatedItems);
  };

  const deleteItem = (id: string) => {
    if (confirm('确定要删除这个轮播项吗？')) {
      const updatedItems = items.filter(i => i.id !== id);
      setItems(updatedItems);
      onSave(updatedItems);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">首页轮播管理</h2>
        <Button onClick={addItem}>
          <PlusIcon className="w-5 h-5 mr-2" />
          添加轮播图
        </Button>
      </div>

      <div className="grid gap-6">
        {items.map((item) => (
          <Card key={item.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h3 className="font-medium">{item.title || '未命名轮播'}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  item.status === 'published' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status === 'published' ? '已发布' : '草稿'}
                </span>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={() => setEditingItem(item)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <PencilIcon className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => deleteItem(item.id)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <TrashIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="flex gap-4">
              {item.image.url && (
                <Image
                  src={item.image.url}
                  alt={item.image.alt}
                  width={128}
                  height={80}
                  className="w-32 h-20 object-cover rounded-lg"
                />
              )}
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-600">{item.subtitle}</p>
                <p className="text-xs text-gray-500 mt-2">
                  更新时间：{new Date(item.updatedAt).toLocaleString('zh-CN')}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 编辑模态框 */}
      {editingItem && (
        <HeroEditModal
          item={editingItem}
          onSave={saveItem}
          onCancel={() => setEditingItem(null)}
        />
      )}
    </div>
  );
}

// 首页轮播编辑模态框
function HeroEditModal({ item, onSave, onCancel }: {
  item: HeroItem;
  onSave: (item: HeroItem) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState(item);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.subtitle || !formData.image.url) {
      alert('请填写所有必填字段');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">
            {item.id.startsWith('hero_' + Date.now()) ? '添加轮播图' : '编辑轮播图'}
          </h3>
          <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-lg">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              标题 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入标题"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              副标题 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入副标题"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">按钮文字</label>
            <input
              type="text"
              value={formData.buttonText}
              onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="了解更多"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">跳转链接</label>
            <input
              type="text"
              value={formData.link || ''}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="/solutions"
            />
          </div>

          <ImageUpload
            label="轮播图片"
            value={formData.image.url}
            onChange={(url, metadata) => {
              setFormData({
                ...formData,
                image: {
                  url,
                  alt: formData.title,
                  width: metadata?.width || 1920,
                  height: metadata?.height || 1080
                }
              });
            }}
            category="hero"
            required
          />

          <div>
            <label className="block text-sm font-medium mb-2">状态</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'published' | 'draft' })}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">草稿</option>
              <option value="published">发布</option>
            </select>
          </div>

          <div className="flex gap-3">
            <Button type="submit" className="flex-1">
              保存
            </Button>
            <Button type="button" onClick={onCancel} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700">
              取消
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 服务介绍管理组件
function ServicesManagement({ 
  data, 
  selectedItems,
  onSelectionChange,
  searchTerm,
  filters,
  onPreview,
  onSave 
}: { 
  data: ServiceItem[], 
  selectedItems?: string[],
  onSelectionChange?: (items: string[]) => void,
  searchTerm?: string,
  filters?: any,
  onPreview?: (item: ServiceItem) => void,
  onSave: (data: ServiceItem[]) => void 
}) {
  const [items, setItems] = useState<ServiceItem[]>(data);
  const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);

  const editItem = (item: ServiceItem) => {
    setEditingItem(item);
  };

  const saveItem = (item: ServiceItem) => {
    const updatedItems = items.map(i => 
      i.id === item.id ? { ...item, updatedAt: new Date().toISOString() } : i
    );
    setItems(updatedItems);
    setEditingItem(null);
    onSave(updatedItems);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">服务介绍管理</h2>
      </div>

      <div className="grid gap-6">
        {items.map((item) => (
          <Card key={item.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {item.step}
                </span>
                <h3 className="font-medium">{item.title}</h3>
              </div>
              <Button 
                size="sm" 
                onClick={() => editItem(item)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <PencilIcon className="w-4 h-4 mr-2" />
                编辑
              </Button>
            </div>
            <div className="flex gap-4">
              {item.image.url && (
                <Image
                  src={item.image.url}
                  alt={item.image.alt}
                  width={128}
                  height={96}
                  className="w-32 h-24 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <p className="text-gray-600 mb-2">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.features.map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 编辑模态框 */}
      {editingItem && (
        <ServiceEditModal
          item={editingItem}
          onSave={saveItem}
          onCancel={() => setEditingItem(null)}
        />
      )}
    </div>
  );
}

// 服务编辑模态框
function ServiceEditModal({ item, onSave, onCancel }: {
  item: ServiceItem;
  onSave: (item: ServiceItem) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    ...item,
    featuresText: item.features.join(', ')
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      alert('请填写所有必填字段');
      return;
    }
    
    const updatedItem = {
      ...formData,
      features: formData.featuresText.split(',').map(f => f.trim()).filter(f => f)
    };
    delete (updatedItem as any).featuresText;
    
    onSave(updatedItem);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">编辑服务步骤</h3>
          <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-lg">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">步骤</label>
              <input
                type="number"
                value={formData.step}
                onChange={(e) => setFormData({ ...formData, step: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
                max="10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">图标</label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="⚙️"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              服务标题 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入服务标题"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              服务描述 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入服务描述"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              服务特性 <span className="text-gray-500">(用逗号分隔)</span>
            </label>
            <input
              type="text"
              value={formData.featuresText}
              onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="实地考察, 数据采集, 问题诊断"
            />
          </div>

          <ImageUpload
            label="服务配图"
            value={formData.image.url}
            onChange={(url, metadata) => {
              setFormData({
                ...formData,
                image: {
                  url,
                  alt: formData.title,
                  width: metadata?.width || 800,
                  height: metadata?.height || 600
                }
              });
            }}
            category="services"
          />

          <div className="flex gap-3">
            <Button type="submit" className="flex-1">
              保存
            </Button>
            <Button type="button" onClick={onCancel} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700">
              取消
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 文章管理组件
function ArticlesManagement({ 
  data, 
  categories, 
  selectedItems,
  onSelectionChange,
  searchTerm,
  filters,
  onPreview,
  onSave 
}: { 
  data: ArticleItem[], 
  categories: string[], 
  selectedItems?: string[],
  onSelectionChange?: (items: string[]) => void,
  searchTerm?: string,
  filters?: any,
  onPreview?: (item: ArticleItem) => void,
  onSave: (data: ArticleItem[]) => void 
}) {
  const [items, setItems] = useState<ArticleItem[]>(data);
  const [editingItem, setEditingItem] = useState<ArticleItem | null>(null);

  const addArticle = () => {
    const newArticle: ArticleItem = {
      id: `article_${Date.now()}`,
      title: '',
      category: categories[0],
      excerpt: '',
      content: '',
      coverImage: {
        url: '',
        alt: '',
        width: 800,
        height: 450
      },
      gallery: [],
      tags: [],
      author: {
        name: 'Methas 研究团队',
        avatar: '/images/authors/team.jpg'
      },
      publishedAt: new Date().toISOString(),
      status: 'draft',
      seo: {
        metaTitle: '',
        metaDescription: '',
        keywords: ''
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setEditingItem(newArticle);
  };

  const saveArticle = (article: ArticleItem) => {
    const updatedItems = editingItem?.id && items.find(i => i.id === editingItem.id)
      ? items.map(i => i.id === article.id ? { ...article, updatedAt: new Date().toISOString() } : i)
      : [...items, { ...article, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }];
    
    setItems(updatedItems);
    setEditingItem(null);
    onSave(updatedItems);
  };

  const deleteArticle = (id: string) => {
    if (confirm('确定要删除这篇文章吗？')) {
      const updatedItems = items.filter(i => i.id !== id);
      setItems(updatedItems);
      onSave(updatedItems);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">碳智观察管理</h2>
        <Button onClick={addArticle}>
          <PlusIcon className="w-5 h-5 mr-2" />
          发布文章
        </Button>
      </div>

      <div className="grid gap-6">
        {items.length === 0 ? (
          <Card className="p-8 text-center">
            <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">暂无文章</h3>
            <p className="text-gray-600 mb-4">发布您的第一篇碳智观察文章</p>
            <Button onClick={addArticle}>
              <PlusIcon className="w-5 h-5 mr-2" />
              发布文章
            </Button>
          </Card>
        ) : (
          items.map((article) => (
            <Card key={article.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  {article.coverImage.url && (
                    <Image
                      src={article.coverImage.url}
                      alt={article.coverImage.alt}
                      width={96}
                      height={64}
                      className="w-24 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-gray-900 truncate">{article.title || '未命名文章'}</h3>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs flex-shrink-0">
                        {article.category}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs flex-shrink-0 ${
                        article.status === 'published' 
                          ? 'bg-green-100 text-green-800'
                          : article.status === 'review'
                          ? 'bg-yellow-100 text-yellow-800'  
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {article.status === 'published' ? '已发布' : 
                         article.status === 'review' ? '待审核' : '草稿'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>作者：{article.author.name}</span>
                      <span>发布：{new Date(article.publishedAt).toLocaleDateString('zh-CN')}</span>
                      {article.tags.length > 0 && (
                        <span>标签：{article.tags.slice(0, 2).join(', ')}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button 
                    size="sm" 
                    onClick={() => setEditingItem(article)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => deleteArticle(article.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* 文章编辑模态框 */}
      {editingItem && (
        <ArticleEditModal
          item={editingItem}
          categories={categories}
          onSave={saveArticle}
          onCancel={() => setEditingItem(null)}
        />
      )}
    </div>
  );
}

// 文章编辑模态框
function ArticleEditModal({ item, categories, onSave, onCancel }: {
  item: ArticleItem;
  categories: string[];
  onSave: (item: ArticleItem) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    ...item,
    tagsText: item.tags.join(', ')
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.excerpt || !formData.content) {
      alert('请填写所有必填字段');
      return;
    }
    
    const updatedItem = {
      ...formData,
      tags: formData.tagsText.split(',').map(t => t.trim()).filter(t => t),
      seo: {
        ...formData.seo,
        metaTitle: formData.seo.metaTitle || formData.title,
        metaDescription: formData.seo.metaDescription || formData.excerpt
      }
    };
    delete (updatedItem as any).tagsText;
    
    onSave(updatedItem);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">
            {item.id.startsWith('article_' + Date.now()) ? '发布文章' : '编辑文章'}
          </h3>
          <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-lg">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 基本信息 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                文章标题 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="请输入文章标题"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">文章分类</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">发布状态</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as ArticleItem['status'] })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">草稿</option>
                <option value="review">待审核</option>
                <option value="published">发布</option>
                <option value="archived">归档</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              文章摘要 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入文章摘要"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              文章内容 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="请输入文章内容"
              rows={8}
              required
            />
          </div>

          <ImageUpload
            label="封面图片"
            value={formData.coverImage.url}
            onChange={(url, metadata) => {
              setFormData({
                ...formData,
                coverImage: {
                  url,
                  alt: formData.title,
                  width: metadata?.width || 800,
                  height: metadata?.height || 450
                }
              });
            }}
            category="articles"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                标签 <span className="text-gray-500">(用逗号分隔)</span>
              </label>
              <input
                type="text"
                value={formData.tagsText}
                onChange={(e) => setFormData({ ...formData, tagsText: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="甲烷减排, 技术创新, 政策解读"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">作者姓名</label>
              <input
                type="text"
                value={formData.author.name}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  author: { ...formData.author, name: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Methas 研究团队"
              />
            </div>
          </div>

          {/* SEO 设置 */}
          <div className="border-t pt-6">
            <h4 className="font-medium mb-4">SEO 设置</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">SEO 标题</label>
                <input
                  type="text"
                  value={formData.seo.metaTitle}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    seo: { ...formData.seo, metaTitle: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="留空则使用文章标题"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">SEO 描述</label>
                <textarea
                  value={formData.seo.metaDescription}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    seo: { ...formData.seo, metaDescription: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="留空则使用文章摘要"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">关键词</label>
                <input
                  type="text"
                  value={formData.seo.keywords}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    seo: { ...formData.seo, keywords: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="甲烷减排,减排技术,碳中和,环保技术"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="submit" className="flex-1">
              {formData.status === 'published' ? '发布文章' : '保存'}
            </Button>
            <Button type="button" onClick={onCancel} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700">
              取消
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 统计数据管理组件
function StatsManagement({ 
  data, 
  selectedItems,
  onSelectionChange,
  searchTerm,
  filters,
  onPreview,
  onSave 
}: { 
  data: StatItem[], 
  selectedItems?: string[],
  onSelectionChange?: (items: string[]) => void,
  searchTerm?: string,
  filters?: any,
  onPreview?: (item: StatItem) => void,
  onSave: (data: StatItem[]) => void 
}) {
  const [items, setItems] = useState<StatItem[]>(data);
  const [editingItem, setEditingItem] = useState<StatItem | null>(null);

  const addStat = () => {
    const newStat: StatItem = {
      id: `stat_${Date.now()}`,
      label: '',
      value: '',
      unit: '',
      description: '',
      icon: '📊',
      trend: {
        direction: 'stable',
        percentage: 0,
        period: '同比去年'
      },
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setEditingItem(newStat);
  };

  const saveStat = (stat: StatItem) => {
    const updatedItems = editingItem?.id && items.find(i => i.id === editingItem.id)
      ? items.map(i => i.id === stat.id ? { ...stat, updatedAt: new Date().toISOString() } : i)
      : [...items, { ...stat, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }];
    
    setItems(updatedItems);
    setEditingItem(null);
    onSave(updatedItems);
  };

  const deleteStat = (id: string) => {
    if (confirm('确定要删除这个统计数据吗？')) {
      const updatedItems = items.filter(i => i.id !== id);
      setItems(updatedItems);
      onSave(updatedItems);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">统计数据管理</h2>
        <Button onClick={addStat}>
          <PlusIcon className="w-5 h-5 mr-2" />
          添加数据
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((stat) => (
          <Card key={stat.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{stat.icon}</span>
                <div>
                  <h3 className="font-medium">{stat.label}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold">{stat.value}</span>
                    <span className="text-lg text-gray-600">{stat.unit}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={() => setEditingItem(stat)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <PencilIcon className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => deleteStat(stat.id)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <TrashIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-2">{stat.description}</p>
            {stat.trend && (
              <div className="flex items-center gap-2 text-xs">
                <span className={`px-2 py-1 rounded-full ${
                  stat.trend.direction === 'up' 
                    ? 'bg-green-100 text-green-700' 
                    : stat.trend.direction === 'down'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {stat.trend.direction === 'up' ? '↗' : stat.trend.direction === 'down' ? '↘' : '→'} 
                  {stat.trend.percentage}%
                </span>
                <span className="text-gray-500">{stat.trend.period}</span>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* 统计数据编辑模态框 */}
      {editingItem && (
        <StatEditModal
          item={editingItem}
          onSave={saveStat}
          onCancel={() => setEditingItem(null)}
        />
      )}
    </div>
  );
}

// 统计数据编辑模态框
function StatEditModal({ item, onSave, onCancel }: {
  item: StatItem;
  onSave: (item: StatItem) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState(item);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.label || !formData.value || !formData.description) {
      alert('请填写所有必填字段');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">
            {item.id.startsWith('stat_' + Date.now()) ? '添加统计数据' : '编辑统计数据'}
          </h3>
          <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-lg">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">图标</label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="📊"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                标签 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.label}
                onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="减排效率"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                数值 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="85"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">单位</label>
              <input
                type="text"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="%"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              描述 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="平均甲烷减排率"
              rows={2}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">趋势方向</label>
            <select
              value={formData.trend.direction}
              onChange={(e) => setFormData({
                ...formData,
                trend: { ...formData.trend, direction: e.target.value as 'up' | 'down' | 'stable' }
              })}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="up">上升</option>
              <option value="down">下降</option>
              <option value="stable">稳定</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">趋势百分比</label>
              <input
                type="number"
                value={formData.trend.percentage}
                onChange={(e) => setFormData({
                  ...formData,
                  trend: { ...formData.trend, percentage: parseInt(e.target.value) || 0 }
                })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="12"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">对比期间</label>
              <input
                type="text"
                value={formData.trend.period}
                onChange={(e) => setFormData({
                  ...formData,
                  trend: { ...formData.trend, period: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="同比去年"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="submit" className="flex-1">
              保存
            </Button>
            <Button type="button" onClick={onCancel} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700">
              取消
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}