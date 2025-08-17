import { Variants } from 'framer-motion';

// Southpole.com 风格的滚动动画配置
export const scrollAnimations: Record<string, Variants> = {
  // 淡入效果 - 基础
  fadeIn: {
    hidden: { 
      opacity: 0,
      y: 30
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] // easeOutQuart
      }
    }
  },

  // 从左侧滑入
  slideInLeft: {
    hidden: { 
      opacity: 0,
      x: -60
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },

  // 从右侧滑入
  slideInRight: {
    hidden: { 
      opacity: 0,
      x: 60
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },

  // 缩放淡入
  scaleIn: {
    hidden: { 
      opacity: 0,
      scale: 0.8
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },

  // 容器动画 - 带子元素层叠
  staggerContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  },

  // 层叠子元素
  staggerChild: {
    hidden: { 
      opacity: 0,
      y: 30
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },

  // 标题动画 - 更大的移动距离
  titleAnimation: {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },

  // 卡片动画 - 带轻微旋转
  cardAnimation: {
    hidden: { 
      opacity: 0,
      y: 40,
      rotateX: 15
    },
    visible: { 
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },

  // 图片动画 - 带模糊效果
  imageAnimation: {
    hidden: { 
      opacity: 0,
      scale: 1.1,
      filter: 'blur(10px)'
    },
    visible: { 
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },

  // 按钮动画 - 弹性效果
  buttonAnimation: {
    hidden: { 
      opacity: 0,
      scale: 0.8
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.68, -0.55, 0.265, 1.55] // easeInOutBack
      }
    }
  }
};

// 视口配置 - 更激进的动画触发
export const viewportConfig = {
  once: true,
  margin: '-100px', // 元素需要进入视口100px才触发
  amount: 0.3 // 元素30%可见时触发
};

// 延迟配置
export const delayConfig = {
  short: 0.1,
  medium: 0.2,
  long: 0.4
};