'use client';

import React, { useState, useEffect } from 'react';
import {
  Cog6ToothIcon,
  UserIcon,
  BellIcon,
  ShieldCheckIcon,
  EyeIcon,
  LanguageIcon,
  PaintBrushIcon,
  ClockIcon,
  DocumentTextIcon,
  PhotoIcon,
  ServerIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface SystemSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsChange: (settings: any) => void;
}

export default function SystemSettings({
  isOpen,
  onClose,
  onSettingsChange
}: SystemSettingsProps) {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      siteName: 'Methas 管理后台',
      language: 'zh',
      timezone: 'Asia/Shanghai',
      dateFormat: 'YYYY-MM-DD',
      autoSave: true,
      autoSaveInterval: 30
    },
    appearance: {
      theme: 'light',
      primaryColor: '#000000',
      fontSize: 'medium',
      compactMode: false,
      showPreview: true,
      animationsEnabled: true
    },
    content: {
      defaultStatus: 'draft',
      autoPublish: false,
      enableVersions: true,
      maxVersions: 10,
      requireApproval: false,
      allowComments: false
    },
    media: {
      maxFileSize: 5, // MB
      allowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
      autoOptimize: true,
      generateThumbnails: true,
      watermark: false,
      cdnEnabled: false
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      newContent: true,
      statusChanges: true,
      systemUpdates: true,
      backupReminders: true
    },
    security: {
      sessionTimeout: 60, // 分钟
      requireStrongPassword: true,
      enableTwoFactor: false,
      loginAttempts: 5,
      ipWhitelist: false,
      auditLog: true
    },
    performance: {
      enableCache: true,
      cacheExpiry: 3600, // 秒
      compressImages: true,
      lazyLoading: true,
      enableCDN: false,
      minifyAssets: true
    },
    backup: {
      autoBackup: true,
      backupInterval: 'daily',
      backupRetention: 30, // 天
      backupLocation: 'local',
      includeDrafts: true,
      compressBackups: true
    }
  });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // 从 localStorage 加载设置
    const savedSettings = localStorage.getItem('admin-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...settings, ...parsed });
      } catch (error) {
        console.error('加载设置失败:', error);
      }
    }
  }, []);

  const updateSetting = (category: string, key: string, value: any) => {
    const newSettings = {
      ...settings,
      [category]: {
        ...settings[category as keyof typeof settings],
        [key]: value
      }
    };
    setSettings(newSettings);
    setHasChanges(true);
  };

  const handleSave = () => {
    try {
      localStorage.setItem('admin-settings', JSON.stringify(settings));
      onSettingsChange(settings);
      setHasChanges(false);
      alert('设置已保存');
    } catch (error) {
      console.error('保存设置失败:', error);
      alert('保存失败，请重试');
    }
  };

  const handleReset = () => {
    if (confirm('确定要重置所有设置吗？此操作不可撤销。')) {
      localStorage.removeItem('admin-settings');
      window.location.reload();
    }
  };

  if (!isOpen) return null;

  const tabs = [
    { id: 'general', label: '常规设置', icon: Cog6ToothIcon },
    { id: 'appearance', label: '外观主题', icon: PaintBrushIcon },
    { id: 'content', label: '内容管理', icon: DocumentTextIcon },
    { id: 'media', label: '媒体文件', icon: PhotoIcon },
    { id: 'notifications', label: '通知设置', icon: BellIcon },
    { id: 'security', label: '安全设置', icon: ShieldCheckIcon },
    { id: 'performance', label: '性能优化', icon: ServerIcon },
    { id: 'backup', label: '备份设置', icon: ClockIcon }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex">
        {/* 侧边栏 */}
        <div className="w-64 bg-gray-50 border-r border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <Cog6ToothIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">系统设置</h2>
                <p className="text-sm text-gray-500">管理后台配置</p>
              </div>
            </div>
          </div>
          
          <nav className="p-4">
            <ul className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-black text-white'
                          : 'text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* 主内容区域 */}
        <div className="flex-1 flex flex-col">
          {/* 头部 */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h3 className="text-xl font-semibold">
                {tabs.find(tab => tab.id === activeTab)?.label}
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                配置系统行为和用户偏好
              </p>
            </div>
            <div className="flex items-center gap-3">
              {hasChanges && (
                <span className="text-sm text-orange-600 font-medium">
                  有未保存的更改
                </span>
              )}
              <Button onClick={handleReset} variant="outline">
                重置默认
              </Button>
              <Button onClick={handleSave} disabled={!hasChanges}>
                保存设置
              </Button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 设置内容 */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* 常规设置 */}
            {activeTab === 'general' && (
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-medium mb-4">基本信息</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">网站名称</label>
                      <input
                        type="text"
                        value={settings.general.siteName}
                        onChange={(e) => updateSetting('general', 'siteName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">界面语言</label>
                      <select
                        value={settings.general.language}
                        onChange={(e) => updateSetting('general', 'language', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="zh">中文（简体）</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">时区</label>
                      <select
                        value={settings.general.timezone}
                        onChange={(e) => updateSetting('general', 'timezone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Asia/Shanghai">北京时间 (UTC+8)</option>
                        <option value="UTC">协调世界时 (UTC)</option>
                        <option value="America/New_York">纽约时间 (UTC-5)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">日期格式</label>
                      <select
                        value={settings.general.dateFormat}
                        onChange={(e) => updateSetting('general', 'dateFormat', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="YYYY-MM-DD">2024-08-23</option>
                        <option value="DD/MM/YYYY">23/08/2024</option>
                        <option value="MM/DD/YYYY">08/23/2024</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-4">自动保存</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">启用自动保存</p>
                        <p className="text-sm text-gray-500">编辑时自动保存内容</p>
                      </div>
                      <Switch
                        checked={settings.general.autoSave}
                        onCheckedChange={(checked) => updateSetting('general', 'autoSave', checked)}
                      />
                    </div>
                    {settings.general.autoSave && (
                      <div>
                        <label className="block text-sm font-medium mb-2">自动保存间隔（秒）</label>
                        <input
                          type="number"
                          value={settings.general.autoSaveInterval}
                          onChange={(e) => updateSetting('general', 'autoSaveInterval', parseInt(e.target.value))}
                          className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min="10"
                          max="300"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 外观设置 */}
            {activeTab === 'appearance' && (
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-medium mb-4">界面外观</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">主题模式</label>
                      <div className="flex gap-3">
                        {['light', 'dark', 'auto'].map((theme) => (
                          <button
                            key={theme}
                            onClick={() => updateSetting('appearance', 'theme', theme)}
                            className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                              settings.appearance.theme === theme
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {theme === 'light' ? '浅色' : theme === 'dark' ? '深色' : '跟随系统'}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">字体大小</label>
                      <select
                        value={settings.appearance.fontSize}
                        onChange={(e) => updateSetting('appearance', 'fontSize', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="small">小号</option>
                        <option value="medium">中号</option>
                        <option value="large">大号</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-4">界面选项</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">紧凑模式</p>
                        <p className="text-sm text-gray-500">减小界面间距，显示更多内容</p>
                      </div>
                      <Switch
                        checked={settings.appearance.compactMode}
                        onCheckedChange={(checked) => updateSetting('appearance', 'compactMode', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">显示预览</p>
                        <p className="text-sm text-gray-500">编辑时显示内容预览</p>
                      </div>
                      <Switch
                        checked={settings.appearance.showPreview}
                        onCheckedChange={(checked) => updateSetting('appearance', 'showPreview', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">界面动画</p>
                        <p className="text-sm text-gray-500">启用过渡动画效果</p>
                      </div>
                      <Switch
                        checked={settings.appearance.animationsEnabled}
                        onCheckedChange={(checked) => updateSetting('appearance', 'animationsEnabled', checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 内容管理设置 */}
            {activeTab === 'content' && (
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-medium mb-4">内容发布</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">默认内容状态</label>
                      <select
                        value={settings.content.defaultStatus}
                        onChange={(e) => updateSetting('content', 'defaultStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="draft">草稿</option>
                        <option value="review">待审核</option>
                        <option value="published">已发布</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-4">版本管理</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">启用版本控制</p>
                        <p className="text-sm text-gray-500">保存内容修改历史</p>
                      </div>
                      <Switch
                        checked={settings.content.enableVersions}
                        onCheckedChange={(checked) => updateSetting('content', 'enableVersions', checked)}
                      />
                    </div>
                    {settings.content.enableVersions && (
                      <div>
                        <label className="block text-sm font-medium mb-2">最大版本数</label>
                        <input
                          type="number"
                          value={settings.content.maxVersions}
                          onChange={(e) => updateSetting('content', 'maxVersions', parseInt(e.target.value))}
                          className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min="1"
                          max="50"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-4">审核工作流</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">需要审核</p>
                        <p className="text-sm text-gray-500">发布前需要管理员审核</p>
                      </div>
                      <Switch
                        checked={settings.content.requireApproval}
                        onCheckedChange={(checked) => updateSetting('content', 'requireApproval', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">自动发布</p>
                        <p className="text-sm text-gray-500">审核通过后自动发布</p>
                      </div>
                      <Switch
                        checked={settings.content.autoPublish}
                        onCheckedChange={(checked) => updateSetting('content', 'autoPublish', checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 媒体文件设置 */}
            {activeTab === 'media' && (
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-medium mb-4">上传限制</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">最大文件大小 (MB)</label>
                      <input
                        type="number"
                        value={settings.media.maxFileSize}
                        onChange={(e) => updateSetting('media', 'maxFileSize', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="1"
                        max="100"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-4">图片处理</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">自动优化</p>
                        <p className="text-sm text-gray-500">上传时自动压缩图片</p>
                      </div>
                      <Switch
                        checked={settings.media.autoOptimize}
                        onCheckedChange={(checked) => updateSetting('media', 'autoOptimize', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">生成缩略图</p>
                        <p className="text-sm text-gray-500">自动生成多个尺寸</p>
                      </div>
                      <Switch
                        checked={settings.media.generateThumbnails}
                        onCheckedChange={(checked) => updateSetting('media', 'generateThumbnails', checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 通知设置 */}
            {activeTab === 'notifications' && (
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-medium mb-4">通知方式</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">邮件通知</p>
                        <p className="text-sm text-gray-500">通过邮件接收通知</p>
                      </div>
                      <Switch
                        checked={settings.notifications.emailNotifications}
                        onCheckedChange={(checked) => updateSetting('notifications', 'emailNotifications', checked)}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-4">通知内容</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">新内容发布</p>
                        <p className="text-sm text-gray-500">有新内容发布时通知</p>
                      </div>
                      <Switch
                        checked={settings.notifications.newContent}
                        onCheckedChange={(checked) => updateSetting('notifications', 'newContent', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">状态变更</p>
                        <p className="text-sm text-gray-500">内容状态改变时通知</p>
                      </div>
                      <Switch
                        checked={settings.notifications.statusChanges}
                        onCheckedChange={(checked) => updateSetting('notifications', 'statusChanges', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">系统更新</p>
                        <p className="text-sm text-gray-500">系统更新时通知</p>
                      </div>
                      <Switch
                        checked={settings.notifications.systemUpdates}
                        onCheckedChange={(checked) => updateSetting('notifications', 'systemUpdates', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">备份提醒</p>
                        <p className="text-sm text-gray-500">备份完成时通知</p>
                      </div>
                      <Switch
                        checked={settings.notifications.backupReminders}
                        onCheckedChange={(checked) => updateSetting('notifications', 'backupReminders', checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 安全设置 */}
            {activeTab === 'security' && (
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-medium mb-4">会话管理</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">会话超时时间（分钟）</label>
                      <input
                        type="number"
                        value={settings.security.sessionTimeout}
                        onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="5"
                        max="480"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">最大登录尝试次数</label>
                      <input
                        type="number"
                        value={settings.security.loginAttempts}
                        onChange={(e) => updateSetting('security', 'loginAttempts', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="3"
                        max="10"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-4">安全策略</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">强密码要求</p>
                        <p className="text-sm text-gray-500">要求使用强密码</p>
                      </div>
                      <Switch
                        checked={settings.security.requireStrongPassword}
                        onCheckedChange={(checked) => updateSetting('security', 'requireStrongPassword', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">审计日志</p>
                        <p className="text-sm text-gray-500">记录所有操作日志</p>
                      </div>
                      <Switch
                        checked={settings.security.auditLog}
                        onCheckedChange={(checked) => updateSetting('security', 'auditLog', checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 性能设置 */}
            {activeTab === 'performance' && (
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-medium mb-4">缓存设置</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">启用缓存</p>
                        <p className="text-sm text-gray-500">缓存内容提高访问速度</p>
                      </div>
                      <Switch
                        checked={settings.performance.enableCache}
                        onCheckedChange={(checked) => updateSetting('performance', 'enableCache', checked)}
                      />
                    </div>
                    {settings.performance.enableCache && (
                      <div>
                        <label className="block text-sm font-medium mb-2">缓存过期时间（秒）</label>
                        <input
                          type="number"
                          value={settings.performance.cacheExpiry}
                          onChange={(e) => updateSetting('performance', 'cacheExpiry', parseInt(e.target.value))}
                          className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min="300"
                          max="86400"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-4">优化选项</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">图片压缩</p>
                        <p className="text-sm text-gray-500">自动压缩上传的图片</p>
                      </div>
                      <Switch
                        checked={settings.performance.compressImages}
                        onCheckedChange={(checked) => updateSetting('performance', 'compressImages', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">懒加载</p>
                        <p className="text-sm text-gray-500">图片懒加载提高页面速度</p>
                      </div>
                      <Switch
                        checked={settings.performance.lazyLoading}
                        onCheckedChange={(checked) => updateSetting('performance', 'lazyLoading', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">资源压缩</p>
                        <p className="text-sm text-gray-500">压缩 CSS 和 JS 文件</p>
                      </div>
                      <Switch
                        checked={settings.performance.minifyAssets}
                        onCheckedChange={(checked) => updateSetting('performance', 'minifyAssets', checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 备份设置 */}
            {activeTab === 'backup' && (
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-medium mb-4">自动备份</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">启用自动备份</p>
                        <p className="text-sm text-gray-500">定期自动备份数据</p>
                      </div>
                      <Switch
                        checked={settings.backup.autoBackup}
                        onCheckedChange={(checked) => updateSetting('backup', 'autoBackup', checked)}
                      />
                    </div>
                    {settings.backup.autoBackup && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">备份频率</label>
                          <select
                            value={settings.backup.backupInterval}
                            onChange={(e) => updateSetting('backup', 'backupInterval', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="hourly">每小时</option>
                            <option value="daily">每天</option>
                            <option value="weekly">每周</option>
                            <option value="monthly">每月</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">保留天数</label>
                          <input
                            type="number"
                            value={settings.backup.backupRetention}
                            onChange={(e) => updateSetting('backup', 'backupRetention', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            min="1"
                            max="365"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-4">备份选项</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">包含草稿</p>
                        <p className="text-sm text-gray-500">备份时包含草稿内容</p>
                      </div>
                      <Switch
                        checked={settings.backup.includeDrafts}
                        onCheckedChange={(checked) => updateSetting('backup', 'includeDrafts', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">压缩备份</p>
                        <p className="text-sm text-gray-500">压缩备份文件节省空间</p>
                      </div>
                      <Switch
                        checked={settings.backup.compressBackups}
                        onCheckedChange={(checked) => updateSetting('backup', 'compressBackups', checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Switch 组件（如果没有的话）
const SwitchComponent = ({ checked, onCheckedChange }: { checked: boolean, onCheckedChange: (checked: boolean) => void }) => (
  <button
    onClick={() => onCheckedChange(!checked)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
      checked ? 'bg-blue-600' : 'bg-gray-200'
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        checked ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);