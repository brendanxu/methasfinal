// Hero 轮播内容 Schema
export default {
  name: 'heroSlide',
  title: 'Hero 轮播',
  type: 'document',
  fields: [
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
      name: 'mediaType',
      title: '媒体类型',
      type: 'string',
      options: {
        list: [
          { title: '图片', value: 'image' },
          { title: '视频', value: 'video' },
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
      initialValue: 'image',
    },
    {
      name: 'image',
      title: '图片',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }: any) => parent?.mediaType !== 'image',
      fields: [
        {
          name: 'alt',
          title: '替代文本',
          type: 'string',
        },
      ],
    },
    {
      name: 'video',
      title: '视频',
      type: 'file',
      options: {
        accept: 'video/mp4, video/webm',
      },
      hidden: ({ parent }: any) => parent?.mediaType !== 'video',
    },
    {
      name: 'videoUrl',
      title: '视频链接 (可选，如使用外部视频)',
      type: 'url',
      hidden: ({ parent }: any) => parent?.mediaType !== 'video',
    },
    {
      name: 'ctaButton',
      title: 'CTA 按钮',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: '按钮文字',
          type: 'object',
          fields: [
            {
              name: 'zh',
              title: '中文',
              type: 'string',
            },
            {
              name: 'en',
              title: '英文',
              type: 'string',
            },
          ],
        },
        {
          name: 'link',
          title: '链接',
          type: 'string',
        },
      ],
    },
    {
      name: 'secondaryButton',
      title: '次要按钮',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: '按钮文字',
          type: 'object',
          fields: [
            {
              name: 'zh',
              title: '中文',
              type: 'string',
            },
            {
              name: 'en',
              title: '英文',
              type: 'string',
            },
          ],
        },
        {
          name: 'link',
          title: '链接',
          type: 'string',
        },
      ],
    },
    {
      name: 'order',
      title: '排序',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0),
      initialValue: 0,
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
      title: '排序',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title.zh',
      subtitle: 'subtitle.zh',
      media: 'image',
      order: 'order',
      isActive: 'isActive',
    },
    prepare({ title, subtitle, media, order, isActive }: any) {
      return {
        title: `${order}. ${title}`,
        subtitle: `${isActive ? '✅ 启用' : '❌ 禁用'} - ${subtitle || ''}`,
        media,
      };
    },
  },
};