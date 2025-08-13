# SEO 模板与结构化数据规范
> 版本：v1.0 | 日期：2025-01-12 | 负责人：内容策略 & SEO 主编

## 📏 元信息长度基准

### 标题与描述长度规范
| 元素 | 中文建议 | 英文建议 | 显示限制 | 重要性 |
|------|----------|----------|----------|---------|
| **Title标签** | 12-18个字 | 50-60字符 | Google截断60字符 | 🌟🌟🌟 |
| **Meta Description** | 40-60个字 | 140-160字符 | Google截断160字符 | 🌟🌟 |
| **H1标题** | ≤9个字 | ≤65字符 | 页面唯一 | 🌟🌟🌟 |
| **OG Title** | 15-20个字 | 60-90字符 | 社交媒体展示 | 🌟🌟 |
| **OG Description** | 50-80个字 | 150-200字符 | 社交媒体展示 | 🌟 |

### 长度校验工具
```javascript
// 长度检查函数
function checkSEOLength(text, type, lang) {
  const length = lang === 'zh' ? text.length : text.replace(/[\u4e00-\u9fa5]/g, 'xx').length;
  const limits = {
    title: { zh: [12, 18], en: [50, 60] },
    description: { zh: [40, 60], en: [140, 160] },
    h1: { zh: [1, 9], en: [1, 65] }
  };
  const [min, max] = limits[type][lang];
  return length >= min && length <= max;
}
```

## 🌐 全站模板配置

### 基础Meta模板
```html
<!-- 通用Title格式 -->
<title>{{page_title}} | Methas</title>

<!-- 通用Description格式 -->
<meta name="description" content="{{page_description}}">

<!-- Canonical URL -->
<link rel="canonical" href="https://methas.cn{{current_path}}">

<!-- 语言标记 hreflang -->
<link rel="alternate" hreflang="zh-CN" href="https://methas.cn/zh{{page_path}}">
<link rel="alternate" hreflang="en" href="https://methas.cn/en{{page_path}}">
<link rel="alternate" hreflang="x-default" href="https://methas.cn/zh{{page_path}}">

<!-- Open Graph基础 -->
<meta property="og:site_name" content="Methas">
<meta property="og:type" content="website">
<meta property="og:title" content="{{og_title | default: page_title}}">
<meta property="og:description" content="{{og_description | default: page_description}}">
<meta property="og:image" content="https://methas.cn/og-default.png">
<meta property="og:url" content="https://methas.cn{{current_path}}">
<meta property="og:locale" content="{{locale}}">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{twitter_title | default: page_title}}">
<meta name="twitter:description" content="{{twitter_description | default: page_description}}">
<meta name="twitter:image" content="https://methas.cn/twitter-card.png">

<!-- Robots规则 -->
<meta name="robots" content="{{robots | default: 'index, follow'}}">
```

### Robots.txt配置
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /brand-preview/
Disallow: /_next/
Disallow: /temp/
Sitemap: https://methas.cn/sitemap-zh.xml
Sitemap: https://methas.cn/sitemap-en.xml
```

## 📄 各页面SEO模板

### 首页 (Homepage)
```html
<!-- 中文版 -->
<title>甲烷减排与碳资产解决方案 | Methas</title>
<meta name="description" content="Methas提供专业MRV技术，帮助矿业企业实现甲烷减排40%，创造可交易碳资产。500+矿井信赖，累计减排120万吨CO₂e。">
<h1>智能甲烷监测系统</h1>

<!-- 英文版 -->
<title>Methane Reduction & Carbon Asset Solutions | Methas</title>
<meta name="description" content="Methas provides professional MRV technology, enabling 40% methane reduction and tradeable carbon assets. Trusted by 500+ mining sites with 1.2M tCO₂e reduced.">
<h1>Intelligent Methane Monitoring System</h1>

<!-- 关键词建议 -->
中文：甲烷减排, 碳资产, MRV技术, 矿井瓦斯, 碳信用, RWA
英文：methane reduction, carbon assets, MRV technology, mine gas, carbon credits, RWA
```

### Solutions页面 (含Sticky-Step)
```html
<!-- 中文版 -->
<title>MRV甲烷减排方案：监测、核证与资产化 | Methas</title>
<meta name="description" content="ISO 14064标准MRV体系，第三方VVB核证，将减排量转化为可交易碳资产。完整方法学支持，确保合规性。">
<h1>甲烷减排解决方案</h1>

<!-- 英文版 -->
<title>MRV Methane Reduction: Monitoring, Verification & Assetization | Methas</title>
<meta name="description" content="ISO 14064 MRV framework with third-party VVB verification, converting reductions to tradeable carbon assets. Complete methodology support ensures compliance.">
<h1>Methane Reduction Solutions</h1>

<!-- Sticky-Step SEO优化 -->
<div itemscope itemtype="https://schema.org/HowTo">
  <h2 itemprop="name">四步实现甲烷减排资产化</h2>
  <div itemprop="step" itemscope itemtype="https://schema.org/HowToStep">
    <h3 itemprop="name">痛点与机会识别</h3>
  </div>
  <!-- 更多步骤... -->
</div>
```

### Case Studies (案例页)
#### 列表页
```html
<!-- 中文版 -->
<title>甲烷减排成功案例：煤矿瓦斯治理项目 | Methas</title>
<meta name="description" content="查看Methas在煤炭、金属矿山的甲烷减排案例。平均减排40%以上，已助力500+矿井实现碳资产增值。">
<h1>成功案例</h1>

<!-- 英文版 -->
<title>Methane Reduction Case Studies: Coal Mine Gas Projects | Methas</title>
<meta name="description" content="View Methas methane reduction cases in coal and metal mining. Average 40%+ reduction, helping 500+ mines create carbon asset value.">
<h1>Case Studies</h1>
```

#### 详情页模板
```html
<title>{{客户名称}}甲烷减排案例：减少{{百分比}}排放 | Methas</title>
<meta name="description" content="{{客户名称}}通过Methas MRV技术，在{{时长}}内实现甲烷减排{{百分比}}，年减排{{吨数}}tCO₂e。查看完整案例分析。">
<h1>{{客户名称}}甲烷减排项目</h1>
```

### Methas Insights (文章页)
#### 列表页
```html
<!-- 中文版 -->
<title>Methas Insights：碳市场分析与MRV技术洞察 | Methas</title>
<meta name="description" content="深度解读甲烷减排政策、MRV技术发展、碳市场动态。为矿业企业提供专业的碳资产管理知识。">
<h1>Methas Insights</h1>

<!-- 英文版 -->
<title>Methas Insights: Carbon Market Analysis & MRV Technology | Methas</title>
<meta name="description" content="In-depth analysis of methane reduction policies, MRV technology development, and carbon market trends. Professional carbon asset management knowledge for mining enterprises.">
<h1>Methas Insights</h1>
```

#### 文章详情页模板
```html
<title>{{文章标题}} | Methas Insights</title>
<meta name="description" content="{{文章摘要，限160字符}}">
<h1>{{文章标题}}</h1>

<!-- 作者与日期 -->
<meta name="author" content="{{作者名称}}">
<meta name="publish_date" content="{{YYYY-MM-DD}}">
<meta name="article:section" content="{{分类}}">
```

### About页面
```html
<!-- 中文版 -->
<title>关于Methas：专业甲烷减排技术服务商 | Methas</title>
<meta name="description" content="Methas是领先的甲烷减排技术服务商，提供MRV监测、核证与碳资产化服务。20年行业经验，ISO认证体系。">
<h1>关于Methas</h1>

<!-- 英文版 -->
<title>About Methas: Professional Methane Reduction Technology Provider | Methas</title>
<meta name="description" content="Methas is a leading methane reduction technology provider, offering MRV monitoring, verification and carbon assetization services. 20 years industry experience with ISO certification.">
<h1>About Methas</h1>
```

### Legal页面
```html
<!-- 低权重处理 -->
<title>法律声明与隐私政策 | Methas</title>
<meta name="description" content="Methas网站使用条款、隐私政策与免责声明。">
<meta name="robots" content="noindex, follow">
<link rel="canonical" href="https://methas.cn/zh/legal">
```

## 📊 结构化数据JSON-LD模板

### 组织信息 (全站)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Methas",
  "alternateName": "Methas Technology",
  "url": "https://methas.cn",
  "logo": "https://methas.cn/logo.png",
  "description": "{{组织描述}}",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "{{电话}}",
    "contactType": "Customer Service",
    "availableLanguage": ["Chinese", "English"]
  },
  "sameAs": [
    "https://linkedin.com/company/methas",
    "https://twitter.com/methas"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "CN",
    "addressRegion": "{{省份}}",
    "addressLocality": "{{城市}}",
    "streetAddress": "{{街道地址}}"
  }
}
</script>
```

### 网站信息
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Methas",
  "url": "https://methas.cn",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://methas.cn/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
</script>
```

### 面包屑导航
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "首页",
      "item": "https://methas.cn/zh"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "{{一级页面}}",
      "item": "https://methas.cn/zh/{{path}}"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "{{当前页面}}",
      "item": "https://methas.cn/zh/{{full_path}}"
    }
  ]
}
</script>
```

### 案例研究 (CaseStudy)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CaseStudy",
  "name": "{{案例标题}}",
  "description": "{{案例描述}}",
  "about": {
    "@type": "Thing",
    "name": "甲烷减排项目"
  },
  "provider": {
    "@type": "Organization",
    "name": "Methas"
  },
  "result": {
    "@type": "Thing",
    "name": "减排成果",
    "description": "甲烷减排{{百分比}}，年减排{{吨数}}tCO₂e"
  },
  "duration": "{{项目时长}}",
  "image": "{{案例图片URL}}",
  "url": "{{案例页面URL}}",
  "datePublished": "{{发布日期}}"
}
</script>
```

### 文章/博客 (Article)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{{文章标题}}",
  "description": "{{文章摘要}}",
  "author": {
    "@type": "Person",
    "name": "{{作者名称}}",
    "jobTitle": "{{职位}}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Methas",
    "logo": {
      "@type": "ImageObject",
      "url": "https://methas.cn/logo.png"
    }
  },
  "datePublished": "{{发布日期}}",
  "dateModified": "{{更新日期}}",
  "image": "{{文章主图URL}}",
  "articleSection": "{{文章分类}}",
  "keywords": "{{关键词1}}, {{关键词2}}, {{关键词3}}",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "{{文章URL}}"
  }
}
</script>
```

### FAQ结构化数据 (可选)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "MRV技术如何实现甲烷减排？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MRV（监测、报告、核证）技术通过实时监测甲烷排放数据，采用ISO 14064标准流程进行核证，确保减排量真实可信。"
      }
    },
    {
      "@type": "Question",
      "name": "碳资产如何进行交易？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "经过第三方VVB核证的减排量可转化为碳信用，在国际碳交易市场进行交易，为企业创造额外收益。"
      }
    }
  ]
}
</script>
```

## 🗺️ Sitemap与索引策略

### XML Sitemap结构
#### 中文站点地图 (/sitemap-zh.xml)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://methas.cn/zh</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://methas.cn/en"/>
    <xhtml:link rel="alternate" hreflang="zh-CN" href="https://methas.cn/zh"/>
    <lastmod>2025-01-12</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://methas.cn/zh/solutions</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://methas.cn/en/solutions"/>
    <xhtml:link rel="alternate" hreflang="zh-CN" href="https://methas.cn/zh/solutions"/>
    <lastmod>2025-01-12</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <!-- 更多URL... -->
</urlset>
```

#### 英文站点地图 (/sitemap-en.xml)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://methas.cn/en</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://methas.cn/en"/>
    <xhtml:link rel="alternate" hreflang="zh-CN" href="https://methas.cn/zh"/>
    <lastmod>2025-01-12</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- 更多URL... -->
</urlset>
```

### 更新频率建议
| 页面类型 | changefreq | priority | 说明 |
|----------|------------|----------|------|
| 首页 | weekly | 1.0 | 最高优先级 |
| Solutions | monthly | 0.9 | 核心产品页 |
| Case Studies | monthly | 0.8 | 案例更新 |
| Insights | weekly | 0.7 | 内容更新频繁 |
| About | yearly | 0.6 | 较少变动 |
| Legal | yearly | 0.3 | 极少变动 |

### 重定向与语言切换
```
301永久重定向：
- 旧URL结构 → 新URL结构
- HTTP → HTTPS

302临时重定向：
- / → /zh (默认语言)
- 维护期间的临时跳转

语言切换处理：
- 保持URL路径一致
- Cookie记录用户语言偏好
- Accept-Language头部检测
```

## 🖼️ 图片与视频SEO

### 图片优化规范
```html
<!-- 图片标签完整示例 -->
<img 
  src="/images/methane-monitoring-system.webp"
  alt="甲烷实时监测系统显示减排数据仪表板"
  title="Methas智能监测系统"
  width="1200"
  height="630"
  loading="lazy"
  decoding="async"
/>

<!-- Next.js Image组件 -->
<Image
  src="/images/case-study-shanxi.jpg"
  alt="山西煤矿甲烷减排项目现场"
  width={1200}
  height={630}
  priority={false}
  placeholder="blur"
/>
```

### 图片命名与尺寸
| 用途 | 建议尺寸 | 文件命名 | 格式 |
|------|----------|----------|------|
| OG Image | 1200×630 | og-{{page-name}}.png | PNG/JPG |
| Hero图片 | 1920×1080 | hero-{{description}}.webp | WebP |
| 案例图片 | 800×600 | case-{{client}}-{{date}}.jpg | JPG |
| 团队照片 | 400×400 | team-{{name}}-{{role}}.jpg | JPG |
| 图标 | 64×64 | icon-{{name}}.svg | SVG |

### 视频SEO (可选)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "{{视频标题}}",
  "description": "{{视频描述}}",
  "thumbnailUrl": "{{缩略图URL}}",
  "uploadDate": "{{上传日期}}",
  "duration": "PT{{X}}M{{Y}}S",
  "contentUrl": "{{视频URL}}",
  "embedUrl": "{{嵌入URL}}",
  "interactionStatistic": {
    "@type": "InteractionCounter",
    "interactionType": {"@type": "WatchAction"},
    "userInteractionCount": {{观看次数}}
  }
}
</script>
```

## ✅ 上线前SEO检查清单

### 必检项目
- [ ] **Title标签**：所有页面已填写，长度符合规范
- [ ] **Meta Description**：所有页面已填写，包含目标关键词
- [ ] **H1标题**：每页唯一H1，包含核心关键词
- [ ] **Canonical标签**：所有页面正确设置canonical URL
- [ ] **Hreflang标签**：中英文页面正确互联
- [ ] **结构化数据**：通过Google结构化数据测试工具
- [ ] **Sitemap**：XML sitemap可访问，已提交Search Console
- [ ] **Robots.txt**：正确配置，不阻止重要页面
- [ ] **404页面**：自定义404页面，包含导航
- [ ] **HTTPS**：全站HTTPS，无混合内容警告

### 性能检查
- [ ] **移动友好**：通过Google Mobile-Friendly测试
- [ ] **页面速度**：Core Web Vitals达标
- [ ] **图片优化**：使用WebP格式，设置宽高属性
- [ ] **懒加载**：非首屏图片启用lazy loading

### 内容检查
- [ ] **关键词密度**：自然分布，避免堆砌
- [ ] **内链结构**：重要页面有充足内链
- [ ] **外链检查**：所有外链可访问，使用rel属性
- [ ] **Alt文本**：所有图片包含描述性alt文本

### 技术检查
- [ ] **渲染测试**：JavaScript渲染内容可被爬虫识别
- [ ] **重复内容**：无重复页面，必要时使用canonical
- [ ] **URL结构**：简洁、语义化、包含关键词
- [ ] **Schema验证**：结构化数据无错误

### 监控设置
- [ ] **Google Search Console**：已验证所有权
- [ ] **Google Analytics 4**：跟踪代码已安装
- [ ] **百度站长工具**：已提交站点（如需要）
- [ ] **监控告警**：404错误、爬虫问题告警

---

**SEO模板规范完成**：为Methas.cn提供完整的SEO实施指南，确保搜索引擎优化效果最大化。