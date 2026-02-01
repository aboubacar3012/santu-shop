"use client";

import type { AdminTab } from "./types";
import { ClipboardList, FileText, Package, Plus } from "lucide-react";

type Props = {
  tab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
};

export default function AdminHeader({ tab, onTabChange }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <p className="text-[13px] sm:text-sm font-semibold">Admin • Santu Express</p>
              <p className="text-[11px] text-slate-500">Création d’envois, factures, colis</p>
            </div>
          </div>
        </div>

        {/* Tabs (mobile-first) */}
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => onTabChange("create")}
            className={`shrink-0 rounded-xl px-3 py-2 text-[13px] font-semibold border transition ${
              tab === "create"
                ? "border-orange-200 bg-orange-50 text-slate-900"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <Plus className="w-4 h-4 text-orange-500" />
              Création d’envoi
            </span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange("invoices")}
            className={`shrink-0 rounded-xl px-3 py-2 text-[13px] font-semibold border transition ${
              tab === "invoices"
                ? "border-orange-200 bg-orange-50 text-slate-900"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <FileText className="w-4 h-4 text-orange-500" />
              Factures
            </span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange("parcels")}
            className={`shrink-0 rounded-xl px-3 py-2 text-[13px] font-semibold border transition ${
              tab === "parcels"
                ? "border-orange-200 bg-orange-50 text-slate-900"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-orange-500" />
              Colis
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
