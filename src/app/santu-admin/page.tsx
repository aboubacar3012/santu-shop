"use client";

import { useState, useMemo } from "react";
import { Store } from "lucide-react";
import type { Order } from "./types";
import { useSellers } from "./hooks/useSellers";
import { SellerSection } from "./components/SellerSection";
import { SellerDetailView } from "./components/SellerDetailView";



export default function AdminPage() {
  const [selectedSellerSlug, setSelectedSellerSlug] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  const { sellers } = useSellers();

  const selectedSeller = useMemo(
    () => sellers.find((s) => s.slug === selectedSellerSlug) ?? null,
    [sellers, selectedSellerSlug]
  );

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="px-6 sm:px-8 lg:px-12 py-4 max-w-[1600px] mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
                <Store className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Administration
                </h1>
                {selectedSeller ? (
                  <p className="text-sm text-gray-500">
                    Boutique :{" "}
                    <span className="font-medium text-gray-700">
                      {selectedSeller.name}
                    </span>
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">
                    Sélectionnez une boutique pour gérer produits et commandes
                  </p>
                )}
              </div>
            </div>
            {selectedSeller && (
              <button
                type="button"
                onClick={() => setSelectedSellerSlug(null)}
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Changer de boutique
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="px-6 sm:px-8 lg:px-12 py-8 sm:py-12 max-w-[1600px] mx-auto">
        {!selectedSellerSlug ? (
          <SellerSection
            selectedSellerSlug={selectedSellerSlug}
            onSelectSeller={setSelectedSellerSlug}
          />
        ) : selectedSeller ? (
          <SellerDetailView
            seller={selectedSeller}
            orders={orders}
            setOrders={setOrders}
            onBackToSellers={() => setSelectedSellerSlug(null)}
          />
        ) : null}
      </main>
    </div>
  );
}
