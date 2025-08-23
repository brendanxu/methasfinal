'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  HomeIcon, 
  DocumentTextIcon, 
  ChartBarIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';

// 内容类型
type ContentType = 'hero' | 'services' | 'articles' | 'stats';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ContentType>('hero');
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState<any>({
    hero: [],
    services: [],
    articles: [],
    stats: []
  });

  // 检查登录状态
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn) {
      router.push('/admin');
    }
    // 加载已保存的内容
    loadContent();
  }, [router]); // Include router in dependencies to satisfy ESLint

  const loadContent = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/content');
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error('Failed to load content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveContent = async (newContent: any) => {
    try {
      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContent)
      });
      if (response.ok) {
        setContent(newContent);
        // 显示成功提示（可选）
      }
    } catch (error) {
      console.error('Failed to save content:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    router.push('/admin');
  };

  const menuItems = [
    { id: 'hero', label: '首页轮播', icon: HomeIcon },
    { id: 'services', label: '服务介绍', icon: CogIcon },
    { id: 'articles', label: '碳智观察', icon: DocumentTextIcon },
    { id: 'stats', label: '统计数据', icon: ChartBarIcon }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 升级提示横幅 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-lg p-1">
              <PhotoIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold">🎉 专业版管理后台现已可用！</div>
              <div className="text-xs opacity-90">
                包含图片上传、版本控制、内容预览、更专业的界面设计
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/admin/dashboard/v2"
              className="bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              立即升级 →
            </a>
            <button className="text-white/80 hover:text-white text-sm">
              稍后提醒
            </button>
          </div>
        </div>
      </div>

      {/* 顶部导航 */}
      <header className="bg-black text-white">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-black font-bold">
              M
            </div>
            <div>
              <div className="text-xl font-bold">Methas 管理后台</div>
              <div className="text-xs opacity-75">内容管理系统</div>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white"
          >
            <ArrowRightOnRectangleIcon className="w-4 h-4" />
            退出登录
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* 侧边栏 */}
        <aside className="w-64 bg-white min-h-[calc(100vh-72px)] border-r">
          <nav className="p-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as ContentType)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === item.id
                      ? 'bg-black text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* 主内容区 */}
        <main className="flex-1 p-6">
          {activeTab === 'hero' && <HeroManager content={content} saveContent={saveContent} />}
          {activeTab === 'services' && <ServicesManager content={content} saveContent={saveContent} />}
          {activeTab === 'articles' && <ArticlesManager content={content} saveContent={saveContent} />}
          {activeTab === 'stats' && <StatsManager content={content} saveContent={saveContent} />}
        </main>
      </div>
    </div>
  );
}

// Hero 轮播管理组件
function HeroManager({ content, saveContent }: any) {
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    buttonText: '',
    image: ''
  });

  const handleSave = () => {
    const newHero = [...(content.hero || [])];
    if (editingItem !== null) {
      newHero[editingItem] = formData;
    } else {
      newHero.push(formData);
    }
    saveContent({ ...content, hero: newHero });
    setEditingItem(null);
    setFormData({ title: '', subtitle: '', buttonText: '', image: '' });
  };

  const handleDelete = (index: number) => {
    const newHero = content.hero.filter((_: any, i: number) => i !== index);
    saveContent({ ...content, hero: newHero });
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">首页轮播管理</h2>
        <p className="text-gray-600">管理首页的轮播内容和图片</p>
      </div>

      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {editingItem !== null ? '编辑轮播' : '添加新轮播'}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">标题</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="输入标题"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">副标题</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="输入副标题"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">按钮文字</label>
            <input
              type="text"
              value={formData.buttonText}
              onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="输入按钮文字"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">图片链接</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="输入图片URL"
            />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button onClick={handleSave} className="bg-black text-white">
            {editingItem !== null ? '更新' : '添加'}
          </Button>
          {editingItem !== null && (
            <Button 
              onClick={() => {
                setEditingItem(null);
                setFormData({ title: '', subtitle: '', buttonText: '', image: '' });
              }}
              variant="outline"
            >
              取消
            </Button>
          )}
        </div>
      </Card>

      {/* 列表 */}
      <div className="grid gap-4">
        {content.hero?.map((item: any, index: number) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.subtitle}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingItem(index);
                    setFormData(item);
                  }}
                >
                  <PencilIcon className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(index)}
                  className="text-red-500 hover:bg-red-50"
                >
                  <TrashIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// 服务管理组件
function ServicesManager({ content, saveContent }: any) {
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    step: 1,
    title: '',
    description: '',
    features: ''
  });

  const handleSave = () => {
    const newServices = [...(content.services || [])];
    if (editingItem !== null) {
      newServices[editingItem] = formData;
    } else {
      newServices.push(formData);
    }
    saveContent({ ...content, services: newServices });
    setEditingItem(null);
    setFormData({ step: 1, title: '', description: '', features: '' });
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">服务介绍管理</h2>
        <p className="text-gray-600">管理4步服务流程介绍</p>
      </div>

      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {editingItem !== null ? '编辑服务' : '添加新服务'}
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">步骤编号</label>
              <select
                value={formData.step}
                onChange={(e) => setFormData({ ...formData, step: Number(e.target.value) })}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value={1}>步骤 1</option>
                <option value={2}>步骤 2</option>
                <option value={3}>步骤 3</option>
                <option value={4}>步骤 4</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">服务标题</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="输入服务标题"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">服务描述</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              rows={3}
              placeholder="输入服务描述"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">特性列表（用逗号分隔）</label>
            <input
              type="text"
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="特性1, 特性2, 特性3"
            />
          </div>
        </div>
        <div className="mt-4">
          <Button onClick={handleSave} className="bg-black text-white">
            {editingItem !== null ? '更新' : '添加'}
          </Button>
        </div>
      </Card>

      {/* 服务列表 */}
      <div className="grid gap-4">
        {content.services?.sort((a: any, b: any) => a.step - b.step).map((item: any, index: number) => (
          <Card key={index} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-black text-white px-2 py-1 rounded text-sm">
                    步骤 {item.step}
                  </span>
                  <h4 className="font-semibold">{item.title}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.features?.split(',').map((feature: string, i: number) => (
                    <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {feature.trim()}
                    </span>
                  ))}
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setEditingItem(index);
                  setFormData(item);
                }}
              >
                <PencilIcon className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// 文章管理组件
function ArticlesManager({ content, saveContent }: any) {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: '行业趋势',
    date: new Date().toISOString().split('T')[0],
    content: ''
  });

  const handleSave = () => {
    const newArticles = [...(content.articles || []), formData];
    saveContent({ ...content, articles: newArticles });
    setFormData({
      title: '',
      excerpt: '',
      category: '行业趋势',
      date: new Date().toISOString().split('T')[0],
      content: ''
    });
  };

  const handleDelete = (index: number) => {
    const newArticles = content.articles.filter((_: any, i: number) => i !== index);
    saveContent({ ...content, articles: newArticles });
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">碳智观察文章管理</h2>
        <p className="text-gray-600">发布和管理新闻文章</p>
      </div>

      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">发布新文章</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">文章标题</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="输入文章标题"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">分类</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option>行业趋势</option>
                <option>政策法规</option>
                <option>技术创新</option>
                <option>碳市场</option>
                <option>案例分享</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">文章摘要</label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              rows={2}
              placeholder="输入文章摘要"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">文章内容</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              rows={6}
              placeholder="输入文章正文内容"
            />
          </div>
        </div>
        <div className="mt-4">
          <Button onClick={handleSave} className="bg-black text-white">
            发布文章
          </Button>
        </div>
      </Card>

      {/* 文章列表 */}
      <div className="grid gap-4">
        {content.articles?.map((item: any, index: number) => (
          <Card key={index} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-500">{item.date}</span>
                </div>
                <h4 className="font-semibold mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.excerpt}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDelete(index)}
                className="text-red-500 hover:bg-red-50"
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// 统计数据管理组件
function StatsManager({ content, saveContent }: any) {
  const [formData, setFormData] = useState({
    label: '',
    value: '',
    description: ''
  });

  const handleSave = () => {
    const newStats = [...(content.stats || []), formData];
    saveContent({ ...content, stats: newStats });
    setFormData({ label: '', value: '', description: '' });
  };

  const handleDelete = (index: number) => {
    const newStats = content.stats.filter((_: any, i: number) => i !== index);
    saveContent({ ...content, stats: newStats });
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">统计数据管理</h2>
        <p className="text-gray-600">管理首页展示的统计数字</p>
      </div>

      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">添加统计数据</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">标签</label>
            <input
              type="text"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="如：减排量"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">数值</label>
            <input
              type="text"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="如：85%"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">描述</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="简短描述"
            />
          </div>
        </div>
        <div className="mt-4">
          <Button onClick={handleSave} className="bg-black text-white">
            添加数据
          </Button>
        </div>
      </Card>

      {/* 统计列表 */}
      <div className="grid grid-cols-2 gap-4">
        {content.stats?.map((item: any, index: number) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{item.value}</div>
                <div className="text-sm font-medium">{item.label}</div>
                <div className="text-xs text-gray-500">{item.description}</div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDelete(index)}
                className="text-red-500 hover:bg-red-50"
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}