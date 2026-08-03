import type { Metadata } from 'next';
import ProductsContent from '@/components/ProductsContent';
import ContactSection from '@/components/ContactSection';

export const metadata: Metadata = {
  title: '产品与方案',
  description: '闪蝶浮云与闪蝶芝云产品介绍，专业饮品云顶解决方案',
};

export default function ProductsPage() {
  return (
    <>
      <ProductsContent />
      <ContactSection />
    </>
  );
}
