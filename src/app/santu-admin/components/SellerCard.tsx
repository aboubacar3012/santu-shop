"use client";

import { useState } from "react";
import Link from "next/link";
import { Store, ExternalLink, Edit2, Check, X } from "lucide-react";
import type { Seller } from "../types";
import { useSellers } from "../hooks/useSellers";

export interface SellerCardProps {
  seller: Seller;
  productCount: number;
  onSelect: (slug: string) => void;
  onDelete?: (id: string) => void;
}

function normalizeSlug(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function SellerCard({
  seller,
  productCount,
  onSelect,
  onDelete,
}: SellerCardProps) {
  const { updateSellerMutation, deleteSellerMutation } = useSellers();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(seller.name);
  const [editSlug, setEditSlug] = useState(seller.slug);

  const handleEdit = () => {
    setIsEditing(true);
    setEditName(seller.name);
    setEditSlug(seller.slug);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditName(seller.name);
    setEditSlug(seller.slug);
    updateSellerMutation.reset();
  };

  const handleSaveEdit = () => {
    const trimmedName = editName.trim();
    const trimmedSlug = editSlug.trim() || normalizeSlug(trimmedName);
    if (!trimmedName || !trimmedSlug) return;
    updateSellerMutation.mutate(
      { sellerId: seller.id, data: { name: trimmedName, slug: trimmedSlug } },
      { onSuccess: () => setIsEditing(false) }
    );
  };

  const handleDelete = () => {
    if (
      confirm(
        "Supprimer cette boutique ? Les produits associés ne seront plus liés."
      )
    ) {
      deleteSellerMutation.mutate(seller.id, {
        onSuccess: () => onDelete?.(seller.id),
      });
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 hover:border-gray-300 hover:shadow-md transition-all">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
          <Store className="w-6 h-6 text-gray-500" />
        </div>
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-2">
              {updateSellerMutation.error?.message && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700">
                  {updateSellerMutation.error.message}
                </div>
              )}
              <input
                type="text"
                value={editName}
                onChange={(e) => {
                  setEditName(e.target.value);
                  if (!editSlug || editSlug === normalizeSlug(seller.name)) {
                    setEditSlug(normalizeSlug(e.target.value));
                  }
                }}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Nom de la boutique"
                disabled={updateSellerMutation.isPending}
              />
              <input
                type="text"
                value={editSlug}
                onChange={(e) =>
                  setEditSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))
                }
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="slug"
                disabled={updateSellerMutation.isPending}
              />
              <p className="text-xs text-gray-500">/shop/{editSlug || "…"}</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  disabled={updateSellerMutation.isPending}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-medium hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Check className="w-3 h-3" />
                  {updateSellerMutation.isPending ? "Enregistrement…" : "Enregistrer"}
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={updateSellerMutation.isPending}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-medium hover:bg-gray-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <X className="w-3 h-3" />
                  Annuler
                </button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="font-semibold text-gray-900 truncate">
                {seller.name}
              </h3>
              <p className="text-sm text-gray-500 truncate">
                /shop/{seller.slug}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {productCount} produit{productCount !== 1 ? "s" : ""}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => onSelect(seller.slug)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-medium hover:bg-gray-800"
                >
                  Ouvrir
                </button>
                <Link
                  href={`/shop/${seller.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-gray-600 hover:text-gray-900"
                >
                  Voir la boutique
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <button
                  type="button"
                  onClick={handleEdit}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-medium hover:bg-gray-200"
                >
                  <Edit2 className="w-3 h-3" />
                  Modifier
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleteSellerMutation.isPending}
                  className="text-xs text-red-600 hover:text-red-700 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {deleteSellerMutation.isPending ? "Suppression…" : "Supprimer"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
