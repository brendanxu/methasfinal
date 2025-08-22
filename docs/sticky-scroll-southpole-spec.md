# Sticky-Scroll 服务板块设计规范

> 结合 Sticky-Scroll 交互与 Southpole 极简美学的设计方案

## 📐 布局结构

### 整体布局
```
┌──────────────────────────────────────────────┐
│                   Hero Section                │
│              (100vh, 超大标题)                 │
└──────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────┐
│  服务板块 (Sticky-Scroll Section)              │
│ ┌────────────────┬──────────────────────────┐ │
│ │                │                          │ │
│ │   固定图片      │      滚动内容区          │ │
│ │   (50%)        │       (50%)              │ │
│ │                │                          │ │
│ │   position:    │    Step 1: 标题          │ │
│ │   sticky       │    描述文字...           │ │
│ │                │                          │ │
│ │                │    Step 2: 标题          │ │
│ │                │    描述文字...           │ │
│ │                │                          │ │
│ │                │    Step 3: 标题          │ │
│ │                │    描述文字...           │ │
│ │                │                          │ │
│ │                │    Step 4: 标题          │ │
│ │                │    描述文字...           │ │
│ └────────────────┴──────────────────────────┘ │
└──────────────────────────────────────────────┘
```

## 🎨 Southpole 风格适配

### 视觉特点
1. **极简布局**
   - 左右严格 50/50 分割
   - 无多余装饰元素
   - 大量垂直留白

2. **色彩处理**
   - 纯黑白对比
   - 图片：黑白或单色处理
   - 文字：纯黑 (#000)
   - 背景：纯白 (#FFF)

3. **字体层级**
   ```css
   /* 服务标题 */
   .service-title {
     font-size: 48px;
     font-weight: 300;
     line-height: 1.2;
     letter-spacing: -0.02em;
     margin-bottom: 32px;
   }
   
   /* 服务描述 */
   .service-description {
     font-size: 18px;
     font-weight: 400;
     line-height: 1.8;
     color: #666;
     max-width: 480px;
   }
   
   /* 步骤编号 */
   .step-number {
     font-size: 14px;
     font-weight: 500;
     letter-spacing: 0.1em;
     color: #999;
     margin-bottom: 24px;
   }
   ```

## 🔄 交互细节

### Sticky 行为
1. **触发条件**
   - 当服务板块顶部到达视口顶部时激活
   - 左侧图片固定在视口中心
   - 右侧内容正常滚动

2. **切换效果**
   - 图片切换：淡入淡出 (300ms)
   - 无过度动画，保持克制
   - 使用 Intersection Observer (threshold: 0.5)

3. **响应逻辑**
   ```javascript
   // 核心逻辑
   const observerOptions = {
     root: null,
     rootMargin: '0px',
     threshold: 0.5  // 50% 可见时切换
   };
   
   // 切换动画
   const transition = {
     duration: 0.3,
     ease: [0, 0, 0.2, 1]  // ease-out
   };
   ```

## 📱 响应式设计

### 断点处理
```css
/* 桌面端 (>1024px) */
@media (min-width: 1024px) {
  .sticky-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
  }
}

/* 平板端 (768px - 1024px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .sticky-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
}

/* 移动端 (<768px) */
@media (max-width: 767px) {
  .sticky-section {
    display: block;
  }
  
  .sticky-image {
    position: relative;
    height: 50vh;
    margin-bottom: 40px;
  }
}
```

## 💡 实现要点

### 1. HTML 结构
```html
<section class="sticky-scroll-section">
  <div class="container">
    <div class="sticky-wrapper">
      <!-- 左侧固定 -->
      <div class="sticky-media">
        <img src="service-1.jpg" data-step="1" />
        <img src="service-2.jpg" data-step="2" />
        <img src="service-3.jpg" data-step="3" />
        <img src="service-4.jpg" data-step="4" />
      </div>
      
      <!-- 右侧滚动 -->
      <div class="scroll-content">
        <div class="service-step" data-step="1">
          <span class="step-number">01</span>
          <h3 class="service-title">甲烷监测</h3>
          <p class="service-description">
            实时监测甲烷排放，精准定位泄漏源...
          </p>
        </div>
        <!-- 重复 4 个步骤 -->
      </div>
    </div>
  </div>
</section>
```

### 2. 关键 CSS
```css
.sticky-media {
  position: sticky;
  top: 50%;
  transform: translateY(-50%);
  height: 60vh;
  overflow: hidden;
}

.scroll-content {
  padding: 120px 0;
}

.service-step {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 80px 0;
}
```

### 3. 间距系统
```css
/* Southpole 风格间距 */
--spacing-xs: 8px;
--spacing-sm: 16px;
--spacing-md: 24px;
--spacing-lg: 32px;
--spacing-xl: 48px;
--spacing-2xl: 80px;
--spacing-3xl: 120px;

/* 应用 */
.service-step {
  padding-top: var(--spacing-2xl);
  padding-bottom: var(--spacing-2xl);
}

.service-title {
  margin-bottom: var(--spacing-lg);
}
```

## ✅ 设计检查清单

- [ ] 左右严格 50/50 分割
- [ ] 图片使用黑白或单色处理
- [ ] 标题使用 48px 细体
- [ ] 描述文字 18px，灰色 (#666)
- [ ] 每个步骤最小高度 100vh
- [ ] 步骤间留白 80-120px
- [ ] 切换动画控制在 300ms
- [ ] 移动端降级为堆叠布局
- [ ] 确保文字可读性（对比度 >4.5:1）
- [ ] 测试滚动性能（保持 60fps）

## 🎯 与 Southpole 的一致性

1. **保持的元素**
   - Sticky-scroll 交互机制
   - 左图右文的布局结构
   - 步进式内容展示

2. **调整的元素**
   - 去除所有装饰性元素
   - 使用更大的字号对比
   - 增加留白空间
   - 简化过渡动画
   - 采用黑白配色

3. **新增的 Southpole 特色**
   - 极细的分割线（1px）
   - 大写字母的步骤编号
   - 更轻的字重（300-400）
   - 更大的段落间距