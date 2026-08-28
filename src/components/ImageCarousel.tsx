'use client';

import { useState, useEffect, useCallback } from 'react';

interface GalleryImage {
  id: number;
  url: string;
  title: string | null;
}

interface ImageCarouselProps {
  category: string;
  productTag?: string; // 可选，按产品标签过滤
  layout?: 'single' | 'a4-duo'; // 单张大图 or A4竖版双列
  clickable?: boolean; // 是否支持点击放大
  aspectRatio?: string; // 宽高比，默认 aspect-[16/9]
  contain?: boolean; // 图片是否完整显示（不裁切），默认false
  maxHeight?: string; // single模式下最大高度，默认 none
}

export default function ImageCarousel({
  category,
  productTag,
  layout = 'single',
  clickable = true,
  aspectRatio = 'aspect-[16/9]',
  contain = false,
  maxHeight,
}: ImageCarouselProps) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // 每页显示张数
  const perPage = layout === 'a4-duo' ? 2 : 1;
  const totalPages = Math.max(1, Math.ceil(images.length / perPage));

  useEffect(() => {
    const params = new URLSearchParams();
    if (productTag) params.set('product_tag', productTag);
    fetch(`/api/gallery/${category}?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.length) {
          setImages(data.data);
          setCurrent(0);
        } else {
          setImages([]);
          setCurrent(0);
        }
      })
      .catch(() => {
        setImages([]);
      });
  }, [category, productTag]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + totalPages) % totalPages);
  }, [totalPages]);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % totalPages);
  }, [totalPages]);

  const openLightbox = (idx: number) => {
    if (!clickable) return;
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const lightboxPrev = () => setLightboxIndex((i) => (i - 1 + images.length) % images.length);
  const lightboxNext = () => setLightboxIndex((i) => (i + 1) % images.length);

  if (images.length === 0) return null;

  // 当前页显示的图片
  const pageImages = images.slice(current * perPage, (current + 1) * perPage);

  return (
    <>
      <div className="relative w-full">
        <div className={`relative overflow-hidden rounded-xl bg-muted ${layout === 'a4-duo' ? '' : maxHeight ? maxHeight : aspectRatio} flex items-center justify-center`}>
          {layout === 'a4-duo' ? (
            <div className="grid grid-cols-2 gap-3 p-3">
              {pageImages.map((img, i) => (
                <div
                  key={img.id}
                  className={`relative aspect-[1/sqrt(2)] overflow-hidden rounded-lg bg-white shadow-sm ${clickable ? 'cursor-pointer hover:opacity-95 transition-opacity' : ''}`}
                  onClick={() => openLightbox(current * perPage + i)}
                >
                  <img
                    src={img.url}
                    alt={img.title || category}
                    className="h-full w-full object-contain p-2"
                  />
                </div>
              ))}
            </div>
          ) : (
            pageImages.map((img, i) => (
              <div
                key={img.id}
                className={`absolute inset-0 ${clickable ? 'cursor-pointer' : ''}`}
                onClick={() => openLightbox(current * perPage + i)}
              >
                <img
                  src={img.url}
                  alt={img.title || category}
                  className={`h-full w-full ${contain ? 'object-contain' : 'object-cover'}`}
                />
              </div>
            ))
          )}
        </div>

        {/* 左右箭头 */}
        {images.length > perPage && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-text-main shadow-md transition-all hover:bg-white hover:scale-105"
              aria-label="Previous"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-text-main shadow-md transition-all hover:bg-white hover:scale-105"
              aria-label="Next"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </>
        )}

        {/* 分页指示器 */}
        {images.length > perPage && (
          <div className="mt-4 flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${i === current ? 'w-6 bg-morpho' : 'w-2 bg-border hover:bg-morpho/40'}`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* 灯箱放大查看 */}
      {lightboxOpen && images[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            onClick={(e) => { e.stopPropagation(); lightboxPrev(); }}
            aria-label="Previous"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            onClick={(e) => { e.stopPropagation(); lightboxNext(); }}
            aria-label="Next"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          <img
            src={images[lightboxIndex].url}
            alt={images[lightboxIndex].title || ''}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {images[lightboxIndex].title && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-white/80">
              {images[lightboxIndex].title}
            </div>
          )}
        </div>
      )}
    </>
  );
}
