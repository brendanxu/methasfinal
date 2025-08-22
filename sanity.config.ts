import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { presentationTool } from 'sanity/presentation'

// Import schemas
import heroSlide from './sanity/schemas/hero-slide'
import serviceSection from './sanity/schemas/service-section'
import article from './sanity/schemas/article'
import statistics from './sanity/schemas/statistics'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  name: 'default',
  title: 'Methas CMS',

  projectId,
  dataset,

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
})