"use client";

import { motion } from "framer-motion";
import { ShoppingBag, User, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { categories, shopPosts } from "./data";
import type { CategoryId } from "./data";


export default function HomePage() {

  // Grouper les produits par catégorie
  const productsByCategory = useMemo(() => {
    const grouped: Record<CategoryId, typeof shopPosts> = {
      vetements: [],
      chaussures: [],
      electronique: [],
      maisons: [],
      autres: [],
    };

    shopPosts.forEach((product) => {
      if (grouped[product.categoryId]) {
        grouped[product.categoryId].push(product);
      }
    });

    return grouped;
  }, []);

  // Afficher toutes les catégories qui ont des produits
  const displayedCategories = categories.filter(
    (cat) => productsByCategory[cat.id].length > 0
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header minimaliste style Stripe/Vercel */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="px-6 sm:px-8 lg:px-12 py-4 max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <Link href="/home" className="flex items-center gap-2 shrink-0 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center font-bold text-sm text-white group-hover:from-gray-800 group-hover:to-gray-600 transition-all">
                S
              </div>
              <span className="text-lg font-semibold text-gray-900 tracking-tight">Santu</span>
            </Link>

            {/* Actions */}
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

      {/* Main content avec sections horizontales scrollables */}
      <main className="px-6 sm:px-8 lg:px-12 py-8 sm:py-12 max-w-[1600px] mx-auto">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8 md:mb-12"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 tracking-tight">
            Découvrez nos produits
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl">
            Une sélection soignée de produits de qualité pour répondre à tous vos besoins.
          </p>
        </motion.div>

        {/* Sections horizontales scrollables par catégorie */}
        <div className="space-y-6 sm:space-y-8 md:space-y-12">
          {displayedCategories.map((category, sectionIndex) => {
            const products = productsByCategory[category.id];
            if (products.length === 0) return null;

            return (
              <motion.section
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1 }}
                className="w-full"
              >
                {/* Titre de la section */}
                <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                    {category.label}
                  </h2>
                  <Link
                    href={`/home/all?category=${category.id}`}
                    className="text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1 transition-colors"
                  >
                    Voir tout
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Link>
                </div>

                {/* Scroll horizontal */}
                <div className="overflow-x-auto no-scrollbar pb-3 sm:pb-4">
                  <div className="flex gap-2.5 sm:gap-3 md:gap-4" style={{ width: "max-content" }}>
                    {productsByCategory[category.id].map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: sectionIndex * 0.1 + index * 0.05 }}
                        className="flex-shrink-0 w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px]"
                      >
                        <Link
                          href={`/shop/${product.sellerSlug}`}
                          className="group block h-full"
                        >
                          <div className="h-full bg-white border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all duration-300">
                            {/* Image */}
                            <div className="relative aspect-square overflow-hidden bg-gray-50">
                              <div className={`absolute inset-0 bg-gradient-to-br ${product.imageGradient} opacity-90 group-hover:opacity-100 transition-opacity duration-300`} />
                            </div>

                            {/* Content */}
                            <div className="p-2.5 sm:p-3 md:p-3.5">
                              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-1.5 line-clamp-2 group-hover:text-gray-700 transition-colors">
                                {product.title}
                              </h3>
                              
                              <p className="text-[10px] sm:text-xs text-gray-500 mb-2 sm:mb-2.5 line-clamp-2">
                                {product.description}
                              </p>

                              {/* Prix et vendeur */}
                              <div className="flex items-center justify-between mb-2 sm:mb-2.5">
                                <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
                                  {product.price.toLocaleString("fr-FR")} GNF
                                </p>
                                <p className="text-[10px] sm:text-xs text-gray-400">
                                  {product.sellerName}
                                </p>
                              </div>

                              {/* Bouton style Stripe */}
                              <Link
                                href={`/shop/${product.sellerSlug}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                className="w-full py-1.5 sm:py-2 px-2 sm:px-3 bg-gray-900 text-white rounded-md sm:rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-1.5 sm:gap-2 group/btn"
                              >
                                <span>Voir la boutique</span>
                                <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                              </Link>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.section>
            );
          })}
        </div>

        {displayedCategories.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Aucun produit trouvé</p>
          </div>
        )}
      </main>
    </div>
  );
}
