"use client";

import { useEffect, useCallback, useState } from "react";
import { X } from "lucide-react";
import { OrderInfoForm, initialOrderInfoValues } from "../app/cart/OrderInfoForm";
import { OrderRecap } from "../app/cart/OrderRecap";
import type { OrderInfoData } from "../app/cart/OrderInfoForm";
import type { OrderLine } from "../app/cart/OrderRecap";

export interface OrderFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: OrderInfoData) => void | Promise<void>;
  isLoading?: boolean;
  lines: OrderLine[];
  total: number;
  formatPrice: (price: number) => string;
}

export function OrderFormModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  lines,
  total,
  formatPrice,
}: OrderFormModalProps) {
  const [orderInfo, setOrderInfo] = useState<OrderInfoData>(initialOrderInfoValues);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      setOrderInfo(initialOrderInfoValues);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  const handleConfirm = useCallback(() => {
    onSubmit(orderInfo);
  }, [orderInfo, onSubmit]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Fermer"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={!isLoading ? onClose : undefined}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-form-title"
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-xl border border-gray-200"
      >
        <div className="p-4 sm:p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h2 id="order-form-title" className="text-lg font-bold text-gray-900">
              Passer la commande
            </h2>
            <button
              type="button"
              onClick={!isLoading ? onClose : undefined}
              className="p-1.5 -m-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 min-w-0">
              <OrderInfoForm
                value={orderInfo}
                onChange={setOrderInfo}
                onCancel={onClose}
                isLoading={isLoading}
              />
            </div>
            <div className="lg:w-72 flex-shrink-0">
              <OrderRecap
                lines={lines}
                total={total}
                orderInfo={orderInfo}
                onConfirm={handleConfirm}
                isLoading={isLoading}
                formatPrice={formatPrice}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
