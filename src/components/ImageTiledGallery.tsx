'use client';

import { useState, useEffect } from 'react';
import { useFadeIn } from '@/hooks/use-fade-in';

interface GalleryImage {
  id: number;
  url: string;
  title: string | null;
}

export default function ImageTiledGallery({
  category,
  bgClass = 'bg-white',
}: {
  category: string;
  bgClass?: string;
}) {
  const ref = useFadeIn();
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    fetch(`/api/gallery/${category}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.length) {
          setImages(data.data);
        }
      })
      .catch(() => {});
  }, [category]);

  if (images.length === 0) return null;

  return (
    <section className={`${bgClass} py-16 px-6`} ref={ref}>
      <div className="mx-auto max-w-6xl">
        <div className="space-y-6">
          {images.map((img, i) => (
            <div
              key={img.id}
              className="overflow-hidden rounded-xl bg-muted shadow-sm transition-all duration-500"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative w-full">
                <img
                  src={img.url}
                  alt={img.title || category}
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
