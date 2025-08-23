'use client';

import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
  DocumentDuplicateIcon,
  TrashIcon,
  EyeIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  ClockIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';

interface ManagementToolsProps {
  onSearch: (query: string) => void;
  onFilter: (filters: any) => void;
  onSort: (sortBy: string, order: 'asc' | 'desc') => void;
  onBulkAction: (action: string, selectedIds: string[]) => void;
  selectedItems: string[];
  totalItems: number;
  itemType: 'hero' | 'services' | 'articles' | 'stats';
}

export default function ManagementTools({
  onSearch,
  onFilter,
  onSort,
  onBulkAction,
  selectedItems,
  totalItems,
  itemType
}: ManagementToolsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('updatedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleSort = (field: string) => {
    const newOrder = sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortBy(field);
    setSortOrder(newOrder);
    onSort(field, newOrder);
  };

  const bulkActions = [
    { id: 'publish', label: '批量发布', icon: CheckIcon, color: 'green' },
    { id: 'draft', label: '设为草稿', icon: PencilIcon, color: 'yellow' },
    { id: 'archive', label: '批量归档', icon: ClockIcon, color: 'gray' },
    { id: 'delete', label: '批量删除', icon: TrashIcon, color: 'red' },
    { id: 'duplicate', label: '批量复制', icon: DocumentDuplicateIcon, color: 'blue' },
    { id: 'export', label: '导出选中', icon: ArrowDownTrayIcon, color: 'purple' }
  ];

  const sortOptions = {
    hero: [
      { value: 'updatedAt', label: '更新时间' },
      { value: 'priority', label: '优先级' },
      { value: 'title', label: '标题' },
      { value: 'createdAt', label: '创建时间' }
    ],
    services: [
      { value: 'step', label: '步骤' },
      { value: 'updatedAt', label: '更新时间' },
      { value: 'title', label: '标题' }
    ],
    articles: [
      { value: 'updatedAt', label: '更新时间' },
      { value: 'publishedAt', label: '发布时间' },
      { value: 'title', label: '标题' },
      { value: 'category', label: '分类' },
      { value: 'status', label: '状态' }
    ],
    stats: [
      { value: 'updatedAt', label: '更新时间' },
      { value: 'label', label: '标签' },
      { value: 'value', label: '数值' }
    ]
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4 space-y-4">
      {/* 搜索和基础操作 */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          {/* 搜索框 */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索内容..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </form>

          {/* 过滤器 */}
          <Button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 ${showFilters ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}`}
          >
            <FunnelIcon className="h-4 w-4" />
            筛选
          </Button>

          {/* 排序 */}
          <div className="relative">
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                handleSort(field);
              }}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sortOptions[itemType].map((option) => (
                <React.Fragment key={option.value}>
                  <option value={`${option.value}-desc`}>
                    {option.label} ↓
                  </option>
                  <option value={`${option.value}-asc`}>
                    {option.label} ↑
                  </option>
                </React.Fragment>
              ))}
            </select>
            <ArrowsUpDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* 状态信息 */}
        <div className="text-sm text-gray-500">
          {selectedItems.length > 0 ? (
            <span className="text-blue-600 font-medium">
              已选择 {selectedItems.length} / {totalItems} 项
            </span>
          ) : (
            <span>共 {totalItems} 项</span>
          )}
        </div>
      </div>

      {/* 批量操作 */}
      {selectedItems.length > 0 && (
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <span className="text-sm font-medium text-blue-900">批量操作：</span>
          <div className="flex items-center gap-2 flex-wrap">
            {bulkActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.id}
                  size="sm"
                  onClick={() => onBulkAction(action.id, selectedItems)}
                  className={`flex items-center gap-1 text-xs ${
                    action.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
                    action.color === 'yellow' ? 'bg-yellow-600 hover:bg-yellow-700' :
                    action.color === 'gray' ? 'bg-gray-600 hover:bg-gray-700' :
                    action.color === 'red' ? 'bg-red-600 hover:bg-red-700' :
                    action.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                    'bg-purple-600 hover:bg-purple-700'
                  } text-white`}
                >
                  <Icon className="h-3 w-3" />
                  {action.label}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {/* 高级筛选面板 */}
      {showFilters && (
        <FilterPanel itemType={itemType} onFilter={onFilter} />
      )}
    </div>
  );
}

// 筛选面板组件
function FilterPanel({ itemType, onFilter }: { itemType: string, onFilter: (filters: any) => void }) {
  const [filters, setFilters] = useState<any>({});

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilter({});
  };

  return (
    <div className="border-t border-gray-200 pt-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-gray-900">高级筛选</h4>
        <Button size="sm" onClick={clearFilters} className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200">
          清除筛选
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 状态筛选 */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">状态</label>
          <select
            value={filters.status || ''}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">全部状态</option>
            <option value="published">已发布</option>
            <option value="draft">草稿</option>
            <option value="review">待审核</option>
            <option value="archived">已归档</option>
          </select>
        </div>

        {/* 文章特有筛选 */}
        {itemType === 'articles' && (
          <>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">分类</label>
              <select
                value={filters.category || ''}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">全部分类</option>
                <option value="行业趋势">行业趋势</option>
                <option value="政策法规">政策法规</option>
                <option value="技术创新">技术创新</option>
                <option value="案例分析">案例分析</option>
                <option value="市场动态">市场动态</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">作者</label>
              <input
                type="text"
                value={filters.author || ''}
                onChange={(e) => handleFilterChange('author', e.target.value)}
                placeholder="输入作者名称"
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </>
        )}

        {/* 时间筛选 */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">时间范围</label>
          <select
            value={filters.dateRange || ''}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">全部时间</option>
            <option value="today">今天</option>
            <option value="week">本周</option>
            <option value="month">本月</option>
            <option value="quarter">本季度</option>
            <option value="year">今年</option>
          </select>
        </div>

        {/* 首页轮播特有筛选 */}
        {itemType === 'hero' && (
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">优先级</label>
            <select
              value={filters.priority || ''}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">全部优先级</option>
              <option value="1">优先级 1</option>
              <option value="2">优先级 2</option>
              <option value="3">优先级 3</option>
              <option value="4">优先级 4</option>
              <option value="5">优先级 5</option>
            </select>
          </div>
        )}

        {/* 服务步骤特有筛选 */}
        {itemType === 'services' && (
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">服务步骤</label>
            <select
              value={filters.step || ''}
              onChange={(e) => handleFilterChange('step', e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">全部步骤</option>
              <option value="1">步骤 1</option>
              <option value="2">步骤 2</option>
              <option value="3">步骤 3</option>
              <option value="4">步骤 4</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}