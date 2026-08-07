import type { Metadata } from 'next';
import AboutContent from '@/components/AboutContent';
import ContactSection from '@/components/ContactSection';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Morpho Foam — Global leader in aerosol spray food technology',
};

export default function AboutPage() {
  return (
    <>
      <AboutContent />
      <ContactSection />
    </>
  );
}
