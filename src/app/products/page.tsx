import type { Metadata } from 'next';
import ProductsContent from '@/components/ProductsContent';
import ContactSection from '@/components/ContactSection';

export const metadata: Metadata = {
  title: 'Products & Solutions',
  description: 'Morpho Cloud Foam & Cheese Foam — Professional cloud foam solutions for beverages',
};

export default function ProductsPage() {
  return (
    <>
      <ProductsContent />
      <ContactSection />
    </>
  );
}
