'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  // If we only have 1 image, create crop variations for the gallery
  const mainImage = images[0] || 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80';
  const galleryImages = images.length >= 4 ? images : [
    mainImage,
    mainImage.includes('?') ? `${mainImage}&fit=crop&crop=top` : `${mainImage}?fit=crop&crop=top`,
    mainImage.includes('?') ? `${mainImage}&fit=crop&crop=center` : `${mainImage}?fit=crop&crop=center`,
    mainImage.includes('?') ? `${mainImage}&fit=crop&crop=bottom` : `${mainImage}?fit=crop&crop=bottom`,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  const prevImage = () => setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-[3/4] w-full bg-[#E8E0D0] overflow-hidden group">
        {galleryImages.map((src, index) => (
          <Image
            key={`${src}-${index}`}
            src={src}
            alt={`${productName} view ${index + 1}`}
            fill
            unoptimized={true}
            priority={index === 0}
            className={`object-cover object-center transition-opacity duration-500 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 backdrop-blur-sm border border-[#1E1E1E] flex items-center justify-center text-[#0D0D0D] opacity-0 group-hover:opacity-100 hover:bg-[#0D0D0D] hover:text-[#F5F0E8] transition-all duration-300"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 backdrop-blur-sm border border-[#1E1E1E] flex items-center justify-center text-[#0D0D0D] opacity-0 group-hover:opacity-100 hover:bg-[#0D0D0D] hover:text-[#F5F0E8] transition-all duration-300"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Thumbnails (4 items) */}
      <div className="grid grid-cols-4 gap-4">
        {galleryImages.slice(0, 4).map((src, index) => (
          <button
            key={`thumb-${index}`}
            onClick={() => setCurrentIndex(index)}
            className={`relative aspect-square bg-[#E8E0D0] overflow-hidden transition-all duration-200 ${
              currentIndex === index ? 'ring-2 ring-[#C4622D] ring-offset-2 ring-offset-[#F5F0E8]' : 'opacity-70 hover:opacity-100'
            }`}
          >
            <Image
              src={src}
              alt={`Thumbnail ${index + 1}`}
              fill
              unoptimized={true}
              className="object-cover object-center"
              sizes="(max-width: 1024px) 25vw, 15vw"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
