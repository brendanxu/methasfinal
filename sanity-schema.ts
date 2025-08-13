// Sanity Schema 定义
// 这个文件定义了Sanity CMS的内容结构，用于未来的CMS配置

export const sanitySchemas = {
  // 页面内容类型
  page: {
    name: 'page',
    title: '页面',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: '页面标题',
        type: 'string',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'slug',
        title: 'URL路径',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96,
        },
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'content',
        title: '页面内容',
        type: 'array',
        of: [
          {
            type: 'block',
            styles: [
              { title: '正文', value: 'normal' },
              { title: '标题1', value: 'h1' },
              { title: '标题2', value: 'h2' },
              { title: '标题3', value: 'h3' },
              { title: '引用', value: 'blockquote' },
            ],
            marks: {
              decorators: [
                { title: '粗体', value: 'strong' },
                { title: '斜体', value: 'em' },
                { title: '下划线', value: 'underline' },
              ],
              annotations: [
                {
                  title: '链接',
                  name: 'link',
                  type: 'object',
                  fields: [
                    {
                      title: '链接地址',
                      name: 'href',
                      type: 'url',
                    },
                  ],
                },
              ],
            },
          },
          {
            type: 'image',
            options: { hotspot: true },
            fields: [
              {
                name: 'alt',
                type: 'string',
                title: '替代文本',
              },
            ],
          },
        ],
      },
      {
        name: 'seo',
        title: 'SEO设置',
        type: 'object',
        fields: [
          {
            name: 'title',
            title: 'SEO标题',
            type: 'string',
          },
          {
            name: 'description',
            title: 'SEO描述',
            type: 'text',
            rows: 3,
          },
          {
            name: 'keywords',
            title: '关键词',
            type: 'array',
            of: [{ type: 'string' }],
          },
        ],
      },
    ],
    preview: {
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      prepare({ title, slug }: any) {
        return {
          title,
          subtitle: slug,
        };
      },
    },
  },

  // 案例研究类型
  caseStudy: {
    name: 'caseStudy',
    title: '案例研究',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: '案例标题',
        type: 'string',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'slug',
        title: 'URL路径',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96,
        },
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'excerpt',
        title: '简介',
        type: 'text',
        rows: 3,
        validation: (Rule: any) => Rule.required().max(300),
      },
      {
        name: 'content',
        title: '详细内容',
        type: 'array',
        of: [{ type: 'block' }, { type: 'image' }],
      },
      {
        name: 'featuredImage',
        title: '特色图片',
        type: 'image',
        options: { hotspot: true },
        fields: [
          {
            name: 'alt',
            type: 'string',
            title: '替代文本',
          },
        ],
      },
      {
        name: 'industry',
        title: '行业',
        type: 'string',
        options: {
          list: [
            { title: '农业', value: 'agriculture' },
            { title: '能源', value: 'energy' },
            { title: '制造业', value: 'manufacturing' },
            { title: '交通运输', value: 'transportation' },
            { title: '建筑', value: 'construction' },
            { title: '其他', value: 'other' },
          ],
        },
      },
      {
        name: 'results',
        title: '项目成果',
        type: 'object',
        fields: [
          {
            name: 'emissionReduction',
            title: '减排百分比',
            type: 'number',
            validation: (Rule: any) => Rule.min(0).max(100),
          },
          {
            name: 'costSavings',
            title: '成本节省（万元）',
            type: 'number',
            validation: (Rule: any) => Rule.min(0),
          },
          {
            name: 'implementationTime',
            title: '实施周期（月）',
            type: 'number',
            validation: (Rule: any) => Rule.min(1),
          },
        ],
      },
      {
        name: 'publishedAt',
        title: '发布日期',
        type: 'datetime',
        validation: (Rule: any) => Rule.required(),
      },
    ],
    orderings: [
      {
        title: '发布日期（新到旧）',
        name: 'publishedAtDesc',
        by: [{ field: 'publishedAt', direction: 'desc' }],
      },
    ],
    preview: {
      select: {
        title: 'title',
        industry: 'industry',
        media: 'featuredImage',
      },
      prepare({ title, industry, media }: any) {
        return {
          title,
          subtitle: industry,
          media,
        };
      },
    },
  },

  // 团队成员类型
  teamMember: {
    name: 'teamMember',
    title: '团队成员',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: '姓名',
        type: 'string',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'role',
        title: '职位',
        type: 'string',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'bio',
        title: '个人简介',
        type: 'text',
        rows: 4,
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'avatar',
        title: '头像',
        type: 'image',
        options: { hotspot: true },
        fields: [
          {
            name: 'alt',
            type: 'string',
            title: '替代文本',
          },
        ],
      },
      {
        name: 'expertise',
        title: '专业领域',
        type: 'array',
        of: [{ type: 'string' }],
        validation: (Rule: any) => Rule.min(1).max(5),
      },
      {
        name: 'socialLinks',
        title: '社交链接',
        type: 'object',
        fields: [
          {
            name: 'linkedin',
            title: 'LinkedIn',
            type: 'url',
          },
          {
            name: 'twitter',
            title: 'Twitter',
            type: 'url',
          },
          {
            name: 'email',
            title: '邮箱',
            type: 'email',
          },
        ],
      },
    ],
    preview: {
      select: {
        title: 'name',
        subtitle: 'role',
        media: 'avatar',
      },
    },
  },

  // 洞察/新闻类型
  insight: {
    name: 'insight',
    title: '洞察文章',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: '文章标题',
        type: 'string',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'slug',
        title: 'URL路径',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96,
        },
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'excerpt',
        title: '文章摘要',
        type: 'text',
        rows: 3,
        validation: (Rule: any) => Rule.required().max(300),
      },
      {
        name: 'content',
        title: '文章内容',
        type: 'array',
        of: [{ type: 'block' }, { type: 'image' }],
      },
      {
        name: 'featuredImage',
        title: '特色图片',
        type: 'image',
        options: { hotspot: true },
        fields: [
          {
            name: 'alt',
            type: 'string',
            title: '替代文本',
          },
        ],
      },
      {
        name: 'category',
        title: '分类',
        type: 'string',
        options: {
          list: [
            { title: '新闻', value: 'news' },
            { title: '研究报告', value: 'research' },
            { title: '白皮书', value: 'whitepaper' },
            { title: '行业动态', value: 'industry-update' },
          ],
        },
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'tags',
        title: '标签',
        type: 'array',
        of: [{ type: 'string' }],
        options: {
          layout: 'tags',
        },
      },
      {
        name: 'author',
        title: '作者',
        type: 'reference',
        to: [{ type: 'teamMember' }],
      },
      {
        name: 'publishedAt',
        title: '发布日期',
        type: 'datetime',
        validation: (Rule: any) => Rule.required(),
      },
    ],
    orderings: [
      {
        title: '发布日期（新到旧）',
        name: 'publishedAtDesc',
        by: [{ field: 'publishedAt', direction: 'desc' }],
      },
      {
        title: '分类',
        name: 'categoryAsc',
        by: [{ field: 'category', direction: 'asc' }],
      },
    ],
    preview: {
      select: {
        title: 'title',
        category: 'category',
        media: 'featuredImage',
        author: 'author.name',
      },
      prepare({ title, category, media, author }: any) {
        return {
          title,
          subtitle: `${category} ${author ? `by ${author}` : ''}`,
          media,
        };
      },
    },
  },
};

// 导出完整的schema配置
export const schemaTypes = [
  sanitySchemas.page,
  sanitySchemas.caseStudy,
  sanitySchemas.teamMember,
  sanitySchemas.insight,
];

// 使用说明
export const SANITY_SETUP_INSTRUCTIONS = `
Sanity CMS 设置说明：

1. 创建 Sanity 项目：
   npx @sanity/cli init

2. 安装必需的包：
   npm install @sanity/client @sanity/image-url

3. 配置环境变量 (.env.local)：
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your-write-token (仅写入时需要)

4. 在 Sanity Studio 中导入这些 schema 类型

5. 开始创建内容！

内容类型包括：
- 页面 (page): 静态页面内容
- 案例研究 (caseStudy): 客户成功案例
- 团队成员 (teamMember): 团队介绍
- 洞察文章 (insight): 新闻、研究、白皮书

查询示例：
- sanityApi.getAllCaseStudies()
- sanityApi.getInsightsByCategory('news')
- sanityApi.getPageBySlug('about')
`;

export default schemaTypes;