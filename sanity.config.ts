import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { presentationTool } from 'sanity/presentation'
import { StudioLogo } from './sanity/components/StudioLogo'

// Import schemas
import heroSlide from './sanity/schemas/hero-slide'
import serviceSection from './sanity/schemas/service-section'
import article from './sanity/schemas/article'
import statistics from './sanity/schemas/statistics'

// Import custom styles
import './sanity/styles.css'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: 'Methas CMS',
  subtitle: '甲烷减排内容管理系统',

  projectId,
  dataset,

  // 自定义 Studio 配置
  studio: {
    components: {
      logo: StudioLogo,
    }
  },

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('内容管理')
          .items([
            S.listItem()
              .title('首页设置')
              .child(
                S.list()
                  .title('首页设置')
                  .items([
                    S.listItem()
                      .title('Hero 轮播')
                      .schemaType('heroSlide')
                      .child(S.documentTypeList('heroSlide').title('Hero 轮播')),
                    S.listItem()
                      .title('服务板块')
                      .schemaType('serviceSection')
                      .child(S.documentTypeList('serviceSection').title('服务板块')),
                    S.listItem()
                      .title('统计数据')
                      .schemaType('statistics')
                      .child(S.documentTypeList('statistics').title('统计数据')),
                  ])
              ),
            S.listItem()
              .title('碳智观察')
              .schemaType('article')
              .child(
                S.documentTypeList('article')
                  .title('所有文章')
                  .filter('_type == "article"')
                  .child((documentId) =>
                    S.document()
                      .documentId(documentId)
                      .schemaType('article')
                      .title('编辑文章')
                  )
              ),
            S.divider(),
            S.listItem()
              .title('已发布文章')
              .schemaType('article')
              .child(
                S.documentTypeList('article')
                  .title('已发布')
                  .filter('_type == "article" && isPublished == true')
              ),
            S.listItem()
              .title('草稿文章')
              .schemaType('article')
              .child(
                S.documentTypeList('article')
                  .title('草稿')
                  .filter('_type == "article" && isPublished != true')
              ),
            S.listItem()
              .title('首页展示文章')
              .schemaType('article')
              .child(
                S.documentTypeList('article')
                  .title('首页展示')
                  .filter('_type == "article" && isFeatured == true')
              ),
          ]),
    }),
    visionTool(),
    media(),
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: '/api/draft',
        },
      },
    }),
  ],

  schema: {
    types: [heroSlide, serviceSection, article, statistics],
  },

  // 自定义配置
  form: {
    // 图片组件的自定义配置
    image: {
      assetSources: previousAssetSources => {
        return previousAssetSources.filter(assetSource => assetSource !== null)
      }
    }
  },

  // 文档操作配置
  document: {
    // 自定义预览 URL
    productionUrl: async (prev, context) => {
      const { document } = context
      if (document._type === 'article' && document.slug && typeof document.slug === 'object' && 'current' in document.slug) {
        return `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/zh/insights/${document.slug.current}`
      }
      return prev
    },
  },
})