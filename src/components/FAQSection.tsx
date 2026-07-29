'use client';

import { useState } from 'react';
import { type Lang, content } from '@/lib/i18n';
import { useFadeIn } from '@/hooks/use-fade-in';

export default function FAQSection({ lang }: { lang: Lang }) {
  const ref = useFadeIn();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-cream py-20 px-6" ref={ref}>
      <div className="mx-auto max-w-3xl">
        <h2 className="fade-in-up mb-12 text-center text-2xl font-bold text-text-main md:text-3xl">
          {content.faq.title[lang]}
        </h2>
        <div className="space-y-3">
          {content.faq.items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="fade-in-up overflow-hidden rounded-2xl border border-border/50 bg-white transition-all duration-300"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-cream/50"
                >
                  <span className="pr-4 text-sm font-medium text-text-main">
                    {item.q[lang]}
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`shrink-0 text-text-muted transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-48 pb-4' : 'max-h-0'
                  }`}
                >
                  <p className="px-6 text-sm leading-relaxed text-text-muted">
                    {item.a[lang]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
