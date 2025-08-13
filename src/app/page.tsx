import { redirect } from 'next/navigation';

// 根页面重定向到中文版本
export default function RootPage() {
  redirect('/zh');
}