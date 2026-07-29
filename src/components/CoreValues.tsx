'use client';

import { type ReactElement } from 'react';
import { type Lang, content } from '@/lib/i18n';
import { useFadeIn } from '@/hooks/use-fade-in';

const iconMap: Record<string, ReactElement> = {
  patent: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  ),
  easy: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  wide: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  visual: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
};

export default function CoreValues({ lang }: { lang: Lang }) {
  const ref = useFadeIn();

  return (
    <section className="bg-cream py-20 px-6" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <h2 className="fade-in-up mb-12 text-center text-2xl font-bold text-text-main md:text-3xl">
          {content.values.title[lang]}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.values.items.map((item, i) => (
            <div
              key={item.icon}
              className="fade-in-up rounded-2xl border border-border/50 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-morpho-light text-morpho">
                {iconMap[item.icon]}
              </div>
              <h3 className="mb-2 text-sm font-semibold text-text-main">
                {item.title[lang]}
              </h3>
              <p className="text-xs leading-relaxed text-text-muted">
                {item.desc[lang]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
