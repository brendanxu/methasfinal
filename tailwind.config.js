/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // 基于 design-tokens.md 的设计系统
      colors: {
        // 高对比黑白配色
        white: '#ffffff',
        black: '#000000',
        
        // 主品牌绿色 (待确定具体色值)
        primary: {
          DEFAULT: '#22c55e', // 暂用绿色，后续可调整
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        
        // 灰度系统 (9级)
        gray: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      
      // 字体系统
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"PingFang SC"',
          '"Microsoft YaHei"',
          'sans-serif',
        ],
      },
      
      // 字号标准 (基于 ui-spec.md)
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],     // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }], // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],    // 16px ⭐
        'lg': ['1.125rem', { lineHeight: '1.75rem' }], // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],  // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],     // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],  // 36px
        '5xl': ['3rem', { lineHeight: '1' }],          // 48px
        '6xl': ['3.75rem', { lineHeight: '1' }],       // 60px
      },
      
      // 圆角规范 (基于 24px 主圆角)
      borderRadius: {
        'sm': '0.25rem',   // 4px - 标签、徽章
        'md': '0.5rem',    // 8px - 输入框、小按钮
        'lg': '1rem',      // 16px - 大按钮、小卡片
        'xl': '1.5rem',    // 24px - 主要卡片、容器 ⭐
        '2xl': '2rem',     // 32px - Hero区块、特殊容器
      },
      
      // 间距系统 (基于 8px 网格)
      spacing: {
        '1': '0.25rem',  // 4px
        '2': '0.5rem',   // 8px ⭐ 基础单位
        '3': '0.75rem',  // 12px
        '4': '1rem',     // 16px
        '5': '1.25rem',  // 20px
        '6': '1.5rem',   // 24px ⭐ 主要间距
        '8': '2rem',     // 32px
        '10': '2.5rem',  // 40px
        '12': '3rem',    // 48px
        '16': '4rem',    // 64px
        '20': '5rem',    // 80px
        '24': '6rem',    // 96px
      },
      
      // 容器规范
      maxWidth: {
        'container': '1200px',    // 主要容器 ⭐
        'container-xl': '1280px', // 宽屏优化容器
        'container-wide': '1440px', // 超宽容器
      },
      
      // 动效时长 (基于 motion-language.md)
      transitionDuration: {
        'instant': '100ms',
        'fast': '200ms',      // ⭐ 快速过渡
        'normal': '300ms',    // ⭐ 标准动效
        'slow': '450ms',      // 中缓过渡
        'slower': '600ms',    // 慢速进入
        'slowest': '800ms',   // 特殊动效
      },
      
      // 缓动函数
      transitionTimingFunction: {
        'out': 'cubic-bezier(0, 0, 0.2, 1)',           // 主用 ⭐
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',      // 次用
        'spring-snappy': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)', // 快弹 ⭐
      },
      
      // 阴影系统
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
        'focus': '0 0 0 3px rgba(0, 0, 0, 0.1)',
      },
      
      // 网格间距
      gap: {
        'grid': '1.5rem', // 24px ⭐
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}