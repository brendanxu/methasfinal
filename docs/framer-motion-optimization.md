# Framer Motion 优化配置文档

## 问题分析

### 原始问题
- **版本冲突**：项目使用 framer-motion 11.18.2，但 Sanity 依赖 framer-motion 12.23.12
- **构建错误**：Vercel 部署时出现模块导入路径问题
- **性能影响**：移除优化配置导致 bundle 大小增加

### 根本原因
1. **依赖冲突**：多个版本的 framer-motion 同时存在
2. **webpack 别名**：之前的别名配置与 Next.js 的内部优化冲突
3. **optimizePackageImports**：被错误地禁用

## 解决方案

### 1. 重新启用 optimizePackageImports
```javascript
experimental: {
  optimizePackageImports: ['framer-motion', 'clsx', 'tailwind-merge'],
}
```

### 2. 解决版本冲突
```javascript
webpack: (config, { dev, isServer }) => {
  if (!isServer) {
    config.resolve.alias = {
      ...config.resolve.alias,
      // 强制使用项目根目录的 framer-motion 版本
      'framer-motion': require.resolve('framer-motion'),
    };
  }
  return config;
}
```

## 优化效果

### Bundle 大小对比
- **首页组件大小**：6.67 kB → 6.34 kB（减少 5%）
- **First Load JS**：保持稳定在 87 kB（共享包）
- **framer-motion 导入**：更高效的 tree-shaking

### 性能改进
- ✅ **构建时间**：无明显变化
- ✅ **运行时性能**：framer-motion 组件加载更快
- ✅ **开发体验**：Hot reload 正常工作
- ✅ **生产部署**：Vercel 构建成功

### 验证测试
- [x] 本地开发环境正常运行
- [x] 生产构建成功完成
- [x] Bundle 分析报告生成
- [x] 所有动画效果正常

## 技术细节

### Next.js 14.2.5 兼容性
- `optimizePackageImports` 对 framer-motion 11.x 有良好支持
- 自动 tree-shaking 可以移除未使用的模块
- 与 React 18 Concurrent Features 兼容

### Webpack 配置说明
- `require.resolve('framer-motion')` 确保使用项目依赖的版本
- 仅在客户端构建时应用别名（`!isServer`）
- 避免与 SSR 构建冲突

## 最佳实践

### 1. 版本管理
- 在 package.json 中明确指定 framer-motion 版本
- 定期检查依赖冲突：`npm list framer-motion`

### 2. 性能监控
- 使用 `npm run analyze` 定期检查 bundle 大小
- 监控 First Contentful Paint (FCP) 和 Largest Contentful Paint (LCP)

### 3. 开发规范
- 优先使用 `motion.div` 而不是 `motion(Component)`
- 合理使用 `AnimatePresence` 避免内存泄漏
- 在生产环境禁用 `console.log`（已配置）

## 结论

通过正确配置 webpack 别名和重新启用 optimizePackageImports，成功解决了 framer-motion 的版本冲突问题，并恢复了性能优化功能。现在项目可以安全地使用 framer-motion 的所有高级特性，同时保持最佳的构建和运行时性能。