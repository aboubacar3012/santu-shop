"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, User, Store, BadgeCheck, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { shopPosts, categories } from "@/app/home/data";
import type { CategoryId } from "@/app/home/data";

export default function BoutiquePage() {
  const params = useParams();
  const sellerSlug = typeof params.sellerSlug === "string" ? params.sellerSlug : "";
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | "all">("all");

  const { sellerName, allProducts, availableCategories } = useMemo(() => {
    const list = shopPosts.filter((p) => p.sellerSlug === sellerSlug);
    const name = list[0]?.sellerName ?? "Boutique";
    const sorted = [...list].sort((a, b) => b.likes - a.likes);
    
    // Trouver les catégories disponibles pour cette boutique
    const categoryIds = new Set(list.map((p) => p.categoryId));
    const availableCats = categories.filter((cat) => categoryIds.has(cat.id));
    
    return { sellerName: name, allProducts: sorted, availableCategories: availableCats };
  }, [sellerSlug]);

  // Filtrer les produits selon la catégorie sélectionnée
  const products = useMemo(() => {
    if (selectedCategory === "all") return allProducts;
    return allProducts.filter((p) => p.categoryId === selectedCategory);
  }, [allProducts, selectedCategory]);

  if (!sellerSlug || shopPosts.filter((p) => p.sellerSlug === sellerSlug).length === 0) {
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
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
            <Store className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-gray-900">
            Boutique introuvable
          </h2>
          <p className="text-gray-600 mb-6">
            Cette boutique n'existe pas ou n'a pas encore de produits.
          </p>
          <Link
            href="/home"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header style Stripe/Vercel */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="px-6 sm:px-8 lg:px-12 py-4 max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between gap-6">
            {/* Logo boutique */}
            <div className="flex items-center gap-3 flex-1">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
                <Store className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold text-gray-900">
                  {sellerName}
                </h1>
                <BadgeCheck className="w-5 h-5 text-blue-500" />
              </div>
            </div>

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
          className="mb-6 sm:mb-8 md:mb-12"
        >
          <Link
            href="/home"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4 sm:mb-5"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Retour</span>
          </Link>
          {/* Filtres par catégorie */}
          {availableCategories.length > 0 && (
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === "all"
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Tout
              </button>
              {availableCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Grille de produits */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3 md:gap-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.4, ease: [0.21, 0.45, 0.27, 0.9] }}
            >
              <Link
                href={`/shop/product/${product.id}`}
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
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="w-full py-1.5 sm:py-2 px-2 sm:px-3 bg-gray-900 text-white rounded-md sm:rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-1.5 sm:gap-2 group/btn"
                    >
                      <span>Voir la boutique</span>
                      <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Aucun produit trouvé</p>
          </div>
        )}
      </main>
    </div>
  );
}
