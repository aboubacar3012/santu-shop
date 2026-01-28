"use client";

import { useEffect, useCallback } from "react";
import { X } from "lucide-react";

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

    if (!isOpen) return null;

    const isPrimary = variant === "primary";
    const confirmClassName =
        variant === "danger"
            ? "bg-red-600 hover:bg-red-700 text-white"
            : "text-white";
    const confirmStyle = isPrimary ? { backgroundColor: "#7451EB" } : undefined;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay */}
            <button
                type="button"
                aria-label="Fermer"
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={closeOnOverlayClick && !isLoading ? onClose : undefined}
            />

            {/* Modal */}
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-confirm-title"
                {...(message != null && { "aria-describedby": "modal-confirm-desc" })}
                className="relative w-full max-w-md rounded-xl bg-white shadow-xl border border-gray-200"
            >
                <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                        <h2
                            id="modal-confirm-title"
                            className="text-lg font-bold text-gray-900"
                        >
                            {title}
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

                    {message != null && (
                        <div
                            id="modal-confirm-desc"
                            className="text-gray-600 text-sm mb-6"
                        >
                            {message}
                        </div>
                    )}

                    <div className="flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={!isLoading ? onClose : undefined}
                            disabled={isLoading}
                            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
                        >
                            {cancelLabel}
                        </button>
                        <button
                            type="button"
                            onClick={handleConfirm}
                            disabled={isLoading}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 disabled:opacity-50 ${confirmClassName}`}
                            style={confirmStyle}
                            onMouseEnter={
                                isPrimary
                                    ? (e) =>
                                          (e.currentTarget.style.backgroundColor =
                                              "#6341d9")
                                    : undefined
                            }
                            onMouseLeave={
                                isPrimary
                                    ? (e) =>
                                          (e.currentTarget.style.backgroundColor =
                                              "#7451EB")
                                    : undefined
                            }
                        >
                            {isLoading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                    Chargement…
                                </>
                            ) : (
                                confirmLabel
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
