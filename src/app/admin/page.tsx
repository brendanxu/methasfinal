'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 简单的硬编码验证（你可以随时修改密码）
    if (username === 'admin' && password === 'methas2024') {
      // 设置登录状态
      localStorage.setItem('isAdminLoggedIn', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('用户名或密码错误');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xl">
              M
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold">Methas</div>
              <div className="text-sm text-gray-500">管理后台</div>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold mb-2">欢迎回来</h1>
          <p className="text-gray-600">请登录以管理网站内容</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              用户名
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              placeholder="请输入用户名"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              密码
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              placeholder="请输入密码"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <Button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-all"
          >
            登录
          </Button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-xl text-sm text-gray-600">
          <p className="font-medium mb-1">默认登录信息：</p>
          <p>用户名：admin</p>
          <p>密码：methas2024</p>
        </div>
      </Card>
    </div>
  );
}