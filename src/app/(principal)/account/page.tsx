"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  Calendar,
  ChevronRight,
  ClipboardList,
  FileText,
  Mail,
  MapPin,
  Package,
  Phone,
  Shield,
  Truck,
  User,
  Box
} from "lucide-react";

type ClientTab = "history" | "invoices" | "tracking" | "profile";

type ParcelStatus =
  | "Créé"
  | "Pris en charge"
  | "En transit"
  | "Arrivé"
  | "Livré"
  | "Annulé";

type ClientParcel = {
  trackingId: string;
  createdAtIso: string;
  routeLabel: string;
  service: "standard" | "express";
  size: "S" | "M" | "L" | "XL";
  weightKg: number;
  status: ParcelStatus;
  senderLabel: string;
  recipientLabel: string;
};

type ClientInvoice = {
  id: string;
  createdAtIso: string;
  label: string;
  amountEur: number;
  status: "brouillon" | "envoyée" | "payée";
};

type ClientProfile = {
  prenom: string;
  nom: string;
  telephone: string;
  email: string;
  adresse: string;
  ville: string;
  pays: string;
  codePostal: string;
  pieceIdentite?: string;
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString("fr-FR");
}

export default function ClientPage() {
  const [tab, setTab] = useState<ClientTab>("tracking");
  const [profile] = useState<ClientProfile>({
    prenom: "Abou",
    nom: "Camara",
    telephone: "+224 620 00 00 00",
    email: "abou@example.com",
    adresse: "Hamdallaye, Conakry",
    ville: "Conakry",
    pays: "Guinée",
    codePostal: "BP 000",
    pieceIdentite: "CNI / Passeport",
  });

  const [parcels] = useState<ClientParcel[]>([
    {
      trackingId: "SE-245981",
      createdAtIso: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
      routeLabel: "France → Conakry",
      service: "express",
      size: "M",
      weightKg: 2.4,
      status: "En transit",
      senderLabel: "Vous",
      recipientLabel: "Mamadou D.",
    },
    {
      trackingId: "SE-245730",
      createdAtIso: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
      routeLabel: "Conakry → France",
      service: "standard",
      size: "L",
      weightKg: 7.2,
      status: "Pris en charge",
      senderLabel: "Vous",
      recipientLabel: "Fatou B.",
    },
    {
      trackingId: "SE-244120",
      createdAtIso: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
      routeLabel: "Conakry → Canada",
      service: "standard",
      size: "S",
      weightKg: 1.1,
      status: "Livré",
      senderLabel: "Vous",
      recipientLabel: "Oumar K.",
    },
    {
      trackingId: "SE-243511",
      createdAtIso: new Date(Date.now() - 1000 * 60 * 60 * 24 * 18).toISOString(),
      routeLabel: "Conakry → États-Unis (NY)",
      service: "express",
      size: "XL",
      weightKg: 12.8,
      status: "Livré",
      senderLabel: "Vous",
      recipientLabel: "Aissatou S.",
    },
  ]);

  const [invoices] = useState<ClientInvoice[]>([
    {
      id: "FAC-000231",
      createdAtIso: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
      label: "Envoi SE-245730",
      amountEur: 68.5,
      status: "envoyée",
    },
    {
      id: "FAC-000198",
      createdAtIso: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
      label: "Envoi SE-244120",
      amountEur: 42.0,
      status: "payée",
    },
    {
      id: "FAC-000177",
      createdAtIso: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
      label: "Envoi SE-243511",
      amountEur: 119.9,
      status: "payée",
    },
  ]);

  const trackingParcels = useMemo(
    () => parcels.filter((p) => p.status !== "Livré" && p.status !== "Annulé"),
    [parcels],
  );

  const historyParcels = useMemo(
    () => parcels.filter((p) => p.status === "Livré" || p.status === "Annulé"),
    [parcels],
  );

  const filteredHistory = historyParcels;
  const filteredTracking = trackingParcels;
  const filteredInvoices = invoices;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-white text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div className="leading-tight">
                <p className="text-[13px] sm:text-sm font-semibold">Espace client • Santu Express</p>
                <p className="text-[11px] text-slate-500">
                  Historique, factures, suivi, profil
                </p>
              </div>
            </div>
            <Link
              href="/"
              className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[13px] font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition"
            >
              <ArrowLeft className="w-4 h-4 text-violet-500" />
              Retour
            </Link>
          </div>

          {/* Tabs */}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setTab("tracking")}
              className={`shrink-0 rounded-xl px-3 py-2 text-[13px] font-semibold border transition ${
                tab === "tracking"
                  ? "border-violet-200 bg-violet-50 text-slate-900"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <Truck className="w-4 h-4 text-violet-500" />
                Suivi
              </span>
            </button>
            <button
              type="button"
              onClick={() => setTab("history")}
              className={`shrink-0 rounded-xl px-3 py-2 text-[13px] font-semibold border transition ${
                tab === "history"
                  ? "border-violet-200 bg-violet-50 text-slate-900"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-violet-500" />
                Historique
              </span>
            </button>
            <button
              type="button"
              onClick={() => setTab("invoices")}
              className={`shrink-0 rounded-xl px-3 py-2 text-[13px] font-semibold border transition ${
                tab === "invoices"
                  ? "border-violet-200 bg-violet-50 text-slate-900"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <FileText className="w-4 h-4 text-violet-500" />
                Factures
              </span>
            </button>
            <button
              type="button"
              onClick={() => setTab("profile")}
              className={`shrink-0 rounded-xl px-3 py-2 text-[13px] font-semibold border transition ${
                tab === "profile"
                  ? "border-violet-200 bg-violet-50 text-slate-900"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <User className="w-4 h-4 text-violet-500" />
                Mon profil
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-5 sm:py-8">
 

        {/* Content */}
        <div className="mt-4">
          {tab === "tracking" ? (
            <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="p-4 sm:p-6 border-b border-slate-200">
                <p className="text-[11px] font-semibold tracking-wide text-violet-600/80">SUIVI</p>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Colis en cours
                </h1>
                <p className="text-[13px] sm:text-sm text-slate-600 mt-1">
                  Suivez vos colis (statut, destination, informations).
                </p>
              </div>

              <div className="p-4 sm:p-6">
                <div className="grid gap-3">
                  {filteredTracking.length === 0 ? (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
                      <p className="text-[14px] font-semibold text-slate-800">
                        Aucun colis en cours.
                      </p>
                      <p className="text-[13px] text-slate-600 mt-1">
                        Vos prochains envois apparaîtront ici.
                      </p>
                    </div>
                  ) : (
                    filteredTracking.map((p) => (
                      <div
                        key={p.trackingId}
                        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-[13px] font-bold text-slate-900 truncate">
                              {p.trackingId} • {p.routeLabel}
                            </p>
                            <p className="text-[12px] text-slate-600 mt-1">
                              {p.senderLabel} → {p.recipientLabel} • {fmtDate(p.createdAtIso)}
                            </p>
                            <p className="text-[12px] text-slate-500 mt-1">
                              Service: <span className="font-semibold">{p.service}</span> • Taille{" "}
                              <span className="font-semibold">{p.size}</span> • Poids{" "}
                              <span className="font-semibold">{p.weightKg.toFixed(2)} kg</span>
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-[11px] text-slate-500">Statut</p>
                            <p
                              className={`mt-1 inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${
                                p.status === "En transit"
                                  ? "border-blue-100 bg-blue-50 text-blue-700"
                                  : p.status === "Pris en charge"
                                    ? "border-amber-100 bg-amber-50 text-amber-700"
                                    : "border-slate-200 bg-slate-50 text-slate-700"
                              }`}
                            >
                              {p.status}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3">
                          <button
                            type="button"
                            className="h-8 rounded-lg bg-slate-900 text-white font-semibold text-[12px] hover:bg-slate-800 inline-flex items-center justify-center gap-1.5 px-3"
                          >
                            <Shield className="w-3.5 h-3.5" />
                            Contacter le support
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>
          ) : tab === "history" ? (
            <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="p-4 sm:p-6 border-b border-slate-200">
                <p className="text-[11px] font-semibold tracking-wide text-violet-600/80">
                  HISTORIQUE
                </p>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Colis envoyés
                </h1>
                <p className="text-[13px] sm:text-sm text-slate-600 mt-1">
                  Vos colis livrés (et éventuellement annulés).
                </p>
              </div>

              <div className="p-4 sm:p-6">
                <div className="grid gap-3">
                  {filteredHistory.length === 0 ? (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
                      <p className="text-[14px] font-semibold text-slate-800">
                        Aucun historique.
                      </p>
                      <p className="text-[13px] text-slate-600 mt-1">
                        Vos colis livrés s’afficheront ici.
                      </p>
                    </div>
                  ) : (
                    filteredHistory.map((p) => (
                      <div
                        key={p.trackingId}
                        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-[13px] font-bold text-slate-900 truncate">
                              {p.trackingId} • {p.routeLabel}
                            </p>
                            <p className="text-[12px] text-slate-600 mt-1">
                              {p.senderLabel} → {p.recipientLabel} • {fmtDate(p.createdAtIso)}
                            </p>
                            <p className="text-[12px] text-slate-500 mt-1">
                              Service: <span className="font-semibold">{p.service}</span> • Taille{" "}
                              <span className="font-semibold">{p.size}</span> • Poids{" "}
                              <span className="font-semibold">{p.weightKg.toFixed(2)} kg</span>
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-[11px] text-slate-500">Statut</p>
                            <p
                              className={`mt-1 inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${
                                p.status === "Livré"
                                  ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                                  : "border-slate-200 bg-slate-50 text-slate-700"
                              }`}
                            >
                              {p.status}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3">
                          <button
                            type="button"
                            className="h-8 rounded-lg bg-violet-500 text-white font-semibold text-[12px] hover:bg-violet-600 inline-flex items-center justify-center gap-1.5 px-3"
                          >
                            <Box className="w-3.5 h-3.5" />
                            Ré-expédier
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>
          ) : tab === "invoices" ? (
            <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="p-4 sm:p-6 border-b border-slate-200">
                <p className="text-[11px] font-semibold tracking-wide text-violet-600/80">FACTURES</p>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Mes factures
                </h1>
                <p className="text-[13px] sm:text-sm text-slate-600 mt-1">
                  Consultez vos factures et leurs statuts.
                </p>
              </div>

              <div className="p-4 sm:p-6">
                <div className="grid gap-3">
                  {filteredInvoices.length === 0 ? (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
                      <p className="text-[14px] font-semibold text-slate-800">
                        Aucune facture trouvée.
                      </p>
                      <p className="text-[13px] text-slate-600 mt-1">
                        Essayez une autre recherche.
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
                              {inv.id} • {inv.label}
                            </p>
                            <p className="text-[12px] text-slate-600 mt-1 inline-flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-slate-400" />
                              {fmtDate(inv.createdAtIso)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-[14px] font-extrabold text-slate-900">
                              {inv.amountEur.toFixed(2)} €
                            </p>
                            <p
                              className={`text-[11px] font-semibold mt-1 inline-flex rounded-full px-2 py-0.5 border ${
                                inv.status === "payée"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                  : inv.status === "envoyée"
                                    ? "bg-blue-50 text-blue-700 border-blue-100"
                                    : "bg-amber-50 text-amber-700 border-amber-100"
                              }`}
                            >
                              {inv.status}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3">
                          <button
                            type="button"
                            className="h-8 rounded-lg border border-slate-200 bg-white text-slate-700 font-semibold text-[12px] hover:bg-slate-50 inline-flex items-center justify-center gap-1.5 px-3"
                          >
                            <FileText className="w-3.5 h-3.5 text-slate-500" />
                            Afficher la facture
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>
          ) : (
            <section className="grid gap-4 lg:grid-cols-12">
              <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="p-4 sm:p-6 border-b border-slate-200">
                  <p className="text-[11px] font-semibold tracking-wide text-violet-600/80">PROFIL</p>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">Mon profil</h1>
                  <p className="text-[13px] sm:text-sm text-slate-600 mt-1">
                    Informations personnelles .
                  </p>
                </div>

                <div className="p-4 sm:p-6 grid gap-3">
                  <div className="grid gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="text-[11px] text-slate-500">Prénom</p>
                      <p className="text-[14px] font-bold text-slate-900 mt-1">{profile.prenom}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="text-[11px] text-slate-500">Nom</p>
                      <p className="text-[14px] font-bold text-slate-900 mt-1">{profile.nom}</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-[11px] text-slate-500">Téléphone</p>
                    <p className="text-[14px] font-bold text-slate-900 mt-1 inline-flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-500" />
                      {profile.telephone}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-[11px] text-slate-500">Email</p>
                    <p className="text-[14px] font-bold text-slate-900 mt-1 inline-flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-500" />
                      {profile.email}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-[11px] text-slate-500">Adresse</p>
                    <p className="text-[14px] font-bold text-slate-900 mt-1 inline-flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-slate-500 mt-0.5" />
                      <span className="min-w-0">
                        {profile.adresse}
                        <span className="block text-[12px] text-slate-600 font-semibold mt-1">
                          {profile.ville} • {profile.pays} • {profile.codePostal}
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <aside className="lg:col-span-5">
                <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                  <div className="p-4 sm:p-6 border-b border-slate-200">
                    <p className="text-[11px] font-semibold tracking-wide text-violet-600/80">PRÉFÉRENCES</p>
                    <h2 className="text-lg font-extrabold text-slate-900">Sécurité & compte</h2>
                  </div>
                  <div className="p-4 sm:p-6 grid gap-2">
                    <button
                      type="button"
                      className="h-11 rounded-xl bg-slate-900 text-white font-bold text-[14px] hover:bg-slate-800 inline-flex items-center justify-center gap-2"
                    >
                      <Shield className="w-4 h-4" />
                      Modifier mot de passe 
                    </button>
                    </div>
                </div>

                <div className="mt-4 rounded-3xl border border-slate-200 bg-white shadow-sm">
                  <div className="p-4 sm:p-6 border-b border-slate-200">
                    <p className="text-[11px] font-semibold tracking-wide text-violet-600/80">IDENTITÉ</p>
                    <h2 className="text-lg font-extrabold text-slate-900">Vérification</h2>
                    <p className="text-[13px] text-slate-600 mt-1">Informations indicatives.</p>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                      <p className="text-[12px] font-semibold text-slate-700">Pièce</p>
                      <p className="text-[14px] font-bold text-slate-900 mt-1">
                        {profile.pieceIdentite || "Non renseignée"}
                      </p>
                      <p className="text-[12px] text-slate-600 mt-1">
                        Pour certains envois, une pièce peut être requise .
                      </p>
                    </div>
                  </div>
                </div>
              </aside>
            </section>
          )}
        </div>
      </main>

      <footer className="pb-10" />
    </div>
  );
}
