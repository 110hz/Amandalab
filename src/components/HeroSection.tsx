'use client';

import { type Lang, content } from '@/lib/i18n';
import { useFadeIn } from '@/hooks/use-fade-in';

export default function HeroSection({ lang }: { lang: Lang }) {
  const ref = useFadeIn();

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-6 pt-16"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-morpho/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-warm-gold/5 blur-3xl" />
        {/* Butterfly decorative element */}
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

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Brand badge */}
        <div className="fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-morpho/20 bg-morpho-light/50 px-4 py-1.5">
          <img
            src="/morpho-logo.png"
            alt="Logo"
            width={16}
            height={16}
            className="h-4 w-4"
          />
          <span className="text-xs font-medium text-morpho">
            {content.hero.brandSub[lang]}
          </span>
        </div>

        {/* Main title */}
        <h1 className="fade-in-up mb-4 text-4xl font-bold tracking-tight text-text-main md:text-6xl lg:text-7xl" style={{ transitionDelay: '100ms' }}>
          {content.hero.brandName[lang]}
        </h1>

        {/* Tagline */}
        <p className="fade-in-up mb-2 text-lg font-medium text-morpho md:text-xl" style={{ transitionDelay: '200ms' }}>
          {content.hero.tagline[lang]}
        </p>

        {/* Subtitle */}
        <p className="fade-in-up mb-8 text-sm text-text-muted md:text-base" style={{ transitionDelay: '300ms' }}>
          {content.hero.subtitle[lang]}
        </p>

        {/* Description */}
        <p
          className="fade-in-up mx-auto mb-10 max-w-2xl text-base leading-relaxed text-text-muted md:text-lg"
          style={{ transitionDelay: '400ms' }}
        >
          {content.hero.description[lang]}
        </p>

        {/* CTA */}
        <div className="fade-in-up flex flex-col items-center gap-4 sm:flex-row sm:justify-center" style={{ transitionDelay: '500ms' }}>
          <a
            href="#products"
            className="inline-flex items-center gap-2 rounded-full bg-morpho px-8 py-3 text-sm font-medium text-white shadow-lg shadow-morpho/20 transition-all hover:bg-morpho-dark hover:shadow-xl hover:shadow-morpho/30"
          >
            {content.hero.cta[lang]}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="fade-in-up mt-16 animate-bounce" style={{ transitionDelay: '700ms' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-text-muted/40">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
