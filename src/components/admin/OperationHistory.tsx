'use client';

import React, { useState } from 'react';
import {
  ClockIcon,
  XMarkIcon,
  ArrowUturnLeftIcon,
  TrashIcon,
  EyeIcon,
  PencilIcon,
  CheckCircleIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';

interface OperationHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  history: OperationRecord[];
  onUndo: (operationId: string) => void;
  onClearHistory: () => void;
}

interface OperationRecord {
  id: string;
  type: string;
  description: string;
  items: string[];
  timestamp: string;
  tab: string;
  undoable: boolean;
  metadata?: {
    oldValues?: any[];
    newValues?: any[];
    affectedCount?: number;
  };
}

export default function OperationHistory({
  isOpen,
  onClose,
  history,
  onUndo,
  onClearHistory
}: OperationHistoryProps) {
  const [filter, setFilter] = useState<'all' | 'today' | 'week'>('all');

  if (!isOpen) return null;

  const getOperationIcon = (type: string) => {
    switch (type) {
      case 'create':
      case 'add':
        return <PencilIcon className="w-4 h-4 text-green-600" />;
      case 'edit':
      case 'update':
        return <PencilIcon className="w-4 h-4 text-blue-600" />;
      case 'delete':
        return <TrashIcon className="w-4 h-4 text-red-600" />;
      case 'publish':
        return <CheckCircleIcon className="w-4 h-4 text-green-600" />;
      case 'draft':
        return <ClockIcon className="w-4 h-4 text-yellow-600" />;
      case 'archive':
        return <DocumentDuplicateIcon className="w-4 h-4 text-gray-600" />;
      case 'duplicate':
        return <DocumentDuplicateIcon className="w-4 h-4 text-blue-600" />;
      case 'import':
        return <ArrowUturnLeftIcon className="w-4 h-4 text-purple-600" />;
      case 'export':
        return <ArrowUturnLeftIcon className="w-4 h-4 text-orange-600" />;
      default:
        return <ClockIcon className="w-4 h-4 text-gray-600" />;
    }
  };

  const getOperationText = (type: string) => {
    switch (type) {
      case 'create':
      case 'add':
        return '创建';
      case 'edit':
      case 'update':
        return '编辑';
      case 'delete':
        return '删除';
      case 'publish':
        return '发布';
      case 'draft':
        return '转为草稿';
      case 'archive':
        return '归档';
      case 'duplicate':
        return '复制';
      case 'import':
        return '导入';
      case 'export':
        return '导出';
      default:
        return type;
    }
  };

  const getTabText = (tab: string) => {
    switch (tab) {
      case 'hero':
        return '首页轮播';
      case 'services':
        return '服务介绍';
      case 'articles':
        return '碳智观察';
      case 'stats':
        return '统计数据';
      default:
        return tab;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return '刚刚';
    if (diffMins < 60) return `${diffMins}分钟前`;
    if (diffHours < 24) return `${diffHours}小时前`;
    if (diffDays < 7) return `${diffDays}天前`;
    
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredHistory = history.filter(record => {
    const recordDate = new Date(record.timestamp);
    const now = new Date();
    
    switch (filter) {
      case 'today':
        return recordDate.toDateString() === now.toDateString();
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return recordDate >= weekAgo;
      default:
        return true;
    }
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* 头部 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <ClockIcon className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">操作历史</h2>
              <p className="text-sm text-gray-500">查看和撤销最近的操作</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* 过滤器和操作 */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {[
                { value: 'all', label: '全部' },
                { value: 'today', label: '今天' },
                { value: 'week', label: '本周' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value as 'all' | 'today' | 'week')}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    filter === option.value
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <span className="text-sm text-gray-500">
                共 {filteredHistory.length} 条记录
              </span>
              {history.length > 0 && (
                <Button
                  onClick={() => {
                    if (confirm('确定要清空所有操作历史吗？此操作不可撤销。')) {
                      onClearHistory();
                    }
                  }}
                  size="sm"
                  className="bg-red-100 text-red-700 hover:bg-red-200"
                >
                  清空历史
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* 历史记录列表 */}
        <div className="flex-1 overflow-y-auto">
          {filteredHistory.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-center">
              <div>
                <ClockIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">暂无操作记录</h3>
                <p className="text-gray-600">
                  {filter === 'all' ? '还没有任何操作记录' : `${filter === 'today' ? '今天' : '本周'}没有操作记录`}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {filteredHistory.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                >
                  {/* 操作图标 */}
                  <div className="flex-shrink-0">
                    {getOperationIcon(record.type)}
                  </div>

                  {/* 操作信息 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900">
                        {getOperationText(record.type)}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {getTabText(record.tab)}
                      </span>
                      {record.metadata?.affectedCount && (
                        <span className="text-sm text-gray-500">
                          影响 {record.metadata.affectedCount} 个项目
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {record.description || `${getOperationText(record.type)}了 ${record.items.length} 个项目`}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>{formatTimestamp(record.timestamp)}</span>
                      <span>ID: {record.items.slice(0, 2).join(', ')}{record.items.length > 2 ? '...' : ''}</span>
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      size="sm"
                      className="bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      <EyeIcon className="w-4 h-4" />
                    </Button>
                    {record.undoable && (
                      <Button
                        onClick={() => {
                          if (confirm('确定要撤销这个操作吗？')) {
                            onUndo(record.id);
                          }
                        }}
                        size="sm"
                        className="bg-orange-100 text-orange-700 hover:bg-orange-200"
                      >
                        <ArrowUturnLeftIcon className="w-4 h-4 mr-1" />
                        撤销
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 底部统计 */}
        {filteredHistory.length > 0 && (
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <div className="flex gap-6 text-gray-600">
                <span>可撤销: {filteredHistory.filter(r => r.undoable).length}</span>
                <span>今天: {history.filter(r => {
                  const recordDate = new Date(r.timestamp);
                  const today = new Date();
                  return recordDate.toDateString() === today.toDateString();
                }).length}</span>
                <span>本周: {history.filter(r => {
                  const recordDate = new Date(r.timestamp);
                  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                  return recordDate >= weekAgo;
                }).length}</span>
              </div>
              <div className="text-xs text-gray-500">
                历史记录保留最近50条操作
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 操作历史管理 Hook
export function useOperationHistory() {
  const [history, setHistory] = useState<OperationRecord[]>([]);

  const addOperation = (operation: Omit<OperationRecord, 'id' | 'timestamp' | 'undoable'>) => {
    const record: OperationRecord = {
      ...operation,
      id: `op_${Date.now()}`,
      timestamp: new Date().toISOString(),
      undoable: ['edit', 'delete', 'publish', 'draft', 'archive'].includes(operation.type)
    };
    
    setHistory(prev => [record, ...prev.slice(0, 49)]); // 保留最近50条
    return record.id;
  };

  const undoOperation = (operationId: string) => {
    const operation = history.find(op => op.id === operationId);
    if (!operation || !operation.undoable) {
      return false;
    }

    // 这里应该实现具体的撤销逻辑
    // 根据操作类型和元数据恢复之前的状态
    
    // 从历史记录中移除已撤销的操作
    setHistory(prev => prev.filter(op => op.id !== operationId));
    
    return true;
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return {
    history,
    addOperation,
    undoOperation,
    clearHistory
  };
}