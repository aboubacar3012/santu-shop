"use client";

import { motion } from "framer-motion";
import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { AppHeader } from "@/components/AppHeader";
import { ProductCard } from "@/components/ProductCard";
import { categories, shopPosts } from "../data";
import type { CategoryId } from "../data";

const EUR_TO_GNF = 8_500;

function formatGnf(eur: number): string {
  const gnf = Math.round(eur * EUR_TO_GNF);
  return `${gnf.toLocaleString("fr-FR")} GNF`;
}

function AllProductsContent() {
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
        <AppHeader backLink={{ href: "/home", label: "Retour" }} />
        <main className="px-6 sm:px-8 lg:px-12 py-12 max-w-[1600px] mx-auto text-center">
          <p className="text-gray-500 text-lg">Catégorie introuvable ou aucun produit disponible.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <AppHeader backLink={{ href: "/home", label: "Retour" }} title={category.label} />

      {/* Main content */}
      <main className="px-6 sm:px-8 lg:px-12 py-8 sm:py-12 max-w-[1600px] mx-auto">

        {/* Grille de produits (2 colonnes sur mobile comme /home) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-5">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.4, ease: [0.21, 0.45, 0.27, 0.9] }}
            >
              <ProductCard product={product} formatPrice={formatGnf} />
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}

function AllProductsFallback() {
  return (
    <div className="min-h-screen bg-white">
      <AppHeader backLink={{ href: "/home", label: "Retour" }} />
      <main className="px-6 sm:px-8 lg:px-12 py-12 max-w-[1600px] mx-auto">
        <div className="h-8 w-48 bg-gray-100 rounded animate-pulse mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-gray-100 rounded-xl animate-pulse" style={{ animationDelay: `${i * 50}ms` }} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default function AllProductsPage() {
  return (
    <Suspense fallback={<AllProductsFallback />}>
      <AllProductsContent />
    </Suspense>
  );
}
