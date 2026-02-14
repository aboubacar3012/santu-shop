"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";

export type ModalConfirmVariant = "primary" | "danger";

type ModalConfirmProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  message?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ModalConfirmVariant;
  /** Affiche un loader sur le bouton et désactive les clics pendant la confirmation */
  isLoading?: boolean;
  /** Fermer au clic sur l'overlay (défaut: true) */
  closeOnOverlayClick?: boolean;
};

export default function ModalConfirm({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  variant = "primary",
  isLoading = false,
  closeOnOverlayClick = true,
}: ModalConfirmProps) {
  const handleConfirm = useCallback(async () => {
    await onConfirm();
  }, [onConfirm]);

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

  const isPrimary = variant === "primary";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.button
            type="button"
            aria-hidden
            tabIndex={-1}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={closeOnOverlayClick && !isLoading ? onClose : undefined}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-confirm-title"
            {...(message != null && {
              "aria-describedby": "modal-confirm-desc",
            })}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 4 }}
            transition={{ duration: 0.2, ease: [0.21, 0.45, 0.27, 0.9] }}
            className="relative w-full max-w-md rounded-xl border border-gray-200 bg-white shadow-xl overflow-hidden"
          >
            {/* En-tête */}
            <div className="flex items-start justify-between gap-4 p-6 sm:p-8 border-b border-gray-100">
              <h2
                id="modal-confirm-title"
                className="text-xl font-semibold text-gray-900 pr-8"
              >
                {title}
              </h2>
              <button
                type="button"
                onClick={!isLoading ? onClose : undefined}
                disabled={isLoading}
                className="p-2 -m-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Message */}
            {message != null && (
              <div
                id="modal-confirm-desc"
                className="px-6 sm:px-8 py-4 text-gray-500 text-sm leading-relaxed"
              >
                {message}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 px-6 sm:px-8 pb-6 sm:pb-8 pt-4">
              <button
                type="button"
                onClick={!isLoading ? onClose : undefined}
                disabled={isLoading}
                className="px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                {cancelLabel}
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={isLoading}
                className={
                  isPrimary
                    ? "px-4 py-2.5 rounded-lg text-sm font-medium border-2 border-gray-900 bg-gray-900 text-white hover:bg-gray-800 hover:border-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-gray-900 flex items-center gap-2"
                    : "px-4 py-2.5 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 border-2 border-red-600 hover:border-red-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                }
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Chargement…
                  </>
                ) : (
                  confirmLabel
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
