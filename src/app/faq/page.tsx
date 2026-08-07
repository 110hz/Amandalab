import type { Metadata } from 'next';
import FAQContent from '@/components/FAQContent';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about Morpho Foam products',
};

export default function FAQPage() {
  return <FAQContent />;
}
