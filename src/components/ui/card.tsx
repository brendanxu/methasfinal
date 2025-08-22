import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Southpole 风格卡片变体配置
const cardVariants = cva(
  // 基础样式 - Southpole 极简风格
  'bg-white transition-all duration-300 ease-out',
  {
    variants: {
      variant: {
        // 默认卡片 - 无边框，纯净
        default: 'southpole-card',
        
        // 轮廓卡片 - 极细边框
        outlined: 'southpole-card-outlined',
        
        // 浮动卡片 - 微妙阴影
        elevated: 'southpole-card shadow-sm hover:shadow-md',
        
        // 完全透明 - 无背景无边框
        ghost: 'bg-transparent',
        
        // 反色卡片 - 深色背景（用于深色区域）
        inverse: 'bg-black text-white border border-gray-800',
      },
      padding: {
        // 无内边距
        none: 'p-0',
        
        // 小内边距
        sm: 'p-6',
        
        // 标准内边距 - Southpole 40px
        default: 'p-10',
        
        // 大内边距
        lg: 'p-12 lg:p-16',
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
      variant: 'default',
      padding: 'default',
      rounded: 'none',
    },
  }
);

// 卡片容器组件
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>
>(({ className, variant, padding, rounded, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardVariants({ variant, padding, rounded, className }))}
    {...props}
  />
));
Card.displayName = 'Card';

// 卡片头部 - Southpole 风格
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col mb-8', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

// 卡片标题 - Southpole 大字号
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('southpole-heading-3 text-black mb-4', className)}
    {...props}
  >
    {children}
  </h3>
));
CardTitle.displayName = 'CardTitle';

// 卡片描述 - Southpole 正文风格
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('southpole-body', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

// 卡片内容
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn('mb-8', className)} 
    {...props} 
  />
));
CardContent.displayName = 'CardContent';

// 卡片底部 - Southpole 极简分割
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-8 southpole-divider', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

// Southpole 服务卡片 - 专用于服务展示
interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  number?: string;
  title: string;
  description: string;
  features?: string[];
  href?: string;
}

const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(
  ({ className, number, title, description, features, href, ...props }, ref) => (
    <Card ref={ref} className={cn('group southpole-hover-fade', className)} {...props}>
      {number && (
        <div className="mb-8">
          <span className="southpole-caption text-gray-400">
            {number.padStart(2, '0')}
          </span>
        </div>
      )}
      
      <CardHeader>
        <CardTitle className="group-hover:opacity-70 transition-opacity duration-300">
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      {features && features.length > 0 && (
        <CardContent>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start southpole-body">
                <div className="mr-3 mt-2 w-1 h-1 bg-black rounded-full flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
      )}
      
      {href && (
        <CardFooter className="border-0 pt-8">
          <a 
            href={href}
            className="southpole-caption hover:text-black transition-colors duration-300"
          >
            了解更多
          </a>
        </CardFooter>
      )}
    </Card>
  )
);
ServiceCard.displayName = 'ServiceCard';

// Southpole 案例卡片 - 专用于案例展示
interface CaseStudyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image?: string;
  category?: string;
  title: string;
  description: string;
  metrics?: Array<{
    label: string;
    value: string;
  }>;
  href?: string;
}

const CaseStudyCard = React.forwardRef<HTMLDivElement, CaseStudyCardProps>(
  ({ className, image, category, title, description, metrics, href, ...props }, ref) => (
    <Card 
      ref={ref} 
      variant="outlined"
      padding="none"
      className={cn('group overflow-hidden southpole-hover-lift', className)} 
      {...props}
    >
      {/* 图片区域 - 黑白处理 */}
      {image && (
        <div className="aspect-[4/3] overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        </div>
      )}
      
      <div className="p-10">
        {category && (
          <div className="mb-4">
            <span className="southpole-caption">{category}</span>
          </div>
        )}
        
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        
        {metrics && metrics.length > 0 && (
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              {metrics.map((metric, index) => (
                <div key={index}>
                  <div className="southpole-heading-3 text-black">{metric.value}</div>
                  <div className="southpole-caption">{metric.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        )}
        
        {href && (
          <CardFooter className="border-0 pt-0">
            <a 
              href={href}
              className="southpole-caption hover:text-black transition-colors duration-300"
            >
              查看详情
            </a>
          </CardFooter>
        )}
      </div>
    </Card>
  )
);
CaseStudyCard.displayName = 'CaseStudyCard';

// Southpole 统计卡片 - 专用于数据展示
interface StatsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  label: string;
  description?: string;
  trend?: 'up' | 'down' | 'stable';
}

const StatsCard = React.forwardRef<HTMLDivElement, StatsCardProps>(
  ({ className, value, label, description, trend, ...props }, ref) => (
    <Card 
      ref={ref} 
      variant="ghost" 
      padding="sm"
      className={cn('text-center', className)} 
      {...props}
    >
      <div className="southpole-heading-1 text-black mb-2">{value}</div>
      <div className="southpole-caption mb-2">{label}</div>
      {description && (
        <div className="southpole-body text-sm">{description}</div>
      )}
      {trend && (
        <div className={cn(
          "mt-2 text-xs",
          trend === 'up' && 'text-green-600',
          trend === 'down' && 'text-red-600',
          trend === 'stable' && 'text-gray-500'
        )}>
          {trend === 'up' && '↗'}
          {trend === 'down' && '↘'}
          {trend === 'stable' && '→'}
        </div>
      )}
    </Card>
  )
);
StatsCard.displayName = 'StatsCard';

// 预设的 Southpole 卡片组合
export const SouthpoleCard = {
  // 服务展示卡片
  Service: ServiceCard,
  
  // 案例研究卡片
  CaseStudy: CaseStudyCard,
  
  // 统计数据卡片
  Stats: StatsCard,
};

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  ServiceCard,
  CaseStudyCard,
  StatsCard,
  cardVariants
};