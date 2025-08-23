// 自定义 Studio Logo 组件
export function StudioLogo() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '1.25rem',
        fontWeight: '700',
        fontFamily: 'Inter, sans-serif',
        color: '#000000'
      }}
    >
      {/* Logo 图标 - 使用简洁的几何形状 */}
      <div
        style={{
          width: '32px',
          height: '32px',
          backgroundColor: '#000000',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontSize: '14px',
          fontWeight: '700'
        }}
      >
        M
      </div>
      
      {/* 品牌名称 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          lineHeight: '1.2'
        }}
      >
        <span style={{ fontSize: '1.25rem', fontWeight: '700' }}>
          Methas
        </span>
        <span 
          style={{ 
            fontSize: '0.75rem', 
            fontWeight: '400', 
            color: '#666666',
            marginTop: '-2px'
          }}
        >
          CMS
        </span>
      </div>
    </div>
  )
}