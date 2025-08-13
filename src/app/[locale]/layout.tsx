import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { routing } from '../../../i18n/routing';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // 验证语言参数
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const siteConfig = messages.site as any;

  return {
    title: siteConfig.title,
    description: siteConfig.description,
    metadataBase: new URL('https://methas.cn'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'zh': '/zh',
        'en': '/en',
      },
    },
    openGraph: {
      title: siteConfig.title,
      description: siteConfig.description,
      url: `https://methas.cn/${locale}`,
      siteName: siteConfig.name,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.title,
      description: siteConfig.description,
      images: ['/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // 验证语言参数
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable}>
      <body className={`${inter.className} antialiased bg-white text-black`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}