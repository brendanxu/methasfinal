# Methas CMS 快速开始指南

## 🚀 5分钟快速启动

### 步骤 1: 创建 Sanity 项目

```bash
# 1. 登录 Sanity（选择 GitHub 登录）
sanity login

# 2. 创建新项目
sanity init --create-project "Methas CMS" --dataset production
```

当提示选择项目模板时，选择 **"Clean project with no predefined schemas"**

### 步骤 2: 获取项目 ID 并配置环境

创建项目后，你会看到类似这样的输出：
```
✅ Success! Created project "Methas CMS"
📡 Project ID: abc123de (这是你的项目 ID)
```

复制 `.env.example` 到 `.env.local` 并填入你的项目信息：

```bash
cp .env.example .env.local
```

编辑 `.env.local`：
```env
# Sanity CMS - 替换成你的实际项目 ID
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123de
NEXT_PUBLIC_SANITY_DATASET=production

# 其他配置
NEXT_PUBLIC_SITE_URL=https://methas.cn
ANALYZE=false
NODE_ENV=development
```

### 步骤 3: 启动 CMS 管理界面

```bash
# 启动 Sanity Studio
npm run studio
```

访问 http://localhost:3333 即可进入 CMS 管理界面！

### 步骤 4: 开始管理内容

CMS 界面包含以下内容类型：

1. **首页设置**
   - Hero 轮播：管理首页轮播图和视频
   - 服务板块：管理4步服务介绍
   - 统计数据：管理首页数字展示

2. **碳智观察**
   - 创建和管理文章
   - 设置首页展示文章
   - 文章分类和标签管理

### 步骤 5: 启动网站（可选）

在另一个终端启动前端：

```bash
npm run dev
```

访问 http://localhost:3000 查看你的网站！

## 🎨 CMS 界面特色

- **Southpole 风格设计**：与网站保持一致的极简黑白设计
- **中文界面**：所有标签和说明都是中文
- **直观的内容管理**：清晰的状态指示和分类
- **实时预览**：支持内容预览和实时更新

## 📚 更多功能

### 创建第一篇文章
1. 进入 CMS → 碳智观察 → 创建新文章
2. 填写中英文标题和内容
3. 上传封面图片
4. 设置为"首页展示"
5. 点击"发布"

### 管理 Hero 轮播
1. 进入 CMS → 首页设置 → Hero 轮播
2. 创建新轮播项
3. 选择图片或视频
4. 设置标题和 CTA 按钮
5. 调整排序

### 更新统计数据
1. 进入 CMS → 首页设置 → 统计数据
2. 编辑现有数据或创建新的
3. 选择合适的图标类型
4. 设置显示顺序

## 🔧 故障排除

### 常见问题

1. **CMS 无法访问**
   - 检查 `.env.local` 中的项目 ID 是否正确
   - 确保运行了 `npm run studio`

2. **内容不显示**
   - 检查内容是否设置为"已发布"或"启用"状态
   - 刷新前端页面

3. **图片无法显示**
   - 确保图片已正确上传到 Sanity
   - 检查网络连接

### 获取帮助

- 查看完整文档：`CMS-SETUP.md`
- Sanity 官方文档：https://www.sanity.io/docs
- 项目 GitHub 仓库：提交 issue

## 🎉 完成！

现在你可以使用专业的 CMS 界面管理所有网站内容，无需任何技术背景即可轻松操作！

---

**管理员登录信息**：使用你的 Sanity 账户（GitHub/Google）即可直接登录管理