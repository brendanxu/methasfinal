# Southpole.com UI 原型设计文档

> 基于 southpole.com 的设计语言，为 Methas 项目创建的 UI 原型规范
> 版本：v1.0 | 日期：2025-01-22 | 作者：Claude Code

## 🎯 核心设计理念

### Southpole 设计哲学
- **极简主义**：大量留白，克制的视觉元素
- **高对比**：纯黑白为主，极少量的品牌色点缀
- **大字号系统**：强烈的视觉层级对比
- **细线条**：1px 边框，精致的细节处理
- **专业感**：严肃、可信、权威的视觉调性

## 📐 布局系统

### 容器规范
```css
/* Southpole 风格容器 */
--container-max: 1440px;  /* 更宽的最大宽度 */
--container-padding: 40px; /* 更大的内边距 */
--section-spacing: 120px;  /* 更大的区块间距 */
--grid-gap: 40px;         /* 网格间距 */
```

### 网格系统
- **桌面端**：12 列网格，40px gutter
- **平板端**：8 列网格，32px gutter  
- **移动端**：4 列网格，24px gutter

## 🎨 视觉规范

### 色彩系统
```css
/* Southpole 精简色板 */
--color-black: #000000;      /* 主文字、边框 */
--color-white: #FFFFFF;      /* 背景 */
--color-gray-light: #F5F5F5; /* 浅灰背景 */
--color-gray-mid: #E0E0E0;   /* 分割线 */
--color-gray-dark: #666666;  /* 次要文字 */
--color-accent: #00C853;     /* 品牌绿（极少使用） */
```

### 字体系统
```css
/* Southpole 字体规范 */
--font-primary: "Helvetica Neue", Arial, sans-serif;
--font-weight-light: 300;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-bold: 700;

/* 字号系统 - 大对比度 */
--text-xs: 12px;     /* 辅助信息 */
--text-sm: 14px;     /* 说明文字 */
--text-base: 16px;   /* 正文 */
--text-lg: 18px;     /* 重要正文 */
--text-xl: 24px;     /* 小标题 */
--text-2xl: 32px;    /* 标题 */
--text-3xl: 48px;    /* 大标题 */
--text-4xl: 64px;    /* Hero 标题 */
--text-5xl: 80px;    /* 超大标题 */
```

## 🧩 组件规范

### 1. Header 导航栏
```
设计特点：
- 高度：80px（固定）
- Logo：左侧，黑色，简单文字
- 导航：右侧，水平排列，14px 字号
- 无背景色，仅底部 1px 细线
- 滚动时：背景变白，添加微妙阴影
```

### 2. Hero Section
```
设计特点：
- 高度：100vh 或 80vh
- 超大标题：64-80px，黑色，细体
- 副标题：18px，灰色，400 字重
- CTA 按钮：细边框，悬停填充
- 大量留白，内容垂直居中
```

### 3. 按钮样式
```css
/* Primary Button */
.btn-primary {
  padding: 16px 32px;
  border: 1px solid #000;
  background: transparent;
  color: #000;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: #000;
  color: #fff;
}

/* Secondary Button */
.btn-secondary {
  padding: 16px 32px;
  background: #000;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: #333;
}
```

### 4. 卡片组件
```
设计特点：
- 无边框或极细边框（1px）
- 大量内部留白（40px padding）
- 标题：24-32px，黑色，细体
- 正文：16px，灰色，行高 1.8
- 悬停：微妙的阴影或背景色变化
```

### 5. 内容区块
```
设计特点：
- 标题：48px，黑色，300 字重
- 段落：16px，行高 1.8，最大宽度 720px
- 图片：全宽或 2/3 宽度，无圆角
- 间距：段落间 32px，区块间 120px
```

### 6. Footer
```
设计特点：
- 背景：浅灰色 (#F5F5F5)
- 多列布局：4-5 列
- 标题：14px，黑色，粗体
- 链接：14px，灰色，悬停变黑
- 底部版权：12px，居中，灰色
```

## 📱 响应式设计

### 断点系统
```css
--breakpoint-sm: 640px;   /* 手机 */
--breakpoint-md: 768px;   /* 平板 */
--breakpoint-lg: 1024px;  /* 小屏幕 */
--breakpoint-xl: 1280px;  /* 桌面 */
--breakpoint-2xl: 1536px; /* 大屏幕 */
```

### 移动端适配
- 字号缩小 20-30%
- 间距缩小 40-50%
- 单列布局为主
- 汉堡菜单导航

## ✨ 动效规范

### Southpole 动效特点
```css
/* 极简动效 */
--duration-fast: 200ms;
--duration-normal: 300ms;
--duration-slow: 500ms;

/* 缓动函数 */
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);

/* 常用动效 */
- 悬停：颜色反转、微妙位移
- 滚动：视差效果、淡入动画
- 切换：简单的淡入淡出
```

## 📋 页面原型

### 首页结构
1. **Header**：固定顶部，透明背景
2. **Hero**：全屏大标题 + CTA
3. **服务板块（Sticky-Scroll）**：
   - 左侧：固定图片/视觉元素（50% 宽度）
   - 右侧：滚动内容区（50% 宽度）
   - 设计风格：Southpole 极简美学
   - 交互：保持 sticky 效果，但视觉更克制
   - 内容：4个服务步骤，每步包含标题+描述
   - 视觉：大字号标题（48px），充足留白
4. **数据展示**：大数字 + 说明文字
5. **解决方案**：卡片网格布局
6. **案例**：图文交替排列
7. **CTA**：居中大标题 + 按钮
8. **Footer**：多列链接 + 版权

### Solutions 页面
1. **标题区**：大标题 + 简介
2. **服务网格**：2x3 或 3x2 布局
3. **详细说明**：左右分栏
4. **相关案例**：底部推荐

### About 页面
1. **公司介绍**：大段文字 + 图片
2. **团队**：人物卡片网格
3. **价值观**：图标 + 文字列表
4. **时间线**：垂直时间轴

## 🚀 实施计划

### 第一阶段：基础组件更新
1. 更新全局样式变量
2. 重构 Button 组件
3. 优化 Typography 系统
4. 简化 Card 组件

### 第二阶段：布局组件更新
1. 重新设计 Header
2. 更新 Hero Section
3. 重构 Footer

### 第三阶段：页面实现
1. 重构首页
2. 创建 Solutions 页面
3. 创建 About 页面
4. 优化响应式

### 第四阶段：优化完善
1. 动效系统优化
2. 性能优化
3. 无障碍改进
4. 最终测试

## 📝 注意事项

1. **保持克制**：避免过度设计，保持简洁
2. **注重细节**：1px 的差异也很重要
3. **大胆留白**：不要害怕空白空间
4. **统一性**：保持全站视觉一致性
5. **可读性**：确保文字清晰易读
6. **性能优先**：简洁的设计有助于性能

## 🔗 参考资源

- Southpole.com 官网
- 瑞士设计风格指南
- 极简主义设计原则
- 高对比设计最佳实践