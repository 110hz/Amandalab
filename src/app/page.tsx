'use client';

import { useState } from 'react';
import { type Lang } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CoreValues from '@/components/CoreValues';
import ProductSection from '@/components/ProductSection';
import FAQSection from '@/components/FAQSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';

export default function Home() {
  const [lang, setLang] = useState<Lang>('zh');

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} onLangChange={setLang} />
      <main>
        <HeroSection lang={lang} />
        <CoreValues lang={lang} />
        <ProductSection lang={lang} />
        <FAQSection lang={lang} />
        <AboutSection lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
