'use client';

import { useState, useEffect } from 'react';
import { useLang } from '@/contexts/lang-context';
import { content } from '@/lib/i18n';
import { useFadeIn } from '@/hooks/use-fade-in';

interface GalleryImage {
  id: number;
  file_key: string;
  sort_order: number;
  title: string | null;
  url: string;
}

export default function HeroSection() {
  const { lang } = useLang();
  const sectionRef = useFadeIn();
  const [heroImages, setHeroImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    fetch('/api/gallery/hero')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setHeroImages(data.data || []);
        }
      })
      .catch(() => {});
  }, []);

  const heroImg = heroImages.length > 0 ? heroImages[0].url : null;

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-cream/30">
      {/* Background image (full, no overlay) */}
      {heroImg && (
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Morpho Foam products"
            className="h-full w-full object-contain object-center"
          />
          {/* Subtle gradient on the right for text readability */}
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-cream/95 via-cream/60 to-transparent" />
        </div>
      )}

      <div className="relative mx-auto flex min-h-[560px] w-full max-w-7xl items-center px-6 py-16 md:min-h-[680px] md:py-20">
        {/* Spacer for left side (image area) */}
        <div className="hidden w-1/2 lg:block" />

        {/* Text content - right side */}
        <div className="w-full lg:w-1/2 lg:pl-12 xl:pl-16">
          <h1
            className="fade-in-up mb-4 whitespace-nowrap font-bold tracking-tight text-text-main"
            style={{ transitionDelay: '100ms', fontSize: 'clamp(1.4rem, 3.5vw, 3.25rem)' }}
          >
            {content.hero.brandName[lang]}
          </h1>

          <p
            className="fade-in-up mb-2 text-lg font-medium text-morpho md:text-xl"
            style={{ transitionDelay: '200ms' }}
          >
            {content.hero.tagline[lang]}
          </p>

          <p
            className="fade-in-up mb-6 text-sm text-text-muted md:text-base"
            style={{ transitionDelay: '300ms' }}
          >
            {content.hero.subtitle[lang]}
          </p>

          <p
            className="fade-in-up mb-8 max-w-lg text-base leading-relaxed text-text-muted md:text-lg"
            style={{ transitionDelay: '400ms' }}
          >
            {content.hero.description[lang]}
          </p>

          <div
            className="fade-in-up flex justify-center"
            style={{ transitionDelay: '500ms' }}
          >
            <a
              href="/products"
              className="rounded-full bg-morpho px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-morpho/20 transition-all hover:bg-morpho-dark hover:shadow-xl hover:shadow-morpho/30 hover:-translate-y-0.5"
            >
              {content.hero.ctaPrimary[lang]}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
