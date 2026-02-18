"use client";

import { useState } from "react";
import { Plus, Store, X } from "lucide-react";
import { useSellers } from "../hooks/useSellers";
import { SellerCard } from "./SellerCard";

function slugFromName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export interface SellerSectionProps {
  selectedSellerSlug: string | null;
  onSelectSeller: (slug: string | null) => void;
}

export function SellerSection({
  selectedSellerSlug,
  onSelectSeller,
}: SellerSectionProps) {
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);
  const [modalName, setModalName] = useState("");
  const [modalSlug, setModalSlug] = useState("");

  const {
    sellers,
    productCountBySeller,
    isLoading: sellersLoading,
    isError: sellersError,
    error: sellersErrorMessage,
    createSellerMutation,
  } = useSellers();

  const handleDeleteSeller = (id: string) => {
    const slug = sellers.find((s) => s.id === id)?.slug;
    if (slug === selectedSellerSlug) onSelectSeller(null);
  };

  const handleOpenAddModal = () => {
    createSellerMutation.reset();
    setModalName("");
    setModalSlug("");
    setIsSellerModalOpen(true);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (createSellerMutation.isPending) return;
    const trimmedName = modalName.trim();
    const trimmedSlug = modalSlug.trim() || slugFromName(trimmedName);
    if (!trimmedName || !trimmedSlug) return;
    createSellerMutation.mutate(
      { name: trimmedName, slug: trimmedSlug },
      {
        onSuccess: (result) => {
          setIsSellerModalOpen(false);
          setModalName("");
          setModalSlug("");
          onSelectSeller(result.seller.slug);
        },
      }
    );
  };

  return (
    <>
      {sellersLoading && (
        <div className="text-center py-12 text-gray-500">
          Chargement des boutiques…
        </div>
      )}
      {sellersError && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-red-700 mb-6">
          {sellersErrorMessage?.message ??
            "Erreur lors du chargement des boutiques"}
        </div>
      )}
      {!sellersLoading && !sellersError && (
        <div>
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              Boutiques
            </h2>
            <button
              onClick={handleOpenAddModal}
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
                <SellerCard
                  key={seller.id}
                  seller={seller}
                  productCount={productCount}
                  onSelect={onSelectSeller}
                  onDelete={handleDeleteSeller}
                />
              );
            })}
          </div>
          {sellers.length === 0 && (
            <div className="text-center py-20">
              <Store className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 text-lg mb-4">Aucune boutique</p>
              <button
                onClick={handleOpenAddModal}
                className="px-6 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Ajouter votre première boutique
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modal Ajouter une boutique */}
      {isSellerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Ajouter une boutique</h2>
              <button
                type="button"
                onClick={() => {
                  createSellerMutation.reset();
                  setIsSellerModalOpen(false);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <form
              onSubmit={handleModalSubmit}
              className="p-6 space-y-4"
            >
              {createSellerMutation.error?.message && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                  {createSellerMutation.error.message}
                </div>
              )}
              <div>
                <label htmlFor="admin-seller-name" className="block text-sm font-medium text-gray-900 mb-2">
                  Nom de la boutique
                </label>
                <input
                  id="admin-seller-name"
                  type="text"
                  required
                  value={modalName}
                  onChange={(e) => {
                    setModalName(e.target.value);
                    setModalSlug((prev) => (prev ? prev : slugFromName(e.target.value)));
                  }}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Ex: Ma Boutique"
                />
              </div>
              <div>
                <label htmlFor="admin-seller-slug" className="block text-sm font-medium text-gray-900 mb-2">
                  Slug (URL)
                </label>
                <input
                  id="admin-seller-slug"
                  type="text"
                  value={modalSlug}
                  onChange={(e) => setModalSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="ma-boutique"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Lien : /shop/{modalSlug || "…"}
                </p>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    createSellerMutation.reset();
                    setIsSellerModalOpen(false);
                  }}
                  className="flex-1 py-2.5 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={createSellerMutation.isPending}
                  className="flex-1 py-2.5 px-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {createSellerMutation.isPending ? "Création…" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
