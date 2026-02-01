"use client";

import type { ToastState } from "./types";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

type Props = {
  toast: ToastState;
};

export default function AdminToast({ toast }: Props) {
  if (!toast) return null;

  return (
    <div className="fixed left-0 right-0 top-16 z-50 px-4 sm:px-6">
      <div
        className={`mx-auto max-w-6xl rounded-2xl border px-4 py-3 shadow-lg ${
          toast.kind === "ok"
            ? "border-emerald-200 bg-emerald-50 text-emerald-900"
            : "border-amber-200 bg-amber-50 text-amber-900"
        }`}
      >
        <div className="flex items-start gap-2">
          {toast.kind === "ok" ? (
            <CheckCircle2 className="w-5 h-5 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 mt-0.5" />
          )}
          <p className="text-[13px] sm:text-sm font-semibold">{toast.msg}</p>
        </div>
      </div>
    </div>
  );
}
