import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'AMANDA LAB · MORPHO 闪蝶浮云',
    template: '%s | AMANDA LAB',
  },
  description:
    'MORPHO 闪蝶浮云 — 专业饮品云顶解决方案，咖啡/茶饮/甜品全场景应用。专利技术，30分钟稳定造型，即喷即用。',
  keywords: [
    '闪蝶浮云',
    'MORPHO',
    'AMANDA LAB',
    '云顶',
    '奶泡',
    '咖啡',
    '茶饮',
    'Cloud Foam',
    'Cheese Foam',
  ],
  openGraph: {
    title: 'AMANDA LAB · MORPHO 闪蝶浮云',
    description: '专业饮品云顶解决方案 · 咖啡/茶饮/甜品全场景应用',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
