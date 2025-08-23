// Southpole 风格的 Sanity Studio 主题配置
export const southpoleTheme = {
  "--studio-white": "#ffffff",
  "--studio-black": "#000000",
  
  // 主色调 - 使用 Southpole 的极简黑白
  "--studio-brand-primary": "#000000",
  "--studio-brand-primary-hover": "#333333",
  "--studio-brand-primary-pressed": "#666666",
  
  // 背景色
  "--studio-bg-primary": "#ffffff",
  "--studio-bg-secondary": "#fafafa", 
  "--studio-bg-tertiary": "#f5f5f5",
  
  // 文本色
  "--studio-text-primary": "#000000",
  "--studio-text-secondary": "#666666",
  "--studio-text-tertiary": "#999999",
  "--studio-text-muted": "#cccccc",
  
  // 边框
  "--studio-border-primary": "#e5e5e5",
  "--studio-border-secondary": "#f0f0f0",
  
  // 状态色
  "--studio-state-success": "#10b981", // Green accent
  "--studio-state-warning": "#f59e0b",
  "--studio-state-danger": "#ef4444",
  "--studio-state-info": "#3b82f6",
  
  // 聚焦和选中状态
  "--studio-focus-ring": "#000000",
  "--studio-selected-bg": "#f8f8f8",
  
  // 卡片样式
  "--studio-card-bg": "#ffffff",
  "--studio-card-border": "#e5e5e5",
  "--studio-card-shadow": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  "--studio-card-shadow-hover": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  
  // 导航
  "--studio-navbar-bg": "#000000",
  "--studio-navbar-text": "#ffffff",
  
  // 字体 - 使用 Inter 字体保持一致
  "--studio-font-family": "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  "--studio-font-size-small": "0.875rem",
  "--studio-font-size-base": "1rem", 
  "--studio-font-size-large": "1.125rem",
  "--studio-font-weight-normal": "400",
  "--studio-font-weight-medium": "500",
  "--studio-font-weight-semibold": "600",
  
  // 圆角 - 使用项目的 24px 主要圆角
  "--studio-border-radius-small": "8px",
  "--studio-border-radius-medium": "16px",
  "--studio-border-radius-large": "24px",
  
  // 间距 - 使用 8px 网格系统
  "--studio-space-1": "8px",
  "--studio-space-2": "16px", 
  "--studio-space-3": "24px",
  "--studio-space-4": "32px",
  "--studio-space-5": "40px",
  "--studio-space-6": "48px",
};

// CSS 变量字符串
export const studioThemeCSS = Object.entries(southpoleTheme)
  .map(([key, value]) => `${key}: ${value};`)
  .join('\n  ');

// 自定义 CSS 样式
export const customStudioStyles = `
/* Southpole Studio 主题 */
:root {
  ${studioThemeCSS}
}

/* 顶部导航栏样式 */
[data-ui="Navbar"] {
  background: var(--studio-navbar-bg) !important;
  border-bottom: 1px solid var(--studio-border-primary);
}

[data-ui="Navbar"] [data-ui="Text"] {
  color: var(--studio-navbar-text) !important;
  font-family: var(--studio-font-family) !important;
  font-weight: var(--studio-font-weight-semibold) !important;
}

/* 侧边栏样式 */
[data-ui="SidebarPanel"] {
  background: var(--studio-bg-primary) !important;
  border-right: 1px solid var(--studio-border-primary);
}

/* 卡片样式 */
[data-ui="Card"] {
  background: var(--studio-card-bg) !important;
  border: 1px solid var(--studio-card-border) !important;
  border-radius: var(--studio-border-radius-medium) !important;
  box-shadow: var(--studio-card-shadow) !important;
  transition: all 0.2s ease-out;
}

[data-ui="Card"]:hover {
  box-shadow: var(--studio-card-shadow-hover) !important;
}

/* 按钮样式 */
[data-ui="Button"][data-mode="default"] {
  background: var(--studio-bg-primary) !important;
  border: 1px solid var(--studio-border-primary) !important;
  border-radius: var(--studio-border-radius-large) !important;
  color: var(--studio-text-primary) !important;
  font-family: var(--studio-font-family) !important;
  font-weight: var(--studio-font-weight-medium) !important;
  transition: all 0.2s ease-out;
}

[data-ui="Button"][data-mode="default"]:hover {
  background: var(--studio-bg-secondary) !important;
  border-color: var(--studio-border-secondary) !important;
}

/* 主要按钮 */
[data-ui="Button"][data-mode="primary"] {
  background: var(--studio-brand-primary) !important;
  border: 1px solid var(--studio-brand-primary) !important;
  border-radius: var(--studio-border-radius-large) !important;
  color: var(--studio-white) !important;
  font-family: var(--studio-font-family) !important;
  font-weight: var(--studio-font-weight-semibold) !important;
  transition: all 0.2s ease-out;
}

[data-ui="Button"][data-mode="primary"]:hover {
  background: var(--studio-brand-primary-hover) !important;
  border-color: var(--studio-brand-primary-hover) !important;
}

/* 输入框样式 */
[data-ui="TextInput"], [data-ui="TextArea"] {
  border: 1px solid var(--studio-border-primary) !important;
  border-radius: var(--studio-border-radius-medium) !important;
  font-family: var(--studio-font-family) !important;
  transition: all 0.2s ease-out;
}

[data-ui="TextInput"]:focus, [data-ui="TextArea"]:focus {
  border-color: var(--studio-brand-primary) !important;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1) !important;
}

/* 标签样式 */
[data-ui="Label"] {
  font-family: var(--studio-font-family) !important;
  font-weight: var(--studio-font-weight-semibold) !important;
  color: var(--studio-text-primary) !important;
}

/* 文档列表样式 */
[data-ui="DocumentListItem"] {
  border-radius: var(--studio-border-radius-medium) !important;
  margin-bottom: var(--studio-space-1);
  transition: all 0.2s ease-out;
}

[data-ui="DocumentListItem"]:hover {
  background: var(--studio-bg-secondary) !important;
}

/* 工具栏样式 */
[data-ui="ToolMenu"] {
  background: var(--studio-bg-primary) !important;
  border: 1px solid var(--studio-border-primary) !important;
  border-radius: var(--studio-border-radius-medium) !important;
}

/* 状态指示器 */
.sanity-status-published {
  color: var(--studio-state-success) !important;
}

.sanity-status-draft {
  color: var(--studio-state-warning) !important;
}

/* 自定义品牌标识 */
.studio-brand-logo {
  font-family: var(--studio-font-family);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--studio-navbar-text);
  text-decoration: none;
}

.studio-brand-logo:hover {
  color: var(--studio-navbar-text);
  opacity: 0.8;
}

/* 响应式调整 */
@media (max-width: 768px) {
  [data-ui="Card"] {
    border-radius: var(--studio-border-radius-small) !important;
  }
  
  [data-ui="Button"] {
    border-radius: var(--studio-border-radius-medium) !important;
  }
}
`;

export default southpoleTheme;