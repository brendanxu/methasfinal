import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Methas 管理后台',
  description: '内容管理系统',
  robots: 'noindex, nofollow', // 防止搜索引擎索引管理后台
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  );
}