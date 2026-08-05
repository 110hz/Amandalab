'use client';

import { useLang } from '@/contexts/lang-context';
import { content } from '@/lib/i18n';
import { useFadeIn } from '@/hooks/use-fade-in';
import { useState, useEffect } from 'react';

interface GalleryImage {
  id: number;
  url: string;
  title: string | null;
}

export default function HeroSection() {
  const { lang } = useLang();
  const ref = useFadeIn();
  const [heroImages, setHeroImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    fetch('/api/gallery/hero')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.length) {
          setHeroImages(data.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-white px-6 pt-16"
    >
      {/* Hero background images (tinted gray) */}
      {heroImages.length > 0 && (
        <div className="pointer-events-none absolute inset-0">
          {heroImages.map((img, i) => (
            <div
              key={img.id}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <img
                src={img.url}
                alt={img.title || 'Hero background'}
                className="h-full w-full object-cover grayscale opacity-40"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          ))}
          {/* Overlay gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white/85" />
        </div>
      )}

      {/* Background decoration (fallback) */}
      {heroImages.length === 0 && (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-morpho/5 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-warm-gold/5 blur-3xl" />
          <svg
            className="absolute top-1/4 right-[15%] h-32 w-32 text-morpho/8 md:h-48 md:w-48"
            viewBox="0 0 100 100"
            fill="none"
          >
            <path
              d="M50 20C40 10 15 15 10 35C5 55 25 70 50 80C75 70 95 55 90 35C85 15 60 10 50 20Z"
              fill="currentColor"
              opacity="0.06"
            />
            <path
              d="M50 30C43 23 25 27 22 42C19 57 33 67 50 74C67 67 81 57 78 42C75 27 57 23 50 30Z"
              fill="currentColor"
              opacity="0.1"
            />
            <path
              d="M50 40C46 36 35 38 33 47C31 56 40 62 50 66C60 62 69 56 67 47C65 38 54 36 50 40Z"
              fill="currentColor"
              opacity="0.15"
            />
          </svg>
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Main title */}
        <h1
          className="fade-in-up mb-4 text-4xl font-bold tracking-tight text-text-main md:text-6xl lg:text-7xl"
          style={{ transitionDelay: '100ms' }}
        >
          {content.hero.brandName[lang]}
        </h1>

        {/* Tagline */}
        <p
          className="fade-in-up mb-2 text-lg font-medium text-morpho md:text-xl"
          style={{ transitionDelay: '200ms' }}
        >
          {content.hero.tagline[lang]}
        </p>

        {/* Subtitle */}
        <p
          className="fade-in-up mb-8 text-sm text-text-muted md:text-base"
          style={{ transitionDelay: '300ms' }}
        >
          {content.hero.subtitle[lang]}
        </p>

        {/* Description */}
        <p
          className="fade-in-up mx-auto mb-10 max-w-2xl text-base leading-relaxed text-text-muted md:text-lg"
          style={{ transitionDelay: '400ms' }}
        >
          {content.hero.description[lang]}
        </p>

        {/* CTA Buttons */}
        <div
          className="fade-in-up flex flex-col items-center justify-center gap-4 sm:flex-row"
          style={{ transitionDelay: '500ms' }}
        >
          <a
            href="/products"
            className="rounded-full bg-morpho px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-morpho/20 transition-all hover:bg-morpho-dark hover:shadow-xl hover:shadow-morpho/30 hover:-translate-y-0.5"
          >
            {content.hero.ctaPrimary[lang]}
          </a>
          <a
            href="#core-values"
            className="rounded-full border border-border bg-white px-8 py-3 text-sm font-semibold text-text-main transition-all hover:border-morpho/30 hover:text-morpho"
          >
            {content.hero.ctaSecondary[lang]}
          </a>
        </div>
      </div>
    </section>
  );
}
