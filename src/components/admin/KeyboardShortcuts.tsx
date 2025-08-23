'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  CommandLineIcon,
  XMarkIcon,
  KeyIcon,
  RocketLaunchIcon,
  BoltIcon,
  PlusIcon,
  PencilIcon,
  DocumentDuplicateIcon,
  TrashIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

interface KeyboardShortcutsProps {
  isOpen: boolean;
  onClose: () => void;
  onShortcut: (action: string) => void;
}

interface Shortcut {
  keys: string[];
  description: string;
  action: string;
  category: string;
}

const shortcuts: Shortcut[] = [
  // 导航快捷键
  { keys: ['?'], description: '显示快捷键帮助', action: 'show_help', category: '导航' },
  { keys: ['g', 'h'], description: '跳转到首页轮播', action: 'goto_hero', category: '导航' },
  { keys: ['g', 's'], description: '跳转到服务介绍', action: 'goto_services', category: '导航' },
  { keys: ['g', 'a'], description: '跳转到碳智观察', action: 'goto_articles', category: '导航' },
  { keys: ['g', 't'], description: '跳转到统计数据', action: 'goto_stats', category: '导航' },
  { keys: ['g', 'o'], description: '跳转到概览', action: 'goto_overview', category: '导航' },

  // 内容操作
  { keys: ['n'], description: '新建内容', action: 'new_content', category: '内容' },
  { keys: ['e'], description: '编辑选中内容', action: 'edit_content', category: '内容' },
  { keys: ['d'], description: '复制选中内容', action: 'duplicate_content', category: '内容' },
  { keys: ['Del'], description: '删除选中内容', action: 'delete_content', category: '内容' },
  { keys: ['p'], description: '预览选中内容', action: 'preview_content', category: '内容' },
  { keys: ['Shift', 'p'], description: '发布选中内容', action: 'publish_content', category: '内容' },

  // 编辑操作
  { keys: ['Ctrl', 's'], description: '保存', action: 'save', category: '编辑' },
  { keys: ['Ctrl', 'z'], description: '撤销', action: 'undo', category: '编辑' },
  { keys: ['Ctrl', 'y'], description: '重做', action: 'redo', category: '编辑' },
  { keys: ['Escape'], description: '取消/关闭', action: 'cancel', category: '编辑' },

  // 选择和操作
  { keys: ['j'], description: '下一项', action: 'next_item', category: '选择' },
  { keys: ['k'], description: '上一项', action: 'prev_item', category: '选择' },
  { keys: ['Space'], description: '选择/取消选择', action: 'toggle_select', category: '选择' },
  { keys: ['a'], description: '全选', action: 'select_all', category: '选择' },
  { keys: ['Ctrl', 'a'], description: '全选（替代）', action: 'select_all', category: '选择' },

  // 搜索和筛选
  { keys: ['/'], description: '搜索', action: 'search', category: '搜索' },
  { keys: ['f'], description: '筛选', action: 'filter', category: '搜索' },
  { keys: ['r'], description: '刷新', action: 'refresh', category: '搜索' },

  // 系统操作
  { keys: ['Ctrl', ','], description: '打开设置', action: 'open_settings', category: '系统' },
  { keys: ['Ctrl', 'Shift', 'd'], description: '数据管理', action: 'data_manager', category: '系统' },
  { keys: ['Ctrl', 'Shift', 'b'], description: '批量操作', action: 'bulk_actions', category: '系统' }
];

export default function KeyboardShortcuts({
  isOpen,
  onClose,
  onShortcut
}: KeyboardShortcutsProps) {
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [commandMode, setCommandMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // 处理键盘事件
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // 如果在输入框中，不处理快捷键
    if (event.target instanceof HTMLInputElement || 
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement) {
      return;
    }

    const key = event.key;
    const ctrl = event.ctrlKey;
    const shift = event.shiftKey;
    const alt = event.altKey;

    // 构建按键组合
    const keyCombo: string[] = [];
    if (ctrl) keyCombo.push('Ctrl');
    if (shift) keyCombo.push('Shift');
    if (alt) keyCombo.push('Alt');
    keyCombo.push(key);

    // 查找匹配的快捷键
    const matchedShortcut = shortcuts.find(shortcut => {
      if (shortcut.keys.length !== keyCombo.length) return false;
      return shortcut.keys.every((k, i) => k.toLowerCase() === keyCombo[i].toLowerCase());
    });

    if (matchedShortcut) {
      event.preventDefault();
      onShortcut(matchedShortcut.action);
    }

    // 更新活动按键显示
    setActiveKeys(keyCombo);
    setTimeout(() => setActiveKeys([]), 1000);
  }, [onShortcut]);

  // 绑定键盘事件
  useEffect(() => {
    if (!isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  // 按分类分组快捷键
  const shortcutsByCategory = shortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = [];
    }
    acc[shortcut.category].push(shortcut);
    return acc;
  }, {} as Record<string, Shortcut[]>);

  // 筛选快捷键
  const filteredShortcuts = searchTerm
    ? shortcuts.filter(shortcut => 
        shortcut.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shortcut.keys.some(key => key.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : null;

  if (!isOpen) {
    return (
      // 快捷键状态显示
      activeKeys.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-lg shadow-lg z-50">
          <div className="flex items-center gap-2">
            <KeyIcon className="w-4 h-4" />
            <span className="text-sm">
              {activeKeys.join(' + ')}
            </span>
          </div>
        </div>
      )
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* 头部 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <CommandLineIcon className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">键盘快捷键</h2>
              <p className="text-sm text-gray-500">提高操作效率的快捷键大全</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* 搜索栏 */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索快捷键..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* 快捷键列表 */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
          {filteredShortcuts ? (
            // 搜索结果
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">搜索结果 ({filteredShortcuts.length})</h3>
              <div className="space-y-3">
                {filteredShortcuts.map((shortcut, index) => (
                  <ShortcutRow key={index} shortcut={shortcut} />
                ))}
              </div>
            </div>
          ) : (
            // 按分类显示
            <div className="p-6 space-y-8">
              {Object.entries(shortcutsByCategory).map(([category, categoryShortcuts]) => (
                <div key={category}>
                  <div className="flex items-center gap-2 mb-4">
                    <CategoryIcon category={category} />
                    <h3 className="text-lg font-medium text-gray-900">{category}</h3>
                    <span className="text-sm text-gray-500">({categoryShortcuts.length})</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {categoryShortcuts.map((shortcut, index) => (
                      <ShortcutRow key={index} shortcut={shortcut} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 底部提示 */}
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">?</kbd>
                <span>显示快捷键</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Esc</kbd>
                <span>关闭</span>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              按下快捷键会在右下角显示
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 快捷键行组件
function ShortcutRow({ shortcut }: { shortcut: Shortcut }) {
  return (
    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{shortcut.description}</p>
      </div>
      <div className="flex items-center gap-1">
        {shortcut.keys.map((key, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="text-gray-400 text-xs mx-1">+</span>}
            <kbd className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-xs font-mono">
              {key === ' ' ? 'Space' : key}
            </kbd>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// 分类图标
function CategoryIcon({ category }: { category: string }) {
  switch (category) {
    case '导航':
      return <RocketLaunchIcon className="w-5 h-5 text-blue-600" />;
    case '内容':
      return <DocumentDuplicateIcon className="w-5 h-5 text-green-600" />;
    case '编辑':
      return <PencilIcon className="w-5 h-5 text-orange-600" />;
    case '选择':
      return <EyeIcon className="w-5 h-5 text-purple-600" />;
    case '搜索':
      return <MagnifyingGlassIcon className="w-5 h-5 text-red-600" />;
    case '系统':
      return <BoltIcon className="w-5 h-5 text-gray-600" />;
    default:
      return <KeyIcon className="w-5 h-5 text-gray-600" />;
  }
}

// 快捷键管理 Hook
export function useKeyboardShortcuts(onShortcut: (action: string) => void) {
  const [showHelp, setShowHelp] = useState(false);

  const handleShortcut = useCallback((action: string) => {
    if (action === 'show_help') {
      setShowHelp(true);
    } else {
      onShortcut(action);
    }
  }, [onShortcut]);

  return {
    showHelp,
    setShowHelp,
    handleShortcut
  };
}