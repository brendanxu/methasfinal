'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallback?: string;
  showPlaceholder?: boolean;
  className?: string;
}

/**
 * 优化的图片组件
 * 基于 Next.js Image 组件，添加了性能优化和错误处理
 */
export function OptimizedImage({ 
  src, 
  alt, 
  fallback = '/images/placeholder.jpg',
  showPlaceholder = true,
  className,
  ...props 
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // 如果有错误且提供了 fallback，使用 fallback 图片
  const imageSrc = hasError ? fallback : src;

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* 占位符 */}
      {isLoading && showPlaceholder && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <svg 
            className="w-8 h-8 text-gray-300" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
      )}
      
      {/* 实际图片 */}
      <Image
        src={imageSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        {...props}
      />
    </div>
  );
}

/**
 * Southpole 风格的图片组件
 * 预设了 Southpole 设计系统的样式
 */
export function SouthpoleImage({ 
  className, 
  ...props 
}: OptimizedImageProps) {
  return (
    <OptimizedImage
      className={cn(
        'grayscale hover:grayscale-0 transition-all duration-500',
        className
      )}
      {...props}
    />
  );
}

/**
 * 响应式图片组件
 * 根据屏幕尺寸自动选择合适的图片
 */
interface ResponsiveImageProps extends OptimizedImageProps {
  srcMobile?: string;
  srcTablet?: string;
  srcDesktop?: string;
}

export function ResponsiveImage({
  src,
  srcMobile,
  srcTablet,
  srcDesktop,
  ...props
}: ResponsiveImageProps) {
  // 在客户端根据屏幕尺寸选择图片
  const getResponsiveSrc = () => {
    if (typeof window === 'undefined') return src;
    
    const width = window.innerWidth;
    
    if (width < 768 && srcMobile) return srcMobile;
    if (width < 1024 && srcTablet) return srcTablet;
    if (srcDesktop) return srcDesktop;
    
    return src;
  };

  return (
    <OptimizedImage
      src={getResponsiveSrc()}
      {...props}
    />
  );
}