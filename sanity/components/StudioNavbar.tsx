import { NavbarProps } from 'sanity'
import { Box, Flex, Text } from '@sanity/ui'

// 自定义 Navbar 组件 - Southpole 风格
export function StudioNavbar(props: NavbarProps) {
  return (
    <Flex align="center" justify="space-between" padding={3}>
      {/* 品牌标识 */}
      <Box>
        <Text
          size={3}
          weight="bold"
          style={{
            fontFamily: 'Inter, sans-serif',
            color: '#ffffff',
            textDecoration: 'none'
          }}
        >
          Methas CMS
        </Text>
        <Text
          size={1}
          style={{
            fontFamily: 'Inter, sans-serif', 
            color: '#cccccc',
            marginTop: '2px',
            fontSize: '0.75rem'
          }}
        >
          内容管理系统
        </Text>
      </Box>

      {/* 默认导航元素 */}
      <Box>
        {props.renderDefault(props)}
      </Box>
    </Flex>
  )
}