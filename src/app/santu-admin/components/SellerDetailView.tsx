"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, Package, ShoppingCart, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type {
  Seller,
  Order,
  OrderStatus,
  Product,
  CreateProductInput,
} from "../types";
import { ProductFormModal } from "./ProductFormModal";
import { useProducts } from "../hooks/useProducts";

type Category = {
  id: string;
  label: string;
  slug: string;
  description?: string;
};

type CategoriesApiResponse = {
  categories: Category[];
};

async function fetchCategories(): Promise<CategoriesApiResponse> {
  const res = await fetch("/api/categories");
  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.error ?? "Erreur lors du chargement des catégories");
  }
  return res.json();
}

export interface SellerDetailViewProps {
  seller: Seller;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  onBackToSellers: () => void;
}

export function SellerDetailView({
  seller,
  orders,
  setOrders,
  onBackToSellers,
}: SellerDetailViewProps) {
  const [activeTab, setActiveTab] = useState<"products" | "orders">("products");
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string | "all">("all");
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const {
    products,
    isLoading: productsLoading,
    isError: productsError,
    error: productsErrorMessage,
    createProductMutation,
    updateProductMutation,
    deleteProductMutation,
    invalidateProducts,
  } = useProducts({ sellerId: seller.id });

  // Récupérer les catégories depuis l'API
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const categories = categoriesData?.categories ?? [];
  const productsOfSeller = products;

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return productsOfSeller;
    return productsOfSeller.filter((p) => p.categoryId === selectedCategory);
  }, [productsOfSeller, selectedCategory]);

  const ordersOfSeller = useMemo(() => {
    return orders.filter((o) => {
      const p = products.find((pr) => pr.id === o.productId);
      return p?.sellerSlug === seller.slug;
    });
  }, [orders, products, seller.slug]);

  const availableCategories = useMemo(() => {
    const categoryIds = new Set<string>(productsOfSeller.map((p) => p.categoryId));
    return categories.filter((cat) => categoryIds.has(cat.id));
  }, [productsOfSeller, categories]);

  const handleOpenProductModal = (product?: Product) => {
    setEditingProduct(product ?? null);
    setIsProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  const handleProductSubmit = (productData: CreateProductInput) => {
    if (editingProduct) {
      updateProductMutation.mutate(
        { productId: editingProduct.id, data: productData },
        {
          onSuccess: () => {
            handleCloseProductModal();
            updateProductMutation.reset();
          },
          onError: (err) => {
            alert(err.message || "Erreur lors de la mise à jour.");
          },
        }
      );
    } else {
      createProductMutation.mutate(productData, {
        onSuccess: () => {
          handleCloseProductModal();
          createProductMutation.reset();
        },
      });
    }
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ? Les images associées seront également supprimées.")) {
      deleteProductMutation.mutate(id, {
        onError: (err) => {
          alert(err.message || "Erreur lors de la suppression.");
        },
      });
    }
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div>
      <div>
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <button
            type="button"
            onClick={onBackToSellers}
            className="hover:text-gray-900 font-medium"
          >
            Boutiques
          </button>
          <span aria-hidden>/</span>
          <span className="text-gray-900 font-medium">{seller.name}</span>
        </nav>

        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium transition-colors border-b-2 -mb-px ${activeTab === "products"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
          >
            Produits
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium transition-colors border-b-2 -mb-px ${activeTab === "orders"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
          >
            Commandes
          </button>
        </div>

        {activeTab === "products" && (
          <div>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Mes produits</h2>
              <button
                onClick={() => handleOpenProductModal()}
                className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2.5 bg-gray-900 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-1.5 sm:gap-2"
              >
                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Ajouter un produit</span>
                <span className="sm:hidden">Ajouter</span>
              </button>
            </div>

            {productsLoading && (
              <div className="text-center py-12 text-gray-500">
                Chargement des produits…
              </div>
            )}

            {productsError && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-red-700 mb-6">
                {productsErrorMessage?.message ??
                  "Erreur lors du chargement des produits"}
              </div>
            )}

            {!productsLoading && !productsError && (
              <>

            {availableCategories.length > 0 && (
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 mb-6">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === "all"
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  Tout
                </button>
                {availableCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === cat.id
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3 md:gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all"
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
                      sizes="160px"
                      unoptimized={product.images[0].includes("pexels.com")}
                    />
                  </div>
                  <div className="p-2.5 sm:p-3 md:p-3.5">
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-1.5 line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-2 sm:mb-2.5 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="mb-2 sm:mb-2.5">
                      <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1">
                        {product.price.toLocaleString("fr-FR")} GNF
                      </p>
                      <div className="flex items-center gap-2 text-[10px] sm:text-xs">
                        <span className={`px-1.5 py-0.5 rounded ${product.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {product.available ? "Disponible" : "Indisponible"}
                        </span>
                        <span className="text-gray-500">Stock: {product.quantity}</span>
                      </div>
                    </div>
                    <div className="flex gap-1.5 sm:gap-2">
                      <button
                        onClick={() => handleOpenProductModal(product)}
                        className="flex-1 py-1.5 sm:py-2 px-2 sm:px-3 bg-gray-100 text-gray-700 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
                      >
                        <Edit2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span className="hidden sm:inline">Modifier</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(product.id)}
                        disabled={deleteProductMutation.isPending}
                        className="flex-1 py-1.5 sm:py-2 px-2 sm:px-3 bg-red-50 text-red-600 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span className="hidden sm:inline">
                          {deleteProductMutation.isPending && deleteProductMutation.variables === product.id
                            ? "Suppression…"
                            : "Supprimer"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 text-lg mb-4">
                  {selectedCategory === "all" ? "Aucun produit" : "Aucun produit dans cette catégorie"}
                </p>
                {selectedCategory === "all" && (
                  <button
                    onClick={() => handleOpenProductModal()}
                    className="px-6 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    Ajouter votre premier produit
                  </button>
                )}
              </div>
            )}
              </>
            )}
          </div>
        )}

        {activeTab === "orders" && (
          <>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Commandes</h2>
            <div className="space-y-4">
              {ordersOfSeller.map((order) => {
                const isExpanded = expandedOrders.has(order.id);
                return (
                  <div
                    key={order.id}
                    className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:border-gray-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between gap-3 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 sm:gap-3 mb-1.5">
                          <h3 className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                            {order.productTitle}
                          </h3>
                          <span className="text-[10px] sm:text-xs text-gray-400 whitespace-nowrap">
                            {order.orderDate.toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-gray-500">
                          <span>{order.quantity} × {order.productPrice.toLocaleString("fr-FR")} GNF</span>
                          <span className="text-gray-300">•</span>
                          <span className="font-semibold text-gray-900">
                            {(order.productPrice * order.quantity).toLocaleString("fr-FR")} GNF
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium border-2 transition-colors cursor-pointer ${order.status === "pending"
                              ? "bg-yellow-50 border-yellow-300 text-yellow-700 hover:bg-yellow-100"
                              : order.status === "confirmed"
                                ? "bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100"
                                : order.status === "shipped"
                                  ? "bg-purple-50 border-purple-300 text-purple-700 hover:bg-purple-100"
                                  : order.status === "delivered"
                                    ? "bg-green-50 border-green-300 text-green-700 hover:bg-green-100"
                                    : "bg-red-50 border-red-300 text-red-700 hover:bg-red-100"
                            }`}
                        >
                          <option value="pending">En attente</option>
                          <option value="confirmed">Confirmée</option>
                          <option value="shipped">Expédiée</option>
                          <option value="delivered">Livrée</option>
                          <option value="cancelled">Annulée</option>
                        </select>
                        <button
                          onClick={() => {
                            const newExpanded = new Set(expandedOrders);
                            if (isExpanded) newExpanded.delete(order.id);
                            else newExpanded.add(order.id);
                            setExpandedOrders(newExpanded);
                          }}
                          className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1"
                        >
                          <User className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span className="hidden sm:inline">{isExpanded ? "Masquer" : "Détails"}</span>
                        </button>
                      </div>
                    </div>
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-[10px] sm:text-xs">
                          <div>
                            <p className="text-gray-500 mb-0.5">Nom</p>
                            <p className="font-medium text-gray-900 truncate">{order.customerName}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-0.5">Email</p>
                            <p className="font-medium text-gray-900 truncate">{order.customerEmail}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-0.5">Téléphone</p>
                            <p className="font-medium text-gray-900">{order.customerPhone}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-0.5">Adresse</p>
                            <p className="font-medium text-gray-900 truncate">{order.customerAddress}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {ordersOfSeller.length === 0 && (
              <div className="text-center py-20">
                <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 text-lg">Aucune commande pour cette boutique</p>
              </div>
            )}
          </>
        )}
      </div>

      <ProductFormModal
        isOpen={isProductModalOpen}
        editingProduct={editingProduct}
        seller={seller}
        onClose={handleCloseProductModal}
        onSubmit={handleProductSubmit}
        isLoading={
          createProductMutation.isPending || updateProductMutation.isPending
        }
        error={
          createProductMutation.error?.message ||
          updateProductMutation.error?.message
        }
      />
    </div>
  );
}
