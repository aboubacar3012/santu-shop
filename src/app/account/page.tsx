"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  User,
  Mail,
  Package,
  Truck,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

const MOCK_USER = {
  name: "Mamadou Diallo",
  email: "mamadou.diallo@example.com",
  image: null as string | null,
};

type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

interface OrderItem {
  productTitle: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
}

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; icon: typeof Clock; className: string }
> = {
  pending: {
    label: "En attente",
    icon: Clock,
    className: "bg-amber-100 text-amber-800",
  },
  confirmed: {
    label: "Confirmée",
    icon: CheckCircle,
    className: "bg-blue-100 text-blue-800",
  },
  shipped: {
    label: "Expédiée",
    icon: Truck,
    className: "bg-purple-100 text-purple-800",
  },
  delivered: {
    label: "Livrée",
    icon: CheckCircle,
    className: "bg-green-100 text-green-800",
  },
  cancelled: {
    label: "Annulée",
    icon: XCircle,
    className: "bg-red-100 text-red-800",
  },
};

const MOCK_ORDERS: Order[] = [
  {
    id: "cmd-001",
    date: "2024-02-10",
    status: "delivered",
    total: 159980,
    items: [
      { productTitle: "Sneakers running", quantity: 2, price: 79990 },
      { productTitle: "T-shirt coton basique", quantity: 1, price: 19990 },
    ],
  },
  {
    id: "cmd-002",
    date: "2024-02-12",
    status: "shipped",
    total: 34990,
    items: [{ productTitle: "Sweat oversize premium", quantity: 1, price: 34990 }],
  },
  {
    id: "cmd-003",
    date: "2024-02-14",
    status: "pending",
    total: 49990,
    items: [{ productTitle: "Écouteurs sans fil", quantity: 1, price: 49990 }],
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatGnf(amount: number) {
  return `${amount.toLocaleString("fr-FR")} GNF`;
}

const EN_COURS_STATUSES: OrderStatus[] = ["pending", "confirmed", "shipped"];
const HISTORIQUE_STATUSES: OrderStatus[] = ["delivered", "cancelled"];

export default function AccountPage() {
  const user = MOCK_USER;
  const [activeTab, setActiveTab] = useState<"en-cours" | "historique">("en-cours");

  const ordersEnCours = useMemo(
    () => MOCK_ORDERS.filter((o) => EN_COURS_STATUSES.includes(o.status)),
    []
  );
  const ordersHistorique = useMemo(
    () => MOCK_ORDERS.filter((o) => HISTORIQUE_STATUSES.includes(o.status)),
    []
  );
  const displayedOrders = activeTab === "en-cours" ? ordersEnCours : ordersHistorique;

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
            <h1 className="text-lg font-semibold text-gray-900">Mon compte</h1>
            <div className="w-16" aria-hidden />
          </div>
        </div>
      </header>

      <main className="px-6 sm:px-8 lg:px-12 py-8 sm:py-12 max-w-[1600px] mx-auto space-y-8">
        {/* Profil */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-gray-500" />
            Informations personnelles
          </h2>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
              {user.image ? (
                <img
                  src={user.image}
                  alt=""
                  className="w-full h-full rounded-xl object-cover"
                />
              ) : (
                <User className="w-10 h-10 text-gray-400" />
              )}
            </div>
            <div className="space-y-4 flex-1 min-w-0">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Nom
                </p>
                <p className="text-gray-900 font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  Email
                </p>
                <p className="text-gray-900">{user.email}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Commandes */}
        <section className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-gray-500" />
              Mes commandes
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Consultez l’état de vos commandes
            </p>
            <div className="flex gap-2 mt-6 border-b border-gray-200">
              <button
                type="button"
                onClick={() => setActiveTab("en-cours")}
                className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium transition-colors border-b-2 -mb-px ${
                  activeTab === "en-cours"
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                En cours
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("historique")}
                className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium transition-colors border-b-2 -mb-px ${
                  activeTab === "historique"
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Historique
              </button>
            </div>
          </div>

          {displayedOrders.length === 0 ? (
            <div className="p-8 sm:p-12 text-center">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aucune commande pour le moment.</p>
              <Link
                href="/home"
                className="inline-block mt-4 text-sm font-medium text-gray-900 hover:underline"
              >
                Découvrir les produits
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {displayedOrders.map((order) => {
                const config = STATUS_CONFIG[order.status];
                const StatusIcon = config.icon;
                return (
                  <li key={order.id} className="p-4 sm:p-6">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="font-medium text-gray-900">
                        Commande #{order.id.slice(-4)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatDate(order.date)}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.className}`}
                      >
                        <StatusIcon className="w-3.5 h-3.5" />
                        {config.label}
                      </span>
                    </div>
                    <div className="rounded-lg bg-gray-50 border border-gray-100 p-4 space-y-2">
                      {order.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-gray-700">
                            {item.productTitle} × {item.quantity}
                          </span>
                          <span className="text-gray-900 font-medium">
                            {formatGnf(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                      <div className="flex justify-between text-sm font-semibold pt-2 border-t border-gray-200">
                        <span>Total</span>
                        <span>{formatGnf(order.total)}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
