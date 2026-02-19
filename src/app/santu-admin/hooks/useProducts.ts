"use client";

import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product, CreateProductInput } from "../types";

/** Clé de query pour les produits (tous, par sellerId ou par sellerSlug) */
export const PRODUCTS_QUERY_KEY = (opts: {
  sellerId?: string;
  sellerSlug?: string;
}) => {
  if (opts.sellerId) return ["products", "id", opts.sellerId] as const;
  if (opts.sellerSlug) return ["products", "slug", opts.sellerSlug] as const;
  return ["products", "all"] as const;
};

type ProductApi = {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  images: string[];
  price: number;
  originalPrice?: number;
  available: boolean;
  quantity: number;
  likes: number;
  comments: number;
  sellerName: string;
  sellerSlug: string;
  createdAt: string;
};

type ProductsApiResponse = {
  products: ProductApi[];
};

async function fetchProducts(opts: {
  sellerId?: string;
  sellerSlug?: string;
}): Promise<ProductsApiResponse> {
  let url = "/api/products";
  if (opts.sellerId) {
    url += `?sellerId=${encodeURIComponent(opts.sellerId)}`;
  } else if (opts.sellerSlug) {
    url += `?sellerSlug=${encodeURIComponent(opts.sellerSlug)}`;
  }
  const res = await fetch(url);
  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.error ?? "Erreur lors du chargement des produits");
  }
  return res.json();
}

function mapApiProductToProduct(p: ProductApi): Product {
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    categoryId: p.categoryId,
    images: p.images,
    sellerName: p.sellerName,
    sellerSlug: p.sellerSlug,
    price: p.price,
    originalPrice: p.originalPrice,
    available: p.available,
    quantity: p.quantity,
    createdAt: p.createdAt,
  };
}

type CreateProductApiResponse = {
  product: ProductApi;
};

async function createProduct(
  sellerId: string,
  data: CreateProductInput
): Promise<CreateProductApiResponse> {
  const res = await fetch("/api/products/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      sellerId,
      title: data.title,
      description: data.description,
      categoryId: data.categoryId,
      images: data.images,
      price: data.price,
      originalPrice: data.originalPrice,
      available: data.available,
      quantity: data.quantity,
    }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.error ?? "Erreur lors de la création du produit");
  }
  return json as CreateProductApiResponse;
}

async function updateProduct(
  productId: string,
  data: CreateProductInput
): Promise<CreateProductApiResponse> {
  const res = await fetch(`/api/products/${encodeURIComponent(productId)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      title: data.title,
      description: data.description,
      categoryId: data.categoryId,
      images: data.images,
      price: data.price,
      originalPrice: data.originalPrice,
      available: data.available,
      quantity: data.quantity,
    }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.error ?? "Erreur lors de la mise à jour du produit");
  }
  return json as CreateProductApiResponse;
}

async function deleteProduct(productId: string): Promise<void> {
  const res = await fetch(`/api/products/${encodeURIComponent(productId)}`, {
    method: "DELETE",
    credentials: "include",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.error ?? "Erreur lors de la suppression du produit");
  }
}

export interface UseProductsOptions {
  /** ID du seller pour filtrer les produits */
  sellerId?: string;
  /** Slug du seller pour filtrer les produits (ex: page boutique) */
  sellerSlug?: string;
  /** Désactiver la requête */
  enabled?: boolean;
}

export function useProducts({
  sellerId,
  sellerSlug,
  enabled = true,
}: UseProductsOptions = {}) {
  const queryClient = useQueryClient();
  const queryKey = PRODUCTS_QUERY_KEY({ sellerId, sellerSlug });

  const productsQuery = useQuery({
    queryKey,
    queryFn: () => fetchProducts({ sellerId, sellerSlug }),
    enabled,
  });

  const createProductMutation = useMutation({
    mutationFn: (data: CreateProductInput) =>
      createProduct(sellerId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ productId, data }: { productId: string; data: CreateProductInput }) =>
      updateProduct(productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const products: Product[] = useMemo(() => {
    if (!productsQuery.data?.products) return [];
    return productsQuery.data.products.map(mapApiProductToProduct);
  }, [productsQuery.data]);

  const invalidateProducts = () => {
    queryClient.invalidateQueries({ queryKey });
  };

  return {
    products,
    isLoading: productsQuery.isLoading,
    isError: productsQuery.isError,
    error: productsQuery.error,
    createProductMutation,
    updateProductMutation,
    deleteProductMutation,
    invalidateProducts,
    refetch: productsQuery.refetch,
  };
}
