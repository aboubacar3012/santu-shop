"use client";

import { useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { OrderInfoForm } from "../app/cart/OrderInfoForm";
import type { OrderInfoData } from "../app/cart/OrderInfoForm";

export interface OrderFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: OrderInfoData) => void | Promise<void>;
  isLoading?: boolean;
}

export function OrderFormModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: OrderFormModalProps) {
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
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

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
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-xl border border-gray-200"
      >
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-6">
            <h2
              id="order-form-title"
              className="text-lg font-bold text-gray-900"
            >
              Vos informations
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
          <OrderInfoForm
            onSubmit={onSubmit}
            onCancel={onClose}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
