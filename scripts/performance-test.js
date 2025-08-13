#!/usr/bin/env node

// 性能测试脚本
// 用于测试网站的核心性能指标

const { execSync } = require('child_process');
const fs = require('fs');

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// 测试页面列表
const testPages = [
  { name: '首页', url: `${BASE_URL}/zh` },
  { name: '解决方案', url: `${BASE_URL}/zh/solutions` },
  { name: '关于我们', url: `${BASE_URL}/zh/about` },
  { name: 'English Home', url: `${BASE_URL}/en` },
];

// 性能阈值 (基于文档要求)
const PERFORMANCE_THRESHOLDS = {
  responseTime: 2.5, // 秒 (LCP目标 ≤ 2.5s)
  maxSize: 500000,   // bytes (500KB 初始包大小)
};

console.log('🚀 开始性能测试...\n');

async function testPage(page) {
  console.log(`测试页面: ${page.name}`);
  console.log(`URL: ${page.url}`);
  
  try {
    // 使用 curl 测试响应时间和大小
    const result = execSync(
      `curl -s -w "CURL_TIME:%{time_total}\\nCURL_SIZE:%{size_download}\\nCURL_STATUS:%{http_code}\\n" "${page.url}" -o /dev/null`,
      { encoding: 'utf8' }
    );
    
    const lines = result.split('\n');
    const time = parseFloat(lines.find(l => l.startsWith('CURL_TIME:'))?.split(':')[1] || '0');
    const size = parseInt(lines.find(l => l.startsWith('CURL_SIZE:'))?.split(':')[1] || '0');
    const status = parseInt(lines.find(l => l.startsWith('CURL_STATUS:'))?.split(':')[1] || '0');
    
    console.log(`  ⏱️  响应时间: ${time.toFixed(3)}s`);
    console.log(`  📦 页面大小: ${(size / 1024).toFixed(2)}KB`);
    console.log(`  📊 HTTP状态: ${status}`);
    
    // 性能检查
    const checks = [];
    
    if (status === 200) {
      checks.push('✅ HTTP状态正常');
    } else {
      checks.push('❌ HTTP状态错误');
    }
    
    if (time <= PERFORMANCE_THRESHOLDS.responseTime) {
      checks.push('✅ 响应时间达标');
    } else {
      checks.push(`❌ 响应时间超标 (>${PERFORMANCE_THRESHOLDS.responseTime}s)`);
    }
    
    if (size <= PERFORMANCE_THRESHOLDS.maxSize) {
      checks.push('✅ 页面大小达标');
    } else {
      checks.push(`❌ 页面大小超标 (>${PERFORMANCE_THRESHOLDS.maxSize / 1024}KB)`);
    }
    
    checks.forEach(check => console.log(`  ${check}`));
    
    return {
      name: page.name,
      url: page.url,
      time,
      size,
      status,
      passed: status === 200 && time <= PERFORMANCE_THRESHOLDS.responseTime && size <= PERFORMANCE_THRESHOLDS.maxSize
    };
    
  } catch (error) {
    console.log(`  ❌ 测试失败: ${error.message}`);
    return {
      name: page.name,
      url: page.url,
      error: error.message,
      passed: false
    };
  }
  
  console.log('');
}

async function runTests() {
  const results = [];
  
  for (const page of testPages) {
    const result = await testPage(page);
    results.push(result);
  }
  
  // 生成总结报告
  console.log('📋 测试总结报告');
  console.log('═'.repeat(50));
  
  const passed = results.filter(r => r.passed).length;
  const total = results.length;
  
  console.log(`✅ 通过测试: ${passed}/${total}`);
  console.log(`📈 通过率: ${((passed / total) * 100).toFixed(1)}%`);
  
  if (passed === total) {
    console.log('\n🎉 所有页面性能测试通过！');
  } else {
    console.log('\n⚠️  以下页面需要优化:');
    results.filter(r => !r.passed).forEach(r => {
      console.log(`  - ${r.name}: ${r.error || '性能不达标'}`);
    });
  }
  
  // 生成 JSON 报告
  const report = {
    timestamp: new Date().toISOString(),
    passed,
    total,
    passRate: (passed / total) * 100,
    thresholds: PERFORMANCE_THRESHOLDS,
    results
  };
  
  fs.writeFileSync('./performance-report.json', JSON.stringify(report, null, 2));
  console.log('\n📄 详细报告已生成: performance-report.json');
}

// SEO 测试
async function testSEO() {
  console.log('\n🔍 SEO 测试');
  console.log('═'.repeat(30));
  
  const seoTests = [
    { name: 'Sitemap', url: `${BASE_URL}/sitemap.xml` },
    { name: 'Robots.txt', url: `${BASE_URL}/robots.txt` },
  ];
  
  for (const test of seoTests) {
    try {
      const result = execSync(`curl -s -w "%{http_code}" "${test.url}" -o /dev/null`, { encoding: 'utf8' });
      const status = parseInt(result);
      
      if (status === 200) {
        console.log(`✅ ${test.name}: 可访问`);
      } else {
        console.log(`❌ ${test.name}: HTTP ${status}`);
      }
    } catch (error) {
      console.log(`❌ ${test.name}: 测试失败`);
    }
  }
}

// 运行所有测试
async function main() {
  await runTests();
  await testSEO();
  
  console.log('\n🏁 性能测试完成！');
}

main().catch(console.error);