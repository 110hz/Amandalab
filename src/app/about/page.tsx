import type { Metadata } from 'next';
import AboutContent from '@/components/AboutContent';
import ContactSection from '@/components/ContactSection';

export const metadata: Metadata = {
  title: '关于我们',
  description: '闪蝶 Morpho Foam - 全球喷灌食品领航者',
};

export default function AboutPage() {
  return (
    <>
      <AboutContent />
      <ContactSection />
    </>
  );
}
