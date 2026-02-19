"use client";

import { motion } from "framer-motion";
import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
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

const formatPrice = (price: number) =>
  `${price.toLocaleString("fr-FR")} GNF`;

function AllProductsContent() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");

  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  const { products, isLoading: productsLoading, isError: productsError } =
    useProducts({});

  const categories = categoriesData?.categories ?? [];

  const category = useMemo(() => {
    if (!categoryId) return null;
    return categories.find((c) => c.id === categoryId) ?? null;
  }, [categoryId, categories]);

  const productsInCategory = useMemo(() => {
    if (!categoryId) return [];
    return products.filter((p) => p.categoryId === categoryId);
  }, [categoryId, products]);

  const isLoading = categoriesLoading || productsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <AppHeader backLink={{ href: "/", label: "Retour" }} />
        <main className="px-6 sm:px-8 lg:px-12 py-12 max-w-[1600px] mx-auto">
          <div className="h-8 w-48 bg-gray-100 rounded animate-pulse mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] bg-gray-100 rounded-xl animate-pulse"
                style={{ animationDelay: `${i * 50}ms` }}
              />
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="min-h-screen bg-white">
        <AppHeader backLink={{ href: "/", label: "Retour" }} />
        <main className="px-6 sm:px-8 lg:px-12 py-12 max-w-[1600px] mx-auto text-center">
          <p className="text-red-600">Erreur lors du chargement des produits.</p>
        </main>
      </div>
    );
  }

  if (!categoryId || !category || productsInCategory.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <AppHeader backLink={{ href: "/", label: "Retour" }} />
        <main className="px-6 sm:px-8 lg:px-12 py-12 max-w-[1600px] mx-auto text-center">
          <p className="text-gray-500 text-lg">
            Catégorie introuvable ou aucun produit disponible.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <AppHeader
        backLink={{ href: "/", label: "Retour" }}
        title={category.label}
      />

      <main className="px-6 sm:px-8 lg:px-12 py-8 sm:py-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-5">
          {productsInCategory.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.03,
                duration: 0.4,
                ease: [0.21, 0.45, 0.27, 0.9],
              }}
            >
              <ProductCard product={product} formatPrice={formatPrice} />
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
      <AppHeader backLink={{ href: "/", label: "Retour" }} />
      <main className="px-6 sm:px-8 lg:px-12 py-12 max-w-[1600px] mx-auto">
        <div className="h-8 w-48 bg-gray-100 rounded animate-pulse mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[3/4] bg-gray-100 rounded-xl animate-pulse"
              style={{ animationDelay: `${i * 50}ms` }}
            />
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
