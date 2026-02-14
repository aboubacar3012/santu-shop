"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface ImageCarouselProps {
  /** Liste des URLs d’images (Pexels, etc.) */
  images: string[];
  /** Variante d’affichage : "default" (grande) ou "card" (compacte pour cartes produit) */
  variant?: "default" | "card";
  /** Classe du conteneur racine */
  className?: string;
  /** Alt text pour les images */
  alt?: string;
}

export function ImageCarousel({
  images,
  variant = "default",
  className = "",
  alt = "Image",
}: ImageCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images.length) return null;

  const currentImage = images[selectedIndex];
  const isCard = variant === "card";
  const isSingleImage = images.length === 1;

  const goToPrev = () => {
    setSelectedIndex((i) => (i <= 0 ? images.length - 1 : i - 1));
  };

  const goToNext = () => {
    setSelectedIndex((i) => (i >= images.length - 1 ? 0 : i + 1));
  };

  return (
    <div className={`flex flex-col bg-gray-100 rounded-lg overflow-hidden ${className}`}>
      {/* Image principale */}
      <div
        className={`relative w-full bg-gray-200 overflow-hidden ${
          isCard ? "aspect-square" : "aspect-[4/3] min-h-[200px]"
        }`}
      >
        <Image
          src={currentImage}
          alt={`${alt} ${selectedIndex + 1}`}
          fill
          className="object-cover"
          sizes={isCard ? "(max-width: 260px) 100vw, 260px" : "100vw"}
          unoptimized={currentImage.includes("pexels.com")}
        />
      </div>

      {/* Bande de vignettes + boutons gauche/droite uniquement */}
      {!isSingleImage && (
        <div className="relative flex items-center bg-gray-900/95 py-1 px-1 sm:py-1.5 sm:px-1.5">
          <button
            type="button"
            onClick={goToPrev}
            className="flex-shrink-0 p-0.5 sm:p-1 rounded text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Image précédente"
          >
            <ChevronLeft className={isCard ? "w-3 h-3 sm:w-3.5 sm:h-3.5" : "w-4 h-4"} />
          </button>

          <div className="flex-1 min-w-0 overflow-hidden flex gap-1 sm:gap-1.5 mx-0.5 justify-center flex-wrap">
            {images.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedIndex(i)}
                className={`relative flex-shrink-0 rounded-sm overflow-hidden transition-all ${
                  i === selectedIndex
                    ? "ring-2 ring-white ring-offset-0.5 ring-offset-gray-900"
                    : "opacity-70 hover:opacity-100"
                } ${isCard ? "w-6 h-6 sm:w-7 sm:h-7" : "w-8 h-8 sm:w-9 sm:h-9"}`}
              >
                <Image
                  src={src}
                  alt={`${alt} miniature ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="36px"
                  unoptimized={src.includes("pexels.com")}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={goToNext}
            className="flex-shrink-0 p-0.5 sm:p-1 rounded text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Image suivante"
          >
            <ChevronRight className={isCard ? "w-3 h-3 sm:w-3.5 sm:h-3.5" : "w-4 h-4"} />
          </button>
        </div>
      )}
    </div>
  );
}
