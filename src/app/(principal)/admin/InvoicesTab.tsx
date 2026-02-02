"use client";

import type { Invoice } from "./types";
import { Plus, Search } from "lucide-react";

type Props = {
  invoiceSearch: string;
  onInvoiceSearchChange: (next: string) => void;
  filteredInvoices: Invoice[];
  onNewInvoice: () => void;
  onMarkSent: (invoiceId: string) => void;
  onMarkPaid: (invoiceId: string) => void;
};

export default function InvoicesTab({
  invoiceSearch,
  onInvoiceSearchChange,
  filteredInvoices,
  onNewInvoice,
  onMarkSent,
  onMarkPaid,
}: Props) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="p-4 sm:p-6 border-b border-slate-200">
        <p className="text-[11px] font-semibold tracking-wide text-violet-600/80">FACTURES</p>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          Gestion des factures
        </h1>
        <p className="text-[13px] sm:text-sm text-slate-600 mt-1">
          Recherche, statut et génération (UI).
        </p>

        <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={invoiceSearch}
              onChange={(e) => onInvoiceSearchChange(e.target.value)}
              placeholder="Rechercher (id, client, liaison, statut)"
              className="w-full h-11 min-h-[44px] pl-10 pr-3 rounded-xl border border-slate-200 bg-white text-base focus:outline-none focus:ring-2 focus:ring-violet-200/70 sm:text-sm"
            />
          </div>
          <button
            type="button"
            onClick={onNewInvoice}
            className="h-8 rounded-lg bg-slate-900 text-white font-semibold text-[12px] hover:bg-slate-800 inline-flex items-center justify-center gap-1.5 px-3"
          >
            <Plus className="w-3.5 h-3.5" />
            Nouvelle facture
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="grid gap-3">
          {filteredInvoices.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
              <p className="text-[14px] font-semibold text-slate-800">Aucune facture trouvée.</p>
              <p className="text-[13px] text-slate-600 mt-1">
                Essayez une autre recherche ou créez une facture.
              </p>
            </div>
          ) : (
            filteredInvoices.map((inv) => (
              <div
                key={inv.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-slate-900 truncate">
                      {inv.id} • {inv.customerName}
                    </p>
                    <p className="text-[12px] text-slate-600 mt-1">
                      {inv.routeLabel} • {new Date(inv.createdAtIso).toLocaleString("fr-FR")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[14px] font-extrabold text-slate-900">
                      {inv.totalEur.toFixed(2)} €
                    </p>
                    <p
                      className={`text-[11px] font-semibold mt-1 inline-flex rounded-full px-2 py-0.5 ${
                        inv.status === "payée"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                          : inv.status === "envoyée"
                            ? "bg-blue-50 text-blue-700 border border-blue-100"
                            : "bg-amber-50 text-amber-700 border border-amber-100"
                      }`}
                    >
                      {inv.status}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onMarkSent(inv.id)}
                    className="h-8 rounded-lg border border-slate-200 bg-white text-slate-700 font-semibold text-[12px] hover:bg-slate-50 inline-flex items-center justify-center gap-1.5 px-3"
                  >
                    Marquer envoyée
                  </button>
                  <button
                    type="button"
                    onClick={() => onMarkPaid(inv.id)}
                    className="h-8 rounded-lg bg-slate-900 text-white font-semibold text-[12px] hover:bg-slate-800 inline-flex items-center justify-center gap-1.5 px-3"
                  >
                    Marquer payée
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
