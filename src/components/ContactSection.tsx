'use client';

import { useLang } from '@/contexts/lang-context';
import { content } from '@/lib/i18n';
import { useFadeIn } from '@/hooks/use-fade-in';

export default function ContactSection() {
  const { lang } = useLang();
  const ref = useFadeIn();

  return (
    <section className="bg-morpho py-20 px-6 text-white" ref={ref}>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="fade-in-up mb-4 text-2xl font-bold md:text-3xl">
          {content.about.contact.email[lang]}
        </h2>
        <p className="fade-in-up mb-8 text-sm text-white/80 md:text-base" style={{ transitionDelay: '100ms' }}>
          {content.footer.tagline[lang]}
        </p>
        <div className="fade-in-up flex flex-col items-center gap-6 sm:flex-row sm:justify-center" style={{ transitionDelay: '200ms' }}>
          <a
            href={`mailto:${content.about.contact.emailValue}`}
            className="flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-morpho shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-10 7L2 7" />
            </svg>
            {content.about.contact.emailValue}
          </a>
        </div>
        <p className="fade-in-up mt-8 text-xs text-white/60" style={{ transitionDelay: '300ms' }}>
          {content.about.contact.address[lang]}：{content.about.contact.addressValue[lang]}
        </p>
      </div>
    </section>
  );
}
