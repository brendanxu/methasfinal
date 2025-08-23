#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 设置 Sanity CMS 项目...\n');

// 检查是否已安装 Sanity CLI
function checkSanityCLI() {
  try {
    execSync('sanity --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

// 安装 Sanity CLI
function installSanityCLI() {
  console.log('📦 安装 Sanity CLI...');
  try {
    execSync('npm install -g @sanity/cli', { stdio: 'inherit' });
    console.log('✅ Sanity CLI 安装成功\n');
  } catch (error) {
    console.error('❌ Sanity CLI 安装失败:', error.message);
    process.exit(1);
  }
}

// 创建 Sanity 项目
function createSanityProject() {
  console.log('🏗️  创建 Sanity 项目...');
  
  try {
    // 检查是否已经有项目配置
    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf-8');
      if (envContent.includes('NEXT_PUBLIC_SANITY_PROJECT_ID') && 
          !envContent.includes('your-sanity-project-id')) {
        console.log('✅ 检测到现有 Sanity 项目配置\n');
        return;
      }
    }

    // 初始化新项目
    const initCommand = `sanity init --create-project "Methas CMS" --dataset production --output-path ./temp-sanity-init`;
    
    console.log('执行命令:', initCommand);
    const output = execSync(initCommand, { 
      stdio: 'pipe',
      encoding: 'utf-8'
    });

    // 解析项目 ID
    const projectIdMatch = output.match(/Project ID: ([a-z0-9]+)/i);
    if (projectIdMatch) {
      const projectId = projectIdMatch[1];
      console.log('✅ 项目创建成功! Project ID:', projectId);
      
      // 更新环境变量
      updateEnvFile(projectId);
    } else {
      console.log('⚠️  请手动配置项目 ID');
    }

    // 清理临时文件
    try {
      execSync('rm -rf ./temp-sanity-init', { stdio: 'ignore' });
    } catch (e) {
      // 忽略清理错误
    }

  } catch (error) {
    console.log('⚠️  自动创建失败，请手动创建项目:');
    console.log('1. 运行: sanity login');
    console.log('2. 运行: sanity init');
    console.log('3. 选择 "Create new project"');
    console.log('4. 项目名称: Methas CMS');
    console.log('5. 数据集: production');
    console.log('6. 将项目 ID 添加到 .env.local\n');
  }
}

// 更新环境变量文件
function updateEnvFile(projectId) {
  const envPath = path.join(process.cwd(), '.env.local');
  const envExamplePath = path.join(process.cwd(), '.env.example');
  
  let envContent = '';
  
  // 读取现有的 .env.local 或 .env.example
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf-8');
  } else if (fs.existsSync(envExamplePath)) {
    envContent = fs.readFileSync(envExamplePath, 'utf-8');
  }
  
  // 更新项目 ID
  envContent = envContent.replace(
    /NEXT_PUBLIC_SANITY_PROJECT_ID=.*/,
    `NEXT_PUBLIC_SANITY_PROJECT_ID=${projectId}`
  );
  
  // 如果没有找到项目 ID 行，添加一个
  if (!envContent.includes('NEXT_PUBLIC_SANITY_PROJECT_ID')) {
    envContent += `\n# Sanity CMS\nNEXT_PUBLIC_SANITY_PROJECT_ID=${projectId}\nNEXT_PUBLIC_SANITY_DATASET=production\n`;
  }
  
  // 写入 .env.local
  fs.writeFileSync(envPath, envContent);
  console.log('✅ 环境变量已更新:', envPath);
}

// 创建管理员用户
function setupAdmin() {
  console.log('👤 设置管理员账户...');
  console.log('请在浏览器中完成以下步骤:');
  console.log('1. 访问 Sanity Management Console');
  console.log('2. 登录你的 Sanity 账户');
  console.log('3. 选择 "Methas CMS" 项目');
  console.log('4. 在 API 设置中添加域名: http://localhost:3333');
  console.log('5. 在 Members 中邀请其他管理员\n');
}

// 启动 Studio
function startStudio() {
  console.log('🎨 准备启动 Studio...');
  console.log('运行以下命令启动 CMS:');
  console.log('  npm run studio');
  console.log('然后访问: http://localhost:3333\n');
}

// 主函数
async function main() {
  try {
    // 检查并安装 Sanity CLI
    if (!checkSanityCLI()) {
      installSanityCLI();
    } else {
      console.log('✅ Sanity CLI 已安装\n');
    }

    // 创建项目
    createSanityProject();
    
    // 设置说明
    setupAdmin();
    startStudio();
    
    console.log('🎉 Sanity CMS 设置完成!');
    console.log('📚 查看完整文档: CMS-SETUP.md');
    
  } catch (error) {
    console.error('❌ 设置过程中出错:', error.message);
    console.log('\n📚 请参考 CMS-SETUP.md 进行手动设置');
    process.exit(1);
  }
}

main();