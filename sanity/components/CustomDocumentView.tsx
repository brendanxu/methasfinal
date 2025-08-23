import { DocumentActionDescription, DocumentActionsContext } from 'sanity'
import { Box, Card, Flex, Text, Badge } from '@sanity/ui'
import { CheckmarkIcon, ClockIcon, EyeOpenIcon, EditIcon } from '@sanity/icons'

// 自定义文档状态组件
export function DocumentStatus({ document }: { document: any }) {
  const getStatusInfo = () => {
    if (document._type === 'article') {
      if (document.isPublished) {
        return {
          label: '已发布',
          color: '#10b981',
          icon: CheckmarkIcon,
          bgColor: '#f0fdf4'
        }
      } else {
        return {
          label: '草稿',
          color: '#f59e0b',
          icon: EditIcon,
          bgColor: '#fffbeb'
        }
      }
    }
    
    if (document.isActive !== undefined) {
      return document.isActive 
        ? {
            label: '启用中',
            color: '#10b981',
            icon: EyeOpenIcon,
            bgColor: '#f0fdf4'
          }
        : {
            label: '已禁用',
            color: '#ef4444',
            icon: ClockIcon,
            bgColor: '#fef2f2'
          }
    }

    return {
      label: '活跃',
      color: '#10b981',
      icon: CheckmarkIcon,
      bgColor: '#f0fdf4'
    }
  }

  const status = getStatusInfo()
  const StatusIcon = status.icon

  return (
    <Badge
      mode="outline"
      tone="primary"
      style={{
        backgroundColor: status.bgColor,
        borderColor: status.color,
        color: status.color,
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.75rem',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
      }}
    >
      <StatusIcon style={{ width: '12px', height: '12px' }} />
      {status.label}
    </Badge>
  )
}

// 增强的文档预览卡片
export function EnhancedDocumentCard({ 
  document, 
  title, 
  subtitle, 
  media 
}: {
  document: any
  title: string
  subtitle?: string
  media?: any
}) {
  return (
    <Card
      padding={4}
      radius={3}
      shadow={1}
      style={{
        border: '1px solid #e5e5e5',
        transition: 'all 0.2s ease-out',
        fontFamily: 'Inter, sans-serif'
      }}
      tone="inherit"
    >
      <Flex align="flex-start" gap={3}>
        {/* 媒体预览 */}
        {media && (
          <Box 
            style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#f8f8f8',
              flexShrink: 0
            }}
          >
            {media}
          </Box>
        )}

        {/* 内容区域 */}
        <Box flex={1}>
          <Flex justify="space-between" align="flex-start" marginBottom={2}>
            <Text
              size={2}
              weight="semibold"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#000000',
                lineHeight: '1.4'
              }}
            >
              {title}
            </Text>
            
            <DocumentStatus document={document} />
          </Flex>

          {subtitle && (
            <Text
              size={1}
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#666666',
                lineHeight: '1.5'
              }}
            >
              {subtitle}
            </Text>
          )}

          {/* 额外信息 */}
          {document._type === 'article' && (
            <Flex gap={2} marginTop={2}>
              {document.category && (
                <Badge mode="outline" tone="primary">
                  {document.category}
                </Badge>
              )}
              {document.readTime && (
                <Text size={0} style={{ color: '#999999' }}>
                  {document.readTime} 分钟阅读
                </Text>
              )}
            </Flex>
          )}
        </Box>
      </Flex>
    </Card>
  )
}