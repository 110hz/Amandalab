'use client';

import { useLang } from '@/contexts/lang-context';
import { content } from '@/lib/i18n';
import { useFadeIn } from '@/hooks/use-fade-in';
import ImageCarousel from '@/components/ImageCarousel';
import ImageTiledGallery from '@/components/ImageTiledGallery';

export default function AboutContent() {
  const { lang } = useLang();
  const ref = useFadeIn();

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="bg-cream py-20 px-6 pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="fade-in-up mb-3 text-3xl font-bold text-text-main md:text-4xl">
            {content.about.title[lang]}
          </h1>
          <p className="fade-in-up mb-6 text-base font-medium text-morpho" style={{ transitionDelay: '100ms' }}>
            {content.about.brandName[lang]}
          </p>
          <p
            className="fade-in-up mx-auto max-w-2xl text-sm leading-relaxed text-text-muted"
            style={{ transitionDelay: '200ms' }}
          >
            {content.about.description[lang]}
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-16 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="fade-in-up mb-10">
            <h2 className="text-center text-xl font-bold text-text-main md:text-2xl">
              {lang === 'zh' ? '发展历程' : 'Milestones'}
            </h2>
          </div>
          <div className="relative mx-auto max-w-2xl">
            <div className="absolute left-6 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-px" />
            {content.about.milestones.map((m: any, i: number) => (
              <div
                key={m.year}
                className={`fade-in-up relative mb-8 flex items-start gap-6 md:gap-0 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="absolute left-6 z-10 h-3 w-3 -translate-x-1.5 rounded-full border-2 border-morpho bg-white md:left-1/2 md:-translate-x-1.5" />
                <div className={`ml-12 flex-1 md:ml-0 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <span className="inline-block rounded-full bg-morpho-light px-3 py-0.5 text-xs font-bold text-morpho">
                    {m.year}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {m.text[lang]}
                  </p>
                </div>
                <div className="hidden flex-1 md:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications + carousel */}
      <section className="bg-cream py-16 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="fade-in-up mb-8 text-center">
            <h2 className="text-xl font-bold text-text-main md:text-2xl">
              {lang === 'zh' ? '资质认证' : 'Certifications'}
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              {lang === 'zh' ? '多项国际认证，品质安全有保障' : 'Multiple international certifications for quality assurance'}
            </p>
          </div>

          {/* Cert images carousel - A4 竖版双列 */}
          <div className="fade-in-up mb-8" style={{ transitionDelay: '100ms' }}>
            <ImageCarousel category="cert" layout="a4-duo" clickable={true} />
          </div>

          {/* Cert text list */}
          <div className="fade-in-up grid grid-cols-1 gap-3 sm:grid-cols-2" style={{ transitionDelay: '200ms' }}>
            {content.about.certifications.map((cert: any, i: number) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl border border-border/30 bg-white px-5 py-3"
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
      </section>

      {/* Core advantages */}
      <section className="bg-white py-16 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="fade-in-up mb-10 text-center">
            <h2 className="text-xl font-bold text-text-main md:text-2xl">
              {lang === 'zh' ? '核心优势' : 'Key Advantages'}
            </h2>
          </div>
          <div className="fade-in-up grid grid-cols-1 gap-4 md:grid-cols-2">
            {content.about.advantages.map((adv: any, i: number) => (
              <div
                key={i}
                className="fade-in-up rounded-2xl border border-border/50 bg-cream/30 p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-morpho-light text-morpho">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-base font-semibold text-text-main">
                  {adv.title[lang]}
                </h3>
                <p className="text-sm leading-relaxed text-text-muted">
                  {adv.desc[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantage images (tiled) */}
      <ImageTiledGallery category="advantage" bgClass="bg-cream" />
    </div>
  );
}
