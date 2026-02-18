"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ShoppingCart, Check } from "lucide-react";
import { ImageCarousel } from "@/components/ImageCarousel";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/app/santu-admin/types";

export interface ProductCardProps {
  product: Product;
  /** Lien de la carte (défaut: /shop/{sellerSlug}) */
  href?: string;
  /** Classe du conteneur (ex. pour la largeur) */
  className?: string;
  /** Format du prix (défaut: "X GNF") */
  formatPrice?: (price: number) => string;
}

const defaultFormatPrice = (price: number) =>
  `${price.toLocaleString("fr-FR")} GNF`;

export function ProductCard({
  product,
  href,
  className = "",
  formatPrice = defaultFormatPrice,
}: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cardHref = href ?? `/shop/${product.sellerSlug}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id);
    setAdded(true);
    if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    resetTimeoutRef.current = setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link
      href={cardHref}
      className={`group block h-full ${className}`}
    >
      <div className="h-full bg-white border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all duration-300">
        <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
          <ImageCarousel
            images={product.images}
            variant="card"
            alt={product.title}
            className="rounded-none"
          />
        </div>

        <div className="p-2.5 sm:p-3 md:p-3.5">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-1.5 line-clamp-2 group-hover:text-gray-700 transition-colors">
            {product.title}
          </h3>

          <p className="text-[10px] sm:text-xs text-gray-500 mb-2 sm:mb-2.5 line-clamp-2 min-h-[2.5em] sm:min-h-[2.25em]">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-2 sm:mb-2.5">
            <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </p>
            <p className="text-[10px] sm:text-xs text-gray-400">
              {product.sellerName}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <motion.button
              type="button"
              onClick={handleAddToCart}
              disabled={added}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className={`inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium rounded-md px-2 py-1.5 sm:px-2.5 sm:py-2 transition-colors duration-300 ${
                added
                  ? "text-green-700 bg-green-100"
                  : "text-gray-700 bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Ajouté</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Ajouter au panier</span>
                </>
              )}
            </motion.button>
            <Link
              href={cardHref}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-gray-500 hover:text-gray-900 transition-colors group/btn"
            >
              <span>Voir boutique</span>
              <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover/btn:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
}
