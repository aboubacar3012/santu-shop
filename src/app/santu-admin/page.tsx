"use client";

import { useState, useMemo } from "react";
import { Plus, Store, X } from "lucide-react";
import { shopPosts, categories, type ShopPost, type CategoryId } from "@/app/home/data";
import type { Seller, Order, OrderStatus } from "./types";
import { AdminShopsSection } from "./components/AdminShopsSection";
import { AdminShopDetailSection } from "./components/AdminShopDetailSection";

const DEFAULT_IMAGE_URL = "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800";

// Extraire les boutiques uniques des données existantes pour l'état initial
const initialSellers: Seller[] = (() => {
  const seen = new Map<string, { name: string; slug: string }>();
  shopPosts.forEach((p) => {
    if (!seen.has(p.sellerSlug)) seen.set(p.sellerSlug, { name: p.sellerName, slug: p.sellerSlug });
  });
  return Array.from(seen.entries()).map(([slug, { name }], i) => ({
    id: `seller-${i + 1}`,
    name,
    slug,
  }));
})();

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"products" | "orders">("products");
  const [selectedSellerSlug, setSelectedSellerSlug] = useState<string | null>(null);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [sellers, setSellers] = useState<Seller[]>(initialSellers);
  const [products, setProducts] = useState<ShopPost[]>(() => shopPosts);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ord1",
      productId: "p1",
      productTitle: "Sneakers running",
      productPrice: 79.99,
      quantity: 2,
      customerName: "Mamadou Diallo",
      customerEmail: "mamadou@example.com",
      customerPhone: "+224 612 34 56 78",
      customerAddress: "Conakry, Guinée",
      orderDate: new Date("2024-01-15"),
      status: "pending",
    },
    {
      id: "ord2",
      productId: "p2",
      productTitle: "Sweat oversize premium",
      productPrice: 34.99,
      quantity: 1,
      customerName: "Fatou Camara",
      customerEmail: "fatou@example.com",
      customerPhone: "+224 623 45 67 89",
      customerAddress: "Kindia, Guinée",
      orderDate: new Date("2024-01-14"),
      status: "confirmed",
    },
    {
      id: "ord3",
      productId: "p3",
      productTitle: "Écouteurs sans fil",
      productPrice: 49.99,
      quantity: 1,
      customerName: "Ibrahima Bah",
      customerEmail: "ibrahima@example.com",
      customerPhone: "+224 634 56 78 90",
      customerAddress: "Kankan, Guinée",
      orderDate: new Date("2024-01-13"),
      status: "shipped",
    },
  ]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | "all">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ShopPost | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "vetements" as CategoryId,
    price: "",
    imageUrl: DEFAULT_IMAGE_URL,
    imageUrl2: "",
    available: true,
    quantity: "",
  });
  const [isShopModalOpen, setIsShopModalOpen] = useState(false);
  const [shopFormData, setShopFormData] = useState({ name: "", slug: "" });

  // Produits de la boutique sélectionnée
  const productsOfSelectedShop = useMemo(() => {
    if (!selectedSellerSlug) return [];
    return products.filter((p) => p.sellerSlug === selectedSellerSlug);
  }, [products, selectedSellerSlug]);

  // Filtrer les produits par catégorie (parmi ceux de la boutique)
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return productsOfSelectedShop;
    return productsOfSelectedShop.filter((p) => p.categoryId === selectedCategory);
  }, [productsOfSelectedShop, selectedCategory]);

  // Commandes de la boutique sélectionnée (les produits de la commande appartiennent à cette boutique)
  const ordersOfSelectedShop = useMemo(() => {
    if (!selectedSellerSlug) return [];
    return orders.filter((o) => {
      const p = products.find((pr) => pr.id === o.productId);
      return p?.sellerSlug === selectedSellerSlug;
    });
  }, [orders, products, selectedSellerSlug]);

  // Trouver les catégories disponibles (pour la boutique sélectionnée)
  const availableCategories = useMemo(() => {
    const categoryIds = new Set(productsOfSelectedShop.map((p) => p.categoryId));
    return categories.filter((cat) => categoryIds.has(cat.id));
  }, [productsOfSelectedShop]);

  const selectedSeller = useMemo(
    () => sellers.find((s) => s.slug === selectedSellerSlug) ?? null,
    [sellers, selectedSellerSlug]
  );


  const handleOpenModal = (product?: ShopPost) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        title: product.title,
        description: product.description,
        categoryId: product.categoryId,
        price: product.price.toString(),
        imageUrl: product.images[0] ?? DEFAULT_IMAGE_URL,
        imageUrl2: product.images[1] ?? "",
        available: product.available ?? true,
        quantity: (product.quantity ?? 0).toString(),
      });
    } else {
      setEditingProduct(null);
      setFormData({
        title: "",
        description: "",
        categoryId: "vetements",
        price: "",
        imageUrl: DEFAULT_IMAGE_URL,
        imageUrl2: "",
        available: true,
        quantity: "",
      });
    }
    setIsModalOpen(true);
  };

  const getFormImages = (): string[] => {
    const u1 = formData.imageUrl.trim() || DEFAULT_IMAGE_URL;
    const u2 = formData.imageUrl2.trim();
    const list = u2 ? [u1, u2] : [u1, u1];
    return list.length >= 2 ? list : [u1, u1];
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      // Modifier le produit
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                title: formData.title,
                description: formData.description,
                categoryId: formData.categoryId,
                price: parseFloat(formData.price),
                images: getFormImages(),
                available: formData.available,
                quantity: parseInt(formData.quantity) || 0,
              }
            : p
        )
      );
    } else {
      if (!selectedSeller) return;
      const newProduct: ShopPost = {
        id: `p${Date.now()}`,
        title: formData.title,
        description: formData.description,
        categoryId: formData.categoryId,
        images: getFormImages(),
        sellerName: selectedSeller.name,
        sellerSlug: selectedSeller.slug,
        likes: 0,
        comments: 0,
        price: parseFloat(formData.price),
        available: formData.available,
        quantity: parseInt(formData.quantity) || 0,
      };
      setProducts([...products, newProduct]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const slugFromName = (name: string) =>
    name
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const handleOpenShopModal = () => {
    setShopFormData({ name: "", slug: "" });
    setIsShopModalOpen(true);
  };

  const handleCloseShopModal = () => {
    setIsShopModalOpen(false);
    setShopFormData({ name: "", slug: "" });
  };

  const handleShopSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = shopFormData.name.trim();
    const slug = shopFormData.slug.trim() || slugFromName(name);
    if (!name || !slug) return;
    if (sellers.some((s) => s.slug === slug)) {
      alert("Une boutique avec ce slug existe déjà.");
      return;
    }
    const newSeller: Seller = { id: `seller-${Date.now()}`, name, slug };
    setSellers([...sellers, newSeller]);
    setSelectedSellerSlug(slug);
    setActiveTab("products");
    handleCloseShopModal();
  };

  const handleDeleteSeller = (id: string) => {
    if (confirm("Supprimer cette boutique ? Les produits associés ne seront plus liés.")) {
      const slug = sellers.find((s) => s.id === id)?.slug;
      setSellers(sellers.filter((s) => s.id !== id));
      if (slug === selectedSellerSlug) setSelectedSellerSlug(null);
    }
  };

  const productCountBySeller = useMemo(() => {
    const count: Record<string, number> = {};
    products.forEach((p) => {
      const key = p.sellerSlug;
      count[key] = (count[key] ?? 0) + 1;
    });
    return count;
  }, [products]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="px-6 sm:px-8 lg:px-12 py-4 max-w-[1600px] mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
                <Store className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Administration</h1>
                {selectedSeller ? (
                  <p className="text-sm text-gray-500">
                    Boutique : <span className="font-medium text-gray-700">{selectedSeller.name}</span>
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">Sélectionnez une boutique pour gérer produits et commandes</p>
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

      {/* Main content */}
      <main className="px-6 sm:px-8 lg:px-12 py-8 sm:py-12 max-w-[1600px] mx-auto">
        {!selectedSellerSlug && (
          <AdminShopsSection
            sellers={sellers}
            productCountBySeller={productCountBySeller}
            onAddShop={handleOpenShopModal}
            onSelectShop={(slug) => {
              setSelectedSellerSlug(slug);
              setActiveTab("products");
            }}
            onDeleteShop={handleDeleteSeller}
          />
        )}

        {selectedSellerSlug && selectedSeller && (
          <AdminShopDetailSection
            seller={selectedSeller}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onBackToShops={() => {
              setSelectedSellerSlug(null);
              setActiveTab("products");
            }}
            filteredProducts={filteredProducts}
            availableCategories={availableCategories.map((c) => ({ id: c.id, label: c.label }))}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onAddProduct={() => handleOpenModal()}
            onEditProduct={handleOpenModal}
            onDeleteProduct={handleDelete}
            orders={ordersOfSelectedShop}
            expandedOrders={expandedOrders}
            onExpandedOrdersChange={setExpandedOrders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        )}
      </main>

      {/* Modal Ajouter/Modifier */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {editingProduct ? "Modifier le produit" : "Ajouter un produit"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Titre du produit
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Ex: T-shirt coton premium"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Description
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                  placeholder="Décrivez votre produit..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Catégorie
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value as CategoryId })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Prix (GNF)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="1000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="50000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Quantité en stock
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Disponibilité
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.available}
                      onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                      className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-2 focus:ring-gray-900"
                    />
                    <span className="text-sm text-gray-700">
                      {formData.available ? "Disponible" : "Indisponible"}
                    </span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-900">
                  URL des images (au moins 2)
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="Image 1 – https://images.pexels.com/..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
                <input
                  type="url"
                  value={formData.imageUrl2}
                  onChange={(e) => setFormData({ ...formData, imageUrl2: e.target.value })}
                  placeholder="Image 2 – https://images.pexels.com/..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 py-2.5 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  {editingProduct ? "Enregistrer" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Ajouter une boutique */}
      {isShopModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Ajouter une boutique</h2>
              <button
                onClick={handleCloseShopModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleShopSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Nom de la boutique
                </label>
                <input
                  type="text"
                  required
                  value={shopFormData.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setShopFormData((prev) => ({
                      ...prev,
                      name,
                      slug: prev.slug || slugFromName(name),
                    }));
                  }}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Ex: Ma Boutique"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Slug (URL)
                </label>
                <input
                  type="text"
                  value={shopFormData.slug}
                  onChange={(e) =>
                    setShopFormData((prev) => ({
                      ...prev,
                      slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                    }))
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="ma-boutique"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Lien : /shop/{shopFormData.slug || "…"}
                </p>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseShopModal}
                  className="flex-1 py-2.5 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
