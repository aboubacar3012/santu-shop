"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ShoppingCart, Check, X } from "lucide-react";
import { ImageCarousel } from "@/components/ImageCarousel";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/app/santu-admin/types";

export interface ProductDetailsProps {
  product: Product | null;
  /**
   * Si fourni, affiche en modal (overlay + fermeture).
   * Sinon, affiche le contenu en inline (product doit être non null).
   */
  onClose?: () => void;
  /** Lien "Retour" (uniquement en mode inline ou si besoin dans le modal) */
  backHref?: string;
  backLabel?: string;
  /** Format du prix (défaut: "X GNF") */
  formatPrice?: (price: number) => string;
  /** Fermer au clic sur l'overlay (défaut: true, uniquement en mode modal) */
  closeOnOverlayClick?: boolean;
}

const defaultFormatPrice = (price: number) =>
  `${price.toLocaleString("fr-FR")} GNF`;

function ProductDetailsContent({
  product,
  backHref,
  backLabel,
  formatPrice = defaultFormatPrice,
  onAddToCart,
}: {
  product: Product;
  backHref?: string;
  backLabel?: string;
  formatPrice: (price: number) => string;
  onAddToCart: () => void;
}) {
  const [added, setAdded] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [descriptionClamped, setDescriptionClamped] = useState(false);
  const descRef = useRef<HTMLParagraphElement>(null);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = descRef.current;
    if (!el) return;
    setDescriptionClamped(el.scrollHeight > el.clientHeight);
  }, [product.description]);

  const handleAddToCart = () => {
    onAddToCart();
    setAdded(true);
    if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    resetTimeoutRef.current = setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Images — toute la largeur */}
      <div className="relative w-full bg-gray-100">
        <ImageCarousel
          images={product.images}
          variant="card"
          alt={product.title}
          className="rounded-none h-96"
        />
      </div>

      <div className="flex flex-col p-4 sm:p-5">
        {backHref && backLabel && (
          <Link
            href={backHref}
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 mb-3 w-fit"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            {backLabel}
          </Link>
        )}

        {/* Titre */}
        <h1
          id="product-detail-title"
          className="text-xl sm:text-2xl font-bold text-gray-900 mb-2"
        >
          {product.title}
        </h1>

        {/* Prix en rouge */}
        <div className="mb-4">
          <p className="text-2xl sm:text-3xl font-bold text-red-600">
            {formatPrice(product.price)}
          </p>
          {product.originalPrice != null && product.originalPrice > 0 && (
            <p className="text-sm text-gray-400 line-through mt-0.5">
              {formatPrice(product.originalPrice)}
            </p>
          )}
        </div>

        <p className="text-sm text-gray-500 mb-3">
          Vendu par{" "}
          <Link
            href={`/shop/${product.sellerSlug}`}
            className="font-medium text-gray-900 hover:underline"
          >
            {product.sellerName}
          </Link>
        </p>

        {/* Description — 5 lignes max + voir plus / voir moins */}
        <div className="mb-5">
          <p
            ref={descRef}
            className={`text-gray-600 text-sm sm:text-base leading-relaxed ${
              descriptionExpanded ? "" : "line-clamp-5"
            }`}
          >
            {product.description}
          </p>
          {(descriptionClamped || descriptionExpanded) && (
            <button
              type="button"
              onClick={() => setDescriptionExpanded((v) => !v)}
              className="mt-1 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              {descriptionExpanded ? "Voir moins" : "Voir plus"}
            </button>
          )}
        </div>

        {/* Bouton ajouter au panier — toute la largeur */}
        <motion.button
          type="button"
          onClick={handleAddToCart}
          disabled={added || !product.available}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-medium transition-colors ${
            added
              ? "text-green-700 bg-green-100 cursor-default"
              : !product.available
                ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                : "text-white bg-gray-900 hover:bg-gray-800"
          }`}
        >
          {added ? (
            <>
              <Check className="w-5 h-5" />
              Ajouté au panier
            </>
          ) : !product.available ? (
            "Indisponible"
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              Ajouter au panier
            </>
          )}
        </motion.button>

        <Link
          href={`/shop/${product.sellerSlug}`}
          className="inline-flex items-center gap-1 mt-4 text-sm text-gray-500 hover:text-gray-900"
        >
          Voir la boutique
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export function ProductDetails({
  product,
  onClose,
  backHref = "/home",
  backLabel = "Retour",
  formatPrice = defaultFormatPrice,
  closeOnOverlayClick = true,
}: ProductDetailsProps) {
  const { addItem } = useCart();
  const isModal = onClose != null;
  const isOpen = isModal && product != null;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  const handleAddToCart = useCallback(() => {
    if (product) addItem(product.id);
  }, [product, addItem]);

  if (!isModal && product == null) return null;

  const content = product ? (
    <ProductDetailsContent
      product={product}
      backHref={isModal ? undefined : backHref}
      backLabel={isModal ? "" : backLabel}
      formatPrice={formatPrice}
      onAddToCart={handleAddToCart}
    />
  ) : null;

  if (isModal) {
    return (
      <AnimatePresence>
        {product && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
            <motion.button
              type="button"
              aria-hidden
              tabIndex={-1}
              className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
              onClick={closeOnOverlayClick ? onClose : undefined}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="product-detail-title"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.2, ease: [0.21, 0.45, 0.27, 0.9] }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl flex flex-col"
            >
              <div className="flex-shrink-0 flex items-center justify-end p-2 sm:p-3 border-b border-gray-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto overscroll-contain">
                {content}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {content}
    </div>
  );
}
