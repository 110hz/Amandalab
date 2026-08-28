'use client';

import { useState, useEffect } from 'react';
import { useLang } from '@/contexts/lang-context';
import { content } from '@/lib/i18n';
import { useFadeIn } from '@/hooks/use-fade-in';
import ImageCarousel from '@/components/ImageCarousel';

function ProductHero({ productIdx }: { productIdx: number }) {
  const { lang } = useLang();
  const product = content.products.items[productIdx];
  const ref = useFadeIn();

  return (
    <section className="bg-cream pt-24 pb-12 px-6" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <div className="fade-in-up grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Left: text */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <h1 className="text-3xl font-bold text-text-main md:text-4xl">
                {product.name[lang]}
              </h1>
              <span className="rounded-full bg-warm-gold/15 px-3 py-1 text-xs font-medium text-warm-gold">
                {product.tag[lang]}
              </span>
            </div>
            <p className="mb-6 text-base leading-relaxed text-text-muted">
              {product.overview[lang]}
            </p>
            <div className="space-y-3">
              {product.highlights.filter((_: any, i: number) => i % 2 === 0).map((h: any, i: number) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 h-5 w-5 flex-shrink-0 rounded-full bg-morpho-light flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-morpho">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-main">{h.title?.[lang] || h[lang]}</p>
                    <p className="text-xs text-text-muted">
                      {product.highlights[i * 2 + 1]?.[lang] || ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: product image from gallery */}
          <div className="fade-in-up" style={{ transitionDelay: '200ms' }}>
            <ProductImageGallery productTag={productIdx === 0 ? 'cloud' : productIdx === 1 ? 'cheese' : 'coconut'} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductImageGallery({ productTag }: { productTag: string }) {
  const { lang } = useLang();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/gallery/product?product_tag=${productTag}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.length) {
          setImage(data.data[0].url);
        } else {
          setImage(null);
        }
      })
      .catch(() => setImage(null))
      .finally(() => setLoading(false));
  }, [productTag]);

  if (loading) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg">
        <div className="aspect-square w-full flex items-center justify-center bg-gradient-to-br from-morpho-light to-cream p-8">
          <div className="text-center text-text-muted opacity-50">
            <div className="mx-auto mb-3 h-12 w-12 animate-pulse rounded-full bg-muted" />
            <div className="mx-auto h-4 w-24 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg">
      <div className="aspect-square w-full flex items-center justify-center bg-gradient-to-br from-morpho-light to-cream p-8">
        {image ? (
          <img
            src={image}
            alt="Product"
            className="max-h-full max-w-full object-contain drop-shadow-xl"
          />
        ) : (
          <div className="text-center text-text-muted">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto mb-3 opacity-30">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
            <p className="text-sm">
              {productTag === 'cloud'
                ? content.products.items[0].name[lang]
                : content.products.items[1].name[lang]}
            </p>
            <p className="text-xs mt-1 opacity-60">
              {content.products.subtitle[lang]}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsContent() {
  const { lang } = useLang();
  const [activeProduct, setActiveProduct] = useState(0);
  const product = content.products.items[activeProduct];
  const productTag = activeProduct === 0 ? 'cloud' : activeProduct === 1 ? 'cheese' : 'coconut';

  return (
    <>
      {/* Product tabs */}
      <section className="border-b border-border bg-white px-6 pt-20 pb-4 sticky top-16 z-30">
        <div className="mx-auto max-w-6xl flex justify-center gap-3">
          {content.products.items.map((p: any, i: number) => (
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
      </section>

      {/* Product hero with image */}
      <ProductHero productIdx={activeProduct} />

      {/* Specs + App carousel */}
      <section className="bg-white py-16 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Specs */}
            <div>
              <h3 className="mb-6 text-xl font-bold text-text-main">
                {content.products.specTitle?.[lang] || '产品规格'}
              </h3>
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-border last:border-b-0">
                      <td className="bg-muted/50 px-4 py-3 font-medium text-text-muted w-1/3">
                        {product.specs.name[lang]}
                      </td>
                      <td className="px-4 py-3 text-text-main">{product.specs.nameValue[lang]}</td>
                    </tr>
                    <tr className="border-b border-border last:border-b-0">
                      <td className="bg-muted/50 px-4 py-3 font-medium text-text-muted">
                        {product.specs.spec[lang]}
                      </td>
                      <td className="px-4 py-3 text-text-main">{product.specs.specValue}</td>
                    </tr>
                    <tr className="border-b border-border last:border-b-0">
                      <td className="bg-muted/50 px-4 py-3 font-medium text-text-muted">
                        {product.specs.shelfLife[lang]}
                      </td>
                      <td className="px-4 py-3 text-text-main">{product.specs.shelfLifeValue[lang]}</td>
                    </tr>
                    <tr className="border-b border-border last:border-b-0">
                      <td className="bg-muted/50 px-4 py-3 font-medium text-text-muted">
                        {product.specs.storage[lang]}
                      </td>
                      <td className="px-4 py-3 text-text-main">{product.specs.storageValue[lang]}</td>
                    </tr>
                    <tr className="border-b border-border last:border-b-0">
                      <td className="bg-muted/50 px-4 py-3 font-medium text-text-muted">
                        {product.specs.usage[lang]}
                      </td>
                      <td className="px-4 py-3 text-text-main">{product.specs.usageValue[lang]}</td>
                    </tr>
                    <tr className="last:border-b-0">
                      <td className="bg-muted/50 px-4 py-3 font-medium text-text-muted">
                        {product.specs.note[lang]}
                      </td>
                      <td className="px-4 py-3 text-text-main">{product.specs.noteValue[lang]}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Application images carousel */}
            <div>
              <h3 className="mb-6 text-xl font-bold text-text-main">
                {content.products.appTitle?.[lang] || '应用场景'}
              </h3>
              <ImageCarousel category="app" productTag={productTag} clickable={true} contain={true} maxHeight="max-h-[420px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Applications text */}
      <section className="bg-cream py-16 px-6">
        <div className="mx-auto max-w-6xl">
          <h3 className="mb-10 text-center text-xl font-bold text-text-main md:text-2xl">
            {content.products.appScenarios?.[lang] || '全场景应用'}
          </h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {product.applications.map((app: any, i: number) => (
              <div
                key={i}
                className="rounded-xl border border-border/50 bg-white p-6 text-center transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-morpho-light text-morpho">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                    <line x1="6" y1="2" x2="6" y2="4" />
                    <line x1="10" y1="2" x2="10" y2="4" />
                    <line x1="14" y1="2" x2="14" y2="4" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-text-main">{app[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
