#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🎯 测试超简单管理后台...\n');

console.log('✅ 功能特色:');
console.log('• 访问 /admin 即可管理内容');
console.log('• 用户名：admin，密码：methas2024');
console.log('• 无需任何技术配置');
console.log('• 数据本地保存，安全可靠\n');

console.log('🚀 启动开发服务器...');
console.log('请在浏览器中访问:');
console.log('• 网站首页: http://localhost:3001');
console.log('• 管理后台: http://localhost:3001/admin');
console.log('\n按 Ctrl+C 可以停止服务\n');

try {
  execSync('npm run dev', { stdio: 'inherit' });
} catch (error) {
  console.log('\n服务已停止');
}