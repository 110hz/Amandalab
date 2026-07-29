'use client';

import { useState } from 'react';
import { type Lang, content } from '@/lib/i18n';
import { useFadeIn } from '@/hooks/use-fade-in';

export default function ProductSection({ lang }: { lang: Lang }) {
  const ref = useFadeIn();
  const [activeProduct, setActiveProduct] = useState(0);
  const products = content.products.items;
  const product = products[activeProduct];

  return (
    <section id="products" className="bg-white py-20 px-6" ref={ref}>
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="fade-in-up mb-12 text-center">
          <h2 className="mb-3 text-2xl font-bold text-text-main md:text-3xl">
            {content.products.title[lang]}
          </h2>
          <p className="text-sm text-text-muted">{content.products.subtitle[lang]}</p>
        </div>

        {/* Product tabs */}
        <div className="fade-in-up mb-10 flex justify-center gap-3" style={{ transitionDelay: '100ms' }}>
          {products.map((p, i) => (
            <button
              key={i}
              onClick={() => setActiveProduct(i)}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                activeProduct === i
                  ? 'bg-morpho text-white shadow-md shadow-morpho/20'
                  : 'bg-muted text-text-muted hover:text-morpho'
              }`}
            >
              {p.name[lang]}
            </button>
          ))}
        </div>

        {/* Product detail */}
        <div className="fade-in-up grid grid-cols-1 gap-10 lg:grid-cols-2" style={{ transitionDelay: '200ms' }}>
          {/* Left: Overview + Highlights */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <h3 className="text-xl font-bold text-text-main">{product.name[lang]}</h3>
              <span className="rounded-full bg-warm-gold/15 px-3 py-0.5 text-xs font-medium text-warm-gold">
                {product.tag[lang]}
              </span>
            </div>
            <p className="mb-8 text-sm leading-relaxed text-text-muted">
              {product.overview[lang]}
            </p>

            {/* Highlights */}
            <div className="space-y-4">
              {product.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3">
                  {i % 2 === 0 ? (
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-morpho-light text-xs font-bold text-morpho">
                      {Math.floor(i / 2) + 1}
                    </span>
                  ) : null}
                  <div>
                    {i % 2 === 0 ? (
                      <p className="text-sm font-semibold text-text-main">{h[lang]}</p>
                    ) : (
                      <p className="text-xs leading-relaxed text-text-muted">{h[lang]}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Specs + Applications */}
          <div className="space-y-6">
            {/* Specs table */}
            <div className="rounded-2xl border border-border/50 bg-cream/50 p-6">
              <h4 className="mb-4 text-sm font-semibold text-text-main">
                {lang === 'zh' ? '产品规格' : 'Specifications'}
              </h4>
              <div className="space-y-3">
                {[
                  { label: product.specs.name[lang], value: product.specs.nameValue[lang] },
                  { label: product.specs.spec[lang], value: product.specs.specValue },
                  { label: product.specs.shelfLife[lang], value: product.specs.shelfLifeValue[lang] },
                  { label: product.specs.storage[lang], value: product.specs.storageValue[lang] },
                  { label: product.specs.usage[lang], value: product.specs.usageValue[lang] },
                  { label: product.specs.note[lang], value: product.specs.noteValue[lang] },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between border-b border-border/30 pb-2 last:border-0 last:pb-0">
                    <span className="text-xs text-text-muted">{row.label}</span>
                    <span className="text-xs font-medium text-text-main">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Applications */}
            <div className="rounded-2xl border border-border/50 bg-cream/50 p-6">
              <h4 className="mb-4 text-sm font-semibold text-text-main">
                {lang === 'zh' ? '应用场景' : 'Application Scenarios'}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {product.applications.map((app, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-xl border border-border/30 bg-white px-4 py-3 transition-all hover:border-morpho/30 hover:shadow-sm"
                  >
                    <div className="h-2 w-2 rounded-full bg-morpho/40" />
                    <span className="text-xs font-medium text-text-main">{app[lang]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
