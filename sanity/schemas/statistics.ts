// 统计数据 Schema
export default {
  name: 'statistics',
  title: '统计数据',
  type: 'document',
  fields: [
    {
      name: 'label',
      title: '标签',
      type: 'object',
      fields: [
        {
          name: 'zh',
          title: '中文标签',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'en',
          title: '英文标签',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: 'value',
      title: '数值',
      type: 'string',
      description: '例如: 85%, 2000+, 50万吨',
      validation: (Rule: any) => Rule.required(),
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
          rows: 2,
        },
        {
          name: 'en',
          title: '英文描述',
          type: 'text',
          rows: 2,
        },
      ],
    },
    {
      name: 'icon',
      title: '图标',
      type: 'string',
      options: {
        list: [
          { title: '减排', value: 'emission' },
          { title: '项目', value: 'project' },
          { title: '客户', value: 'client' },
          { title: '成本', value: 'cost' },
          { title: '时间', value: 'time' },
          { title: '效率', value: 'efficiency' },
        ],
      },
    },
    {
      name: 'order',
      title: '排序',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: 'isActive',
      title: '是否显示',
      type: 'boolean',
      initialValue: true,
    },
  ],
  orderings: [
    {
      title: '排序',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'label.zh',
      subtitle: 'value',
      description: 'description.zh',
      isActive: 'isActive',
      order: 'order',
    },
    prepare({ title, subtitle, description, isActive, order }: any) {
      return {
        title: `${order}. ${title}: ${subtitle}`,
        subtitle: `${isActive ? '✅' : '❌'} ${description || ''}`,
      };
    },
  },
};