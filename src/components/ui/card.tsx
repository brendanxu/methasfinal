import * as React from 'react';
import { cn } from '@/lib/utils';

// 卡片容器组件
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // 基础卡片样式 - 基于 globals.css 中的 .card 类
      'bg-white border border-gray-200 rounded-xl p-6 shadow-card transition-all duration-normal ease-out hover:-translate-y-1 hover:shadow-card-hover',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

// 卡片头部
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 pb-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

// 卡片标题
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('font-bold leading-none tracking-tight text-xl', className)}
    {...props}
  >
    {children}
  </h3>
));
CardTitle.displayName = 'CardTitle';

// 卡片描述
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-gray-600 leading-relaxed', className)}
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
    className={cn('pb-6', className)} 
    {...props} 
  />
));
CardContent.displayName = 'CardContent';

// 卡片底部
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-6 border-t border-gray-100', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

// 产品卡片 - 专用于产品展示的卡片组件
interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description: string;
  features?: string[];
  cta?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  ({ className, icon, title, description, features, cta, ...props }, ref) => (
    <Card ref={ref} className={cn('group cursor-pointer', className)} {...props}>
      <CardHeader>
        {icon && (
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-normal">
            {icon}
          </div>
        )}
        <CardTitle className="group-hover:text-primary transition-colors duration-normal">
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      {features && features.length > 0 && (
        <CardContent>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
      )}
      
      {cta && (
        <CardFooter>
          {cta.href ? (
            <a 
              href={cta.href}
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              {cta.text} →
            </a>
          ) : (
            <button
              onClick={cta.onClick}
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              {cta.text} →
            </button>
          )}
        </CardFooter>
      )}
    </Card>
  )
);
ProductCard.displayName = 'ProductCard';

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  ProductCard 
};