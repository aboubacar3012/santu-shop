"use client";

import Link from "next/link";
import { Plus, Store, ExternalLink } from "lucide-react";
import type { Seller } from "../types";

interface AdminShopsSectionProps {
  sellers: Seller[];
  productCountBySeller: Record<string, number>;
  onAddShop: () => void;
  onSelectShop: (slug: string) => void;
  onDeleteShop: (id: string) => void;
}

export function AdminShopsSection({
  sellers,
  productCountBySeller,
  onAddShop,
  onSelectShop,
  onDeleteShop,
}: AdminShopsSectionProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
          Boutiques
        </h2>
        <button
          onClick={onAddShop}
          className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 bg-gray-900 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-1.5 sm:gap-2"
        >
          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Ajouter une boutique</span>
          <span className="sm:hidden">Ajouter</span>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sellers.map((seller) => {
          const productCount = productCountBySeller[seller.slug] ?? 0;
          return (
            <div
              key={seller.id}
              className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 hover:border-gray-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Store className="w-6 h-6 text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
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
                      onClick={() => onSelectShop(seller.slug)}
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
                      onClick={() => onDeleteShop(seller.id)}
                      className="text-xs text-red-600 hover:text-red-700"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {sellers.length === 0 && (
        <div className="text-center py-20">
          <Store className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500 text-lg mb-4">Aucune boutique</p>
          <button
            onClick={onAddShop}
            className="px-6 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Ajouter votre première boutique
          </button>
        </div>
      )}
    </div>
  );
}
