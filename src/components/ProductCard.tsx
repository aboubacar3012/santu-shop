"use client";

import Link from "next/link";
import type { Product } from "@/app/santu-admin/types";

export interface ProductCardProps {
  product: Product;
  /** Si fourni, clic ouvre le détail (ex. modal) au lieu de naviguer */
  onProductClick?: (product: Product) => void;
  /** Lien de la carte quand onProductClick n'est pas fourni (défaut: /shop/product/{id}) */
  href?: string;
  /** Classe du conteneur */
  className?: string;
  /** Format du prix (défaut: "X GNF") */
  formatPrice?: (price: number) => string;
}

const defaultFormatPrice = (price: number) =>
  `${price.toLocaleString("fr-FR")} GNF`;

export function ProductCard({
  product,
  onProductClick,
  href,
  className = "",
  formatPrice = defaultFormatPrice,
}: ProductCardProps) {
  const cardHref = href ?? `/shop/product/${product.id}`;
  const firstImage = product.images?.[0];
  const content = (
    <div className="h-full bg-white border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all duration-300">
      <div className="relative w-full h-40 bg-gray-100 overflow-hidden">
        {firstImage ? (
          <img
            src={firstImage}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
            Pas d’image
          </div>
        )}
      </div>
      <div className="p-2.5 sm:p-3">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-gray-700 transition-colors">
          {product.title}
        </h3>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          {product.originalPrice != null && product.originalPrice > 0 && (
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          <span className="text-sm font-bold text-red-600">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </div>
  );

  if (onProductClick) {
    return (
      <button
        type="button"
        onClick={() => onProductClick(product)}
        className={`group block h-full w-full text-left ${className}`}
      >
        {content}
      </button>
    );
  }

  return (
    <Link href={cardHref} className={`group block h-full ${className}`}>
      {content}
    </Link>
  );
}
