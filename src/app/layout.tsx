import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '闪蝶 Morpho Foam · 专业饮品云顶解决方案',
    template: '%s | 闪蝶 Morpho Foam',
  },
  description:
    'MORPHO 闪蝶浮云 — 专业饮品云顶解决方案，咖啡/茶饮/甜品全场景应用。专利技术，30分钟稳定造型，即喷即用。',
  keywords: [
    '闪蝶浮云',
    'Morpho Foam',
    'MORPHO',
    '云顶',
    '奶泡',
    '咖啡',
    '茶饮',
    'Cloud Foam',
    'Cheese Foam',
  ],
  openGraph: {
    title: '闪蝶 Morpho Foam · 专业饮品云顶解决方案',
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
