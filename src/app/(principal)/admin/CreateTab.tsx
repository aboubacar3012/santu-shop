"use client";

import type { CreateUiState, Estimate, ShipmentDraft } from "./types";
import {
  BadgeEuro,
  ChevronRight,
  Mail,
  MapPin,
  Package,
  Phone,
  Ruler,
  Scale,
  User,
} from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  draft: ShipmentDraft;
  setDraft: Dispatch<SetStateAction<ShipmentDraft>>;
  createUi: CreateUiState;
  setCreateUi: Dispatch<SetStateAction<CreateUiState>>;
  estimate: Estimate;
  canCreate: boolean;
  routeLabel: (route: ShipmentDraft["route"]) => string;
  onCreateShipment: () => void;
  onCreateInvoice: () => void;
  onGoInvoices: () => void;
  onGoParcels: () => void;
};

export default function CreateTab({
  draft,
  setDraft,
  createUi,
  setCreateUi,
  estimate,
  canCreate,
  routeLabel,
  onCreateShipment,
  onCreateInvoice,
  onGoInvoices,
  onGoParcels,
}: Props) {
  return (
    <div className="grid gap-4 lg:grid-cols-12">
      {/* Form */}
      <section className="lg:col-span-8">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="p-3 sm:p-6 border-b border-slate-200">
            <p className="text-[11px] font-semibold tracking-wide text-violet-600/80">CRÉATION</p>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Créer un envoi
            </h1>
            <p className="text-[13px] sm:text-sm text-slate-600 mt-1">
              Renseignez les informations colis, expéditeur et destinataire.
            </p>
          </div>

          <div className="p-3 sm:p-6 grid gap-3">
            {/* Route + service */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-[12px] font-semibold text-slate-700">Liaison</label>
                <div className="mt-2 relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    value={draft.route}
                    onChange={(e) =>
                      setDraft((d) => ({
                        ...d,
                        route: e.target.value as ShipmentDraft["route"],
                      }))
                    }
                    className="w-full h-10 pl-10 pr-3 rounded-xl border border-slate-200 bg-white text-[13px] focus:outline-none focus:ring-2 focus:ring-violet-200/70"
                  >
                    <option value="FR_TO_GN">France → Conakry</option>
                    <option value="GN_TO_FR">Conakry → France</option>
                    <option value="GN_TO_US">Conakry → États-Unis (New York)</option>
                    <option value="GN_TO_CA">Conakry → Canada</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[12px] font-semibold text-slate-700">Service</label>
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setDraft((d) => ({ ...d, service: "standard" }))}
                    className={`flex-1 h-10 rounded-xl border text-[13px] font-semibold transition ${
                      draft.service === "standard"
                        ? "border-violet-200 bg-violet-50 text-slate-900"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    Standard
                  </button>
                  <button
                    type="button"
                    onClick={() => setDraft((d) => ({ ...d, service: "express" }))}
                    className={`flex-1 h-10 rounded-xl border text-[13px] font-semibold transition ${
                      draft.service === "express"
                        ? "border-violet-200 bg-violet-50 text-slate-900"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    Express
                  </button>
                </div>
              </div>
            </div>

            {/* Colis */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-3">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                    <Package className="w-4.5 h-4.5 text-violet-500" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-slate-900">Détails du colis</p>
                    <p className="text-[11px] text-slate-500">Taille, poids (obligatoires)</p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">
                  Devise: {draft.currency}
                </span>
              </div>

              {/* Taille */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-[12px] font-semibold text-slate-700">Taille</label>
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {(["S", "M", "L", "XL"] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setDraft((d) => ({ ...d, size: s }))}
                        className={`h-10 rounded-xl border text-[13px] font-bold transition ${
                          draft.size === s
                            ? "border-violet-200 bg-violet-50 text-slate-900"
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Poids */}
                <div>
                  <label className="text-[12px] font-semibold text-slate-700">
                    Poids (kg) <span className="text-violet-600">*</span>
                  </label>
                  <div className="mt-2 relative">
                    <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      value={draft.weightKg}
                      onChange={(e) => setDraft((d) => ({ ...d, weightKg: e.target.value }))}
                      inputMode="decimal"
                      placeholder="Ex: 2.5"
                      className="w-full h-10 pl-10 pr-3 rounded-xl border border-slate-200 bg-white text-[13px] focus:outline-none focus:ring-2 focus:ring-violet-200/70"
                    />
                  </div>
                </div>
              </div>

              {/* Options (repliable) */}
              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => setCreateUi((s) => ({ ...s, optionsOpen: !s.optionsOpen }))}
                  className="w-full h-10 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold text-[13px] inline-flex items-center justify-between px-3 hover:bg-slate-50"
                >
                  Options (dimensions, valeur, notes)
                  <ChevronRight
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      createUi.optionsOpen ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {createUi.optionsOpen && (
                  <div className="mt-3 grid gap-3">
                    <div>
                      <label className="text-[12px] font-semibold text-slate-700">
                        Dimensions (cm){" "}
                        <span className="text-slate-400 font-medium">(optionnel)</span>
                      </label>
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        <div className="relative">
                          <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            value={draft.lengthCm}
                            onChange={(e) =>
                              setDraft((d) => ({ ...d, lengthCm: e.target.value }))
                            }
                            inputMode="numeric"
                            placeholder="Long."
                            className="w-full h-10 pl-10 pr-3 rounded-xl border border-slate-200 bg-white text-[13px] focus:outline-none focus:ring-2 focus:ring-violet-200/70"
                          />
                        </div>
                        <input
                          value={draft.widthCm}
                          onChange={(e) => setDraft((d) => ({ ...d, widthCm: e.target.value }))}
                          inputMode="numeric"
                          placeholder="Larg."
                          className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-[13px] focus:outline-none focus:ring-2 focus:ring-violet-200/70"
                        />
                        <input
                          value={draft.heightCm}
                          onChange={(e) => setDraft((d) => ({ ...d, heightCm: e.target.value }))}
                          inputMode="numeric"
                          placeholder="Haut."
                          className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-[13px] focus:outline-none focus:ring-2 focus:ring-violet-200/70"
                        />
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="text-[12px] font-semibold text-slate-700">
                          Valeur déclarée (EUR){" "}
                          <span className="text-slate-400 font-medium">(optionnel)</span>
                        </label>
                        <div className="mt-2 relative">
                          <BadgeEuro className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            value={draft.declaredValueEur}
                            onChange={(e) =>
                              setDraft((d) => ({ ...d, declaredValueEur: e.target.value }))
                            }
                            inputMode="decimal"
                            placeholder="Ex: 120"
                            className="w-full h-10 pl-10 pr-3 rounded-xl border border-slate-200 bg-white text-[13px] focus:outline-none focus:ring-2 focus:ring-violet-200/70"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[12px] font-semibold text-slate-700">
                          Notes{" "}
                          <span className="text-slate-400 font-medium">(optionnel)</span>
                        </label>
                        <textarea
                          value={draft.notes}
                          onChange={(e) => setDraft((d) => ({ ...d, notes: e.target.value }))}
                          placeholder="Fragile, instructions, etc."
                          className="mt-2 w-full min-h-[40px] max-h-[110px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-violet-200/70"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Expéditeur / Destinataire */}
            <div className="grid gap-3 lg:grid-cols-2">
              {/* Expéditeur (repliable) */}
              <div className="rounded-2xl border border-slate-200 bg-white">
                <button
                  type="button"
                  onClick={() => setCreateUi((s) => ({ ...s, senderOpen: !s.senderOpen }))}
                  className="w-full px-3 py-3 inline-flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center">
                      <User className="w-4.5 h-4.5 text-violet-500" />
                    </div>
                    <div className="min-w-0 text-left">
                      <p className="text-[13px] font-bold text-slate-900">Expéditeur</p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {(draft.senderName || "Nom") + " • " + (draft.senderPhone || "Téléphone")}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      createUi.senderOpen ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {createUi.senderOpen && (
                  <div className="px-3 pb-3 grid gap-2">
                    <input
                      value={draft.senderName}
                      onChange={(e) => setDraft((d) => ({ ...d, senderName: e.target.value }))}
                      placeholder="Nom complet *"
                      className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-violet-200/70"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          value={draft.senderPhone}
                          onChange={(e) =>
                            setDraft((d) => ({ ...d, senderPhone: e.target.value }))
                          }
                          inputMode="tel"
                          placeholder="Téléphone *"
                          className="w-full h-10 pl-10 pr-3 rounded-xl border border-slate-200 bg-white text-[13px] focus:outline-none focus:ring-2 focus:ring-violet-200/70"
                        />
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          value={draft.senderEmail}
                          onChange={(e) =>
                            setDraft((d) => ({ ...d, senderEmail: e.target.value }))
                          }
                          inputMode="email"
                          placeholder="Email"
                          className="w-full h-10 pl-10 pr-3 rounded-xl border border-slate-200 bg-white text-[13px] focus:outline-none focus:ring-2 focus:ring-violet-200/70"
                        />
                      </div>
                    </div>
                    <textarea
                      value={draft.senderAddress}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, senderAddress: e.target.value }))
                      }
                      placeholder="Adresse complète *"
                      className="w-full min-h-[56px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-violet-200/70"
                    />
                  </div>
                )}
              </div>

              {/* Destinataire (repliable) */}
              <div className="rounded-2xl border border-slate-200 bg-white">
                <button
                  type="button"
                  onClick={() =>
                    setCreateUi((s) => ({ ...s, recipientOpen: !s.recipientOpen }))
                  }
                  className="w-full px-3 py-3 inline-flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center">
                      <User className="w-4.5 h-4.5 text-violet-500" />
                    </div>
                    <div className="min-w-0 text-left">
                      <p className="text-[13px] font-bold text-slate-900">Destinataire</p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {(draft.recipientName || "Nom") +
                          " • " +
                          (draft.recipientPhone || "Téléphone")}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      createUi.recipientOpen ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {createUi.recipientOpen && (
                  <div className="px-3 pb-3 grid gap-2">
                    <input
                      value={draft.recipientName}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, recipientName: e.target.value }))
                      }
                      placeholder="Nom complet *"
                      className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-violet-200/70"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          value={draft.recipientPhone}
                          onChange={(e) =>
                            setDraft((d) => ({ ...d, recipientPhone: e.target.value }))
                          }
                          inputMode="tel"
                          placeholder="Téléphone *"
                          className="w-full h-10 pl-10 pr-3 rounded-xl border border-slate-200 bg-white text-[13px] focus:outline-none focus:ring-2 focus:ring-violet-200/70"
                        />
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          value={draft.recipientEmail}
                          onChange={(e) =>
                            setDraft((d) => ({ ...d, recipientEmail: e.target.value }))
                          }
                          inputMode="email"
                          placeholder="Email"
                          className="w-full h-10 pl-10 pr-3 rounded-xl border border-slate-200 bg-white text-[13px] focus:outline-none focus:ring-2 focus:ring-violet-200/70"
                        />
                      </div>
                    </div>
                    <textarea
                      value={draft.recipientAddress}
                      onChange={(e) =>
                        setDraft((d) => ({ ...d, recipientAddress: e.target.value }))
                      }
                      placeholder="Adresse complète *"
                      className="w-full min-h-[56px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-violet-200/70"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={onCreateShipment}
                className={`h-10 rounded-xl font-bold text-[13px] transition shadow-sm ${
                  canCreate
                    ? "bg-slate-900 text-white hover:bg-slate-800"
                    : "bg-slate-200 text-slate-500 cursor-not-allowed"
                }`}
                disabled={!canCreate}
              >
                Créer
              </button>
              <button
                type="button"
                onClick={onCreateInvoice}
                className="h-10 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-[13px] hover:bg-slate-50"
              >
                Facture
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Side panel */}
      <aside className="lg:col-span-4">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="p-4 sm:p-6 border-b border-slate-200">
            <p className="text-[11px] font-semibold tracking-wide text-violet-600/80">RÉSUMÉ</p>
            <h2 className="text-lg font-extrabold text-slate-900">Estimation</h2>
            <p className="text-[13px] text-slate-600 mt-1">
              Calcul indicatif (UI). Ajustable selon vos règles.
            </p>
          </div>
          <div className="p-4 sm:p-6 grid gap-3">
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
              <p className="text-[12px] font-semibold text-slate-700">Liaison</p>
              <p className="text-[14px] font-bold text-slate-900 mt-1">
                {routeLabel(draft.route)}
              </p>
              <p className="text-[12px] text-slate-600 mt-1">
                Service: <span className="font-semibold">{draft.service}</span> • Taille{" "}
                <span className="font-semibold">{draft.size}</span>
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
              <p className="text-[12px] font-semibold text-slate-700">Estimation</p>
              <div className="mt-2 flex items-end justify-between">
                <p className="text-2xl font-extrabold text-slate-900">
                  {estimate.total.toFixed(2)} €
                </p>
                <p className="text-[11px] text-slate-500">TTC (approx.)</p>
              </div>
              <div className="mt-3 grid gap-1 text-[12px] text-slate-600">
                <p>Base: {estimate.base.toFixed(2)} €</p>
                <p>Par kg: {estimate.perKg.toFixed(2)} €</p>
                <p>Taille: {estimate.sizeFee.toFixed(2)} €</p>
                <p>Assurance: {estimate.insurance.toFixed(2)} €</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-[12px] font-semibold text-slate-700">Raccourcis</p>
              <div className="mt-2 grid gap-2">
                <button
                  type="button"
                  onClick={onGoInvoices}
                  className="h-11 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold text-[13px] hover:bg-slate-50 inline-flex items-center justify-between px-3"
                >
                  Voir les factures
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
                <button
                  type="button"
                  onClick={onGoParcels}
                  className="h-11 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold text-[13px] hover:bg-slate-50 inline-flex items-center justify-between px-3"
                >
                  Voir les colis
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
