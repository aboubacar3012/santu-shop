"use client";

import type { Parcel, ParcelStatus } from "./types";
import { Plus, Search } from "lucide-react";

type Props = {
  parcelSearch: string;
  onParcelSearchChange: (next: string) => void;
  filteredParcels: Parcel[];
  routeLabel: (route: Parcel["route"]) => string;
  commentDrafts: Record<string, string>;
  onCommentDraftChange: (trackingId: string, next: string) => void;
  onSaveComment: (trackingId: string) => void;
  onStatusChange: (trackingId: string, next: ParcelStatus) => void;
  onNewShipment: () => void;
};

export default function ParcelsTab({
  parcelSearch,
  onParcelSearchChange,
  filteredParcels,
  routeLabel,
  commentDrafts,
  onCommentDraftChange,
  onSaveComment,
  onStatusChange,
  onNewShipment,
}: Props) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="p-4 sm:p-6 border-b border-slate-200">
        <p className="text-[11px] font-semibold tracking-wide text-orange-600/80">COLIS</p>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">Tous les colis</h1>
        <p className="text-[13px] sm:text-sm text-slate-600 mt-1">
          Liste des envois avec modification du statut et commentaire (UI).
        </p>

        <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={parcelSearch}
              onChange={(e) => onParcelSearchChange(e.target.value)}
              placeholder="Rechercher (tracking, liaison, expéditeur, destinataire, statut)"
              className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 bg-white text-[14px] focus:outline-none focus:ring-2 focus:ring-orange-200/70"
            />
          </div>
          <button
            type="button"
            onClick={onNewShipment}
            className="h-11 rounded-xl bg-slate-900 text-white font-bold text-[14px] px-4 hover:bg-slate-800 inline-flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Nouvel envoi
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="grid gap-3">
          {filteredParcels.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
              <p className="text-[14px] font-semibold text-slate-800">Aucun colis trouvé.</p>
              <p className="text-[13px] text-slate-600 mt-1">
                Essayez une autre recherche ou créez un envoi.
              </p>
            </div>
          ) : (
            filteredParcels.map((p) => (
              <div
                key={p.trackingId}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-slate-900 truncate">
                      {p.trackingId} • {routeLabel(p.route)}
                    </p>
                    <p className="text-[12px] text-slate-600 mt-1">
                      {p.senderName} → {p.recipientName} •{" "}
                      {new Date(p.createdAtIso).toLocaleString("fr-FR")}
                    </p>
                    <p className="text-[12px] text-slate-500 mt-1">
                      Service: <span className="font-semibold">{p.service}</span> • Taille{" "}
                      <span className="font-semibold">{p.size}</span> • Poids{" "}
                      <span className="font-semibold">{p.weightKg.toFixed(2)} kg</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-slate-500">Statut</p>
                    <select
                      value={p.status}
                      onChange={(e) => onStatusChange(p.trackingId, e.target.value as ParcelStatus)}
                      className="mt-1 h-10 rounded-xl border border-slate-200 bg-white px-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-orange-200/70"
                    >
                      <option value="Créé">Créé</option>
                      <option value="Pris en charge">Pris en charge</option>
                      <option value="En transit">En transit</option>
                      <option value="Arrivé">Arrivé</option>
                      <option value="Livré">Livré</option>
                      <option value="Annulé">Annulé</option>
                    </select>
                  </div>
                </div>

                <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto] sm:items-start">
                  <div>
                    <label className="text-[12px] font-semibold text-slate-700">Commentaire</label>
                    <textarea
                      value={commentDrafts[p.trackingId] ?? p.comment ?? ""}
                      onChange={(e) => onCommentDraftChange(p.trackingId, e.target.value)}
                      placeholder="Ex: arrivé au dépôt, départ prévu demain..."
                      className="mt-2 w-full min-h-[72px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-orange-200/70"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => onSaveComment(p.trackingId)}
                    className="h-11 sm:mt-7 rounded-xl bg-orange-500 text-white font-bold text-[14px] px-4 hover:bg-orange-600"
                  >
                    Enregistrer
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
