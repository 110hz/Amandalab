'use client';

import { useState, useEffect } from 'react';

interface GalleryImage {
  id: number;
  file_key: string;
  sort_order: number;
  title: string | null;
  url: string;
}

interface Props {
  category: string;
  productTag?: string;
  bgClass?: string;
  // Show bottom CTA button
  showCta?: boolean;
  ctaText?: string;
  ctaHref?: string;
}

export default function ImageTiledGallery({
  category,
  productTag,
  bgClass = '',
  showCta = false,
  ctaText = 'View Products',
  ctaHref = '/products',
}: Props) {
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (productTag) params.set('product_tag', productTag);
    fetch(`/api/gallery/${category}?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setImages(data.data || []);
        }
      })
      .catch(() => {});
  }, [category, productTag]);

  if (images.length === 0) return null;

  return (
    <section className={`w-full py-16 md:py-20 ${bgClass}`}>
      <div className="mx-auto max-w-7xl px-6">
        {/* Horizontal row: equal height, auto width */}
        <div className="flex flex-wrap items-stretch gap-4 md:gap-6">
          {images.map((img, index) => (
            <div
              key={img.id}
              className="min-w-0 flex-1 overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md"
              style={{
                animationDelay: `${index * 100}ms`,
                transitionDelay: `${index * 50}ms`,
              }}
            >
              <img
                src={img.url}
                alt={img.title || `${category} ${index + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* CTA Button */}
        {showCta && (
          <div className="mt-12 text-center">
            <a
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-full bg-morpho px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-morpho/20 transition-all hover:bg-morpho-dark hover:shadow-xl hover:shadow-morpho/30 hover:-translate-y-0.5"
            >
              {ctaText}
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
