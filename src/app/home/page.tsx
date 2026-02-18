"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { AppHeader } from "@/components/AppHeader";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/app/santu-admin/hooks/useProducts";

type CategoryFromApi = {
  id: string;
  label: string;
  slug: string;
  description?: string;
};

type CategoriesApiResponse = {
  categories: CategoryFromApi[];
};

async function fetchCategories(): Promise<CategoriesApiResponse> {
  const res = await fetch("/api/categories");
  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.error ?? "Erreur lors du chargement des catégories");
  }
  return res.json();
}

export default function HomePage() {
  const { products, isLoading: productsLoading, isError: productsError } = useProducts({});
  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const categories = categoriesData?.categories ?? [];

  // Grouper les produits par catégorie
  const productsByCategory = useMemo(() => {
    const grouped: Record<string, typeof products> = {};
    products.forEach((product) => {
      const id = product.categoryId;
      if (!grouped[id]) grouped[id] = [];
      grouped[id].push(product);
    });
    return grouped;
  }, [products]);

  // Afficher les catégories qui ont au moins un produit (ordre API)
  const displayedCategories = useMemo(
    () => categories.filter((cat) => (productsByCategory[cat.id]?.length ?? 0) > 0),
    [categories, productsByCategory]
  );

  const isLoading = productsLoading || categoriesLoading;

  return (
    <div className="min-h-screen bg-white">
      <AppHeader />

      <main className="px-6 sm:px-8 lg:px-12 py-8 sm:py-12 max-w-[1600px] mx-auto">
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

        {isLoading && (
          <div className="text-center py-12 text-gray-500">
            Chargement des produits…
          </div>
        )}

        {productsError && (
          <div className="text-center py-12 text-red-600">
            Erreur lors du chargement des produits.
          </div>
        )}

        {!isLoading && !productsError && (
          <div className="space-y-6 sm:space-y-8 md:space-y-12">
            {displayedCategories.map((category, sectionIndex) => {
              const categoryProducts = productsByCategory[category.id] ?? [];
              if (categoryProducts.length === 0) return null;

              return (
                <motion.section
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: sectionIndex * 0.1 }}
                  className="w-full"
                >
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

                  <div className="overflow-x-auto no-scrollbar pb-3 sm:pb-4">
                    <div className="flex gap-2.5 sm:gap-3 md:gap-4" style={{ width: "max-content" }}>
                      {categoryProducts.map((product, index) => (
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
        )}

        {!isLoading && !productsError && displayedCategories.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Aucun produit trouvé</p>
          </div>
        )}
      </main>
    </div>
  );
}
