"use client";

import { useState, useMemo } from "react";
import { Plus, Edit2, Trash2, Store, Package, X, ShoppingCart, User, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { shopPosts, categories, type ShopPost, type CategoryId } from "@/app/home/data";

type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

interface Order {
  id: string;
  productId: string;
  productTitle: string;
  productPrice: number;
  quantity: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  orderDate: Date;
  status: OrderStatus;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"products" | "orders">("products");
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [products, setProducts] = useState<ShopPost[]>(shopPosts.slice(0, 10)); // Simuler les produits de la boutique
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
    imageGradient: "from-rose-500 to-pink-600",
    available: true,
    quantity: "",
  });

  // Filtrer les produits par catégorie
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return products;
    return products.filter((p) => p.categoryId === selectedCategory);
  }, [products, selectedCategory]);

  // Trouver les catégories disponibles
  const availableCategories = useMemo(() => {
    const categoryIds = new Set(products.map((p) => p.categoryId));
    return categories.filter((cat) => categoryIds.has(cat.id));
  }, [products]);


  const handleOpenModal = (product?: ShopPost) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        title: product.title,
        description: product.description,
        categoryId: product.categoryId,
        price: product.price.toString(),
        imageGradient: product.imageGradient,
        available: product.available,
        quantity: product.quantity.toString(),
      });
    } else {
      setEditingProduct(null);
      setFormData({
        title: "",
        description: "",
        categoryId: "vetements",
        price: "",
        imageGradient: "from-rose-500 to-pink-600",
        available: true,
        quantity: "",
      });
    }
    setIsModalOpen(true);
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
                imageGradient: formData.imageGradient,
                available: formData.available,
                quantity: parseInt(formData.quantity) || 0,
              }
            : p
        )
      );
    } else {
      // Ajouter un nouveau produit
      const newProduct: ShopPost = {
        id: `p${Date.now()}`,
        title: formData.title,
        description: formData.description,
        categoryId: formData.categoryId,
        imageGradient: formData.imageGradient,
        sellerName: "Ma Boutique",
        sellerSlug: "ma-boutique",
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

  const gradientOptions = [
    "from-rose-500 to-pink-600",
    "from-amber-500 to-orange-600",
    "from-sky-500 to-blue-600",
    "from-emerald-500 to-teal-600",
    "from-purple-500 to-violet-600",
    "from-slate-500 to-slate-700",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="px-6 sm:px-8 lg:px-12 py-4 max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
                <Store className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-lg font-semibold text-gray-900">Administration</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="px-6 sm:px-8 lg:px-12 py-8 sm:py-12 max-w-[1600px] mx-auto">
        {/* Onglets */}
        <div className="flex gap-2 mb-6 sm:mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium transition-colors border-b-2 ${
              activeTab === "products"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Produits
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium transition-colors border-b-2 ${
              activeTab === "orders"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Commandes
          </button>
        </div>

        {/* Contenu des onglets */}
        {activeTab === "products" && (
          <>
            {/* Actions */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Mes produits</h2>
              <button
                onClick={() => handleOpenModal()}
                className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 sm:py-2.5 bg-gray-900 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-1.5 sm:gap-2"
              >
                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Ajouter un produit</span>
                <span className="sm:hidden">Ajouter</span>
              </button>
            </div>

        {/* Filtres par catégorie */}
        {availableCategories.length > 0 && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 mb-6">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === "all"
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
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Liste des produits */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3 md:gap-4">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <div className={`absolute inset-0 bg-gradient-to-br ${product.imageGradient} opacity-90 hover:opacity-100 transition-opacity duration-300`} />
              </div>

              {/* Content */}
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
                    <span className="text-gray-500">
                      Stock: {product.quantity}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-1.5 sm:gap-2">
                  <button
                    onClick={() => handleOpenModal(product)}
                    className="flex-1 py-1.5 sm:py-2 px-2 sm:px-3 bg-gray-100 text-gray-700 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
                  >
                    <Edit2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span className="hidden sm:inline">Modifier</span>
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 py-1.5 sm:py-2 px-2 sm:px-3 bg-red-50 text-red-600 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-1"
                  >
                    <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span className="hidden sm:inline">Supprimer</span>
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
                onClick={() => handleOpenModal()}
                className="px-6 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Ajouter votre premier produit
              </button>
            )}
          </div>
        )}
          </>
        )}

        {/* Onglet Commandes */}
        {activeTab === "orders" && (
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Commandes</h2>
            
            <div className="space-y-4">
              {orders.map((order, index) => {
                const getStatusColor = (status: OrderStatus) => {
                  switch (status) {
                    case "pending":
                      return "bg-yellow-100 text-yellow-700";
                    case "confirmed":
                      return "bg-blue-100 text-blue-700";
                    case "shipped":
                      return "bg-purple-100 text-purple-700";
                    case "delivered":
                      return "bg-green-100 text-green-700";
                    case "cancelled":
                      return "bg-red-100 text-red-700";
                    default:
                      return "bg-gray-100 text-gray-700";
                  }
                };

                const getStatusIcon = (status: OrderStatus) => {
                  switch (status) {
                    case "pending":
                      return <Clock className="w-4 h-4" />;
                    case "confirmed":
                      return <CheckCircle className="w-4 h-4" />;
                    case "shipped":
                      return <Package className="w-4 h-4" />;
                    case "delivered":
                      return <CheckCircle className="w-4 h-4" />;
                    case "cancelled":
                      return <XCircle className="w-4 h-4" />;
                    default:
                      return <AlertCircle className="w-4 h-4" />;
                  }
                };

                const getStatusLabel = (status: OrderStatus) => {
                  switch (status) {
                    case "pending":
                      return "En attente";
                    case "confirmed":
                      return "Confirmée";
                    case "shipped":
                      return "Expédiée";
                    case "delivered":
                      return "Livrée";
                    case "cancelled":
                      return "Annulée";
                    default:
                      return status;
                  }
                };

                const isExpanded = expandedOrders.has(order.id);

                return (
                  <div
                    key={order.id}
                    className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:border-gray-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between gap-3 sm:gap-4">
                      {/* Informations produit */}
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

                      {/* Statut et actions */}
                      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium border-2 transition-colors cursor-pointer ${
                            order.status === "pending"
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

                        {/* Bouton voir détails */}
                        <button
                          onClick={() => {
                            const newExpanded = new Set(expandedOrders);
                            if (isExpanded) {
                              newExpanded.delete(order.id);
                            } else {
                              newExpanded.add(order.id);
                            }
                            setExpandedOrders(newExpanded);
                          }}
                          className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1"
                        >
                          <User className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span className="hidden sm:inline">{isExpanded ? "Masquer" : "Détails"}</span>
                        </button>
                      </div>
                    </div>

                    {/* Informations client (affichées si expanded) */}
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

            {orders.length === 0 && (
              <div className="text-center py-20">
                <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 text-lg">Aucune commande</p>
              </div>
            )}
          </div>
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

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Couleur du gradient
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {gradientOptions.map((gradient) => (
                    <button
                      key={gradient}
                      type="button"
                      onClick={() => setFormData({ ...formData, imageGradient: gradient })}
                      className={`aspect-square rounded-lg bg-gradient-to-br ${gradient} border-2 transition-all ${
                        formData.imageGradient === gradient
                          ? "border-gray-900 scale-110"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    />
                  ))}
                </div>
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
    </div>
  );
}
