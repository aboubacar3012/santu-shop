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
    <section className="rounded-xl sm:rounded-2xl lg:rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* En-tête — base = mobile */}
      <div className="p-4 border-b border-slate-200 sm:p-5 lg:p-6">
        <p className="text-[11px] font-semibold tracking-wide text-violet-600/80 uppercase">
          COLIS
        </p>
        <h1 className="text-lg font-extrabold text-slate-900 mt-0.5 sm:text-xl lg:text-2xl">
          Tous les colis
        </h1>
        <p className="text-[13px] text-slate-600 mt-1 sm:text-sm">
          Liste des envois avec modification du statut et commentaire.
        </p>

        {/* Recherche + Nouvel envoi : empilé sur mobile, côte à côte à partir de sm */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-3">
          <div className="relative w-full min-w-0 sm:flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
              aria-hidden
            />
            <input
              type="search"
              value={parcelSearch}
              onChange={(e) => onParcelSearchChange(e.target.value)}
              placeholder="Rechercher (tracking, liaison, expéditeur…)"
              className="w-full h-12 min-h-[44px] pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 sm:text-sm"
              aria-label="Rechercher un colis"
            />
          </div>
          <button
            type="button"
            onClick={onNewShipment}
            className="h-12 min-h-[44px] w-full rounded-xl bg-slate-900 text-white font-bold text-[15px] px-4 inline-flex items-center justify-center gap-2 shrink-0 hover:bg-slate-800 active:scale-[0.99] transition touch-manipulation sm:w-auto sm:px-5"
          >
            <Plus className="w-5 h-5 shrink-0" aria-hidden />
            Nouvel envoi
          </button>
        </div>
      </div>

      {/* Liste des colis */}
      <div className="p-4 sm:p-5 lg:p-6">
        <div className="flex flex-col gap-4">
          {filteredParcels.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center sm:rounded-2xl sm:p-8">
              <p className="text-sm font-semibold text-slate-800">Aucun colis trouvé.</p>
              <p className="text-[13px] text-slate-600 mt-1.5 sm:text-sm">
                Essayez une autre recherche ou créez un envoi.
              </p>
            </div>
          ) : (
            filteredParcels.map((p) => (
              <article
                key={p.trackingId}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-4 overflow-hidden sm:rounded-2xl sm:p-5 sm:space-y-4"
              >
                {/* Infos colis + Statut : empilé sur mobile, ligne sur sm+ */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-bold text-slate-900 truncate sm:text-sm">
                      {p.trackingId} • {routeLabel(p.route)}
                    </p>
                    <p className="text-[12px] text-slate-600 mt-1 break-words sm:text-sm">
                      {p.senderName} → {p.recipientName}
                    </p>
                    <p className="text-[12px] text-slate-500 mt-0.5">
                      {new Date(p.createdAtIso).toLocaleString("fr-FR")}
                    </p>
                    <p className="text-[12px] text-slate-500 mt-1">
                      Service: <span className="font-semibold">{p.service}</span> • Taille{" "}
                      <span className="font-semibold">{p.size}</span> • Poids{" "}
                      <span className="font-semibold">{p.weightKg.toFixed(2)} kg</span>
                    </p>
                  </div>
                  <div className="w-full sm:w-auto sm:min-w-[140px] sm:shrink-0 sm:text-right">
                    <label htmlFor={`status-${p.trackingId}`} className="block text-[11px] font-semibold text-slate-500 mb-1.5">
                      Statut
                    </label>
                    <select
                      id={`status-${p.trackingId}`}
                      value={p.status}
                      onChange={(e) => onStatusChange(p.trackingId, e.target.value as ParcelStatus)}
                      className="w-full h-12 min-h-[44px] rounded-xl border border-slate-200 bg-white px-3 text-[15px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 touch-manipulation sm:h-11 sm:text-sm"
                      aria-label={`Statut du colis ${p.trackingId}`}
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

                {/* Commentaire + Enregistrer : empilé sur mobile, ligne sur sm+ */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4 sm:pt-1">
                  <div className="w-full min-w-0 sm:flex-1">
                    <label htmlFor={`comment-${p.trackingId}`} className="block text-[12px] font-semibold text-slate-700 mb-1.5 sm:text-sm">
                      Commentaire
                    </label>
                    <textarea
                      id={`comment-${p.trackingId}`}
                      value={commentDrafts[p.trackingId] ?? p.comment ?? ""}
                      onChange={(e) => onCommentDraftChange(p.trackingId, e.target.value)}
                      placeholder="Ex: arrivé au dépôt, départ prévu demain..."
                      rows={3}
                      className="w-full min-h-[88px] rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-base placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 resize-y touch-manipulation sm:min-h-[80px] sm:text-sm"
                      aria-label={`Commentaire pour le colis ${p.trackingId}`}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => onSaveComment(p.trackingId)}
                    className="h-12 min-h-[44px] w-full rounded-xl bg-violet-500 text-white font-bold text-[15px] hover:bg-violet-600 active:scale-[0.99] transition touch-manipulation shrink-0 sm:h-11 sm:w-auto sm:px-6 sm:text-sm"
                  >
                    Enregistrer
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
