import type { Metadata } from 'next';
import FAQContent from '@/components/FAQContent';

export const metadata: Metadata = {
  title: '常见问题',
  description: '闪蝶 Morpho Foam 常见问题解答',
};

export default function FAQPage() {
  return <FAQContent />;
}
