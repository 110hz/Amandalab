'use client';

import { type Lang, content } from '@/lib/i18n';
import { useFadeIn } from '@/hooks/use-fade-in';

export default function AboutSection({ lang }: { lang: Lang }) {
  const ref = useFadeIn();

  return (
    <section id="about" className="bg-white py-20 px-6" ref={ref}>
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="fade-in-up mb-12 text-center">
          <h2 className="mb-3 text-2xl font-bold text-text-main md:text-3xl">
            {content.about.title[lang]}
          </h2>
          <p className="text-sm font-medium text-morpho">
            {content.about.brandName[lang]}
          </p>
        </div>

        {/* Description */}
        <p className="fade-in-up mx-auto mb-16 max-w-2xl text-center text-sm leading-relaxed text-text-muted" style={{ transitionDelay: '100ms' }}>
          {content.about.description[lang]}
        </p>

        {/* Timeline */}
        <div className="fade-in-up mb-16" style={{ transitionDelay: '200ms' }}>
          <h3 className="mb-8 text-center text-lg font-bold text-text-main">
            {lang === 'zh' ? '发展历程' : 'Milestones'}
          </h3>
          <div className="relative mx-auto max-w-2xl">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-px" />
            {content.about.milestones.map((m, i) => (
              <div
                key={m.year}
                className={`fade-in-up relative mb-8 flex items-start gap-6 md:gap-0 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                style={{ transitionDelay: `${(i + 3) * 100}ms` }}
              >
                {/* Dot */}
                <div className="absolute left-6 z-10 h-3 w-3 -translate-x-1.5 rounded-full border-2 border-morpho bg-white md:left-1/2 md:-translate-x-1.5" />
                {/* Content */}
                <div className={`ml-12 flex-1 md:ml-0 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <span className="inline-block rounded-full bg-morpho-light px-3 py-0.5 text-xs font-bold text-morpho">
                    {m.year}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {m.text[lang]}
                  </p>
                </div>
                {/* Spacer for the other side */}
                <div className="hidden flex-1 md:block" />
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Advantages */}
        <div className="fade-in-up grid grid-cols-1 gap-10 lg:grid-cols-2" style={{ transitionDelay: '600ms' }}>
          {/* Certifications */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-text-main">
              {lang === 'zh' ? '资质认证' : 'Certifications'}
            </h3>
            <div className="space-y-3">
              {content.about.certifications.map((cert, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl border border-border/30 bg-cream/50 px-5 py-3"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-morpho">
                    <path d="M9 12l2 2 4-4" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  <span className="text-sm font-medium text-text-main">{cert[lang]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Advantages */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-text-main">
              {lang === 'zh' ? '核心优势' : 'Key Advantages'}
            </h3>
            <div className="space-y-4">
              {content.about.advantages.map((adv, i) => (
                <div key={i} className="rounded-xl border border-border/30 bg-cream/50 p-4">
                  <h4 className="mb-1 text-sm font-semibold text-text-main">
                    {adv.title[lang]}
                  </h4>
                  <p className="text-xs leading-relaxed text-text-muted">
                    {adv.desc[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="fade-in-up mt-16 rounded-2xl border border-border/50 bg-cream/50 p-8 text-center" style={{ transitionDelay: '700ms' }}>
          <h3 className="mb-6 text-lg font-bold text-text-main">
            {lang === 'zh' ? '联系我们' : 'Contact Us'}
          </h3>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-morpho">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4L12 13L2 4" />
              </svg>
              <span className="text-sm text-text-muted">
                {content.about.contact.email[lang]}:
              </span>
              <a
                href={`mailto:${content.about.contact.emailValue}`}
                className="text-sm font-medium text-morpho transition-colors hover:text-morpho-dark"
              >
                {content.about.contact.emailValue}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-morpho">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="text-sm text-text-muted">
                {content.about.contact.address[lang]}:
              </span>
              <span className="text-sm font-medium text-text-main">
                {content.about.contact.addressValue[lang]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
