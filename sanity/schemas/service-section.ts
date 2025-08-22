// 服务板块 Schema
export default {
  name: 'serviceSection',
  title: '服务板块',
  type: 'document',
  fields: [
    {
      name: 'step',
      title: '步骤编号',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1).max(4),
    },
    {
      name: 'title',
      title: '标题',
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
      name: 'description',
      title: '描述',
      type: 'object',
      fields: [
        {
          name: 'zh',
          title: '中文描述',
          type: 'text',
          rows: 3,
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'en',
          title: '英文描述',
          type: 'text',
          rows: 3,
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: 'image',
      title: '服务图片',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
      fields: [
        {
          name: 'alt',
          title: '替代文本',
          type: 'string',
        },
      ],
    },
    {
      name: 'features',
      title: '特性列表',
      type: 'object',
      fields: [
        {
          name: 'zh',
          title: '中文特性',
          type: 'array',
          of: [{ type: 'string' }],
          validation: (Rule: any) => Rule.required().min(3).max(6),
        },
        {
          name: 'en',
          title: '英文特性',
          type: 'array',
          of: [{ type: 'string' }],
          validation: (Rule: any) => Rule.required().min(3).max(6),
        },
      ],
    },
    {
      name: 'detailedContent',
      title: '详细内容 (用于服务详情页)',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: '正文', value: 'normal' },
            { title: '标题2', value: 'h2' },
            { title: '标题3', value: 'h3' },
            { title: '引用', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: '粗体', value: 'strong' },
              { title: '斜体', value: 'em' },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    },
    {
      name: 'isActive',
      title: '是否启用',
      type: 'boolean',
      initialValue: true,
    },
  ],
  orderings: [
    {
      title: '步骤顺序',
      name: 'stepAsc',
      by: [{ field: 'step', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title.zh',
      subtitle: 'description.zh',
      media: 'image',
      step: 'step',
      isActive: 'isActive',
    },
    prepare({ title, subtitle, media, step, isActive }: any) {
      return {
        title: `Step ${step}: ${title}`,
        subtitle: `${isActive ? '✅' : '❌'} ${subtitle}`,
        media,
      };
    },
  },
};