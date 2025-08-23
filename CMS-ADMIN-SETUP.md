# Methas CMS 管理员完整配置指南

## 🎯 一键启动 CMS

### 方法一：自动配置（推荐）

```bash
# 1. 快速设置（选择你偏好的登录方式）
sanity login

# 2. 创建项目（系统会自动生成项目 ID）
sanity init --create-project "Methas CMS" --dataset production

# 3. 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 填入项目 ID

# 4. 启动 CMS
npm run studio
```

### 方法二：手动配置

如果自动配置遇到问题，按以下步骤操作：

```bash
# 1. 访问 Sanity 管理控制台
open https://sanity.io/manage

# 2. 创建新项目
# - 项目名称: Methas CMS
# - 数据集: production
# - 模板: Blog (暂时选择，我们会覆盖)

# 3. 获取项目 ID 并配置 .env.local

# 4. 启动 Studio
npm run studio
```

## 🎨 CMS 界面特色

### 设计风格
- **Southpole 极简风格**：纯黑白配色方案
- **Inter 字体**：与网站保持一致
- **圆角设计**：24px 主要圆角，16px 次要圆角
- **平滑动画**：200ms 快速响应动画

### 中文本土化
- 所有界面元素都是中文
- 符合中文用户操作习惯
- 清晰的状态指示和反馈

## 📚 内容管理指南

### 1. 首页设置

#### Hero 轮播管理
```
进入：首页设置 → Hero 轮播
功能：
- 支持图片和视频
- 中英双语标题
- 自定义 CTA 按钮
- 拖拽排序
状态：启用/禁用控制
```

#### 服务板块管理
```
进入：首页设置 → 服务板块
功能：
- 4 个服务步骤
- 富文本详细内容
- 特性列表管理
- 服务图片上传
排序：按步骤编号 1-4
```

#### 统计数据管理
```
进入：首页设置 → 统计数据
功能：
- 动态数值显示
- 图标类型选择
- 中英双语描述
- 自定义排序
图标类型：减排、项目、客户、成本、时间、效率
```

### 2. 碳智观察文章系统

#### 文章创建工作流
1. **创建文章**
   - 进入：碳智观察 → 创建
   - 填写中英文标题、副标题、摘要
   - 上传封面图片（必需）
   - 选择分类和标签

2. **内容编辑**
   - 使用富文本编辑器
   - 支持标题层级（H1-H3）
   - 插入图片和链接
   - 中英双语内容

3. **发布设置**
   - 设置发布状态
   - 选择是否在首页展示
   - 配置 SEO 信息
   - 设置作者和阅读时间

#### 文章分类系统
- **行业趋势** (trend)
- **政策法规** (policy)
- **技术创新** (technology)
- **碳市场** (market)
- **案例分享** (case)
- **研究报告** (research)

## 🔐 管理员权限配置

### 用户角色设置

1. **超级管理员** (你)
   - 完整访问权限
   - 可以管理其他用户
   - 可以修改项目设置

2. **内容编辑**
   - 可以创建和编辑所有内容
   - 不能删除已发布内容
   - 不能修改用户权限

3. **内容审核**
   - 可以审核和发布内容
   - 不能创建新内容
   - 只能查看统计数据

### 添加团队成员

```bash
# 方法一：通过 Sanity 控制台
1. 访问 https://sanity.io/manage
2. 选择 "Methas CMS" 项目
3. 点击 "Members" 选项卡
4. 点击 "Invite member"
5. 输入邮箱地址
6. 选择角色权限
7. 发送邀请

# 方法二：通过 CLI
sanity users list
sanity users invite email@example.com --role editor
```

## 🚀 部署配置

### Studio 部署

```bash
# 构建生产版本
npm run studio:build

# 部署到 Sanity 云端
npm run studio:deploy

# 自定义子域名（可选）
sanity deploy --studio-host=methas-cms
```

部署后访问地址：`https://methas-cms.sanity.studio`

### 域名配置

在 Sanity 管理控制台配置允许的域名：
- `http://localhost:3333` (开发)
- `https://methas-cms.sanity.studio` (生产)
- `https://your-custom-domain.com` (如果需要)

## 📊 内容管理最佳实践

### 内容创作流程

1. **规划内容**
   - 确定目标受众
   - 选择合适的分类
   - 规划发布时间

2. **创作内容**
   - 标题要简洁有力
   - 摘要控制在 300 字内
   - 使用高质量配图
   - 设置合适的标签

3. **质量检查**
   - 检查中英文内容一致性
   - 验证图片和链接
   - 预览最终效果
   - 检查 SEO 设置

4. **发布和推广**
   - 设置合适的发布时间
   - 选择是否首页展示
   - 分享到社交媒体
   - 监控阅读数据

### SEO 优化建议

```markdown
SEO 标题：控制在 60 字符内
SEO 描述：控制在 160 字符内
关键词：3-5 个相关关键词
图片 Alt：描述性替代文本
```

## 🔧 故障排除

### 常见问题解决

1. **无法登录 Studio**
   ```bash
   # 重新登录
   sanity logout
   sanity login
   ```

2. **内容不同步**
   ```bash
   # 检查项目配置
   sanity projects list
   sanity dataset list
   ```

3. **图片上传失败**
   - 检查图片大小（建议 < 10MB）
   - 检查网络连接
   - 尝试刷新页面

4. **样式显示异常**
   - 清除浏览器缓存
   - 检查 CSS 文件是否正确加载
   - 尝试硬刷新 (Ctrl+F5)

### 备份和恢复

```bash
# 导出数据备份
sanity dataset export production backup.tar.gz

# 导入数据恢复
sanity dataset import backup.tar.gz production --replace
```

## 📞 技术支持

### 获取帮助渠道

1. **项目文档**
   - `CMS-SETUP.md` - 技术设置文档
   - `QUICK-START.md` - 快速开始指南
   - 本文档 - 管理员完整指南

2. **官方资源**
   - [Sanity 官方文档](https://www.sanity.io/docs)
   - [Sanity 社区论坛](https://www.sanity.io/slack)
   - [Sanity 支持中心](https://www.sanity.io/help)

3. **联系开发团队**
   - GitHub Issues
   - 邮件支持
   - 紧急技术支持

## 🎉 完成设置

现在你已经拥有一个专业级的 CMS 管理系统：

✅ **界面统一**：与网站保持一致的 Southpole 设计风格  
✅ **中文友好**：完全本土化的用户界面  
✅ **功能完整**：支持所有网站内容的动态管理  
✅ **用户友好**：直观的操作界面，无需技术背景  
✅ **权限控制**：灵活的团队协作和权限管理  
✅ **SEO 优化**：内置 SEO 最佳实践支持  

**管理员登录**：使用你的 Sanity 账户（GitHub/Google/Email）直接登录即可开始管理！

---

**🔗 快速链接**
- CMS 管理界面：http://localhost:3333
- 网站预览：http://localhost:3000  
- Sanity 管理控制台：https://sanity.io/manage