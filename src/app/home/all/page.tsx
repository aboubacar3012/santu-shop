"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, User, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { categories, shopPosts } from "../data";
import type { CategoryId } from "../data";

const EUR_TO_GNF = 8_500;

function formatGnf(eur: number): string {
  const gnf = Math.round(eur * EUR_TO_GNF);
  return `${gnf.toLocaleString("fr-FR")} GNF`;
}

export default function AllProductsPage() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category") as CategoryId | null;

  const category = useMemo(() => {
    if (!categoryId) return null;
    return categories.find((c) => c.id === categoryId);
  }, [categoryId]);

  const products = useMemo(() => {
    if (!categoryId) return [];
    return shopPosts.filter((p) => p.categoryId === categoryId);
  }, [categoryId]);

  if (!categoryId || !category || products.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
          <div className="px-6 sm:px-8 lg:px-12 py-4 max-w-[1600px] mx-auto">
            <Link
              href="/home"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour</span>
            </Link>
          </div>
        </header>
        <main className="px-6 sm:px-8 lg:px-12 py-12 max-w-[1600px] mx-auto text-center">
          <p className="text-gray-500 text-lg">Catégorie introuvable ou aucun produit disponible.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="px-6 sm:px-8 lg:px-12 py-4 max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between gap-6">
            <Link
              href="/home"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour</span>
            </Link>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/shop?tab=cart"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
              >
                <ShoppingBag className="w-5 h-5 text-gray-600" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-gray-900 rounded-full" />
              </Link>
              <Link
                href="/account"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block"
              >
                <User className="w-5 h-5 text-gray-600" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="px-6 sm:px-8 lg:px-12 py-8 sm:py-12 max-w-[1600px] mx-auto">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 tracking-tight">
            {category.label}
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            {products.length} produit{products.length > 1 ? "s" : ""} disponible{products.length > 1 ? "s" : ""}
          </p>
        </motion.div>

        {/* Grille de produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.4, ease: [0.21, 0.45, 0.27, 0.9] }}
            >
              <Link
                href={`/shop/${product.sellerSlug}`}
                className="group block h-full"
              >
                <div className="h-full bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all duration-300">
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <div className={`absolute inset-0 bg-gradient-to-br ${product.imageGradient} opacity-90 group-hover:opacity-100 transition-opacity duration-300`} />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1.5 line-clamp-2 group-hover:text-gray-700 transition-colors">
                      {product.title}
                    </h3>
                    
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Prix et vendeur */}
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-lg font-bold text-gray-900">
                        {formatGnf(product.price)}
                      </p>
                      <p className="text-xs text-gray-400">
                        {product.sellerName}
                      </p>
                    </div>

                    {/* Bouton style Stripe */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="w-full py-2 px-3 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 group/btn"
                    >
                      <span>Voir la boutique</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
