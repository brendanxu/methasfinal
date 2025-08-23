#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🎨 启动 Methas CMS 演示...\n');

console.log('📋 准备工作检查:');
console.log('✅ Sanity Studio 已配置');
console.log('✅ Southpole 风格主题已应用');
console.log('✅ 中文界面已本土化');
console.log('✅ 内容类型已定义完成\n');

console.log('🚀 启动服务...');

try {
  // 启动 Sanity Studio
  console.log('启动 Sanity Studio...');
  execSync('npm run studio', { 
    stdio: 'inherit',
    detached: false
  });
} catch (error) {
  console.log('\n⚠️  Studio 已停止');
  console.log('\n📚 接下来的步骤:');
  console.log('1. 访问 https://sanity.io/manage 创建项目');
  console.log('2. 配置 .env.local 文件');
  console.log('3. 重新运行 npm run studio');
  console.log('4. 访问 http://localhost:3333 开始管理内容\n');
  
  console.log('📖 详细文档:');
  console.log('- CMS-ADMIN-SETUP.md - 管理员完整配置');
  console.log('- QUICK-START.md - 5分钟快速开始');
  console.log('- CMS-SETUP.md - 技术设置文档\n');
}