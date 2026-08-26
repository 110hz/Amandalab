import HeroSection from '@/components/HeroSection';
import CoreValues from '@/components/CoreValues';
import ImageTiledGallery from '@/components/ImageTiledGallery';
import ContactSection from '@/components/ContactSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CoreValues />
      <ImageTiledGallery category="core_values" bgClass="bg-cream" showCta={true} />
      <ContactSection />
    </>
  );
}
