"use client";

import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Seller, SellerFormData } from "../types";

/** Clé de query pour la liste des boutiques (sellers) */
export const SHOPS_QUERY_KEY = ["shops"] as const;

type SellerApi = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  productCount: number;
};

type ShopsApiResponse = {
  sellers: SellerApi[];
};

async function fetchShops(): Promise<ShopsApiResponse> {
  const res = await fetch("/api/shops", { credentials: "include" });
  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.error ?? "Erreur lors du chargement des boutiques");
  }
  return res.json();
}

async function createSeller(data: SellerFormData): Promise<{
  seller: { id: string; name: string; slug: string };
}> {
  const res = await fetch("/api/shops/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ name: data.name, slug: data.slug }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.error ?? "Erreur lors de la création de la boutique");
  }
  return json;
}

async function updateSeller(
  sellerId: string,
  data: { name: string; slug: string }
): Promise<{ seller: { id: string; name: string; slug: string } }> {
  const res = await fetch("/api/shops/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ id: sellerId, name: data.name, slug: data.slug }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.error ?? "Erreur lors de la mise à jour de la boutique");
  }
  return json;
}

async function deleteSeller(sellerId: string): Promise<unknown> {
  const res = await fetch("/api/shops/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ id: sellerId }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.error ?? "Erreur lors de la suppression de la boutique");
  }
  return json;
}

export interface UseSellersOptions {
  /** Désactiver la requête */
  enabled?: boolean;
}

export function useSellers(options: UseSellersOptions = {}) {
  const { enabled = true } = options;
  const queryClient = useQueryClient();

  const shopsQuery = useQuery({
    queryKey: SHOPS_QUERY_KEY,
    queryFn: fetchShops,
    enabled,
  });

  const createSellerMutation = useMutation({
    mutationFn: createSeller,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SHOPS_QUERY_KEY });
    },
  });

  const updateSellerMutation = useMutation({
    mutationFn: ({
      sellerId,
      data,
    }: {
      sellerId: string;
      data: { name: string; slug: string };
    }) => updateSeller(sellerId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SHOPS_QUERY_KEY });
    },
  });

  const deleteSellerMutation = useMutation({
    mutationFn: (sellerId: string) => deleteSeller(sellerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SHOPS_QUERY_KEY });
    },
  });

  const sellers: Seller[] = useMemo(() => {
    if (!shopsQuery.data?.sellers) return [];
    return shopsQuery.data.sellers.map((s) => ({
      id: s.id,
      name: s.name,
      slug: s.slug,
    }));
  }, [shopsQuery.data]);

  const productCountBySeller = useMemo(() => {
    if (!shopsQuery.data?.sellers) return {} as Record<string, number>;
    const count: Record<string, number> = {};
    shopsQuery.data.sellers.forEach((s) => {
      count[s.slug] = s.productCount;
    });
    return count;
  }, [shopsQuery.data]);

  const invalidateSellers = () => {
    queryClient.invalidateQueries({ queryKey: SHOPS_QUERY_KEY });
  };

  return {
    sellers,
    productCountBySeller,
    isLoading: shopsQuery.isLoading,
    isError: shopsQuery.isError,
    error: shopsQuery.error,
    createSellerMutation,
    updateSellerMutation,
    deleteSellerMutation,
    invalidateSellers,
    refetch: shopsQuery.refetch,
  };
}
