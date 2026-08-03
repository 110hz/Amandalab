'use client';

import { useState } from 'react';
import { useLang } from '@/contexts/lang-context';
import { content } from '@/lib/i18n';
import { useFadeIn } from '@/hooks/use-fade-in';

export default function FAQContent() {
  const { lang } = useLang();
  const ref = useFadeIn();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-20 px-6 pt-28" ref={ref}>
      <div className="mx-auto max-w-3xl">
        <div className="fade-in-up mb-12 text-center">
          <h2 className="mb-3 text-2xl font-bold text-text-main md:text-3xl">
            {content.faq.title[lang]}
          </h2>
          <p className="text-sm text-text-muted">{content.faq.subtitle?.[lang] || ''}</p>
        </div>

        <div className="fade-in-up space-y-3" style={{ transitionDelay: '100ms' }}>
          {content.faq.items.map((item: any, i: number) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-border bg-white transition-all hover:border-morpho/20"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
              >
                <span className="text-sm font-semibold text-text-main md:text-base">
                  {item.q[lang]}
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`flex-shrink-0 text-morpho transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-4 text-sm leading-relaxed text-text-muted">
                    {item.a[lang]}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
