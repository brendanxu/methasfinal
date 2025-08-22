import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Southpole 风格按钮变体配置
const buttonVariants = cva(
  // 基础样式 - Southpole 极简风格
  'inline-flex items-center justify-center font-light tracking-wide transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden',
  {
    variants: {
      variant: {
        // 主按钮 - 细边框，悬停填充
        primary: 'border border-black text-black bg-white hover:bg-black hover:text-white',
        
        // 次按钮 - 黑色填充，悬停反转
        secondary: 'bg-black text-white hover:bg-transparent hover:text-black border border-black',
        
        // 文字按钮 - 纯文字，极简悬停
        text: 'bg-transparent text-black hover:opacity-70 px-0',
        
        // 链接按钮 - 带下划线，悬停消失
        link: 'text-black underline underline-offset-4 hover:no-underline hover:opacity-70 bg-transparent px-0',
        
        // 轮廓按钮 - 极细边框
        outline: 'border border-black/20 text-black hover:border-black bg-transparent',
        
        // 幽灵按钮 - 完全透明
        ghost: 'bg-transparent text-black hover:bg-black/5',
        
        // 反色按钮 - 白色边框（用于深色背景）
        inverse: 'border border-white text-white bg-transparent hover:bg-white hover:text-black',
      },
      size: {
        // 小按钮 - 紧凑型（移动端优化最小触摸尺寸）
        sm: 'h-11 px-6 text-sm min-w-[44px]',
        
        // 标准按钮 - Southpole 标准尺寸（触摸友好）
        default: 'h-12 px-8 text-sm min-w-[44px]',
        
        // 大按钮 - 更大的点击区域（移动端推荐）
        lg: 'h-14 px-10 text-base min-w-[44px]',
        
        // 超大按钮 - Hero 区域使用
        xl: 'h-16 px-12 text-base min-w-[44px]',
        
        // 图标按钮（符合触摸标准）
        icon: 'h-11 w-11 p-0 min-h-[44px] min-w-[44px]',
        
        // 文字按钮特殊尺寸
        text: 'h-auto px-0 py-1',
      },
      rounded: {
        // 无圆角 - Southpole 经典
        none: 'rounded-none',
        
        // 极小圆角
        sm: 'rounded-sm',
        
        // 标准圆角
        default: 'rounded',
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      rounded: 'none',
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
    rounded,
    asChild = false, 
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : 'button';
    
    // Southpole 风格的加载动画
    const LoadingSpinner = () => (
      <div className="mr-2 h-4 w-4 animate-spin">
        <div className="h-full w-full border border-current border-t-transparent rounded-full" />
      </div>
    );
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <LoadingSpinner />}
        {!loading && leftIcon && (
          <span className="mr-2 flex items-center">{leftIcon}</span>
        )}
        <span className={cn(
          "transition-all duration-300",
          loading && "opacity-70"
        )}>
          {children}
        </span>
        {!loading && rightIcon && (
          <span className="ml-2 flex items-center">{rightIcon}</span>
        )}
        
        {/* Southpole 风格的悬停效果 - 从左到右填充 */}
        {(variant === 'primary' || variant === 'outline') && (
          <span className="absolute inset-0 bg-black transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 -z-10" />
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

// 预设的 Southpole 风格按钮组合
export const SouthpoleButton = {
  // CTA 主按钮
  CTA: React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant' | 'size'>>(
    (props, ref) => <Button ref={ref} variant="primary" size="lg" {...props} />
  ),
  
  // 次要操作按钮
  Secondary: React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
    (props, ref) => <Button ref={ref} variant="secondary" {...props} />
  ),
  
  // 文字链接按钮
  Link: React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant' | 'size'>>(
    (props, ref) => <Button ref={ref} variant="link" size="text" {...props} />
  ),
  
  // 导航联系按钮
  Contact: React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant' | 'size'>>(
    (props, ref) => <Button ref={ref} variant="primary" size="default" {...props} />
  ),
};

// 为预设按钮添加 displayName
SouthpoleButton.CTA.displayName = 'SouthpoleButton.CTA';
SouthpoleButton.Secondary.displayName = 'SouthpoleButton.Secondary';
SouthpoleButton.Link.displayName = 'SouthpoleButton.Link';
SouthpoleButton.Contact.displayName = 'SouthpoleButton.Contact';

export { Button, buttonVariants, SouthpoleButton };