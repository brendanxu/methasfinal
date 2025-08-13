import { getRequestConfig } from 'next-intl/server';
import { routing } from '../i18n/routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // 等待请求的语言环境
  let locale = await requestLocale;

  // 验证传入的语言是否支持
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: 'Asia/Shanghai',
    formats: {
      dateTime: {
        short: {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        },
      },
      number: {
        precise: {
          maximumFractionDigits: 2,
        },
      },
    },
  };
});

// 导出语言常量，供其他文件使用
export const locales = routing.locales;
export type Locale = typeof locales[number];