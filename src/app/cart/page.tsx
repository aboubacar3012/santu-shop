"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ShoppingBag, Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { shopPosts } from "@/app/home/data";
import { OrderFormModal } from "@/components/OrderFormModal";
import type { OrderInfoData } from "@/app/cart/OrderInfoForm";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderSubmitting, setOrderSubmitting] = useState(false);

  const handleOrderSubmit = async (data: OrderInfoData) => {
    setOrderSubmitting(true);
    try {
      // TODO: envoyer la commande à l'API avec data + items
      await new Promise((r) => setTimeout(r, 800));
      clearCart();
      setOrderModalOpen(false);
    } finally {
      setOrderSubmitting(false);
    }
  };

  const lines = useMemo(() => {
    return items
      .map((item) => {
        const product = shopPosts.find((p) => p.id === item.productId);
        if (!product) return null;
        return { product, quantity: item.quantity };
      })
      .filter((line): line is { product: (typeof shopPosts)[0]; quantity: number } => line !== null);
  }, [items]);

  const total = useMemo(
    () => lines.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0),
    [lines]
  );

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="px-6 sm:px-8 lg:px-12 py-4 max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between gap-6">
            <Link
              href="/home"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-lg font-semibold text-gray-900">Panier</h1>
            </div>
            <div className="w-16" aria-hidden />
          </div>
        </div>
      </header>

      <main className="px-6 sm:px-8 lg:px-12 py-8 sm:py-12 max-w-[1600px] mx-auto">
        {lines.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-24 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-6">
              <ShoppingBag className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Votre panier est vide
            </h2>
            <p className="text-gray-500 max-w-sm">
              Ajoutez des articles depuis les boutiques pour les retrouver ici.
            </p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 pb-44 lg:pb-0">
            <div className="flex-1">
              <ul className="space-y-4">
                {lines.map(({ product, quantity }) => (
                  <li
                    key={product.id}
                    className="flex gap-4 p-4 rounded-xl border border-gray-200 bg-white hover:border-gray-300 transition-colors"
                  >
                    <Link
                      href={`/shop/${product.sellerSlug}`}
                      className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100"
                    >
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        className="object-cover"
                        sizes="96px"
                        unoptimized={product.images[0].includes("pexels.com")}
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/shop/${product.sellerSlug}`}
                        className="font-medium text-gray-900 hover:text-gray-700 line-clamp-2"
                      >
                        {product.title}
                      </Link>
                      <p className="text-xs text-gray-500 mt-0.5">{product.sellerName}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="p-1.5 rounded-md hover:bg-gray-200 transition-colors"
                            aria-label="Diminuer la quantité"
                          >
                            <Minus className="w-3.5 h-3.5 text-gray-600" />
                          </button>
                          <span className="min-w-[2ch] text-center text-sm font-medium">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="p-1.5 rounded-md hover:bg-gray-200 transition-colors"
                            aria-label="Augmenter la quantité"
                          >
                            <Plus className="w-3.5 h-3.5 text-gray-600" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(product.id)}
                          className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Supprimer
                        </button>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-gray-900">
                        {(product.price * quantity).toLocaleString("fr-FR")} GNF
                      </p>
                      <p className="text-xs text-gray-500">
                        {product.price.toLocaleString("fr-FR")} GNF / unité
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="fixed bottom-0 left-0 right-0 z-40 lg:relative lg:z-auto lg:w-80 flex-shrink-0">
              <div className="sticky top-24 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-6 lg:p-6 border-t lg:border border-gray-200 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] lg:shadow-none lg:rounded-xl lg:bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Récapitulatif</h2>
                <div className="flex justify-between text-gray-600 mb-2">
                  <span>Sous-total</span>
                  <span>{total.toLocaleString("fr-FR")} GNF</span>
                </div>
                <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-gray-900">
                    {total.toLocaleString("fr-FR")} GNF
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setOrderModalOpen(true)}
                  className="mt-6 w-full py-3 px-4 rounded-lg border-2 border-gray-900 text-gray-900 font-medium hover:bg-gray-900 hover:text-white transition-colors"
                >
                  Passer la commande
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <OrderFormModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        onSubmit={handleOrderSubmit}
        isLoading={orderSubmitting}
      />
    </div>
  );
}
