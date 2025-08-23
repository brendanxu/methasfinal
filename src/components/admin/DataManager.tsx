'use client';

import React, { useState } from 'react';
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  DocumentArrowDownIcon,
  DocumentArrowUpIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  TrashIcon,
  ArrowPathIcon,
  CloudArrowUpIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';

interface DataManagerProps {
  contentData: any;
  onImport: (data: any) => void;
  onBackupRestore: (backupId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function DataManager({
  contentData,
  onImport,
  onBackupRestore,
  isOpen,
  onClose
}: DataManagerProps) {
  const [activeTab, setActiveTab] = useState('export');
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importProgress, setImportProgress] = useState(0);
  const [importStatus, setImportStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [backups, setBackups] = useState<any[]>([]);

  if (!isOpen) return null;

  // 导出功能
  const handleExport = (format: 'json' | 'csv' | 'excel') => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `methas-content-${timestamp}`;

    if (format === 'json') {
      const blob = new Blob([JSON.stringify(contentData, null, 2)], {
        type: 'application/json'
      });
      downloadFile(blob, `${filename}.json`);
    } else if (format === 'csv') {
      // 转换为 CSV 格式
      const csvData = convertToCSV(contentData);
      const blob = new Blob([csvData], { type: 'text/csv' });
      downloadFile(blob, `${filename}.csv`);
    }
    // Excel 格式可以后续添加
  };

  const downloadFile = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const convertToCSV = (data: any) => {
    let csv = '';
    
    // 处理不同类型的内容
    const sections = ['hero', 'services', 'articles', 'stats'];
    
    sections.forEach(section => {
      if (data.data[section] && data.data[section].length > 0) {
        csv += `\n=== ${section.toUpperCase()} ===\n`;
        
        const items = data.data[section];
        if (items.length > 0) {
          // 创建表头
          const headers = Object.keys(items[0]).filter(key => 
            typeof items[0][key] !== 'object' || key === 'image'
          );
          csv += headers.join(',') + '\n';
          
          // 添加数据行
          items.forEach((item: any) => {
            const row = headers.map(header => {
              let value = item[header];
              if (typeof value === 'object' && value !== null) {
                value = JSON.stringify(value);
              }
              return `"${String(value || '').replace(/"/g, '""')}"`;
            });
            csv += row.join(',') + '\n';
          });
        }
        csv += '\n';
      }
    });
    
    return csv;
  };

  // 导入功能
  const handleImport = async () => {
    if (!importFile) return;

    setImportStatus('processing');
    setImportProgress(0);

    try {
      const text = await importFile.text();
      let importedData;

      if (importFile.name.endsWith('.json')) {
        importedData = JSON.parse(text);
      } else if (importFile.name.endsWith('.csv')) {
        // 简单的 CSV 解析 - 实际项目中可能需要更复杂的解析
        importedData = parseCSV(text);
      } else {
        throw new Error('不支持的文件格式');
      }

      // 模拟进度
      const progressInterval = setInterval(() => {
        setImportProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      // 验证数据格式
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (validateImportData(importedData)) {
        setImportProgress(100);
        setImportStatus('success');
        onImport(importedData);
      } else {
        throw new Error('数据格式验证失败');
      }

    } catch (error) {
      console.error('导入失败:', error);
      setImportStatus('error');
    }
  };

  const parseCSV = (csvText: string) => {
    // 这里是简化的 CSV 解析，实际项目中需要更完善的实现
    const lines = csvText.split('\n');
    // 基础的 CSV 到 JSON 转换逻辑
    return { message: 'CSV 导入功能开发中' };
  };

  const validateImportData = (data: any) => {
    // 验证数据结构
    if (!data || typeof data !== 'object') return false;
    if (!data.data || typeof data.data !== 'object') return false;
    
    const requiredSections = ['hero', 'services', 'articles', 'stats'];
    return requiredSections.every(section => 
      Array.isArray(data.data[section])
    );
  };

  // 获取备份列表
  React.useEffect(() => {
    if (activeTab === 'backup') {
      // 模拟备份数据
      setBackups([
        {
          id: 'backup_001',
          name: '自动备份 - 2024-08-23 10:30',
          size: '245 KB',
          created: '2024-08-23T10:30:00Z',
          type: 'auto'
        },
        {
          id: 'backup_002', 
          name: '手动备份 - 发布前',
          size: '238 KB',
          created: '2024-08-22T15:20:00Z',
          type: 'manual'
        },
        {
          id: 'backup_003',
          name: '自动备份 - 2024-08-22 09:15',
          size: '232 KB',
          created: '2024-08-22T09:15:00Z',
          type: 'auto'
        }
      ]);
    }
  }, [activeTab]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* 头部 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <DocumentArrowDownIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">数据管理</h2>
              <p className="text-sm text-gray-500">导入、导出和备份管理</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* 标签页 */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'export', label: '数据导出', icon: ArrowDownTrayIcon },
              { id: 'import', label: '数据导入', icon: ArrowUpTrayIcon },
              { id: 'backup', label: '备份管理', icon: ClockIcon },
              { id: 'template', label: '模板库', icon: DocumentDuplicateIcon }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* 内容区域 */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* 导出页面 */}
          {activeTab === 'export' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">导出网站内容</h3>
                <p className="text-gray-600 mb-6">
                  将网站内容导出为不同格式，便于备份或迁移到其他系统。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <DocumentArrowDownIcon className="w-8 h-8 text-blue-600" />
                    <div>
                      <h4 className="font-medium">JSON 格式</h4>
                      <p className="text-sm text-gray-500">完整数据结构</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    包含所有内容和元数据，适合备份和系统迁移。
                  </p>
                  <Button
                    onClick={() => handleExport('json')}
                    className="w-full"
                  >
                    导出 JSON
                  </Button>
                </div>

                <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <DocumentArrowDownIcon className="w-8 h-8 text-green-600" />
                    <div>
                      <h4 className="font-medium">CSV 格式</h4>
                      <p className="text-sm text-gray-500">表格数据</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    适合在 Excel 中查看和编辑，便于数据分析。
                  </p>
                  <Button
                    onClick={() => handleExport('csv')}
                    className="w-full"
                  >
                    导出 CSV
                  </Button>
                </div>

                <div className="border border-gray-200 rounded-lg p-6 opacity-50">
                  <div className="flex items-center gap-3 mb-4">
                    <DocumentArrowDownIcon className="w-8 h-8 text-purple-600" />
                    <div>
                      <h4 className="font-medium">Excel 格式</h4>
                      <p className="text-sm text-gray-500">即将推出</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    完整的 Excel 工作簿，包含多个工作表。
                  </p>
                  <Button
                    disabled
                    className="w-full"
                  >
                    开发中
                  </Button>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">导出说明</h4>
                    <ul className="text-sm text-blue-800 mt-2 space-y-1">
                      <li>• 导出文件包含当前所有发布和草稿内容</li>
                      <li>• JSON 格式保留完整的数据结构和关系</li>
                      <li>• CSV 格式便于在表格软件中查看和编辑</li>
                      <li>• 建议定期导出数据作为备份</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 导入页面 */}
          {activeTab === 'import' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">导入内容数据</h3>
                <p className="text-gray-600 mb-6">
                  从其他系统或备份文件导入内容数据。支持 JSON 和 CSV 格式。
                </p>
              </div>

              {importStatus === 'idle' && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                  <div className="text-center">
                    <ArrowUpTrayIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <div className="flex flex-col items-center">
                      <input
                        type="file"
                        accept=".json,.csv"
                        onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                        className="hidden"
                        id="import-file"
                      />
                      <label
                        htmlFor="import-file"
                        className="cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors mb-2"
                      >
                        选择文件
                      </label>
                      <p className="text-sm text-gray-500">或拖拽文件到此处</p>
                    </div>
                  </div>
                  
                  {importFile && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{importFile.name}</p>
                          <p className="text-sm text-gray-500">
                            {(importFile.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                        <Button onClick={handleImport}>
                          开始导入
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {importStatus === 'processing' && (
                <div className="text-center space-y-4">
                  <ArrowPathIcon className="mx-auto h-12 w-12 text-blue-600 animate-spin" />
                  <div>
                    <h4 className="text-lg font-medium">正在导入数据...</h4>
                    <p className="text-gray-500">请稍等，不要关闭页面</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${importProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500">{importProgress}% 完成</p>
                </div>
              )}

              {importStatus === 'success' && (
                <div className="text-center space-y-4">
                  <CheckCircleIcon className="mx-auto h-12 w-12 text-green-600" />
                  <div>
                    <h4 className="text-lg font-medium text-green-900">导入成功！</h4>
                    <p className="text-green-600">数据已成功导入系统</p>
                  </div>
                  <Button onClick={() => {
                    setImportStatus('idle');
                    setImportFile(null);
                    setImportProgress(0);
                  }}>
                    继续导入
                  </Button>
                </div>
              )}

              {importStatus === 'error' && (
                <div className="text-center space-y-4">
                  <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-red-600" />
                  <div>
                    <h4 className="text-lg font-medium text-red-900">导入失败</h4>
                    <p className="text-red-600">请检查文件格式并重试</p>
                  </div>
                  <Button onClick={() => {
                    setImportStatus('idle');
                    setImportFile(null);
                    setImportProgress(0);
                  }}>
                    重新导入
                  </Button>
                </div>
              )}

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-900">导入注意事项</h4>
                    <ul className="text-sm text-yellow-800 mt-2 space-y-1">
                      <li>• 导入会覆盖现有的同名内容</li>
                      <li>• 建议导入前先导出当前数据作为备份</li>
                      <li>• 确保文件格式正确，避免数据丢失</li>
                      <li>• 大文件导入可能需要较长时间</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 备份管理页面 */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">备份历史</h3>
                  <p className="text-gray-600">管理系统自动备份和手动备份</p>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  <CloudArrowUpIcon className="w-4 h-4 mr-2" />
                  创建备份
                </Button>
              </div>

              <div className="space-y-3">
                {backups.map((backup) => (
                  <div key={backup.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          backup.type === 'auto' ? 'bg-blue-100' : 'bg-green-100'
                        }`}>
                          <ClockIcon className={`w-5 h-5 ${
                            backup.type === 'auto' ? 'text-blue-600' : 'text-green-600'
                          }`} />
                        </div>
                        <div>
                          <h4 className="font-medium">{backup.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{new Date(backup.created).toLocaleString('zh-CN')}</span>
                            <span>{backup.size}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              backup.type === 'auto' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {backup.type === 'auto' ? '自动' : '手动'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          onClick={() => onBackupRestore(backup.id)}
                          className="bg-orange-600 hover:bg-orange-700"
                        >
                          <ArrowPathIcon className="w-4 h-4 mr-1" />
                          恢复
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleExport('json')}
                          className="bg-gray-600 hover:bg-gray-700"
                        >
                          <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
                          下载
                        </Button>
                        <Button
                          size="sm"
                          className="bg-red-600 hover:bg-red-700"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">备份策略</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>• 系统每天自动创建备份</li>
                      <li>• 自动备份保留最近 10 个版本</li>
                      <li>• 手动备份永久保存</li>
                      <li>• 可随时恢复到任意备份点</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 模板库页面 */}
          {activeTab === 'template' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">内容模板</h3>
                <p className="text-gray-600 mb-6">
                  使用预设模板快速创建内容，提高工作效率。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <DocumentDuplicateIcon className="w-8 h-8 text-blue-600" />
                    <div>
                      <h4 className="font-medium">文章模板</h4>
                      <p className="text-sm text-gray-500">预设文章结构</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    包含标准的行业趋势、政策解读等文章模板。
                  </p>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    即将推出
                  </Button>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <DocumentDuplicateIcon className="w-8 h-8 text-green-600" />
                    <div>
                      <h4 className="font-medium">轮播模板</h4>
                      <p className="text-sm text-gray-500">常用轮播设计</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    提供多种轮播图样式和文案模板。
                  </p>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    即将推出
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}