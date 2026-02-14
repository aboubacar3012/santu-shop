"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { AppHeader } from "@/components/AppHeader";
import { ProductCard } from "@/components/ProductCard";
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
      <AppHeader />

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
                        <ProductCard product={product} />
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
