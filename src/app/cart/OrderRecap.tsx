"use client";

import Image from "next/image";
import type { OrderInfoData } from "./OrderInfoForm";
import type { ShopPost } from "@/app/home/data";

export interface OrderLine {
  product: ShopPost;
  quantity: number;
}

export interface OrderRecapProps {
  lines: OrderLine[];
  total: number;
  orderInfo: OrderInfoData | null;
  onConfirm: () => void;
  isLoading?: boolean;
  formatPrice: (price: number) => string;
}

const MAX_VISIBLE_LINES = 3;
const LINE_HEIGHT_REM = 4; // hauteur approximative d'une ligne (4rem)

export function OrderRecap({
  lines,
  total,
  orderInfo,
  onConfirm,
  isLoading = false,
  formatPrice,
}: OrderRecapProps) {
  const hasRequiredInfo =
    orderInfo &&
    orderInfo.nom.trim() !== "" &&
    orderInfo.prenom.trim() !== "" &&
    orderInfo.telephone.trim() !== "" &&
    orderInfo.quartier.trim() !== "" &&
    orderInfo.commune.trim() !== "" &&
    orderInfo.ville.trim() !== "";

  const addressLine = orderInfo
    ? [orderInfo.quartier, orderInfo.commune, orderInfo.ville].filter(Boolean).join(", ")
    : "";

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Récapitulatif</h3>

      {/* Articles (max 3 visibles, scroll sinon) */}
      <div
        className="space-y-2 overflow-y-auto mb-4"
        style={{ maxHeight: `${MAX_VISIBLE_LINES * LINE_HEIGHT_REM}rem` }}
      >
        {lines.map(({ product, quantity }) => (
          <div
            key={product.id}
            className="flex gap-2 flex-shrink-0 p-2 rounded-lg bg-white border border-gray-100"
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                className="object-cover"
                sizes="56px"
                unoptimized={product.images[0]?.includes("pexels.com")}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-2">
                {product.title}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-500">
                {quantity} × {formatPrice(product.price)}
              </p>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-gray-900 flex-shrink-0">
              {formatPrice(product.price * quantity)}
            </p>
          </div>
        ))}
      </div>

      {/* Infos utilisateur */}
      {orderInfo && (
        <div className="text-xs text-gray-600 space-y-1 mb-4 pb-4 border-b border-gray-200">
          <p className="font-medium text-gray-900">
            {orderInfo.prenom} {orderInfo.nom}
          </p>
          <p>{orderInfo.telephone}</p>
          {addressLine && <p className="line-clamp-2">{addressLine}</p>}
        </div>
      )}

      {/* Total */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-semibold text-gray-900">Total</span>
        <span className="text-lg font-bold text-gray-900">{formatPrice(total)}</span>
      </div>

      <button
        type="button"
        onClick={onConfirm}
        disabled={!hasRequiredInfo || isLoading}
        className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:pointer-events-none"
      >
        {isLoading ? "Envoi…" : "Confirmer ma commande"}
      </button>
    </div>
  );
}
