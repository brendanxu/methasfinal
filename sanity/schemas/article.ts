// 碳智观察文章 Schema
export default {
  name: 'article',
  title: '碳智观察文章',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: '文章标题',
      type: 'object',
      fields: [
        {
          name: 'zh',
          title: '中文标题',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'en',
          title: '英文标题',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: 'slug',
      title: 'URL 路径',
      type: 'slug',
      options: {
        source: 'title.zh',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: '副标题',
      type: 'object',
      fields: [
        {
          name: 'zh',
          title: '中文副标题',
          type: 'text',
          rows: 2,
        },
        {
          name: 'en',
          title: '英文副标题',
          type: 'text',
          rows: 2,
        },
      ],
    },
    {
      name: 'excerpt',
      title: '摘要',
      type: 'object',
      fields: [
        {
          name: 'zh',
          title: '中文摘要',
          type: 'text',
          rows: 3,
          validation: (Rule: any) => Rule.required().max(300),
        },
        {
          name: 'en',
          title: '英文摘要',
          type: 'text',
          rows: 3,
          validation: (Rule: any) => Rule.required().max(300),
        },
      ],
    },
    {
      name: 'content',
      title: '文章内容',
      type: 'object',
      fields: [
        {
          name: 'zh',
          title: '中文内容',
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
                  { title: '代码', value: 'code' },
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
                {
                  name: 'caption',
                  type: 'string',
                  title: '图片说明',
                },
              ],
            },
          ],
        },
        {
          name: 'en',
          title: '英文内容',
          type: 'array',
          of: [
            {
              type: 'block',
            },
            {
              type: 'image',
              options: { hotspot: true },
            },
          ],
        },
      ],
    },
    {
      name: 'coverImage',
      title: '封面图片',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
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
          { title: '行业趋势', value: 'trend' },
          { title: '政策法规', value: 'policy' },
          { title: '技术创新', value: 'technology' },
          { title: '碳市场', value: 'market' },
          { title: '案例分享', value: 'case' },
          { title: '研究报告', value: 'research' },
        ],
        layout: 'dropdown',
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
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'readTime',
      title: '阅读时间 (分钟)',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1),
      initialValue: 5,
    },
    {
      name: 'isPublished',
      title: '是否发布',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'isFeatured',
      title: '首页展示',
      description: '是否在首页碳智观察轮播中展示',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'publishDate',
      title: '发布日期',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
      initialValue: (new Date()).toISOString(),
    },
    {
      name: 'seo',
      title: 'SEO 设置',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'SEO 标题',
          type: 'string',
        },
        {
          name: 'description',
          title: 'SEO 描述',
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
  orderings: [
    {
      title: '发布日期 (新到旧)',
      name: 'publishDateDesc',
      by: [{ field: 'publishDate', direction: 'desc' }],
    },
    {
      title: '发布日期 (旧到新)',
      name: 'publishDateAsc',
      by: [{ field: 'publishDate', direction: 'asc' }],
    },
    {
      title: '分类',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title.zh',
      subtitle: 'category',
      media: 'coverImage',
      isPublished: 'isPublished',
      isFeatured: 'isFeatured',
      publishDate: 'publishDate',
    },
    prepare({ title, subtitle, media, isPublished, isFeatured, publishDate }: any) {
      const date = new Date(publishDate).toLocaleDateString('zh-CN');
      return {
        title,
        subtitle: `${isPublished ? '✅' : '📝'} ${isFeatured ? '⭐' : ''} ${subtitle} - ${date}`,
        media,
      };
    },
  },
};