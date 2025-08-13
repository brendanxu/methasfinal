import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// 按钮变体配置 - 基于 ui-spec.md
const buttonVariants = cva(
  // 基础样式 - 对应 globals.css 中的 .btn 类
  'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-fast ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // 主按钮 - 黑底白字，hover 变绿色
        primary: 'bg-black text-white border-2 border-black hover:bg-primary hover:border-primary hover:-translate-y-0.5',
        
        // 次按钮 - 白底黑字带边框，hover 反转
        secondary: 'bg-white text-black border-2 border-black hover:bg-black hover:text-white hover:-translate-y-0.5',
        
        // 文字按钮 - 纯文字带下划线
        text: 'bg-transparent text-black underline hover:no-underline hover:text-primary px-0 py-1',
        
        // 图标按钮 - 方形按钮
        icon: 'bg-white text-black border-2 border-gray-300 hover:border-black hover:-translate-y-0.5 aspect-square',
        
        // 危险按钮 - 红色警告样式
        destructive: 'bg-red-600 text-white border-2 border-red-600 hover:bg-red-700 hover:border-red-700',
        
        // 幽灵按钮 - 透明背景
        ghost: 'bg-transparent hover:bg-gray-100 text-black',
        
        // 链接样式
        link: 'text-black underline-offset-4 hover:underline hover:text-primary',
      },
      size: {
        // 小按钮
        sm: 'h-9 px-4 text-sm',
        
        // 默认按钮 - 48px 高度 (ui-spec.md 规范)
        default: 'h-12 px-8 py-3',
        
        // 大按钮
        lg: 'h-14 px-10 py-4 text-lg',
        
        // 图标按钮尺寸
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : 'button';
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {!loading && leftIcon && (
          <span className="mr-2">{leftIcon}</span>
        )}
        {children}
        {!loading && rightIcon && (
          <span className="ml-2">{rightIcon}</span>
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };